import CoursePassing from "@/components/course-passing/CoursePassing";
import { ICourseInfoUrlParams } from "@/interfaces/types";
import React from "react";

interface TeacherCourseMaterialsPageProps {
    params: ICourseInfoUrlParams;
}

const TeacherCourseMaterialsPage = ({
    params,
}: TeacherCourseMaterialsPageProps) => {
    return (
        <div>
            <CoursePassing params={params} />
        </div>
    );
};

export default TeacherCourseMaterialsPage;
