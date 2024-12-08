"use client";

import { useEffect, useState } from "react";
import "./Notes.scss";
import useFetch from "@/lib/hooks/useFetch";
import Spinner from "../../../spinners/spinner/Spinner";
import { INote, NotificationType } from "@/interfaces/types";
import TextEditor from "@/components/text-editor/TextEditor";
import { notification } from "antd";

interface NotesProps {
    params: Record<string, string | string[]> | null;
}

const Notes = ({ params }: NotesProps) => {
    const [api, contextHolder] = notification.useNotification();
    const MyNotification = (
        type: NotificationType,
        message: string,
        description: string
    ) => {
        api[type]({
            message: message,
            description: description,
        });
    };

    const [note, setNote] = useState<INote>();
    const [text, setText] = useState<string>("");
    console.log(note);

    const { getUserNote, saveUserNote } = useFetch();

    useEffect(() => {
        fetchNote();
    }, [params]);

    const fetchNote = async () => {
        if (params?.["lesson-id"]) {
            const data = await getUserNote(String(params?.["lesson-id"]));
            setNote(data);
            setText(data?.text as string);
        }
    };

    const onHandleSave = async () => {
        if (text?.length > 7 && note) {
            const response = await saveUserNote({
                lessonId: Number(params?.["lesson-id"]),
                text: text,
                createdAt: new Date(),
            });
            if (response === "BAD_REQUEST") {
                MyNotification("error", "Ошибка", "Что-то пошло не так");
            } else {
                MyNotification("success", "Успешно", "Заметка сохранена");
            }
        } else {
            MyNotification(
                "warning",
                "Внимание",
                "Заполните поле для заметки!"
            );
        }
    };

    if (!note)
        return (
            <div className="centered-div">
                <Spinner />
            </div>
        );

    return (
        <div className="notes-container">
            {contextHolder}
            <TextEditor
                style={{ maxWidth: "800px" }}
                htmlText={text}
                setStateFunc={setText}
            />
            <div className="notes-dashboard">
                <button
                    onClick={onHandleSave}
                    className="black-submit-button add-answer__btn"
                >
                    Сохранить заметку
                </button>
            </div>
        </div>
    );
};

export default Notes;
