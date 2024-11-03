"use client";

import { FieldValues, useForm } from "react-hook-form";
import "./AddChapterForm.scss";
import CustomInput from "@/components/inputs/custom-input/CustomInput";
import useFetch from "@/lib/hooks/useFetch";
import { NotificationType } from "@/interfaces/types";
import { notification } from "antd";
import { useAppSelector } from "@/lib/redux/store/store";

const AddChapterForm = () => {
    const course = useAppSelector((state) => state.course.course);

    const [api, contextHolder] = notification.useNotification();

    const MyNotification = (
        type: NotificationType,
        message: string,
        description: string
    ) => {
        api[type]({
            message: message,
            description: description,
        });
    };

    const {
        unregister,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const { addNewChapter, getAndDispatchCourse } = useFetch();

    const newChapterFormSubmit = async (data: FieldValues) => {
        const response = await addNewChapter(data, course?.courseId ?? 0);

        if (response === "OK") {
            MyNotification("success", "Успешно", "Новый раздел создан!");
            getAndDispatchCourse(course?.courseId ?? 0);
        } else if (response === "BAD_REQUEST") {
            MyNotification("error", "Ошибка", "Что-то пошло не так");
        } else if (response === "ALREADY_REPORTED") {
            MyNotification(
                "warning",
                "Ошибка",
                "Раздел с таким названием уже существует!"
            );
        }
    };

    return (
        <div className="add-chapter-modal">
            {contextHolder}
            <h1 className="add-chapter-modal__title">Добавление раздела</h1>
            <form
                onSubmit={handleSubmit((data) => newChapterFormSubmit(data))}
                className="add-chapter-form form"
            >
                <CustomInput
                    labelText="Название раздела"
                    name="chapterTitle"
                    minLength={5}
                    register={register}
                    unregister={unregister}
                    errors={errors}
                />

                <input
                    className="add-chapter-submit-btn black-submit-button"
                    type="submit"
                    value={"Добавить раздел"}
                />
            </form>
        </div>
    );
};

export default AddChapterForm;
