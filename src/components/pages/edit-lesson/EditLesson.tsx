"use client";

import CreateLessonForm from "@/components/forms/create-lesson-form/CreateLessonForm";
import Spinner from "../../spinners/spinner/Spinner";
import { ILessonWithLessonType, TLessonType } from "@/interfaces/types";
import useFetch from "@/lib/hooks/useFetch";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const EditLesson = () => {
    const { data: session } = useSession();
    const params = useParams();
    const { getLessonById, isLoading } = useFetch();

    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [lessonType, setLessonType] = useState<TLessonType | "">("");
    const [lesson, setLessons] = useState<ILessonWithLessonType | null>(null);

    useEffect(() => {
        fetchLesson();
    }, [session]);

    const fetchLesson = async () => {
        if (params && Number(params["lesson-id"])) {
            const lesson = await getLessonById(Number(params["lesson-id"]));
            setLessons(lesson);
        }
    };

    if (!lesson) {
        return (
            <div className="centered-div">
                <Spinner size="100px" />
            </div>
        );
    }

    return (
        <div>
            <CreateLessonForm
                defaultVideo={[
                    {
                        uid: lesson.lessonId,
                        name: lesson.videoLesson?.videoUrl,
                        status: "done",
                        url: "/upload-videos/" + lesson.videoLesson?.videoUrl,
                    },
                ]}
                isEditForm
                isFormSubmitted={isFormSubmitted}
                setIsFormSubmitted={setIsFormSubmitted}
                setLessonType={setLessonType}
                lessonType={lessonType}
                defaultLesson={lesson}
            />
        </div>
    );
};

export default EditLesson;
