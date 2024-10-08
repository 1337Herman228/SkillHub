"use client";

import FullScreenSpinner from "@/components/spinners/full-screen-spinner/FullScreenSpinner";
import { useAppSelector } from "@/lib/redux/store/store";
import "./MainPage.scss";
import Greetings from "@/components/profile/greetings/Greetings";
import Link from "next/link";
import { useMediaQuery } from "react-responsive";

const userCourses: any = null;

const MainPage = () => {
    const isMobileDevice = useMediaQuery({ query: "(max-width: 768px)" });
    const user = useAppSelector((state) => state.user.user);

    if (!user) {
        return <FullScreenSpinner />;
    }

    return (
        <div className="main-page container-reduced-medium ">
            <section className="main-page__greetings">
                <Greetings
                    textBig={
                        <div className="user-name">
                            С возвращением, {user.person?.name}
                        </div>
                    }
                    textSmall={
                        <div className="action-link">
                            <Link
                                href={
                                    userCourses
                                        ? "/my-education"
                                        : "/all-courses"
                                }
                            >
                                {userCourses
                                    ? "Продолжить обучение?"
                                    : "Начать обучение?"}
                            </Link>
                        </div>
                    }
                    style={{ backgroundColor: "var(--white)", border: "none" }}
                />
            </section>

            <section className="main-page__advice">
                <img
                    className="advice-img"
                    width={1300}
                    height={400}
                    alt="advice"
                    src={
                        isMobileDevice
                            ? "images/advice-mobile.png"
                            : "images/advice.png"
                    }
                />
                <div className="advice-content">
                    <div className="advice-content__title">
                        Медленно, но верно
                    </div>
                    <div className="advice-content__text">
                        <p>
                            Попробуйте отводить на обучение всего 5–10 минут в
                            день. Изучайте курсы и раскройте свой потенциал.
                        </p>
                    </div>
                </div>
            </section>

            <section className="main-page__continue-education section-medium">
                <div className="continue-title">Продолжить обучение</div>
                <div className="continue-courses">
                    {!userCourses ? (
                        <>
                            <div className="continue-courses__empty">
                                <p className="continue-courses__empty-text">
                                    Похоже, вы его даже не начинали! Так давайте
                                    начнем!
                                </p>
                            </div>
                            <Link href={"/all-courses"}>
                                <button
                                    tabIndex={0}
                                    className="continue-courses__empty-button purple-button"
                                >
                                    На страницу курсов!
                                </button>
                            </Link>
                        </>
                    ) : (
                        <div>Курсы</div>
                    )}
                </div>
            </section>

            {userCourses ? (
                <>
                    <section className="main-page__continue-education section-medium">
                        <div className="continue-title">Начать новый курс</div>
                        <div className="continue-courses">
                            <Link href={"/all-courses"}>
                                <button
                                    tabIndex={0}
                                    className="continue-courses__empty-button purple-button"
                                >
                                    На страницу курсов!
                                </button>
                            </Link>
                        </div>
                    </section>
                </>
            ) : null}
        </div>
    );
};

export default MainPage;
