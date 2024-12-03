import { Link } from "react-router-dom";
import { AspectRatio } from "../ui/aspect-ratio";

type HomeCategoryWidgetProps = {
  name: string;
  image: string;
  id: string;
  className?: string;
};
export default function HomeCategory(props: HomeCategoryWidgetProps) {
  return (
    <Link to={`/shop?cate=${props.id}`} className={`flex group w-full flex-col gap-2 overflow-hidden cursor-pointer no-underline ${props.className}`}>
      <AspectRatio ratio={2 / 3} className="w-full">
        <div className="w-full h-full overflow-hidden">
          <img src={props.image} alt={props.name} className="h-full w-full object-cover group-hover:scale-105 transition-all" />
        </div>
      </AspectRatio>
      <h3 className="text-center text-2xl font-bold no-underline">{props.name}</h3>
    </Link>
  );
}
