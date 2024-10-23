import { useAppSelector } from "@/lib/redux/store/store";
import "./DoubleNavbar.scss";
import UserNavbarSkeleton from "@/components/skeletons/user-navbar-skeleton/UserNavbarSkeleton";
import { INavLink } from "@/interfaces/types";
import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import useFetch from "@/lib/hooks/useFetch";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Greetings from "@/components/profile/greetings/Greetings";

interface DoubleNavbarProps {
    secondNavLinks: INavLink[];
    isCourseNavbar?: boolean;
}

const DoubleNavbar = ({
    secondNavLinks,
    isCourseNavbar,
}: DoubleNavbarProps) => {
    const sidebarRef = useRef<HTMLDivElement | null>(null);

    const { getAndDispatchCourse, isLoading } = useFetch();
    const { data: session } = useSession();

    const course = useAppSelector((state) => state.course);
    const user = useAppSelector((state) => state.user.user);

    const pathname = usePathname();
    const findSubstr = /my-courses\/\d*/;
    const substrWithCourseId = pathname?.match(findSubstr)?.[0];
    const courseId = Number(substrWithCourseId?.split("/")[1]);

    const TEACHER_PATHNAME = `/teacher/my-courses/${courseId}`;

    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

    const handleClickOutsideSidebar = (event: MouseEvent) => {
        if (
            sidebarRef.current &&
            !sidebarRef.current.contains(event.target as Node)
        ) {
            setIsSidebarOpen(false);
        }
    };

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
        if (session) {
            getAndDispatchCourse(courseId);
        }
    }, [session]);

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
                                    href={"/teacher/my-courses"}
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
                </div>
            </header>
            <header className="double-header hidden-mobile">
                <div className="double-navbar container">
                    <nav className="header-inner second-nav">
                        <ul className="header-nav">
                            {secondNavLinks.map((link) => (
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
                                            <br /> {user?.person?.name}{" "}
                                            {user?.person?.surname}!
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
                                    {secondNavLinks.map((link) => (
                                        <Link
                                            className="link-to-check"
                                            href={TEACHER_PATHNAME + link.href}
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
                </div>
            </header>
        </div>
    );
};

export default DoubleNavbar;
