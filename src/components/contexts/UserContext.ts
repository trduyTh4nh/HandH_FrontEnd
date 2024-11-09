import { IUser } from "@/types/user.type";
import { createContext } from "react";
import { useState, useContext, ReactNode } from "react";
interface UserProviderProps {
    children: ReactNode;
}
export const UserContext = createContext<{user: IUser, setUser: (u: IUser) => void, isLoading?: boolean}>(null);
export const useUser = () => useContext(UserContext);