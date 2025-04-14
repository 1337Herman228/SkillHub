import "./AvatarStroke.scss";

type AvatarStrokeProps = {
    children: React.ReactNode;
    frameSrc?: string; // путь к рамке (можно SVG/PNG)
    size?: number; // размер аватарки и рамки
    style?: React.CSSProperties;
};

const AVATAR_PATH = "/avatar-strokes/";

const AvatarStroke: React.FC<AvatarStrokeProps> = ({
    children,
    frameSrc,
    // frameSrc = "pink-stroke.png",
    // frameSrc = "tree-stroke.png",
    // frameSrc = "rainbow-stroke.png",
    // frameSrc = "rainbow-clouds-stroke.png",
    size = 100,
    style,
}) => {
    return frameSrc ? (
        <div className="avatar-stroke-container">
            <div className="children-container">{children}</div>
            <img
                src={AVATAR_PATH + frameSrc}
                alt="Avatar frame"
                className="avatar-stroke"
                style={{
                    width: size,
                    height: size,
                    objectFit: "cover",
                    ...style,
                }}
            />
        </div>
    ) : (
        children
    );
};

export default AvatarStroke;
