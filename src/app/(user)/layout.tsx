"use client";

import "@/styles/style.scss";
import UserNavbar from "@/components/navbars/user-navbar/UserNavbar";
import { MySessionProvider } from "@/components/providers/SessionProvider";
import StoreProvider from "@/components/providers/StoreProvider";
import UserFooter from "@/components/footers/user-footer/UserFooter";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <title>SkillHub</title>
            </head>
            <body>
                <StoreProvider>
                    <MySessionProvider>
                        <UserNavbar />
                        {children}
                        <UserFooter />
                    </MySessionProvider>
                </StoreProvider>
            </body>
        </html>
    );
}
