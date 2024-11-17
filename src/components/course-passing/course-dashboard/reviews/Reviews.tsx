"use client";

import { ConfigProvider, notification, Rate } from "antd";
import "./Reviews.scss";
import ProgressBar from "./stat-bar/ProgressBar";
import useFetch from "@/lib/hooks/useFetch";
import { useEffect, useState } from "react";
import {
    ICourseRatingInfo,
    IReview,
    NotificationType,
} from "@/interfaces/types";
import Spinner from "@/components/spinners/spinner/Spinner";
import ReviewCard from "./review-card/ReviewCard";
import TextEditor from "@/components/text-editor/TextEditor";
import { useAppSelector } from "@/lib/redux/store/store";

interface ReviewsProps {
    courseId: number;
}

const Reviews = ({ courseId }: ReviewsProps) => {
    const user = useAppSelector((state) => state.user.user);

    const [api, contextHolder] = notification.useNotification();
    const MyNotification = (
        type: NotificationType,
        message: string,
        description: string
    ) => {
        api[type]({
            message: message,
            description: description,
        });
    };

    const [isAddReviewOpen, setIsAddReviewOpen] = useState(false);

    const [courseRatingInfo, setCourseRatingInfo] =
        useState<ICourseRatingInfo>();

    const [reviews, setReviews] = useState<IReview[]>([]);
    const [userReview, setUserReview] = useState<string>("");
    const [userRating, setUserRating] = useState<number>(0);

    console.log("userReview", userReview);

    const {
        getCourseRatingInfo,
        getCourseReviews,
        getReviewByCourseAndUser,
        saveUserReview,
    } = useFetch();

    useEffect(() => {
        fetchCourseRatingInfo();
        fetchCourseReviews();
        fetchUserReview();
    }, [courseId]);

    const fetchCourseRatingInfo = async () => {
        const data = await getCourseRatingInfo(courseId);
        setCourseRatingInfo(data);
    };

    const fetchCourseReviews = async () => {
        const data = await getCourseReviews(courseId);
        setReviews(data);
    };

    const fetchUserReview = async () => {
        const data: IReview = await getReviewByCourseAndUser(courseId);
        setUserReview(data.text);
        setUserRating(data.rating);
    };

    const handleAddReview = async () => {
        if (userReview.length < 10) {
            MyNotification(
                "warning",
                "Пустой отзыв",
                "Перед добавлением отзыва нужно заполнить поле отзыва!"
            );
        } else if (!userRating) {
            MyNotification(
                "warning",
                "Внимание",
                "Вы не выбрали оценку для курса!"
            );
        } else if (userReview && userRating) {
            const resp = await saveUserReview({
                createdAt: new Date(),
                userId: 0,
                courseId: courseId,
                text: userReview,
                rating: userRating,
            });

            if (resp === "OK" && user) {
                MyNotification("success", "Успешно", "Ваш отзыв добавлен!");
                fetchCourseRatingInfo();
                fetchCourseReviews();
            } else if (resp === "BAD_REQUEST") {
                MyNotification("error", "Ошибка", "Что-то пошло не так");
            }
        }
    };

    const isLoading = !courseRatingInfo;

    if (isLoading)
        return (
            <div className="centered-div">
                <Spinner />
            </div>
        );

    return (
        <div className="reviews-container">
            {contextHolder}
            <ConfigProvider
                theme={{
                    token: {
                        marginXS: 4,
                    },
                }}
            >
                <h2 className="reviews-title">Отзывы</h2>
                <div className="reviews-stats">
                    <div className="rating-value">
                        <div className="rating-value__digit">
                            {(courseRatingInfo?.rating as number).toFixed(1)}
                        </div>
                        <div className="rating-value__stars rate">
                            <Rate disabled allowHalf defaultValue={5} />
                        </div>
                        <div className="rating-value__caption">
                            Рейтинг курса
                        </div>
                    </div>

                    <div className="rating-bars">
                        <ProgressBar
                            percentage={
                                courseRatingInfo?.star5Percentage as number
                            }
                        />
                        <ProgressBar
                            percentage={
                                courseRatingInfo?.star4Percentage as number
                            }
                        />
                        <ProgressBar
                            percentage={
                                courseRatingInfo?.star3Percentage as number
                            }
                        />
                        <ProgressBar
                            percentage={
                                courseRatingInfo?.star2Percentage as number
                            }
                        />
                        <ProgressBar
                            percentage={
                                courseRatingInfo?.star1Percentage as number
                            }
                        />
                    </div>
                    <div className="rating-stars rate --rate-reduced-star">
                        <div className="rating-stars__item">
                            <Rate disabled defaultValue={5} />
                            <span className="rating-stars__item-digit">
                                {(
                                    courseRatingInfo?.star5Percentage as number
                                ).toFixed(0)}
                                %
                            </span>
                        </div>
                        <div className="rating-stars__item">
                            <Rate disabled defaultValue={4} />
                            <span className="rating-stars__item-digit">
                                {(
                                    courseRatingInfo?.star4Percentage as number
                                ).toFixed(0)}
                                %
                            </span>
                        </div>
                        <div className="rating-stars__item">
                            <Rate disabled defaultValue={3} />
                            <span className="rating-stars__item-digit">
                                {(
                                    courseRatingInfo?.star3Percentage as number
                                ).toFixed(0)}
                                %
                            </span>
                        </div>
                        <div className="rating-stars__item">
                            <Rate disabled defaultValue={2} />
                            <span className="rating-stars__item-digit">
                                {(
                                    courseRatingInfo?.star2Percentage as number
                                ).toFixed(0)}
                                %
                            </span>
                        </div>
                        <div className="rating-stars__item">
                            <Rate disabled defaultValue={1} />
                            <span className="rating-stars__item-digit">
                                {(
                                    courseRatingInfo?.star1Percentage as number
                                ).toFixed(0)}
                                %
                            </span>
                        </div>
                    </div>
                </div>
                <div className="reviews">
                    {reviews.map((review) => (
                        <div key={review.reviewId} className="review-card">
                            <ReviewCard
                                body={review.text}
                                avatarImg={review.user.person?.avatarImg}
                                name={review.user.person?.name}
                                surname={review.user.person?.surname}
                                rating={review.rating}
                                createdAt={review.createdAt}
                            />
                        </div>
                    ))}
                </div>
                <div className="add-review">
                    {!isAddReviewOpen && (
                        <button
                            onClick={() => setIsAddReviewOpen(true)}
                            className="purple-button"
                        >
                            Оставить отзыв
                        </button>
                    )}
                    {isAddReviewOpen && (
                        <div className="add-review-container">
                            <div className="review-and-rating rate">
                                <TextEditor
                                    style={{ maxWidth: "700px" }}
                                    htmlText={userReview}
                                    setStateFunc={setUserReview}
                                />
                                <span className="review-and-rating__rating-text">
                                    Ваша оценка:{" "}
                                </span>
                                <Rate
                                    defaultValue={userRating}
                                    onChange={setUserRating}
                                />
                                <span className="review-and-rating__rating-text">
                                    {" "}
                                    ({userRating})
                                </span>
                            </div>

                            <button
                                onClick={handleAddReview}
                                className="black-submit-button "
                            >
                                Сохранить отзыв
                            </button>
                            <button
                                style={{ marginLeft: "10px" }}
                                onClick={() => setIsAddReviewOpen(false)}
                                className="black-submit-button"
                            >
                                Отмена
                            </button>
                        </div>
                    )}
                </div>
            </ConfigProvider>
        </div>
    );
};

export default Reviews;
