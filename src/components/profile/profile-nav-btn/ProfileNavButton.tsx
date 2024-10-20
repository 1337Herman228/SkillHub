import { IProfileSectionInfo } from "@/interfaces/types";

interface ProfileNavButtonProps {
    section: IProfileSectionInfo;
    setCurrentSection: (section: IProfileSectionInfo) => void;
    className?: string;
}

const ProfileNavButton = ({
    section,
    setCurrentSection,
    className,
}: ProfileNavButtonProps) => {
    return (
        <button
            key={section.id}
            onClick={() => setCurrentSection(section)}
            className={className}
        >
            {section.linkName}
        </button>
    );
};

export default ProfileNavButton;
