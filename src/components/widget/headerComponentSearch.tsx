import { ShoppingCartOutlined, SearchOutlined } from "@mui/icons-material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
const HeaderComponentSearch = () => {
  const [key, setKey] = React.useState<string>("");
  const hanldeOnKeyDown = (e: any): void => {
    if (e.key === "Enter") {
      console.log(key);
    }
  };
  const navigate = useNavigate();
  return (
    <div className="flex gap-4 items-center">
      <Button onClick={() => navigate("/cart")} className="h-full relative">
        <ShoppingCartOutlined className="text-color-primary size-3"></ShoppingCartOutlined>
        <div className="badge flex items-center justify-between rounded-full bg-red-400 w-5 h-5">
          <span className="w-full text-center text-sm">1</span>
        </div>
      </Button>
      <Button className="md:hidden h-full" variant="secondary">
        <SearchOutlined className="text-black"></SearchOutlined>
      </Button>
      <div className="hidden md:flex bg-search-field items-center gap-0 md:gap-2 px-3 py-1 rounded-full">
        <SearchOutlined className="text-black"></SearchOutlined>
        <div>
          <input
            onChange={(e) => {
              var value: string = e.target.value;
              console.log(value);
              setKey(value);
            }}
            onKeyDown={hanldeOnKeyDown}
            type="text"
            placeholder="Tìm kiếm"
            className="bg-transparent text-black py-2  border-0 focus:border-0 focus:outline-none w-40 placeholder:font-bold"
          />
        </div>
      </div>
    </div>
  );
};

export default HeaderComponentSearch;
