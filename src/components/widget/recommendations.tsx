import { getProductsByCate } from "@/apis/products/product-repo";
import { IProduct } from "@/types/product.type";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import ProductItem from "./productItem.widget";
import { Skeleton } from "../ui/skeleton";
import ErrorView from "./Error.widget";
import ProductErrorView from "./productError.widget";
import SkeletonLoadingProductGrid from "./SkeletonGridLoading";

export default function Recommendations(props: {cate: string, currentId: string}) {
    async function getProducts() {
        const res = await getProductsByCate(props.cate);
        if(res instanceof AxiosError) {
            console.log(res);
            return
        }
        //@ts-ignore
        setProducts(res.metadata.filter(e => e._id !== props.currentId));
    }
    const [products, setProducts] = useState<IProduct[]>(null)
    useEffect(() => {
        getProducts();
    }, [])
    return !products ? <SkeletonLoadingProductGrid/> : products.length != 0 ? <div className="grid grid-cols-4">
        {
            products.map((e) => {
                return <ProductItem {...e} />
            })
        }
    </div> : <ProductErrorView count={4} mini title="Không có sản phẩm nào tương tự sản phẩm này." message="Shop không thể tìm thấy sản phẩm nào tương tự như sản phẩm này. Nhưng shop sẽ cố gắng cập nhật sản phẩm để phù hợp với nhu cầu quý khách ☺️." icon="notfound"/>
}