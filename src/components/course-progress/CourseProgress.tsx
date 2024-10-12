import "./CourseProgress.scss";

interface ProgressCircleProps {
    percentage: number;
    mainCircleColor?: string;
    bgCircleColor?: string;
    size?: number;
    strokeWidth?: number;
}

const CourseProgress = ({
    percentage,
    mainCircleColor = "var(--dark-purple)",
    bgCircleColor = "var(--grey)",
    size = 50,
    strokeWidth = 15,
}: ProgressCircleProps) => {
    const radius = 35; // радиус окружности
    const circumference = 2 * Math.PI * radius; // длина окружности
    const filledLength = (percentage / 100) * circumference; // длина заполненной части
    const emptyLength = circumference - filledLength; // длина пустой части

    return (
        <div
            style={{
                height: size,
                width: size,
            }}
            className="progress-circle-container"
        >
            <svg
                className="progress-circle"
                style={{
                    height: size,
                    width: size,
                }}
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <circle
                    style={{ stroke: bgCircleColor }}
                    cx="50"
                    cy="50"
                    r={radius}
                    strokeWidth={strokeWidth}
                    strokeDasharray={`2000`}
                ></circle>
                <circle
                    className="progress-circle__main-circle"
                    style={{ stroke: mainCircleColor }}
                    cx="50"
                    cy="50"
                    r={radius}
                    strokeWidth={strokeWidth}
                    strokeDasharray={`${filledLength} ${emptyLength}`}
                ></circle>
            </svg>
            <svg
                className="trophy"
                width="36%"
                height="36%"
                viewBox="0 0 17 17"
                xmlns="http://www.w3.org/2000/svg"
            >
                <g clipPath="url(#clip0_219_169)">
                    <path
                        d="M17 0H0V17H17V0Z"
                        fill="white"
                        fillOpacity="0.01"
                    />
                    <path
                        d="M8.5 10.6253C10.8472 10.6253 12.75 8.66657 12.75 6.25033V1.41699H4.25V6.25033C4.25 8.66657 6.15279 10.6253 8.5 10.6253Z"
                        stroke="#333333"
                        strokeLinejoin="round"
                    />
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M4.25002 7.43815V3.89648H1.41669C1.41669 6.2576 2.83335 7.43815 4.25002 7.43815Z"
                        fill="#FCA016"
                        stroke="#333333"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12.75 7.43815V3.89648H15.5833C15.5833 6.2576 14.1667 7.43815 12.75 7.43815Z"
                        fill="#FCA016"
                        stroke="#333333"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M8.5 11.334V12.7507"
                        stroke="#333333"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M5.3125 14.875L6.61939 12.75H10.2859L11.6875 14.875H5.3125Z"
                        fill="#FCA016"
                        stroke="#333333"
                        strokeLinejoin="round"
                    />
                </g>
                <defs>
                    <clipPath id="clip0_219_169">
                        <rect width="17" height="17" fill="white" />
                    </clipPath>
                </defs>
            </svg>
        </div>
    );
};

export default CourseProgress;
