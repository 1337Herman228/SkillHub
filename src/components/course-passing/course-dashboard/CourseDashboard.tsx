"use client";

import { useState } from "react";
import "./CourseDashboard.scss";
import AboutCourse from "./about-course/AboutCourse";
import Questions from "./questions/Questions";
import Notes from "./notes/Notes";
import Reviews from "./reviews/Reviews";
import { ICourseInfoNullable } from "@/interfaces/types";
import { useParams } from "next/navigation";
import ScrollableBlock, {
    Item,
} from "@/components/scrollable-block/ScrollableBlock";
import { useMediaQuery } from "react-responsive";
import Materials from "../materials/Materials";

type TTabNames = "materials" | "about" | "questions" | "notes" | "reviews";

interface CourseDashboardProps {
    course: ICourseInfoNullable;
}

const CourseDashboard = ({ course }: CourseDashboardProps) => {
    const isMobileDevice = useMediaQuery({ query: "(max-width: 768px)" });
    const params = useParams();
    const [tabName, setTabName] = useState<TTabNames>(
        isMobileDevice ? "materials" : "about"
    );

    return (
        <div className="dashboard-container">
            <div className="dashboard">
                {!isMobileDevice && (
                    <DashboardLinks tabName={tabName} setTabName={setTabName} />
                )}
                {isMobileDevice && (
                    <MobileDashboardLinks
                        tabName={tabName}
                        setTabName={setTabName}
                    />
                )}
            </div>
            <div className="content">
                {tabName === "about" && <AboutCourse course={course} />}
                {tabName === "questions" && <Questions params={params} />}
                {tabName === "notes" && <Notes params={params} />}
                {tabName === "reviews" && (
                    <Reviews courseId={course.course?.courseId as number} />
                )}
                {tabName === "materials" && (
                    <Materials
                        role="user"
                        course={course}
                        isHiddenMobile={false}
                    />
                )}
            </div>
        </div>
    );
};

interface DashboardLinksProps {
    tabName: TTabNames;
    setTabName: (tabName: TTabNames) => void;
}

const MobileDashboardLinks = ({ tabName, setTabName }: DashboardLinksProps) => {
    return (
        <div className="dashboard__mobile">
            <div className="scrollable-container">
                <button
                    onClick={() => setTabName("materials")}
                    className={`dashboard__item ${
                        tabName === "materials" && "active"
                    }`}
                >
                    Материалы
                </button>
                <button
                    onClick={() => setTabName("about")}
                    className={`dashboard__item ${
                        tabName === "about" && "active"
                    }`}
                >
                    Обзор
                </button>
                <button
                    onClick={() => setTabName("questions")}
                    className={`dashboard__item ${
                        tabName === "questions" && "active"
                    }`}
                >
                    Вопросы и ответы
                </button>
                <button
                    onClick={() => setTabName("notes")}
                    className={`dashboard__item ${
                        tabName === "notes" && "active"
                    }`}
                >
                    Заметки
                </button>
                <button
                    onClick={() => setTabName("reviews")}
                    className={`dashboard__item ${
                        tabName === "reviews" && "active"
                    }`}
                >
                    Отзывы
                </button>
            </div>
        </div>
    );
};

// const MobileDashboardLinks = ({ tabName, setTabName }: DashboardLinksProps) => {
//     return (
//         <div className="dashboard__mobile">
//             <ScrollableBlock cardsCountMobile={4} itemsToScroll={1}>
//                 <Item>
//                     <button
//                         onClick={() => setTabName("materials")}
//                         className={`dashboard__item ${
//                             tabName === "materials" && "active"
//                         }`}
//                     >
//                         Материалы
//                     </button>
//                 </Item>
//                 <Item>
//                     <button
//                         onClick={() => setTabName("about")}
//                         className={`dashboard__item ${
//                             tabName === "about" && "active"
//                         }`}
//                     >
//                         Обзор
//                     </button>
//                 </Item>
//                 <Item>
//                     <button
//                         onClick={() => setTabName("questions")}
//                         className={`dashboard__item ${
//                             tabName === "questions" && "active"
//                         }`}
//                     >
//                         Вопросы и ответы
//                     </button>
//                 </Item>
//                 <Item>
//                     <button
//                         onClick={() => setTabName("notes")}
//                         className={`dashboard__item ${
//                             tabName === "notes" && "active"
//                         }`}
//                     >
//                         Заметки
//                     </button>
//                 </Item>
//                 <Item>
//                     <button
//                         onClick={() => setTabName("reviews")}
//                         className={`dashboard__item ${
//                             tabName === "reviews" && "active"
//                         }`}
//                     >
//                         Отзывы
//                     </button>
//                 </Item>
//             </ScrollableBlock>
//         </div>
//     );
// };
const DashboardLinks = ({ tabName, setTabName }: DashboardLinksProps) => {
    return (
        <div className="dashboard__desktop">
            <button
                onClick={() => setTabName("about")}
                className={`dashboard__item ${tabName === "about" && "active"}`}
            >
                Обзор
            </button>
            <button
                onClick={() => setTabName("questions")}
                className={`dashboard__item ${
                    tabName === "questions" && "active"
                }`}
            >
                Вопросы и ответы
            </button>
            <button
                onClick={() => setTabName("notes")}
                className={`dashboard__item ${tabName === "notes" && "active"}`}
            >
                Заметки
            </button>
            <button
                onClick={() => setTabName("reviews")}
                className={`dashboard__item ${
                    tabName === "reviews" && "active"
                }`}
            >
                Отзывы
            </button>
        </div>
    );
};

export default CourseDashboard;
