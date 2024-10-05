"use client";

import MainPage from "@/components/pages/main-page/MainPage";
import { MySessionProvider } from "@/components/providers/SessionProvider";

export default function Home() {
    return (
        <MySessionProvider>
            <MainPage />
        </MySessionProvider>
    );
}
