import Link from "next/link";
import "./StubWithBtn.scss";

interface StubWithBtnProps {
    title?: string;
    description: string;
    btnType: "link" | "button";
    btnLink?: string;
    btnFunc?: () => void;
    btnText: string;
    btnStyle?: React.CSSProperties;
}

const StubWithBtn = ({
    title = "Тут пусто!",
    description,
    btnType,
    btnText,
    btnLink,
    btnFunc,
    btnStyle,
}: StubWithBtnProps) => {
    return (
        <div className="stub">
            <h1 className="stub__title">{title}</h1>
            <div className="stub__description">{description}</div>
            {btnType === "link" && btnLink ? (
                <Link
                    style={btnStyle}
                    className="stub__action stub--link purple-button"
                    href={btnLink}
                >
                    {btnText}
                </Link>
            ) : btnType === "button" && btnFunc ? (
                <button
                    style={btnStyle}
                    className="stub__action stub--btn purple-button"
                    onClick={btnFunc}
                >
                    {btnText}
                </button>
            ) : null}
        </div>
    );
};

export default StubWithBtn;
