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