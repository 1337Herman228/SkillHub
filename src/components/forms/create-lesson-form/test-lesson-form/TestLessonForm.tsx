"use client";

import {
    ILessonWithLessonType,
    ITestAnswer,
    ITestLesson,
    NotificationType,
} from "@/interfaces/types";
import { useAppSelector } from "@/lib/redux/store/store";
import { Modal, notification } from "antd";
import { mapResources } from "../functions";
import { useFieldArray, useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import useFetch from "@/lib/hooks/useFetch";
import ChaptersList from "../chapters-list/ChaptersList";
import CustomInput from "@/components/inputs/custom-input/CustomInput";
import Resources from "@/components/inputs/resources/Resources";
import TestForm, { ITestQuestions } from "@/components/test-form/TestForm";
import { useParams, useRouter } from "next/navigation";

const makeDefaultTestArray = (test: ITestLesson) => {
    const testArray: ITestQuestions[] = [];
    test.testQuestions.forEach((question) => {
        testArray.push({
            questionId: String(question.questionId),
            questionText: question.questionText,
            correctAnswerId: String(question.correctAnswerId),
            testAnswers: test.testAnswers
                .filter(
                    (answer) => answer.testQuestionId === question.questionId
                )
                .map((answer) => {
                    return {
                        questionId: String(answer.testQuestionId),
                        answerId: String(answer.testAnswerId),
                        answerText: answer.answer,
                        isCorrect:
                            question.correctAnswerId === answer.testAnswerId
                                ? true
                                : false,
                    };
                }),
        });
    });
    return testArray;
};

export interface ITestLessonFormFields {
    diamondReward: number;
    lessonName: string;
    resourcesNames: { value: string }[];
    resourcesLinks: { value: string }[];
}

interface TestLessonFormProps {
    isEditForm?: boolean;
    defaultLesson?: ILessonWithLessonType;
}

const TestLessonForm = ({
    isEditForm = false,
    defaultLesson,
}: TestLessonFormProps) => {
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
    } = useForm<ITestLessonFormFields>(
        isEditForm
            ? {
                  defaultValues: {
                      lessonName: defaultLesson?.lessonTitle,
                      diamondReward: defaultCourseLesson?.diamondReward,
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

    const [test, setTest] = useState<ITestQuestions[]>(
        defaultLesson?.testLesson
            ? makeDefaultTestArray(defaultLesson?.testLesson)
            : []
    );

    const isAllAnswersFieldsNotEmpty = () => {
        return !test.some((question) => {
            return question.testAnswers.some((answer) => {
                return answer.answerText.length === 0;
            });
        });
    };

    const isAllQuestionsHasCorrectAnswer = () => {
        return !test.some((question) => {
            return question.correctAnswerId.length === 0;
        });
    };

    const { addNewTestLesson, editTestLesson, getAndDispatchCourse } =
        useFetch();

    const formSubmit = async (data: ITestLessonFormFields) => {
        if (!isAllAnswersFieldsNotEmpty()) {
            MyNotification(
                "warning",
                "Ошибка",
                "Все поля ответов должны быть заполнены!"
            );
            return;
        }
        if (!isAllQuestionsHasCorrectAnswer()) {
            MyNotification(
                "warning",
                "Ошибка",
                "Все вопросы должны иметь хотя бы один правильный ответ!"
            );
            return;
        }
        if (chapter && test.length > 0) {
            const resources = data.resourcesNames.map((resource, index) => {
                return {
                    title: resource.value,
                    link: data.resourcesLinks[index].value,
                };
            });

            const response = isEditForm
                ? await editTestLesson(
                      data,
                      Number(chapter),
                      resources,
                      test,
                      defaultLesson?.lessonId ?? 0
                  )
                : await addNewTestLesson(
                      data,
                      Number(chapter),
                      resources,
                      test
                  );

            if (response === "OK") {
                if (isEditForm) {
                    MyNotification(
                        "success",
                        "Успешно",
                        "Тест успешно изменен!"
                    );
                } else {
                    MyNotification(
                        "success",
                        "Успешно",
                        "Тест успешно добавлен!"
                    );
                }
                getAndDispatchCourse(course.course?.courseId ?? 0);
            } else if (response === "BAD_REQUEST") {
                MyNotification("error", "Ошибка", "Что-то пошло не так");
            } else if (response === "ALREADY_REPORTED") {
                MyNotification(
                    "warning",
                    "Ошибка",
                    "Тест с таким названием уже существует!"
                );
            }
        }
    };

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
            "/teacher/my-courses/" + params?.["course-id"] + "/lessons"
        );
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
                labelText="Название теста"
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

            <TestForm test={test} setTest={setTest} />

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
                    value={isEditForm ? "Подтвердить" : "Добавить тест"}
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

export default TestLessonForm;
