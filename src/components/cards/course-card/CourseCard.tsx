import { IAllCourse, IUser } from "@/interfaces/types";
import "./CourseCard.scss";
import { ConfigProvider, Rate } from "antd";
import CourseAccessBtn from "@/components/buttons/course-access-btn/CourseAccessBtn";
import HoverModalOpenBtn from "@/components/buttons/hover-modal-open-btn/HoverModalOpenBtn";
import { useRef, useState } from "react";
import CourseProgress from "@/components/course-progress/CourseProgress";
import HoverModal from "@/components/modals/hover-modal/HoverModal";
import { useMediaQuery } from "react-responsive";

interface CourseCardProps {
    course: IAllCourse;
    token: string;
    user: IUser;
    progressInPercents?: number;
    completedLessonsCount?: number;
    allLessonsCount?: number;
}

const CourseCard = ({
    course,
    token,
    user,
    progressInPercents = 50,
    completedLessonsCount = 5,
    allLessonsCount = 10,
}: CourseCardProps) => {
    const isTabletDevice = useMediaQuery({ query: "(max-width: 1024px)" });

    const progressBtnRef = useRef<HTMLButtonElement | null>(null);
    const [isProgressModalOpen, setIsProgressModalOpen] = useState(false);

    function getMonthFromDate(dateString: string): string {
        const date = new Date(dateString);

        // Используем Intl.DateTimeFormat для получения названия месяца
        const options: Intl.DateTimeFormatOptions = { month: "long" };
        const monthName = new Intl.DateTimeFormat("ru-RU", options).format(
            date
        );

        return monthName;
    }

    function getYearFromDate(dateString: string): number {
        const date = new Date(dateString);
        return date.getFullYear(); // Возвращает год в формате 2024
    }

    const translateSkillLevel = (level: string): string => {
        switch (level) {
            case "START":
                return "Начальный уровень";
            case "NORMAL":
                return "Средний уровень";
            case "PRO":
                return "Продвинутый уровень";
            case "ALL":
                return "Все уровни";
            default:
                return "Все уровни";
        }
    };

    return (
        <div className="course-card">
            <img
                className="course-card__img"
                loading="lazy"
                alt={course.course.courseName}
                src={"upload-images/" + course.course.courseImg}
                // width={20}
                // height={20}
            />

            <div className="course-info-container">
                <div className="course-info">
                    <div className="course-info__course-name">
                        {course.course.courseName}
                    </div>
                    <div className="course-info__description light-text hidden-tablet">
                        <p>{course.course.shortDescription}</p>
                    </div>
                    <div className="course-info__author light-text">
                        Автор: {course.course.author.person?.name}{" "}
                        {course.course.author.person?.surname}
                    </div>
                    <div className="course-info__last-update light-text">
                        Обновлено:{" "}
                        <span className="bold-text">
                            {getMonthFromDate(course.course.lastUpdate)}{" "}
                            {getYearFromDate(course.course.lastUpdate)} г.
                        </span>
                    </div>
                    <div className="course-info__time-lessons-level light-text">
                        Всего: {(course.duration / 60).toFixed(1)} ч ·{" "}
                        {course.allLessonsCount} уроков ·{" "}
                        {translateSkillLevel(course.course.skillLevel)}
                    </div>
                    <div className="course-info__rate light-text">
                        <span className="bold-text">
                            {Number(course.rating).toFixed(1)}
                        </span>
                        <span className="rate-span">
                            <ConfigProvider
                                theme={{
                                    token: {
                                        marginXS: 4,
                                    },
                                }}
                            >
                                <Rate
                                    disabled
                                    allowHalf
                                    defaultValue={course.rating}
                                />
                            </ConfigProvider>
                        </span>
                        <span className="reviews-count">
                            ({course.reviewsCount})
                        </span>
                    </div>
                    <div className="course-info__btn hidden-tablet">
                        <CourseAccessBtn
                            token={token}
                            user={user}
                            status={course.status}
                            courseId={course.course.courseId}
                        />
                    </div>
                </div>

                {progressInPercents &&
                    completedLessonsCount &&
                    allLessonsCount && (
                        <div className="course-progress-container">
                            <HoverModalOpenBtn
                                className="course-progress"
                                btnRef={progressBtnRef}
                                stateSetter={setIsProgressModalOpen}
                            >
                                <CourseProgress
                                    size={45}
                                    percentage={progressInPercents}
                                />
                                <div className="percentage">
                                    {progressInPercents}%
                                </div>
                                <HoverModal
                                    openBtnRef={progressBtnRef}
                                    isOpen={isProgressModalOpen}
                                    setStateFunc={setIsProgressModalOpen}
                                >
                                    <div className="progress-modal">
                                        <span
                                            style={{
                                                color: "var(--dark-purple)",
                                            }}
                                        >
                                            {course.course.courseName}
                                        </span>
                                        <br />
                                        Пройдено уроков: {
                                            completedLessonsCount
                                        }{" "}
                                        из {course.allLessonsCount}
                                        <br />
                                        Завершено на{" "}
                                        {Math.round(progressInPercents)}%
                                    </div>
                                </HoverModal>
                            </HoverModalOpenBtn>
                        </div>
                    )}
            </div>

            {isTabletDevice && (
                <div className="tablet-access-btn-container">
                    <CourseAccessBtn
                        token={token}
                        user={user}
                        status={course.status}
                        courseId={course.course.courseId}
                    />
                </div>
            )}
        </div>
    );
};

export default CourseCard;
