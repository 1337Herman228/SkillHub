import { IContinueCourse } from "@/interfaces/types";
import "./ContinueCourseCard.scss";
import CourseProgress from "@/components/course-progress/CourseProgress";
import Link from "next/link";
import HoverModalOpenBtn from "@/components/buttons/hover-modal-open-btn/HoverModalOpenBtn";
import { useRef, useState } from "react";
import HoverModal from "@/components/modals/hover-modal/HoverModal";

interface ContinueCourseCardProps {
    course: IContinueCourse;
}

const ContinueCourseCard = ({ course }: ContinueCourseCardProps) => {
    const [isMessagesModalOpen, setIsMessagesModalOpen] = useState(false);
    const btnMessagesRef = useRef(null);

    return (
        <div className="continue-course-card">
            <Link href={`/course/${course.course.courseId}`}>
                <img
                    className="continue-course-card__img"
                    src={"upload-images/" + course.course.courseImg}
                    alt={course.course.courseName}
                    loading="lazy"
                />
                <div className="continue-course-card__info">
                    <div className="course-name">
                        {course.course.courseName}
                    </div>
                    <div className="course-progress-container">
                        <HoverModalOpenBtn
                            className="course-progress"
                            btnRef={btnMessagesRef}
                            stateSetter={setIsMessagesModalOpen}
                        >
                            <CourseProgress
                                size={40}
                                percentage={course.progressInPercents}
                            />
                            <HoverModal
                                openBtnRef={btnMessagesRef}
                                isOpen={isMessagesModalOpen}
                                setStateFunc={setIsMessagesModalOpen}
                            >
                                <div className="progress-modal">
                                    <span
                                        style={{ color: "var(--dark-purple)" }}
                                    >
                                        {course.course.courseName}
                                    </span>
                                    <br />
                                    Пройдено уроков:{" "}
                                    {course.completedLessonsCount} из{" "}
                                    {course.allLessonsCount}
                                    <br />
                                    Завершено на{" "}
                                    {Math.round(course.progressInPercents)}%
                                </div>
                            </HoverModal>
                        </HoverModalOpenBtn>
                    </div>
                </div>
            </Link>
        </div>
    );
};
export default ContinueCourseCard;
