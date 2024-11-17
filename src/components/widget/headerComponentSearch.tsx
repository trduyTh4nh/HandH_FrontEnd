import { ShoppingCartOutlined, SearchOutlined } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useCart } from "@/providers/CartContext";
const HeaderComponentSearch = () => {
  const [key, setKey] = React.useState<string>("");
  const hanldeOnKeyDown = (e: any): void => {
    if (e.key === "Enter") {
      console.log(key);
    }
  };
  const navigate = useNavigate();

  const { cart, getCart } = useCart();
  // const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   const fetchCart = async () => {
  //     const currentUser = JSON.parse(localStorage.getItem("user"));
  //     if (currentUser) {
  //       await getCart(currentUser._id);
  //     }
  //     setLoading(false);
  //   };
  //   fetchCart();
  //   console.log("cart header: ", cart);
  // }, []);

  const [loading, setLoading] = useState(true);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    const fetchCart = async () => {
      const currentUser = JSON.parse(localStorage.getItem("user"));
      if (currentUser) {
        await getCart(currentUser._id);
      }
      setLoading(false);
      setTimeout(() => setDataLoaded(true), 200);
    };
    fetchCart();
  }, []);

  return (
    <div className="flex gap-4 items-center">
      <Button onClick={() => navigate("/cart")} className="h-full relative">
        <ShoppingCartOutlined className="text-color-primary size-3"></ShoppingCartOutlined>
        <div className="badge flex items-center justify-between rounded-full bg-red-400 w-5 h-5">
          <span className="w-full text-center text-sm">
            {loading ? (
              <span className="loading-dot">•</span>
            ) : (
              cart?.cart_products?.length || 0
            )}
          </span>
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
