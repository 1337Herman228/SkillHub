"use client";

import "@/styles/style.scss";
import { MySessionProvider } from "@/components/providers/SessionProvider";
import StoreProvider from "@/components/providers/StoreProvider";
import Navbar from "@/components/navbars/user-navbar/Navbar";
import Footer from "@/components/footers/user-footer/Footer";
import { usePathname } from "next/navigation";
import DoubleNavbar from "@/components/navbars/course-navbar/DoubleNavbar";
import { INavLink } from "@/interfaces/types";
import AntdConfigProvider from "@/components/providers/AntdConfigProvider";
import GetSession from "@/components/providers/GetSessionProvider";

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

interface RootLayoutProps {
    children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
    const pathname = usePathname();
    const comparePathname = /\/teacher\/my-courses\/\d+\/?.*/;

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
                                        secondNavLinks={courseNavLinks}
                                    />
                                ) : (
                                    <Navbar role="teacher" />
                                )}
                                {children}
                                <Footer role="teacher" />
                            </AntdConfigProvider>
                        </GetSession>
                    </body>
                </MySessionProvider>
            </StoreProvider>
        </html>
    );
}
