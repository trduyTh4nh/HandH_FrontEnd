import React, { useState, useEffect } from "react";
import '../../styles/blog.css';
import { getPosts } from "@/apis/blog/blog-repo";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const Blog: React.FC = () => {
    const [posts, setPosts] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getPosts();
            if (data) {
                setPosts(data);
            }
        };
        fetchData();
    }, []);

    // Cài đặt cho slider
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
    };

    return (
        <div className="entire-page">
            <div className="header">
                <h2 style={{ fontWeight: "bold", fontSize: 36 }}>Hoạt động cửa hàng</h2>
                <p>{posts.length} bài đăng</p>
                <div className="divider"></div>
            </div>
            <div className="body">
                <div className="column-center">
                    <div className="containe-center">
                        {posts.map((post) => (
                            <div key={post._id} className="post-container">
                                <div className="post-header">
                                    <div className="post-header-right">
                                        <img
                                            src="https://lumiere-a.akamaihd.net/v1/images/sea-avatar-wayofwater-gallery06_a360a29e.jpeg?region=1%2C0%2C1298%2C730"
                                            alt="author"
                                            className="circle-image"
                                        />
                                        <div className="post-header-title">
                                            <p style={{ fontSize: 20, fontWeight: "bold" }}>Tác giả</p>
                                            <div className="post-header-title-daypost">
                                                <p style={{ fontSize: 16 }}>{new Date(post.createdAt).toLocaleDateString()}</p>
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
                                                    }}
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
                                            }}
                                        />
                                    )}
                                </div>

                                <div className="divider-post"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Blog;
