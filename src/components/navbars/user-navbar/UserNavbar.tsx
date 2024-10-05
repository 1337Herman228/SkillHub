"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import "./UserNavbar.scss";
import { useMediaQuery } from "react-responsive";

const UserNavbar = () => {
    const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });

    const sidebarRef = useRef<HTMLDivElement | null>(null);
    const mobileSearchRef = useRef<HTMLInputElement | null>(null);

    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
    const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

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

    return (
        <header className="header">
            <nav className="header__inner container hidden-mobile">
                <div className="header__inner-left">
                    <Link className="header-logo" href="/">
                        SkillHub
                    </Link>
                    <ul className="header-nav">
                        <Link className="header-nav__item" href="#">
                            Курсы
                        </Link>
                        <Link className="header-nav__item" href="#">
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
                        <button className="header-icons__button" type="button">
                            <img
                                className="header-icons__button-img"
                                loading="lazy"
                                alt=""
                                src="svg/bell.svg"
                                width={32}
                                height={32}
                            />
                        </button>
                        <button className="header-icons__button" type="button">
                            <img
                                className="header-icons__button-img"
                                loading="lazy"
                                alt=""
                                src="svg/profile.svg"
                                width={35}
                                height={35}
                            />
                        </button>
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
                    <Link className="nav-mobile-part__logo" href="/">
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
                        <div className="menu__greetings">
                            <img
                                className="menu__greetings-img"
                                loading="lazy"
                                alt=""
                                src="svg/profile.svg"
                                width={55}
                                height={55}
                            />
                            <div className="menu__greetings-text">
                                <span className="menu__greetings-text-big">
                                    Здравствуйте,
                                    <br /> Имя Фамилия!
                                </span>

                                <span className="menu__greetings-text-small">
                                    С возвращением!
                                </span>
                            </div>
                        </div>
                        <ul className="menu__list">
                            <Link href="#">
                                <li className="menu__list-item">Курсы</li>
                            </Link>
                            <Link href="#">
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
