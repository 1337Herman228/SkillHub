"use client";

import { IUser } from "@/interfaces/types";
import ProfileHoverCard from "../profile-hover-card/ProfileHoverCard";
import "./AccessCard.scss";
import { Modal } from "antd";
import { useState } from "react";
import useFetch from "@/lib/hooks/useFetch";

interface AccessCardProps {
    type: "has-access" | "request-access";
    user: IUser;
    courseId: number;
    fetchAllRecords: () => void;
    accessId?: number;
}

const AccessCard = ({
    type,
    user,
    courseId,
    fetchAllRecords,
    accessId,
}: AccessCardProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { removeUserAccess, approveCourseAccess, rejectCourseAccess } =
        useFetch();

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onDeleteUserAccess = async () => {
        await removeUserAccess(user.userId as number, courseId);
        fetchAllRecords();
        handleCancel();
    };

    const onApproveAccess = async () => {
        if (type === "request-access") {
            await approveCourseAccess(accessId as number);
            fetchAllRecords();
        }
    };

    const onRejectAccess = async () => {
        if (type === "request-access") {
            await rejectCourseAccess(accessId as number);
            fetchAllRecords();
        }
    };

    return (
        <div className="access-card-container">
            <div className="user-part">
                <ProfileHoverCard
                    username={user.person?.name + " " + user.person?.surname}
                    imgSrc={user.person?.avatarImg}
                />
            </div>
            <div className="buttons-part">
                {type === "request-access" && (
                    <div className="request-access-btns">
                        <button
                            onClick={onApproveAccess}
                            className="request-access-btn approve"
                        >
                            <img
                                className=""
                                src="/svg/correct-mark.svg"
                                alt="approve"
                                width={19}
                                height={15}
                            />
                        </button>
                        <button
                            onClick={onRejectAccess}
                            className="request-access-btn reject"
                        >
                            <img
                                className=""
                                src="/svg/close.svg"
                                alt="reject"
                                width={16}
                                height={16}
                            />
                        </button>
                    </div>
                )}
                {type === "has-access" && (
                    <div className="request-access-btns">
                        <button
                            onClick={showModal}
                            className="request-access-btn default"
                        >
                            <img
                                src="/svg/close.svg"
                                alt="approve"
                                width={16}
                                height={16}
                            />
                        </button>
                    </div>
                )}
            </div>

            <Modal
                styles={{
                    content: {
                        borderRadius: 0,
                        border: "var(--border-black)",
                        boxShadow: "0 0 0 0",
                        padding: "35px 35px 40px 35px",
                        minWidth: "600px",
                    },
                    mask: {
                        backdropFilter: "blur(2px)",
                    },
                }}
                zIndex={7000}
                centered
                open={isModalOpen}
                onCancel={handleCancel}
                footer={
                    <div className="modal-footer">
                        <button
                            onClick={handleCancel}
                            className="black-submit-button"
                        >
                            Отмена
                        </button>
                        <button
                            onClick={() => onDeleteUserAccess()}
                            className="red-button"
                        >
                            Подтвердить
                        </button>
                    </div>
                }
            >
                <div className="modal-title">
                    Вы действительно хотите забрать права доступа у{" "}
                    {user.person?.name} {user.person?.surname}?
                </div>
                <div className="modal-description">
                    Пользователь потеряет доступ к данному курсу и весь его
                    прогресс в прохождении будет сброшен.
                </div>
            </Modal>
        </div>
    );
};

export default AccessCard;
