"use client";

import { ICourseInfoNullable } from "@/interfaces/types";
import "./AboutCourse.scss";
import useTime from "@/lib/hooks/useTime";
import dayjs from "dayjs";
import localeRu from "dayjs/locale/ru";
import parse from "html-react-parser";
import DOMPurify from "dompurify";

const mapSkillLevel = (level: string) => {
    switch (level) {
        case "START":
            return "Начальный";
        case "NORMAL":
            return "Средний";
        case "PRO":
            return "Продвинутый";
        case "ALL":
            return "Все уровни";
        default:
            return "";
    }
};

interface AboutCourseProps {
    course: ICourseInfoNullable;
}

const AboutCourse = ({ course }: AboutCourseProps) => {
    const { convertMinutesToHoursAndMinutes } = useTime();

    const { hours } = convertMinutesToHoursAndMinutes(
        course.info?.duration ?? 0
    );

    return (
        <div className="about-course-container">
            <div className="about-course-header">
                <h2 className="about-course-title">
                    {course.course?.courseName}
                </h2>
                <div className="course-statistics">
                    <div className="rating stat-container">
                        <div className="star-container top-part">
                            {course.info?.rating.toFixed(1)}
                            <img
                                className="star-container__img"
                                src="/svg/star.svg"
                                alt=""
                                width={15}
                                height={15}
                            />
                        </div>
                        <div className="bottom-part">
                            {course.info?.reviewsCount} оценки
                        </div>
                    </div>
                    <div className="students stat-container">
                        <div className="top-part">
                            {course.info?.studentsCount}
                        </div>
                        <div className="bottom-part">Студенты</div>
                    </div>
                    <div className="duration stat-container">
                        <div className="top-part">{hours} ч</div>
                        <div className="bottom-part">Итого</div>
                    </div>
                    <div className="skill-level stat-container">
                        <div className="top-part">
                            {mapSkillLevel(course.course?.skillLevel ?? "")}
                        </div>
                        <div className="bottom-part">Уровень навыков</div>
                    </div>
                    <div className="tests stat-container">
                        <div className="top-part">
                            {course.info?.testsCount}
                        </div>
                        <div className="bottom-part">Тесты</div>
                    </div>
                </div>
                <div className="last-update">
                    <img
                        className=""
                        src="/svg/last-update.svg"
                        alt=""
                        width={15}
                        height={15}
                    />
                    <span>
                        Последнее обновление:{" "}
                        {dayjs(course.course?.lastUpdate)
                            .locale(localeRu)
                            .format("MMMM YYYY")}{" "}
                        г.
                    </span>
                </div>
            </div>
            <div className="about-course-description">
                <div className="block-title">Описание</div>
                <div className=" html-block">
                    {parse(
                        DOMPurify.sanitize(course.course?.longDescription ?? "")
                    )}
                </div>
            </div>
        </div>
    );
};

export default AboutCourse;
