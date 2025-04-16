"use client";

import "@/styles/style.scss";
import { MySessionProvider } from "@/components/providers/SessionProvider";
import StoreProvider from "@/components/providers/StoreProvider";
import Navbar from "@/components/navbars/user-navbar/Navbar";
import Footer from "@/components/footers/user-footer/Footer";
import AntdConfigProvider from "@/components/providers/AntdConfigProvider";
import GetSession from "@/components/providers/GetSessionProvider";
import { usePathname } from "next/navigation";
import DoubleNavbar from "@/components/navbars/course-navbar/DoubleNavbar";
import { INavLink } from "@/interfaces/types";

const courseNavLinks: INavLink[] = [
    {
        id: "lessons",
        href: "/lessons",
        name: "Материалы курса",
    },
    {
        id: "edit-course",
        href: "/edit",
        name: "Редактировать курс",
    },
    {
        id: "has-access",
        href: "/has-access",
        name: "Имеют доступ",
    },
    {
        id: "request-access",
        href: "/request-access",
        name: "Запрашивают доступ",
    },
];

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const pathname = usePathname();
    const comparePathname = /\/admin\/courses\/\d+\/?.*/;

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
                                {pathname?.match(comparePathname) ? (
                                    <DoubleNavbar
                                        isCourseNavbar
                                        isAdminNavbar
                                        secondNavLinks={courseNavLinks}
                                    />
                                ) : (
                                    <Navbar role="admin" />
                                )}
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
