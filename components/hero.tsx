"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import CarousalBullets from "./ui/carousalBullets";

export interface HeroCarousalItem {
  title: string;
  description: string;
  cta_button_text: string;
  heroImage: string;
}

interface HeroCarousalProps {
  HeroItems: HeroCarousalItem[];
}

const HeroCarousal: React.FC<HeroCarousalProps> = ({ HeroItems }) => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [, setAnimationKey] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      const newIndex = api.selectedScrollSnap() + 1;
      setCurrent(newIndex);
      setAnimationKey((prev) => prev + 1); // Force re-animation
    });
  }, [api]);

  return (
    <Carousel
      setApi={setApi}
      className="w-full mx-auto h-full flex items-center justify-start  flex-col relative"
      opts={{
        align: "start",
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 3000,
        }),
      ]}
    >
      <CarouselContent className="h-full w-screen">
        {HeroItems.map((item, index) => (
          <CarouselItem key={index}>
            <Card className="relative p-28">
              <Image
                src={item.heroImage || ""}
                alt=""
                width={1600}
                height={900}
                className="absolute inset-0 z-0 bg-contain"
              ></Image>
              <CardTitle className="z-10 pl-6 text-4xl">{item.title}</CardTitle>
              <CardContent className="z-10 flex flex-col items-start pl-6 gap-20">
                <span className="text-gray-800 text-xl ">{item.description}</span>
                <Link className="" href={"/"}>
                  <Button size={"lg"}>{item.cta_button_text}</Button>
                </Link>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>

      {/* Pagination Dots */}
      <div className="absolute -bottom-10 flex items-center gap-2">
        {HeroItems.map((_, index) => (
          <CarousalBullets key={index} current={current} index={index} />
        ))}
      </div>
    </Carousel>
  );
};

export default HeroCarousal;
{
  /* <Card className="w-full h-full border-none rounded-none flex flex-col items-center gap-3 sm:gap-10 py-5 3xl:gap-20 bg-transparent backdrop-blur-sm">
                  <CardTitle className="text-2xl lg:text-4xl 2xl:text-6xl 3xl:text-7xl font-semibold text-center z-20 ">
                    {item.title} <br />
                    <span className="font-bold">{item.boldTitle}</span>
                  </CardTitle>
                  <CardContent className="flex px-10 flex-col items-center text-center gap-10 3xl:gap-20 w-full">
                    <span className="text-sm lg:text-md 2xl:text-xl 3xl:text-2xl font-medium ">
                      {item.description}
                    </span>
                    <Link
                      className="sm:w-2/4 lg:w-1/3 lg:h-12  bg-black  rounded-lg py-2
                      flex items-center justify-center"
                      href={"/contactus"}
                    >
                      {item.cta_button_text}
                    </Link>
                  </CardContent>
                </Card> */
}
