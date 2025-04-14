import dayjs from "dayjs";
import parse from "html-react-parser";
import DOMPurify from "dompurify";
import AvatarStroke from "@/components/avatar-stroke/AvatarStroke";
import { IUser } from "@/interfaces/types";
import UsernameDecoration from "@/components/username-decoration/UsernameDecoration";

interface QuestionCardProps {
    user: IUser;
    createdAt?: Date;
    body: string;
    answersBtn?: React.ReactNode;
}

const QuestionCard = ({
    createdAt,
    body,
    user,
    answersBtn,
}: QuestionCardProps) => {
    return (
        <div className="question">
            <AvatarStroke
                size={43}
                frameSrc={user?.avatarStroke?.url}
                style={{ top: "-4%", left: "2%", translate: "0 0" }}
            >
                <img
                    className="question__user-avatar"
                    src={
                        user.person?.avatarImg
                            ? "/upload-images/" + user.person?.avatarImg
                            : "/svg/profile.svg"
                    }
                    alt=""
                    width={36}
                    height={36}
                />
            </AvatarStroke>
            <div className="question__body">
                <div className="username-date">
                    <div className="username">
                        <UsernameDecoration user={user as IUser} />
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
