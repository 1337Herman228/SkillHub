"use client";

import CustomSearch from "@/components/search/custom-search/CustomSearch";
import Spinner from "@/components/spinners/spinner/Spinner";
import StubWithBtn from "@/components/stubs/stub-with-btn/StubWithBtn";
import { useEffect, useState } from "react";
import "./HasAccessPage.scss";
import AccessCard from "@/components/cards/access-card/AccessCard";
import { IHasAccessUser } from "@/interfaces/types";
import useFetch from "@/lib/hooks/useFetch";
import { useAppSelector } from "@/lib/redux/store/store";

const HasAccessPage = () => {
    const course = useAppSelector((state) => state.course);

    const { getHasAccessUsers, getHasAccessUsersByName, isLoading } =
        useFetch();

    const [hasAccess, setHasAccess] = useState<IHasAccessUser[]>([]);
    const [searchtext, setSearchtext] = useState("");

    const fetchAllRecords = async () => {
        if (course.course?.courseId) {
            const allHasAccessData = await getHasAccessUsers(
                course.course?.courseId as number
            );
            setHasAccess(allHasAccessData);
        }
    };
    useEffect(() => {
        fetchAllRecords();
    }, [course]);

    const fetchRecordsByName = async () => {
        if (course.course?.courseId) {
            const data = await getHasAccessUsersByName(
                course.course?.courseId as number,
                searchtext
            );
            setHasAccess(data);
        }
    };

    useEffect(() => {
        fetchRecordsByName();
    }, [searchtext]);

    const loading = !course || !hasAccess || isLoading;

    return (
        <div className="has-access-page container-reduced-medium">
            <section className="has-access section-medium">
                <div className="has-access__dashboard">
                    <div className="dashboard-text">
                        <h1 className="dashboard-text__title  title">
                            Управление доступом
                        </h1>
                        <div className="dashboard-text__description title-description">
                            Люди, которые имеют доступ доступ к вашим курсам
                        </div>
                    </div>
                    <div className="dashboard-search">
                        <CustomSearch
                            state={searchtext}
                            setStateFunc={setSearchtext}
                            style={{ width: "100%" }}
                        />
                    </div>
                </div>
                {loading ? (
                    <div className="has-access__loading">
                        <Spinner size="70px" />
                    </div>
                ) : (
                    <>
                        {hasAccess?.length > 0 ? (
                            <div className="has-access__content">
                                {hasAccess.map((obj) => (
                                    <AccessCard
                                        key={obj.accessId}
                                        user={obj.user}
                                        courseId={course.course?.courseId ?? 0}
                                        type="has-access"
                                        fetchAllRecords={fetchAllRecords}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="has-access__not-found">
                                <StubWithBtn
                                    btnType="none"
                                    title="Тут пусто!"
                                    description="Еще никто не получил доступ"
                                />
                            </div>
                        )}
                    </>
                )}
            </section>
        </div>
    );
};

export default HasAccessPage;
