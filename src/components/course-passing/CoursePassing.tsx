import { ICourseInfoUrlParams } from "@/interfaces/types";
import "./CoursePassing.scss";
import Materials from "./materials/Materials";
import VideoPlayer from "./video-player/VideoPlayer";

interface CoursePassingProps {
    params: ICourseInfoUrlParams;
}

const CoursePassing = ({ params }: CoursePassingProps) => {
    return (
        <section className="course-passing-container">
            <div className="left-part">
                <div className="left-part__lesson">
                    <VideoPlayer />
                </div>
                <div className="left-part__dashboard">Обзор</div>
            </div>
            <div className="right-part">
                <Materials params={params} role="teacher" />
            </div>
        </section>
    );
};

export default CoursePassing;