import Link from "next/link";
import "./UserFooter.scss";

const UserFooter = () => {
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
                        <Link href={"/profile/want-to-teach"}>
                            <button
                                tabIndex={0}
                                className="top-content__right-side-button transparent-white-button"
                            >
                                На страницу курсов!
                            </button>
                        </Link>
                    </div>
                </div>
                <nav className="navigation">
                    <Link className="navigation__Logo" href={"/"}>
                        SkillHub
                    </Link>
                    <div className="navigation__links hidden-mobile">
                        <Link className="navigation__link" href="/all-courses">
                            Курсы
                        </Link>
                        <Link className="navigation__link" href="/all-courses">
                            Мое обучение
                        </Link>
                    </div>
                </nav>
            </div>
        </footer>
    );
};

export default UserFooter;
