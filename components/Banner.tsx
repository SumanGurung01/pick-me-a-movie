"use client";

import { getMovieBanner } from "@/lib/request";
import { BannerType } from "@/typing";
import React, { useEffect, useState } from "react";
import Img from "./Img";

function Banner() {
  const movie_ids = [
    872585, 897087, 787699, 571891, 502356, 714676, 299536, 305143, 385687,
    384018, 429617, 399566, 848326, 10681, 9806, 10193, 585, 670292,
  ];

  const [banner, setBanner] = useState<BannerType>();
  useEffect(() => {
    getMovieBanner(movie_ids).then((result: BannerType[]) => {
      setBanner(result[Math.floor(Math.random() * movie_ids.length)]);
    });
  }, []);

  return (
    banner && (
      <div>
        <Img
          src={banner.image}
          width={1200}
          height={100}
          alt="movie banner"
          className="object-cover brightness-75 md:max-h-[500px]"
          onClick={() => {}}
        />
        <div className="absolute top-8 z-50 mt-10 max-h-[500px] w-3/4 pl-2 md:top-12 md:w-1/2 md:pl-5 lg:top-14 ">
          <p className="my-3 line-clamp-2 text-2xl font-bold text-zinc-200 md:my-10 md:text-5xl">
            {banner.name}
          </p>
          <p className="font-semobold mb-6 line-clamp-3 text-sm text-zinc-200 md:mb-10 md:line-clamp-5 md:text-xl">
            {banner.overview}
          </p>

          <a
            href={banner.video_link}
            target="_blank"
            className="my-3 rounded-md bg-zinc-900 px-6 py-3 text-sm text-zinc-200 opacity-80 duration-300 hover:bg-black hover:text-zinc-50 md:text-lg"
          >
            Watch Trailor
          </a>
        </div>
      </div>
    )
  );
}

export default Banner;
