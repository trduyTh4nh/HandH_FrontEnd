import React, { useEffect } from "react";
import { IProduct, productList, products } from "../../types/product.type";
import ProductItem from "./productItem.widget";
import { TypeFilterPice, TypeObjPrice } from "../../types/some.type";
import { getProduct, getProductFilter } from "@/apis/products/product-repo";
import SkeletonLoadingProduct from "./skeletonLoadingProduct";
import SkeletonLoadingProductGrid from "./SkeletonGridLoading";
// import { forEach } from "@splidejs/splide/src/js/utils";

export default function ProductComponentShop({
  priceFilter,
  color,
  size,
  LowToHigh,
  highLowPrice,
}: {
  priceFilter: TypeFilterPice;
  color: string;
  size: string[];
  LowToHigh: number;
  highLowPrice: TypeObjPrice;
}) {
  const [productData, setProductData] = React.useState<IProduct[]>([]);
  const [loading, setLoading] = React.useState(true);

  const fetchProFilter = async () => {
    const filter: any = {};

    if (priceFilter?.priceFilter) {
      filter.pricesFilter = {
        price: priceFilter.priceFilter,
        isUp: priceFilter.isHigher,
      };
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

    const skip = 0;
    const take = 10;

    console.log("FILTER: ", filter);
    try {
      var result;

      if (Object.keys(filter).length > 0) {
        const response = await getProductFilter(filter, skip, take);
        result = response;
      } else {
        const responseDefault = await getProduct();
        result = responseDefault;
      }

      return result.metadata;
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  };

  React.useEffect(() => {
    (async () => {
      setLoading(true);
      const response = await fetchProFilter();
      setProductData(response.filterProduct || []);
      setLoading(false);
      console.log("data: ", response);
    })();
  }, [priceFilter, color, size, LowToHigh, highLowPrice]);

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

  return (
    <>
      <div className="home-new-list-product py-4 flex flex-wrap">
        {loading ? (
          <SkeletonLoadingProductGrid></SkeletonLoadingProductGrid>
        ) : productData.length > 0 ? (
          productData.map((product: IProduct, index: number) => (
            <div className="wrap-product" key={product._id}>
              <ProductItem
                key={product._id}
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
    </>
  );
}

// export default ProductComponentShop
