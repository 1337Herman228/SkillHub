import CoursePassing from "@/components/course-passing/CoursePassing";
import { ICourseInfoUrlParams } from "@/interfaces/types";
import React from "react";

interface TeacherCourseMaterialsPageProps {}

const TeacherCourseMaterialsPage = ({}: TeacherCourseMaterialsPageProps) => {
    return (
        <div>
            <CoursePassing role="teacher" />
        </div>
    );
};

export default TeacherCourseMaterialsPage;
