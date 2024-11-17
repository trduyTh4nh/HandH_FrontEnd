import { createContext } from "react";

export const ImageModelContext = createContext({
  value: {
    isOpen: false,
    images: [""],
    currentIndex: 0,
  },
  setImageModelContext: (value: {
    isOpen: boolean;
    images: Array<any>;
    currentIndex: number;
  }) => {},
});
