import Spinner from "@/components/spinners/spinner/Spinner";
import { INicknameColor } from "@/interfaces/types";
import useFetch from "@/lib/hooks/useFetch";
import { useAppSelector } from "@/lib/redux/store/store";
import Image from "next/image";
import React from "react";
import "./PurchasedNicknameColors.scss";

const PurchasedNicknameColors = () => {
    const user = useAppSelector((state) => state.user.user);

    const {
        changeUserNicknameColor,
        getAndDispatchUser,
        removeUserNicknameColor,
    } = useFetch();

    const handleSelectNicknameColor = async (avatarStrokeId: number) => {
        await changeUserNicknameColor(avatarStrokeId);
        getAndDispatchUser();
    };

    const handlRemoveNicknameColor = async () => {
        await removeUserNicknameColor();
        getAndDispatchUser();
    };

    if (!user)
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

    return (
        <section className="purchased-nickname-colors-container form-container-profile">
            <div className="purchased-nickname-colors-catalog">
                {user?.purchasedNicknameColors &&
                    user?.purchasedNicknameColors?.length > 0 && (
                        <>
                            <div className="purchased-nickname-colors-card">
                                <button
                                    onClick={() => handlRemoveNicknameColor()}
                                    className="purchased-nickname-colors-card__choose-btn"
                                >
                                    <Image
                                        alt="remove nickname color"
                                        src="/svg/close.svg"
                                        width={25}
                                        height={25}
                                    />
                                </button>
                            </div>

                            {user?.purchasedNicknameColors.map(
                                (nicknameColor) => (
                                    <NicknameColorCard
                                        key={nicknameColor.nicknameColorId}
                                        nicknameColor={nicknameColor}
                                        selectNicknameColor={
                                            handleSelectNicknameColor
                                        }
                                    />
                                )
                            )}
                        </>
                    )}
            </div>
            {user?.purchasedNicknameColors?.length === 0 && (
                <div className="purchased-nickname-colors-catalog-empty">
                    <h2>Тут пусто!</h2>
                    <div>Вы еще не купили ни одного цвета для никнейма</div>
                </div>
            )}
        </section>
    );
};

interface NicknameColorCardProps {
    nicknameColor: INicknameColor;
    selectNicknameColor: (id: number) => void;
}

const NicknameColorCard = ({
    nicknameColor,
    selectNicknameColor,
}: NicknameColorCardProps) => {
    return (
        <div className="purchased-nickname-colors-card">
            <button
                onClick={() =>
                    selectNicknameColor(nicknameColor.nicknameColorId)
                }
                className="purchased-nickname-colors-card__choose-btn"
            >
                <div
                    className="purchased-nickname-colors-card__content"
                    style={JSON.parse(
                        nicknameColor?.color || `{"color":"var(--light-black)"}`
                    )}
                >
                    {nicknameColor.name}
                </div>
            </button>
        </div>
    );
};

export default PurchasedNicknameColors;
