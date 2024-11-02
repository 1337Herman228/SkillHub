import "./TestFinished.scss";

interface TestFinishedProps {
    correctAnswersPercentage: number;
}

const TestFinished = ({ correctAnswersPercentage }: TestFinishedProps) => {
    return (
        <div className="test-finished-container">
            <h1 className="title">
                Вы ответили верно на {correctAnswersPercentage}% вопросов
            </h1>
            <div className="info-block">
                Для прохождения теста нужно верно ответить{" "}
                <span className="highlight">минимум на 80%</span>
                вопросов
            </div>
            {correctAnswersPercentage >= 80 ? (
                <div className="info-block">
                    <span className="highlight">Тест сдан!</span> Можете
                    переходить к следующему разделу обучения.
                </div>
            ) : (
                <div className="info-block">
                    <span className="highlight">Тест не сдан!</span> Повторите
                    материалы и попробуйте снова!
                </div>
            )}
        </div>
    );
};

export default TestFinished;
