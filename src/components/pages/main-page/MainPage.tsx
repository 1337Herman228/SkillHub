"use client";

import FullScreenSpinner from "@/components/spinners/full-screen-spinner/FullScreenSpinner";
import { useAppSelector } from "@/lib/redux/store/store";
import "./MainPage.scss";
import Greetings from "@/components/profile/greetings/Greetings";
import Link from "next/link";
import { useMediaQuery } from "react-responsive";
import useHttp from "@/lib/hooks/useHttp";
import { useSession } from "next-auth/react";
import { ExtendedSession } from "@/pages/api/auth/[...nextauth]";
import { useEffect, useState } from "react";
import { IContinueCourse, TRole } from "@/interfaces/types";
import ContinueCourseCard from "@/components/cards/continue-course-card/ContinueCourseCard";
import ScrollableBlock, {
    Item,
} from "@/components/scrollable-block/ScrollableBlock";

const MainPage = () => {
    const isDesktop = useMediaQuery({ query: "(min-width: 1025px)" });
    const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });
    const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

    const chooseScrollQuantity = () => {
        if (isDesktop) {
            return 3;
        }
        if (isTablet) {
            return 2;
        }
        if (isMobile) {
            return 1;
        }
        return 1;
    };

    const { requestJson, error } = useHttp();
    const isMobileDevice = useMediaQuery({ query: "(max-width: 768px)" });
    const user = useAppSelector((state) => state.user.user);

    const { data: session } = useSession();
    const sessionData: ExtendedSession | null = session;
    const token = sessionData?.user?.authenticationResponse?.token;

    const [userCourses, setUserCourses] = useState<IContinueCourse[] | null>(
        null
    );
    const fetchUserCourses = async () => {
        if (user && token) {
            const userCoursesData = await requestJson(
                token,
                `http://localhost:8080/user/get-continue-courses/${sessionData?.user?.userId}`
            );
            setUserCourses(userCoursesData);
        }
    };
    useEffect(() => {
        fetchUserCourses();
    }, [user]);

    const rolePrefix = (role: TRole) => {
        switch (role) {
            case "user":
                return null;
            case "teacher":
                return " Преподаватель";
            case "admin":
                return " Администратор";
        }
    };

    if (!user || !userCourses) {
        return <FullScreenSpinner />;
    }

    return (
        <div className="main-page container-reduced-medium ">
            <section className="main-page__greetings">
                <Greetings
                    textBig={
                        <div className="user-name">
                            С возвращением,
                            {rolePrefix(user.role?.position as TRole)}{" "}
                            {user.person?.name}
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
                            ? "/images/advice-mobile.png"
                            : "/images/advice.png"
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
                <div className="continue-title title">Продолжить обучение</div>
                <div className="continue-courses">
                    {!userCourses ? (
                        <>
                            <div className="continue-courses__empty">
                                <p className="continue-courses__empty-text title-description">
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
                        <div className="continue-courses__content">
                            <ScrollableBlock
                                itemsToScroll={chooseScrollQuantity()}
                            >
                                {userCourses.map((course) => (
                                    <Item
                                        style={{ paddingTop: 7 }}
                                        key={course.course.courseId}
                                    >
                                        <ContinueCourseCard
                                            key={course.course.courseId}
                                            course={course}
                                        />
                                    </Item>
                                ))}
                            </ScrollableBlock>
                        </div>
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
