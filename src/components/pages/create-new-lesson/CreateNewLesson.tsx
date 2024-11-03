"use client";

import CreateLessonForm from "@/components/forms/create-lesson-form/CreateLessonForm";
import { TLessonType } from "@/interfaces/types";
import { useState } from "react";

const CreateNewLesson = () => {
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [lessonType, setLessonType] = useState<TLessonType | "">("");

    return (
        <div>
            <CreateLessonForm
                isFormSubmitted={isFormSubmitted}
                setIsFormSubmitted={setIsFormSubmitted}
                setLessonType={setLessonType}
                lessonType={lessonType}
            />
        </div>
    );
};

export default CreateNewLesson;
