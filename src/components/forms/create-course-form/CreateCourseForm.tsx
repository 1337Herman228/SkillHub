"use client";

import "./CreateCourseForm.scss";
import DropdownList, { IOption } from "@/components/dropdowns/DropdownList";
import ImageUpload from "@/components/image-upload/ImageUpload";
import CustomInput from "@/components/inputs/custom-input/CustomInput";
import TextEditor from "@/components/text-editor/TextEditor";
import TextArea from "@/components/textarea/TextArea";
import { useEffect } from "react";
import {
    FieldErrors,
    FieldValues,
    SubmitErrorHandler,
    SubmitHandler,
    UseFormRegister,
    UseFormUnregister,
} from "react-hook-form";

const skillLevels: IOption[] = [
    {
        value: "START",
        name: "Начальный",
    },
    {
        value: "NORMAL",
        name: "Средний",
    },
    {
        value: "PRO",
        name: "Продвинутый",
    },
    {
        value: "ALL",
        name: "Все уровни",
    },
];

interface CreateCourseFormProps {
    handleSubmit: (
        onValid: SubmitHandler<FieldValues>,
        onInvalid?: SubmitErrorHandler<FieldValues> | undefined
    ) => (e?: React.BaseSyntheticEvent) => Promise<void>;
    unregister: UseFormUnregister<FieldValues>;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors<FieldValues>;
    formSubmit: (data: FieldValues) => void;
    setText: (text: string) => void;
    img: any;
    setImg: (img: any) => void;
    isFormSubmitted: boolean;
    setIsFormSubmitted: (isFormSubmitted: boolean) => void;
    dropdownValue: string;
    setDropdownValueFunc: (state: string) => void;
    text: string;
}

const CreateCourseForm = ({
    handleSubmit,
    unregister,
    register,
    errors,
    formSubmit,
    setText,
    img,
    setImg,
    isFormSubmitted,
    setIsFormSubmitted,
    setDropdownValueFunc,
    dropdownValue,
    text,
}: CreateCourseFormProps) => {
    useEffect(() => {
        return () => {
            unregister("courseName");
            unregister("topic");
            unregister("shortDescription");
        };
    }, []);

    return (
        <div className="create-course-form-wrapper">
            <h1 className="form-title">Создание курса</h1>
            <form
                onSubmit={handleSubmit((data) => formSubmit(data))}
                className="create-course-form form"
            >
                <div className="img-container">
                    <div className="img-container__label">Изображение:</div>

                    {img ? (
                        <>
                            <ImageUpload
                                defaultImg={[
                                    {
                                        // uid: "avatar-" + user?.userId,
                                        // name: "avatar-" + user?.userId + ".png",
                                        // status: "done",
                                        // url:
                                        //     "upload-images/" +
                                        //     user?.person?.avatarImg,
                                    },
                                ]}
                                img={img}
                                isFormSubmitted={false}
                                setImg={setImg}
                            />
                        </>
                    ) : (
                        <>
                            <ImageUpload
                                img={img}
                                isFormSubmitted={false}
                                setImg={setImg}
                            />
                        </>
                    )}

                    <p className="error-message">
                        {isFormSubmitted && !img
                            ? img
                                ? null
                                : "Загрузите изображение"
                            : null}
                    </p>
                </div>

                <CustomInput
                    labelText="Название курса"
                    name="courseName"
                    minLength={5}
                    register={register}
                    errors={errors}
                />
                <CustomInput
                    labelText="В какой сфере будет курс?"
                    name="topic"
                    minLength={2}
                    register={register}
                    errors={errors}
                />
                <DropdownList
                    setStateFunc={setDropdownValueFunc}
                    placeholder="Выберите уровень навыков"
                    labelText="Уровень навыков"
                    name="skillLevel"
                    options={skillLevels}
                    isError={!dropdownValue && isFormSubmitted}
                    // defaultValue={skillLevels[1]}
                />
                <TextArea
                    labelText="Краткое описание курса"
                    name="shortDescription"
                    minLength={20}
                    register={register}
                    errors={errors}
                />

                <TextEditor
                    setStateFunc={setText}
                    title="Подробное описание курса"
                    htmlText={`<h3><strong>Title</strong></h3>`}
                    errorMessage={"Слишком мало текста!"}
                    isInvalid={text.length < 50 && isFormSubmitted}
                />

                {/* <div
                    dangerouslySetInnerHTML={{ __html: text }}
                    className="html-block"
                ></div> */}

                <input
                    onClick={() => setIsFormSubmitted(true)}
                    className="submit-btn black-submit-button"
                    type="submit"
                    value="Создать курс"
                />
            </form>
        </div>
    );
};

export default CreateCourseForm;
