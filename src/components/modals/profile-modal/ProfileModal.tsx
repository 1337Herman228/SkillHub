import HoverModal from "../hover-modal/HoverModal";
import Greetings from "@/components/profile/greetings/Greetings";
import { IUser, TRole } from "@/interfaces/types";
import Link from "next/link";
import "./ProfileModal.scss";
import { MutableRefObject } from "react";
import { signOut } from "next-auth/react";

interface ProfileModalProps {
    openBtnRef: MutableRefObject<HTMLButtonElement | null>;
    isOpen: boolean;
    setStateFunc: (state: boolean) => void;
    user: IUser;
    role: TRole;
}

const ProfileModal = ({
    isOpen,
    setStateFunc,
    user,
    openBtnRef,
    role,
}: ProfileModalProps) => {
    return (
        <HoverModal
            openBtnRef={openBtnRef}
            isOpen={isOpen}
            setStateFunc={setStateFunc}
        >
            <div className="profile-modal">
                <div style={{ width: 260 }}>
                    <Link className="main-profile-link" href={"/profile"}>
                        <Greetings
                            textBig={
                                <div className="user-name ellipse-text">
                                    {user.person?.name} {user.person?.surname}
                                </div>
                            }
                            textSmall={
                                <div className="user-email ellipse-text">
                                    {user.person?.email}
                                </div>
                            }
                            style={{ backgroundColor: "var(--white)" }}
                        />
                    </Link>

                    <ul className="link-list">
                        <Link className="link-list__item purple-hover" href="/">
                            Главная
                        </Link>
                        <Link
                            className="link-list__item purple-hover"
                            href="/all-courses"
                        >
                            Курсы
                        </Link>
                        <Link
                            className="link-list__item purple-hover"
                            href="/my-education"
                        >
                            Мое обучение
                        </Link>
                        {role === "teacher" && (
                            <Link
                                className="link-list__item purple-hover"
                                href="/teacher"
                            >
                                Режим преподавателя
                            </Link>
                        )}
                        {role === "admin" && (
                            <Link
                                className="link-list__item purple-hover"
                                href="/admin"
                            >
                                Режим администратора
                            </Link>
                        )}
                    </ul>
                    <ul className="link-list">
                        <Link className="link-list__item purple-hover" href="#">
                            Профиль
                        </Link>
                        <Link
                            href={""}
                            onClick={() => signOut()}
                            className="link-list__item purple-hover"
                        >
                            Выйти
                        </Link>
                    </ul>
                </div>
            </div>
        </HoverModal>
    );
};

export default ProfileModal;
