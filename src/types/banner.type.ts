export interface IBanner {
  id: string;
  title: string;
  imageUrl: string;
  link: string;
  isPublished: boolean;
  type: "main" | "sub";
}
