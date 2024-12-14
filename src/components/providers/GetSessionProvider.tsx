import { ExtendedSession } from "@/pages/api/auth/[...nextauth]";
import { useSession } from "next-auth/react";
import MemoizedProvider from "./MemoizedProvider";
import { useMemo } from "react";

const GetSession = ({ children }: { children: React.ReactNode }) => {
    const { data: session } = useSession();
    const sessionData: ExtendedSession | null = session;

    const memoizedSession = useMemo(
        () => sessionData,
        [sessionData?.user?.authenticationResponse?.token]
    );

    if (!memoizedSession) return null;

    return (
        <MemoizedProvider session={memoizedSession}>
            {children}
        </MemoizedProvider>
    );
};

export default GetSession;
