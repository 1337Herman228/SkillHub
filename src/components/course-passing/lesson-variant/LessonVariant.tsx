"use client";

import { useEffect, useState } from "react";
import VideoPlayer from "../video-player/VideoPlayer";
import useFetch from "@/lib/hooks/useFetch";
import { ILessonWithLessonType } from "@/interfaces/types";
import { useSession } from "next-auth/react";
import Spinner from "../../spinners/spinner/Spinner";
import "./LessonVariant.scss";
import TextLesson from "../text-lesson/TextLesson";
import TestLesson from "../testing/TestLesson";
import { useParams } from "next/navigation";

const LessonVariant = () => {
    const params = useParams();
    const { getLessonById, isLoading } = useFetch();

    const [lesson, setLessons] = useState<ILessonWithLessonType | null>(null);

    useEffect(() => {
        fetchLesson();
    }, []);

    const fetchLesson = async () => {
        if (params && Number(params["lesson-id"])) {
            const lesson = await getLessonById(Number(params["lesson-id"]));
            setLessons(lesson);
        }
    };

    const chooseLessonType = () => {
        switch (lesson?.lessonType) {
            case "VIDEO": {
                return <VideoPlayer videoSrc={lesson?.videoLesson?.videoUrl} />;
            }
            case "TEXT": {
                if (!lesson?.textLesson?.lessonBody) return null;
                return (
                    <TextLesson
                        title={lesson.textLesson.title}
                        html={lesson?.textLesson?.lessonBody}
                    />
                );
            }
            case "TEST": {
                if (!lesson?.testLesson) return null;
                return (
                    <TestLesson
                        courseId={String(params?.["course-id"] ?? "")}
                        title={lesson.testLesson.name}
                        testLesson={lesson.testLesson}
                    />
                );
            }
        }
    };

    if (isLoading || !lesson)
        return (
            <div className="lesson-variant-loading">
                <Spinner size="100px" />
            </div>
        );

    return chooseLessonType();
};

export default LessonVariant;
