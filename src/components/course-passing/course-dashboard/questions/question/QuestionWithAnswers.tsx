"use client";

import "./QuestionWithAnswers.scss";
import { IQuestion, NotificationType } from "@/interfaces/types";
import { useState } from "react";
import QuestionCard from "./question-card/QuestionCard";
import TextEditor from "@/components/text-editor/TextEditor";
import { notification } from "antd";
import DOMPurify from "dompurify";
import useFetch from "@/lib/hooks/useFetch";
import { useAppSelector } from "@/lib/redux/store/store";

interface QuestionWithAnswersProps {
    question: IQuestion;
}

const QuestionWithAnswers = ({ question }: QuestionWithAnswersProps) => {
    const user = useAppSelector((state) => state.user.user);
    const answers = question.answers;

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

    const [isAnswersOpen, setIsAnswersOpen] = useState(false);
    const [addAnswer, setAddAnswer] = useState("");

    const { addAnswerToQuestion } = useFetch();

    const handleAddAnswer = async () => {
        if (addAnswer) {
            const resp = await addAnswerToQuestion({
                questionId: question.questionId,
                userId: user?.userId ?? 0,
                body: DOMPurify.sanitize(addAnswer),
                createdAt: new Date(),
                updatedAt: new Date(),
            });

            if (resp === "CREATED") {
                if (user)
                    answers.push({
                        answerId: 0,
                        questionId: question.questionId,
                        user: user,
                        body: DOMPurify.sanitize(addAnswer),
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    });
                MyNotification("success", "Успешно", "Ваш ответ добавлен!");
            } else if (resp === "BAD_REQUEST") {
                MyNotification("error", "Ошибка", "Что-то пошло не так");
            }
        }
        if (addAnswer.length < 10) {
            MyNotification(
                "warning",
                "Пустой ответ",
                "Перед добавлением ответа нужно заполнить поле ответа!"
            );
        }
    };

    return (
        <div className="question-and-answers-container">
            {contextHolder}
            <QuestionCard
                avatarImg={question.user.person?.avatarImg}
                name={question.user.person?.name}
                surname={question.user.person?.surname}
                createdAt={question.createdAt}
                body={question.body}
                answersBtn={
                    <button
                        onClick={() => setIsAnswersOpen(!isAnswersOpen)}
                        className="answers-count__btn"
                    >
                        <span>{question.answers.length}</span>
                        <img
                            className="answer-icon"
                            src="/svg/answers.svg"
                            alt="answers"
                            width={15}
                            height={15}
                        />
                    </button>
                }
            />
            {isAnswersOpen && (
                <div className="answers">
                    <div className="answers__count">
                        {question.answers.length} ответов:
                    </div>
                    <div className="answers__list">
                        {answers.map((answer) => (
                            <QuestionCard
                                avatarImg={answer.user.person?.avatarImg}
                                name={answer.user.person?.name}
                                surname={answer.user.person?.surname}
                                createdAt={answer.createdAt}
                                body={answer.body}
                            />
                        ))}
                        <div className="add-answer">
                            <TextEditor
                                style={{ maxWidth: "700px" }}
                                htmlText={addAnswer}
                                setStateFunc={setAddAnswer}
                            />
                            <button
                                onClick={handleAddAnswer}
                                className="black-submit-button add-answer__btn"
                            >
                                Добавить ответ
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default QuestionWithAnswers;
