import CoursePassing from "@/components/course-passing/CoursePassing";

interface TeacherCourseMaterialsPageProps {
    isAdmin?: boolean;
}

const TeacherCourseMaterialsPage = ({
    isAdmin = false,
}: TeacherCourseMaterialsPageProps) => {
    return (
        <div>
            <CoursePassing role={isAdmin ? "admin" : "teacher"} />
        </div>
    );
};

export default TeacherCourseMaterialsPage;
