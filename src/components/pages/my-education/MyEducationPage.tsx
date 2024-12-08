"use client";

import CustomSearch from "@/components/search/custom-search/CustomSearch";
import "../all-courses/AllCoursesPage.scss";
import { useSession } from "next-auth/react";
import { ExtendedSession } from "@/pages/api/auth/[...nextauth]";
import { useAppSelector } from "@/lib/redux/store/store";
import { useEffect, useState } from "react";
import { IUserInterestCourse } from "@/interfaces/types";
import CourseCard from "@/components/cards/course-card/CourseCard";
import Spinner from "../../spinners/spinner/Spinner";
import useFetch from "@/lib/hooks/useFetch";

const MyEducationPage = () => {
    const user = useAppSelector((state) => state.user.user);
    const [userInterestCourses, setUserInterestCoursesData] = useState<
        IUserInterestCourse[]
    >([]);
    const [searchtext, setSearchtext] = useState<string>("");
    const [isLoadingWithDelay, setIsLoadingWithDelay] =
        useState<boolean>(false);

    const { data: session } = useSession();
    const sessionData: ExtendedSession | null = session;
    const token = sessionData?.user?.authenticationResponse?.token;

    const { getUserInterestCourses, getUserInterestCoursesByName, isLoading } =
        useFetch();

    const fetchUserInterestCourses = async () => {
        const userInterestCoursesData = await getUserInterestCourses();
        setUserInterestCoursesData(userInterestCoursesData);
    };

    useEffect(() => {
        fetchUserInterestCourses();
    }, [user]);

    const fetchUserInterestCourseByName = async () => {
        if (user) {
            const coursesData = await getUserInterestCoursesByName(searchtext);
            setUserInterestCoursesData(coursesData);
        }
    };

    useEffect(() => {
        setIsLoadingWithDelay(true);
        fetchUserInterestCourseByName();
        setTimeout(() => {
            setIsLoadingWithDelay(false);
        }, 1000);
    }, [searchtext]);

    const loading =
        !user ||
        !userInterestCourses ||
        token === undefined ||
        isLoading ||
        isLoadingWithDelay;

    return (
        <div className="courses-page container-reduced-medium">
            <section className="courses section-medium">
                <div className="courses__dashboard">
                    <div className="dashboard-text">
                        <h1 className="dashboard-text__title  title">
                            Ваши курсы
                        </h1>
                        <div className="dashboard-text__description title-description">
                            Курсы, к которым вы запросили доступ
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
                    <div className="courses__loading">
                        <Spinner size="70px" />
                    </div>
                ) : (
                    <>
                        {userInterestCourses?.length > 0 ? (
                            <div className="courses__content">
                                {userInterestCourses.map((course) => (
                                    <CourseCard
                                        course={course}
                                        key={course.course.courseId}
                                        user={user}
                                        token={token}
                                        progressInPercents={
                                            course.completedLessonsCount
                                                ? Number(
                                                      course.progressInPercents.toFixed(
                                                          0
                                                      )
                                                  )
                                                : null
                                        }
                                        completedLessonsCount={
                                            course.completedLessonsCount
                                        }
                                        allLessonsCount={course.allLessonsCount}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="courses__not-found">
                                Ничего не найдено...
                            </div>
                        )}
                    </>
                )}
            </section>
        </div>
    );
};

export default MyEducationPage;
