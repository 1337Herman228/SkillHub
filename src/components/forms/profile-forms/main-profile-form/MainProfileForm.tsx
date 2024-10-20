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
import { IUser } from "@/interfaces/types";

interface MainProfileFormProps {
    handleSubmit: (
        onValid: SubmitHandler<FieldValues>,
        onInvalid?: SubmitErrorHandler<FieldValues> | undefined
    ) => (e?: React.BaseSyntheticEvent) => Promise<void>;
    unregister: UseFormUnregister<FieldValues>;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors<FieldValues>;
    formSubmit: (data: FieldValues) => void;
    user?: IUser;
}

const MainProfileForm = ({
    formSubmit,
    handleSubmit,
    register,
    unregister,
    errors,
    user,
}: MainProfileFormProps) => {
    useEffect(() => {
        return () => {
            unregister("name");
            unregister("surname");
            unregister("login");
            unregister("email");
        };
    }, []);

    return (
        <section className="profile-form-container form-container-profile">
            <form
                onSubmit={handleSubmit((data) => formSubmit(data))}
                className="profile-form form"
            >
                <CustomInput
                    labelText="Имя"
                    name="name"
                    minLength={2}
                    onlyLettersAndDigits={true}
                    register={register}
                    errors={errors}
                    defaultValue={user?.person?.name}
                />
                <CustomInput
                    labelText="Фамилия"
                    name="surname"
                    minLength={2}
                    onlyLettersAndDigits={true}
                    register={register}
                    errors={errors}
                    defaultValue={user?.person?.surname}
                />
                <CustomInput
                    labelText="Login"
                    name="login"
                    minLength={3}
                    onlyLettersAndDigits={true}
                    register={register}
                    errors={errors}
                    defaultValue={user?.login}
                />

                <CustomInput
                    labelText="Email"
                    name="email"
                    minLength={3}
                    register={register}
                    errors={errors}
                    defaultValue={user?.person?.email}
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

export default MainProfileForm;
