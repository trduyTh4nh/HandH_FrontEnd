import React from "react";
import { ICategory } from "../../types/category";


const CategoryComponent: React.FC<ICategory> = (props) => {

    const {
        category_image,
        category_name,
    } = props
    return (
        <div className="category-home h-48 w-48  border-2 p-2 rounded-full cursor-pointer hover:bg-slate-300 duration-200 ease-linear">
            <div className="category-wrap flex flex-col justify-between items-center gap-4">
                <div className="category-wrap_image p-2">
                    <img src={category_image} alt="" />
                </div>
                <div className="category-wrap_name">
                    <p>{category_name}</p>
                </div>
            </div>
        </div>
    )
}

export default CategoryComponent