"use client";

import { ILessonWithLessonType, NotificationType } from "@/interfaces/types";
import { useAppSelector } from "@/lib/redux/store/store";
import { Modal, notification } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { mapResources } from "../functions";
import ChaptersList from "../chapters-list/ChaptersList";
import CustomInput from "@/components/inputs/custom-input/CustomInput";
import Resources from "@/components/inputs/resources/Resources";
import TextEditor from "@/components/text-editor/TextEditor";
import useFetch from "@/lib/hooks/useFetch";
import { useParams, useRouter } from "next/navigation";

export interface ITextLessonFormFields {
    duration: number;
    diamondReward: number;
    lessonName: string;
    resourcesNames: { value: string }[];
    resourcesLinks: { value: string }[];
}

interface TextLessonFormProps {
    isEditForm?: boolean;
    isAdmin?: boolean;
    defaultLesson?: ILessonWithLessonType;
}

const TextLessonForm = ({
    isAdmin = false,
    isEditForm = false,
    defaultLesson,
}: TextLessonFormProps) => {
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
    } = useForm<ITextLessonFormFields>(
        isEditForm
            ? {
                  defaultValues: {
                      lessonName: defaultLesson?.lessonTitle,
                      diamondReward: defaultCourseLesson?.diamondReward,
                      duration: defaultCourseLesson?.duration,
                      resourcesNames: defaultResourcesNames,
                      resourcesLinks: defaultResourcesLinks,
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

    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [chapter, setChapter] = useState<string>("");
    const [html, setHtml] = useState(
        defaultLesson?.textLesson?.lessonBody ?? ""
    );

    const [isModalOpen, setIsModalOpen] = useState(false);

    const { deleteLesson } = useFetch();
    const router = useRouter();

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const params = useParams();
    const onDeleteLesson = async () => {
        await deleteLesson(defaultCourseLesson?.lessonId as number);
        await getAndDispatchCourse(course.course?.courseId ?? 0);
        router.push(
            `/${isAdmin ? "admin/courses/" : "teacher/my-courses/"}` +
                params?.["course-id"] +
                "/lessons"
        );
    };

    const { addNewTextLesson, editTextLesson, getAndDispatchCourse } =
        useFetch();

    const formSubmit = async (data: ITextLessonFormFields) => {
        if (chapter && html && html.length > 50) {
            const resources = data.resourcesNames.map((resource, index) => {
                return {
                    title: resource.value,
                    link: data.resourcesLinks[index].value,
                };
            });
            const response = isEditForm
                ? await editTextLesson(
                      data,
                      Number(defaultLesson?.lessonId),
                      Number(chapter),
                      resources,
                      html
                  )
                : await addNewTextLesson(
                      data,
                      Number(chapter),
                      resources,
                      html
                  );
            if (response === "OK") {
                if (isEditForm) {
                    MyNotification(
                        "success",
                        "Успешно",
                        "Урок успешно изменен!"
                    );
                } else {
                    MyNotification(
                        "success",
                        "Успешно",
                        "Урок успешно добавлен!"
                    );
                }
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
                defaultChapterValue={
                    String(defaultCourseLesson?.chapterId) ?? ""
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

            <TextEditor
                setStateFunc={setHtml}
                title="Урок"
                htmlText={html}
                errorMessage={"Слишком мало текста!"}
                isInvalid={html.length < 50 && isFormSubmitted}
            />

            <CustomInput
                labelText="Сколько займет прочтение? (мин)"
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

            <div className="dashboard-form">
                <input
                    onClick={() => setIsFormSubmitted(true)}
                    className="submit-btn black-submit-button"
                    type="submit"
                    value={isEditForm ? "Подтвердить" : "Добавить урок"}
                />
                {isEditForm && (
                    <button
                        onClick={showModal}
                        className="delete-btn red-button"
                        type="button"
                    >
                        Удалить урок
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
                            onClick={() => onDeleteLesson()}
                            className="red-button"
                        >
                            Удалить
                        </button>
                    </div>
                }
            >
                <div className="modal-title">
                    Вы действительно хотите удалить урок?
                </div>
                <div className="modal-description">
                    Вместе с уроком будут удалены все его материалы, а также все
                    связанные с ним данные.
                </div>
            </Modal>
        </form>
    );
};

export default TextLessonForm;
