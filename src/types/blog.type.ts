import { IUser } from "./user.type";

export interface IBlogPost {
    _id: string,
    content: string,
    author: IUser | string,
    images: string[],
    datePosted: string,
    dateEdited?: string
}

//mẫu:
const sampleData: IBlogPost[] = [
    {
        _id: "dikgaoidgjiadjfa",
        content: "Sample blog",
        author: {
            email: "test@gmail.com",
            name: "test",
            phone: "...",
            password: "shhh...."
        },
        images: [
            "imageLink1",
            "imageLink2",
            "...."
        ],
        datePosted: "2024-10-21"
    }
]