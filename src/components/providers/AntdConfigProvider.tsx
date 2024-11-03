import { ConfigProvider } from "antd";
import React from "react";

const AntdConfigProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <ConfigProvider
            theme={{
                components: {
                    Notification: {
                        zIndexPopup: 10000,
                        colorBgElevated: "#212121",
                        colorText: "var(--white)",
                        colorTextHeading: "var(--white)",
                        colorIcon: "var(--white)",
                        colorIconHover: "gray",
                    },
                },
            }}
        >
            {children}
        </ConfigProvider>
    );
};

export default AntdConfigProvider;
