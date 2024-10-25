"use client";

import WantToTeachForm from "@/components/forms/profile-forms/want-to-teach-form/WantToTeachForm";
import Spinner from "@/components/spinners/spinner/Spinner";
import useFetch from "@/lib/hooks/useFetch";
import { useAppSelector } from "@/lib/redux/store/store";
import { ConfigProvider, notification } from "antd";
import React from "react";
import { FieldValues, useForm } from "react-hook-form";

type NotificationType = "success" | "info" | "warning" | "error";

const WantToTeach = () => {
    const [api, contextHolder] = notification.useNotification();
    const errorNotification = (type: NotificationType) => {
        api[type]({
            message: "Ошибка",
            description: "Вы уже отправили заявку!",
        });
    };
    const successNotification = (type: NotificationType) => {
        api[type]({
            message: "Успешно",
            description: "Запрос на становление преподавателем отправлен!",
        });
    };

    const user = useAppSelector((state) => state.user.user);

    const {
        unregister,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const { addBecomeTeacherRequest } = useFetch();

    const formSubmit = async (data: FieldValues) => {
        if (user) {
            try {
                const response = await addBecomeTeacherRequest(data, user);

                console.log("response", response);
                if (response === "BAD_REQUEST") {
                    errorNotification("error");
                } else if (response === "OK") {
                    successNotification("success");
                }
            } catch {
                errorNotification("error");
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
            <WantToTeachForm
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

export default WantToTeach;
