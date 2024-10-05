import CustomInput from "@/components/inputs/custom-input/CustomInput";
import Link from "next/link";
import React, { useEffect } from "react";
import {
    FieldErrors,
    FieldValues,
    SubmitErrorHandler,
    SubmitHandler,
    UseFormRegister,
    UseFormUnregister,
} from "react-hook-form";
import "../AuthForms.scss";
import { useMediaQuery } from "react-responsive";

interface SignUpFormProps {
    handleSubmit: (
        onValid: SubmitHandler<FieldValues>,
        onInvalid?: SubmitErrorHandler<FieldValues> | undefined
    ) => (e?: React.BaseSyntheticEvent) => Promise<void>;
    unregister: UseFormUnregister<FieldValues>;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors<FieldValues>;
    formSubmit: (data: FieldValues) => void;
}

const SignUpForm = ({
    formSubmit,
    handleSubmit,
    register,
    unregister,
    errors,
}: SignUpFormProps) => {
    const isTabletScreen = useMediaQuery({ query: "(max-width: 1300px)" });

    useEffect(() => {
        return () => {
            unregister("login");
            unregister("password");
            unregister("name");
            unregister("surname");
            unregister("email");
            unregister("phone");
        };
    }, []);

    return (
        <section className="auth-section centered-container">
            <div
                className="form-container"
                style={isTabletScreen ? { marginTop: "150px" } : {}}
            >
                <aside className="image-container">
                    <img
                        style={{ height: "70%" }}
                        className="image-container__img"
                        src="/auth/sign-up-img.jpeg"
                        alt=""
                        width={600}
                        height={600}
                    />
                </aside>

                <aside className="form-aside ">
                    <div className="navigation">
                        <Link href="/sign-in" className="navigation__link">
                            Авторизация
                        </Link>
                        <Link
                            href="/sign-up"
                            className="navigation__link active"
                        >
                            Регистрация
                        </Link>
                    </div>
                    <form
                        onSubmit={handleSubmit((data) => formSubmit(data))}
                        className="auth-form"
                    >
                        <CustomInput
                            labelText="Логин"
                            name="login"
                            minLength={3}
                            onlyLettersAndDigits={true}
                            register={register}
                            require
                            errors={errors}
                        />
                        <CustomInput
                            labelText="Пароль"
                            name="password"
                            type="password"
                            minLength={8}
                            onlyLettersAndDigits={true}
                            register={register}
                            require
                            errors={errors}
                        />
                        <CustomInput
                            labelText="Имя"
                            name="name"
                            minLength={2}
                            onlyLettersAndDigits={true}
                            register={register}
                            require
                            errors={errors}
                        />
                        <CustomInput
                            labelText="Фамилия"
                            name="surname"
                            minLength={2}
                            onlyLettersAndDigits={true}
                            register={register}
                            require
                            errors={errors}
                        />
                        <CustomInput
                            labelText="Email"
                            name="email"
                            type="email"
                            minLength={2}
                            onlyLettersAndDigits={false}
                            register={register}
                            require
                            errors={errors}
                        />
                        <CustomInput
                            labelText="Реферальный ключ"
                            name="referralKey"
                            register={register}
                            require
                            errors={errors}
                        />
                        <input
                            className="auth-form__submit-btn"
                            type="submit"
                            value="Подтвердить"
                        />
                    </form>
                </aside>
            </div>
        </section>
    );
};

export default SignUpForm;
