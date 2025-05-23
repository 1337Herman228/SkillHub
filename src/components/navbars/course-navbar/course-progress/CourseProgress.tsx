"use client";

import "./CourseProgress.scss";
import HoverModalOpenBtn from "@/components/buttons/hover-modal-open-btn/HoverModalOpenBtn";
import HoverModal from "@/components/modals/hover-modal/HoverModal";
import useFetch from "@/lib/hooks/useFetch";
import { useEffect, useRef, useState } from "react";
import CourseProgress from "@/components/course-progress/CourseProgress";
import { useAppSelector } from "@/lib/redux/store/store";
import Spinner from "../../../spinners/spinner/Spinner";
import { generateCertificate } from "@/lib/utils/generateCertificate";

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

    const handleDownload = async (userName: string, courseName: string) => {
        // Генерация PDF
        const pdfBlob = await generateCertificate(userName, courseName);

        // Создаём ссылку для скачивания
        const link = document.createElement("a");
        link.href = URL.createObjectURL(pdfBlob);
        link.download =
            courseName.toLowerCase().replace(/\s/g, "-") +
            "-certificate-for- " +
            userName.toLowerCase().replace(/\s/g, "-") +
            ".pdf";
        link.click();

        // Освобождаем память
        URL.revokeObjectURL(link.href);
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
                        <br />
                        {userProgress.progressInPercents === 100 && (
                            <div>
                                <button
                                    className="download-certificate purple-button"
                                    onClick={() =>
                                        handleDownload(
                                            user.person?.name +
                                                " " +
                                                user.person?.surname,
                                            courseName
                                        )
                                    }
                                >
                                    Получить сертификат
                                </button>
                            </div>
                        )}
                    </div>
                </HoverModal>
            </HoverModalOpenBtn>
        </div>
    );
};

export default CourseProgressNav;
