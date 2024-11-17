"use client";

import useFetch from "@/lib/hooks/useFetch";
import "./Questions.scss";
import { IQuestion, NotificationType } from "@/interfaces/types";
import { useEffect, useState } from "react";
import QuestionWithAnswers from "./question/QuestionWithAnswers";
import TextEditor from "@/components/text-editor/TextEditor";
import DOMPurify from "dompurify";
import { useAppSelector } from "@/lib/redux/store/store";
import { notification } from "antd";

interface QuestionsProps {
    params: Record<string, string | string[]> | null;
}

const Questions = ({ params }: QuestionsProps) => {
    const user = useAppSelector((state) => state.user.user);
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

    const [isAddQuestionOpen, setIsAddQuestionOpen] = useState(false);
    const [questionText, setQuestionText] = useState("");
    const [questions, setQuestions] = useState<IQuestion[]>([]);

    const { getQuestionsForLesson, addQuestionToLesson } = useFetch();

    useEffect(() => {
        fetchQuestions();
    }, [params]);

    const fetchQuestions = async () => {
        if (params?.["lesson-id"]) {
            const data = await getQuestionsForLesson(
                String(params?.["lesson-id"])
            );
            setQuestions(data);
        }
    };

    const handleAddQuestion = async () => {
        if (questionText.length < 10) {
            MyNotification(
                "warning",
                "Пустой вопрос",
                "Перед добавлением вопроса нужно заполнить поле вопроса!"
            );
        } else if (questionText) {
            const resp = await addQuestionToLesson({
                lessonId: Number(params?.["lesson-id"] ?? ""),
                userId: user?.userId ?? 0,
                body: DOMPurify.sanitize(questionText),
                createdAt: new Date(),
                updatedAt: new Date(),
            });

            if (resp === "CREATED") {
                if (user)
                    questions.push({
                        questionId: 0,
                        user: user,
                        body: DOMPurify.sanitize(questionText),
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        answers: [],
                    });
                MyNotification("success", "Успешно", "Ваш ответ добавлен!");
            } else if (resp === "BAD_REQUEST") {
                MyNotification("error", "Ошибка", "Что-то пошло не так");
            }
        }
    };

    return (
        <div className="questions-container">
            {contextHolder}
            <div className="questions-title">
                Вопросы к этому уроку ({questions.length})
            </div>
            <div className="questions-list">
                {questions.map((question) => (
                    <QuestionWithAnswers question={question} />
                ))}
            </div>
            {!isAddQuestionOpen && (
                <button
                    onClick={() => setIsAddQuestionOpen(true)}
                    className="purple-button"
                >
                    Задать новый вопрос
                </button>
            )}
            {isAddQuestionOpen && (
                <div className="">
                    <TextEditor
                        style={{ maxWidth: "700px" }}
                        htmlText={questionText}
                        setStateFunc={setQuestionText}
                    />
                    <button
                        onClick={handleAddQuestion}
                        className="black-submit-button "
                    >
                        Добавить вопрос
                    </button>
                    <button
                        style={{ marginLeft: "10px" }}
                        onClick={() => setIsAddQuestionOpen(false)}
                        className="black-submit-button"
                    >
                        Отмена
                    </button>
                </div>
            )}
        </div>
    );
};

export default Questions;
