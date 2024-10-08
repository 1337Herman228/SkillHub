import "./HoverModal.scss";

interface HoverModalProps {
    children: React.ReactNode;
    isOpen: boolean;
    setStateFunc: (state: boolean) => void;
    openBtnRef: any;
}

const HoverModal = ({
    children,
    isOpen,
    setStateFunc,
    openBtnRef,
}: HoverModalProps) => {
    return (
        <div
            className={`hover-modal-container ${isOpen ? "visible" : "hidden"}`}
            onMouseOut={(e: React.MouseEvent<HTMLDivElement>) => {
                if (
                    !e.currentTarget.contains(e.relatedTarget as Node) &&
                    !openBtnRef.current.contains(e.relatedTarget as Node)
                ) {
                    setStateFunc(false);
                }
            }}
            onTouchEnd={(e: any) => {
                if (
                    !e.currentTarget.contains(e.relatedTarget as Node) &&
                    !openBtnRef.current.contains(e.relatedTarget as Node)
                ) {
                    setStateFunc(false);
                }
            }}
        >
            <div className={`hover-modal `}>{children}</div>
        </div>
    );
};

export default HoverModal;
