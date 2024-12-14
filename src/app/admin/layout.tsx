"use client";

import "@/styles/style.scss";
import { MySessionProvider } from "@/components/providers/SessionProvider";
import StoreProvider from "@/components/providers/StoreProvider";
import Navbar from "@/components/navbars/user-navbar/Navbar";
import Footer from "@/components/footers/user-footer/Footer";
import AntdConfigProvider from "@/components/providers/AntdConfigProvider";
import GetSession from "@/components/providers/GetSessionProvider";

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
            <StoreProvider>
                <MySessionProvider>
                    <body>
                        <GetSession>
                            <AntdConfigProvider>
                                <Navbar role="admin" />
                                {children}
                                <Footer role="admin" />
                            </AntdConfigProvider>
                        </GetSession>
                    </body>
                </MySessionProvider>
            </StoreProvider>
        </html>
    );
}
