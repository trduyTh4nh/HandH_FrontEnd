import { IBanner } from "@/types/banner.type";
import { Skeleton } from "@mui/material";
import React from "react";
import { Carousel } from "react-responsive-carousel";
import { AspectRatio } from "../ui/aspect-ratio";

function CarouselBanner(props: { banners: IBanner[] }) {
  return (
    <>
      {/* https://www.npmjs.com/package/react-responsive-carousel */}
      <Carousel
        className="carousel-banner rounded-3xl"
        autoPlay
        showThumbs={false}
        showStatus={false}
      >
        {props.banners.map((e) => (
          <AspectRatio ratio={3}>
            <div className="w-full h-full">
              <img className="round-lg w-full h-full object-cover" alt="Sự kiện 1" src={e.url} />
              <p className="legend">{e.title}</p>
            </div>
          </AspectRatio>
        ))}
      </Carousel>
    </>
  );
}

export default CarouselBanner;
