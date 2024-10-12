export interface IUser {
    userId: number | null;
    person: IPerson | null;
    role: IRole | null;
    login: string | null;
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
    lastUpdate: Date;
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
