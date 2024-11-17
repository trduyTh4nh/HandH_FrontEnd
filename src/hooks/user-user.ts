import { UserContext } from "@/components/contexts/UserContext";
import { useContext } from "react";

export default function useUser() {
    const {user,setUser,isLoading} = useContext(UserContext);  
    
    return {user,setUser,isLoading};
}