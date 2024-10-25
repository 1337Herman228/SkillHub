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
import { useEffect, useState } from "react";
import CustomInput from "@/components/inputs/custom-input/CustomInput";
import { IUser } from "@/interfaces/types";
import TextArea from "@/components/textarea/TextArea";
import TextEditor from "@/components/text-editor/TextEditor";

interface WantToTeachFormProps {
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

const WantToTeachForm = ({
    formSubmit,
    handleSubmit,
    register,
    unregister,
    errors,
}: WantToTeachFormProps) => {
    useEffect(() => {
        return () => {
            unregister("courseSphere");
            unregister("courseName");
            unregister("courseDescription");
        };
    }, []);

    return (
        <section className="want-to-teach-form-container form-container-profile">
            <form
                onSubmit={handleSubmit((data) => formSubmit(data))}
                className="want-to-teach form"
            >
                <CustomInput
                    labelText="В какой сфере будет курс?"
                    name="courseSphere"
                    minLength={3}
                    register={register}
                    errors={errors}
                />
                <CustomInput
                    labelText="Название курса"
                    name="courseName"
                    minLength={5}
                    register={register}
                    errors={errors}
                />

                <TextArea
                    labelText="Описание курса"
                    name="courseDescription"
                    minLength={30}
                    register={register}
                    errors={errors}
                />

                <input
                    className="submit-btn black-submit-button"
                    type="submit"
                    value="Отправить"
                />
            </form>
        </section>
    );
};

export default WantToTeachForm;
