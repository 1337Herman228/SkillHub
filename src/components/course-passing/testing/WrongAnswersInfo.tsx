import { ITestResult } from "@/interfaces/types";
import "./WrongAnswersInfo.scss";
import parse from "html-react-parser";
import DOMPurify from "dompurify";

interface WrongAnswersInfoProps {
    wrongAnswers: ITestResult[];
}

const WrongAnswersInfo = ({ wrongAnswers }: WrongAnswersInfoProps) => {
    return wrongAnswers.length ? (
        <div className="wrong-answers">
            <div className="wrong-answers__title">
                Вопросы, на которые вы ответили неверно:
            </div>
            <div className="wrong-answers__list">
                {wrongAnswers.map((wrongAnswer) => (
                    <div key={wrongAnswer.testQuestionId} className="question">
                        <div className="question__title">
                            {wrongAnswer.questionOrder}.
                            <div className="html-block">
                                {parse(
                                    DOMPurify.sanitize(wrongAnswer.questionText)
                                )}
                            </div>
                        </div>
                        <div className="question__divider">
                            <span className="question__user-answer">
                                Ваш ответ: {wrongAnswer.userAnswer}
                            </span>
                            <span className="question__correct-answer">
                                Верный ответ:{" "}
                                {wrongAnswer.correctAnswerDescription}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    ) : null;
};

export default WrongAnswersInfo;
