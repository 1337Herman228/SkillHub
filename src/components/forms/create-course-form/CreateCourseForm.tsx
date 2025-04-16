"use client";

import "./CreateCourseForm.scss";
import DropdownList, { IOption } from "@/components/dropdowns/DropdownList";
import ImageUpload from "@/components/image-upload/ImageUpload";
import CustomInput from "@/components/inputs/custom-input/CustomInput";
import TextEditor from "@/components/text-editor/TextEditor";
import TextArea from "@/components/textarea/TextArea";
import useFetch from "@/lib/hooks/useFetch";
import useManageImg from "@/lib/hooks/useManageImg";
import { Modal } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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
    isAdmin?: boolean;
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
    isEditForm?: boolean;
    defaultImage?: any;
    defaultDropdownValue?: string;
    defaultValues?: {
        courseName?: string;
        topic?: string;
        shortDescription?: string;
        courseImg?: string;
    };
    courseId?: number;
}

const CreateCourseForm = ({
    isAdmin = false,
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
    isEditForm = false,
    defaultImage = null,
    defaultDropdownValue = "",
    defaultValues,
    courseId,
}: CreateCourseFormProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { deleteCourse } = useFetch();
    const { deleteImg } = useManageImg();
    const router = useRouter();

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        return () => {
            unregister("shortDescription");
        };
    }, []);

    const onDeleteCourse = async () => {
        await deleteCourse(courseId as number);
        await deleteImg(defaultValues?.courseImg ?? "");
        router.push(isAdmin ? "/admin/courses" : "/teacher/my-courses");
    };

    return (
        <div className="create-course-form-wrapper">
            <h1 className="form-title">
                {isEditForm ? "Редактирование курса" : "Создание курса"}
            </h1>
            <form
                onSubmit={handleSubmit((data) => formSubmit(data))}
                className="create-course-form form"
            >
                <div className="img-container">
                    <div className="img-container__label">Изображение:</div>

                    {img ? (
                        <>
                            <ImageUpload
                                defaultImg={
                                    defaultImage ? [...defaultImage] : []
                                }
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
                    unregister={unregister}
                    errors={errors}
                    defaultValue={defaultValues?.courseName ?? ""}
                />
                <CustomInput
                    labelText="В какой сфере будет курс?"
                    name="topic"
                    minLength={2}
                    register={register}
                    unregister={unregister}
                    errors={errors}
                    defaultValue={defaultValues?.topic ?? ""}
                />
                <DropdownList
                    setStateFunc={setDropdownValueFunc}
                    placeholder="Выберите уровень навыков"
                    labelText="Уровень навыков"
                    name="skillLevel"
                    options={skillLevels}
                    isError={!dropdownValue && isFormSubmitted}
                    defaultValue={skillLevels.find(
                        (item) => item.value === defaultDropdownValue
                    )}
                />
                <TextArea
                    labelText="Краткое описание курса"
                    name="shortDescription"
                    minLength={20}
                    register={register}
                    errors={errors}
                    defaultValue={defaultValues?.shortDescription ?? ""}
                />

                <TextEditor
                    setStateFunc={setText}
                    title="Подробное описание курса"
                    htmlText={text}
                    errorMessage={"Слишком мало текста!"}
                    isInvalid={text.length < 50 && isFormSubmitted}
                />

                <div className="dashboard-form">
                    <input
                        onClick={() => setIsFormSubmitted(true)}
                        className="submit-btn black-submit-button"
                        type="submit"
                        value={isEditForm ? "Подтвердить" : "Создать курс"}
                    />
                    {isEditForm && (
                        <button
                            onClick={showModal}
                            className="delete-btn red-button"
                            type="button"
                        >
                            Удалить курс
                        </button>
                    )}
                </div>
                <Modal
                    styles={{
                        content: {
                            borderRadius: 0,
                            border: "var(--border-black)",
                            boxShadow: "0 0 0 0",
                            padding: "35px 35px 40px 35px",
                            minWidth: "600px",
                        },
                        mask: {
                            backdropFilter: "blur(2px)",
                        },
                    }}
                    zIndex={7000}
                    centered
                    open={isModalOpen}
                    onCancel={handleCancel}
                    footer={
                        <div className="modal-footer">
                            <button
                                onClick={handleCancel}
                                className="black-submit-button"
                            >
                                Отмена
                            </button>
                            <button
                                onClick={() => onDeleteCourse()}
                                className="red-button"
                            >
                                Удалить
                            </button>
                        </div>
                    }
                >
                    <div className="modal-title">
                        Вы действительно хотите удалить курс?
                    </div>
                    <div className="modal-description">
                        Вместе с курсом будут удалены все уроки и материалы, а
                        также все связанные с ним данные.
                    </div>
                </Modal>
            </form>
        </div>
    );
};

export default CreateCourseForm;
