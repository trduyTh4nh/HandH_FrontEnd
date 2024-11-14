import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { LayoutList, Plus, Rows2, Table as Tbl } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { IBlogPost } from "@/types/blog.type";
import { getPosts } from "@/apis/blog/blog-repo";
export default function BlogPage() {
  const [displayMode, setDisplayMode] = useState("table");
  const [posts, setPosts] = useState<IBlogPost[]>([]);
  async function getBlogPosts() {
    const res = await getPosts();
    console.log(res);
    if (res instanceof Error) {
      console.error(res);
      return;
    }
    setPosts(res);
  }
  useEffect(() => {
    getBlogPosts();
  }, []);
  return (
    <div className="space-y-6 w-full p-8 h-screen">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Quản lý bài đăng</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Đăng bài
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[1000px]">
            <DialogHeader>
              <DialogTitle>Đăng bài mới</DialogTitle>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>

      <ToggleGroup
        value={displayMode}
        onValueChange={setDisplayMode}
        className="justify-start"
        type="single"
      >
        <ToggleGroupItem value="normal">
          <LayoutList />
        </ToggleGroupItem>
        <ToggleGroupItem value="table">
          <Tbl />
        </ToggleGroupItem>
      </ToggleGroup>
      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>(các) Hình ảnh</TableHead>
                <TableHead>Tiêu đề</TableHead>
                <TableHead>Ngày đăng</TableHead>
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts.map((post, index) => (
                <TableRow>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell className="flex gap-1">
                    {post.images.slice(0, 3).map((image, imgIndex) => (
                      <img
                        key={imgIndex}
                        src={image}
                        alt={`image-${imgIndex}`}
                        className={`w-12 h-12 object-cover rounded-md`}
                      />
                    ))}
                    {post.images.length > 3 && (
                      <div
                        className={`w-12 h-12 object-cover rounded-md bg-gray-100`}
                      >
                        +{post.images.length - 3}
                      </div>
                    )}
                  </TableCell>
                  <TableCell>{post.content}</TableCell>
                  <TableCell>:)</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
