"use client";

import { useEffect, useState } from "react";
import "./PassLessonBtn.scss";
import { useAppSelector } from "@/lib/redux/store/store";
import useFetch from "@/lib/hooks/useFetch";
import Spinner from "@/components/spinners/spinner/Spinner";

interface PassLessonBtnProps {
    isChecked?: boolean;
    courseId?: number;
    lessonId?: number;
}

const PassLessonBtn = ({
    isChecked = false,
    lessonId,
    courseId,
}: PassLessonBtnProps) => {
    const user = useAppSelector((state) => state.user.user);

    const {
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
                //Отмечаем как пройденный

                const resp = await markLessonAsPassed(
                    user?.userId,
                    lessonId,
                    courseId
                );
                // console.log("Отмечаем как пройденный", resp);
            }
            //Отмечаем как не пройденный
            else {
                markLessonAsUnpassed(user?.userId, lessonId);
            }
        }
    };

    if (isLoading) {
        return <Spinner size="15px" />;
    }

    return (
        <button
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
