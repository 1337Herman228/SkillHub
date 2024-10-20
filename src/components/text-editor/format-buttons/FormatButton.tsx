import type { FC } from "react";
import "./FormatButton.scss";

const PATH_NAME = "/svg/";
const EXTENSION = ".svg";

const getIconPath = (iconType: string) => {
    switch (iconType) {
        case "BOLD":
            return PATH_NAME + "icon-bold" + EXTENSION;
        case "ITALIC":
            return PATH_NAME + "icon-italic" + EXTENSION;
        case "CODE":
            return PATH_NAME + "icon-code" + EXTENSION;
        case "HIGHLIGHT":
            return PATH_NAME + "icon-highlight" + EXTENSION;
        case "header-three":
            return PATH_NAME + "h2-icon" + EXTENSION;
        case "header-two":
            return PATH_NAME + "h1-icon" + EXTENSION;
        case "unordered-list-item":
            return PATH_NAME + "unordered-list-icon" + EXTENSION;
        case "ordered-list-item":
            return PATH_NAME + "ordered-list-icon" + EXTENSION;
        default:
            return PATH_NAME + "icon-bold" + EXTENSION;
    }
};

type TProps = {
    isActive?: boolean;
    onToggle: () => void;
    typeIcon: string;
    size: number;
};

const FormatButton: FC<TProps> = ({ isActive, onToggle, size, typeIcon }) => {
    return (
        <button
            onClick={() => onToggle()}
            type="button"
            className={
                isActive
                    ? "format-button format-button--active"
                    : "format-button"
            }
        >
            <img
                className="format-button"
                src={getIconPath(typeIcon)}
                width={size}
                height={size}
                loading="lazy"
                alt={typeIcon}
            />
        </button>
    );
};

export default FormatButton;
