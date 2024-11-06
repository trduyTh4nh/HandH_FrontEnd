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

import {
    Cloud,
    CreditCard,
    Github,
    Keyboard,
    LifeBuoy,
    LogOut,
    Mail,
    MessageSquare,
    Plus,
    PlusCircle,
    Settings,
    User,
    UserPlus,
    Users,
  } from "lucide-react"
   
  import { Button } from "@/components/ui/button"
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
   
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

    const menus=["Edit","Delete","Hight light"]
    const [open,setOpen]=useState(false);   
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
    const [popUpMenu, setPopUpMenu] = React.useState(false);

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
                                            <CircleIcon style={{ color: "black", fontSize: 6, margin: "0 5px" }} />

                                            <p style={{fontSize:16}}>5:24</p>  
                                        </div>
                                    </div>
                               </div>
                               <div className="post-header-left"  style={{ cursor: 'pointer' }}>
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
                                            <CircleIcon style={{ color: "black", fontSize: 6, margin: "0 5px" }} />
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
                
           </div>
           </div>
          
        </>
    )
}


export default Blog