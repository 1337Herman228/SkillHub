"use client";

import { useRouter } from "next/navigation";
import "./EditBtn.scss";

interface EditBtnProps {
    courseId: number;
    lessonId: number;
}

const EditBtn = ({ courseId, lessonId }: EditBtnProps) => {
    const router = useRouter();

    const onHandleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        router.push(`/teacher/my-courses/${courseId}/edit-lesson/${lessonId}`);
    };

    return (
        <button onClick={(e) => onHandleClick(e)} className="edit-btn">
            <img
                className="edit-btn__icon"
                src="/svg/edit-icon.svg"
                width={8}
                height={8}
                alt="edit"
                loading="lazy"
            />
        </button>
    );
};

export default EditBtn;
