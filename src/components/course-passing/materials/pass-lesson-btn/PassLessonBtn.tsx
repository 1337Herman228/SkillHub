import { useState } from "react";
import "./PassLessonBtn.scss";

interface PassLessonBtnProps {
    isChecked?: boolean;
}

const PassLessonBtn = ({ isChecked = false }: PassLessonBtnProps) => {
    const [isCheckedState, setIsCheckedState] = useState(isChecked);

    const onHandleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setIsCheckedState(!isCheckedState);
    };

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
