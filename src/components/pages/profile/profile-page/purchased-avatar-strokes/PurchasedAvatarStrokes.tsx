"use client";

import AvatarStroke from "@/components/avatar-stroke/AvatarStroke";
import Spinner from "@/components/spinners/spinner/Spinner";
import { IAvatarStroke } from "@/interfaces/types";
import useFetch from "@/lib/hooks/useFetch";
import { useEffect, useState } from "react";
import "./PurchasedAvatarStrokes.scss";
import Image from "next/image";

const PurchasedAvatarStrokes = () => {
    const {
        getUserPurchasedAvatarStrokes,
        changeUserAvatarStroke,
        getAndDispatchUser,
        removeUserAvatarStroke,
    } = useFetch();

    const [purchasedAvatarStrokes, setPurchasedAvatarStrokes] = useState<
        IAvatarStroke[] | null
    >(null);

    const fetchData = async () => {
        const data = await getUserPurchasedAvatarStrokes();
        setPurchasedAvatarStrokes(data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSelectAvatarStroke = async (avatarStrokeId: number) => {
        await changeUserAvatarStroke(avatarStrokeId);
        getAndDispatchUser();
    };

    const handlRemoveAvatarStroke = async () => {
        await removeUserAvatarStroke();
        getAndDispatchUser();
    };

    if (!purchasedAvatarStrokes)
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
        <section className="purchased-avatar-strokes-container form-container-profile">
            <div className="purchased-avatar-strokes-catalog">
                {purchasedAvatarStrokes.length > 0 && (
                    <>
                        <div className="purchased-avatar-strokes-card">
                            <button
                                onClick={() => handlRemoveAvatarStroke()}
                                className="purchased-avatar-strokes-card__choose-btn"
                            >
                                <Image
                                    alt="remove avatar stroke"
                                    src="/svg/close.svg"
                                    width={50}
                                    height={50}
                                />
                            </button>
                        </div>

                        {purchasedAvatarStrokes.map((avatarStroke) => (
                            <AvatarStrokeCard
                                key={avatarStroke.avatarStrokeId}
                                avatarStroke={avatarStroke}
                                selectStroke={handleSelectAvatarStroke}
                            />
                        ))}
                    </>
                )}
            </div>
            {purchasedAvatarStrokes?.length === 0 && (
                <div className="purchased-avatar-strokes-catalog-empty">
                    <h2>Тут пусто!</h2>
                    <div>Вы еще не купили ни одного аватара</div>
                </div>
            )}
        </section>
    );
};

interface AvatarStrokeCardProps {
    avatarStroke: IAvatarStroke;
    selectStroke: (avatarStrokeId: number) => void;
}

const AvatarStrokeCard = ({
    avatarStroke,
    selectStroke,
}: AvatarStrokeCardProps) => {
    return (
        <div className="purchased-avatar-strokes-card">
            <button
                onClick={() => selectStroke(avatarStroke.avatarStrokeId)}
                className="purchased-avatar-strokes-card__choose-btn"
            >
                <AvatarStroke size={100} frameSrc={avatarStroke?.url}>
                    <div className="purchased-avatar-strokes-card__img-mockup"></div>
                </AvatarStroke>
            </button>
        </div>
    );
};

export default PurchasedAvatarStrokes;
