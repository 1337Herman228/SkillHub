import type { Metadata } from "next";
import "@/styles/style.scss";

export const metadata: Metadata = {
    title: "Authorization",
    description: "Authorization",
};

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
