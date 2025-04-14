"use client";

import useFetch from "@/lib/hooks/useFetch";
import DiamondShopHeading from "../heading/DiamondShopHeading";
import { useEffect, useState } from "react";
import { IAvatarStroke, NotificationType } from "@/interfaces/types";
import Spinner from "@/components/spinners/spinner/Spinner";
import DiamondShopCatalogCard from "../common/DiamondShopCatalogCard";
import "./AvatarStrokeCatalogPage.scss";
import Image from "next/image";
import { notification } from "antd";

const AvatarStrokeCatalogPage = () => {
    const [api, contextHolder] = notification.useNotification();

    const MyNotification = (
        type: NotificationType,
        message: string,
        description: string
    ) => {
        api[type]({
            message: message,
            description: description,
        });
    };

    const {
        getAvatarStrokesCatalog,
        getUserPurchasedAvatarStrokes,
        buyAvatarStroke,
        getAndDispatchUser,
    } = useFetch();

    const [avatarStrokesCatalog, setAvatarStrokesCatalog] = useState<
        IAvatarStroke[] | null
    >(null);

    const [purchasedAvatarStrokes, setPurchasedAvatarStrokes] = useState<
        IAvatarStroke[] | null
    >(null);

    const fetchData = async () => {
        const data = await getAvatarStrokesCatalog();
        setAvatarStrokesCatalog(data);

        await fetchPurchasedData();
    };

    const fetchPurchasedData = async () => {
        const userData = await getUserPurchasedAvatarStrokes();
        setPurchasedAvatarStrokes(userData);
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (!avatarStrokesCatalog || !purchasedAvatarStrokes)
        return (
            <div
                style={{
                    display: "grid",
                    placeItems: "center",
                    width: "100%",
                    height: "700px",
                }}
            >
                <Spinner />
            </div>
        );

    const handleBuyAvatarStroke = async (avatarStrokeId: number | string) => {
        try {
            await buyAvatarStroke(avatarStrokeId);
            await fetchPurchasedData();
            await getAndDispatchUser();
            MyNotification("success", "Успешно", "Товар успешно приобретен!");
        } catch (e) {
            MyNotification("error", "Ошибка", "Не удалось приобрести товар!");
        }
    };

    return (
        <section className="container section-medium">
            {contextHolder}
            <DiamondShopHeading />
            <div className="diamond-shop-avatar-strokes-catalog">
                {avatarStrokesCatalog.map((item) => (
                    <DiamondShopCatalogCard
                        id={item.avatarStrokeId}
                        key={item.avatarStrokeId}
                        title={item.label}
                        category="Рамка аватара"
                        price={item.price}
                        onBuySubmit={handleBuyAvatarStroke}
                        isPurchased={purchasedAvatarStrokes.some(
                            (el) => item.avatarStrokeId === el.avatarStrokeId
                        )}
                    >
                        <Image
                            src={`/avatar-strokes/${item.url}`}
                            alt={item.label}
                            width={100}
                            height={100}
                            style={{ objectFit: "contain", marginBottom: 20 }}
                        />
                    </DiamondShopCatalogCard>
                ))}
            </div>
        </section>
    );
};

export default AvatarStrokeCatalogPage;
