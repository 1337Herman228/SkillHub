"use client";

import { FieldValues, useForm } from "react-hook-form";
import { ConfigProvider, notification } from "antd";
import useHttp from "@/lib/hooks/useHttp";
import SignUpForm from "@/components/forms/auth-forms/sign-up-form/SignUpForm";

type NotificationType = "success" | "info" | "warning" | "error";

const SignUpPage = () => {
    const [api, contextHolder] = notification.useNotification();
    const userAlreadyExistsNotification = (type: NotificationType) => {
        api[type]({
            message: "Ошибка регистрации",
            description: "Пользователь с таким логином уже существует",
        });
    };
    const successfullyRegisteredNotification = (type: NotificationType) => {
        api[type]({
            message: "Вы успешно зарегистрировались",
            description:
                "А теперь авторизируйтесь чтобы проверить свой новый аккаунт ^-^",
        });
    };

    const {
        unregister,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const { authRequest } = useHttp();

    const formSubmit = async (data: FieldValues) => {
        const authResponse = await authRequest(
            `http://localhost:8080/auth/register`,
            "POST",
            JSON.stringify(data)
        );
        console.log("authResponse", authResponse);

        if (authResponse.token === "user already exists") {
            userAlreadyExistsNotification("warning");
        } else {
            successfullyRegisteredNotification("success");
        }
    };

    return (
        <>
            <ConfigProvider
                theme={{
                    components: {
                        Notification: {
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

            <SignUpForm
                formSubmit={formSubmit}
                handleSubmit={handleSubmit}
                register={register}
                unregister={unregister}
                errors={errors}
            />
        </>
    );
};

export default SignUpPage;
