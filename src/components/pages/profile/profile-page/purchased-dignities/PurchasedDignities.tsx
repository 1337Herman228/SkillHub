import useFetch from "@/lib/hooks/useFetch";
import "./PurchasedDignities.scss";
import { useAppSelector } from "@/lib/redux/store/store";
import Spinner from "@/components/spinners/spinner/Spinner";
import { IDignity } from "@/interfaces/types";
import Image from "next/image";

const PurchasedDignities = () => {
    const user = useAppSelector((state) => state.user.user);

    const { changeUserDignity, removeUserDignity, getAndDispatchUser } =
        useFetch();

    const handleSelectDignity = async (avatarStrokeId: number) => {
        await changeUserDignity(avatarStrokeId);
        getAndDispatchUser();
    };

    const handlRemoveDignity = async () => {
        await removeUserDignity();
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
        <section className="purchased-dignities-container form-container-profile">
            <div className="purchased-dignities-catalog">
                {user?.purchasedDignities &&
                    user?.purchasedDignities?.length > 0 && (
                        <>
                            <div className="purchased-dignities-card">
                                <button
                                    onClick={() => handlRemoveDignity()}
                                    className="purchased-dignities-card__choose-btn"
                                >
                                    <Image
                                        alt="remove dignity"
                                        src="/svg/close.svg"
                                        width={25}
                                        height={25}
                                    />
                                </button>
                            </div>

                            {user?.purchasedDignities.map((dignity) => (
                                <DignityCard
                                    key={dignity.dignityId}
                                    dignity={dignity}
                                    selectDignity={handleSelectDignity}
                                />
                            ))}
                        </>
                    )}
            </div>

            {user?.purchasedDignities?.length === 0 && (
                <div className="purchased-dignities-catalog-empty">
                    <h2>Тут пусто!</h2>
                    <div>Вы еще не купили ни одного титула</div>
                </div>
            )}
        </section>
    );
};

interface DignityCardProps {
    dignity: IDignity;
    selectDignity: (dignityId: number) => void;
}

const DignityCard = ({ dignity, selectDignity }: DignityCardProps) => {
    return (
        <div className="purchased-dignities-card">
            <button
                onClick={() => selectDignity(dignity.dignityId)}
                className="purchased-dignities-card__choose-btn"
            >
                <div className="purchased-dignities-card__content">
                    {dignity.dignityName}
                </div>
            </button>
        </div>
    );
};

export default PurchasedDignities;
