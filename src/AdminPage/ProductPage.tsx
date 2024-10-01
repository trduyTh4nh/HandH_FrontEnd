import React, { useEffect } from "react";
import API from "../apis/api";

const ProductPage: React.FC = () => {
  const [product, setProduct] = React.useState([]);
  useEffect(() => {
    const api = new API();
    const fetchProduct = async () => {
      try {
        const response: any = await api.get("product");
        setProduct(response.metadata);
        console.log(response.metadata);
      } catch (error) {
        console.error("Lỗi khi lấy sản phẩm:", error);
      }
    };

    fetchProduct();
  }, []);

  return (
    <div className="h-screen w-screen">
      {product.map((pro: any) => (
        <h1>{pro.product_name}</h1>
      ))}
    </div>
  );
};

export default ProductPage;
