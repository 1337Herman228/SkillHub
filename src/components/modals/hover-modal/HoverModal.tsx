import { useEffect, useRef, useState } from "react";
import "./HoverModal.scss";

interface HoverModalProps {
    children: React.ReactNode;
    isOpen: boolean;
    setStateFunc: (state: boolean) => void;
    openBtnRef: any;
    style?: React.CSSProperties;
}

const HoverModal = ({
    children,
    isOpen,
    setStateFunc,
    openBtnRef,
    style,
}: HoverModalProps) => {
    const elementRef = useRef<HTMLDivElement>(null);

    const checkVisibility = () => {
        if (elementRef.current) {
            const rect = elementRef.current.getBoundingClientRect();

            const isOutLeft = rect.left < 0;
            const isOutRight = rect.right > window.innerWidth;
            const isOutTop = rect.top < 0;
            const isOutBottom = rect.bottom > window.innerHeight;

            if (isOutLeft) elementRef.current.classList.add("left-out");
            if (isOutRight) elementRef.current.classList.add("right-out");
            if (isOutTop) elementRef.current.classList.add("top-out");
            if (isOutBottom) elementRef.current.classList.add("bottom-out");
        }
    };

    useEffect(() => {
        checkVisibility();
    }, [isOpen]);

    return (
        <div
            style={style}
            ref={elementRef}
            className={`hover-modal-container ${isOpen ? "visible" : "hidden"}`}
            onMouseOut={(e: React.MouseEvent<HTMLDivElement>) => {
                if (
                    !e.currentTarget.contains(e.relatedTarget as Node) &&
                    !openBtnRef.current.contains(e.relatedTarget as Node)
                ) {
                    setStateFunc(false);
                    checkVisibility();
                }
            }}
            onTouchEnd={(e: any) => {
                if (
                    !e.currentTarget.contains(e.relatedTarget as Node) &&
                    !openBtnRef.current.contains(e.relatedTarget as Node)
                ) {
                    setStateFunc(false);
                    checkVisibility();
                }
            }}
        >
            <div className={`hover-modal`}>{children}</div>
        </div>
    );
};

export default HoverModal;
