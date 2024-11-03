"use client";

import DropdownList, { IOption } from "@/components/dropdowns/DropdownList";
import { useState } from "react";
import { Modal } from "antd";
import AddChapterForm from "../../add-chapter-form/AddChapterForm";
import {
    IChapterWithLessonsInfo,
    ICourseInfoNullable,
} from "@/interfaces/types";

const makeChaptersOptionsList = (
    chapters: IChapterWithLessonsInfo[]
): IOption[] => {
    return chapters.map((chapter) => ({
        value: String(chapter.chapterId),
        name: chapter.chapterOrder + ". " + chapter.chapterTitle,
    }));
};

interface ChaptersListProps {
    chapters: IChapterWithLessonsInfo[];
    setChapter: (chapter: string) => void;
    chapter: string;
    isFormSubmitted: boolean;
    defaultChapterValue: string;
}

const ChaptersList = ({
    chapters,
    setChapter,
    chapter,
    isFormSubmitted,
    defaultChapterValue,
}: ChaptersListProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const chapterOptions = makeChaptersOptionsList(chapters);

    return (
        <>
            <Modal
                styles={{
                    content: {
                        borderRadius: 0,
                        border: "var(--border-black)",
                        boxShadow: "0 0 0 0",
                        padding: "35px 35px 40px 35px",
                        minWidth: "600px",
                    },
                    mask: {
                        backdropFilter: "blur(2px)",
                    },
                }}
                zIndex={7000}
                centered
                open={isModalOpen}
                onCancel={handleCancel}
                footer={null}
            >
                <AddChapterForm />
            </Modal>
            <DropdownList
                setStateFunc={setChapter}
                placeholder="Выберите раздел"
                labelText="Раздел"
                name="chapter"
                options={chapterOptions}
                isError={!chapter && isFormSubmitted}
                defaultValue={chapterOptions.find(
                    (item) => item.value === defaultChapterValue
                )}
                extraOption={
                    <li
                        tabIndex={0}
                        onClick={() => showModal()}
                        className="dropdown-list__option option add-chapter-btn"
                    >
                        + Добавить новый раздел
                    </li>
                }
            />
        </>
    );
};

export default ChaptersList;
