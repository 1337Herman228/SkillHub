import Link from "next/link";
import "./Footer.scss";
import { TRole } from "@/interfaces/types";
import {
    userNavLinks,
    teacherNavLinks,
    adminNavLinks,
    chooseNavLinks,
} from "@/components/navbars/user-navbar/Navbar";

interface FooterProps {
    role: TRole;
}

const Footer = ({ role }: FooterProps) => {
    const FooterBtn = ({ role }: { role: TRole }) => {
        switch (role) {
            case "user":
                return (
                    <Link href={"/profile"}>
                        <button
                            tabIndex={-1}
                            className="top-content__right-side-button transparent-white-button"
                        >
                            Хочу преподавать
                        </button>
                    </Link>
                );
            case "teacher":
                return (
                    <Link href={"/teacher/"}>
                        <button
                            tabIndex={-1}
                            className="top-content__right-side-button transparent-white-button"
                        >
                            Режим преподавателя
                        </button>
                    </Link>
                );
            case "admin":
                return <div></div>;
        }
    };

    return (
        <footer className="footer ">
            <div className="footer__inner container">
                <div className="top-content">
                    <div className="top-content__left-side">
                        <div className="text-title">
                            Обучение онлайн без границ
                        </div>
                        <div className="text-description">
                            Создавайте онлайн-видеокурсы, учите и помогайте
                            учить!
                        </div>
                    </div>
                    <div className="top-content__right-side">
                        <FooterBtn role={role} />
                    </div>
                </div>
                <nav className="navigation">
                    <Link className="navigation__Logo" href={"/"}>
                        SkillHub
                    </Link>
                    <div className="navigation__links hidden-mobile">
                        {chooseNavLinks(role).map((link) => (
                            <Link
                                key={link.id}
                                className="navigation__link"
                                href={link.href}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </nav>
            </div>
        </footer>
    );
};

export default Footer;
