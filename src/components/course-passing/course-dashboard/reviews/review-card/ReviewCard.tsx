import dayjs from "dayjs";
import "./ReviewCard.scss";
import DOMPurify from "dompurify";
import parse from "html-react-parser";
import { Rate } from "antd";

interface ReviewCardProps {
    avatarImg?: string;
    name?: string;
    surname?: string;
    createdAt?: Date;
    body: string;
    rating?: number;
}

const ReviewCard = ({
    createdAt,
    body,
    name,
    surname,
    avatarImg,
    rating,
}: ReviewCardProps) => {
    return (
        <div className="review">
            <img
                className="review__user-avatar"
                src={
                    avatarImg
                        ? "/upload-images/" + avatarImg
                        : "/svg/profile.svg"
                }
                alt=""
                width={36}
                height={36}
            />
            <div className="review__body">
                <div className="username">
                    {name} {surname}
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
