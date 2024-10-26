"use client";

import { useEffect, useState } from "react";
import VideoPlayer from "../video-player/VideoPlayer";
import useFetch from "@/lib/hooks/useFetch";
import {
    ICourseInfoUrlParams,
    ILessonWithLessonType,
} from "@/interfaces/types";
import { useSession } from "next-auth/react";
import Spinner from "@/components/spinners/spinner/Spinner";
import "./LessonVariant.scss";
import TextLesson from "../text-lesson/TextLesson";

interface LessonVariantProps {
    params: ICourseInfoUrlParams;
}

const LessonVariant = ({ params }: LessonVariantProps) => {
    const { data: session } = useSession();
    const { getLessonById, isLoading } = useFetch();

    const [lesson, setLessons] = useState<ILessonWithLessonType | null>(null);

    console.log("lesson", lesson);

    useEffect(() => {
        fetchLesson();
    }, [session]);

    const fetchLesson = async () => {
        const lesson = await getLessonById(Number(params["lesson-id"]));
        setLessons(lesson);
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
