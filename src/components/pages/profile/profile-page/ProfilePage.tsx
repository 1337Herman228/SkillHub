"use client";

import { useAppSelector } from "@/lib/redux/store/store";
import "./ProfilePage.scss";
import { useState } from "react";
import { signOut } from "next-auth/react";
import MainForm from "./main-form/MainForm";
import ProfilePhoto from "../profile-photo-page/ProfilePhoto";
import WantToTeach from "../want-to-teach/WantToTeach";
import ChangePassword from "./change-password/ChangePassword";
import { IProfileSectionInfo, IUser } from "@/interfaces/types";
import ProfileNavButton from "@/components/profile/profile-nav-btn/ProfileNavButton";
import Link from "next/link";
import AvatarStroke from "@/components/avatar-stroke/AvatarStroke";
import PurchasedAvatarStrokes from "./purchased-avatar-strokes/PurchasedAvatarStrokes";
import UsernameDecoration from "@/components/username-decoration/UsernameDecoration";
import PurchasedDignities from "./purchased-dignities/PurchasedDignities";
import PurchasedNicknameColors from "./purchased-nickname-colors/PurchasedNicknameColors";

const profileSectionsInfo: IProfileSectionInfo[] = [
    {
        id: "profile",
        title: "Профиль",
        linkName: "Профиль",
        description: "Ваша личная информация",
        children: <MainForm />,
    },
    {
        id: "avatar",
        title: "Аватар",
        linkName: "Аватар",
        description: "Здесь вы можете изменить свой аватар",
        children: <ProfilePhoto />,
    },
    {
        id: "change-password",
        title: "Смена пароля",
        linkName: "Изменить пароль",
        description: "Здесь мы можете поменять свой пароль",
        children: <ChangePassword />,
    },
    {
        id: "purchased-avatar-strokes",
        title: "Рамки аватара",
        linkName: "Рамки аватара",
        description: "Здесь вы можете изменить рамку аватара",
        children: <PurchasedAvatarStrokes />,
    },
    {
        id: "purchased-dignities",
        title: "Титулы",
        linkName: "Титулы",
        description: "Здесь вы можете изменить свой титул",
        children: <PurchasedDignities />,
    },
    {
        id: "purchased-nickname-colors",
        title: "Цвета никнейма",
        linkName: "Цвета никнейма",
        description: "Здесь вы можете изменить цвет для своего никнейма",
        children: <PurchasedNicknameColors />,
    },
];

const wantToTeach = [
    {
        id: "want-to-teach",
        title: "Хотите преподавать?",
        linkName: "Хочу преподавать",
        description: "Заполните форму и мы с вами свяжемся!",
        children: <WantToTeach />,
    },
];

const ProfilePage = () => {
    const user = useAppSelector((state) => state.user.user);

    const [currentSection, setCurrentSection] = useState<IProfileSectionInfo>(
        profileSectionsInfo[0]
    );

    const RoleNavLink = () => {
        switch (user?.role?.position) {
            case "admin":
                return (
                    <Link href={"/admin/"}>
                        <button tabIndex={-1} className="link">
                            Режим администратора
                        </button>
                    </Link>
                );
            case "user":
                return (
                    <>
                        {wantToTeach.map((section) => (
                            <ProfileNavButton
                                section={section}
                                key={section.id}
                                setCurrentSection={setCurrentSection}
                                className={`link ${
                                    currentSection.id === section.id
                                        ? "active"
                                        : ""
                                }`}
                            />
                        ))}
                    </>
                );
            case "teacher":
                return (
                    <Link href={"/teacher/"}>
                        <button tabIndex={-1} className="link">
                            Режим преподавателя
                        </button>
                    </Link>
                );
        }
    };

    if (!user) return null;

    return (
        <div className="profile-page container-reduced-medium">
            <div className="profile-dashboard">
                <div className="profile-dashboard__header">
                    <AvatarStroke size={140} frameSrc={user?.avatarStroke?.url}>
                        <img
                            className="user-avatar"
                            width={120}
                            height={120}
                            alt="avatar"
                            src={
                                user?.person?.avatarImg
                                    ? "upload-images/" + user?.person?.avatarImg
                                    : "svg/profile-large.svg"
                            }
                        />
                    </AvatarStroke>
                    <div className="username">
                        <UsernameDecoration user={user as IUser} />
                    </div>
                </div>
                <div className="profile-dashboard__links">
                    {profileSectionsInfo.map((section) => (
                        <ProfileNavButton
                            section={section}
                            key={section.id}
                            setCurrentSection={setCurrentSection}
                            className={`link ${
                                currentSection.id === section.id ? "active" : ""
                            }`}
                        />
                    ))}
                    <RoleNavLink />
                    <button onClick={() => signOut()} className={`link`}>
                        Выйти
                    </button>
                </div>
            </div>
            <div className="profile-inner">
                <div className="profile-inner__header">
                    <h1 className="profile-inner__header-title">
                        {currentSection.title}
                    </h1>
                    <div className="profile-inner__header-description">
                        <p>{currentSection.description}</p>
                    </div>
                </div>
                <div className="profile-inner__content content">
                    {currentSection.children}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
