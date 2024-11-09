"use client";

import "./CreateLessonForm.scss";
import { ILessonWithLessonType, TLessonType } from "@/interfaces/types";
import DropdownList, { IOption } from "@/components/dropdowns/DropdownList";

import VideoLessonForm from "./video-lesson-form/VideoLessonForm";
import TextLessonForm from "./text-lesson-form/TextLessonForm";
import TestLessonForm from "./test-lesson-form/TestLessonForm";

const lessonTypeOptions: IOption[] = [
    {
        value: "VIDEO",
        name: "Видеоурок",
    },
    {
        value: "TEXT",
        name: "Текстовый урок",
    },
    {
        value: "TEST",
        name: "Тест",
    },
];

interface CreateLessonFormProps {
    isEditForm?: boolean;
    setIsFormSubmitted: (isFormSubmitted: boolean) => void;
    isFormSubmitted: boolean;

    lessonType: TLessonType | "";
    defaultLesson?: ILessonWithLessonType;
    setLessonType: (lessonType: TLessonType) => void;

    defaultVideo?: any;
}

const CreateLessonForm = ({
    isEditForm,
    lessonType,
    defaultLesson,
    setLessonType,
    defaultVideo,
}: CreateLessonFormProps) => {
    const setStringLessonType = (lessonType: string) => {
        setLessonType(lessonType as TLessonType);
    };

    return (
        <div className="create-lesson-form-wrapper">
            <h1 className="form-title">
                {isEditForm ? "Редактирование урока" : "Добавление урока"}
            </h1>
            <div className="create-lesson-form form">
                <DropdownList
                    disabled={isEditForm}
                    setStateFunc={setStringLessonType}
                    placeholder="Выберите тип урока"
                    labelText="Тип урока"
                    name="lessonType"
                    options={lessonTypeOptions}
                    isError={false}
                    defaultValue={lessonTypeOptions.find(
                        (item) => item.value === defaultLesson?.lessonType
                    )}
                />

                {lessonType === "VIDEO" && (
                    <VideoLessonForm
                        defaultVideo={defaultVideo}
                        defaultLesson={defaultLesson}
                        isEditForm={isEditForm}
                    />
                )}
                {lessonType === "TEXT" && (
                    <TextLessonForm
                        defaultLesson={defaultLesson}
                        isEditForm={isEditForm}
                    />
                )}
                {lessonType === "TEST" && (
                    <TestLessonForm
                        defaultLesson={defaultLesson}
                        isEditForm={isEditForm}
                    />
                )}
            </div>
        </div>
    );
};

export default CreateLessonForm;
