import React from "react";
import { IProduct } from "../../types/product.type";
import {
  Favorite,
  FavoriteBorder,
  FiberManualRecord,
} from "@mui/icons-material";
import "../../styles/home.css";
import { convertMoney } from "../../utils";
import { Link, useNavigate } from "react-router-dom";
import { AspectRatio } from "../ui/aspect-ratio";
const ProductItem: React.FC<IProduct> = (props) => {
  const {
    product_name,
    product_price,
    product_thumb,
    product_colors,
    product_slug,
    product_sizes,
    _id,
  } = props;
  const navigate = useNavigate();
  const [favorite, setFavorite] = React.useState(false);
  return (
    <div
      onClick={() => {
        navigate(`/product/${_id}`);
      }}
      className="product_item-main rounded-3xl duration-500 hover:-translate-y-2 hover:cursor-pointer hover:shadow-lg"
    >
      <div className="product_item-image w-full">
        <AspectRatio ratio={2/3}>
          <img
            src={product_thumb as string}
            className="w-full h-full scale-90 object-cover rounded-sm"
            alt=""
          />
        </AspectRatio>
        <div className="wrap-product-info flex w-full items-start justify-between p-4">
          <div className="wrap-product-info_left gap-1 flex flex-col">
            <div className="product_item-name text-lg">
              <p>{product_name}</p>
            </div>
            <div className="product_item-price text-lg font-bold">
              <p>{convertMoney(product_price)}</p>
            </div>
            <p>
              {product_colors ? product_colors.length : 0} màu sắc •{" "}
              {product_sizes ? product_sizes.length : 0} kích cỡ
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
