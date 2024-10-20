"use client";

import { useState } from "react";
import "./CustomInput.scss";
import { FieldValues, UseFormRegister } from "react-hook-form";
import Image from "next/image";

interface CustomInputProps {
    name: string;
    type?: string;
    labelText: string;
    minLength?: number;
    onlyLettersAndDigits?: boolean;
    onlyPositiveDigits?: boolean;
    require?: boolean;
    register: UseFormRegister<FieldValues>;
    errors: any;
    defaultValue?: string;
}

const CustomInput = ({
    name,
    type = "text",
    labelText,
    minLength = 3,
    onlyLettersAndDigits = false,
    onlyPositiveDigits = false,
    require = false,
    register,
    errors,
    defaultValue = "",
}: CustomInputProps) => {
    const [isShow, setIsShow] = useState(type === "password" ? false : null);

    const requiredMessage = "Введите " + labelText.toLowerCase();
    const minLengthMessage =
        "Минимум " +
        minLength +
        (minLength % 10 == 1
            ? " символ"
            : minLength % 10 == 2 || minLength % 10 == 3 || minLength % 10 == 4
            ? " символа"
            : " символов");

    const lettersAndDigitsPattern = {
        value: /^[a-zA-Zа-яА-Я0-9]+$/,
        message: "Только буквы и цифры",
    };

    const onlyPositiveDigitsPattern = {
        value: /^[0-9.]+$/,
        message: "Только положительные цифры",
    };

    const ShowPasswordButton = () => {
        return (
            <button
                className="form-field__label-password-show-btn"
                onClick={() => setIsShow(!isShow)}
            >
                {isShow ? (
                    <Image
                        className="cart-list__item-img"
                        src="/svg/Eye-slash.svg"
                        alt=""
                        width={25}
                        height={25}
                    />
                ) : (
                    <Image
                        className="cart-list__item-img"
                        src="/svg/Eye.svg"
                        alt=""
                        width={25}
                        height={25}
                    />
                )}
            </button>
        );
    };

    const CorrectMark = () => {
        return (
            <Image
                className="correct-mark"
                src="/svg/correct-mark.svg"
                alt=""
                width={20}
                height={20}
            />
        );
    };

    const ErrorMark = () => {
        return (
            <Image
                className="error-mark"
                src="/svg/error-mark.svg"
                alt=""
                width={16}
                height={16}
            />
        );
    };

    return (
        <div className="form-field">
            <label className="form-field__label" htmlFor={name}>
                <span
                    className={`form-field__label-text ${require && "require"}`}
                >
                    {labelText}
                </span>
            </label>
            <div
                className={`input-wrapper ${
                    type === "password"
                        ? "no-mark"
                        : errors[name]?.message
                        ? "error"
                        : ""
                }`}
            >
                <input
                    defaultValue={defaultValue}
                    className={`form-field__input ${
                        errors[name]?.message ? "error" : ""
                    }`}
                    type={type === "password" && isShow ? "text" : type}
                    id={name}
                    // name={name}
                    {...register(name, {
                        pattern: onlyLettersAndDigits
                            ? lettersAndDigitsPattern
                            : onlyPositiveDigits
                            ? onlyPositiveDigitsPattern
                            : undefined,
                        required: requiredMessage,
                        minLength: {
                            value: minLength,
                            message: minLengthMessage,
                        },
                    })}
                />
                {type === "password" && <ShowPasswordButton />}
                {type === "password" ? null : errors[name]?.message ? (
                    <ErrorMark />
                ) : (
                    <CorrectMark />
                )}
            </div>
            <p className="form-field__error">{errors[name]?.message}</p>
        </div>
    );
};

export default CustomInput;
