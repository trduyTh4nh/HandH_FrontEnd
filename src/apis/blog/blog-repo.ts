import { AxiosError } from "axios";
import API from "../api";

const api = new API({headerType: "json"})
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