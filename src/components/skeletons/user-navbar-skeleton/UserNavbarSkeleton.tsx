import "./UserNavbarSkeleton.scss";

const UserNavbarSkeleton = () => {
    return (
        <>
            <div className="skeleton-navbar hidden-mobile">
                <div className="skeleton-logo" />
                <div className="skeleton-title" />
                <div className="skeleton-item" />
                <div className="skeleton-icon" />
                <div className="skeleton-icon" />
            </div>
            <div className="skeleton-navbar-mobile visible-mobile">
                <div className="skeleton-icon" />
                <div className="skeleton-icon" />
                <div className="skeleton-title" />
                <div className="skeleton-icon" />
                <div className="skeleton-icon" />
            </div>
        </>
    );
};

export default UserNavbarSkeleton;
