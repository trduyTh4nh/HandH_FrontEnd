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
import { deletePost, getPosts } from "@/apis/blog/blog-repo";
import BlogPostForm from "@/components/widget/blogPostForm";
import { useToast } from "@/hooks/use-toast";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
export default function BlogPage() {
  const [displayMode, setDisplayMode] = useState("table");
  const [posts, setPosts] = useState<IBlogPost[]>([]);
  const [post, setPost] = useState<IBlogPost | null>(null);
  const [selectedPost, setSelectedPost] = useState<IBlogPost | null>(null);
  const [arrPositionImage, setArrPositionImage] = useState<number[]>([]);
  const [isImagesDialogOpen, setIsImagesDialogOpen] = useState(false);
  const [task, setTask] = useState<{isRunning: boolean, atIndex: number, action: 'none' | 'delete' | 'update'}>({
    isRunning: false,
    atIndex: -1,
    action: "none"
  })
  async function removePost(index: number, id: string) {
    setTask({
      isRunning: true,
      atIndex: index,
      action: "delete"
    })
    const res = await deletePost(id);
    if (res instanceof Error) {
      console.error(res);
      setTask({
        ...task,
        isRunning: false
      })
      return;
    }
    setPosts(posts.filter((_, i) => i !== index));
    setTask({
      ...task,
      isRunning: false
    })
  }
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

  const { toast } = useToast();
  const [openUploadDialog, setOpenUploadDialog] = useState(false);
  return (
    <div className="space-y-6 w-full p-8 h-screen">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Quản lý bài đăng</h2>
        <Dialog open={openUploadDialog} onOpenChange={setOpenUploadDialog}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setPost(null);
              }}
            >
              <Plus className="mr-2 h-4 w-4" /> Đăng bài
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[1000px]">
            <DialogHeader>
              <DialogTitle>
                {post ? `Sửa bài viết "${post.content}"` : "Đăng bài mới"}
              </DialogTitle>
            </DialogHeader>
            <BlogPostForm
              defaultValues={post}
              onSubmit={(e) => {
                console.log(e);
                setOpenUploadDialog(false);
                setPosts([...posts, e]);
              }}
            />
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
                <TableHead>Ngày sửa</TableHead>
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts.map((post, index) => (
                <TableRow className={`${task.atIndex == index && task.isRunning ? "grayscale blur-[2px]" : ""} transition-all`}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell
                    className="flex gap-1 cursor-pointer"
                    onClick={() => {
                      setSelectedPost(post);
                      setIsImagesDialogOpen(true);
                    }}
                  >
                    {post.images.slice(0, 3).map((image, imgIndex) => (
                      <img
                        key={imgIndex}
                        src={image}
                        alt={`image-${imgIndex}`}
                        className={`h-12 object-cover rounded-md`}
                      />
                    ))}
                    {post.images.length > 3 && (
                      <div
                        className={`w-12 h-12 object-cover rounded-md bg-gray-100 flex justify-center items-center`}
                      >
                        +{post.images.length - 3}
                      </div>
                    )}
                  </TableCell>
                  <TableCell>{post.content}</TableCell>
                  <TableCell>
                    {new Date(post.createdAt).toLocaleDateString("VI-vn", {
                      hour: "numeric",
                      minute: "numeric",
                    })}
                  </TableCell>
                  <TableCell>
                    {post.createdAt != post.updatedAt || !post.updatedAt
                      ? new Date(post.updatedAt).toLocaleDateString("VI-vn", {
                          hour: "numeric",
                          minute: "numeric",
                        })
                      : "-"}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setOpenUploadDialog(true);
                          setPost(post);
                        }}
                      >
                        Sửa
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger>
                          <Button variant="outline">Xoá</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Bạn có muốn xoá bài đăng "{post.content}" không?</AlertDialogTitle>
                            <AlertDialogDescription>Hành động này không thể được hoàn tác.</AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Huỷ</AlertDialogCancel>
                            <AlertDialogAction onClick={() => {removePost(index, post._id)}}>Đồng ý</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Dialog open={isImagesDialogOpen} onOpenChange={setIsImagesDialogOpen}>
        <DialogContent className="min-w-[75%]">
          <DialogHeader>
            <DialogTitle>Hình ảnh bài viết</DialogTitle>
          </DialogHeader>
          <p>{selectedPost && selectedPost.images.length} hình ảnh</p>
          <div className="flex gap-2 w-full overflow-auto justify-start items-start rounded-2xl">
            {selectedPost &&
              selectedPost.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`image-${index}`}
                  className="h-80 rounded-sm"
                />
              ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
