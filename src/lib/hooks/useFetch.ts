"use client";

import { ExtendedSession } from "@/pages/api/auth/[...nextauth]";
import { useSession } from "next-auth/react";
import { useAppDispatch } from "../redux/store/store";
import useHttp from "./useHttp";
import { setUser } from "../redux/slices/userSlice";
import { FieldValues } from "react-hook-form";
import { IUser } from "@/interfaces/types";

const useFetch = () => {
    const { requestJson, isLoading, error } = useHttp();
    const dispatch = useAppDispatch();

    const { data: session, status } = useSession();
    const sessionData: ExtendedSession | null = session;
    const token = sessionData?.user?.authenticationResponse?.token;

    const getAndDispatchUser = async () => {
        if (token) {
            const userData = await requestJson(
                token,
                `http://localhost:8080/user/get-user/${sessionData?.user?.userId}`
            );
            dispatch(setUser(userData));
        }
    };

    const putProfileInfo = async (data: FieldValues, user: IUser) => {
        if (token) {
            await requestJson(
                token,
                `http://localhost:8080/user/edit-profile-info`,
                "PUT",
                JSON.stringify({
                    ...data,
                    userId: user?.userId,
                })
            );
        }
    };

    const putAvatar = async (imgLink: string | null, user: IUser) => {
        if (token && user) {
            await requestJson(
                token,
                `http://localhost:8080/user/edit-profile-photo`,
                "PUT",
                JSON.stringify({ userId: user?.userId, imgLink: imgLink })
            );
        }
    };

    const addBecomeTeacherRequest = async (data: FieldValues, user: IUser) => {
        if (token) {
            const response = await requestJson(
                token,
                `http://localhost:8080/user/add-teacher-request`,
                "POST",
                JSON.stringify({ ...data, userId: user?.userId })
            );
            return response;
        }
    };

    const changeUserPasswordRequest = async (
        data: FieldValues,
        user: IUser
    ) => {
        if (token) {
            const response = await requestJson(
                token,
                `http://localhost:8080/user/change-user-password`,
                "PUT",
                JSON.stringify({
                    newPassword: data.newPassword,
                    oldPassword: data.oldPassword,
                    userId: user?.userId,
                })
            );
            return response;
        }
    };

    return {
        changeUserPasswordRequest,
        addBecomeTeacherRequest,
        getAndDispatchUser,
        putProfileInfo,
        putAvatar,
        isLoading,
        error,
    };
};

export default useFetch;
