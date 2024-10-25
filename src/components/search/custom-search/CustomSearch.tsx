import React, { useEffect, useState } from "react";
import "./CustomSearch.scss";

interface CustomSearchProps {
    placeholder?: string;
    style?: React.CSSProperties;
    state: string;
    setStateFunc: (state: string) => void;
}

const CustomSearch = ({
    state = "",
    setStateFunc,
    style,
    placeholder = "Поиск...",
}: CustomSearchProps) => {
    const [inputValue, setInputValue] = useState(state);
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValue(value);

        // Clear the previous timeout if it exists
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        // Set a new timeout
        const id = setTimeout(() => {
            setStateFunc(value);
        }, 300); // Задержка

        setTimeoutId(id);
    };

    useEffect(() => {
        // Clean up the timeout on unmount
        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [timeoutId]);

    return (
        <div className="custom-search">
            <img
                className="custom-search__image"
                loading="lazy"
                alt=""
                src="/svg/search.svg"
                width={20}
                height={20}
            />
            <input
                onChange={handleChange}
                style={style}
                value={inputValue}
                className="custom-search__input"
                placeholder={placeholder}
            />
        </div>
    );
};

export default CustomSearch;
