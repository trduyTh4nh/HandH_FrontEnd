import { getAllProInWishList } from "@/apis/products/product-repo";
import { IProduct } from "@/types/product.type";
import { Axios, AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import ProductItem from "./productItem.widget";
import SkeletonLoadingProductGrid from "./SkeletonGridLoading";
import ProductErrorView from "./productError.widget";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

export const FavoriteProduct: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>(null);
  const [loading, setLoading] = useState(true);
  async function getFavoriteProduct() {
    const res = await getAllProInWishList();
    if (res instanceof AxiosError) {
      console.log(res);
      setLoading(false);
      return;
    }
    console.log(res);
    setLoading(false);
    if (res.metadata[0]) {
      setProducts(res.metadata[0].products);
    }
  }
  useEffect(() => {
    getFavoriteProduct();
  }, []);
  return (
    <div className="w-full p-4">
      <h2 className="text-4xl font-bold">Sản phẩm yêu thích</h2>
      {!loading ? (
        <div className={`w-full ${products ? "grid" : ""} grid-cols-3`}>
          {products ? products ? (
            products.map((product) => {
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
