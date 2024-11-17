import React, { useState, useEffect } from "react";
import '../../styles/blog.css';
import { MoreHoriz as MoreHorizIcon } from "@mui/icons-material";
import CircleIcon from '@mui/icons-material/Circle';
import ModalImage from "react-modal-image";
import { getPosts } from "@/apis/blog/blog-repo";


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
                        {posts.map((post, index) => (
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
                                                <CircleIcon style={{ color: "black", fontSize: 6, margin: "0 5px" }} />
                                                <p style={{ fontSize: 16 }}>{new Date(post.createdAt).toLocaleTimeString()}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="post-header-left" style={{ cursor: 'pointer' }}>
                                        <MoreHorizIcon />
                                    </div>
                                </div>
                                <div className="post-title">
                                    <p>{post.content}</p>
                                </div>
                                <div className="post-image">
                                    {post.images.map((image, idx) => (
                                        <ModalImage
                                            key={idx}
                                            small={image}
                                            large={image}
                                            alt={`Image ${idx + 1}`}
                                        />
                                    ))}
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
