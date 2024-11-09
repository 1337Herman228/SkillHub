import { useEffect, useState } from "react";
import TextEditor from "../text-editor/TextEditor";
import { ITestAnswer } from "./TestForm";
import { v4 as uuidv4 } from "uuid";
import "./QuestionForm.scss";

interface QuestionFormProps {
    questionId: string;
    defaultQuestionText?: string;
    defaultAnswers?: ITestAnswer[];
    setQuestionTextFunc: (text: string, questionId: string) => void;
    setQuestionAnswers: (answers: ITestAnswer[], questionId: string) => void;
    setCorrectAnswerID: (answerId: string, questionId: string) => void;
}

const QuestionForm = ({
    defaultQuestionText,
    defaultAnswers,
    questionId,
    setQuestionTextFunc,
    setQuestionAnswers,
    setCorrectAnswerID,
}: QuestionFormProps) => {
    const [questionText, setQuestionText] = useState(defaultQuestionText ?? "");
    const [answers, setAnswers] = useState(defaultAnswers ?? []);

    useEffect(() => {
        setQuestionTextFunc(questionText, questionId);
    }, [questionText]);

    useEffect(() => {
        setQuestionAnswers(answers, questionId);
    }, [answers]);

    const onAddAnswer = (questionId: string) => {
        setAnswers([
            ...answers,
            {
                answerId: uuidv4(),
                answerText: "",
                isCorrect: false,
                questionId: questionId,
            },
        ]);
    };

    const onRemoveAnswer = (answerId: string) => {
        if (answers.find((answer) => answer.answerId === answerId)?.isCorrect) {
            setCorrectAnswerID("", questionId);
        }
        setAnswers(answers.filter((answer) => answer.answerId !== answerId));
    };

    const onChangeAnswerText = (text: string, answerId: string) => {
        setAnswers(
            answers.map((answer) => {
                if (answer.answerId === answerId) {
                    return { ...answer, answerText: text };
                }
                return answer;
            })
        );
    };

    const onChangeCorrectAnswer = (answerId: string) => {
        setAnswers(
            answers.map((answer) => {
                if (answer.answerId === answerId) {
                    return { ...answer, isCorrect: true };
                } else {
                    setCorrectAnswerID(answerId, questionId);
                    return { ...answer, isCorrect: false };
                }
            })
        );
    };

    return (
        <div className="question-form">
            <TextEditor
                setStateFunc={setQuestionText}
                htmlText={questionText}
            />
            <div className="question-form-answers">
                <div className="question-form-answers__header">
                    <div>Варианты ответа</div>
                    <div className="question-form-answers__header-answer">
                        Ответ
                    </div>
                </div>
                <div className="question-form-answers__body">
                    {answers.map((answer) => (
                        <div key={answer.answerId} className="answer">
                            <input
                                className={`form-field__input`}
                                onChange={(e) =>
                                    onChangeAnswerText(
                                        e.target.value,
                                        answer.answerId
                                    )
                                }
                                defaultValue={answer.answerText} // Значение по умолчанию
                            />
                            <div className="">
                                <button
                                    className="manage-make-test-btn make-test-list__remove-btn"
                                    type="button"
                                    onClick={() =>
                                        onRemoveAnswer(answer.answerId)
                                    }
                                >
                                    <img
                                        className=""
                                        src="/svg/minus-icon.svg"
                                        alt="delete"
                                        width={10}
                                        height={3}
                                    />
                                </button>
                            </div>
                            <div className="">
                                <input
                                    id={`radio-${answer.answerId}`}
                                    className="answer-radio"
                                    type="radio"
                                    name={`answer-${questionId}`}
                                    onChange={() =>
                                        onChangeCorrectAnswer(answer.answerId)
                                    }
                                    checked={answer.isCorrect}
                                />
                                <label
                                    htmlFor={`radio-${answer.answerId}`}
                                    className="answer-radio-label"
                                >
                                    <span className="answer-radio-label__icon"></span>
                                </label>
                            </div>
                        </div>
                    ))}
                    <button
                        style={{ marginTop: "5px" }}
                        className="manage-make-test-btn-special"
                        type="button"
                        onClick={() => onAddAnswer(questionId)}
                    >
                        <div
                            style={{ width: "20px", height: "20px" }}
                            className="manage-make-test-btn-special__icon-container"
                        >
                            <img
                                className="manage-make-test-btn-special__icon"
                                src="/svg/plus.svg"
                                alt="delete"
                                width={10}
                                height={10}
                            />
                        </div>
                        <span style={{ fontSize: "14px", fontWeight: "600" }}>
                            Добавить вариант ответа
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default QuestionForm;
