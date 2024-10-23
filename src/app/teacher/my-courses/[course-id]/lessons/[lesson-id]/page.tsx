import TeacherCourseMaterialsPage from "@/components/pages/teacher-course-materials/TeacherCourseMaterialsPage";
import { ICourseInfoUrlParams } from "@/interfaces/types";

interface LessonPageProps {
    params: ICourseInfoUrlParams;
}

export default function LessonPage({ params }: LessonPageProps) {
    return <TeacherCourseMaterialsPage params={params} />;
}
