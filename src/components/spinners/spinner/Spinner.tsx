"use client";

interface SpinnerProps {
    color?: string;
    size?: string;
    animationDuration?: string;
    strokeWidth?: number;
}

const Spinner = ({
    color = "#a435f0",
    size = "50px",
    animationDuration = "0.9s",
    strokeWidth = 15,
}: SpinnerProps) => {
    return (
        <svg
            style={{ height: size, width: size }}
            width="100"
            height="100"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <circle
                style={{ stroke: color }}
                cx="50"
                cy="50"
                r="35"
                strokeWidth={strokeWidth}
                strokeDasharray="165 100"
            >
                <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0 50 50"
                    to="360 50 50"
                    dur={animationDuration}
                    repeatCount="indefinite"
                />
            </circle>
        </svg>
    );
};

export default Spinner;
