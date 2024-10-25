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

// import clsx from "clsx";
// import { memo, useCallback, useEffect, useRef, useState } from "react";
// import { ContentBlock, Editor, EditorState, RichUtils } from "draft-js";
// import { convertToHTML, convertFromHTML } from "draft-convert";
// import { TTextEditorTextStyle } from "./types";
// import {
//     TEXT_EDITOR_CUSTOM_STYLES,
//     TEXT_EDITOR_STYLE_TO_HTML,
// } from "./constants";
// import BlockStyleControls from "./block-style-controls/BlockStyleControls";
// import InlineStyleControls from "./inline-style-controls/InlineStyleControls";
// import "./TextEditor.scss";
// // import "draft-js/dist/Draft.css";

// type TClasses = {
//     textEditor?: string;
// };

// type TProps = {
//     classes?: TClasses;
//     htmlText?: string;
//     isInvalid?: boolean;
//     onChangeHTMLText?: (value: string) => void;
//     placeholder?: string;
//     title?: string;
// };

// function TextEditor({
//     classes,
//     title,
//     htmlText,
//     isInvalid,
//     onChangeHTMLText,
//     placeholder,
// }: TProps) {
//     const editorRef = useRef<Editor>(null);

//     // const [isFocused, setIsFocused] = useState(false);
//     // console.log("isFocused", isFocused);
//     const [editorState, setEditorState] = useState<EditorState>(() =>
//         EditorState.createEmpty()
//     );

//     let wrapperClassName = "TextEditor-Wrapper";
//     const contentState = editorState.getCurrentContent();
//     if (!contentState.hasText()) {
//         if (contentState.getBlockMap().first().getType() !== "unstyled") {
//             wrapperClassName += " TextEditor-Wrapper__hidePlaceholder";
//         }
//     }

//     // useEffect(() => {
//     //     console.log("qweqwe");
//     //     if (!isFocused) {
//     //         setTimeout(() => {
//     //             editorRef.current?.blur();
//     //         }, 0);
//     //     }
//     // }, [isFocused]);

//     const options = {
//         styleToHTML: (style: string) =>
//             TEXT_EDITOR_STYLE_TO_HTML(style as TTextEditorTextStyle),
//     };

//     const convertMessagetoHTML = convertToHTML(options);

//     const convertHtmlToRaw = (html: string): EditorState => {
//         const contentState = convertFromHTML({
//             htmlToStyle: (nodeName, node, currentStyle) => {
//                 if (nodeName === "span" && node.className === "highlight") {
//                     return currentStyle.add("HIGHLIGHT");
//                 } else {
//                     return currentStyle;
//                 }
//             },
//         })(html);
//         return EditorState.createWithContent(contentState);
//     };

//     useEffect(() => {
//         htmlText && setEditorState(convertHtmlToRaw(htmlText));
//     }, []);

//     // const handleChangeBlur = () => {
//     //     setIsFocused((prevState: boolean) => (prevState ? false : prevState));
//     //     editorRef.current?.editor?.blur();
//     //     // setIsFocused(false);
//     // };

//     // const handleChangeFocus = () => {
//     //     setIsFocused((prevState: boolean) => (prevState ? true : !prevState));
//     //     editorRef.current?.editor?.focus();
//     //     // setIsFocused(true);
//     // };

//     const handleChangeText = useCallback((value: EditorState) => {
//         const currentSelection = value.getSelection();
//         onChangeHTMLText?.(convertMessagetoHTML(value.getCurrentContent()));
//         const stateWithContentAndSelection = EditorState.forceSelection(
//             value,
//             currentSelection
//         );
//         setEditorState(stateWithContentAndSelection);
//     }, []);

//     const handleKeyCommand = useCallback(
//         (command: any, editorState: any) => {
//             const newState = RichUtils.handleKeyCommand(editorState, command);
//             if (newState) {
//                 setEditorState(newState);
//                 return "handled";
//             }
//             return "not-handled";
//         },
//         [editorState, setEditorState]
//     );

//     const getBlockStyle = (block: ContentBlock) => {
//         switch (block.getType()) {
//             case "blockquote":
//                 return "RichEditor-blockquote";
//             default:
//                 return "";
//         }
//     };

//     return (
//         <div className={clsx("TextEditor", classes?.textEditor)}>
//             <div className="TextEditor-Title">{title}</div>
//             <div
//                 tabIndex={0}
//                 className={clsx("TextEditor-Area", {
//                     // "TextEditor-Area__isFocused": isFocused,
//                     "TextEditor-Area__isInvalid": isInvalid,
//                 })}
//                 // onClick={() => {
//                 //     setIsFocused((prevState: boolean) =>
//                 //         prevState ? true : !prevState
//                 //     );
//                 // }}
//             >
//                 <div className="TextEditor-Sub">
//                     <BlockStyleControls
//                         editorState={editorState}
//                         onToggle={(blockType) => {
//                             const newState = RichUtils.toggleBlockType(
//                                 editorState,
//                                 blockType
//                             );
//                             setEditorState(newState);
//                         }}
//                     />
//                     <InlineStyleControls
//                         editorState={editorState}
//                         onToggle={(inlineStyle) => {
//                             const newState = RichUtils.toggleInlineStyle(
//                                 editorState,
//                                 inlineStyle
//                             );
//                             setEditorState(newState);
//                         }}
//                     />
//                 </div>
//                 <div className={wrapperClassName}>
//                     <Editor
//                         ref={editorRef}
//                         blockStyleFn={getBlockStyle} //Вызывается для каждого блочного элемента и применяет ему стили
//                         customStyleMap={TEXT_EDITOR_CUSTOM_STYLES}
//                         editorState={editorState}
//                         // handleKeyCommand={handleKeyCommand}
//                         onChange={handleChangeText}
//                         // onBlur={handleChangeBlur}
//                         // onFocus={handleChangeFocus}
//                         // placeholder={placeholder}
//                         // preserveSelectionOnBlur={true}
//                     />
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default TextEditor;
