import { ReactNode } from "react";
import "./Greetings.scss";
import { useAppSelector } from "@/lib/redux/store/store";

interface GreetingsProps {
    textBig: ReactNode;
    textSmall: ReactNode;
    style?: React.CSSProperties;
}

const Greetings = ({ textBig, textSmall, style }: GreetingsProps) => {
    const user = useAppSelector((state) => state.user.user);

    if (!user) {
        return null;
    }

    return (
        <div style={style} className="greetings">
            <img
                className="greetings__img profile-img"
                loading="lazy"
                alt=""
                src={
                    user.person?.avatarImg
                        ? "upload-images/" + user.person?.avatarImg
                        : "svg/profile.svg"
                }
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
