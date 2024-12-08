"use client";

import { useState } from "react";
import "./CourseAccessBtn.scss";
import Spinner from "../../spinners/spinner/Spinner";
import useFetch from "@/lib/hooks/useFetch";
import { TStatusType } from "@/interfaces/types";

interface CourseAccessBtnProps {
    status: TStatusType;
    courseId: number;
}

const CourseAccessBtn = ({ status, courseId }: CourseAccessBtnProps) => {
    const [accessStatus, setAccessStatus] = useState<TStatusType>(status);

    const { fetchRequestAccess } = useFetch();

    const requestAccess = async () => {
        setAccessStatus("LOADING");
        await fetchRequestAccess(courseId);
        setTimeout(() => {
            setAccessStatus("PENDING");
        }, 500);
    };

    return (
        <>
            {accessStatus === "NO_REQUEST" && (
                <button
                    onClick={() => requestAccess()}
                    className="access-btn access-btn--no-request"
                >
                    Запросить доступ
                </button>
            )}
            {accessStatus === "APPROVED" && (
                <button className="access-btn access-btn--approved">
                    Вы имеете доступ
                </button>
            )}
            {accessStatus === "PENDING" && (
                <button className="access-btn access-btn--pending">
                    Ожидайте подтверждения...
                </button>
            )}
            {accessStatus === "REJECTED" && (
                <button
                    onClick={() => requestAccess()}
                    className="access-btn access-btn--rejected"
                >
                    Отказано в доступе (Запросить снова)
                </button>
            )}
            {accessStatus === "LOADING" && (
                <button className="access-btn access-btn--loading">
                    <Spinner color="var(--white)" size="22px" />
                </button>
            )}
        </>
    );
};

export default CourseAccessBtn;
