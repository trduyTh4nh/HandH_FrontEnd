import React from "react";
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

const Shop: React.FC = () => {
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
    priceFilter: 0,
    isHigher: false,
  });
  const handlePickPrice = (id: number) => {
    const updateFilter = listFilter.map((item) =>
      item.id === id ? { ...item, isCheck: true } : { ...item, isCheck: false }
    );
    setListFilter(updateFilter);

    setPriceFilter({
      priceFilter: listFilter[id - 1].price,
      isHigher: listFilter[id - 1].isHigher,
    });
  };

  const [showNav, setShowNav] = React.useState(true);
  const handleShow = () => {
    setShowNav(!showNav);
  };

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
    lowPrice: 0,
    highPrice: 0,
  });

  const [isLowHigh, setIsLowHigh] = React.useState<number>(3);

  enum PriceOrder {
    LowToHigh = 1,
    HighToLow = 2,
    Random = 3,
  }

  const [arrSize, setArrSize] = React.useState<string[]>([]);
  const [pickerColor, setPickerColor] = React.useState<string>("");
  return (
    <>
      <div className={`shop ${showNav ? "pl-20" : "pl-4"} transition-all pr-20 w-screen`}>
        <div className="wrap-shop justify-between flex">
          <div
            className={`shop-filter mt-2 mb-2 ${showNav ? "" : "flex-none w-16"} transition-all duration-300 top-16`}
            // style={{
            //     flex: showNav ? 1 : 0
            // }}
          >
            <div className="shop-filter_wrap fixed z-10 flex top-100 flex-col w-[15%] gap-2 ">
              <div
                className={`filer-hide-btn h-full ${showNav ? "w-full" : "w-fit"}
                            gap-4 items-center 
                            flex hover:bg-gray-300 
                            px-3 py-2 cursor-pointer
                            justify-center 
                            rounded-md
                            duration-150
                            transition-all
                            ease-in`}
                onClick={handleShow}
              >
                <div className="filter-icon-zoom">
                  {showNav ? (
                    <ZoomInMapIcon className=""></ZoomInMapIcon>
                  ) : (
                    <ZoomOutMapIcon></ZoomOutMapIcon>
                  )}
                </div>
                  {showNav ? <p>Ẩn</p> : null}
              </div>

              {transition(
                (styles, showNav) =>
                  showNav && (
                    <animated.div style={styles} className="Sidebar">
                      <div className="fliter-body bg-white flex flex-col gap-4 pr-4 border-r border-r-gray-300">
                        <div className="child-title text-[1.2rem] font-bold">
                          <p>Giá</p>
                        </div>
                        <Select
                          onValueChange={(val) =>
                            handlePickPrice(parseInt(val))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Mức Giá"></SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            {listFilter.map((price) => (
                              <SelectItem
                                value={price.id.toString()}
                                key={price.id}
                              >
                                <p>
                                  {price.isHigher ? "Trên" : "Dưới"}{" "}
                                  {price.price / 1000 / 100 < 10
                                    ? +(price.price / 1000) + "k"
                                    : price.price / 1000000 + "tr"}
                                </p>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        <div className="wrap-filter_price flex flex-col gap-4">
                          <div className="child-title text-[1.2rem] font-bold">
                            <p>Giá cụ thể</p>
                          </div>
                          <div className="specific-price flex gap-2 items-center flex-wrap">
                            <Input
                              className="input-specific
          flex-1 duration-200 ease-in
          outline-none  focus:border-none "
                              type="number"
                              name=""
                              placeholder="0"
                              onChange={(e: any) => {
                                setLowPrice(e.target.value);
                              }}
                              id=""
                            />
                            <div className="flash">-</div>
                            <Input
                              type="number"
                              name=""
                              onChange={(e: any) => {
                                setHighPrice(e.target.value);
                              }}
                              placeholder="99999"
                              id=""
                              className="input-specific
          flex-1 duration-200 ease-in
          outline-none  focus:border-none "
                            />
                            <Button
                              variant={"secondary"}
                              className="w-20"
                              onClick={() => {
                                setObjPrice({
                                  lowPrice: lowSpecificPrice,
                                  highPrice: highSpecificPrice,
                                });
                              }}
                            >
                              Lọc
                            </Button>
                          </div>
                        </div>

                        <div className="arrange flex flex-col gap-4">
                          <div className="child-title text-[1.2rem] font-bold">
                            <p>Sắp xếp</p>
                          </div>

                          <div className="rank-price">
                            <Select
                              defaultValue={PriceOrder.LowToHigh.toString()}
                              onValueChange={(e) => {
                                setIsLowHigh(parseInt(e) as PriceOrder);
                              }}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Sắp xếp theo"></SelectValue>
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem
                                  value={PriceOrder.LowToHigh.toString()}
                                >
                                  Giá thấp đến cao
                                </SelectItem>
                                <SelectItem
                                  value={PriceOrder.HighToLow.toString()}
                                >
                                  Giá cao đến thấp
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="child-title text-[1.2rem] font-bold">
                          <p>Cỡ</p>
                        </div>

                        <div className="list-size flex flex-wrap w-[50%] gap-2">
                          {listSize.map((size) => (
                            <SizeWidget
                              onClick={(size, id, checked) => {
                                if (checked) {
                                  setArrSize((arrItem) => [...arrItem, size]);
                                } else {
                                  var newSizes = arrSize.filter((e) => {
                                    return e !== size;
                                  });
                                  setArrSize(newSizes);
                                }
                              }}
                              id={size.id}
                              isPick={size.isPick}
                              isMore={size.isMore}
                              type={size.type}
                            ></SizeWidget>
                          ))}
                        </div>

                        <div className="child-title text-[1.2rem] font-bold">
                          <p>Màu sắc</p>
                        </div>

                        <div className="pick-color flex gap-4">
                          {colors.map((e: any) => (
                            <ColorChip
                              active={e.enabled}
                              color={e.color}
                              onClick={(selected) => {
                                setPickerColor(e.color);
                                setColors(() =>
                                  changeSelected(e, colors, selected)
                                );
                              }}
                              tooltip={e.tooltip}
                            />
                          ))}
                        </div>
                        <Button
                          variant="secondary"
                          className="w-full transition-all"
                        >
                          Xoá bộ lọc
                        </Button>
                      </div>
                    </animated.div>
                  )
              )}
            </div>
          </div>

          <div className="shop-product h-screen">
            <ProductComponentShop
              highLowPrice={objPrice}
              size={arrSize}
              color={pickerColor}
              LowToHigh={isLowHigh}
              priceFilter={priceFilter}
            ></ProductComponentShop>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
