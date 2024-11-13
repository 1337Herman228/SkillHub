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

export interface ILessonWithLessonType {
    lessonId: number;
    lessonType: TLessonType;
    lessonTitle: string;
    testLesson?: ITestLesson | null;
    textLesson?: ITextLesson | null;
    videoLesson?: IVideoLesson | null;
}

export interface IVideoLesson {
    lessonId: number;
    videoLessonId: number;
    videoUrl: string;
}

export interface ITestLesson {
    lessonId: number;
    testId: number;
    name: string;
    testDescription?: string;
    testAnswers: ITestAnswer[];
    testQuestions: ITestQuestion[];
}

export interface ITextLesson {
    lessonId: number;
    textLessonId: number;
    lessonBody: string; //html
    title: string;
}

export interface ITestAnswer {
    answer: string;
    testAnswerId: number;
    testQuestionId: number;
}

export interface ITestQuestion {
    answerDescription: string;
    correctAnswerId: number;
    questionId: number;
    questionText: string;
    testId: number;
}

export interface ITestResult {
    questionOrder: number;
    testQuestionId: number;
    questionText: string;
    userAnswer: string;
    correctAnswerId: number;
    correctAnswerDescription: string;
    isCorrect: boolean;
}

export interface IResources {
    resourceId: number;
    lessonId: number;
    resourceTitle: string;
    resourceLink: string;
}

export interface IResourcesListItem {
    resourceId: number;
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

export interface IHasAccessUser {
    accessId: number;
    user: IUser;
    requestDate: Date;
    grantedDate: Date;
}

export type TAccessStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface IProfileSectionInfo {
    id: string;
    title: string;
    linkName: string;
    description: string;
    children?: React.ReactNode;
}

export interface IQuestion {
    questionId: number;
    user: IUser;
    createdAt: Date;
    updatedAt: Date;
    body: string;
    answers: IAnswer[];
}
export interface IAnswer {
    answerId: number;
    questionId: number;
    user: IUser;
    body: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IAddAnswer {
    questionId: number;
    userId: number;
    body: string;
    createdAt: Date;
    updatedAt: Date;
}
export interface IAddQuestion {
    lessonId: number;
    userId: number;
    createdAt: Date;
    updatedAt: Date;
    body: string;
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
