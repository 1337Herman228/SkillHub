"use client";

import CreateCourseForm from "@/components/forms/create-course-form/CreateCourseForm";
import { NotificationType } from "@/interfaces/types";
import useFetch from "@/lib/hooks/useFetch";
import useManageImg from "@/lib/hooks/useManageImg";
import { useAppSelector } from "@/lib/redux/store/store";
import { ConfigProvider, notification } from "antd";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

const EditCoursePage = () => {
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
    const [text, setText] = useState<string>(course?.longDescription ?? "");
    const [img, setImg] = useState(true);
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [dropdownValue, setDropdownValue] = useState("");

    const { editCourse, getAndDispatchCourse } = useFetch();
    const { saveImg, deleteImg } = useManageImg();

    const formSubmit = async (data: FieldValues) => {
        if (text.length > 50 && dropdownValue && img) {
            const imgName =
                "course-preview" + "t=" + new Date().getTime() + ".png";
            const response = await editCourse(
                data,
                dropdownValue,
                text,
                img === true ? course?.courseImg ?? "" : imgName,
                course?.courseId ?? 0
            );
            getAndDispatchCourse(course?.courseId ?? 0);

            if (response === "OK") {
                MyNotification("success", "Успешно", "Курс успешно изменен!");
                saveImage(img, imgName, course?.courseImg ?? "");
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

    const saveImage = async (
        img: any,
        imgName: string,
        oldImageName: string
    ) => {
        if (img) {
            if (img !== true) {
                await deleteImg(oldImageName);
                await saveImg(imgName, img);
            }
        }
    };

    return (
        <div>
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
            <CreateCourseForm
                defaultImage={[
                    {
                        uid: course?.courseImg,
                        name: course?.courseImg,
                        status: "done",
                        url: "/upload-images/" + course?.courseImg,
                    },
                ]}
                isEditForm
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
                defaultDropdownValue={course?.skillLevel}
                text={text}
                defaultValues={{
                    courseName: course?.courseName,
                    topic: course?.topic,
                    shortDescription: course?.shortDescription,
                    courseImg: course?.courseImg,
                }}
                courseId={course?.courseId ?? 0}
            />
        </div>
    );
};

export default EditCoursePage;
