"use client";

import { useState } from "react";
import "./CourseDashboard.scss";
import AboutCourse from "./about-course/AboutCourse";
import Questions from "./questions/Questions";
import Notes from "./notes/Notes";
import Reviews from "./reviews/Reviews";
import { ICourseInfoNullable } from "@/interfaces/types";
import { useParams } from "next/navigation";

type TTabNames = "about" | "questions" | "notes" | "reviews";

interface CourseDashboardProps {
    course: ICourseInfoNullable;
}

const CourseDashboard = ({ course }: CourseDashboardProps) => {
    const params = useParams();
    const [tabName, setTabName] = useState<TTabNames>("about");

    return (
        <div className="dashboard-container">
            <div className="dashboard">
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
            <div className="content">
                {tabName === "about" && <AboutCourse course={course} />}
                {tabName === "questions" && <Questions params={params} />}
                {tabName === "notes" && <Notes params={params} />}
                {tabName === "reviews" && <Reviews />}
            </div>
        </div>
    );
};

export default CourseDashboard;
