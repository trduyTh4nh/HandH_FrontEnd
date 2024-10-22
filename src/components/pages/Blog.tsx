import React, { useState } from "react";
import '../../styles/blog.css'
import { SearchOutlined } from "@mui/icons-material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { NavLink } from "react-router-dom";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CircleIcon from '@mui/icons-material/Circle';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "../ui/input";
import ModalImage from "react-modal-image";

const navLinks = [
    {
      path: "post",
      icon: <ModeEditOutlineOutlinedIcon />,
      display: "Đăng bài",
    },
    {
      path: "postManager",
      icon: <AdminPanelSettingsOutlinedIcon />,
      display: "Quản lý bài viết",
    },
  
  ];
const Blog: React.FC = () => {
    const [key, setKey] = React.useState<string>("")
    const hanldeOnKeyDown = (e: any): void => {
        if (e.key === 'Enter') {
            console.log(key)
        }
    }
    const [isOpen, setIsOpen] = useState(false);
    const [imageSrc, setImageSrc] = useState("");

    const handleImageClick = (src) => {
        setImageSrc(src);
        setIsOpen(true);
    };
    const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(isMenuOpen);
  };
    const [isAddBlogOpen, setIsAddBlogOpen] = React.useState(false);
    return (
        <>
           <div className="entire-page">
                <div className="header">
                <h2 style={{fontWeight:"bold",fontSize:36}}>Hoạt động cửa hàng</h2>
                <p>2415 bài đăng</p>
                <div className="divider"></div>
                </div>   
                <div className="body">
                <div className="column-left">

                    <div className="container-left">
                        <div className="bg-search-field flex items-center gap-2 px-3 py-1 rounded-full">
                            <SearchOutlined className="text-black"></SearchOutlined>
                            <div>
                                <input
                                onChange={(e) => {
                                    var value: string = e.target.value
                                    console.log(value)
                                    setKey(value)
                                }}
                                onKeyDown={hanldeOnKeyDown}
                                type="text"
                                placeholder="Tìm kiếm"
                                className="bg-transparent text-black py-2  border-0 focus:border-0 focus:outline-none w-40 placeholder:font-bold"
                                />
                            </div>
               
                         </div>
                         <div className="divider"></div>
                            {/* <ul className='nav__list text-color-primary'>
                            {navLinks.map((item, index) => (
                                <li className='ml-2 mr-8 nav__item' key={index}>
                                <NavLink
                                to={item.path}
                                className={navClass =>
                                navClass.isActive ? "nav__active nav__link" : "nav__link"
                                }
                                >
                                <span>
                                <i className='icon-sidebar'>{item.icon}</i>
                                </span>
                                <p>{item.display}</p>
                                </NavLink>
                                </li>
                                ))}
                            </ul> */}
                            <div className="container-left-item" >
                                <Dialog open={isAddBlogOpen} onOpenChange ={setIsAddBlogOpen} >
                                    <DialogTrigger asChild>
                                        <div className="container-left-item-abc" >
                                            <ModeEditOutlineOutlinedIcon />
                                            <h3>Đăng bài</h3>
                                        </div>

                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[1000px]">
                                        <DialogHeader>
                                            <DialogTitle>
                                                Thêm bài post
                                            </DialogTitle>
                                            <div  className="flex gap-8 px-4">
                                                <div className="grid gap-4 py-4 max-h-[70vh]   flex-1 w-32 overflow-x-auto">
                                                    <div className="grid grid-cols-1 items-center">
                                                        <Label htmlFor="new-cate-name" className="text-left">
                                                            Tiêu đề bài post
                                                        </Label>
                                                        <Input
                                                            className="w-full"
                                                                id="new-cate-name"
                                                                name="category_name"
                                                                
                                                        />
                                                    </div>
                                                    {/* uploadiamge here */}
                                                </div>
                                            </div>
                                        </DialogHeader>
                                    </DialogContent>
                                </Dialog>
                                <div className="container-left-item-abc">
                                <AdminPanelSettingsOutlinedIcon />
                                <h3> Quản lý bài viết</h3>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                 <div className="column-center">
                    <div className="containe-center">
                        <div className="post-container">
                            <div className="post-header">
                               <div className="post-header-right">
                                    <img src="https://lumiere-a.akamaihd.net/v1/images/sea-avatar-wayofwater-gallery06_a360a29e.jpeg?region=1%2C0%2C1298%2C730" alt="example image" className="circle-image" />

                                    <div className="post-header-title">
                                        <p style={{fontSize:20,fontWeight:"bold"}}>Tác giả</p>
                                        <div className="post-header-title-daypost">
                                            <p style={{fontSize:16}}>10/10/2024</p>  
                                            <CircleIcon style={{color:"black",fontSize:6}}/>
                                            <p style={{fontSize:16}}>5:24</p>  
                                        </div>
                                    </div>
                               </div>
                               <div className="post-header-left">
                               <MoreHorizIcon onClick={handleMenuToggle} style={{ cursor: 'pointer' }} />
                                    {isMenuOpen && (
                                        <div className="popup-menu">
                                        <ul>
                                            <li>Edit Post</li>
                                            <li>Delete Post</li>
                                        </ul>
                                        </div>
                                    )}

                               </div>
                            </div>
                            <div className="post-title">
                                <p>
                                Lorem ipsum dolor sit amet consectetur. Sit facilisis eros sed pretium egestas morbi scelerisque. Posuere neque blandit eu tortor dui est duis. Aenean varius ultricies pretium posuere sollicitudin nec viverra purus quis. Gravida vulputate enim velit ornare consectetur. Integer ac cursus aliquam id vulputate tortor proin. In elit nam aliquet tortor diam.
                                </p>
                            </div>
                            <div className="post-image">
                                <ModalImage
                                    small="https://cly.1cdn.vn/2022/05/10/anh-nen-avatar-dep_021652403.jpg"
                                    large="https://cly.1cdn.vn/2022/05/10/anh-nen-avatar-dep_021652403.jpg"
                                    alt="Post"
                               />
                                {/* <img src="https://cly.1cdn.vn/2022/05/10/anh-nen-avatar-dep_021652403.jpg"
                                    
                                /> */}
                            </div>
                          
                            <div className="divider-post"></div>
                        </div>
                        <div className="post-container">
                            <div className="post-header">
                               <div className="post-header-right">
                                    <img src="https://images.theconversation.com/files/38926/original/5cwx89t4-1389586191.jpg?ixlib=rb-4.1.0&q=45&auto=format&w=926&fit=clip" alt="example image" className="circle-image" />

                                    <div className="post-header-title">
                                        <p style={{fontSize:20,fontWeight:"bold"}}>Tác giả</p>
                                        <div className="post-header-title-daypost">
                                            <p style={{fontSize:16}}>10/10/2024</p>  
                                            <CircleIcon style={{color:"black",fontSize:6}}/>
                                            <p style={{fontSize:16}}>5:24</p>  

                                        </div>
                                    </div>
                               </div>
                               <div className="post-header-left">
                                    <MoreHorizIcon />

                               </div>
                            </div>
                            <div className="post-title">
                                <p>
                                Lorem ipsum dolor sit amet consectetur. Sit facilisis eros sed pretium egestas morbi scelerisque. Posuere neque blandit eu tortor dui est duis. Aenean varius ultricies pretium posuere sollicitudin nec viverra purus quis. Gravida vulputate enim velit ornare consectetur. Integer ac cursus aliquam id vulputate tortor proin. In elit nam aliquet tortor diam.
                                </p>
                            </div>
                            <div className="post-image">
                                <img src="https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/01/meme-la-gi-4.jpg"/>
                            </div>
                            <div className="divider-post"></div>
                        </div>
                        

                    </div>
                 </div>
                 <div className="column-right">
                    <div className="container-right">
                        <h3 style={{fontWeight:"bold", fontSize:24}}>Theo dõi cửa hàng trên</h3>
                        <div className="divider"></div>
                        <a href="https://www.facebook.com/ntduy200503">

                        <div className="item-container-right">
                            <img className="cicrle-item" src="https://store-images.s-microsoft.com/image/apps.37935.9007199266245907.b029bd80-381a-4869-854f-bac6f359c5c9.91f8693c-c75b-4050-a796-63e1314d18c9" alt="facebook" />
                            <p>Facebook</p>
                        
                        
                        </div>
                        </a>
                            <a href="https://www.tiktok.com/@nguyenduy665" >
                            <div className="item-container-right">

                            <img className="cicrle-item" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2iFQ46LsrIPl7KiVrOMHavMz-zDJzLsre3w&s" alt="tiktok" />
                            <p>Tiktok</p>
                            </div>
                            </a>
                         
                        </div>
                 </div>
           </div>
           </div>
          
        </>
    )
}


export default Blog