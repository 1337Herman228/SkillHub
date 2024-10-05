import Spinner from "../spinner/Spinner";
import "./FullScreenSpinner.scss";

interface FullScreenSpinnerProps {
    blackout?: boolean;
    color?: string;
    size?: string;
    animationDuration?: string;
    strokeWidth?: number;
}

const FullScreenSpinner = ({
    blackout = false,
    color = "#a435f0",
    size = "120px",
    animationDuration = "0.9s",
    strokeWidth = 14,
}: FullScreenSpinnerProps) => {
    return (
        <div className={`full-screen-spinner ${blackout ? "blackout" : ""}`}>
            <Spinner
                animationDuration={animationDuration}
                color={color}
                strokeWidth={strokeWidth}
                size={size}
            />
        </div>
    );
};

export default FullScreenSpinner;
