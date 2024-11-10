import "./ProfileHoverCard.scss";

interface ProfileHoverCardProps {
    imgSrc?: string;
    username: string;
}

const ProfileHoverCard = ({ imgSrc, username }: ProfileHoverCardProps) => {
    return (
        <div className="profile-hover-card-container">
            <div className="user-info">
                <img
                    className="avatar-img"
                    src={
                        imgSrc ? "/upload-images/" + imgSrc : "/svg/profile.svg"
                    }
                    alt="avatar"
                    width={45}
                    height={45}
                />
                <div className="username">{username}</div>
            </div>
        </div>
    );
};

export default ProfileHoverCard;
