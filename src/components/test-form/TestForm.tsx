import "./TestForm.scss";
import { v4 as uuidv4 } from "uuid";
import QuestionForm from "./QuestionForm";

export interface ITestAnswer {
    questionId: string;
    answerId: string;
    answerText: string;
    isCorrect: boolean;
}

export interface ITestQuestions {
    questionId: string;
    questionText: string;
    correctAnswerId: string;
    testAnswers: ITestAnswer[];
}

interface ResourcesProps {
    test: ITestQuestions[];
    setTest: (test: ITestQuestions[]) => void;
}

const TestForm = ({ test, setTest }: ResourcesProps) => {
    const onRemove = (questionId: string) => {
        return setTest(
            test.filter((question) => question.questionId !== questionId)
        );
    };

    const onAdd = () => {
        return setTest([
            ...test,
            {
                questionId: uuidv4(),
                questionText: "",
                correctAnswerId: "",
                testAnswers: [],
            },
        ]);
    };

    const setQuestionText = (text: string, questionId: string) => {
        return setTest(
            test.map((question) => {
                if (question.questionId === questionId) {
                    return { ...question, questionText: text };
                }
                return question;
            })
        );
    };

    const setQuestionAnswers = (answers: ITestAnswer[], questionId: string) => {
        return setTest(
            test.map((question) => {
                if (question.questionId === questionId) {
                    return { ...question, testAnswers: answers };
                }
                return question;
            })
        );
    };

    const setCorrectAnswerID = (answerId: string, questionId: string) => {
        return setTest(
            test.map((question) => {
                if (question.questionId === questionId) {
                    return { ...question, correctAnswerId: answerId };
                }
                return question;
            })
        );
    };

    return (
        <div className="make-test">
            <div className="resources__title">Тест</div>
            <div className="make-test-container">
                {test.map((question, index) => (
                    <div className="make-test-list" key={question.questionId}>
                        <div className="question">
                            <div className="question__number">
                                Вопрос {index + 1}
                            </div>
                            <button
                                className="manage-make-test-btn make-test-list__remove-btn"
                                type="button"
                                onClick={() => onRemove(question.questionId)}
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
                        <QuestionForm
                            setCorrectAnswerID={setCorrectAnswerID}
                            setQuestionTextFunc={setQuestionText}
                            questionId={question.questionId}
                            setQuestionAnswers={setQuestionAnswers}
                            defaultAnswers={question.testAnswers}
                            defaultQuestionText={question.questionText}
                        />
                    </div>
                ))}
                <button
                    className="manage-make-test-btn-special"
                    type="button"
                    onClick={() => onAdd()}
                >
                    <div className="manage-make-test-btn-special__icon-container">
                        <img
                            className="manage-make-test-btn-special__icon"
                            src="/svg/plus.svg"
                            alt="delete"
                            width={16}
                            height={16}
                        />
                    </div>
                    <span>Добавить вопрос</span>
                </button>
            </div>
        </div>
    );
};

export default TestForm;
