"use client";

import "@/styles/style.scss";
import { MySessionProvider } from "@/components/providers/SessionProvider";
import StoreProvider from "@/components/providers/StoreProvider";
import Navbar from "@/components/navbars/user-navbar/Navbar";
import Footer from "@/components/footers/user-footer/Footer";
import { useParams } from "next/navigation";
import DoubleNavbar from "@/components/navbars/course-navbar/DoubleNavbar";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const params = useParams();
    const isCourseOpen = params?.["course-id"];

    return (
        <html lang="en">
            <head>
                <title>SkillHub</title>
            </head>
            <body>
                <StoreProvider>
                    <MySessionProvider>
                        {isCourseOpen ? (
                            <DoubleNavbar isUserNavbar isCourseNavbar />
                        ) : (
                            <Navbar role="user" />
                        )}
                        {children}
                        <Footer role="user" />
                    </MySessionProvider>
                </StoreProvider>
            </body>
        </html>
    );
}
