"use client";

import CreateCourseForm from "@/components/forms/create-course-form/CreateCourseForm";
import { NotificationType } from "@/interfaces/types";
import useFetch from "@/lib/hooks/useFetch";
import useManageImg from "@/lib/hooks/useManageImg";
import { ConfigProvider, notification } from "antd";
import React, { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

const CreateNewCoursePage = () => {
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

    const [text, setText] = useState<string>("");
    const [img, setImg] = useState(null);
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [dropdownValue, setDropdownValue] = useState("");

    const { addNewCourse } = useFetch();
    const { saveImg, deleteImg } = useManageImg();

    const formSubmit = async (data: FieldValues) => {
        if (text.length > 50 && dropdownValue && img) {
            const imgName =
                "course-preview" + "t=" + new Date().getTime() + ".png";
            const response = await addNewCourse(
                data,
                dropdownValue,
                text,
                imgName
            );

            if (response === "OK") {
                MyNotification("success", "Успешно", "Курс успешно создан!");
                saveImage(img, imgName);
            } else if (response === "BAD_REQUEST") {
                MyNotification("error", "Ошибка", "Что-то пошло не так");
            } else if (response === "ALREADY_REPORTED") {
                MyNotification(
                    "warning",
                    "Ошибка",
                    "Курс с таким названием уже существует!"
                );
            }
        } else {
            MyNotification(
                "warning",
                "Заполните все поля!",
                "Пожалуйста заполните все поля!"
            );
        }
    };

    const saveImage = async (img: any, imgName: string) => {
        if (img) {
            // Удалить старое фото (для странички редактирования)
            await saveImg(imgName, img);
        }
    };

    return (
        <div>
            {contextHolder}
            <CreateCourseForm
                formSubmit={formSubmit}
                register={register}
                unregister={unregister}
                handleSubmit={handleSubmit}
                errors={errors}
                setText={setText}
                img={img}
                setImg={setImg}
                isFormSubmitted={isFormSubmitted}
                setIsFormSubmitted={setIsFormSubmitted}
                setDropdownValueFunc={setDropdownValue}
                dropdownValue={dropdownValue}
                text={text}
            />
        </div>
    );
};

export default CreateNewCoursePage;
