import ModalImage from "react-modal-image";
import CircleIcon from "@mui/icons-material/Circle";
import { Button } from "../ui/button";

import Contacts from "../widget/contacts.widget";
import { CallOutlined, StoreOutlined } from "@mui/icons-material";
import "../../styles/aboutUs.css";
import Footer from "../widget/footer";
import PostAbout from "../widget/postAbout";
import { useEffect, useState } from "react";
import { IBlogPost } from "@/types/blog.type";
import { getPosts } from "@/apis/blog/blog-repo";
import Slider from "react-slick";
import { UserCircle } from "lucide-react";

const AboutUs: React.FC = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <div></div>,
    prevArrow: <div></div>,
  };
  const [blogs, setBlogs] = useState<IBlogPost[]>([]);
  const fetchData = async () => {
    const data = await getPosts();
    if (data) {
      setBlogs(data);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div className="flex flex-col">
        <div className="header px-10 md:px-20 flex flex-col gap-4">
          <h3 className="text-lg md:text-2xl text-center pt-10">
            VỀ CHÚNG TÔI
          </h3>
          <h2 className="font-roboto-serif text-center text-2xl md:text-8xl">
            Cửa hàng áo dài uy tín, chất lượng, dày dặn kinh nghiệm
          </h2>
          <p style={{ textAlign: "center" }}>
            Với Hồng Đức, chúng tôi cung cấp các sản phẩm áo dài, đầm, các sản
            phẩm may mặc chất lượng nhất qua hơn 34 năm kinh nghiệm làm việc
            trong ngành và được sự ngưỡng mộ và tin tưởng của nhiều người trong
            giới nghệ thuật.
          </p>
        </div>
        <div className="body flex flex-col">
          <img
            className="w-full imageAbout px-10 py-10"
            src="/banner-prod-min.png"
            alt=""
          />
          <div className="post-end px-10 md:px-20">
            <h2
              style={{
                fontSize: 55,
                fontWeight: "bold",
                textAlign: "center",
                paddingTop: "20px",
                paddingBottom: "30px",
              }}
            >
              Bài đăng mới nhất
            </h2>
            <div className="flex flex-col md:flex-row border border-gray-300 rounded-xl p-3">
              <div className="flex-1">
                {blogs.map((post) => (
                  <div key={post._id} className="post-container">
                    <div className="post-header">
                      <div className="post-header-right">
                        <UserCircle className="md:w-12 md:h-12" />
                        <div className="post-header-title">
                          <p style={{ fontSize: 20, fontWeight: "bold" }}>
                            Tác giả
                          </p>
                          <div className="post-header-title-daypost">
                            <p style={{ fontSize: 16 }}>
                              {new Date(post.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="post-title">
                      <p>{post.content}</p>
                    </div>

                    {/* Hiển thị ảnh */}
                    <div className="post-image">
                      {post.images.length > 1 ? (
                        <Slider {...sliderSettings}>
                          {post.images.map((image, idx) => (
                            <img
                              key={idx}
                              src={image}
                              alt={`Image ${idx + 1}`}
                              style={{
                                width: "100%",
                                height: "auto",
                                objectFit: "cover",
                                borderRadius: "8px",
                                cursor: "pointer", // Thêm hiệu ứng con trỏ
                              }}
                            //   onClick={() => {
                            //     setActiveImage(image);
                            //     setIsZooming(true); // Hiệu ứng phóng to
                            //   }}
                            />
                          ))}
                        </Slider>
                      ) : (
                        <img
                          src={post.images[0]}
                          alt="Single Image"
                          style={{
                            width: "100%",
                            height: "auto",
                            objectFit: "cover",
                            borderRadius: "8px",
                            cursor: "pointer", // Thêm hiệu ứng con trỏ
                          }}
                        />
                      )}
                    </div>

                    <div className="divider-post"></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center py-10">
              <Button variant="secondary" className="font-bold text-xl px-8 ">
                Xem tất cả bài đăng
              </Button>
            </div>
            <h2 className="text-center font-bold">Liên hệ với chúng tôi</h2>
            <div className="flex flex-col md:flex-row gap-8 w-full justify-center pb-10">
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
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default AboutUs;
