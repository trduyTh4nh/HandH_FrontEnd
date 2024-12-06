import { getABanner } from "@/apis/banner/banner-repo";
import { getProduct } from "@/apis/products/product-repo";
import { IBanner } from "@/types/banner.type";
import { IProduct } from "@/types/product.type";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AspectRatio } from "../ui/aspect-ratio";
import ProductItem from "../widget/productItem.widget";
import { useMediaQuery } from "react-responsive";

export default function ShopBanner() {
  const { id } = useParams<{ id: string }>();
  const [products, setProducts] = useState<IProduct[]>(null);
  const [banner, setBanner] = useState<IBanner>(null);
  const isMobile = useMediaQuery({
    query: "(max-width: 768px)",
  });
  async function fetchBanner() {
    const products = await getProduct();
    const banner = await getABanner(id);
    if (products instanceof AxiosError) {
      console.warn(products);
      return;
    }
    if (banner instanceof AxiosError) {
      console.warn(banner);
      return;
    }
    setBanner(banner.metadata);
    console.log(banner.metadata);
    setProducts(
      products.metadata.filter(
        (product) =>
          banner.metadata.products.includes(product._id) && product.isPublished
      )
    );
    console.log(
      products.metadata.filter(
        (product) =>
          banner.metadata.products.includes(product._id) && product.isPublished
      )
    );
  }
  useEffect(() => {
    fetchBanner();
  }, []);
  return (
    <div className="w-full">
      {banner ? (
        <div className="w-full">
          <div className="w-full relative">
            <AspectRatio ratio={isMobile ? 3/2 : 7} className="w-full">
              <img
                src={banner.url}
                alt=""
                className="w-full h-full object-cover"
              />
              <div className="absolute top-0 left-0 bg-background/90 w-full h-full flex flex-col items-center justify-center">
                <h1 className="text-3xl text-center">{banner.title}</h1>
                <p>{banner.content}</p>
                <p>{products ? products.length : 0} sản phẩm</p>
              </div>
            </AspectRatio>
          </div>
          {products ? (
            <div className="grid grid-cols-2 md:grid-cols-4 px-10 md:px-20">
              {products.map((e) => (
                <ProductItem key={e._id} {...e} />
              ))}
            </div>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
