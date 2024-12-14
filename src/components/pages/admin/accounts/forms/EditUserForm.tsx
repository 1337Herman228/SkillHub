"use client";

import DropdownList, { IOption } from "@/components/dropdowns/DropdownList";
import CustomInput from "@/components/inputs/custom-input/CustomInput";
import { IRole, IUser } from "@/interfaces/types";
import useFetch from "@/lib/hooks/useFetch";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export interface IEditUserFormFields {
    login: string;
    name: string;
    surname: string;
    email: string;
}

interface EditUserFormProps {
    user: IUser;
    MyNotification: Function;
    fetchUsers: () => void;
    onCancel: () => void;
}

const EditUserForm = ({
    user,
    MyNotification,
    fetchUsers,
    onCancel,
}: EditUserFormProps) => {
    const [roles, setRoles] = useState<IRole[]>([]);
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [selectedRole, setSelectedRole] = useState<string | null>(null);
    const [defaultRole, setDefaultRole] = useState<IOption | null | undefined>(
        null
    );

    const { getAllRoles, editUser, isLoading } = useFetch();

    useEffect(() => {
        fetchRoles();
    }, []);

    useEffect(() => {
        if (roles.length > 0) {
            const rolesOptions = roles.map((role) => ({
                value: String(role.roleId),
                name: role.position,
            }));

            setDefaultRole(
                rolesOptions.find(
                    (item) => item.value == String(user.role?.roleId)
                )
            );
        }
    }, [roles]);

    useEffect(() => {
        setDefaultRole(null);
        setTimeout(() => {
            setDefaultRole(
                rolesOptions.find(
                    (item) => item.value == String(user.role?.roleId)
                )
            );
        }, 4);
    }, [user]);

    const fetchRoles = async () => {
        const roles: IRole[] = await getAllRoles();
        setRoles(roles);
    };

    const {
        unregister,
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<IEditUserFormFields>({
        defaultValues: {
            login: user.login,
            name: user.person?.name,
            surname: user.person?.surname,
            email: user.person?.email,
        },
    });

    useEffect(() => {
        if (isLoading || !roles) return;
        reset({
            login: user.login,
            name: user.person?.name,
            surname: user.person?.surname,
            email: user.person?.email,
        });
    }, [user, reset]);

    const formSubmit = async (data: IEditUserFormFields) => {
        if (selectedRole) {
            const response = await editUser(
                data,
                selectedRole,
                String(user.userId)
            );

            if (response === "OK") {
                fetchUsers();
                onCancel();
                setTimeout(() => {
                    MyNotification(
                        "success",
                        "Успешно!",
                        "Учетная запись успешно изменена!"
                    );
                }, 200);
            } else {
                MyNotification("error", "Ошибка!", "Что-то пошло не так...");
            }
        }
    };

    const rolesOptions = roles.map((role) => ({
        value: String(role.roleId),
        name: role.position,
    }));

    if (isLoading || !roles) return null;

    return (
        <div className="edit-user-form-container">
            <h2
                style={{
                    fontSize: "28px",
                    fontWeight: "700",
                    marginBottom: "20px",
                }}
            >
                Редактирование учетной записи
            </h2>
            <form
                onSubmit={handleSubmit((data) => formSubmit(data))}
                className="create-lesson-form form"
            >
                {defaultRole && (
                    <DropdownList
                        setStateFunc={setSelectedRole}
                        placeholder="Выберите роль"
                        labelText="Роль"
                        name="role"
                        options={rolesOptions}
                        isError={!selectedRole && isFormSubmitted}
                        defaultValue={defaultRole}
                    />
                )}
                <CustomInput
                    labelText="Логин"
                    name="login"
                    minLength={3}
                    register={register}
                    unregister={unregister}
                    errors={errors}
                    showMarks={false}
                    defaultValue={user.login}
                />
                <CustomInput
                    labelText="Имя"
                    name="name"
                    minLength={3}
                    register={register}
                    unregister={unregister}
                    errors={errors}
                    showMarks={false}
                    defaultValue={user.person?.name}
                />
                <CustomInput
                    labelText="Фамилия"
                    name="surname"
                    minLength={3}
                    register={register}
                    unregister={unregister}
                    errors={errors}
                    showMarks={false}
                    defaultValue={user.person?.surname}
                />
                <CustomInput
                    labelText="Email"
                    name="email"
                    minLength={3}
                    register={register}
                    unregister={unregister}
                    errors={errors}
                    type="email"
                    showMarks={false}
                    defaultValue={user.person?.email}
                />

                <input
                    onClick={() => setIsFormSubmitted(true)}
                    className="submit-btn black-submit-button"
                    type="submit"
                    value={"Подтвердить изменения"}
                />
            </form>
        </div>
    );
};

export default EditUserForm;
