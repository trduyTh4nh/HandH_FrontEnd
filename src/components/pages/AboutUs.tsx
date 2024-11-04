import ModalImage from "react-modal-image";
import CircleIcon from '@mui/icons-material/Circle';
import { Button } from "../ui/button";

import Contacts from "../widget/contacts.widget";
import {
    CallOutlined,
    StoreOutlined,
  } from "@mui/icons-material";
import PostAbout from "../widget/PostAbout";
import '../../styles/aboutUs.css'
import Footer from "../widget/footer";



const AboutUs:React.FC=()=>{
    return (
        <>
       <div className="flex flex-col">

            <div className="header px-20">
                <h3 className="text-2xl text-center pt-10">VỀ CHÚNG TÔI</h3>
                <h2 className="font-roboto-serif text-center"  style={{fontSize:100}}>Cửa hàng áo dài uy tín, chất lượng, dày dặn kinh nghiệm</h2>
                <p style={{fontSize:25, textAlign:"center"}}>Với Hồng Đức, chúng tôi cung cấp các sản phẩm áo dài, đầm, các sản phẩm may mặc chất lượng nhất qua hơn 34 năm kinh nghiệm làm việc trong ngành và được sự ngưỡng mộ và tin tưởng của nhiều người trong giới nghệ thuật.</p>
            </div>
            <div className="body flex flex-col">
                        <img className="w-full imageAbout px-10 py-10" src="https://lavenderstudio.com.vn/wp-content/uploads/2022/12/chup-hinh-ao-dai-uy-tin-10.jpg" alt="" />
                    <div className="post-end px-20">
                        <h2  style={{fontSize:55,fontWeight:"bold", textAlign:"center", paddingTop:"20px",paddingBottom:"30px"}}>Bài đăng mới nhất</h2>
                        <div className="flex flex-row border border-gray-300 rounded-xl p-3">
                            <div className="flex-1 ">
                                <PostAbout/>
                            </div>
                            <div className="flex-1 px-5">
                                <PostAbout/>
                            </div>
                            <div className="flex-1 ">
                                <PostAbout/>
                            </div>
                        </div>
                        <div className="flex justify-center py-10">

                            <Button variant="secondary" className="font-bold text-xl px-8 ">
                                Xem tất cả bài đăng
                            </Button>
                        </div>
                        <h2 className="text-center font-bold">Liên hệ với chúng tôi</h2>
                    <div className="flex gap-8 w-full justify-center pb-10">
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
    )
}

export default AboutUs
