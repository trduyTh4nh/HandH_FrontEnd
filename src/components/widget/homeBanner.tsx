import { useMediaQuery } from "react-responsive";
import { AspectRatio } from "../ui/aspect-ratio";
import { Button } from "../ui/button";

type HomeBannerProps = {
  title: string;
  description: string;
  image: string;
  link: string;
  button: string;
};
export default function HomeBanner(props: HomeBannerProps) {
  const isMobile = useMediaQuery({
    query: "(max-width: 768px)",
  });
  return (
    <AspectRatio ratio={isMobile ? 3 / 2 : 3} className="w-full">
      <div className="relative w-full h-full flex items-center">
        <div className="p-10 md:p-20 relative z-20 w-full md:w-2/3 flex flex-col gap-4">
          <h1 className="font-roboto-serif font-normal text-4xl md:text-7xl">
            {props.title}
          </h1>
          <p>{props.description}</p>
          <Button variant="ghost" className="w-fit px-12">
            Mua ngay
          </Button>
        </div>
        <div className="w-full h-full absolute bg-white-transparent z-10"></div>
        <img
          src={props.image}
          alt={props.title}
          className="w-full h-full absolute top-0 left-0 object-cover"
        />
      </div>
    </AspectRatio>
  );
}
