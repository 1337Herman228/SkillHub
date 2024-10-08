import { ReactNode } from "react";
import "./Greetings.scss";

interface GreetingsProps {
    textBig: ReactNode;
    textSmall: ReactNode;
    style?: React.CSSProperties;
}

const Greetings = ({ textBig, textSmall, style }: GreetingsProps) => {
    return (
        <div style={style} className="greetings">
            <img
                className="greetings__img"
                loading="lazy"
                alt=""
                src="svg/profile.svg"
                width={55}
                height={55}
            />
            <div className="greetings__text">
                <span className="greetings__text-big">{textBig}</span>
                <span className="greetings__text-small">{textSmall}</span>
            </div>
        </div>
    );
};

export default Greetings;
