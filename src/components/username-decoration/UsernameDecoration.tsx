import { IUser } from "@/interfaces/types";

interface UsernameDecorationProps {
    user: IUser;
    showSurname?: boolean;
    style?: React.CSSProperties;
}

const UsernameDecoration = ({ user, style }: UsernameDecorationProps) => {
    return (
        <span
            style={{
                ...style,
                ...JSON.parse(
                    user?.nicknameColor?.color ||
                        `{"color":"var(--light-black)"}`
                ),
            }}
        >
            {user.person?.name} {user.person?.surname}
            {user?.dignity && (
                <span>
                    {": "}
                    {user.dignity?.dignityName}
                </span>
            )}
        </span>
    );
};

export default UsernameDecoration;
