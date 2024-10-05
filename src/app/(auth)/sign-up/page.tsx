"use client";

import SignUpPage from "@/components/pages/auth/sign-up/SignUpPage";
import { MySessionProvider } from "@/components/providers/SessionProvider";

export default function Page() {
    return (
        <MySessionProvider>
            <SignUpPage />
        </MySessionProvider>
    );
}
