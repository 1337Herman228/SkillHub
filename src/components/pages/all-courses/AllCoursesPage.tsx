"use client";

import CustomSearch from "@/components/search/custom-search/CustomSearch";
import "./AllCoursesPage.scss";

const AllCoursesPage = () => {
    return (
        <div className="all-courses-page container-reduced-medium">
            <section className="all-courses section-medium">
                <div className="all-courses__dashboard">
                    <div className="dashboard-text">
                        <h1 className="dashboard-text__title  title">
                            Выберите курс
                        </h1>
                        <div className="dashboard-text__description title-description">
                            Чтобы приступить к выполнению курса запросите доступ
                        </div>
                    </div>
                    <div className="dashboard-search">
                        <CustomSearch style={{ width: "100%" }} />
                    </div>
                </div>
                <div className="all-courses__content"></div>
            </section>
        </div>
    );
};

export default AllCoursesPage;
