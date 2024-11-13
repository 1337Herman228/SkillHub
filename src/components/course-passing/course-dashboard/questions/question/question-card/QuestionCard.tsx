import dayjs from "dayjs";
import parse from "html-react-parser";
import DOMPurify from "dompurify";

interface QuestionCardProps {
    avatarImg?: string;
    name?: string;
    surname?: string;
    createdAt?: Date;
    body: string;
    answersBtn?: React.ReactNode;
}

const QuestionCard = ({
    createdAt,
    body,
    name,
    surname,
    avatarImg,
    answersBtn,
}: QuestionCardProps) => {
    return (
        <div className="question">
            <img
                className="question__user-avatar"
                src={
                    avatarImg
                        ? "/upload-images/" + avatarImg
                        : "/svg/profile.svg"
                }
                alt=""
                width={36}
                height={36}
            />
            <div className="question__body">
                <div className="username-date">
                    <div className="username">
                        {name} {surname}
                    </div>
                    <div className="date">
                        {dayjs(createdAt).format("DD.MM.YYYY")}
                    </div>
                </div>
                <div className="question-text html-block-smaller-text">
                    {parse(DOMPurify.sanitize(body))}
                </div>
            </div>
            <div className="answers-count">{answersBtn}</div>
        </div>
    );
};

export default QuestionCard;
