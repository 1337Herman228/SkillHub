import { FieldValues, UseFormRegister } from "react-hook-form";
import "./TextArea.scss";

interface TextAreaProps {
    name: string;
    labelText: string;
    require?: boolean;
    register: UseFormRegister<FieldValues>;
    errors: any;
    defaultValue?: string;
    minLength?: number;
}

const TextArea = ({
    defaultValue = "",
    name,
    labelText,
    require = false,
    register,
    errors,
    minLength = 10,
}: TextAreaProps) => {
    const requiredMessage = "Введите " + labelText.toLowerCase();
    const minLengthMessage =
        "Минимум " +
        minLength +
        (minLength % 10 == 1
            ? " символ"
            : minLength % 10 == 2 || minLength % 10 == 3 || minLength % 10 == 4
            ? " символа"
            : " символов");

    return (
        <div>
            <label className="textarea-label" htmlFor={name}>
                <span
                    className={`textarea-label__text ${require && "require"}`}
                >
                    {labelText}
                </span>
            </label>
            <textarea
                rows={5}
                defaultValue={defaultValue}
                className={`textarea ${errors[name]?.message ? "error" : ""}`}
                id={name}
                {...register(name, {
                    required: requiredMessage,
                    minLength: {
                        value: minLength,
                        message: minLengthMessage,
                    },
                })}
            />
            <p className="textarea-error">{errors[name]?.message}</p>
        </div>
    );
};

export default TextArea;
