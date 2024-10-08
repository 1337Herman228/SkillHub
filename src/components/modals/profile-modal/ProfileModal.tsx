import HoverModal from "../hover-modal/HoverModal";
import Greetings from "@/components/profile/greetings/Greetings";
import { IUser } from "@/interfaces/types";
import Link from "next/link";
import "./ProfileModal.scss";
import { MutableRefObject } from "react";
import { signOut } from "next-auth/react";

interface ProfileModalProps {
    openBtnRef: MutableRefObject<HTMLButtonElement | null>;
    isOpen: boolean;
    setStateFunc: (state: boolean) => void;
    user: IUser;
}

const ProfileModal = ({
    isOpen,
    setStateFunc,
    user,
    openBtnRef,
}: ProfileModalProps) => {
    return (
        <HoverModal
            openBtnRef={openBtnRef}
            isOpen={isOpen}
            setStateFunc={setStateFunc}
        >
            <div className="profile-modal hidden-tablet">
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
                        <Link className="link-list__item purple-hover" href="#">
                            Главная
                        </Link>
                        <Link className="link-list__item purple-hover" href="#">
                            Курсы
                        </Link>
                        <Link className="link-list__item purple-hover" href="#">
                            Мое обучение
                        </Link>
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
