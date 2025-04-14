"use client";

import Spinner from "@/components/spinners/spinner/Spinner";
import { IDignity, NotificationType } from "@/interfaces/types";
import useFetch from "@/lib/hooks/useFetch";
import { useAppSelector } from "@/lib/redux/store/store";
import { notification } from "antd";
import { useEffect, useState } from "react";
import DiamondShopHeading from "../heading/DiamondShopHeading";
import DiamondShopCatalogCard from "../common/DiamondShopCatalogCard";
import "./DignityCatalogPage.scss";

const DignityCatalogPage = () => {
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

    const { getDignitiesCatalog, buyDignity, getAndDispatchUser } = useFetch();

    const [dignitiesCatalog, setDignitiesCatalog] = useState<IDignity[] | null>(
        null
    );

    const fetchData = async () => {
        const data = await getDignitiesCatalog();
        setDignitiesCatalog(data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (!dignitiesCatalog || !user)
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
            await buyDignity(id);
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
            <div className="diamond-shop-dignities-catalog">
                {dignitiesCatalog.map((item) => (
                    <DiamondShopCatalogCard
                        id={item.dignityId}
                        key={item.dignityId}
                        title={item.dignityName}
                        category="Титул"
                        price={item.price}
                        onBuySubmit={handleBuy}
                        isPurchased={
                            user?.purchasedDignities &&
                            user.purchasedDignities.some(
                                (el) => item.dignityId === el.dignityId
                            )
                        }
                    >
                        <div className="card-content">{item.dignityName}</div>
                    </DiamondShopCatalogCard>
                ))}
            </div>
        </section>
    );
};

export default DignityCatalogPage;
