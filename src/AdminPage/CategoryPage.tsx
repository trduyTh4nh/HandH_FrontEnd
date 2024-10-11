import {
  IColorcateVariation,
  Icate,
  ISizecateVarication,
} from "@/types/cate.type";
import { Button } from "@/components/ui/button";
import CateRepo from "@/apis/cate/cate-repo";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Eye,
  EyeOff,
  MoreHorizontalIcon,
  Pencil,
  Plus,
  Trash2,
  Upload,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TableBody } from "@mui/material";
import { Switch } from "@/components/ui/switch";
import { convertMoney } from "@/utils";
import React, { useEffect, useState } from "react";
import { ICategory } from "@/types/category";



const CategoryPage: React.FC = () => {

  const [isAddCateOpen, setIsAddCateOpen] = React.useState(false);
  const [editingCate, setEditingCate] = React.useState<ICategory | null>(
    null
  );
  const[cates,setCate]=React.useState<ICategory[]>([
    //   {
    //     category_name: 'Áo đầm',
    //     category_description: 'Latest gadgets and electronics.',
    //     cagtegory_image: 'https://png.pngtree.com/png-clipart/20231005/original/pngtree-red-dress-for-party-png-image_13123155.png',
    //     category_total: 150,
    //     createdAt:"2024-10-06T03:23:54.240Z",
    //     updatedAt:"2024-10-06T03:23:54.240Z"
    // },
    // {
    //     category_name: 'Áo',
    //     category_description: 'A wide range of books from various genres.',
    //     cagtegory_image: 'https://hoaigiangshop.com/wp-content/uploads/2023/08/trang-phuc-hoi-giao-nu-dubai-1.jpg',
    //     category_total: 200,
    //      createdAt:"2024-10-06T03:23:54.240Z",
    //     updatedAt:"2024-10-06T03:23:54.240Z"
    // },
    // {
    //     category_name: 'Quần',
    //     category_description: 'Trendy and fashionable clothing items.',
    //     cagtegory_image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0LnxlU-YBDF8N6oFYq3sg3M0rOUQjGnzTMg&s',
    //     category_total: 300,
    //      createdAt:"2024-10-06T03:23:54.240Z",
    //     updatedAt:"2024-10-06T03:23:54.240Z"
    // },
    // {
    //     category_name: 'Áo khoác',
    //     category_description: 'Trendy and fashionable clothing items.',
    //     cagtegory_image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIHcG9x7MHG3vv9LOGzXonQj-oHjHW2jCAZw&s',
    //     category_total: 300,
    //      createdAt:"2024-10-06T03:23:54.240Z",
    //     updatedAt:"2024-10-06T03:23:54.240Z"
    // }
  ])

  
  const [newCate, setNewcate] = React.useState<ICategory>({
    category_name: "",
    category_description: "",
    cagtegory_image: "",
    category_total: 0,
    createdAt:"",
    updatedAt:""
    
  });
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    isNewCate: boolean = false
  ) => {
    const { name, value } = e.target;
    if (isNewCate) {
      setNewcate((prev) => ({
        ...prev,
        [name]:
          name === "category_total" 
            ? parseFloat(value)
            : value,
      }));
    } else if (editingCate) {
      setEditingCate((prev) => ({
        ...prev,
        [name]:
          name === "category_total"
            ? parseFloat(value)
            : value,
      }));
    }
  };
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewcate((prev) => ({
          ...prev,
          cagtegory_image: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const cateRepo = new CateRepo();
  const fetchCates = async () => {
    const response = await cateRepo.getCate(); // Gọi API qua CateRepo
    console.log(response);
  };

  useEffect(() => {
    const fetchCates = async () => {
      const response = await cateRepo.getCate(); // Gọi API qua CateRepo
      console.log(response);
    };
  });
  
  const handleRemove = (cateName: string) => {
    setCate(cates.filter((p) => p.category_name !== cateName));
  };
  const handleAddcate = () => {
    const productSlug =
      newCate.category_name?.toLowerCase().replace(/ /g, "-") || "";
    const CateToAdd = {
      ...newCate,
      product_slug: productSlug,
    };
    setCate((prev) => [...prev, CateToAdd]);
    setNewcate({
      category_name: "",
      category_description: "",
      cagtegory_image: "",
      category_total: 0,
      createdAt: "",
      updatedAt: "",
      
    });
    setIsAddCateOpen(false);
  };

  return (
    <div className="space-y-6 w-full p-8 h-screen">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">
          Danh sách loại sản phẩm
        </h2>
        <Dialog open={isAddCateOpen} onOpenChange={setIsAddCateOpen}>
            <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Thêm loại sản phẩm
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[1000px]">

          <DialogHeader>
              <DialogTitle>Thêm loại sản phẩm mới</DialogTitle>
            </DialogHeader>
            <div className="flex gap-8 px-4">
              <div className="grid gap-4 py-4 max-h-[70vh]   flex-1 w-32 overflow-x-auto">
                <div className="grid grid-cols-1 items-center">
                  <Label htmlFor="new-cate-name" className="text-left">
                    Tên
                  </Label>
                  <Input
                    className="w-full"
                    id="new-cate-name"
                    name="cate_name"
                    value={newCate.category_name}
                    onChange={(e) => handleInputChange(e, true)}
                  />
                </div>
                <div className="grid grid-cols-1 items-center">
                  <Label
                    htmlFor="new-cate-description"
                    className="text-left"
                  >
                    Mô tả
                  </Label>
                  <Textarea
                    id="new-cate-description"
                    name="cate_description"
                    value={newCate.category_description}
                    onChange={(e) => handleInputChange(e, true)}
                  />
                </div>
                <div className="grid grid-cols-1 items-center ">
                  <Label htmlFor="new-cate-price" className="text-left">
                    Giá
                  </Label>
                  <Input
                    id="new-cate-price"
                    name="cate_price"
                    type="number"
                    value={newCate.category_total}
                    onChange={(e) => handleInputChange(e, true)}
                  />
                </div>
                
              </div>
              {/*  */}
              <div className="grid gap-4 py-4 max-h-[70vh]  flex-initial w-80 overflow-y-auto">
                {" "}
                
                <div className="grid grid-cols-1 items-center gap-4">
                  <Label htmlFor="new-cate-image" className="text-left">
                    Hình ảnh
                  </Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="new-cate-image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <Label
                      htmlFor="new-cate-image"
                      className="cursor-pointer"
                    >
                      <div className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-md">
                        <Upload className="h-4 w-4" />
                        Đăng tải hình ảnh
                      </div>
                    </Label>
                    {newCate.cagtegory_image && (
                      <img
                        src={newCate.cagtegory_image}
                        alt="cate"
                        className="w-16 h-16 object-cover rounded"
                      />
                    )}
                  </div>
                </div>
                
                
                
              </div>
            </div>
            <div className="flex justify-end">
              <Button onClick={handleAddcate}>Thêm sản phẩm</Button>
            </div>
          </DialogContent>
          
        </Dialog>
      </div>
      <Card>
        <CardContent>

          <Table>
            <TableHeader>
               <TableRow>
            <TableHead>Hình ảnh</TableHead>

               <TableHead>Tên</TableHead>
                <TableHead>Gía</TableHead>
                <TableHead>Hành động</TableHead>
               </TableRow>
            </TableHeader>
            <TableBody>
              {
                cates.map((category)=>(<TableRow key={category.category_name}>
                  <TableCell>
                  <img
                      className="w-20 h-20 rounded-md object-contain"
                      src={category.cagtegory_image}
                      alt=""
                    />
                  </TableCell>
                  <TableCell>{category.category_name}</TableCell>
                  <TableCell>{category.category_total}</TableCell>
                  <TableCell>  <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        // onClick={() => handleEdit(cate)}
                      >
                        <Pencil className="h-4 w-4 mr-1" />
                        Chỉnh sửa
                      </Button>
                      {/* New button  */}
                      <Button
                        variant="outline"
                        size="sm"
                        // onClick={() => handleEdit(cate)}
                      >
                        <MoreHorizontalIcon className="h-4 w-4 mr-1" />
                        Chi tiết
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRemove(category.category_name!)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Xóa
                      </Button>
                     
                    </div></TableCell>

                </TableRow>))
              }

            </TableBody>
            
          </Table>
        </CardContent>

      </Card>
    </div>
  );
};

export default CategoryPage;
