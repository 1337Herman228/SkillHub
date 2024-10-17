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
    const user = sessionData?.user;

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

    const getAllCourses = async () => {
        if (token) {
            const allCoursesData = await requestJson(
                token,
                `http://localhost:8080/user/get-all-courses-for-user/${sessionData?.user?.userId}`
            );
            return allCoursesData;
        }
    };

    const getCoursesByName = async (searchtext: string, user: IUser) => {
        if (token) {
            const coursesData = await requestJson(
                token,
                `http://localhost:8080/user/find-courses-by-name-for-user`,
                "POST",
                JSON.stringify({ courseName: searchtext, userId: user.userId })
            );
            return coursesData;
        }
    };

    const getUserInterestCourses = async () => {
        if (token) {
            const userInterestCoursesData = await requestJson(
                token,
                `http://localhost:8080/user/get-user-interest-courses/${sessionData?.user?.userId}`
            );
            return userInterestCoursesData;
        }
    };

    const getUserInterestCoursesByName = async (searchtext: string) => {
        if (token) {
            const coursesData = await requestJson(
                token,
                `http://localhost:8080/user/find-user-interest-courses-by-name`,
                "POST",
                JSON.stringify({ courseName: searchtext, userId: user?.userId })
            );
            return coursesData;
        }
    };

    return {
        getUserInterestCoursesByName,
        changeUserPasswordRequest,
        addBecomeTeacherRequest,
        getUserInterestCourses,
        getAndDispatchUser,
        getCoursesByName,
        putProfileInfo,
        getAllCourses,
        putAvatar,
        isLoading,
        error,
    };
};

export default useFetch;
