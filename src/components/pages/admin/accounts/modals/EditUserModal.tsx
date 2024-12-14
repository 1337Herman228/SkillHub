import { IUser } from "@/interfaces/types";
import { Modal } from "antd";
import EditUserForm from "../forms/EditUserForm";

interface EditUserModalProps {
    open: boolean;
    onCancel: () => void;
    user: IUser | null;
    MyNotification: Function;
    fetchUsers: () => void;
}

const EditUserModal = ({
    open,
    onCancel,
    user,
    MyNotification,
    fetchUsers,
}: EditUserModalProps) => {
    return (
        user && (
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
                open={open}
                onCancel={onCancel}
                footer={null}
            >
                <EditUserForm
                    fetchUsers={fetchUsers}
                    MyNotification={MyNotification}
                    user={user}
                    onCancel={onCancel}
                />
            </Modal>
        )
    );
};

export default EditUserModal;
