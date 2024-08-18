
export interface IProduct {
    product_name?: string,
    product_thumb?: string,
    product_description?: string,
    product_price: number,
    product_slug?: string,
    product_rating?: number,
    product_variations?: any,
    isDraft?: boolean,
    isPublished?: boolean,
    isModified?: (product_name: string) => boolean,
    product_category?: string;
}


export const products: IProduct[] = [
    {
        product_name: "Áo Thun Nam",
        product_thumb: "https://example.com/images/aothun.jpg",
        product_description: "Áo thun nam chất liệu cotton thoáng mát, phù hợp cho mùa hè.",
        product_price: 250000,
        product_slug: "ao-thun-nam",
        product_rating: 4.5,
        product_variations: ["2 kích cỡ", "3 màu sắc"],
        isDraft: false,
        isPublished: true,
        isModified: (name: string) => name !== "Áo Thun Nam",
        product_category: "620c8b3f8b6e934f560e9e5b" // Ví dụ ObjectId của category
    },
    {
        product_name: "Giày Thể Thao",
        product_thumb: "https://example.com/images/giaythethao.jpg",
        product_description: "Giày thể thao nam, thiết kế năng động, phù hợp cho các hoạt động ngoài trời.",
        product_price: 700000,
        product_slug: "giay-the-thao",
        product_rating: 4.7,
        product_variations: ["2 kích cỡ", "3 màu sắc"],
        isDraft: false,
        isPublished: true,
        isModified: (name: string) => name !== "Giày Thể Thao",
        product_category: "620c8b3f8b6e934f560e9e5b"
    },
    {
        product_name: "Mũ Lưỡi Trai",
        product_thumb: "https://example.com/images/muluoitrai.jpg",
        product_description: "Mũ lưỡi trai nam nữ, chất liệu cotton, kiểu dáng thời trang.",
        product_price: 150000,
        product_slug: "mu-luoi-trai",
        product_rating: 4.2,
        product_variations: ["2 kích cỡ", "3 màu sắc"],
        isDraft: false,
        isPublished: true,
        isModified: (name: string) => name !== "Mũ Lưỡi Trai",
        product_category: "620c8b3f8b6e934f560e9e5b"
    },
    {
        product_name: "Kính Mát",
        product_thumb: "https://example.com/images/kinhmat.jpg",
        product_description: "Kính mát thời trang, chống UV, thiết kế sang trọng.",
        product_price: 300000,
        product_slug: "kinh-mat",
        product_rating: 4.8,
        product_variations: ["2 kích cỡ", "3 màu sắc"],
        isDraft: false,
        isPublished: true,
        isModified: (name: string) => name !== "Kính Mát",
        product_category: "620c8b3f8b6e934f560e9e5b"
    },
    {
        product_name: "Balo Laptop",
        product_thumb: "https://example.com/images/balo.jpg",
        product_description: "Balo laptop chống nước, có nhiều ngăn tiện lợi.",
        product_price: 450000,
        product_slug: "balo-laptop",
        product_rating: 4.6,
        product_variations: ["2 kích cỡ", "3 màu sắc"],
        isDraft: false,
        isPublished: true,
        isModified: (name: string) => name !== "Balo Laptop",
        product_category: "620c8b3f8b6e934f560e9e5b"
    },
    {
        product_name: "Đồng Hồ Nam",
        product_thumb: "https://example.com/images/donghonam.jpg",
        product_description: "Đồng hồ nam thời trang, thiết kế cổ điển, chính hãng.",
        product_price: 1200000,
        product_slug: "dong-ho-nam",
        product_rating: 4.9,
        product_variations: ["2 kích cỡ", "3 màu sắc"],
        isDraft: false,
        isPublished: true,
        isModified: (name: string) => name !== "Đồng Hồ Nam",
        product_category: "620c8b3f8b6e934f560e9e5b"
    },
    {
        product_name: "Áo Khoác Nữ",
        product_thumb: "https://example.com/images/aokhoacnu.jpg",
        product_description: "Áo khoác nữ mùa đông, giữ ấm tốt, kiểu dáng thời trang.",
        product_price: 800000,
        product_slug: "ao-khoac-nu",
        product_rating: 4.4,
        product_variations: ["2 kích cỡ", "3 màu sắc"],
        isDraft: false,
        isPublished: true,
        isModified: (name: string) => name !== "Áo Khoác Nữ",
        product_category: "620c8b3f8b6e934f560e9e5b"
    },
    {
        product_name: "Váy Dạ Hội",
        product_thumb: "https://example.com/images/vaydahoi.jpg",
        product_description: "Váy dạ hội cao cấp, thiết kế sang trọng cho các buổi tiệc.",
        product_price: 1500000,
        product_slug: "vay-da-hoi",
        product_rating: 4.7,
        product_variations: ["2 kích cỡ", "3 màu sắc"],
        isDraft: false,
        isPublished: true,
        isModified: (name: string) => name !== "Váy Dạ Hội",
        product_category: "620c8b3f8b6e934f560e9e5b"
    },
    {
        product_name: "Túi Xách",
        product_thumb: "https://example.com/images/tui.jpg",
        product_description: "Túi xách thời trang nữ, chất liệu da cao cấp.",
        product_price: 550000,
        product_slug: "tui-xach",
        product_rating: 4.3,
        product_variations: ["2 kích cỡ", "3 màu sắc"],
        isDraft: false,
        isPublished: true,
        isModified: (name: string) => name !== "Túi Xách",
        product_category: "620c8b3f8b6e934f560e9e5b"
    },
    {
        product_name: "Sách Công Nghệ",
        product_thumb: "https://example.com/images/sachcongnghe.jpg",
        product_description: "Sách về công nghệ thông tin, dành cho lập trình viên.",
        product_price: 200000,
        product_slug: "sach-cong-nghe",
        product_rating: 4.6,
        product_variations: ["2 kích cỡ", "3 màu sắc"],
        isDraft: false,
        isPublished: true,
        isModified: (name: string) => name !== "Sách Công Nghệ",
        product_category: "620c8b3f8b6e934f560e9e5b"
    },
    {
        product_name: "Máy Tính Xách Tay",
        product_thumb: "https://example.com/images/maytinh.jpg",
        product_description: "Máy tính xách tay hiệu suất cao, màn hình 15.6 inch.",
        product_price: 15000000,
        product_slug: "may-tinh-xach-tay",
        product_rating: 4.8,
        product_variations: ["2 kích cỡ", "3 màu sắc"],
        isDraft: false,
        isPublished: true,
        isModified: (name: string) => name !== "Máy Tính Xách Tay",
        product_category: "620c8b3f8b6e934f560e9e5b"
    },
    {
        product_name: "Bộ Đồ Thể Thao",
        product_thumb: "https://example.com/images/bodothethao.jpg",
        product_description: "Bộ đồ thể thao nam, chất liệu thoáng mát, thiết kế năng động.",
        product_price: 350000,
        product_slug: "bo-do-the-thao",
        product_rating: 4.5,
        product_variations: ["2 kích cỡ", "3 màu sắc"],
        isDraft: false,
        isPublished: true,
        isModified: (name: string) => name !== "Bộ Đồ Thể Thao",
        product_category: "620c8b3f8b6e934f560e9e5b"
    }
]