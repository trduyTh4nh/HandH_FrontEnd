import { ICategory } from "../../types/category";

import {
    ArrowRight
} from "@mui/icons-material";

const boxCategory: React.FC<ICategory> = (props) => {
    const { category_name, category_image, category_total } = props
    return (
        <div className="flex justify-between items-center py-2 px-2 hover:bg-gray-300 hover:cursor-pointer duration-300 rounded-3xl">
            <div className="flex gap-4">
                <div className="image-category flex items-center justify-center border-2 rounded-full">
                    <img className="w-8 h-8 rounded-full object-coverƒ scale-150" src={category_image} alt="" />
                </div>
                <div className="infomation-cate">
                    <div className="name-cate">
                        <p className="text-black font-bold">{category_name}</p>
                    </div>
                    <div className="total-cate">
                        <p className="text-gray-400 text-sm">{category_total} sản phẩm liên quan</p>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default boxCategory