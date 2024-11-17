import { IUser } from "./user.type";

export interface IBlogPost {
    _id: string,
    content: string,
    author: IUser | string,
    images: string[],
    createdAt: string,
    updatedAt?: string
}
