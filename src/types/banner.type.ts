export interface IBanner {
  id: string;
  title: string;
  url: string;
  content: string;
  link: string;
  isActive: boolean;
  isPublished: boolean;
  imageUrl: string;
  type: "main" | "sub";
  isMain: boolean;
}
