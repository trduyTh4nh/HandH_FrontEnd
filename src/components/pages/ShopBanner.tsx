import { useParams } from "react-router-dom"

export default function ShopBanner() {
    const {id} = useParams<{id: string}>()
    return <div className="px-10 md:px-20 pt-4">
        <h1 className="text-3xl">Danh sách sản phẩm cho sự kiện {id}</h1>
    </div>
}