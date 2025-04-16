import { useAppSelector } from "@/lib/redux/store/store";
import "./DoubleNavbar.scss";
import UserNavbarSkeleton from "@/components/skeletons/user-navbar-skeleton/UserNavbarSkeleton";
import { INavLink } from "@/interfaces/types";
import { useEffect, useRef, useState } from "react";
import useFetch from "@/lib/hooks/useFetch";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";
import Greetings from "@/components/profile/greetings/Greetings";
import CourseProgressNav from "./course-progress/CourseProgress";

interface DoubleNavbarProps {
    secondNavLinks?: INavLink[];
    isCourseNavbar?: boolean;
    isUserNavbar?: boolean;
    isAdminNavbar?: boolean;
}

const DoubleNavbar = ({
    secondNavLinks,
    isCourseNavbar,
    isAdminNavbar = false,
    isUserNavbar = false,
}: DoubleNavbarProps) => {
    const sidebarRef = useRef<HTMLDivElement | null>(null);

    const { getAndDispatchCourse, getAndDispatchUser, isLoading } = useFetch();

    const course = useAppSelector((state) => state.course);

    const params = useParams();
    const pathname = usePathname();

    const courseId = Number(params ? params["course-id"] : 0);
    const TEACHER_PATHNAME = isAdminNavbar
        ? `/admin/courses/${courseId}`
        : `/teacher/my-courses/${courseId}`;

    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

    const handleClickOutsideSidebar = (event: MouseEvent) => {
        if (
            sidebarRef.current &&
            !sidebarRef.current.contains(event.target as Node)
        ) {
            setIsSidebarOpen(false);
        }
    };

    //Для единождой загрузки пользователя
    const isUserLoadedRef = useRef(true);
    useEffect(() => {
        if (isUserLoadedRef.current) {
            getAndDispatchUser();
            isUserLoadedRef.current = false;
        }
    }, []);

    useEffect(() => {
        // Добавляем обработчик событий при монтировании
        document.addEventListener("mousedown", handleClickOutsideSidebar);

        // Удаляем обработчик при размонтировании
        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutsideSidebar
            );
        };
    }, []);

    useEffect(() => {
        if (courseId) {
            getAndDispatchCourse(courseId);
        }
    }, [courseId]);

    useEffect(() => {
        markCurrentLink(pathname);
    }, [pathname, isLoading]);

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

    if (!course.course || isLoading) return <UserNavbarSkeleton />;

    return (
        <div className="double-header-wrapper">
            <header className="double-header hidden-mobile">
                <div className="double-navbar container">
                    <nav className="header-inner first-nav hidden-mobile">
                        {isCourseNavbar ? (
                            <div className="course-first-nav">
                                <Link
                                    className="back"
                                    href={
                                        isUserNavbar
                                            ? "/my-education"
                                            : isAdminNavbar
                                            ? "/admin/courses"
                                            : "/teacher/my-courses"
                                    }
                                >
                                    <img
                                        className="back__img"
                                        src={"/svg/nav-arrow-left.svg"}
                                        width={21}
                                        height={20}
                                        loading="lazy"
                                        alt="Back"
                                    />
                                </Link>
                                <Link href={TEACHER_PATHNAME} className="link">
                                    {course.course.courseName}
                                </Link>
                            </div>
                        ) : (
                            <div>First ADMIN nav</div>
                        )}
                    </nav>
                    {isUserNavbar && (
                        <div className="course-progress">
                            <CourseProgressNav
                                courseId={courseId}
                                courseName={course.course.courseName}
                            />
                        </div>
                    )}
                </div>
            </header>
            {!isUserNavbar && (
                <header className="double-header hidden-mobile">
                    <div className="double-navbar container">
                        <nav className="header-inner second-nav">
                            <ul className="header-nav">
                                {secondNavLinks &&
                                    secondNavLinks.map((link) => (
                                        <Link
                                            className="header-nav__item link-to-check"
                                            href={TEACHER_PATHNAME + link.href}
                                            key={link.id}
                                        >
                                            {link.name}
                                        </Link>
                                    ))}
                            </ul>
                        </nav>
                    </div>
                </header>
            )}
            <header className="double-header visible-mobile">
                <div className="double-navbar container">
                    <nav className="header-inner-mobile first-nav">
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
                                    src="/svg/menu.svg"
                                    width={26}
                                    height={26}
                                />
                            </button>
                        </div>

                        {isCourseNavbar ? (
                            <span className="link">
                                {course.course.courseName}
                            </span>
                        ) : (
                            <>ADMIN</>
                        )}

                        <div
                            className={`backdrop ${
                                isSidebarOpen ? "" : "not-active"
                            }`}
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
                                    src="/svg/close.svg"
                                    width={16}
                                    height={16}
                                />
                            </button>
                            <nav className="menu">
                                <Greetings
                                    textBig={
                                        <>
                                            Здравствуйте,
                                            <br />
                                        </>
                                    }
                                    textSmall="С возвращением!"
                                />
                                <ul className="menu__list">
                                    <Link className="link-to-check" href={"/"}>
                                        <li className="menu__list-item link-to-check">
                                            Главная
                                        </li>
                                    </Link>
                                    {secondNavLinks &&
                                        secondNavLinks.map((link) => (
                                            <Link
                                                className="link-to-check"
                                                href={
                                                    TEACHER_PATHNAME + link.href
                                                }
                                                key={link.id}
                                            >
                                                <li className="menu__list-item link-to-check">
                                                    {link.name}
                                                </li>
                                            </Link>
                                        ))}
                                </ul>
                            </nav>
                        </div>
                    </nav>
                    {isUserNavbar && (
                        <div className="course-progress">
                            <CourseProgressNav
                                courseId={courseId}
                                courseName={course.course.courseName}
                            />
                        </div>
                    )}
                </div>
            </header>
        </div>
    );
};

export default DoubleNavbar;
