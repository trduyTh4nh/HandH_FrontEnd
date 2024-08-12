import { ICategory } from "../../types/category";

import {
    ArrowRight
} from "@mui/icons-material";

const boxCategory: React.FC<ICategory> = (props) => {
    const { category_name, cagtegory_image, category_total } = props
    return (
        <div className="flex justify-between items-center py-2 px-2 hover:bg-gray-300 hover:cursor-pointer duration-300 rounded-3xl">
            <div className="flex gap-4">
                <div className="image-category flex items-center justify-center border-2 p-3 rounded-full">
                    <img className="w-8 h-8 scale-150" src={cagtegory_image} alt="" />
                </div>
                <div className="infomation-cate">
                    <div className="name-cate">
                        <p className="text-black font-bold">{category_name} </p>
                    </div>
                    <div className="total-cate">
                        <p className="text-gray-200 text-sm">{category_total} sản phẩm liên quan</p>
                    </div>
                </div>
            </div>
            <div className="cate-info-right">
                <ArrowRight className="text-black"></ArrowRight>
            </div>
        </div>
    )
}

export default boxCategory