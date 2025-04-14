import { Modal } from "antd";
import "./DiamondShopCatalogCard.scss";
import { Gem } from "lucide-react";
import { useState } from "react";
import { useAppSelector } from "@/lib/redux/store/store";

interface DiamondShopCatalogCardProps {
    id: number | string;
    category: string;
    title: string;
    price: number;
    children: React.ReactNode;
    isPurchased?: boolean;
    onBuySubmit: (id: number | string) => void;
}

const DiamondShopCatalogCard = ({
    id,
    title,
    price,
    children,
    isPurchased,
    onBuySubmit,
}: DiamondShopCatalogCardProps) => {
    const user = useAppSelector((state) => state.user.user);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        !isPurchased && setIsModalOpen(true);
    };

    const isEnoughDiamonds = user?.diamonds && user?.diamonds >= price;

    return (
        <div className="diamond-shop-catalog-card">
            <button
                onClick={handleOpenModal}
                className={`diamond-shop-catalog-card__button ${
                    isPurchased && "purchased"
                }`}
            >
                <div className="diamond-shop-catalog-card__title">
                    <div
                        className={`name-and-price ${
                            isPurchased && "purchased"
                        }`}
                    >
                        {title} : {price} <Gem strokeWidth={1.6} size={23} />
                    </div>
                </div>
                <div className="preview-container">{children}</div>
                <div className="was-purchased">{isPurchased && "Куплено"}</div>
            </button>

            <Modal
                styles={{
                    content: {
                        borderRadius: 0,
                        border: "var(--border-black)",
                        boxShadow: "0 0 0 0",
                        padding: "35px 35px 40px 35px",
                        minWidth: "600px",
                    },
                    mask: {
                        backdropFilter: "blur(2px)",
                    },
                }}
                zIndex={7000}
                centered
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={
                    isEnoughDiamonds && (
                        <div
                            className="modal-footer"
                            style={{
                                display: "flex",
                                gap: 5,
                                justifyContent: "flex-end",
                            }}
                        >
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="black-submit-button"
                            >
                                Отмена
                            </button>
                            <button
                                onClick={() => {
                                    onBuySubmit(id);
                                    setIsModalOpen(false);
                                }}
                                className="black-submit-button diamond-shop-buy-btn"
                            >
                                Купить
                            </button>
                        </div>
                    )
                }
            >
                {isEnoughDiamonds ? (
                    <>
                        <div className="diamond-shop-buy-modal-title">
                            Приобрести данный товар за {price}{" "}
                            <Gem
                                strokeWidth={2}
                                size={20}
                                style={{ flexShrink: 0 }}
                            />{" "}
                            ?
                        </div>
                        <div className="diamond-shop-buy-modal-title-description">
                            Данный товар будет куплен и надет. Найти его вы
                            сможете в своем профиле.
                        </div>
                    </>
                ) : (
                    <div>
                        <div className="diamond-shop-buy-modal-title">
                            Недостаточно алмазов для покупки данного товара!
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default DiamondShopCatalogCard;
