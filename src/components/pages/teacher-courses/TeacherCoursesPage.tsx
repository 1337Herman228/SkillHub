"use client";

import StubWithBtn from "@/components/stubs/stub-with-btn/StubWithBtn";
import "./TeacherCoursesPage.scss";
import { useEffect, useState } from "react";
import useFetch from "@/lib/hooks/useFetch";
import { IAllCourse } from "@/interfaces/types";
import CustomSearch from "@/components/search/custom-search/CustomSearch";
import Spinner from "@/components/spinners/spinner/Spinner";
import CourseCard from "@/components/cards/course-card/CourseCard";
import { useAppSelector } from "@/lib/redux/store/store";
import Link from "next/link";

const TeacherCoursesPage = () => {
    const user = useAppSelector((state) => state.user.user);

    const { getTeacherCourses, getTeacherCoursesByName, isLoading } =
        useFetch();

    const [allTeacherCourses, setAllTeacherCourses] = useState<
        IAllCourse[] | null
    >(null);
    const [courses, setCourses] = useState<IAllCourse[]>([]);

    const [searchtext, setSearchtext] = useState<string>("");

    const fetchTeacherCourses = async () => {
        const courses_ = await getTeacherCourses();
        setAllTeacherCourses(courses_);
        setCourses(courses_);
    };

    useEffect(() => {
        fetchTeacherCourses();
    }, [user]);

    const fetchCoursesByName = async () => {
        const coursesData = await getTeacherCoursesByName(searchtext);
        setCourses(coursesData);
    };
    useEffect(() => {
        fetchCoursesByName();
    }, [searchtext]);

    const loading = !courses || isLoading;

    if (allTeacherCourses?.length === 0)
        return (
            <div className="centered-div">
                <StubWithBtn
                    title="Тут пусто!"
                    description="Вы еще не создали ни одного курса!"
                    btnType="link"
                    btnLink="/teacher/my-courses/new-course"
                    btnText="Создать новый курс"
                />
            </div>
        );

    return (
        <div className="courses-page container-reduced-medium">
            <section className="courses section-medium">
                <div className="courses__dashboard">
                    <div className="dashboard-text">
                        <h1 className="dashboard-text__title  title">
                            Созданные вами курсы
                        </h1>
                        <div className="dashboard-text__description title-description">
                            Здесь вы можете просматривать и менять созданные
                            вами курсы
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
                                        isTeacherCard
                                    />
                                ))}
                                <div className="courses__add-link-container">
                                    <Link
                                        className="courses__add-link purple-button"
                                        href="/teacher/my-courses/new-course"
                                    >
                                        <img src="/svg/plus.svg" />

                                        <span>Добавить курс</span>
                                    </Link>
                                </div>
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

export default TeacherCoursesPage;
