import { useState } from "react";
import Lesson from "../lesson/Lesson";
import "./Chapter.scss";
import {
    IChapterWithLessonsInfo,
    ICourseInfoUrlParams,
    ILessonWithResources,
} from "@/interfaces/types";
import useTime from "@/lib/hooks/useTime";

interface ChapterProps {
    isOpen?: boolean;
    // previousLessonsCount?: number;
    chapter: IChapterWithLessonsInfo;
    lessons: ILessonWithResources[] | null;
    params: ICourseInfoUrlParams;
}

const Chapter = ({
    // previousLessonsCount = 0,
    chapter,
    lessons,
    isOpen = false,
    params,
}: ChapterProps) => {
    const [isChapterOpen, setIsChapterOpen] = useState(isOpen);

    const onKeyClickHandler = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" || e.key === "Space") {
            setIsChapterOpen(!isChapterOpen);
        }
    };

    const { convertMinutesToHoursAndMinutes, formatTimeToHoursAndMinutes } =
        useTime();
    const { hours, minutes } = convertMinutesToHoursAndMinutes(
        chapter.duration
    );

    return (
        <li className="chapter-container">
            <div
                className="chapter"
                tabIndex={0}
                onClick={() => setIsChapterOpen(!isChapterOpen)}
                onKeyDown={(e) => onKeyClickHandler(e)}
            >
                <div className="chapter-title">
                    <div className="chapter-title__text">
                        {chapter.chapterOrder}. {chapter.chapterTitle}
                    </div>
                    <img
                        className={`chapter-title__arrow ${
                            isChapterOpen ? "open" : ""
                        }`}
                        alt=""
                        src={`/svg/dropdown-arrow-top.svg`}
                        width={13}
                        height={8}
                    />
                </div>
                <div className="chapter__content">
                    {chapter.lessonsCount} / {chapter.lessonsCount} |{" "}
                    {formatTimeToHoursAndMinutes(hours, minutes, true)}
                </div>
            </div>
            {isChapterOpen && (
                <ul className="lessons">
                    {lessons
                        ?.filter((lesson) => lesson.lessonOrder)
                        .map((lesson) => (
                            <Lesson
                                params={params}
                                chapterOrder={chapter.chapterOrder}
                                lesson={lesson}
                                key={lesson.lessonId}
                            />
                        ))}
                </ul>
            )}
        </li>
    );
};

export default Chapter;
