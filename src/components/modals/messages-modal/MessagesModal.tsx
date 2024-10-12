import HoverModal from "../hover-modal/HoverModal";
import "./MessagesModal.scss";
import { MutableRefObject } from "react";

interface ProfileModalProps {
    openBtnRef: MutableRefObject<HTMLButtonElement | null>;
    isOpen: boolean;
    setStateFunc: (state: boolean) => void;
}

const messages = null;

const MessagesModal = ({
    isOpen,
    setStateFunc,
    openBtnRef,
}: ProfileModalProps) => {
    return (
        <HoverModal
            openBtnRef={openBtnRef}
            isOpen={isOpen}
            setStateFunc={setStateFunc}
        >
            <div className="messages-modal">
                <div className="messages-modal__title">Уведомления</div>
                <div
                    className={`messages-modal__content ${
                        messages ? "" : "empty"
                    }`}
                >
                    {!messages ? (
                        <span className="">Уведомлений нет</span>
                    ) : null}
                </div>
            </div>
        </HoverModal>
    );
};

export default MessagesModal;
