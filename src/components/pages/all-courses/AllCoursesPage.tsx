"use client";

import CustomSearch from "@/components/search/custom-search/CustomSearch";
import "./AllCoursesPage.scss";
import { useSession } from "next-auth/react";
import { ExtendedSession } from "@/pages/api/auth/[...nextauth]";
import { useAppSelector } from "@/lib/redux/store/store";
import useHttp from "@/lib/hooks/useHttp";
import { useEffect, useState } from "react";
import { IAllCourse } from "@/interfaces/types";
import CourseCard from "@/components/cards/course-card/CourseCard";
import FullScreenSpinner from "@/components/spinners/full-screen-spinner/FullScreenSpinner";
import Spinner from "@/components/spinners/spinner/Spinner";

const AllCoursesPage = () => {
    const { requestJson, isLoading, error } = useHttp();

    const user = useAppSelector((state) => state.user.user);
    const [allCourses, setAllCourses] = useState<IAllCourse[]>([]);
    const [searchtext, setSearchtext] = useState<string>("");
    const [isLoadingWithDelay, setIsLoadingWithDelay] =
        useState<boolean>(false);

    const { data: session } = useSession();
    const sessionData: ExtendedSession | null = session;
    const token = sessionData?.user?.authenticationResponse?.token;

    const fetchAllCourses = async () => {
        if (user && token) {
            const allCoursesData = await requestJson(
                token,
                `http://localhost:8080/user/get-all-courses-for-user/${sessionData?.user?.userId}`
            );
            setAllCourses(allCoursesData);
        }
    };
    useEffect(() => {
        fetchAllCourses();
    }, [user]);
    // console.log("allCourses", allCourses);

    const fetchCoursesByName = async () => {
        if (user && token) {
            const coursesData = await requestJson(
                token,
                `http://localhost:8080/user/find-courses-by-name-for-user`,
                "POST",
                JSON.stringify({ courseName: searchtext, userId: user.userId })
            );
            setAllCourses(coursesData);
            console.log(coursesData);
        }
    };
    useEffect(() => {
        setIsLoadingWithDelay(true);
        fetchCoursesByName();
        setTimeout(() => {
            setIsLoadingWithDelay(false);
        }, 1000);
    }, [searchtext]);

    const loading =
        !user ||
        !allCourses ||
        token === undefined ||
        isLoading ||
        isLoadingWithDelay;

    return (
        <div className="all-courses-page container-reduced-medium">
            <section className="all-courses section-medium">
                <div className="all-courses__dashboard">
                    <div className="dashboard-text">
                        <h1 className="dashboard-text__title  title">
                            Выберите курс
                        </h1>
                        <div className="dashboard-text__description title-description">
                            Чтобы приступить к выполнению курса запросите доступ
                        </div>
                    </div>
                    <div className="dashboard-search">
                        <CustomSearch
                            state={searchtext}
                            setStateFunc={setSearchtext}
                            style={{ width: "100%" }}
                        />
                    </div>
                </div>
                {loading ? (
                    <div className="all-courses__loading">
                        <Spinner size="70px" />
                    </div>
                ) : (
                    <>
                        {allCourses?.length > 0 ? (
                            <div className="all-courses__content">
                                {allCourses.map((course) => (
                                    <CourseCard
                                        course={course}
                                        key={course.course.courseId}
                                        user={user}
                                        token={token}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="all-courses__not-found">
                                Ничего не найдено...
                            </div>
                        )}
                    </>
                )}
            </section>
        </div>
    );
};

export default AllCoursesPage;
