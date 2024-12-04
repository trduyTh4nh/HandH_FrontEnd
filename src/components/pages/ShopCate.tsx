import React, { useEffect, useState } from "react";
import "../../styles/shop.css";

import ZoomInMapIcon from "@mui/icons-material/ZoomInMap";
import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";
import { convertMoney } from "../../utils";
// import { useSpring, animated, useTransition , config } from "react-spring";
import SizeWidget from "../widget/sizeWidget";
import { useSpring, animated, useTransition } from "react-spring";
import ColorChip from "../widget/colorChip";
import ProductComponentShop from "../widget/productComponentShop";
import { TypeFilterPice, TypeObjPrice } from "../../types/some.type";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
import { SelectValue } from "@radix-ui/react-select";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { getProduct, getProductByCategory } from "@/apis/products/product-repo";
import PaginationControls from "../widget/PaginationsControl";
import Footer from "../widget/footer";
import { useMediaQuery } from "react-responsive";
import { Filter } from "lucide-react";
import { Helmet } from "react-helmet";
import { useFetcher, useSearchParams } from "react-router-dom";
import ProductItem from "../widget/productItem.widget";
import ProductErrorView from "../widget/productError.widget";
import { IProduct } from "@/types/product.type";
import SkeletonLoadingProductGrid from "../widget/SkeletonGridLoading";
type PriceFilter = {
  id: number;
  price: number;
  isHigher: boolean;
  isCheck: boolean;
};

export type Size = {
  id: number;
  type: string;
  isPick: boolean;
  isMore: boolean;
  onClick?: (size: string, id: number, checked: boolean) => void;
};

const ShopCate: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [productCategory, setProductCategory] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const category = searchParams.get("cate");
    if (!category) {
      setProductCategory([]);
    }
    const getProductCate = async () => {
      let productCate = await getProductByCategory(category);
      if (!productCate) {
        setProductCategory([]);
      }
      setProductCategory(productCate.metadata);
    };
    getProductCate();
    setLoading(false);
  }, [searchParams]);

  const isMobile = useMediaQuery({
    query: "(max-width: 768px)",
  });
  async function getProducts() {
    const products = await getProduct();
    setMaximumPageCount(products.metadata.length);
  }

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [maximumPageCount, setMaximumPageCount] = useState<number>(null);
  const [colors, setColors] = React.useState([
    {
      tooltip: "Xanh dương",
      color: "#8DB4D2",
      enabled: true,
    },
    {
      tooltip: "Đen",
      color: "#000",
      enabled: false,
    },
    {
      tooltip: "Hồng",
      color: "#FFD1DC",
      enabled: false,
    },
  ]);

  const dataFilter: PriceFilter[] = [
    {
      id: 1,
      price: 500000,
      isHigher: true,
      isCheck: false,
    },
    {
      id: 2,
      price: 1000000,
      isHigher: false,
      isCheck: false,
    },
    {
      id: 3,
      price: 2000000,
      isHigher: false,
      isCheck: false,
    },
    {
      id: 4,
      price: 2000000,
      isHigher: true,
      isCheck: false,
    },
  ];

  const listSize: Size[] = [
    {
      id: 1,
      type: "S",
      isPick: false,
      isMore: false,
    },
    {
      id: 2,
      type: "M",
      isPick: false,
      isMore: false,
    },
    {
      id: 3,
      type: "L",
      isPick: false,
      isMore: false,
    },
    {
      id: 4,
      type: "XL",
      isPick: false,
      isMore: false,
    },
    {
      id: 5,
      type: "XXL",
      isPick: false,
      isMore: false,
    },

    {
      id: 6,
      type: "XL",
      isPick: false,
      isMore: true,
    },
  ];

  const [listFilter, setListFilter] = React.useState<PriceFilter[]>(dataFilter);

  const [priceFilter, setPriceFilter] = React.useState<TypeFilterPice>({
    price: 0,
    isUp: false,
  });
  const handlePickPrice = (id: number) => {
    const updateFilter = listFilter.map((item) =>
      item.id === id ? { ...item, isCheck: true } : { ...item, isCheck: false }
    );
    setListFilter(updateFilter);

    setPriceFilter({
      price: listFilter[id - 1].price,
      isUp: listFilter[id - 1].isHigher,
    });
  };

  const [showNav, setShowNav] = React.useState(!isMobile);
  const handleShow = () => {
    setShowNav(!showNav);
  };
  useEffect(() => {
    setShowNav(!isMobile);
  }, [isMobile]);
  function changeSelected(element: any, array: Array<any>, value: boolean) {
    return array.map((e) => {
      if (e == element) {
        return {
          ...element,
          enabled: value,
        };
      }
      return {
        ...e,
        enabled: false,
      };
    });
  }

  const [lowSpecificPrice, setLowPrice] = React.useState<number>(0);
  const [highSpecificPrice, setHighPrice] = React.useState<number>(0);

  const transition = useTransition(showNav, {
    from: {
      x: "-100px",
      opacity: 0,
    },
    enter: {
      x: "0px",
      opacity: 1,
    },
    leave: {
      x: "-100px",
      opacity: 0,
    },
    config: { tension: 120, friction: 14 },
  });

  const [objPrice, setObjPrice] = React.useState<TypeObjPrice>({
    lowPrice: undefined,
    highPrice: undefined,
  });

  const [isLowHigh, setIsLowHigh] = React.useState<number>(undefined);

  enum PriceOrder {
    LowToHigh = 1,
    HighToLow = 2,
    Random = 3,
  }

  const [arrSize, setArrSize] = React.useState<string[]>([]);
  const [pickerColor, setPickerColor] = React.useState<string>("");

  const deleteFilter = () => {
    setArrSize([]);
    setIsLowHigh(undefined);
    setPriceFilter(null);
    setLowPrice(null);
    setHighPrice(null);
    setObjPrice({
      lowPrice: undefined,
      highPrice: undefined,
    });

    console.log("Delete filter");
  };

  const [page, setPage] = React.useState(0);
  const [take, setTake] = React.useState(9);

  if (loading) return <SkeletonLoadingProductGrid />;

  return (
    <>
      <Helmet>
        <title>Cửa hàng - Áo Dài Hồng Đức</title>
      </Helmet>
      <div
        className={`shop pb-20 ${
          showNav && !isMobile ? "pl-10 md:pl-20" : "pl-10 md:pl-4"
        } transition-all pr-10 md:pr-10 w-screen`}
      >
        <div className="wrap-shop justify-between flex">
          <div className="shop-product screen">
            <div className="home-new-list-product py-4 flex flex-wrap">
              {productCategory.length > 0 ? (
                loading ? (
                  <SkeletonLoadingProductGrid></SkeletonLoadingProductGrid>
                ) : (
                  productCategory.map((product: IProduct) => (
                    <div className="wrap-product w-full" key={product._id}>
                      <ProductItem {...product} />
                    </div>
                  ))
                )
              ) : (
                <ProductErrorView
                  className={`flex-1 hidden`}
                  mini
                  title="Không có sản phẩm nào"
                  count={4}
                  message="Không có sản phẩm nào ở trang này. Vui lòng quay lại."
                  icon="notfound"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopCate;
