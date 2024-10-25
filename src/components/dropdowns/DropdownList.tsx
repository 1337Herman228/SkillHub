"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import "./DropdownList.scss";
import { FieldValues, UseFormRegister } from "react-hook-form";

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

    // setValue: (name: string, value: any) => void;
    // trigger: (name: string) => Promise<boolean>;
    // reset: () => void;
    // register: UseFormRegister<FieldValues>;
    // errors: any;
}

const DropdownList = ({
    name,
    labelText,
    placeholder,
    options,
    setStateFunc,
    defaultValue = null,
    isError,
}: // setValue,
// trigger,
// reset,
// register,
// errors,
DropdownListProps) => {
    const requiredMessage = "Введите " + labelText.toLowerCase();

    const containerRef = useRef<HTMLDivElement>(null);

    const [selectedOption, setSelectedOption] = useState<IOption | null>(
        defaultValue ? defaultValue : null
    );
    const [isOpen, setIsOpen] = useState(false);
    const [inputText, setInputText] = useState<string>(
        defaultValue ? defaultValue.name : ""
    );

    const inputTextRef = useRef(inputText);
    const selectedOptionRef = useRef(selectedOption);

    const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(null);
        setInputText(e.target.value);
        // trigger(name);
        // setValue(name, selectedOption?.value);
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
        // trigger(name);
        // setValue(name, selectedOption?.value); // Устанавливаем значение в react-hook-form
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
            // trigger(name);
            // setValue(name, selectedOption?.value);
        }
    }, [selectedOption]);

    //Для подстановки в input при ручном вводе
    useEffect(() => {
        const option = options.find((option) => option.name === inputText);
        if (option) {
            setSelectedOption(option);
            // trigger(name);
            // setValue(name, selectedOption?.value); // Устанавливаем значение в react-hook-form
        }
    }, [inputText]);

    useEffect(() => {
        setStateFunc(selectedOption?.value ?? "");
    }, [selectedOption]);

    // useEffect(() => {
    //     if (selectedOption) {
    //         setValue(name, selectedOption.value);
    //         // trigger(name);
    //     }
    // }, [selectedOption, name]);

    // useEffect(() => {
    //     if (selectedOption) {
    //         setValue(name, selectedOption?.value);
    //     }
    // }, [selectedOption, name]);

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

    return (
        <div className="dropdown">
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
                        // defaultValue={defaultValue?.name && ""}
                        value={inputText}
                    />
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
                        // defaultValue={defaultValue?.value && ""}
                        value={selectedOption?.value && ""}
                        // {...register(name, {
                        //     required: requiredMessage,
                        // })}
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
                                    className="dropdown-list__option option"
                                    key={option.value}
                                    onClick={() => onSelectOption(option)}
                                >
                                    {option.name}
                                </li>
                            ))
                        )}
                    </ul>
                </div>
            </div>
            {isError && <p className="dropdown-error">{requiredMessage}</p>}
        </div>
    );
};

export default DropdownList;
