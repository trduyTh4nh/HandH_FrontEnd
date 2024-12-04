import { AxiosError } from "axios";
import API from "../api";
import { Files } from "lucide-react";

const api = new API({headerType: "json"})
const formApi = new API({headerType: "formdata"})
export async function getPosts() {
    try {
        const res = await api.get("blog/getAllBlogPost");
        return res["metadata"];
    } catch (e) {
        if(e instanceof AxiosError){
            console.warn(e)
            return e;
        }
        console.error(e)
    }
}
export async function createPost(content: string, images: File[], idUser: string) {
    try {
        const formData = new FormData();
        formData.append("content", content);
        images.forEach((image) => {
            formData.append("images", image);
        });
        formData.append("idUser", idUser);
        const res = await formApi.post("blog/createBlogPost", formData);
        return res["metadata"];
    } catch (e) {
        if(e instanceof AxiosError){
            console.warn(e)
            return e;
        }
        console.error(e)
    }
}
export async function deletePost(id: string) {
    try {
        const res = await api.delete(`blog/deleteBlogPost/${id}`);
        return res["metadata"];
    } catch (e) {
        if(e instanceof AxiosError){
            console.warn(e)
            return e;
        }
        console.error(e)
    }
}
export async function updatePost(id: string, content: string, images: File[], arrImageIndex: number[]) {
    try {
        const formData = new FormData();
        formData.append("content", content);
        formData.append("idBlog", id);
        formData.append("arrPositionImage", JSON.stringify(arrImageIndex));
        images.forEach((image) => {
            formData.append("images", image);
        });
        const res = await formApi.put(`blog/updateBlogPost/`, formData);
        return res["metadata"];
    } catch (e) {
        if(e instanceof AxiosError){
            console.warn(e)
            return e;
        }
        console.error(e)
    }
}