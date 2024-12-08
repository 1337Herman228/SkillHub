"use client";

import ChangePasswordForm from "@/components/forms/profile-forms/change-password-form/ChangePasswordForm";
import Spinner from "../../../../spinners/spinner/Spinner";
import useFetch from "@/lib/hooks/useFetch";
import { useAppSelector } from "@/lib/redux/store/store";
import { ConfigProvider, notification } from "antd";
import React from "react";
import { FieldValues, useForm } from "react-hook-form";

const ChangePassword = () => {
    const [api, contextHolder] = notification.useNotification();
    const notEqualRepeatPasswordsNotification = () => {
        api["warning"]({
            message: "Ошибка",
            description: "Новый пароль и повтор нового пароля не совпадают!",
        });
    };

    const notEqualPasswordsNotification = () => {
        api["error"]({
            message: "Ошибка",
            description: "Вы ввели неверный старый пароль!",
        });
    };

    const errorNotification = () => {
        api["error"]({
            message: "Ошибка",
            description: "Что-то пошло не так...",
        });
    };

    const successNotification = () => {
        api["success"]({
            message: "Успешно",
            description: "Ваш пароль успешно изменен!",
        });
    };

    const user = useAppSelector((state) => state.user.user);

    const {
        unregister,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const { changeUserPasswordRequest } = useFetch();

    const formSubmit = async (data: FieldValues) => {
        if (user) {
            if (data.newPassword !== data.repeatNewPassword) {
                notEqualRepeatPasswordsNotification();
            } else {
                try {
                    const response = await changeUserPasswordRequest(
                        data,
                        user
                    );
                    if (response === "BAD_REQUEST") {
                        notEqualPasswordsNotification();
                    } else if (response === "OK") {
                        successNotification();
                    }
                } catch {
                    errorNotification();
                }
            }
        }
    };

    if (!user) {
        return (
            <div
                style={{
                    display: "grid",
                    placeItems: "center",
                    width: "100%",
                    height: "700px",
                }}
            >
                <Spinner />
            </div>
        );
    }

    return (
        <>
            <ConfigProvider
                theme={{
                    components: {
                        Notification: {
                            zIndexPopup: 10000,
                            colorBgElevated: "#212121",
                            colorText: "white",
                            colorTextHeading: "white",
                            colorIcon: "white",
                            colorIconHover: "gray",
                        },
                    },
                }}
            >
                {contextHolder}
            </ConfigProvider>
            <ChangePasswordForm
                formSubmit={formSubmit}
                register={register}
                unregister={unregister}
                handleSubmit={handleSubmit}
                errors={errors}
            />
        </>
    );
};

export default ChangePassword;
