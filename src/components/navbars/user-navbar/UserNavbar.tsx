"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import "./UserNavbar.scss";
import { useMediaQuery } from "react-responsive";
import useHttp from "@/lib/hooks/useHttp";
import { useSession } from "next-auth/react";
import { ExtendedSession } from "@/pages/api/auth/[...nextauth]";
import { useAppDispatch, useAppSelector } from "@/lib/redux/store/store";
import { setUser } from "@/lib/redux/slices/userSlice";
import UserNavbarSkeleton from "@/components/skeletons/user-navbar-skeleton/UserNavbarSkeleton";
import Greetings from "@/components/profile/greetings/Greetings";
import ProfileModal from "@/components/modals/profile-modal/ProfileModal";
import HoverModalOpenBtn from "@/components/buttons/hover-modal-open-btn/HoverModalOpenBtn";
import MessagesModal from "@/components/modals/messages-modal/MessagesModal";
import { usePathname } from "next/navigation";

const UserNavbar = () => {
    const pathname = usePathname();

    const btnProfileRef = useRef(null);
    const btnMessagesRef = useRef(null);

    const { requestJson, error, isLoading } = useHttp();
    const dispatch = useAppDispatch();

    const { data: session, status } = useSession();
    const sessionData: ExtendedSession | null = session;
    const token = sessionData?.user?.authenticationResponse?.token;

    const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });

    const sidebarRef = useRef<HTMLDivElement | null>(null);
    const mobileSearchRef = useRef<HTMLInputElement | null>(null);

    const user = useAppSelector((state) => state.user.user);

    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
    const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
    const [isProfileModalOpen, setIsProfileModalOpen] =
        useState<boolean>(false);
    const [isMessagesModalOpen, setIsMessagesModalOpen] =
        useState<boolean>(false);

    //Для единождой загрузки пользователя
    const isUserLoadedRef = useRef(true);
    useEffect(() => {
        if (isUserLoadedRef.current) {
            fetchUser();
        }
    }, [session]);

    const fetchUser = async () => {
        if (token && sessionData?.user?.userId) {
            // console.log("fetchUser");
            // console.log("token", token);
            const userData = await requestJson(
                token,
                `http://localhost:8080/user/get-user/${sessionData?.user?.userId}`
            );
            dispatch(setUser(userData));
            isUserLoadedRef.current = false;
        }
    };

    useEffect(() => {
        markCurrentLink(pathname);
    }, [pathname, isLoading, user]);

    const markCurrentLink = (currentUrl: string | null) => {
        const links: any = document.querySelectorAll(".link-to-check");

        for (var i = 0; i < links.length; i++) {
            links[i].classList.remove("current-link");
            const url = "http://localhost:3000" + currentUrl;

            if (
                url === "http://localhost:3000/" &&
                links[i].href === "http://localhost:3000/"
            ) {
                links[i].classList.add("current-link");
                continue;
            }

            if (
                url.includes(links[i].href) &&
                links[i].href !== "http://localhost:3000/"
            ) {
                links[i].classList.add("current-link");
            }
        }
    };

    const handleClickOutsideSidebar = (event: MouseEvent) => {
        if (
            sidebarRef.current &&
            !sidebarRef.current.contains(event.target as Node)
        ) {
            setIsSidebarOpen(false);
        }
    };

    const handleClickOutsideMobileSearch = (event: MouseEvent) => {
        if (
            mobileSearchRef.current &&
            !mobileSearchRef.current.contains(event.target as Node)
        ) {
            setIsSearchOpen(false);
        }
    };

    useEffect(() => {
        // Добавляем обработчик событий при монтировании
        document.addEventListener("mousedown", handleClickOutsideSidebar);
        document.addEventListener("mousedown", handleClickOutsideMobileSearch);

        // Удаляем обработчик при размонтировании
        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutsideSidebar
            );
            document.removeEventListener(
                "mousedown",
                handleClickOutsideMobileSearch
            );
        };
    }, []);

    if (isLoading || !user) return <UserNavbarSkeleton />;

    return (
        <header className="header">
            <nav className="header__inner container hidden-mobile">
                <div className="header__inner-left">
                    <Link className="header-logo link-to-check" href="/">
                        SkillHub
                    </Link>
                    <ul className="header-nav">
                        <Link
                            className="header-nav__item link-to-check"
                            href="/all-courses"
                        >
                            Курсы
                        </Link>
                        <Link
                            className="header-nav__item link-to-check"
                            href="my-education"
                        >
                            Мое обучение
                        </Link>
                    </ul>
                </div>

                <div className="header__inner-right">
                    <div className="header-search">
                        <img
                            className="header-search__img"
                            loading="lazy"
                            alt=""
                            src="svg/search.svg"
                            width={20}
                            height={20}
                        />
                        <input
                            className="header-search__input"
                            placeholder={
                                isTablet ? "Поиск" : "Ищите что угодно"
                            }
                        />
                    </div>

                    <ul className="header-icons">
                        <HoverModalOpenBtn
                            className="header-icons__button"
                            btnRef={btnMessagesRef}
                            stateSetter={setIsMessagesModalOpen}
                        >
                            <Link href="/profile">
                                <img
                                    className="header-icons__button-img"
                                    loading="lazy"
                                    alt=""
                                    src="svg/bell.svg"
                                    width={32}
                                    height={32}
                                />
                            </Link>
                            <MessagesModal
                                openBtnRef={btnMessagesRef}
                                isOpen={isMessagesModalOpen}
                                setStateFunc={setIsMessagesModalOpen}
                            />
                        </HoverModalOpenBtn>
                        <HoverModalOpenBtn
                            className="header-icons__button"
                            btnRef={btnProfileRef}
                            stateSetter={setIsProfileModalOpen}
                        >
                            <Link href="/profile">
                                <img
                                    className="header-icons__button-img"
                                    loading="lazy"
                                    alt=""
                                    src="svg/profile.svg"
                                    width={35}
                                    height={35}
                                />
                                <ProfileModal
                                    openBtnRef={btnProfileRef}
                                    user={user}
                                    isOpen={isProfileModalOpen}
                                    setStateFunc={setIsProfileModalOpen}
                                />
                            </Link>
                        </HoverModalOpenBtn>
                    </ul>
                </div>
            </nav>
            <nav className="header__inner visible-mobile">
                <div className="nav-mobile-part">
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="nav-mobile-part__button"
                        type="button"
                    >
                        <img
                            className="nav-mobile-part__button-img"
                            loading="lazy"
                            alt=""
                            src="svg/menu.svg"
                            width={26}
                            height={26}
                        />
                    </button>
                    <button
                        disabled={isSearchOpen}
                        onClick={() => setIsSearchOpen(!isSearchOpen)}
                        className="nav-mobile-part__button"
                        type="button"
                    >
                        <img
                            className="nav-mobile-part__button-img"
                            loading="lazy"
                            alt=""
                            src="svg/search-mobile.svg"
                            width={17}
                            height={17}
                        />
                    </button>
                    <input
                        ref={mobileSearchRef}
                        className={`nav-mobile-part__search ${
                            isSearchOpen ? "" : "not-active"
                        }`}
                        placeholder="Ищите что угодно"
                    />
                </div>
                <div className="nav-mobile-part">
                    <Link
                        className="nav-mobile-part__logo link-to-check"
                        href="/"
                    >
                        SkillHub
                    </Link>
                </div>
                <div className="nav-mobile-part">
                    <button className="nav-mobile-part__button" type="button">
                        <img
                            className="nav-mobile-part__button-img"
                            loading="lazy"
                            alt=""
                            src="svg/bell.svg"
                            width={21}
                            height={21}
                        />
                    </button>
                    <button className="nav-mobile-part__button" type="button">
                        <img
                            className="nav-mobile-part__button-img"
                            loading="lazy"
                            alt=""
                            src="svg/profile.svg"
                            width={24}
                            height={24}
                        />
                    </button>
                </div>

                <div
                    className={`backdrop ${isSidebarOpen ? "" : "not-active"}`}
                />

                <div
                    ref={sidebarRef}
                    className={`sidebar-container ${
                        isSidebarOpen ? "active" : ""
                    }`}
                >
                    <button
                        onClick={() => setIsSidebarOpen(false)}
                        className={`sidebar-container__close-btn ${
                            isSidebarOpen ? "" : "not-active"
                        }`}
                        type="button"
                    >
                        <img
                            className="sidebar-container__close-btn-img"
                            loading="lazy"
                            alt=""
                            src="svg/close.svg"
                            width={16}
                            height={16}
                        />
                    </button>
                    <nav className="menu">
                        <Greetings
                            textBig={
                                <>
                                    Здравствуйте,
                                    <br /> Имя Фамилия!
                                </>
                            }
                            textSmall="С возвращением!"
                        />
                        <ul className="menu__list">
                            <Link className="link-to-check" href="/all-courses">
                                <li className="menu__list-item link-to-check">
                                    Курсы
                                </li>
                            </Link>
                            <Link
                                className="link-to-check"
                                href="/my-education"
                            >
                                <li className="menu__list-item">
                                    Мое обучение
                                </li>
                            </Link>
                        </ul>
                    </nav>
                </div>
            </nav>
        </header>
    );
};

export default UserNavbar;
