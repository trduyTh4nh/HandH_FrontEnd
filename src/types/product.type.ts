

export interface IColorProductVariation {
    color_code: string,
    color_price: number,
    color_isPicked: boolean,
    color_name?: string
}

export interface ISizeProductVarication {
    size_name: string,
    size_price: number
    size_isPicked: boolean
}

export interface IProduct {
    product_name?: string,
    product_thumb?: string | File,
    product_description?: string,
    product_price?: number,
    product_slug?: string,
    product_rating?: number,
    product_variations?: any,
    isDraft?: boolean,
    isPublished?: boolean,
    isModified?: (product_name: string) => boolean,
    product_category?: string;
    product_color?: IColorProductVariation[],
    product_size?: ISizeProductVarication[]

}

export enum CateFilter {

}

export const productList: IProduct[] = [
    {
        product_name: "Men's Running Shoes",
        product_thumb: "https://www.hydroscand.se/media/catalog/product/placeholder/default/image-placeholder-base.png",

        product_description: "High-performance running shoes designed for comfort and durability.",
        product_price: 99.99,
        product_slug: "mens-running-shoes",
        product_rating: 4.5,
        product_variations: ["2 kích cỡ", "3 màu sắc"],
        isDraft: false,
        isPublished: true,
        product_category: "Sportswear",
        product_color: [
            { color_code: "#FF5733", color_price: 10.00, color_isPicked: true },
            { color_code: "#3357FF", color_price: 12.00, color_isPicked: false }
        ],
        product_size: [
            { size_name: "M", size_price: 5.00, size_isPicked: true },
            { size_name: "L", size_price: 7.00, size_isPicked: false }
        ]
    },
    {
        product_name: "Women's Yoga Pants",
        product_thumb: "https://www.hydroscand.se/media/catalog/product/placeholder/default/image-placeholder-base.png",

        product_description: "Comfortable and stretchy yoga pants for all activities.",
        product_price: 59.99,
        product_slug: "womens-yoga-pants",
        product_rating: 4.7,
        product_variations: ["2 kích cỡ", "3 màu sắc"],
        isDraft: false,
        isPublished: true,
        product_category: "Activewear",
        product_color: [
            { color_code: "#FFD1DC", color_price: 8.00, color_isPicked: true },
            { color_code: "#808080", color_price: 9.00, color_isPicked: false }
        ],
        product_size: [
            { size_name: "S", size_price: 4.00, size_isPicked: true },
            { size_name: "M", size_price: 6.00, size_isPicked: false }
        ]
    },
    {
        product_name: "Unisex Hoodie",
        product_thumb: "https://www.hydroscand.se/media/catalog/product/placeholder/default/image-placeholder-base.png",

        product_description: "A cozy and stylish hoodie perfect for any weather.",
        product_price: 49.99,
        product_slug: "unisex-hoodie",
        product_rating: 4.8,
        product_variations: ["2 kích cỡ", "3 màu sắc"],
        isDraft: false,
        isPublished: true,
        product_category: "Casualwear",
        product_color: [
            { color_code: "#001F3F", color_price: 10.00, color_isPicked: true },
            { color_code: "#AAAAAA", color_price: 11.00, color_isPicked: false }
        ],
        product_size: [
            { size_name: "L", size_price: 6.00, size_isPicked: true },
            { size_name: "3XL", size_price: 8.00, size_isPicked: false }
        ]
    },
    {
        product_name: "Bluetooth Headphones",
        product_thumb: "https://www.hydroscand.se/media/catalog/product/placeholder/default/image-placeholder-base.png",

        product_description: "Wireless headphones with excellent sound quality and battery life.",
        product_price: 79.99,
        product_slug: "bluetooth-headphones",
        product_rating: 4.9,
        product_variations: ["2 kích cỡ", "3 màu sắc"],
        isDraft: false,
        isPublished: true,
        product_category: "Electronics",
        product_color: [
            { color_code: "#FFD1DC", color_price: 0, color_isPicked: true },
            { color_code: "#FFFFFF", color_price: 0, color_isPicked: false }
        ],
        product_size: [
            { size_name: "2XL", size_price: 8.00, size_isPicked: false }
        ]
    },
    {
        product_name: "Bluetooth Headphones",
        product_thumb: "https://www.hydroscand.se/media/catalog/product/placeholder/default/image-placeholder-base.png",

        product_description: "Wireless headphones with excellent sound quality and battery life.",
        product_price: 79.99,
        product_slug: "bluetooth-headphones",
        product_rating: 4.9,
        product_variations: ["2 kích cỡ", "3 màu sắc"],
        isDraft: false,
        isPublished: true,
        product_category: "Electronics",
        product_color: [
            { color_code: "#FFD1DC", color_price: 0, color_isPicked: true },
            { color_code: "#FFFFFF", color_price: 0, color_isPicked: false }
        ],
        product_size: [
            { size_name: "One Size", size_price: 0, size_isPicked: true }
        ]
    }
];


export const products: IProduct[] = [
    {
        product_name: "Áo Thun Nam",
        product_thumb: "https://www.hydroscand.se/media/catalog/product/placeholder/default/image-placeholder-base.png",

        product_description: "Áo thun nam chất liệu cotton thoáng mát, phù hợp cho mùa hè.",
        product_price: 250000,
        product_slug: "ao-thun-nam",
        product_rating: 4.5,
        product_variations: ["2 kích cỡ", "3 màu sắc"],
        isDraft: false,
        isPublished: true,
        isModified: (name: string) => name !== "Áo Thun Nam",
        product_category: "620c8b3f8b6e934f560e9e5b",
        product_color: [
            { color_code: "#8DB4D2", color_price: 0, color_isPicked: true },
            { color_code: "#FFFFFF", color_price: 0, color_isPicked: false }
        ],
        product_size: [
            { size_name: "S", size_price: 4.00, size_isPicked: true },
            { size_name: "M", size_price: 6.00, size_isPicked: false }
        ]
    },
    {
        product_name: "Giày Thể Thao",
        product_thumb: "https://www.hydroscand.se/media/catalog/product/placeholder/default/image-placeholder-base.png",

        product_description: "Giày thể thao nam, thiết kế năng động, phù hợp cho các hoạt động ngoài trời.",
        product_price: 700000,
        product_slug: "giay-the-thao",
        product_rating: 4.7,
        product_variations: ["2 kích cỡ", "3 màu sắc"],
        isDraft: false,
        isPublished: true,
        isModified: (name: string) => name !== "Giày Thể Thao",
        product_category: "620c8b3f8b6e934f560e9e5b",
        product_color: [
            { color_code: "#8DB4D2", color_price: 0, color_isPicked: true },
            { color_code: "#FFFFFF", color_price: 0, color_isPicked: false }
        ],
        product_size: [
            { size_name: "S", size_price: 4.00, size_isPicked: true },
            { size_name: "M", size_price: 6.00, size_isPicked: false }
        ]
    },
    {
        product_name: "Mũ Lưỡi Trai",
        product_thumb: "https://www.hydroscand.se/media/catalog/product/placeholder/default/image-placeholder-base.png",

        product_description: "Mũ lưỡi trai nam nữ, chất liệu cotton, kiểu dáng thời trang.",
        product_price: 150000,
        product_slug: "mu-luoi-trai",
        product_rating: 4.2,
        product_variations: ["2 kích cỡ", "3 màu sắc"],
        isDraft: false,
        isPublished: true,
        isModified: (name: string) => name !== "Mũ Lưỡi Trai",
        product_category: "620c8b3f8b6e934f560e9e5b",
        product_color: [
            { color_code: "#8DB4D2", color_price: 0, color_isPicked: true },
            { color_code: "#FFFFFF", color_price: 0, color_isPicked: false }
        ],
        product_size: [
            { size_name: "S", size_price: 4.00, size_isPicked: true },
            { size_name: "M", size_price: 6.00, size_isPicked: false }
        ]
    },
    {
        product_name: "Kính Mát",
        product_thumb: "https://www.hydroscand.se/media/catalog/product/placeholder/default/image-placeholder-base.png",

        product_description: "Kính mát thời trang, chống UV, thiết kế sang trọng.",
        product_price: 300000,
        product_slug: "kinh-mat",
        product_rating: 4.8,
        product_variations: ["2 kích cỡ", "3 màu sắc"],
        isDraft: false,
        isPublished: true,
        isModified: (name: string) => name !== "Kính Mát",
        product_category: "620c8b3f8b6e934f560e9e5b",
        product_color: [
            { color_code: "#000", color_price: 0, color_isPicked: true },
            { color_code: "#FFFFFF", color_price: 0, color_isPicked: false }
        ],
        product_size: [
            { size_name: "S", size_price: 4.00, size_isPicked: true },
            { size_name: "M", size_price: 6.00, size_isPicked: false }
        ]
    },
    {
        product_name: "Balo Laptop",
        product_thumb: "https://www.hydroscand.se/media/catalog/product/placeholder/default/image-placeholder-base.png",

        product_description: "Balo laptop chống nước, có nhiều ngăn tiện lợi.",
        product_price: 450000,
        product_slug: "balo-laptop",
        product_rating: 4.6,
        product_variations: ["2 kích cỡ", "3 màu sắc"],
        isDraft: false,
        isPublished: true,
        isModified: (name: string) => name !== "Balo Laptop",
        product_category: "620c8b3f8b6e934f560e9e5b",
        product_color: [
            { color_code: "#000", color_price: 0, color_isPicked: true },
            { color_code: "#FFFFFF", color_price: 0, color_isPicked: false }
        ],
        product_size: [
            { size_name: "S", size_price: 4.00, size_isPicked: true },
            { size_name: "M", size_price: 6.00, size_isPicked: false }
        ]
    },
    {
        product_name: "Đồng Hồ Nam",
        product_thumb: "https://www.hydroscand.se/media/catalog/product/placeholder/default/image-placeholder-base.png",

        product_description: "Đồng hồ nam thời trang, thiết kế cổ điển, chính hãng.",
        product_price: 1200000,
        product_slug: "dong-ho-nam",
        product_rating: 4.9,
        product_variations: ["2 kích cỡ", "3 màu sắc"],
        isDraft: false,
        isPublished: true,
        isModified: (name: string) => name !== "Đồng Hồ Nam",
        product_category: "620c8b3f8b6e934f560e9e5b",
        product_color: [
            { color_code: "#000", color_price: 0, color_isPicked: true },
            { color_code: "#FFFFFF", color_price: 0, color_isPicked: false }
        ],
        product_size: [
            { size_name: "L", size_price: 6.00, size_isPicked: true },
            { size_name: "XL", size_price: 8.00, size_isPicked: false }
        ]
    },
    {
        product_name: "Áo Khoác Nữ",
        product_thumb: "https://www.hydroscand.se/media/catalog/product/placeholder/default/image-placeholder-base.png",

        product_description: "Áo khoác nữ mùa đông, giữ ấm tốt, kiểu dáng thời trang.",
        product_price: 800000,
        product_slug: "ao-khoac-nu",
        product_rating: 4.4,
        product_variations: ["2 kích cỡ", "3 màu sắc"],
        isDraft: false,
        isPublished: true,
        isModified: (name: string) => name !== "Áo Khoác Nữ",
        product_category: "620c8b3f8b6e934f560e9e5b",
        product_color: [
            { color_code: "#000", color_price: 0, color_isPicked: true },
            { color_code: "#FFFFFF", color_price: 0, color_isPicked: false }
        ],
        product_size: [
            { size_name: "L", size_price: 6.00, size_isPicked: true },
            { size_name: "3XL", size_price: 8.00, size_isPicked: false }
        ]
    },
    {
        product_name: "Váy Dạ Hội",
        product_thumb: "https://www.hydroscand.se/media/catalog/product/placeholder/default/image-placeholder-base.png",

        product_description: "Váy dạ hội cao cấp, thiết kế sang trọng cho các buổi tiệc.",
        product_price: 1500000,
        product_slug: "vay-da-hoi",
        product_rating: 4.7,
        product_variations: ["2 kích cỡ", "3 màu sắc"],
        isDraft: false,
        isPublished: true,
        isModified: (name: string) => name !== "Váy Dạ Hội",
        product_category: "620c8b3f8b6e934f560e9e5b",
        product_color: [
            { color_code: "#000", color_price: 0, color_isPicked: true },
            { color_code: "#FFFFFF", color_price: 0, color_isPicked: false }
        ],
        product_size: [
            { size_name: "L", size_price: 6.00, size_isPicked: true },
            { size_name: "2XL", size_price: 8.00, size_isPicked: false }
        ]
    },
    {
        product_name: "Túi Xách",
        product_thumb: "https://www.hydroscand.se/media/catalog/product/placeholder/default/image-placeholder-base.png",

        product_description: "Túi xách thời trang nữ, chất liệu da cao cấp.",
        product_price: 550000,
        product_slug: "tui-xach",
        product_rating: 4.3,
        product_variations: ["2 kích cỡ", "3 màu sắc"],
        isDraft: false,
        isPublished: true,
        isModified: (name: string) => name !== "Túi Xách",
        product_category: "620c8b3f8b6e934f560e9e5b",
        product_color: [
            { color_code: "#000", color_price: 0, color_isPicked: true },
            { color_code: "#FFFFFF", color_price: 0, color_isPicked: false }
        ],
        product_size: [
            { size_name: "L", size_price: 6.00, size_isPicked: true },
            { size_name: "XL", size_price: 8.00, size_isPicked: false }
        ]
    },
    {
        product_name: "Sách Công Nghệ",
        product_thumb: "https://www.hydroscand.se/media/catalog/product/placeholder/default/image-placeholder-base.png",

        product_description: "Sách về công nghệ thông tin, dành cho lập trình viên.",
        product_price: 200000,
        product_slug: "sach-cong-nghe",
        product_rating: 4.6,
        product_variations: ["2 kích cỡ", "3 màu sắc"],
        isDraft: false,
        isPublished: true,
        isModified: (name: string) => name !== "Sách Công Nghệ",
        product_category: "620c8b3f8b6e934f560e9e5b",
        product_color: [
            { color_code: "#8DB4D2", color_price: 0, color_isPicked: true },
            { color_code: "#FFFFFF", color_price: 0, color_isPicked: false }
        ],
        product_size: [
            { size_name: "L", size_price: 6.00, size_isPicked: true },
            { size_name: "3XL", size_price: 8.00, size_isPicked: false }
        ]
    },
    {
        product_name: "Máy Tính Xách Tay",
        product_thumb: "https://www.hydroscand.se/media/catalog/product/placeholder/default/image-placeholder-base.png",

        product_description: "Máy tính xách tay hiệu suất cao, màn hình 15.6 inch.",
        product_price: 150000,
        product_slug: "may-tinh-xach-tay",
        product_rating: 4.8,
        product_variations: ["2 kích cỡ", "3 màu sắc"],
        isDraft: false,
        isPublished: true,
        isModified: (name: string) => name !== "Máy Tính Xách Tay",
        product_category: "620c8b3f8b6e934f560e9e5b",
        product_color: [
            { color_code: "#FFD1DC", color_price: 0, color_isPicked: true },
            { color_code: "#FFFFFF", color_price: 0, color_isPicked: false }
        ],
        product_size: [
            { size_name: "L", size_price: 6.00, size_isPicked: true },
            { size_name: "XL", size_price: 8.00, size_isPicked: false }
        ]
    },
    {
        product_name: "Bộ Đồ Thể Thao",
        product_thumb: "https://www.hydroscand.se/media/catalog/product/placeholder/default/image-placeholder-base.png",

        product_description: "Bộ đồ thể thao nam, chất liệu thoáng mát, thiết kế năng động.",
        product_price: 180000,
        product_slug: "bo-do-the-thao",
        product_rating: 4.5,
        product_variations: ["2 kích cỡ", "3 màu sắc"],
        isDraft: false,
        isPublished: true,
        isModified: (name: string) => name !== "Bộ Đồ Thể Thao",
        product_category: "620c8b3f8b6e934f560e9e5b",
        product_color: [
            { color_code: "#FFD1DC", color_price: 0, color_isPicked: true },
            { color_code: "#FFFFFF", color_price: 0, color_isPicked: false }
        ],
        product_size: [
            { size_name: "L", size_price: 6.00, size_isPicked: true },
            { size_name: "XXL", size_price: 8.00, size_isPicked: false }
        ]
    }
]