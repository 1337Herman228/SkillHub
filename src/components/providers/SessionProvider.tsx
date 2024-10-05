import { SessionProvider } from "next-auth/react";

export const MySessionProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return <SessionProvider>{children}</SessionProvider>;
};
