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
import HomeBanner from "../widget/homeBanner";
import HomeIntroduction from "../widget/homeIntroduction";
import {
  Call,
  CallOutlined,
  Diamond,
  DiamondOutlined,
  History,
  StoreOutlined,
} from "@mui/icons-material";
import HomeCategory from "../widget/homeCategory.widget";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import Contacts from "../widget/contacts.widget";

const Home: React.FC = () => {
  return (
    <div id="" className="home-page flex flex-col gap-8 w-full">
      {/* redesign trang home */}
      <HomeBanner
        title="Lorem ipsum dolor sit"
        description="Lorem ipsum dolor sit amet consectetur. Cras urna malesuada nunc eget id magna massa. Nec eget tristique vitae venenatis amet semper. Porta aliquam amet ligula vulputate. Sagittis tincidunt tortor quis pellentesque orci. Orci ac posuere aenean magna magna sed. Tincidunt id nulla nulla dictum ultrices. Suspendisse arcu vel cras lorem tempor."
        image="/sample_image.jpg"
        link=""
        button=""
      />
      <div className="flex flex-col gap-8 px-20">
        <h2 className="text-center">Tại sao chọn chúng tôi?</h2>
        <div className="flex w-full gap-20">
          <HomeIntroduction
            className="flex-1"
            icon={<DiamondOutlined fontSize="large" />}
            title="Sản phẩm chất lượng"
            description="Chúng tôi cung cấp sản phẩm chất lượng nhất, được may một cách kỹ lưỡng bởi những người thợ dày dặn kinh nghiệm."
          />
          <HomeIntroduction
            className="flex-1"
            icon={<History fontSize="large" />}
            title="Kinh nghiệm và uy tín cao"
            description="Xuất phát từ năm 1990, chúng tôi đã trở thành một nhà may được nhiều người, kể cả giới nghệ thuật yêu thích và tin tưởng.."
          />
        </div>
        <h2 className="text-center">Bắt đầu mua sắm</h2>
        <div className="flex gap-20">
          {sampleCategories.map((category: ICategory) => (
            <HomeCategory
              className="flex-1"
              name={category.category_name}
              image={category.cagtegory_image}
            />
          ))}
        </div>
        <h2 className="text-center">Hàng mới</h2>
        <div className="home-new-list-product flex flex-wrap">
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
        <div className="flex gap-4 w-full justify-center">
          <Link to={"/shop"}>
            <Button className="font-bold text-xl px-8">
              Khám phá cửa hàng
            </Button>
          </Link>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="secondary" className="font-bold text-xl px-8">
                Liên hệ chúng tôi qua Zalo
              </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[100%] overflow-auto">
              <DialogHeader>
                <DialogTitle>Quét mã</DialogTitle>
                <DialogDescription>
                  Hãy quét mã này bằng ứng dụng Zalo trên điện thoại của bạn để
                  chat với chúng tôi.
                </DialogDescription>
              </DialogHeader>
              <Accordion type="single" collapsible>
                <AccordionItem value="0">
                  <AccordionTrigger>Cách quét mã</AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col gap-4">
                      <p>
                        Mở ứng dụng Zalo và ấn nút Mã QR ở gần góc trên bên phải
                        của màn hình.
                      </p>
                      <img src="/zalo_tut.png" />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <img src="https://media.discordapp.net/attachments/716878834976161843/1292032540374466561/image.png?ex=67024292&is=6700f112&hm=ef9f817c86af463483c3d54041fe8dcdbe777a1cef5892f4ada6a05741d92f68&=&format=webp&quality=lossless&width=1044&height=1330" />
              <div>
                <h3 className="font-bold">Không thể quét mã?</h3>
                <p>
                  <span>
                    <a href="https://zalo.me/0909893395">Truy cập link này</a>
                  </span>{" "}
                  Hoặc{" "}
                  <span>
                    <a href="tel:0909893395">Gọi điện trực tiếp</a>
                  </span>
                </p>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <h2 className="text-center">Sự kiện nổi bật</h2>
        <div className="banner-event p-8 w-full flex justify-center">
          <CarouselBanner></CarouselBanner>
        </div>
        <h2 className="text-center">Liên hệ với chúng tôi</h2>
        <div className="flex gap-8 w-full justify-center">
          <Contacts
            title="Số điện thoại / Zalo"
            subtitle="0909893395"
            url="tel:0909893395"
            icon={<CallOutlined fontSize="large" />}
          />
          <Contacts
            title="Facebook"
            subtitle="Hanh Huynh"
            url="https://www.facebook.com/profile.php?id=100005597715672"
            icon={
              <img
                src="/Facebook_Logo_Primary.png"
                className="h-[35px] w-[35px]"
              />
            }
          />
          <Contacts
            title="Địa chỉ"
            subtitle="K20, Cư Xã Vĩnh Hội, Phường 6, Quận 4, TP. Hồ Chí Minh, Việt Nam"
            url="https://maps.app.goo.gl/s3e5Dzzh8ziZwAAaA"
            icon={<StoreOutlined fontSize="large" />}
          />
        </div>
        <div className="flex justify-center">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d1183.2701956956064!2d106.6994168288345!3d10.760924365071583!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2s!5e1!3m2!1svi!2s!4v1728117283615!5m2!1svi!2s"
            width="600"
            height="450"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full"
          ></iframe>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
