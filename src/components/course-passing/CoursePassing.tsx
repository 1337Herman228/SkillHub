"use client";

import { TRole } from "@/interfaces/types";
import "./CoursePassing.scss";
import Materials from "./materials/Materials";
import LessonVariant from "./lesson-variant/LessonVariant";
import { useAppSelector } from "@/lib/redux/store/store";
import StubWithBtn from "../stubs/stub-with-btn/StubWithBtn";

interface CoursePassingProps {
    role?: TRole;
}

const CoursePassing = ({ role = "user" }: CoursePassingProps) => {
    const course = useAppSelector((state) => state.course);

    return course.lessons?.length && course.lessons?.length > 0 ? (
        <section className="course-passing-container">
            <div className="left-part">
                <div className="left-part__lesson">
                    <LessonVariant />
                </div>
                <div className="left-part__dashboard">Обзор</div>
            </div>
            <div className="right-part">
                <Materials course={course} role={role} />
            </div>
        </section>
    ) : (
        <div className="centered-div">
            <StubWithBtn
                title="Тут пусто!"
                description="Вы еще не создали ни одного урока!"
                btnType="link"
                btnLink={`/teacher/my-courses/${course.course?.courseId}/add-lesson`}
                btnText="Добавить урок"
            />
        </div>
    );
};

export default CoursePassing;
