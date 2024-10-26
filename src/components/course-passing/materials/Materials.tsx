"use client";

import { useAppSelector } from "@/lib/redux/store/store";
import "./Materials.scss";
import Chapter from "./chapter/Chapter";
import Spinner from "@/components/spinners/spinner/Spinner";
import { ICourseInfoUrlParams, TRole } from "@/interfaces/types";

interface MaterialsProps {
    role: TRole;
    params: ICourseInfoUrlParams;
}

const Materials = ({ params }: MaterialsProps) => {
    const course = useAppSelector((state) => state.course);

    if (!course || !course.chapters || !course.lessons) {
        return (
            <div className="materials-loading">
                <Spinner size="50px" />
            </div>
        );
    }

    return (
        <div className="materials-container">
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
                                params={params}
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
            </ul>
        </div>
    );
};

export default Materials;
