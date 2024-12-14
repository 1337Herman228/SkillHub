"use client";

import React, { useEffect, useRef, useState } from "react";
import {
    DeleteOutlined,
    EditOutlined,
    SearchOutlined,
} from "@ant-design/icons";
import type { InputRef, TableColumnsType, TableColumnType } from "antd";
import {
    Avatar,
    Button,
    ConfigProvider,
    Input,
    Modal,
    notification,
    Space,
    Table,
} from "antd";
import type { FilterDropdownProps } from "antd/es/table/interface";
import useFetch from "@/lib/hooks/useFetch";
import { IUser, NotificationType } from "@/interfaces/types";
import Spinner from "@/components/spinners/spinner/Spinner";
import "./AccountsPage.scss";
import EditUserModal from "./modals/EditUserModal";

interface DataTypeUser {
    key: string;
    avatar: string;
    login: string;
    email: string;
    name: string;
    role: string;
    diamonds: number;
}

type DataIndex = keyof DataTypeUser;

const mapUsersToDataType = (users: IUser[]): DataTypeUser[] => {
    return users.map(
        (user) =>
            ({
                key: user?.userId?.toString(),
                avatar: user.person?.avatarImg,
                login: user.login,
                email: user.person?.email,
                name: user.person?.name + " " + user.person?.surname,
                role: mapRole(user?.role?.position as string),
                diamonds: user.diamonds,
            } as DataTypeUser)
    );
};

const mapRole = (role: string) => {
    switch (role) {
        case "user":
            return "Сотрудник";
        case "teacher":
            return "Преподаватель";
        case "admin":
            return "Администратор";
    }
};

const AccountsPage = () => {
    const [api, contextHolder] = notification.useNotification();

    const MyNotification = (
        type: NotificationType,
        message: string,
        description: string
    ) => {
        api[type]({
            message: message,
            description: description,
        });
    };

    const [isEditModalOpen, setEditIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteIsModalOpen] = useState(false);
    const [editUser, setEditUser] = useState<IUser | null>(null);
    const [userToDelete, setUserToDelete] = useState<IUser | null>(null);
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const [users, setUsers] = useState<IUser[]>([]);

    const searchInput = useRef<InputRef>(null);

    const showEditModal = (userId: number) => {
        const user = users.find((user) => user.userId == userId);
        if (user) setEditUser(user);
        setEditIsModalOpen(true);
    };
    const handleEditModalCancel = () => {
        setEditIsModalOpen(false);
    };

    const showDeleteModal = (userId: number) => {
        const user = users.find((user) => user.userId == userId);
        if (user) setUserToDelete(user);
        setDeleteIsModalOpen(true);
    };
    const handleDeleteModalCancel = () => {
        setDeleteIsModalOpen(false);
    };

    const { getAllUsers, isLoading, deleteUser } = useFetch();

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDeleteUser = async (userId: number) => {
        const response = await deleteUser(userId);
        if (response === "OK") {
            handleDeleteModalCancel();
            fetchUsers();
            setTimeout(() => {
                MyNotification("success", "Успешно!", "Пользователь удален!");
            }, 200);
        } else {
            MyNotification(
                "error",
                "Ошибка",
                "Что-то пошло не так при удалении пользователя..."
            );
        }
    };

    const fetchUsers = async () => {
        const users = await getAllUsers();
        setUsers(users);
    };

    const handleSearch = (
        selectedKeys: string[],
        confirm: FilterDropdownProps["confirm"],
        dataIndex: DataIndex
    ) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters: () => void) => {
        clearFilters();
        setSearchText("");
    };
    const getColumnSearchProps = (
        dataIndex: DataIndex
    ): TableColumnType<DataTypeUser> => ({
        filterDropdown: ({
            setSelectedKeys,
            selectedKeys,
            confirm,
            clearFilters,
        }) => {
            const handleOpen = () => {
                setTimeout(() => searchInput.current?.select(), 100);
            };

            return (
                <div
                    style={{ padding: 8 }}
                    onKeyDown={(e) => e.stopPropagation()}
                >
                    <Input
                        ref={searchInput}
                        placeholder={`Search ${dataIndex}`}
                        value={selectedKeys[0]}
                        onChange={(e) =>
                            setSelectedKeys(
                                e.target.value ? [e.target.value] : []
                            )
                        }
                        onPressEnter={() =>
                            handleSearch(
                                selectedKeys as string[],
                                confirm,
                                dataIndex
                            )
                        }
                        style={{ marginBottom: 8, display: "block" }}
                        onFocus={handleOpen}
                    />
                    <Space>
                        <Button
                            type="primary"
                            onClick={() =>
                                handleSearch(
                                    selectedKeys as string[],
                                    confirm,
                                    dataIndex
                                )
                            }
                            icon={<SearchOutlined />}
                            size="small"
                            style={{ width: 90 }}
                        >
                            Search
                        </Button>
                        <Button
                            onClick={() =>
                                clearFilters && handleReset(clearFilters)
                            }
                            size="small"
                            style={{ width: 90 }}
                        >
                            Reset
                        </Button>
                    </Space>
                </div>
            );
        },

        filterIcon: (filtered: boolean) => (
            <SearchOutlined
                style={{ color: filtered ? "var(--purple)" : undefined }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes((value as string).toLowerCase()),

        render: (text) => text,
    });

    const usersColumns: TableColumnsType<DataTypeUser> = [
        {
            title: "",
            dataIndex: "avatar",
            key: "avatar",
            width: "50px",
            render: (avatar) => (
                <Avatar
                    src={
                        avatar ? "/upload-images/" + avatar : "/svg/profile.svg"
                    }
                />
            ),
        },
        {
            title: "Login",
            dataIndex: "login",
            key: "login",
            ...getColumnSearchProps("login"),
            sorter: (a, b) => a.login.localeCompare(b.login),
            sortDirections: ["descend", "ascend"],
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            ...getColumnSearchProps("email"),
            sorter: (a, b) => a.email.localeCompare(b.email),
            sortDirections: ["descend", "ascend"],
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            ...getColumnSearchProps("name"),
            sorter: (a, b) => a.name.localeCompare(b.name),
            sortDirections: ["descend", "ascend"],
        },
        {
            title: "Role",
            dataIndex: "role",
            key: "role",
            ...getColumnSearchProps("role"),
            sorter: (a, b) => a.role.localeCompare(b.role),
            sortDirections: ["descend", "ascend"],
        },
        {
            title: "Diamonds",
            dataIndex: "diamonds",
            key: "diamonds",
            ...getColumnSearchProps("diamonds"),
            sorter: (a, b) => a.diamonds - b.diamonds,
            sortDirections: ["descend", "ascend"],
        },
        {
            title: "",
            dataIndex: "key",
            key: "delete",
            width: "30px",
            render: (id) => (
                <>
                    <button
                        onClick={() => showDeleteModal(id)}
                        key={id}
                        className="table-btn"
                    >
                        <DeleteOutlined />
                    </button>
                </>
            ),
        },
        {
            title: "",
            dataIndex: "key",
            key: "edit",
            width: "30px",
            render: (id) => (
                <>
                    <button
                        key={id}
                        onClick={() => showEditModal(id)}
                        className="table-btn"
                    >
                        <EditOutlined />
                    </button>
                </>
            ),
        },
    ];

    if (isLoading)
        return (
            <div className="accounts-loading">
                <Spinner size="50px" />
            </div>
        );

    return (
        <div className="container-reduced-medium">
            {contextHolder}
            <section className="section-medium">
                <ConfigProvider
                    theme={{
                        token: {
                            colorPrimary: "#a435f0",
                        },
                    }}
                >
                    <Table<DataTypeUser>
                        columns={usersColumns}
                        dataSource={mapUsersToDataType(users)}
                        pagination={{ showSizeChanger: true }}
                        style={{ width: "90vw" }}
                        scroll={{ x: "max-content" }}
                    />
                </ConfigProvider>
            </section>
            {/* Edit modal */}
            <EditUserModal
                fetchUsers={fetchUsers}
                MyNotification={MyNotification}
                open={isEditModalOpen}
                onCancel={handleEditModalCancel}
                user={editUser}
            />
            <Modal
                styles={{
                    content: {
                        borderRadius: 0,
                        border: "var(--border-black)",
                        boxShadow: "0 0 0 0",
                        padding: "35px 35px 40px 35px",
                        minWidth: "600px",
                    },
                    mask: {
                        backdropFilter: "blur(2px)",
                    },
                }}
                zIndex={7000}
                centered
                open={isDeleteModalOpen}
                onCancel={handleDeleteModalCancel}
                footer={
                    <div className="modal-footer">
                        <button
                            style={{ marginRight: "10px" }}
                            onClick={handleDeleteModalCancel}
                            className="black-submit-button"
                        >
                            Отмена
                        </button>
                        <button
                            onClick={() =>
                                handleDeleteUser(userToDelete?.userId as number)
                            }
                            className="red-button"
                        >
                            Удалить
                        </button>
                    </div>
                }
            >
                <div className="modal-title">
                    Вы действительно хотите удалить учетную запись?
                </div>
                <div className="modal-description">
                    Учетная запись пользователя {userToDelete?.person?.name}{" "}
                    {userToDelete?.person?.surname} будет удалена без
                    возможности восстановления.
                </div>
            </Modal>
        </div>
    );
};

export default AccountsPage;
