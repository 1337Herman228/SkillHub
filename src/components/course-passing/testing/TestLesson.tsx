"use client";

import { ITestLesson, ITestResult } from "@/interfaces/types";
import "./TestLesson.scss";
import { memo, useCallback, useEffect, useState } from "react";
import parse from "html-react-parser";
import DOMPurify from "dompurify";
import MyPieChart, {
    IPieChartDataType,
} from "@/components/charts/pie/MyPieChart";
import TestFinished from "./TestFinished";
import WrongAnswersInfo from "./WrongAnswersInfo";

interface TestLessonProps {
    testLesson?: ITestLesson;
    title: string;
}

const TestLesson = memo(({ testLesson, title }: TestLessonProps) => {
    const [isTestEnded, setIsTestEnded] = useState(false);
    const [isTestFinished, setIsTestFinished] = useState(false);

    const [isTestStarted, setIsTestStarted] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswerId, setSelectedAnswerId] = useState(0);

    const [testResults, setTestResults] = useState<ITestResult[]>([]);

    // console.log("isTestFinished", isTestFinished);
    console.log("testResults", testResults);

    //TODO: написать логику для отправки данных на сервер и сохранения результатов теста
    const endTest = () => {};

    const getResultsInfo = useCallback(() => {
        const correctAnswers = testResults.filter((result) => result.isCorrect);
        const wrongAnswers = testResults.filter((result) => !result.isCorrect);
        const correctAnswersCount = correctAnswers.length;
        const wrongAnswersCount = wrongAnswers.length;
        const totalAnswersCount = correctAnswers.length + wrongAnswers.length;
        const correctAnswersPercentage = +(
            (correctAnswersCount / totalAnswersCount) *
            100
        ).toFixed(1);
        const wrongAnswersPercentage = +(
            (wrongAnswersCount / totalAnswersCount) *
            100
        ).toFixed(1);

        return {
            correctAnswers,
            wrongAnswers,
            totalAnswersCount,
            correctAnswersCount,
            wrongAnswersCount,
            correctAnswersPercentage,
            wrongAnswersPercentage,
        };
    }, [testResults]);

    const makePieChartData = (): IPieChartDataType[] => {
        const {
            correctAnswersCount,
            wrongAnswersCount,
            correctAnswersPercentage,
            wrongAnswersPercentage,
        } = getResultsInfo();

        const correctAnswersData = correctAnswersCount
            ? [
                  {
                      id: 0,
                      value: correctAnswersPercentage,
                      label: "Правильные ответы",
                      color: "var(--light-green-2)",
                  },
              ]
            : [];
        const wrongAnswersData = wrongAnswersCount
            ? [
                  {
                      id: 1,
                      value: wrongAnswersPercentage,
                      label: "Неправильные ответы",
                      color: "var(--light-red-2)",
                  },
              ]
            : [];

        return [...correctAnswersData, ...wrongAnswersData];
    };

    const makeTestTextResults = () => {
        const { correctAnswersPercentage, wrongAnswers } = getResultsInfo();

        return {
            correctAnswersPercentage,
            wrongAnswers,
        };
    };

    const restartTest = () => {
        setIsTestStarted(false);
        setIsTestEnded(false);
        setIsTestFinished(false);
        setCurrentQuestion(0);
        setSelectedAnswerId(0);
        setTestResults([]);
    };

    useEffect(() => {
        if (testResults.length === testLesson?.testQuestions.length) {
            setIsTestFinished(true);
        }
    }, [testResults.length]);

    const skipQuestion = () => {
        if (isTestFinished) {
            setIsTestEnded(true);
        }

        if (testLesson?.testQuestions.length === testResults.length) {
            setIsTestFinished(true);
        } else {
            if (testLesson?.testQuestions.length) {
                let nextQuestionIndex = currentQuestion + 1;

                // Если индекс выходит за пределы количества вопросов, начинаем с нуля
                if (nextQuestionIndex >= testLesson.testQuestions.length) {
                    nextQuestionIndex = 0;
                }

                // Ищем следующий неотвеченный вопрос
                while (
                    nextQuestionIndex < testLesson.testQuestions.length &&
                    isThisQuestionAnsweredByIndex(nextQuestionIndex)
                ) {
                    nextQuestionIndex++;
                    // Если индекс выходит за пределы, начинаем с нуля
                    if (nextQuestionIndex >= testLesson.testQuestions.length) {
                        nextQuestionIndex = 0;
                    }
                }

                // Обновляем состояние с новым индексом вопроса
                setCurrentQuestion(nextQuestionIndex);
                setSelectedAnswerId(0);
            }
        }
    };

    const checkAnswer = () => {
        const testQuestionId =
            testLesson?.testQuestions[currentQuestion].questionId;
        const questionOrder = currentQuestion;
        const isCorrect =
            testLesson?.testQuestions[currentQuestion].correctAnswerId ===
            selectedAnswerId;
        const questionText = testLesson?.testQuestions[currentQuestion]
            .questionText
            ? testLesson?.testQuestions[currentQuestion].questionText
            : "";
        const correctAnswerId = testLesson?.testQuestions[currentQuestion]
            .correctAnswerId
            ? testLesson?.testQuestions[currentQuestion].correctAnswerId
            : 0;
        const userAnswer = testLesson?.testAnswers.find(
            (answer) => answer.testAnswerId === selectedAnswerId
        )?.answer;
        const correctAnswerDescription =
            testLesson?.testQuestions[currentQuestion].answerDescription;

        const questionResult: ITestResult = {
            questionOrder: questionOrder ? questionOrder : 0,
            isCorrect: isCorrect,
            testQuestionId: testQuestionId ? testQuestionId : 0,
            questionText: questionText,
            userAnswer: userAnswer ? userAnswer : "",
            correctAnswerId: correctAnswerId,
            correctAnswerDescription: correctAnswerDescription
                ? correctAnswerDescription
                : "",
        };
        setTestResults([...testResults, questionResult]);

        if (testResults.length === testLesson?.testQuestions.length) {
            setIsTestFinished(true);
        }
    };

    const isThisQuestionAnsweredByIndex = (questionIndex: number) => {
        return !!findAnsweredByIndex(questionIndex);
    };

    const isThisQuestionAnswered = () => {
        return !!findAnswered();
    };

    const findAnsweredByIndex = (index: number) => {
        return testResults.find(
            (result) =>
                result.testQuestionId ===
                testLesson?.testQuestions[index].questionId
        );
    };

    const findAnswered = () => {
        return testResults.find(
            (result) =>
                result.testQuestionId ===
                testLesson?.testQuestions[currentQuestion].questionId
        );
    };

    const isThisQuestionAnsweredCorrect = () => {
        if (isThisQuestionAnswered()) {
            return findAnswered()?.isCorrect;
        }
    };

    return (
        <div className="test-lesson-container">
            <div className="test-lesson">
                {isTestStarted ? (
                    <>
                        {isTestEnded ? (
                            <>
                                <div className="test-results">
                                    <MyPieChart data={makePieChartData()} />
                                    <TestFinished {...makeTestTextResults()} />
                                </div>
                                <div className="wrong-answers-container">
                                    <WrongAnswersInfo
                                        {...makeTestTextResults()}
                                    />
                                </div>
                            </>
                        ) : (
                            <div className="test">
                                {isThisQuestionAnswered() ? (
                                    <div
                                        className={`check-answer-container ${
                                            isThisQuestionAnsweredCorrect()
                                                ? "correct"
                                                : "incorrect"
                                        }`}
                                    >
                                        <div className="check-answer-icon">
                                            <img
                                                src={
                                                    isThisQuestionAnsweredCorrect()
                                                        ? "/svg/correct-answer.svg"
                                                        : "/svg/wrong-answer.svg"
                                                }
                                                className="check-answer-icon__img"
                                                loading="lazy"
                                                alt=""
                                                width={35}
                                                height={35}
                                            />
                                        </div>
                                        <div className="check-answer">
                                            <div className="check-answer__title">
                                                {isThisQuestionAnsweredCorrect()
                                                    ? "Верно!"
                                                    : "Неправильный ответ!"}
                                            </div>
                                            <div className="check-answer__description">
                                                {
                                                    findAnswered()
                                                        ?.correctAnswerDescription
                                                }
                                            </div>
                                        </div>
                                    </div>
                                ) : null}

                                <div className="test__question">
                                    <h1 className="test__question-title">
                                        Вопрос {currentQuestion + 1}:
                                    </h1>
                                    <div className="test__question-text html-block">
                                        {parse(
                                            DOMPurify.sanitize(
                                                testLesson?.testQuestions[
                                                    currentQuestion
                                                ].questionText
                                                    ? testLesson?.testQuestions[
                                                          currentQuestion
                                                      ].questionText
                                                    : ""
                                            )
                                        )}
                                    </div>
                                </div>
                                <div className="test__answers">
                                    {testLesson?.testAnswers
                                        .filter(
                                            (answer) =>
                                                answer.testQuestionId ===
                                                testLesson?.testQuestions[
                                                    currentQuestion
                                                ].questionId
                                        )
                                        .map((answer) => (
                                            <div
                                                key={answer.testAnswerId}
                                                className="answer"
                                            >
                                                <label
                                                    className="answer__label"
                                                    htmlFor={
                                                        "question" +
                                                        answer.testAnswerId
                                                    }
                                                >
                                                    <input
                                                        disabled={isThisQuestionAnswered()}
                                                        id={
                                                            "question" +
                                                            answer.testAnswerId
                                                        }
                                                        onChange={() =>
                                                            setSelectedAnswerId(
                                                                answer.testAnswerId
                                                            )
                                                        }
                                                        checked={
                                                            selectedAnswerId ===
                                                            answer.testAnswerId
                                                        }
                                                        className="answer__radio"
                                                        type="radio"
                                                        value={
                                                            answer.testAnswerId
                                                        }
                                                        name={
                                                            "question" +
                                                            answer.testQuestionId
                                                        }
                                                    />
                                                    <div className="answer__text">
                                                        {answer.answer}
                                                    </div>
                                                </label>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="start-lesson">
                        <h1 className="start-lesson__title">{title}</h1>
                        <div className="start-lesson__info">
                            Тест | {testLesson?.testQuestions.length} вопросов
                        </div>
                        <button
                            onClick={() => setIsTestStarted(true)}
                            className="black-submit-button"
                        >
                            Начать тест
                        </button>
                    </div>
                )}
            </div>
            {isTestStarted && (
                <>
                    {isTestEnded ? (
                        <div className="test-result-nav">
                            <button
                                className="restart-test-btn black-submit-button"
                                onClick={restartTest}
                            >
                                Повторить тест
                            </button>
                        </div>
                    ) : (
                        <div className="test-nav">
                            <div className="left-nav">
                                <button
                                    disabled={isThisQuestionAnswered()}
                                    onClick={() => skipQuestion()}
                                    className="skip-question-btn"
                                >
                                    Пропустить вопрос
                                </button>
                            </div>
                            <div className="right-nav">
                                <div className="current-question">
                                    Вопрос {currentQuestion + 1} из{" "}
                                    {testLesson?.testQuestions.length}
                                </div>
                                {isThisQuestionAnswered() ? (
                                    <button
                                        onClick={() => skipQuestion()}
                                        className="black-submit-button check-answer-btn"
                                    >
                                        <div className="next-question-btn-container">
                                            <span>
                                                {isTestFinished
                                                    ? "Завершить тест"
                                                    : "Далее"}
                                            </span>
                                            {!isTestFinished && (
                                                <img
                                                    src={"/svg/arrow-right.svg"}
                                                    className="check-answer-icon__img"
                                                    loading="lazy"
                                                    alt=""
                                                    width={6}
                                                    height={10}
                                                />
                                            )}
                                        </div>
                                    </button>
                                ) : (
                                    <button
                                        disabled={!selectedAnswerId}
                                        onClick={checkAnswer}
                                        className="black-submit-button check-answer-btn"
                                    >
                                        Проверить ответ
                                    </button>
                                )}
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
});

export default TestLesson;
