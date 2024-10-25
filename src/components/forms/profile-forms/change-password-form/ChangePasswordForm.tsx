"use client";

import {
    FieldErrors,
    FieldValues,
    SubmitErrorHandler,
    SubmitHandler,
    UseFormRegister,
    UseFormUnregister,
} from "react-hook-form";
import "../ProfileForms.scss";
import { useEffect } from "react";
import CustomInput from "@/components/inputs/custom-input/CustomInput";

interface ChangePasswordFormProps {
    handleSubmit: (
        onValid: SubmitHandler<FieldValues>,
        onInvalid?: SubmitErrorHandler<FieldValues> | undefined
    ) => (e?: React.BaseSyntheticEvent) => Promise<void>;
    unregister: UseFormUnregister<FieldValues>;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors<FieldValues>;
    formSubmit: (data: FieldValues) => void;
}

const ChangePasswordForm = ({
    formSubmit,
    handleSubmit,
    register,
    unregister,
    errors,
}: ChangePasswordFormProps) => {
    useEffect(() => {
        return () => {
            unregister("oldPassword");
            unregister("newPassword");
            unregister("repeatNewPassword");
        };
    }, []);

    return (
        <section className="change-password-form-container form-container-profile">
            <form
                onSubmit={handleSubmit((data) => formSubmit(data))}
                className="change-password-form form"
            >
                <CustomInput
                    labelText="Cтарый пароль"
                    name="oldPassword"
                    minLength={8}
                    onlyLettersAndDigits={true}
                    register={register}
                    errors={errors}
                    type="password"
                />
                <CustomInput
                    labelText="Новый пароль"
                    name="newPassword"
                    minLength={8}
                    onlyLettersAndDigits={true}
                    register={register}
                    errors={errors}
                    type="password"
                />
                <CustomInput
                    labelText="Повторите новый пароль"
                    name="repeatNewPassword"
                    minLength={8}
                    onlyLettersAndDigits={true}
                    register={register}
                    errors={errors}
                    type="password"
                />

                <input
                    className="submit-btn black-submit-button"
                    type="submit"
                    value="Сохранить"
                />
            </form>
        </section>
    );
};

export default ChangePasswordForm;
