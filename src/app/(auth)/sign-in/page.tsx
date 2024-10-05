"use client";

import SignInPage from "@/components/pages/auth/sign-in/SignInPage";
import { MySessionProvider } from "@/components/providers/SessionProvider";

export default function Page() {
    return (
        <MySessionProvider>
            <SignInPage />
        </MySessionProvider>
    );
}
