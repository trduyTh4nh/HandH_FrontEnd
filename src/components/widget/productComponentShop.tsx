import React, { useEffect } from "react";
import { IProduct, productList, products } from "../../types/product.type";
import ProductItem from "./productItem.widget";
import { TypeFilterPice, TypeObjPrice } from "../../types/some.type";
import {
  getProduct,
  getProductFilter,
  getProductPage,
} from "@/apis/products/product-repo";
import SkeletonLoadingProduct from "./skeletonLoadingProduct";
import SkeletonLoadingProductGrid from "./SkeletonGridLoading";
import { useQuery } from "@tanstack/react-query";
import { Button } from "../ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
// import { forEach } from "@splidejs/splide/src/js/utils";

export default function ProductComponentShop({
  priceFilter,
  color,
  size,
  LowToHigh,
  highLowPrice,
  skip,
  take,
  onPageChange,
}: {
  priceFilter: TypeFilterPice;
  color: string;
  size: string[];
  LowToHigh: number;
  highLowPrice: TypeObjPrice;
  skip: number;
  take: number;
  onPageChange: (page: number) => void;
}) {
  const [productData, setProductData] = React.useState<IProduct[]>([]);
  const [loading, setLoading] = React.useState(true);

  const fetchProFilter = async ({ pageParam = 0 }) => {
    // Tạo object filter với điều kiện kiểm tra từng trường
    const filter: any = {};

    if (priceFilter?.price) {
      filter.pricesFilter = {
        price: priceFilter.price,
        isUp: priceFilter.isUp,
      };

      console.log("price filter: ", filter.pricesFilter);
    }

    if (size && size.length > 0) {
      filter.sizesFilter = size;
    }

    if (LowToHigh) {
      filter.isSortByPrice = LowToHigh === 1;
    }

    if (
      highLowPrice?.lowPrice !== undefined &&
      highLowPrice?.highPrice !== undefined
    ) {
      filter.minimumPrice = highLowPrice.lowPrice;
      filter.maximumPrice = highLowPrice.highPrice;
    }

    try {
      // Kiểm tra nếu object filter không rỗng mới gọi API với filter
      if (Object.keys(filter).length > 0) {
        const response: any = await getProductFilter(
          filter,
          pageParam * take,
          take
        );
        return response.metadata.filterProduct;
      } else {
        // Gọi API mặc định nếu không có filter nào
        const responseDefault: any = await getProductPage(
          pageParam * take,
          take
        );
        return responseDefault.metadata;
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  };

  const filters = { priceFilter, size, LowToHigh, highLowPrice };

  React.useEffect(() => {
    (async () => {
      setLoading(true);
      const response = await getProduct();
      setProductData(response.metadata || []);
      setLoading(false);
      console.log("data: ", response.metadata);
    })();
  }, []);

  console.log("FILTER: ", filters);

  const {
    data: productDatas = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products", skip, filters],
    queryFn: () => fetchProFilter({ pageParam: skip }),
    staleTime: 1000 * 60 * 5,
  });

  console.log("data return: ", productDatas);

  if (isLoading) return <SkeletonLoadingProductGrid />;
  if (error) return <h1>Error loading products</h1>;

  return (
    <div>
      <div className="home-new-list-product py-4 flex flex-wrap">
        {productDatas.length > 0 ? (
          productDatas.map((product: IProduct) => (
            <div className="wrap-product" key={product._id}>
              <ProductItem
                _id={product._id}
                product_name={product.product_name}
                product_price={product.product_price}
                product_thumb={product.product_thumb}
                product_variations={product.product_variations}
              />
            </div>
          ))
        ) : (
          <h1>Không có sản phẩm nào</h1>
        )}
      </div>
      <div className="pagination-controls fixed  bottom-0 flex w-[70%] pb-4 justify-between">
        <button
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
          onClick={() => onPageChange(skip - 1)}
          disabled={skip === 0}
        >
          <div className="inner-button flex gap-2">
            <ArrowLeft></ArrowLeft>
            {/* <span>Trang trước</span> */}
          </div>
        </button>
        {productDatas.length === 0 ? (
          <></>
        ) : (
          <button
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
            onClick={() => onPageChange(skip + 1)}
          >
            <div className="inner-button flex gap-2">
              {/* <span>Trang tiếp theo</span> */}
              <ArrowRight></ArrowRight>
            </div>
          </button>
        )}
      </div>
    </div>
  );
}

// export default ProductComponentShop

// React.useEffect(() => {
//   setProductData(products);
// }, []);

// lọc theo giá được định sẵn
// React.useEffect(() => {
//   setProductData(products);
//   if (priceFilter.priceFilter > 0) {
//     const sampleProduct = products.filter((product) => {
//       return priceFilter.isHigher
//         ? product.product_price > priceFilter.priceFilter
//         : product.product_price < priceFilter.priceFilter;
//     });

//     setProductData(sampleProduct);
//   } else {
//     setProductData(products);
//   }
// }, [priceFilter]);

// lọc theo giá được nhập vào
// React.useEffect(() => {
//   setProductData(products);
//   if (
//     highLowPrice.highPrice > 0 &&
//     highLowPrice.lowPrice > 0 &&
//     highLowPrice.highPrice > highLowPrice.lowPrice
//   ) {
//     const filteredProducts = products.filter(
//       (product) =>
//         product.product_price >= highLowPrice.lowPrice &&
//         product.product_price <= highLowPrice.highPrice
//     );

//     setProductData(filteredProducts);
//   } else {
//     setProductData([]);
//   }
// }, [highLowPrice]);

// lọc từ cao tới thấp và ngược lại
// React.useEffect(() => {
//   // 1 thấp tới cao
//   // 2 cao tới thấp
//   // 3 random
//   let sortedProducts =
//     productData.length > 0 ? [...productData] : [...products];
//   if (LowToHigh === 1) {
//     sortedProducts.sort((a, b) => a.product_price - b.product_price);
//   } else if (LowToHigh === 2) {
//     sortedProducts.sort((a, b) => b.product_price - a.product_price);
//   }

//   setProductData(sortedProducts);
// }, [LowToHigh]);

// React.useEffect(() => {
//      let sizedProducts = productData.length > 0 ? [...productData] : [...products]

//     // console.log(sizedProducts)
//     console.log(size)
//     console.log(sizedProducts)
//     let filterSizeProduct: IProduct[] = sizedProducts;
//     for (let i = 0; i < size.length; i++) {
//         for (let j = 0; j < sizedProducts.length; j++) {
//             for (let k = 0; k < sizedProducts[j].product_size!.length; k++) {
//                 if (size[i] === sizedProducts[j].product_size![k].size_name) {
//                     filterSizeProduct.filter((e) => e.product_size![k] === sizedProducts[j]);
//                     break;
//                 }
//             }
//         }
//     }

//     setProductData(filterSizeProduct)
// }, [size])

// optimize
// lọc theo size
// React.useEffect(() => {
//   if (size.length > 0) {
//     let sizedProducts =
//       productData.length > 0 ? [...productData] : [...products];
//     const filteredProducts = sizedProducts.filter((product) =>
//       product.product_sizes?.some((productSize) =>
//         size.includes(productSize.size_name)
//       )
//     );
//     setProductData(filteredProducts);
//   } else {
//     setProductData(products);
//   }
// }, [size]);

// lọc theo màu
// React.useEffect(() => {
//   console.log(color);
//   let coloredProducts = [...products];
//   if (color) {
//     const fliterColorProducts = coloredProducts.filter((product) =>
//       product.product_colors?.some(
//         (prodColor) => color === prodColor.color_code
//       )
//     );
//     console.log(fliterColorProducts);
//     setProductData(fliterColorProducts);
//   } else {
//     setProductData(products);
//   }
// }, [color]);
