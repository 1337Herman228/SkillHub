"use client";

import React, { useEffect, useRef, useState } from "react";
import PassLessonBtn from "../pass-lesson-btn/PassLessonBtn";
import HoverModalOpenBtn from "@/components/buttons/hover-modal-open-btn/HoverModalOpenBtn";
import HoverModal from "@/components/modals/hover-modal/HoverModal";
import Link from "next/link";
import "./Lesson.scss";
import { ILessonWithResources, TLessonType, TRole } from "@/interfaces/types";
import useTime from "@/lib/hooks/useTime";
import { useParams, usePathname, useRouter } from "next/navigation";
import EditBtn from "../edit-btn/EditBtn";

interface LessonProps {
    lesson: ILessonWithResources;
    chapterOrder: number;
    role?: TRole;
    courseId: number;
}

const Lesson = ({
    role = "user",
    chapterOrder,
    lesson,
    courseId,
}: LessonProps) => {
    const btnResourcesRef = useRef(null);
    const [isResourcesModalOpen, setIsResourcesModalOpen] = useState(false);

    const { convertMinutesToHoursAndMinutes, formatTimeToHoursAndMinutes } =
        useTime();

    const chooseLessonIcon = (lessonType: TLessonType) => {
        switch (lessonType) {
            case "TEST": {
                return "/svg/test-icon.svg";
            }
            case "TEXT": {
                return "/svg/text-lesson-icon.svg";
            }
            case "VIDEO": {
                return "/svg/video-lesson-icon.svg";
            }
        }
    };

    const { hours, minutes } = convertMinutesToHoursAndMinutes(lesson.duration);

    const router = useRouter();
    const pathname = usePathname();
    const params = useParams();

    const addLessonIdToUrl = (lessonId: string) => {
        // Создаем новый объект URL на основе текущего URL
        if (pathname && params) {
            let newUrl = "";
            if (pathname.includes(String(params["lesson-id"]))) {
                newUrl = pathname.replace(
                    "lessons/" + params["lesson-id"],
                    "lessons/" + lessonId
                );
            } else {
                newUrl = pathname + `/${lessonId}`;
            }

            // Обновляем URL с помощью router.push
            router.push(newUrl.toString());
        }
    };

    useEffect(() => {
        if (pathname && params)
            if (!pathname.includes("lessons/" + params["lesson-id"])) {
                addLessonIdToUrl(String(lesson.lessonId));
            }
    }, [pathname]);

    if (pathname)
        return (
            <li
                tabIndex={0}
                onClick={() => addLessonIdToUrl(String(lesson.lessonId))}
                className={`lesson-container ${
                    Number(params?.["lesson-id"]) == lesson?.lessonId
                        ? "current-lesson"
                        : ""
                }`}
            >
                <div className="btn-container">
                    {role === "teacher" || role === "admin" ? (
                        <EditBtn
                            lessonId={lesson?.lessonId}
                            courseId={courseId}
                        />
                    ) : (
                        <>
                            {lesson?.lessonType !== "TEST" ? (
                                <PassLessonBtn
                                    courseId={courseId}
                                    lessonId={lesson.lessonId}
                                />
                            ) : (
                                <div />
                            )}
                        </>
                    )}
                </div>
                <div className="info-container">
                    <div className="lesson-header">
                        <div className="lesson-name">
                            {Number(chapterOrder) +
                                "." +
                                Number(lesson?.lessonOrder)}{" "}
                            {lesson?.lessonTitle}
                        </div>
                        <div className="diamonds">
                            {lesson.diamondReward &&
                            lesson.diamondReward > 0 ? (
                                <>
                                    <span className="diamonds__count">
                                        {lesson.diamondReward}
                                    </span>
                                    <img
                                        className={`diamonds__icon`}
                                        alt=""
                                        src={`/svg/diamond.svg`}
                                        width={16}
                                        height={16}
                                    />
                                </>
                            ) : null}
                        </div>
                    </div>

                    <div className="lesson-info">
                        <div className="lesson-info__time">
                            <img
                                className={`chapter-title__arrow`}
                                alt=""
                                src={chooseLessonIcon(lesson?.lessonType)}
                                width={16}
                                height={16}
                            />
                            <span>
                                {lesson.lessonType === "TEST"
                                    ? "Test"
                                    : formatTimeToHoursAndMinutes(
                                          hours,
                                          minutes,
                                          true
                                      )}
                            </span>
                        </div>
                        {lesson.resources.length > 0 && (
                            <HoverModalOpenBtn
                                btnRef={btnResourcesRef}
                                stateSetter={setIsResourcesModalOpen}
                            >
                                <div
                                    className={`resources ${
                                        isResourcesModalOpen ? "open" : ""
                                    }`}
                                >
                                    <img
                                        className="resources__folder-icon"
                                        loading="lazy"
                                        alt=""
                                        src={"/svg/folder-icon.svg"}
                                        width={20}
                                        height={20}
                                    />
                                    <div className="resources__title">
                                        Ресурсы
                                    </div>
                                    <img
                                        className={`resources__arrow-icon`}
                                        alt=""
                                        src={`/svg/dropdown-arrow-top.svg`}
                                        width={8}
                                        height={5}
                                    />
                                    <HoverModal
                                        style={{
                                            top: "25px",
                                        }}
                                        openBtnRef={btnResourcesRef}
                                        isOpen={isResourcesModalOpen}
                                        setStateFunc={setIsResourcesModalOpen}
                                    >
                                        <div className="resources-modal">
                                            <div className="resources-list">
                                                {lesson.resources.map(
                                                    (resource) => (
                                                        <Link
                                                            key={
                                                                resource.resourceId
                                                            }
                                                            className="resource-link"
                                                            target="_blank"
                                                            href={
                                                                resource.resourceLink
                                                            }
                                                        >
                                                            <svg
                                                                className="resource-link__icon"
                                                                width="14"
                                                                height="14"
                                                                viewBox="0 0 14 14"
                                                                fill="none"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path
                                                                    d="M9.91732 11.6663H3.50065C2.85632 11.6663 2.33398 11.144 2.33398 10.4997V4.08301C2.33398 3.43868 2.85632 2.91634 3.50065 2.91634H5.83398V4.08301H3.50065V10.4997H9.91732V8.16634H11.084V10.4997C11.084 11.144 10.5617 11.6663 9.91732 11.6663ZM6.82565 7.99542L6.00315 7.17059L9.67407 3.49967H7.58398V2.33301H11.6673V6.41634H10.5007V4.32509L6.82565 7.99542Z"
                                                                    fill="#916DED"
                                                                />
                                                            </svg>
                                                            <div className="resource-link__text">
                                                                {
                                                                    resource.resourceTitle
                                                                }
                                                            </div>
                                                        </Link>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    </HoverModal>
                                </div>
                            </HoverModalOpenBtn>
                        )}
                    </div>
                </div>
            </li>
        );
};

export default Lesson;
