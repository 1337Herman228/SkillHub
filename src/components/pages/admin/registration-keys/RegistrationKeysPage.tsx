"use client";

import CustomSearch from "@/components/search/custom-search/CustomSearch";
import Spinner from "@/components/spinners/spinner/Spinner";
import StubWithBtn from "@/components/stubs/stub-with-btn/StubWithBtn";
import { IRegKey } from "@/interfaces/types";
import useFetch from "@/lib/hooks/useFetch";
import { useEffect, useState } from "react";
import "./RegistrationKeysPage.scss";

const RegistrationKeysPage = () => {
    const [registrationKeys, setRegistrationKeys] = useState<IRegKey[]>([]);
    const [searchText, setSearchText] = useState("");
    const [email, setEmail] = useState("");

    const {
        addRegistrationKey,
        deleteRegistrationKey,
        getAllRegistrationKeys,
        getRegistrationKeysByEmail,
        isLoading,
    } = useFetch();

    const onDeletekey = async (id: number) => {
        await deleteRegistrationKey(id);
        fetchAllKeys();
    };

    const onAddkey = async (email: string) => {
        const response = await addRegistrationKey(email);
        console.log(response);
        if (response === "OK") {
            fetchAllKeys();
        } else {
            console.error(response);
        }
    };

    const fetchAllKeys = async () => {
        const keys = await getAllRegistrationKeys();
        setRegistrationKeys(keys);
    };

    const fetchKeysByEmail = async (email: string) => {
        const keys = await getRegistrationKeysByEmail(email);
        setRegistrationKeys(keys);
    };

    useEffect(() => {
        fetchAllKeys();
    }, []);

    useEffect(() => {
        if (searchText === "") fetchAllKeys();
        else fetchKeysByEmail(searchText);
    }, [searchText]);

    const loading = !registrationKeys || isLoading;

    return (
        <div className="reg-keys-page container-reduced-medium">
            <section className="reg-keys section-medium">
                <div className="reg-keys__dashboard">
                    <div className="dashboard-text">
                        <h1 className="dashboard-text__title title">
                            Реферальные ключи
                        </h1>
                        <div className="dashboard-text__description title-description">
                            Электронные почты с реферальными ключами для
                            регистрации пользователей
                        </div>
                    </div>
                    <div className="dashboard-search">
                        <CustomSearch
                            state={searchText}
                            setStateFunc={setSearchText}
                            style={{ width: "100%" }}
                        />
                    </div>
                </div>
                <div className="reg-keys__add">
                    <div className="reg-keys__add-title title">
                        Добавить новый реферальный ключ:
                    </div>
                    <input
                        className="reg-keys__add-input"
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                        type="text"
                        placeholder="Email"
                    />
                    <button
                        className="reg-keys__add-btn purple-button"
                        onClick={() => onAddkey(email)}
                    >
                        Добавить
                    </button>
                </div>
                {loading ? (
                    <div className="reg-keys__loading">
                        <Spinner size="70px" />
                    </div>
                ) : (
                    <>
                        {registrationKeys?.length > 0 ? (
                            <div className="reg-keys__content">
                                {registrationKeys.map((regkey) => (
                                    <div className="reg-keys-item">
                                        <div className="reg-keys-item__email">
                                            {regkey.email}
                                        </div>
                                        <div className="reg-keys-item__ref-key">
                                            {regkey.regKey}
                                        </div>
                                        <div className="reg-keys-item__delete">
                                            <button
                                                onClick={() =>
                                                    onDeletekey(regkey.regKeyId)
                                                }
                                                className="delete-btn "
                                            >
                                                <img
                                                    className=""
                                                    src="/svg/close.svg"
                                                    alt="reject"
                                                    width={16}
                                                    height={16}
                                                />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="reg-keys__not-found">
                                <StubWithBtn
                                    btnType="none"
                                    title="Тут пусто!"
                                    description="Реферальные ключи для регистрации отсутсвуют"
                                />
                            </div>
                        )}
                    </>
                )}
            </section>
        </div>
    );
};

export default RegistrationKeysPage;
