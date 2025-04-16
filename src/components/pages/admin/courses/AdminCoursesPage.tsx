"use client";

import StubWithBtn from "@/components/stubs/stub-with-btn/StubWithBtn";
import "./AdminCoursesPage.scss";
import { useEffect, useState } from "react";
import useFetch from "@/lib/hooks/useFetch";
import { IAllCourse } from "@/interfaces/types";
import CustomSearch from "@/components/search/custom-search/CustomSearch";
import CourseCard from "@/components/cards/course-card/CourseCard";
import { useAppSelector } from "@/lib/redux/store/store";
import Spinner from "@/components/spinners/spinner/Spinner";

const AdminCoursesPage = () => {
    const user = useAppSelector((state) => state.user.user);

    const { getAllCoursesForAdmin, findCoursesByNameForAdmin, isLoading } =
        useFetch();

    const [allCourses, setAllCourses] = useState<IAllCourse[] | null>(null);
    const [courses, setCourses] = useState<IAllCourse[]>([]);

    const [searchtext, setSearchtext] = useState<string>("");

    const fetchCourses = async () => {
        const courses_ = await getAllCoursesForAdmin();
        setAllCourses(courses_);
        setCourses(courses_);
    };

    useEffect(() => {
        fetchCourses();
    }, [user]);

    const fetchCoursesByName = async () => {
        const coursesData = await findCoursesByNameForAdmin(searchtext);
        setCourses(coursesData);
    };
    useEffect(() => {
        fetchCoursesByName();
    }, [searchtext]);

    const loading = !courses || isLoading;

    if (allCourses?.length === 0)
        return (
            <div className="centered-div">
                <StubWithBtn
                    title="Тут пусто!"
                    description="Никто не создал ни одного курса!"
                    btnType="link"
                />
            </div>
        );

    return (
        <div className="courses-page container-reduced-medium">
            <section className="courses section-medium">
                <div className="courses__dashboard">
                    <div className="dashboard-text">
                        <h1 className="dashboard-text__title title">
                            Все курсы
                        </h1>
                        <div className="dashboard-text__description title-description">
                            Здесь вы можете просматривать и менять курсы
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
                        {courses?.length > 0 ? (
                            <div className="courses__content">
                                {courses.map((course) => (
                                    <CourseCard
                                        course={course}
                                        key={course.course.courseId}
                                        isAdminCard
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

export default AdminCoursesPage;
