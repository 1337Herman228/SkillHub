import "./TextLesson.scss";
import DOMPurify from "dompurify";
import parse from "html-react-parser";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";

interface TextLessonProps {
    title: string;
    html: string;
}

const TextLesson = ({ html, title }: TextLessonProps) => {
    const isMobileDevice = useMediaQuery({ query: "(max-width: 768px)" });

    const [isMobileViewModalOpen, setIsMobileViewModalOpen] = useState(false);

    const clean = DOMPurify.sanitize(html);

    return (
        <div className="text-lesson-container">
            <div className="text-lesson html-block">
                {isMobileDevice ? (
                    <>
                        <div className="mobile-lesson-stub">
                            <h1 className="mobile-lesson-title">{title}</h1>
                            <button
                                onClick={() => setIsMobileViewModalOpen(true)}
                                className="purple-button"
                            >
                                Открыть
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <h1 className="text-lesson-title">{title}</h1>
                        <div>{parse(clean)}</div>
                    </>
                )}
            </div>
            {isMobileDevice && (
                <div
                    className={`mobile-view-modal ${
                        isMobileViewModalOpen ? "open" : ""
                    }`}
                >
                    <div className="modal-close">
                        <button
                            onClick={() => setIsMobileViewModalOpen(false)}
                            className="close-btn"
                        >
                            <img
                                className="close-icon"
                                src="/svg/close.svg"
                                alt="close"
                                width={25}
                                height={25}
                                loading="lazy"
                            />
                        </button>
                    </div>
                    <div className="html-block">
                        <h1 className="text-lesson-title">{title}</h1>
                        <div>{parse(clean)}</div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TextLesson;
