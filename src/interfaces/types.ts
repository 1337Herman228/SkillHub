export interface IUser {
    userId: number | null;
    person: IPerson | null;
    role: IRole | null;
    login: string;
    diamonds: number | null;
}

export interface INavLink {
    id: string;
    href: string;
    name: string;
}

export interface IPerson {
    personId: number;
    name: string;
    surname: string;
    email: string;
    avatarImg: string;
}

export interface IRole {
    roleId: number;
    position: string;
}

export interface IRole {
    roleId: number;
    position: string;
}

export interface ICourse {
    courseId: number;
    author: IUser;
    courseImg: string;
    courseName: string;
    topic: string;
    skillLevel: "START" | "NORMAL" | "PRO" | "ALL";
    shortDescription: string;
    longDescription: string;
    lastUpdate: string;
}

export interface ICourseInfo {
    course: ICourse;
    info: IInfo;
    chapters: IChapterWithLessonsInfo[];
    lessons: ILessonWithResources[];
}

export interface ICourseInfoNullable {
    course: ICourse | null;
    info: IInfo | null;
    chapters: IChapterWithLessonsInfo[] | null;
    lessons: ILessonWithResources[] | null;
}

export interface IChapter {
    chapterId: number;
    courseId: number;
    chapterTitle: string;
    chapterOrder: number;
}

export interface IChapterWithLessonsInfo extends IChapter {
    lessonsCount: number;
    duration: number;
}

export interface ILesson {
    lessonId: number;
    chapterId: number;
    lessonType: TLessonType;
    lessonTitle: string;
    diamondReward: number;
    lessonOrder: number;
    duration: number;
}

export interface ILessonWithResources extends ILesson {
    resources: IResources[];
}

export interface IResources {
    resourceId: number;
    lessonId: number;
    resourceTitle: string;
    resourceLink: string;
}

export type TLessonType = "VIDEO" | "TEXT" | "TEST";

export interface IUserProgress {
    progressId: number;
    user: number;
}

export interface IContinueCourse {
    course: ICourse;
    progressInPercents: number;
    completedLessonsCount: number;
    allLessonsCount: number;
}

export interface IAllCourse {
    course: ICourse;
    duration: number;
    allLessonsCount: number;
    rating: number;
    reviewsCount: number;
    status: "NO_REQUEST" | "PENDING" | "APPROVED" | "REJECTED";
}

export interface IUserInterestCourse {
    course: ICourse;
    duration: number;
    allLessonsCount: number;
    completedLessonsCount: number;
    progressInPercents: number;
    rating: number;
    reviewsCount: number;
    status: TAccessStatus;
}

export interface IInfo {
    duration: number | null;
    allLessonsCount: number;
    rating: number;
    testsCount: number;
    studentsCount: number;
    reviewsCount: number;
}

export interface ICourseAcces {
    accessId: number;
    user: IUser;
    course: ICourse;
    requestDate: Date;
    grantedDate: Date;
    status: TAccessStatus;
}

export type TAccessStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface IProfileSectionInfo {
    id: string;
    title: string;
    linkName: string;
    description: string;
    children?: React.ReactNode;
}

export type TRole = "user" | "teacher" | "admin";

export type NotificationType = "success" | "info" | "warning" | "error";

export type TStatusType =
    | "NO_REQUEST"
    | "PENDING"
    | "APPROVED"
    | "REJECTED"
    | "LOADING";

export interface ICourseInfoUrlParams {
    "course-id": string;
    "lesson-id": string;
}
