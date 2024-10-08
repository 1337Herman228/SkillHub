"use client";

interface HoverModalOpenBtnProps {
    children: React.ReactNode;
    btnRef: any;
    stateSetter: (state: boolean) => void;
    className?: string;
}

const HoverModalOpenBtn = ({
    children,
    btnRef,
    stateSetter,
    className,
}: HoverModalOpenBtnProps) => {
    return (
        <button
            ref={btnRef}
            onMouseOver={(e: React.MouseEvent<HTMLButtonElement>) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                    stateSetter(true);
                }
            }}
            onTouchStart={(e: any) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                    stateSetter(true);
                }
            }}
            onMouseOut={(e: React.MouseEvent<HTMLButtonElement>) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                    stateSetter(false);
                }
            }}
            onTouchEnd={(e: any) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                    stateSetter(false);
                }
            }}
            className={className}
            type="button"
        >
            {children}
        </button>
    );
};

export default HoverModalOpenBtn;
