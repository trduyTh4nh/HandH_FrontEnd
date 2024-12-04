import { changeInformation } from "@/apis/user/user-repo";
import { UserContext } from "@/components/contexts/UserContext";
import { addressSchema } from "@/components/widget/customerInformation.widget";
import { IUser } from "@/types/user.type";
import { AxiosError } from "axios";
import { useContext } from "react";
import { z } from "zod";

export default function useUser() {
    const {user,setUser,isLoading} = useContext(UserContext);
    async function updateAddressUser(address: z.infer<typeof addressSchema>) {
        const updatedUser: IUser = {
            ...user,
            _id: user._id,
            email: user.email,
            avatar: user.avatar,
            birthDay: user.birthDay ? user.birthDay instanceof Date ? user.birthDay.toLocaleDateString() : user.birthDay : null,
            userAddress: {
              street: address.street,
              city: address.ward + ", " + address.city,
              state: address.state,
              country: address.country,
              apartmentNumber: address.apartmentNumber,
            },
          };
          const res = await changeInformation(updatedUser);
          if (res instanceof AxiosError) {
            console.error(res);
            return res;
          }
          setUser({
            ...updatedUser,
            avatar:
              updatedUser.avatar instanceof File
                ? URL.createObjectURL(updatedUser.avatar)
                : (updatedUser.avatar as string),
          });
    }
    return {user,setUser,isLoading, updateAddressUser};
}