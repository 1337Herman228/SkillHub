"use client";

import "./CourseProgress.scss";
import HoverModalOpenBtn from "@/components/buttons/hover-modal-open-btn/HoverModalOpenBtn";
import HoverModal from "@/components/modals/hover-modal/HoverModal";
import useFetch from "@/lib/hooks/useFetch";
import { useEffect, useRef, useState } from "react";
import CourseProgress from "@/components/course-progress/CourseProgress";
import { useAppSelector } from "@/lib/redux/store/store";
import Spinner from "@/components/spinners/spinner/Spinner";

export interface IUserProgress {
    progressInPercents: number;
    completedLessonsCount: number;
    allLessonsCount: number;
}

interface CourseProgressNavProps {
    courseId: number;
    courseName: string;
}

const CourseProgressNav = ({
    courseId,
    courseName,
}: CourseProgressNavProps) => {
    const user = useAppSelector((state) => state.user.user);
    const userProgress = useAppSelector((state) => state.userProgress);

    const [isMessagesModalOpen, setIsMessagesModalOpen] = useState(false);
    const btnMessagesRef = useRef(null);

    const { getAndDispatchUserProgress, isLoading } = useFetch();

    useEffect(() => {
        fetchUserProgress();
    }, [user]);

    const fetchUserProgress = async () => {
        if (user?.userId) {
            await getAndDispatchUserProgress(courseId);
        }
    };

    const loading = isLoading || !userProgress || !user;

    if (loading)
        return (
            <div className="">
                <Spinner size="20px" />
            </div>
        );

    return (
        <div className="course-progress-container">
            <HoverModalOpenBtn
                className="course-progress"
                btnRef={btnMessagesRef}
                stateSetter={setIsMessagesModalOpen}
            >
                <CourseProgress
                    size={40}
                    percentage={userProgress.progressInPercents}
                />
                <HoverModal
                    // style={{ top: "-100px" }}
                    openBtnRef={btnMessagesRef}
                    isOpen={isMessagesModalOpen}
                    setStateFunc={setIsMessagesModalOpen}
                >
                    <div className="progress-modal">
                        <span style={{ color: "var(--dark-purple)" }}>
                            {courseName}
                        </span>
                        <br />
                        Пройдено уроков: {
                            userProgress.completedLessonsCount
                        } из {userProgress.allLessonsCount}
                        <br />
                        Завершено на{" "}
                        {Math.round(userProgress.progressInPercents)}%
                    </div>
                </HoverModal>
            </HoverModalOpenBtn>
        </div>
    );
};

export default CourseProgressNav;
