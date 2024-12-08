"use client";

import "./Materials.scss";
import Chapter from "./chapter/Chapter";
import Spinner from "../../spinners/spinner/Spinner";
import { ICourseInfoNullable, TRole } from "@/interfaces/types";
import { useRouter } from "next/navigation";

interface MaterialsProps {
    role: TRole;
    course: ICourseInfoNullable;
    isHiddenMobile?: boolean;
}

const Materials = ({ role, course, isHiddenMobile = true }: MaterialsProps) => {
    const router = useRouter();

    if (!course || !course.chapters || !course.lessons) {
        return (
            <div className="materials-loading">
                <Spinner size="50px" />
            </div>
        );
    }

    return (
        <div
            className={`materials-container ${
                isHiddenMobile && "hidden-mobile"
            }`}
        >
            <div className="materials-title">Материалы курса</div>

            <ul className="materials">
                {course?.chapters
                    .filter((chapter) => chapter.chapterOrder)
                    .map((chapter) => {
                        let isOpen = false;
                        if (
                            localStorage.getItem("chapter-" + chapter.chapterId)
                        ) {
                            isOpen = true;
                        }
                        return (
                            <Chapter
                                courseId={course.course?.courseId ?? 0}
                                role={role}
                                key={chapter.chapterId}
                                lessons={
                                    course.lessons &&
                                    course.lessons?.filter(
                                        (lesson) =>
                                            lesson.chapterId ===
                                            chapter.chapterId
                                    )
                                }
                                chapter={chapter}
                                isOpen={isOpen}
                            />
                        );
                    })}
                {(role === "teacher" || role === "admin") && (
                    <li className="add-lesson">
                        <button
                            onClick={() =>
                                router.push(
                                    `/teacher/my-courses/${course.course?.courseId}/add-lesson`
                                )
                            }
                            className="add-lesson-btn"
                        >
                            <img
                                src="/svg/plus-icon.svg"
                                width={15}
                                height={15}
                                alt="add lesson"
                            />
                            <div className="add-lesson-btn__text">
                                Добавить урок
                            </div>
                        </button>
                    </li>
                )}
            </ul>
        </div>
    );
};

export default Materials;
