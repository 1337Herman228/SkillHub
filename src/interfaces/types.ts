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
