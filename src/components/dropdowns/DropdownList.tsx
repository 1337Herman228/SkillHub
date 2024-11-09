"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import "./DropdownList.scss";

export interface IOption {
    value: string;
    name: string;
}

interface DropdownListProps {
    name: string;
    labelText: string;
    placeholder: string;
    options: IOption[];
    defaultValue?: IOption | null;
    setStateFunc: (state: string) => void;
    isError?: boolean;
    extraOption?: React.ReactNode;
    disabled?: boolean;
}

const DropdownList = ({
    name,
    labelText,
    placeholder,
    options,
    setStateFunc,
    defaultValue = null,
    isError,
    extraOption,
    disabled = false,
}: DropdownListProps) => {
    const requiredMessage = "Введите " + labelText.toLowerCase();

    const containerRef = useRef<HTMLDivElement>(null);

    const [selectedOption, setSelectedOption] = useState<IOption | null>(
        defaultValue ? defaultValue : null
    );
    const [isOpen, setIsOpen] = useState(false);
    const [inputText, setInputText] = useState<string>(
        defaultValue ? defaultValue.name : ""
    );

    const onceRef = useRef(true);
    useEffect(() => {
        if (defaultValue && onceRef.current) {
            setInputText(defaultValue.name);
            setSelectedOption(defaultValue);
            onceRef.current = false;
        }
    }, [defaultValue]);

    const inputTextRef = useRef(inputText);
    const selectedOptionRef = useRef(selectedOption);

    const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(null);
        setInputText(e.target.value);
    };

    //Функция закрытия списка, при нажатии вне него
    const onOpenDropdown = useCallback(
        (e: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(e.target as Node)
            ) {
                setIsOpen(false);

                //Условие, если ввод не совпал с возможным существующим вариантом, то очистить поле ввода
                if (
                    selectedOptionRef.current?.name != inputTextRef.current &&
                    !options.find(
                        (option) => option.name === inputTextRef.current
                    )
                ) {
                    setInputText("");
                    setSelectedOption(null);
                    // trigger(name);
                    // setValue(name, selectedOption?.value);
                }
            } else {
                setIsOpen(true);
            }
        },
        [inputText, selectedOption]
    );

    //Выбор из списка
    const onSelectOption = (option: IOption) => {
        setSelectedOption(option);
        setIsOpen(false);
        setInputText(option.name);
    };

    useEffect(() => {
        //Рефы нужны, чтобы хранить состояние для функции слушателя onOpenDropdown(так как просто state она не видит)
        inputTextRef.current = inputText;
        selectedOptionRef.current = selectedOption;
    }, [inputText, selectedOption]);

    useEffect(() => {
        // Добавляем обработчик события клика
        document.addEventListener("mousedown", onOpenDropdown);

        // Удаляем обработчик при размонтировании компонента
        return () => {
            document.removeEventListener("mousedown", onOpenDropdown);
        };
    }, []);

    //Для подстановки в input при выборе из списка
    useEffect(() => {
        if (selectedOption?.name === inputText) {
            setInputText(selectedOption.name);
        }
    }, [selectedOption]);

    //Для подстановки в input при ручном вводе
    useEffect(() => {
        const option = options.find((option) => option.name === inputText);
        if (option) {
            setSelectedOption(option);
        }
    }, [inputText]);

    useEffect(() => {
        setStateFunc(selectedOption?.value ?? "");
    }, [selectedOption]);

    //Фильтрация по вводу
    const filterOptions = () => {
        if (selectedOption?.name === inputText) {
            return options.filter((option) =>
                option.name.toLowerCase().includes("")
            );
        } else {
            return options.filter((option) =>
                option.name.toLowerCase().includes(inputText.toLowerCase())
            );
        }
    };

    const onRemove = () => {
        selectedOptionRef.current = null;
        inputTextRef.current = "";
        setSelectedOption(null);
        setInputText("");
    };

    return (
        <div className={`dropdown ${disabled && "disabled"}`}>
            <label className="dropdown__label" htmlFor={name}>
                <span className={`label-text`}>{labelText}</span>
            </label>
            <div ref={containerRef}>
                <div className="dropdown__input-wrapper">
                    <input
                        onFocus={() => setIsOpen(true)}
                        onChange={handleOnchange}
                        className={`dropdown__input ${isError ? "error" : ""}`}
                        id={name}
                        type="text"
                        placeholder={
                            selectedOption ? selectedOption.name : placeholder
                        }
                        value={inputText}
                    />
                    {inputText && selectedOption ? (
                        <button onClick={onRemove} className="delete-value-btn">
                            <img
                                alt=""
                                src={`/svg/close.svg`}
                                width={12}
                                height={12}
                            />
                        </button>
                    ) : null}

                    <img
                        className={`dropdown__arrow ${
                            isOpen ? "open" : "close"
                        }`}
                        alt=""
                        src={`/svg/dropdown-arrow-top.svg`}
                        width={13}
                        height={8}
                    />
                    {/* Скрытый инпут, в который подставляется value, а не отоборажаемое name */}
                    <input
                        className="visually-hidden"
                        value={selectedOption?.value && ""}
                    />
                    <ul
                        className={`dropdown-list ${isOpen ? "open" : "close"}`}
                    >
                        {filterOptions().length === 0 ? (
                            <li tabIndex={0} className="option not-found">
                                Ничего не найдено...
                            </li>
                        ) : (
                            filterOptions().map((option) => (
                                <li
                                    tabIndex={0}
                                    className={`dropdown-list__option option ${
                                        selectedOption?.value === option.value
                                            ? "selected"
                                            : ""
                                    }`}
                                    key={option.value}
                                    onClick={() => onSelectOption(option)}
                                >
                                    {option.name}
                                </li>
                            ))
                        )}
                        {extraOption && <>{extraOption}</>}
                    </ul>
                </div>
            </div>
            {isError && <p className="dropdown-error">{requiredMessage}</p>}
        </div>
    );
};

export default DropdownList;
