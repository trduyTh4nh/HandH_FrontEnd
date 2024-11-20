import { IUserAddress } from "@/types/user.type";
import { createContext, ReactNode, useContext, useState } from "react";

type PaymentContextProps = {
  paymentOrder: IPaymentOrder;
  setPaymentOrder?: (value: IPaymentOrder) => void;
};
export interface IPaymentOrder {
    products: any[];
    price: number;
    paymentMethod: string;
    status: string;
    notes: string;
    userId: string;
    shippingAddress: IUserAddress;
}

const PaymentContext = createContext<PaymentContextProps>(undefined);
export function usePaymentOrder() {
    const context = useContext(PaymentContext);
    return context;
}
export function PaymentProvider({ children, values }: {children: ReactNode, values: IPaymentOrder}) {
  const [paymentOrder, setPaymentOrder] = useState<IPaymentOrder>(values);
  return (
    <PaymentContext.Provider value={{paymentOrder: values, setPaymentOrder: setPaymentOrder}}>
      {children}
    </PaymentContext.Provider>
  );
}
