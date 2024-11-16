import { ConfigProvider } from "antd";
import React from "react";

const AntdConfigProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <ConfigProvider
            theme={{
                components: {
                    Notification: {
                        zIndexPopup: 10000,
                        colorBgElevated: "var(--white)",
                        colorText: "var(--light-black)",
                        colorTextHeading: "var(--light-black)",
                        colorIcon: "var(--light-black)",
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
