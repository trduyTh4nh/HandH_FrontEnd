import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { useContext, useState } from "react";
import { Images, Loader, Loader2, Plus, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { DialogClose, DialogFooter } from "../ui/dialog";
import { createPost } from "@/apis/blog/blog-repo";
import { UserContext } from "../contexts/UserContext";
import { AxiosError } from "axios";
import { useToast } from "@/hooks/use-toast";
import { IBlogPost } from "@/types/blog.type";
import * as blogRepo from "@/apis/blog/blog-repo";
const blogFormSchema = z.object({
  content: z
    .string({ required_error: "Vui lòng nhập nội dung bài viết" })
    .max(25000),
});
export type BlogPostSchema = z.infer<typeof blogFormSchema>;
type BlogPostFormProps = {
  defaultValues?: IBlogPost;
  images?: string[] | File[] | null;
  onSubmit?: (post: IBlogPost) => void;
  onUpdate?: (post: IBlogPost) => void;
};
export default function BlogPostForm(props: BlogPostFormProps) {
  const oldBlogPost = props.defaultValues;
  const form = useForm({
    resolver: zodResolver(blogFormSchema),
    defaultValues: {
      content: props.defaultValues?.content || "",
    },
  });
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<(File | string)[] | null>(
    props.defaultValues ? (props.defaultValues.images as string[]) : []
  );
  const [arrPositionImage, setArrPositionImage] = useState<number[]>([]);
  async function updatePost(data: BlogPostSchema) {
    if (
      !props.defaultValues ||
      (oldBlogPost.content == form.getValues("content") &&
        oldBlogPost.images == images)
    )
      return;
    setLoading(true);
    const updatedImages = arrPositionImage.map((i) => images[i]);
    const res = await blogRepo.updatePost(
      props.defaultValues._id,
      data.content,
      updatedImages as File[],
      arrPositionImage
    );
    if (res instanceof AxiosError) {
      setLoading(false);
      return;
    }
    props.onUpdate({
      _id: props.defaultValues._id,
      author: user._id,
      createdAt: props.defaultValues.createdAt,
      updatedAt: new Date().toISOString(),
      content: data.content,
      images: images.map((e) =>
        e instanceof File ? URL.createObjectURL(e) : e
      ),
    });
    setLoading(false);
  }
  function removeImage(index: number) {
    console.log(index);
    setImages(images.filter((img, i) => i !== index));
  }
  const { toast } = useToast();
  function addImages(file: FileList) {
    const files = Array.from(file);
    if (images.length + files.length > 20) {
      toast({
        title: "Đã vượt quá số lượng hình ảnh cho phép",
        description: `Số lượng hình ảnh cho phép là 6 hình ảnh, hệ thống đã thêm ${
          20 - images.length
        } hình ảnh bạn đã chọn gần nhất.`,
      });
    }
    setImages([
      ...images,
      ...files.filter((e, index) => index + images.length + 1 <= 20),
    ]);
  }
  function editImagePost(index: number, newImage: File) {
    const newImages = images.map((e, i) => (i === index ? newImage : e));
    setImages(newImages);
    if (!arrPositionImage.includes(index)) {
      setArrPositionImage([...arrPositionImage, index]);
    }
  }
  async function uploadBlogPost(data: BlogPostSchema) {
    setLoading(true);
    const res = await createPost(data.content, images as File[], user._id);
    console.log(res);
    if (res instanceof AxiosError) {
      setLoading(false);
      return;
    }
    setLoading(false);
    props.onSubmit({
      _id: "createdPost",
      content: data.content,
      author: user._id,
      images: images
        ? images.map((e) =>
            e instanceof File ? URL.createObjectURL(e) : (e as string)
          )
        : [],
      createdAt: new Date().toISOString(),
    });
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(
          props.defaultValues ? updatePost : uploadBlogPost
        )}
      >
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <Label>Nội dung</Label>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Nội dung bài viết, có thể để trống, tối đa 25.000 ký tự"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Label>Hình ảnh</Label>
        <label
          htmlFor={!images || images.length == 0 ? "images" : null}
          className={`w-100 min-h-24 flex flex-col gap-2 border ${
            images && images.length > 0
              ? "border-solid shadow-sm grid grid-cols-5 px-4"
              : "border-dashed  active:scale-95"
          } border-gray-200 rounded-2xl justify-center items-center py-4 hover:border-solid hover:shadow-sm transition-all`}
        >
          {images && images.length > 0 ? (
            images.map((e, index) => (
              <div className="flex justify-center items-center px-4 py-8 border-gray-200 border rounded-xl relative">
                {!props.defaultValues && (
                  <Button
                    type="button"
                    onClick={() => {
                      // console.log(e)
                      // removeImage(index);
                      setImages(images.filter((img, i) => i !== index));
                    }}
                    variant="secondary"
                    className="absolute right-2 top-2 bg-secondary/80 backdrop-blur-lg"
                  >
                    <Trash2 width={16} height={16} className="text-red-400" />
                  </Button>
                )}
                <label htmlFor={`imginput-${index}`} className="cursor-pointer">
                  <img
                    src={
                      e instanceof File ? URL.createObjectURL(e) : (e as string)
                    }
                    key={index}
                    className="h-24 object-contain rounded-lg"
                  />
                </label>
                <input
                  type="file"
                  className="hidden"
                  id={`imginput-${index}`}
                  accept="image/*"
                  onChange={(e) => {
                    editImagePost(index, e.target.files![0]);
                  }}
                />
              </div>
            ))
          ) : (
            <>
              <Images />
              <p>Ấn vào để đăng tải 1 hoặc nhiều hình ảnh.</p>
            </>
          )}
          {images &&
            images.length > 0 &&
            images.length <= 20 &&
            !props.defaultValues && (
              <label
                htmlFor="images"
                className="flex justify-center flex-col gap-2 border-gray-200 border items-center px-4 py-8 rounded-2xl relative h-full"
              >
                <Plus />
                <p>Thêm hình</p>
              </label>
            )}
        </label>
        <Label>{images ? images.length : 0} / 20 hình ảnh</Label>
        <input
          id="images"
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => {
            addImages(e.target.files);
          }}
          className="hidden"
        />
        <DialogFooter>
          <DialogClose>
            <Button type="button" variant="secondary">
              Huỷ
            </Button>
          </DialogClose>
          <Button type="submit" disabled={loading}>
            {loading ? (
              <div className="flex gap-2">
                <Loader className="animate-spin" />
                Đang đăng bài
              </div>
            ) : props.defaultValues ? (
              "Cập nhật"
            ) : (
              "Đăng bài"
            )}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
