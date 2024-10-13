"use client";

import { useState } from "react";
import "./CourseAccessBtn.scss";
import Spinner from "@/components/spinners/spinner/Spinner";
import { IUser } from "@/interfaces/types";
import useHttp from "@/lib/hooks/useHttp";

type statusType =
    | "NO_REQUEST"
    | "PENDING"
    | "APPROVED"
    | "REJECTED"
    | "LOADING";

interface CourseAccessBtnProps {
    status: statusType;
    token: string;
    user: IUser;
    courseId: number;
}

const CourseAccessBtn = ({
    status,
    token,
    user,
    courseId,
}: CourseAccessBtnProps) => {
    const [accessStatus, setAccessStatus] = useState<statusType>(status);

    const { requestJson, error } = useHttp();

    const requestAccess = async () => {
        setAccessStatus("LOADING");
        await requestJson(
            token,
            `http://localhost:8080/user/request-access`,
            "POST",
            JSON.stringify({
                userId: user.userId,
                courseId: courseId,
            })
        );
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
