import React, { useEffect } from "react";
import "../../styles/home.css";
import ProductItem from "../widget/productItem.widget";
import { IProduct, products } from "../../types/product.type";
import CarouselBanner from "../widget/carouselBanner.widget";
import { render } from "react-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { ICategory, sampleCategories } from "../../types/category";
import CategoryComponent from "../widget/categoryWidget";
import Footer from "../widget/footer";

const Home: React.FC = () => {
  return (
    <div id="" className="home-page flex flex-col gap-8">
      <div className="home-banner ">
        <div className="home-banner-wrap flex relative">
          <div className="home-image-banner ">
            <img className="h-full" src="\src\assets\image\banner.png" alt="" />
          </div>
          <div className="home-banner-opacity bg-white opacity-45 absolute w-full "></div>
          <div className="home-text-banner flex flex-col gap-8 absolute  ">
            <div className="home-banner-text flex gap-2 flex-col">
              <div className="home-banner-text_bottom flex gap-4">
                <p>SẢN PHẨM </p>
                <p className="italic">Linen</p>
              </div>
              <p className="home-banner-text_quality">
                CHẤT LƯỢNG NHẤT CHO MỌI NGƯỜI
              </p>
            </div>
            <div className="home-banner-button flex gap-6">
              <div className="banner-button_explore">
                <input
                  type="button"
                  className="bg-white px-6 py-4 rounded-full font-bold hover:opacity-50 hover:cursor-pointer duration-700 ease-linear"
                  value="Khám phá cửa hàng"
                />
              </div>
              <div className="banner-button_contact">
                <input
                  type="button"
                  className="bg-white px-6 py-4 rounded-full font-bold hover:opacity-50 hover:cursor-pointer duration-700 ease-linear"
                  value="Liên hệ chúng tôi"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="home-branch h-10 mt-20 mb-4 w-full">
        {/* <SplideComponent></SplideComponent> */}
      </div>

      <div className="home-new-product  mt-4 w-full flex flex-col justify-center">
        <div className="home-new-product_title w-full text-center py-12">
          <p className="">Hàng mới</p>
        </div>

        {/* Cái này phải đóng vào 1 component riêng do làm vội nên chưa  */}
        <div className="home-new-list-product px-20 py-4 flex flex-wrap">
          {products.length > 0 ? (
            products.map((product: IProduct, index: number) => (
              <div className="wrap-product">
                <ProductItem
                  key={index}
                  product_name={product.product_name}
                  product_price={product.product_price}
                  product_thumb={product.product_thumb}
                  product_variations={product.product_variations}
                />
              </div>
            ))
          ) : (
            <p>Không có sản phẩm nào để hiển thị</p>
          )}
        </div>
      </div>

      <div className="event flex flex-col gap-4 py-4">
        <div className="title-event">
          <div className="home-new-product_title w-full text-center py-4">
            <p className="">Các sự kiện nỗi bật</p>
          </div>

          <div className="banner-event p-8 w-full flex justify-center">
            <CarouselBanner></CarouselBanner>
          </div>
        </div>
      </div>

      <div className="trend">
        <div className="title-trend">
          <div className="home-new-product_title w-full text-center pb-4">
            <p className="">Xu hướng thời trang</p>
          </div>

          <div className="home-category flex w-full justify-center gap-24 items-center">
            {sampleCategories.map((e: ICategory) => (
              <CategoryComponent
                category_name={e.category_name}
                cagtegory_image={e.cagtegory_image}
                category_description={e.category_description}
                category_total={e.category_total}
              ></CategoryComponent>
            ))}
          </div>
        </div>
        <div className="mt-16">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Home;
