"use client";

import MainProfileForm from "@/components/forms/profile-forms/main-profile-form/MainProfileForm";
import Spinner from "@/components/spinners/spinner/Spinner";
import useHttp from "@/lib/hooks/useHttp";
import { setUser } from "@/lib/redux/slices/userSlice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/store/store";
import { ExtendedSession } from "@/pages/api/auth/[...nextauth]";
import { ConfigProvider, notification } from "antd";
import { useSession } from "next-auth/react";
import React from "react";
import { FieldValues, useForm } from "react-hook-form";

type NotificationType = "success" | "info" | "warning" | "error";

const MainForm = () => {
    const [api, contextHolder] = notification.useNotification();
    const errorNotification = (type: NotificationType) => {
        api[type]({
            message: "Ошибка",
            description: "Что-то пошло не так",
        });
    };
    const successNotification = (type: NotificationType) => {
        api[type]({
            message: "Успешно",
            description: "Данные успешно изменены",
        });
    };

    const user = useAppSelector((state) => state.user.user);
    const dispatch = useAppDispatch();

    const { data: session, status } = useSession();
    const sessionData: ExtendedSession | null = session;
    const token = sessionData?.user?.authenticationResponse?.token;

    const {
        unregister,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const { requestJson } = useHttp();

    const formSubmit = async (data: FieldValues) => {
        if (token) {
            try {
                const response = await requestJson(
                    token,
                    `http://localhost:8080/user/edit-profile-info`,
                    "PUT",
                    JSON.stringify({
                        ...data,
                        userId: user?.userId,
                    })
                );
                console.log("authResponse", response.status);
                fetchUser();
                successNotification("success");
            } catch {
                errorNotification("error");
            }
        }
    };

    const fetchUser = async () => {
        if (token) {
            const userData = await requestJson(
                token,
                `http://localhost:8080/user/get-user/${sessionData?.user?.userId}`
            );
            dispatch(setUser(userData));
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
            <MainProfileForm
                formSubmit={formSubmit}
                register={register}
                unregister={unregister}
                handleSubmit={handleSubmit}
                errors={errors}
                user={user}
            />
        </>
    );
};

export default MainForm;
