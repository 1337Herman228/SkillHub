"use client";

import "./Resources.scss";
import {
    FieldArrayWithId,
    FieldValues,
    UseFieldArrayAppend,
    UseFieldArrayRemove,
    UseFormRegister,
} from "react-hook-form";
import { IVideoLessonFormFields } from "@/components/forms/create-lesson-form/video-lesson-form/VideoLessonForm";

interface ResourcesProps {
    register: UseFormRegister<FieldValues> | UseFormRegister<any>;
    fields: FieldArrayWithId<IVideoLessonFormFields, "resourcesNames", "id">[];
    append: UseFieldArrayAppend<IVideoLessonFormFields, "resourcesNames">;
    remove: UseFieldArrayRemove;

    linksFields: FieldArrayWithId<
        IVideoLessonFormFields,
        "resourcesLinks",
        "id"
    >[];
    linksAppend: UseFieldArrayAppend<IVideoLessonFormFields, "resourcesLinks">;
    linksRemove: UseFieldArrayRemove;
    errors: any; // Здесь можно указать правильный тип для ошибок
}

const Resources = ({
    fields,
    register,
    append,
    remove,
    linksRemove,
    errors,
}: ResourcesProps) => {
    const onRemove = (index: number) => {
        linksRemove(index);
        remove(index);
    };

    return (
        <div className="resources">
            <div className="resources__title">Ресурсы</div>
            <div className="resources-container">
                {fields.map((field, index) => (
                    <div className="resources-list" key={field.id}>
                        <div className="form-field">
                            <label
                                className="form-field__label"
                                htmlFor={`resourcesNames-title-${index}`}
                            >
                                <span className={`form-field__label-text`}>
                                    Название
                                </span>
                                <input
                                    className={`form-field__input ${
                                        errors.resourcesNames?.[index]?.value
                                            ? "error"
                                            : ""
                                    }`}
                                    id={`resourcesNames-title-${index}`}
                                    {...register(
                                        `resourcesNames.${index}.value`,
                                        {
                                            required: "Введите заголовок!",
                                        }
                                    )} // Обязательное поле
                                    defaultValue={field.value} // Значение по умолчанию
                                />
                                <p className="form-field__error">
                                    {errors.resourcesNames?.[index]?.value && (
                                        <span>
                                            {
                                                errors.resourcesNames[index]
                                                    .value.message
                                            }
                                        </span>
                                    )}
                                </p>
                            </label>
                        </div>

                        <div className="form-field">
                            <label
                                className="form-field__label"
                                htmlFor={`resourcesLinks-title-${index}`}
                            >
                                <span className={`form-field__label-text`}>
                                    Ссылка
                                </span>
                                <input
                                    className={`form-field__input ${
                                        errors.resourcesLinks?.[index]?.value
                                            ? "error"
                                            : ""
                                    }`}
                                    id={`resourcesLinks-title-${index}`}
                                    {...register(
                                        `resourcesLinks.${index}.value`,
                                        {
                                            required: "Введите ссылку!",
                                        }
                                    )} // Обязательное поле
                                    defaultValue={field.value} // Значение по умолчанию
                                />
                                <p className="form-field__error">
                                    {errors.resourcesLinks?.[index]?.value && (
                                        <span>
                                            {
                                                errors.resourcesLinks[index]
                                                    .value.message
                                            }
                                        </span>
                                    )}
                                </p>
                            </label>
                        </div>

                        <button
                            className="manage-resources-btn resources-list__remove-btn"
                            type="button"
                            onClick={() => onRemove(index)}
                        >
                            <img
                                className=""
                                src="/svg/minus-icon.svg"
                                alt="delete"
                                width={14}
                                height={5}
                            />
                        </button>
                    </div>
                ))}
                <button
                    className="manage-resources-btn"
                    type="button"
                    onClick={() => append({ value: "" })}
                >
                    <img
                        className=""
                        src="/svg/plus.svg"
                        alt="delete"
                        width={16}
                        height={16}
                    />
                </button>
            </div>
        </div>
    );
};

export default Resources;
