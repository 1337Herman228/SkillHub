"use client";

import { ExtendedSession } from "@/pages/api/auth/[...nextauth]";
import { useSession } from "next-auth/react";
import { useAppDispatch } from "../redux/store/store";
import useHttp from "./useHttp";
import { setUser } from "../redux/slices/userSlice";
import { setCourseState } from "../redux/slices/courseSlice";
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

    const getAndDispatchCourse = async (courseId: number) => {
        if (token) {
            const courseData = await requestJson(
                token,
                `http://localhost:8080/user/get-course-info/${courseId}`
            );
            dispatch(setCourseState(courseData));
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

    const addNewCourse = async (
        data: FieldValues,
        dropdownValue: string,
        htmlText: string,
        imgLink: string
    ) => {
        if (token) {
            const response = await requestJson(
                token,
                `http://localhost:8080/teacher/add-new-course`,
                "POST",
                JSON.stringify({
                    authorId: user?.userId,
                    topic: data.topic,
                    skillLevel: dropdownValue,
                    courseImg: imgLink,
                    courseName: data.courseName,
                    shortDescription: data.shortDescription,
                    longDescription: htmlText,
                })
            );
            return response;
        }
    };

    const getTeacherCourses = async () => {
        if (token) {
            const coursesData = await requestJson(
                token,
                `http://localhost:8080/teacher/get-teacher-courses/${user?.userId}`,
                "GET"
            );
            return coursesData;
        }
    };

    const fetchRequestAccess = async (courseId: number) => {
        if (token) {
            await requestJson(
                token,
                `http://localhost:8080/user/request-access`,
                "POST",
                JSON.stringify({
                    userId: user?.userId,
                    courseId: courseId,
                })
            );
        }
    };

    const getTeacherCoursesByName = async (searchtext: string) => {
        if (token) {
            const coursesData = await requestJson(
                token,
                `http://localhost:8080/teacher/find-teacher-courses-by-name`,
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
        getTeacherCoursesByName,
        getUserInterestCourses,
        getAndDispatchCourse,
        getAndDispatchUser,
        fetchRequestAccess,
        getTeacherCourses,
        getCoursesByName,
        putProfileInfo,
        getAllCourses,
        addNewCourse,
        putAvatar,
        isLoading,
        error,
    };
};

export default useFetch;
