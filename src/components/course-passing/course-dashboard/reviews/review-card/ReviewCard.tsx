import dayjs from "dayjs";
import "./ReviewCard.scss";
import DOMPurify from "dompurify";
import parse from "html-react-parser";
import { Rate } from "antd";
import AvatarStroke from "@/components/avatar-stroke/AvatarStroke";
import { IUser } from "@/interfaces/types";
import UsernameDecoration from "@/components/username-decoration/UsernameDecoration";

interface ReviewCardProps {
    user: IUser;
    name?: string;
    surname?: string;
    createdAt?: Date;
    body: string;
    rating?: number;
}

const ReviewCard = ({ createdAt, body, user, rating }: ReviewCardProps) => {
    return (
        <div className="review">
            <AvatarStroke
                size={43}
                frameSrc={user?.avatarStroke?.url}
                style={{ top: "-4%", left: "2%", translate: "0 0" }}
            >
                <img
                    className="review__user-avatar"
                    src={
                        user.person?.avatarImg
                            ? "/upload-images/" + user.person.avatarImg
                            : "/svg/profile.svg"
                    }
                    alt=""
                    width={36}
                    height={36}
                />
            </AvatarStroke>
            <div className="review__body">
                <div className="username">
                    <UsernameDecoration user={user as IUser} />
                </div>
                <div className="rating">
                    <div className="rating__stars rate">
                        <Rate disabled allowHalf defaultValue={rating} />
                    </div>
                    <div className="rating__date">
                        {dayjs(createdAt).format("DD.MM.YYYY")}
                    </div>
                </div>
                <div className="review-text html-block-smaller-text">
                    {parse(DOMPurify.sanitize(body))}
                </div>
            </div>
        </div>
    );
};

export default ReviewCard;
