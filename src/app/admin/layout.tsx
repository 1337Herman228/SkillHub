"use client";

import "@/styles/style.scss";
import { MySessionProvider } from "@/components/providers/SessionProvider";
import StoreProvider from "@/components/providers/StoreProvider";
import Navbar from "@/components/navbars/user-navbar/Navbar";
import Footer from "@/components/footers/user-footer/Footer";

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
                        <Navbar role="admin" />
                        {children}
                        <Footer role="admin" />
                    </MySessionProvider>
                </StoreProvider>
            </body>
        </html>
    );
}
