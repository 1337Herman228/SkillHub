import { ICourse } from "@/interfaces/types";
import "./CourseCard.scss";

interface CourseCardProps {
    course: ICourse;
}

const CourseCard = ({ course }: CourseCardProps) => {
    return (
        <div className="course-card">
            <img
                className="img"
                loading="lazy"
                alt={course.courseName}
                src={course.courseImg}
                // width={20}
                // height={20}
            />

            <div className="info">
                <div className="course-name">{course.courseName}</div>
            </div>
        </div>
    );
};

export default CourseCard;
