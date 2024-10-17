export interface IUser {
    userId: number | null;
    person: IPerson | null;
    role: IRole | null;
    login: string;
    diamonds: number | null;
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

export interface ICourseAcces {
    accessId: number;
    user: IUser;
    course: ICourse;
    requestDate: Date;
    grantedDate: Date;
    status: TAccessStatus;
}

export type TAccessStatus = "PENDING" | "APPROVED" | "REJECTED";
