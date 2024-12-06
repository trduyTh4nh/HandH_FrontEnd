import { ShoppingCartOutlined, SearchOutlined } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useCart } from "@/providers/CartContext";
import { searchProduct } from "@/apis/products/product-repo";
import { Card, CardContent } from "@/components/ui/card";
import { convertMoney } from "@/utils";
import { Loader, CircleX } from "lucide-react";
import { CSSTransition } from "react-transition-group";
import "../../styles/search.css";
import { CommandDialog, CommandInput } from "../ui/command";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
const HeaderComponentSearch = () => {
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const { cart, getCart, getFavoriteProducts } = useCart();
  const [loading, setLoading] = useState(true);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [openSearchDialog, setOpenSearchDialog] = useState(false);
  function debounce(func, wait) {
    let timeout;
    return function (...args) {
      var context = this;
      clearTimeout(timeout);
      timeout = setTimeout(async () => await func.apply(context, args), wait);
    };
  }

  const searchHandle = debounce(async (e) => {
    const value = e.target.value;
    setSearchValue(value);
    if (value) {
      setLoadingSearch(true);
      const resultSearch = await searchProduct(value);

      setSearchResults(resultSearch.metadata);
      setLoadingSearch(false);
      setShowResults(true);
    } else {
      setSearchResults([]);
    }
  }, 400);

  // const [favorite, setFavorite] = React.useState(false);
  // return (
  //   <div
  //     onClick={() => {
  //       navigate(`/product/${_id}`);
  //     }}
  const handleResultClick = (id) => {
    navigate(`/product/${id}`);
    setShowResults(false);
    setOpenSearchDialog(false);
  };

  useEffect(() => {
    const fetchCart = async () => {
      const currentUser = JSON.parse(localStorage.getItem("user"));
      if (currentUser) {
        await getCart(currentUser._id);
        await getFavoriteProducts();
      }
      setLoading(false);
      setTimeout(() => setDataLoaded(true), 200);
    };
    fetchCart();
  }, []);

  return (
    <div className="flex gap-4 items-center">
      <Dialog open={openSearchDialog} onOpenChange={setOpenSearchDialog}>
        <DialogContent className="max-h-screen overflow-auto">
          <DialogHeader>
            <DialogTitle>Tìm kiếm sản phẩm</DialogTitle>
          </DialogHeader>
          <Input
            placeholder="Tìm kiếm"
            onChange={(e) => {
              searchHandle(e);
            }}
          />
          {loadingSearch ? (
            <div className="w-full flex justify-center items-center gap-2">
              <Loader />
              <p>Đang tải</p>
            </div>
          ) : searchResults.length > 0 ? (
            showResults &&
            searchResults.length > 0 && (
              <div className="wrap-card-search">
                {/* <CircleX
                className="hover:cursor-pointer hover:bg-slate-300 rounded-full"
                onClick={() => setShowResults(false)}
              ></CircleX> */}

                {searchResults.map((result) => (
                  <div
                    key={result._id}
                    className="px-4 py-2 hover:bg-accent cursor-pointer"
                    onClick={() => handleResultClick(result._id)}
                  >
                    <div className="flex items-center space-x-2">
                      <img
                        src={result.product_thumb}
                        alt={result.product_name}
                        className="w-10 h-10 object-cover rounded"
                      />
                      <div>
                        <p className="font-medium">{result.product_name}</p>
                        <p className="text-sm text-muted-foreground">
                          {convertMoney(result.product_price)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : (
            <p>Không tìm thấy kết quả</p>
          )}
        </DialogContent>
      </Dialog>
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
      <Button onClick={() => {setOpenSearchDialog(true)}} className="md:hidden h-full" variant="secondary">
        <SearchOutlined className="text-black"></SearchOutlined>
      </Button>
      <div className="hidden md:flex bg-search-field items-center gap-0 md:gap-2 px-3 py-1 rounded-full">
        {!loadingSearch ? (
          <SearchOutlined className="text-black"></SearchOutlined>
        ) : (
          <Loader className="animate-spin" />
        )}
        <div>
          <input
            onChange={searchHandle}
            type="text"
            placeholder="Tìm kiếm"
            className="bg-transparent text-black py-2  border-0 focus:border-0 focus:outline-none w-40 placeholder:font-bold"
          />
        </div>
        {showResults && searchResults.length > 0 && (
          <CSSTransition
            in={showResults}
            timeout={300}
            classNames="fade"
            unmountOnExit
          >
            <div className="wrap-card-search">
              {/* <CircleX
                className="hover:cursor-pointer hover:bg-slate-300 rounded-full"
                onClick={() => setShowResults(false)}
              ></CircleX> */}
              <Card className="absolute top-[45%] right-10 w-64 z-50 rounded-md h-96 overflow-y-scroll scrollbar">
                <div className="close-search-btn w-full flex justify-end pr-2 pt-2 "></div>
                <CardContent className="p-2 rounded-md">
                  <ul className="py-2">
                    {searchResults.map((result) => (
                      <li
                        key={result._id}
                        className="px-4 py-2 hover:bg-accent cursor-pointer"
                        onClick={() => handleResultClick(result._id)}
                      >
                        <div className="flex items-center space-x-2">
                          <img
                            src={result.product_thumb}
                            alt={result.product_name}
                            className="w-10 h-10 object-cover rounded"
                          />
                          <div>
                            <p className="font-medium">{result.product_name}</p>
                            <p className="text-sm text-muted-foreground">
                              {convertMoney(result.product_price)}
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </CSSTransition>
        )}
      </div>
    </div>
  );
};

export default HeaderComponentSearch;
