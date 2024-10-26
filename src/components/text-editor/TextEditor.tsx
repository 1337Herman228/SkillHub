"use client";

import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { Editor, EditorState, RichUtils } from "draft-js";
import { convertToHTML, convertFromHTML } from "draft-convert";
import "draft-js/dist/Draft.css";
import "./TextEditor.scss";
import FormatButton from "./format-buttons/FormatButton";

const blockButtons = [
    { type: "header-two", size: 20 },
    { type: "header-three", size: 20 },
    { type: "unordered-list-item", size: 25 },
    { type: "ordered-list-item", size: 25 },
];

const inlineButtons = [
    { type: "BOLD", size: 15 },
    { type: "ITALIC", size: 15 },
    { type: "CODE", size: 20 },
];

type TextEditorProps = {
    isInvalid?: boolean;
    errorMessage?: string;
    htmlText?: string;
    title?: string;
    setStateFunc: (state: string) => void;
};

const TextEditor: React.FC<TextEditorProps> = memo(
    ({ htmlText, title, setStateFunc, errorMessage, isInvalid }) => {
        const editorRef = useRef<Editor>(null);

        const [editorState, setEditorState] = useState<EditorState>(
            EditorState.createEmpty()
        );

        const handleKeyCommand = (command: string) => {
            const newState = RichUtils.handleKeyCommand(editorState, command);
            if (newState) {
                setEditorState(newState);
                return "handled";
            }
            return "not-handled";
        };

        const toggleBlockType = (blockType: string) => {
            setEditorState(RichUtils.toggleBlockType(editorState, blockType));
        };

        const toggleInlineStyle = (inlineStyle: string) => {
            setEditorState(
                RichUtils.toggleInlineStyle(editorState, inlineStyle)
            );
        };

        const saveAsHTML = () => {
            const contentState = editorState.getCurrentContent();
            const html = convertToHTML(contentState);
            return html;
        };

        const loadFromHTML = (html: string) => {
            const contentState = convertFromHTML(html);
            const newEditorState = EditorState.createWithContent(contentState);
            setEditorState(newEditorState);
        };

        const currentStyle = editorState.getCurrentInlineStyle();

        useEffect(() => {
            htmlText && loadFromHTML(htmlText);
        }, []);

        const handleChangeText = (value: EditorState) => {
            const currentSelection = value.getSelection();
            setStateFunc(saveAsHTML());
            const stateWithContentAndSelection = EditorState.acceptSelection(
                value,
                currentSelection
            );
            setEditorState(stateWithContentAndSelection);
        };

        return (
            <div className="text-editor-container">
                <div className="title">{title}</div>
                <div className={`text-editor ${isInvalid ? "invalid" : ""}`}>
                    <div className="toolbar">
                        {blockButtons.map((blockType) => (
                            <FormatButton
                                key={blockType.type}
                                onToggle={() => toggleBlockType(blockType.type)}
                                isActive={currentStyle.has(blockType.type)}
                                typeIcon={blockType.type}
                                size={blockType.size}
                            />
                        ))}
                        {inlineButtons.map((style) => (
                            <FormatButton
                                key={style.type}
                                onToggle={() => toggleInlineStyle(style.type)}
                                isActive={currentStyle.has(style.type)}
                                typeIcon={style.type}
                                size={style.size}
                            />
                        ))}
                    </div>
                    <div
                        className={`editor html-block ${
                            isInvalid ? "invalid" : ""
                        }`}
                        onClick={() => editorRef.current?.editor?.focus()}
                    >
                        <Editor
                            ref={editorRef}
                            editorState={editorState}
                            handleKeyCommand={handleKeyCommand}
                            onChange={handleChangeText}
                            customStyleMap={{
                                HIGHLIGHT: {
                                    backgroundColor: "var(--light-purple)",
                                },
                                CODE: {
                                    backgroundColor: "var(--light-grey)",
                                    border: "var(--border-grey)",
                                    color: "var(--dark-purple)",
                                    borderRadius: "3px",
                                    padding: "2px 4px",
                                    margin: "0 3px",
                                    fontFamily: "monospace",
                                    fontWeight: "500",
                                },
                            }}
                        />
                    </div>
                </div>
                {isInvalid && <p className="textarea-error">{errorMessage}</p>}
            </div>
        );
    }
);

export default TextEditor;
