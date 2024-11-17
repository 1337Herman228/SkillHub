import "./ProgressBar.scss";

interface StatBarProps {
    percentage: number;
}

const ProgressBar = ({ percentage }: StatBarProps) => {
    // Ограничиваем значение от 0 до 100
    const clampedPercentage = Math.max(0, Math.min(percentage, 100));

    return (
        <div className="progress-bar">
            <div
                className="progress-fill"
                style={{ width: `${clampedPercentage}%` }}
            />
        </div>
    );
};

export default ProgressBar;
