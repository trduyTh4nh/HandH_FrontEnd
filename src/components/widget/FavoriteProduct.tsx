import { getAllProInWishList } from "@/apis/products/product-repo";
import { IProduct } from "@/types/product.type";
import { Axios, AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import ProductItem from "./productItem.widget";
import SkeletonLoadingProductGrid from "./SkeletonGridLoading";
import ProductErrorView from "./productError.widget";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { useCart } from "@/providers/CartContext";

export const FavoriteProduct: React.FC = () => {
  const {favoriteProducts} = useCart();
  const [loading, setLoading] = useState(false);
  return (
    <div className="w-full p-4">
      <h2 className="text-4xl font-bold">Sản phẩm yêu thích</h2>
      {favoriteProducts ? (
        <div className={`w-full ${favoriteProducts ? "grid" : ""} grid-cols-3`}>
          {favoriteProducts ? favoriteProducts ? (
            favoriteProducts.map((product) => {
              return <ProductItem {...product} />;
            })
          ) : (
            <SkeletonLoadingProductGrid />
          ) : <ProductErrorView className="max-h-screen" count={4} title="Không có sản phẩm yêu thích" message="Hãy thêm một sản phẩm yêu thích vào bộ sưu tập bằng cách ấn vào một sản phẩm sau đó ấn nút trái tim." icon="notfound" mini>
              <Link to="/shop"><Button>Mua sắm</Button></Link>
            </ProductErrorView>}
        </div>
      ) : (
        <SkeletonLoadingProductGrid />
      )}
    </div>
  );
};
