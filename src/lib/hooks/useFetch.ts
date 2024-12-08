"use client";

import { ExtendedSession } from "@/pages/api/auth/[...nextauth]";
import { useSession } from "next-auth/react";
import { useAppDispatch } from "../redux/store/store";
import useHttp from "./useHttp";
import { setUser } from "../redux/slices/userSlice";
import { setCourseState } from "../redux/slices/courseSlice";
import { FieldValues } from "react-hook-form";
import {
    IAddAnswer,
    IAddQuestion,
    IAddReview,
    INote,
    IReview,
    IUser,
} from "@/interfaces/types";
import { IVideoLessonFormFields } from "@/components/forms/create-lesson-form/video-lesson-form/VideoLessonForm";
import { ITextLessonFormFields } from "@/components/forms/create-lesson-form/text-lesson-form/TextLessonForm";
import { ITestLessonFormFields } from "@/components/forms/create-lesson-form/test-lesson-form/TestLessonForm";
import { ITestQuestions } from "@/components/test-form/TestForm";
import { setUserProgressState } from "../redux/slices/userProgressSlice";

const useFetch = () => {
    const { requestJson, isLoading, error } = useHttp();
    const dispatch = useAppDispatch();

    const { data: session } = useSession();
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

    const getLessonById = async (lessonId: number) => {
        if (token) {
            const lessonData = await requestJson(
                token,
                `http://localhost:8080/user/get-course-lesson/${lessonId}`
            );
            return lessonData;
        }
    };

    const getLessonPassedStatus = async (userId: number, lessonId: number) => {
        if (token) {
            const response = await requestJson(
                token,
                `http://localhost:8080/user/is-lesson-passed/${userId}/${lessonId}`
            );
            return response;
        }
    };

    const markLessonAsPassed = async (
        lessonId: number | string,
        courseId: number | string
    ) => {
        if (token) {
            const response = await requestJson(
                token,
                `http://localhost:8080/user/mark-lesson-as-passed`,
                "POST",
                JSON.stringify({
                    userId: user?.userId,
                    courseId: courseId,
                    lessonId: lessonId,
                })
            );
            return response;
        }
    };

    const markLessonAsUnpassed = async (userId: number, lessonId: number) => {
        if (token) {
            const response = await requestJson(
                token,
                `http://localhost:8080/user/mark-lesson-as-unpassed/${userId}/${lessonId}`,
                "DELETE"
            );
            return response;
        }
    };

    const removeUserAccess = async (userId: number, courseId: number) => {
        if (token) {
            const response = await requestJson(
                token,
                `http://localhost:8080/teacher/remove-user-access/${userId}/${courseId}`,
                "DELETE"
            );
            return response;
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

    const changeCourseCertificate = async (
        courseId: number,
        certificatePath: string
    ) => {
        if (token) {
            await requestJson(
                token,
                `http://localhost:8080/teacher/change-course-certificate`,
                "PUT",
                JSON.stringify({
                    courseId: courseId,
                    certificatePath: certificatePath,
                })
            );
        }
    };

    const deleteCourseCertificate = async (courseId: number) => {
        if (token) {
            await requestJson(
                token,
                `http://localhost:8080/teacher/delete-course-certificate/${courseId}`,
                "DELETE"
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

    const approveCourseAccess = async (accessId: number | string) => {
        if (token) {
            await requestJson(
                token,
                `http://localhost:8080/teacher/approve-course-access`,
                "PUT",
                JSON.stringify({ accessId: accessId })
            );
        }
    };

    const rejectCourseAccess = async (accessId: number | string) => {
        if (token) {
            await requestJson(
                token,
                `http://localhost:8080/teacher/reject-course-access`,
                "PUT",
                JSON.stringify({ accessId: accessId })
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

    const getAllCourseChapters = async (courseId: number) => {
        if (token) {
            const allCoursesChaptersData = await requestJson(
                token,
                `http://localhost:8080/user/get-all-course-chapters/${courseId}`
            );
            return allCoursesChaptersData;
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

    const getAndDispatchUserProgress = async (courseId: string | number) => {
        if (token) {
            const data = await requestJson(
                token,
                `http://localhost:8080/user/get-user-progress/${user?.userId}/${courseId}`
            );
            dispatch(setUserProgressState(data));
        }
    };

    const getQuestionsForLesson = async (lessonId: string | number) => {
        if (token) {
            const data = await requestJson(
                token,
                `http://localhost:8080/user/get-questions-for-lesson/${lessonId}`
            );
            return data;
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

    const addNewChapter = async (data: FieldValues, courseId: number) => {
        if (token) {
            const response = await requestJson(
                token,
                `http://localhost:8080/teacher/add-new-chapter`,
                "POST",
                JSON.stringify({
                    courseId: courseId,
                    chapterTitle: data.chapterTitle,
                })
            );
            return response;
        }
    };

    const addNewVideoLesson = async (
        data: IVideoLessonFormFields,
        chapterId: number,
        resources: any[],
        videoUrl: string
    ) => {
        if (token) {
            const response = await requestJson(
                token,
                `http://localhost:8080/teacher/add-new-video-lesson`,
                "POST",
                JSON.stringify({
                    chapterId: chapterId,
                    lessonTitle: data.lessonName,
                    lessonType: "VIDEO",
                    duration: data.duration,
                    diamondReward: data.diamondReward,
                    resources: resources,
                    videoUrl: videoUrl,
                })
            );
            return response;
        }
    };

    const addNewTextLesson = async (
        data: ITextLessonFormFields,
        chapterId: number,
        resources: any[],
        html: string
    ) => {
        if (token) {
            const response = await requestJson(
                token,
                `http://localhost:8080/teacher/add-new-text-lesson`,
                "POST",
                JSON.stringify({
                    chapterId: chapterId,
                    lessonTitle: data.lessonName,
                    lessonType: "TEXT",
                    duration: data.duration,
                    diamondReward: data.diamondReward,
                    resources: resources,
                    html: html,
                })
            );
            return response;
        }
    };

    const addNewTestLesson = async (
        data: ITestLessonFormFields,
        chapterId: number,
        resources: any[],
        questions: ITestQuestions[]
    ) => {
        if (token) {
            const response = await requestJson(
                token,
                `http://localhost:8080/teacher/add-new-test-lesson`,
                "POST",
                JSON.stringify({
                    chapterId: chapterId,
                    lessonTitle: data.lessonName,
                    lessonType: "TEST",
                    diamondReward: data.diamondReward,
                    resources: resources,
                    questions: questions.map((question) => {
                        return {
                            questionText: question.questionText,
                            correctAnswerId: question.correctAnswerId,
                            answers: question.testAnswers.map((answer) => {
                                return {
                                    answerId: answer.answerId,
                                    answerText: answer.answerText,
                                };
                            }),
                        };
                    }),
                })
            );
            return response;
        }
    };

    const editVideoLesson = async (
        data: IVideoLessonFormFields,
        lessonId: number,
        chapterId: number,
        resources: any[],
        videoUrl: string
    ) => {
        if (token) {
            const response = await requestJson(
                token,
                `http://localhost:8080/teacher/edit-video-lesson`,
                "PUT",
                JSON.stringify({
                    lessonId: lessonId,
                    chapterId: chapterId,
                    lessonTitle: data.lessonName,
                    lessonType: "VIDEO",
                    duration: data.duration,
                    diamondReward: data.diamondReward,
                    resources: resources,
                    videoUrl: videoUrl,
                })
            );
            return response;
        }
    };

    const editTextLesson = async (
        data: ITextLessonFormFields,
        lessonId: number,
        chapterId: number,
        resources: any[],
        html: string
    ) => {
        if (token) {
            const response = await requestJson(
                token,
                `http://localhost:8080/teacher/edit-text-lesson`,
                "PUT",
                JSON.stringify({
                    lessonId: lessonId,
                    chapterId: chapterId,
                    lessonTitle: data.lessonName,
                    lessonType: "TEXT",
                    duration: data.duration,
                    diamondReward: data.diamondReward,
                    resources: resources,
                    html: html,
                })
            );
            return response;
        }
    };

    const editTestLesson = async (
        data: ITestLessonFormFields,
        chapterId: number,
        resources: any[],
        questions: ITestQuestions[],
        lessonId: number
    ) => {
        if (token) {
            const response = await requestJson(
                token,
                `http://localhost:8080/teacher/edit-test-lesson`,
                "PUT",
                JSON.stringify({
                    lessonId: lessonId,
                    chapterId: chapterId,
                    lessonTitle: data.lessonName,
                    lessonType: "TEST",
                    diamondReward: data.diamondReward,
                    resources: resources,
                    questions: questions.map((question) => {
                        return {
                            questionText: question.questionText,
                            correctAnswerId: question.correctAnswerId,
                            answers: question.testAnswers.map((answer) => {
                                return {
                                    answerId: answer.answerId,
                                    answerText: answer.answerText,
                                };
                            }),
                        };
                    }),
                })
            );
            return response;
        }
    };

    const editCourse = async (
        data: FieldValues,
        dropdownValue: string,
        htmlText: string,
        imgLink: string,
        courseId: number
    ) => {
        if (token) {
            const response = await requestJson(
                token,
                `http://localhost:8080/teacher/edit-course`,
                "PUT",
                JSON.stringify({
                    courseId: courseId,
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

    const deleteCourse = async (courseId: number) => {
        if (token) {
            const response = await requestJson(
                token,
                `http://localhost:8080/teacher/delete-course/${courseId}`,
                "DELETE"
            );
            return response;
        }
    };

    const deleteLesson = async (lessonId: number) => {
        if (token) {
            const response = await requestJson(
                token,
                `http://localhost:8080/teacher/delete-lesson/${lessonId}`,
                "DELETE"
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

    const getRequestAccessUsers = async (courseId: number | string) => {
        if (token) {
            const data = await requestJson(
                token,
                `http://localhost:8080/teacher/get-request-access-users/${courseId}`
            );
            return data;
        }
    };

    const getRequestAccessUsersByName = async (
        courseId: number | string,
        username: string
    ) => {
        if (token) {
            const data = await requestJson(
                token,
                `http://localhost:8080/teacher/get-request-access-users-by-name`,
                "POST",
                JSON.stringify({
                    courseId: courseId,
                    username: username,
                })
            );
            return data;
        }
    };

    const getHasAccessUsers = async (courseId: number | string) => {
        if (token) {
            const data = await requestJson(
                token,
                `http://localhost:8080/teacher/get-has-access-users/${courseId}`
            );
            return data;
        }
    };

    const getHasAccessUsersByName = async (
        courseId: number | string,
        username: string
    ) => {
        if (token) {
            const data = await requestJson(
                token,
                `http://localhost:8080/teacher/get-has-access-users-by-name`,
                "POST",
                JSON.stringify({
                    courseId: courseId,
                    username: username,
                })
            );
            return data;
        }
    };

    const addAnswerToQuestion = async (answer: IAddAnswer) => {
        if (token) {
            const data = await requestJson(
                token,
                `http://localhost:8080/user/add-answer`,
                "POST",
                JSON.stringify({ ...answer, userId: user?.userId })
            );
            return data;
        }
    };

    const addQuestionToLesson = async (question: IAddQuestion) => {
        if (token) {
            const data = await requestJson(
                token,
                `http://localhost:8080/user/add-question`,
                "POST",
                JSON.stringify({ ...question })
            );
            return data;
        }
    };

    const getUserNote = async (lessonId: number | string) => {
        if (token) {
            const data = await requestJson(
                token,
                `http://localhost:8080/user/get-user-note/${user?.userId}/${lessonId}`
            );
            return data;
        }
    };

    const saveUserNote = async (note: INote) => {
        if (token) {
            const data = await requestJson(
                token,
                `http://localhost:8080/user/save-user-note`,
                "POST",
                JSON.stringify({
                    createdAt: note.createdAt,
                    userId: user?.userId,
                    lessonId: note.lessonId,
                    text: note.text,
                })
            );
            return data;
        }
    };

    const getCourseRatingInfo = async (courseId: number | string) => {
        if (token) {
            const data = await requestJson(
                token,
                `http://localhost:8080/user/get-course-rating-info/${courseId}`
            );
            return data;
        }
    };

    const getCourseReviews = async (courseId: number | string) => {
        if (token) {
            const data = await requestJson(
                token,
                `http://localhost:8080/user/get-course-reviews/${courseId}`
            );
            return data;
        }
    };

    const getReviewByCourseAndUser = async (courseId: number | string) => {
        if (token) {
            const data = await requestJson(
                token,
                `http://localhost:8080/user/get-review-by-course-and-user/${courseId}/${user?.userId}`
            );
            return data;
        }
    };

    const saveUserReview = async (review: IAddReview) => {
        if (token) {
            const data = await requestJson(
                token,
                `http://localhost:8080/user/save-user-review`,
                "POST",
                JSON.stringify({
                    createdAt: review.createdAt,
                    userId: user?.userId,
                    courseId: review.courseId,
                    text: review.text,
                    rating: review.rating,
                })
            );
            return data;
        }
    };

    return {
        getUserInterestCoursesByName,
        getRequestAccessUsersByName,
        getAndDispatchUserProgress,
        changeUserPasswordRequest,
        addBecomeTeacherRequest,
        getTeacherCoursesByName,
        getHasAccessUsersByName,
        getReviewByCourseAndUser,
        deleteCourseCertificate,
        changeCourseCertificate,
        getUserInterestCourses,
        getRequestAccessUsers,
        getLessonPassedStatus,
        getQuestionsForLesson,
        markLessonAsUnpassed,
        addAnswerToQuestion,
        getAllCourseChapters,
        getCourseRatingInfo,
        addQuestionToLesson,
        getAndDispatchCourse,
        approveCourseAccess,
        rejectCourseAccess,
        getAndDispatchUser,
        fetchRequestAccess,
        markLessonAsPassed,
        addNewVideoLesson,
        getTeacherCourses,
        getHasAccessUsers,
        removeUserAccess,
        getCoursesByName,
        getCourseReviews,
        addNewTextLesson,
        addNewTestLesson,
        editVideoLesson,
        editTextLesson,
        putProfileInfo,
        editTestLesson,
        getLessonById,
        addNewChapter,
        saveUserReview,
        getAllCourses,
        deleteCourse,
        deleteLesson,
        saveUserNote,
        addNewCourse,
        getUserNote,
        editCourse,
        putAvatar,
        isLoading,
        error,
    };
};

export default useFetch;
