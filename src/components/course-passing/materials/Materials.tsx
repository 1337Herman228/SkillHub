"use client";

import { useAppSelector } from "@/lib/redux/store/store";
import "./Materials.scss";
import Chapter from "./chapter/Chapter";
import Spinner from "@/components/spinners/spinner/Spinner";
import { ICourseInfoUrlParams } from "@/interfaces/types";

interface MaterialsProps {
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
                    .map((chapter, ch_i, ch_arr) => {
                        // //Для нахождения кол-ва уроков, которые были до
                        // let previousLessonsCount: number | undefined = 0;
                        // if (ch_arr[ch_i - 1]) {
                        //     previousLessonsCount = course.lessons?.filter(
                        //         (lesson, i, arr) =>
                        //             lesson.chapterId ===
                        //             ch_arr[ch_i - 1].chapterId
                        //     ).length;
                        // }

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
                            />
                        );
                    })}
            </ul>
        </div>
    );
};

export default Materials;
