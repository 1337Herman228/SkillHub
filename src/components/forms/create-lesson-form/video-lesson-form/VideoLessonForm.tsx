"use client";

import DropdownList from "@/components/dropdowns/DropdownList";
import CustomInput from "@/components/inputs/custom-input/CustomInput";
import Resources from "@/components/inputs/resources/Resources";
import {
    ILessonWithLessonType,
    IResources,
    NotificationType,
    TLessonType,
} from "@/interfaces/types";
import { useAppSelector } from "@/lib/redux/store/store";
import React, { useEffect, useRef, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import ChaptersList from "../chapters-list/ChaptersList";
import ImageUpload from "@/components/image-upload/ImageUpload";
import useManageImg from "@/lib/hooks/useManageImg";
import useFetch from "@/lib/hooks/useFetch";
import { notification } from "antd";

const mapResources = (resources: IResources[]) => {
    const defaultResourcesNames = resources.map((resource) => {
        return { value: resource.resourceTitle };
    });

    const defaultResourcesLinks = resources.map((resource) => {
        return { value: resource.resourceLink };
    });

    return { defaultResourcesNames, defaultResourcesLinks };
};

export interface IVideoLessonFormFields {
    duration: number;
    diamondReward: number;
    lessonName: string;
    resourcesNames: { value: string }[];
    resourcesLinks: { value: string }[];
}

interface VideoLessonFormProps {
    isEditForm?: boolean;
    defaultLesson?: ILessonWithLessonType;
}

const VideoLessonForm = ({
    isEditForm = false,
    defaultLesson,
}: VideoLessonFormProps) => {
    const course = useAppSelector((state) => state.course);
    const [api, contextHolder] = notification.useNotification();

    const defaultCourseLesson = course.lessons?.find(
        (lesson) => lesson.lessonId === defaultLesson?.lessonId
    );
    const { defaultResourcesNames, defaultResourcesLinks } = mapResources(
        defaultCourseLesson?.resources ?? []
    );

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
        control,
        reset,
        formState: { errors },
    } = useForm<IVideoLessonFormFields>(
        isEditForm
            ? {
                  defaultValues: {
                      lessonName: defaultLesson?.lessonTitle,
                      resourcesNames: defaultResourcesNames,
                      resourcesLinks: defaultResourcesLinks,
                      diamondReward: defaultCourseLesson?.diamondReward,
                      duration: defaultCourseLesson?.duration,
                  },
              }
            : {}
    );

    const hasResetRef = useRef(false); // Используем useRef для единождной сброса формы
    useEffect(() => {
        if (
            isEditForm &&
            defaultResourcesNames.length > 0 &&
            !hasResetRef.current
        ) {
            reset({
                lessonName: defaultLesson?.lessonTitle,
                resourcesNames: defaultResourcesNames,
                resourcesLinks: defaultResourcesLinks,
                diamondReward: defaultCourseLesson?.diamondReward,
                duration: defaultCourseLesson?.duration,
            });
            hasResetRef.current = true; // Устанавливаем флаг
        }
    }, [defaultResourcesNames, isEditForm, reset]);

    const {
        fields: resourcesNames,
        append: resourcesNamesAppend,
        remove: resourcesNamesRemove,
    } = useFieldArray({
        control,
        name: "resourcesNames", // Имя поля, которое будет массивом
    });

    const {
        fields: resourcesLinks,
        append: resourcesLinksAppend,
        remove: resourcesLinksRemove,
    } = useFieldArray({
        control,
        name: "resourcesLinks", // Имя поля, которое будет массивом
    });

    const { saveVideo } = useManageImg();
    const { addNewVideoLesson, getAndDispatchCourse } = useFetch();

    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [chapter, setChapter] = useState<string>("");
    const [video, setVideo] = useState(null);

    const formSubmit = async (data: IVideoLessonFormFields) => {
        if (chapter && video) {
            const resources = data.resourcesNames.map((resource, index) => {
                return {
                    title: resource.value,
                    link: data.resourcesLinks[index].value,
                };
            });

            const newVideoName = (
                data.lessonName +
                "&t=" +
                new Date().getTime() +
                ".mp4"
            )
                .toLowerCase()
                .replace(/\s/g, "-");

            const response = await addNewVideoLesson(
                data,
                Number(chapter),
                resources,
                newVideoName
            );

            if (response === "OK") {
                MyNotification("success", "Успешно", "Урок успешно добавлен!");
                saveVideo(newVideoName, video);
                getAndDispatchCourse(course.course?.courseId ?? 0);
            } else if (response === "BAD_REQUEST") {
                MyNotification("error", "Ошибка", "Что-то пошло не так");
            } else if (response === "ALREADY_REPORTED") {
                MyNotification(
                    "warning",
                    "Ошибка",
                    "Урок с таким названием уже существует!"
                );
            }
        }
    };

    console.log(defaultCourseLesson?.chapterId);

    return (
        <form
            onSubmit={handleSubmit((data) => formSubmit(data))}
            className="create-lesson-form form"
        >
            {contextHolder}
            <ChaptersList
                chapters={course.chapters ?? []}
                setChapter={setChapter}
                chapter={chapter}
                isFormSubmitted={isFormSubmitted}
                //TODO Разобраться почему не работает дефолтное значение
                defaultChapterValue={
                    // String(defaultCourseLesson?.chapterId) ?? ""
                    "10000"
                }
            />

            <CustomInput
                labelText="Название урока"
                name="lessonName"
                minLength={5}
                register={register}
                unregister={unregister}
                errors={errors}
                showMarks={false}
            />

            <Resources
                errors={errors}
                linksFields={resourcesLinks}
                linksAppend={resourcesLinksAppend}
                linksRemove={resourcesLinksRemove}
                fields={resourcesNames}
                register={register}
                append={resourcesNamesAppend}
                remove={resourcesNamesRemove}
            />

            <div>
                <div className="img-container__label">Видео</div>
                {video ? (
                    <>
                        <ImageUpload
                            // defaultImg={
                            //     defaultImage ? [...defaultImage] : []
                            // }
                            accept="video/*"
                            img={video}
                            isFormSubmitted={false}
                            setImg={setVideo}
                        />
                    </>
                ) : (
                    <>
                        <ImageUpload
                            accept="video/*"
                            img={video}
                            isFormSubmitted={false}
                            setImg={setVideo}
                        />
                    </>
                )}

                <p className="error-message">
                    {isFormSubmitted && !video
                        ? video
                            ? null
                            : "Загрузите видео"
                        : null}
                </p>
            </div>

            <CustomInput
                labelText="Необходимое на просмотр время (мин.)"
                name="duration"
                minLength={1}
                onlyPositiveDigits={true}
                register={register}
                unregister={unregister}
                errors={errors}
                showMarks={false}
            />

            <CustomInput
                labelText="Награда в алмазах"
                name="diamondReward"
                minLength={1}
                onlyPositiveDigits={true}
                register={register}
                unregister={unregister}
                errors={errors}
                showMarks={false}
            />

            <input
                onClick={() => setIsFormSubmitted(true)}
                className="submit-btn black-submit-button"
                type="submit"
                value={isEditForm ? "Подтвердить" : "Добавить урок"}
            />
        </form>
    );
};

export default VideoLessonForm;
