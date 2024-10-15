"use client";

import { useAppSelector } from "@/lib/redux/store/store";
import "./ProfilePage.scss";
import { useState } from "react";
import { signOut } from "next-auth/react";
import MainForm from "./main-form/MainForm";

interface IProfileSectionInfo {
    id: string;
    title: string;
    linkName: string;
    description: string;
    children?: React.ReactNode;
}

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
        children: <div>Аватар</div>,
    },
    {
        id: "want-to-teach",
        title: "Хотите преподавать?",
        linkName: "Хочу преподавать",
        description: "Заполните форму и мы с вами свяжемся!",
        children: <div>Хотите преподавать?</div>,
    },
];

const ProfilePage = () => {
    const user = useAppSelector((state) => state.user.user);

    const [currentSection, setCurrentSection] = useState<IProfileSectionInfo>(
        profileSectionsInfo[0]
    );

    return (
        <div className="profile-page container-reduced-medium">
            <div className="profile-dashboard">
                <div className="profile-dashboard__header">
                    <img
                        className="user-avatar"
                        width={120}
                        height={120}
                        alt="avatar"
                        src={user?.person?.avatarImg || "svg/profile-large.svg"}
                    />
                    <div className="username">
                        {user?.person?.name} {user?.person?.surname}
                    </div>
                </div>
                <div className="profile-dashboard__links">
                    {profileSectionsInfo.map((section) => (
                        <button
                            key={section.id}
                            onClick={() => setCurrentSection(section)}
                            className={`link ${
                                currentSection.id === section.id ? "active" : ""
                            }`}
                        >
                            {section.linkName}
                        </button>
                    ))}
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
