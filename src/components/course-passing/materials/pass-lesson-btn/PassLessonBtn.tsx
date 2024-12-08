"use client";

import { useEffect, useState } from "react";
import "./PassLessonBtn.scss";
import { useAppSelector } from "@/lib/redux/store/store";
import useFetch from "@/lib/hooks/useFetch";
import Spinner from "../../../spinners/spinner/Spinner";

interface PassLessonBtnProps {
    isChecked?: boolean;
    courseId?: number;
    lessonId?: number;
    isTest?: boolean;
}

const PassLessonBtn = ({
    isChecked = false,
    lessonId,
    courseId,
    isTest,
}: PassLessonBtnProps) => {
    const user = useAppSelector((state) => state.user.user);

    const {
        getAndDispatchUserProgress,
        getLessonPassedStatus,
        markLessonAsUnpassed,
        markLessonAsPassed,
        isLoading,
    } = useFetch();

    const [isCheckedState, setIsCheckedState] = useState(isChecked);

    const onHandleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        onToggleMark();
        setIsCheckedState(!isCheckedState);
    };

    useEffect(() => {
        getStatus();
    }, [user]);

    const getStatus = async () => {
        if (user?.userId && lessonId) {
            const response = await getLessonPassedStatus(
                user?.userId,
                lessonId
            );
            setIsCheckedState(response);
        }
    };

    const onToggleMark = async () => {
        if (user?.userId && lessonId && courseId) {
            if (!isCheckedState) {
                await markLessonAsPassed(lessonId, courseId);
            }
            //Отмечаем как не пройденный
            else {
                await markLessonAsUnpassed(user?.userId, lessonId);
            }
            //Подгружаем прогресс
            await getAndDispatchUserProgress(courseId);
        }
    };

    if (isLoading) {
        return <Spinner size="15px" />;
    }

    if (isTest && !isCheckedState) {
        return <div />;
    }

    return (
        <button
            disabled={isTest && isCheckedState}
            onClick={(e) => onHandleClick(e)}
            className={`pass-lesson-btn ${isCheckedState ? "checked" : ""}`}
        >
            {isCheckedState && (
                <img className={``} alt="" src={`/svg/check-mark.svg`} />
            )}
        </button>
    );
};

export default PassLessonBtn;
