import { ReactNode } from "react";
import "./Greetings.scss";
import { useAppSelector } from "@/lib/redux/store/store";
import AvatarStroke from "@/components/avatar-stroke/AvatarStroke";
import UsernameDecoration from "@/components/username-decoration/UsernameDecoration";

interface GreetingsProps {
    textBigStyles?: React.CSSProperties;
    textBig?: ReactNode;
    textSmall: ReactNode;
    style?: React.CSSProperties;
}

const Greetings = ({
    textBig,
    textSmall,
    style,
    textBigStyles,
}: GreetingsProps) => {
    const user = useAppSelector((state) => state.user.user);

    if (!user) {
        return null;
    }

    return (
        <div style={style} className="greetings">
            <div className="greetings__img-container">
                <AvatarStroke size={65} frameSrc={user?.avatarStroke?.url}>
                    <img
                        className="greetings__img profile-img"
                        loading="lazy"
                        alt=""
                        src={
                            user.person?.avatarImg
                                ? "/upload-images/" + user.person?.avatarImg
                                : "/svg/profile.svg"
                        }
                        width={55}
                        height={55}
                    />
                </AvatarStroke>
            </div>

            <div className="greetings__text">
                <span className="greetings__text-big" style={textBigStyles}>
                    {textBig} <UsernameDecoration user={user} />
                </span>
                <span className="greetings__text-small">{textSmall}</span>
            </div>
        </div>
    );
};

export default Greetings;
