"use client";

import FullScreenSpinner from "@/components/spinners/full-screen-spinner/FullScreenSpinner";
import Spinner from "@/components/spinners/spinner/Spinner";
import useHttp from "@/lib/hooks/useHttp";
import { ExtendedSession } from "@/pages/api/auth/[...nextauth]";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const MainPage = () => {
    const { requestJson, error, isLoading } = useHttp();

    const { data: session, status } = useSession();
    const sessionData: ExtendedSession | null = session;
    const token = sessionData?.user?.authenticationResponse?.token;

    const [user, setUser] = useState();

    // useEffect(() => {
    //     fetchUser();
    // }, [session]);

    const fetchUser = async () => {
        if (token && sessionData?.user?.userId) {
            console.log("fetchUser");
            console.log("token", token);
            const userData = await requestJson(
                token,
                `http://localhost:8080/user/get-user/${sessionData?.user?.userId}`
            );
            setUser(userData);
        }
    };

    console.log(sessionData);

    if (status === "loading") {
        return <FullScreenSpinner />;
    }

    console.log("user", user);

    return <div>Main</div>;
};

export default MainPage;
