"use client";

import MainProfileForm from "@/components/forms/profile-forms/main-profile-form/MainProfileForm";
import Spinner from "../../../../spinners/spinner/Spinner";
import { NotificationType } from "@/interfaces/types";
import useFetch from "@/lib/hooks/useFetch";
import { useAppSelector } from "@/lib/redux/store/store";
import { ConfigProvider, notification } from "antd";
import React from "react";
import { FieldValues, useForm } from "react-hook-form";

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

    const {
        unregister,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const { getAndDispatchUser, putProfileInfo, isLoading } = useFetch();

    const formSubmit = async (data: FieldValues) => {
        if (user) {
            try {
                await putProfileInfo(data, user);
                await getAndDispatchUser();
                successNotification("success");
            } catch {
                errorNotification("error");
            }
        }
    };

    if (!user || isLoading) {
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
