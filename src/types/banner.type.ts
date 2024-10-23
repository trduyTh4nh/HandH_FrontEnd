export interface IBanner {
  id: string;
  title: string;
  url: string;
  content: string;
  link: string;
  isActive: boolean;
  type: "main" | "sub";
}
