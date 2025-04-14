"use client";

import Spinner from "@/components/spinners/spinner/Spinner";
import { INicknameColor, NotificationType } from "@/interfaces/types";
import useFetch from "@/lib/hooks/useFetch";
import { useAppSelector } from "@/lib/redux/store/store";
import { notification } from "antd";
import { useEffect, useState } from "react";
import DiamondShopHeading from "../heading/DiamondShopHeading";
import DiamondShopCatalogCard from "../common/DiamondShopCatalogCard";
import "./NicknameColorsCatalogPage.scss";

const NicknameColorsCatalogPage = () => {
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

    const user = useAppSelector((state) => state.user.user);

    const { getNicknameColorsCatalog, buyNicknameColor, getAndDispatchUser } =
        useFetch();

    const [nicknameColorsCatalog, setNicknameColorsCatalog] = useState<
        INicknameColor[] | null
    >(null);

    const fetchData = async () => {
        const data = await getNicknameColorsCatalog();
        setNicknameColorsCatalog(data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (!nicknameColorsCatalog || !user)
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

    const handleBuy = async (id: number | string) => {
        try {
            await buyNicknameColor(id);
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
            <div className="diamond-shop-nickname-colors-catalog">
                {nicknameColorsCatalog.map((item) => (
                    <DiamondShopCatalogCard
                        id={item.nicknameColorId}
                        key={item.nicknameColorId}
                        title={item.name}
                        category="Цвет никнейма"
                        price={item.price}
                        onBuySubmit={handleBuy}
                        isPurchased={
                            user?.purchasedNicknameColors &&
                            user.purchasedNicknameColors.some(
                                (el) =>
                                    item.nicknameColorId === el.nicknameColorId
                            )
                        }
                    >
                        <div
                            className="card-content"
                            style={JSON.parse(item.color)}
                        >
                            {item.name}
                        </div>
                    </DiamondShopCatalogCard>
                ))}
            </div>
        </section>
    );
};

export default NicknameColorsCatalogPage;
