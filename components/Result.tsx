"use client";

import { BASE_IMAGE_URL, generateRandomString } from "@/lib/request";
import { useStore } from "@/store/store";
import { Scroller } from "@/typing";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";
import { useRouter } from "next/navigation";

function Result() {
  const [resultMovies] = useStore((state) => [state.resultMovies]);
  const router = useRouter();
  return (
    resultMovies &&
    resultMovies.length !== 0 && (
      <div className="mt-4 w-full pl-2">
        <p className="font-bold">Movies based on Search / Genre</p>
        <div className="no-scrollbar flex overflow-x-scroll py-2">
          {resultMovies.map((movie: Scroller) => {
            if (movie.image) {
              return (
                <Tooltip key={generateRandomString(20)}>
                  <TooltipTrigger asChild>
                    <Image
                      src={`${BASE_IMAGE_URL}${movie.image}`}
                      width={120}
                      height={100}
                      alt="movie poster"
                      className="mr-2 rounded-sm duration-300 hover:scale-105 hover:cursor-pointer"
                      onClick={() => router.push(`/movie/${movie.id}`)}
                    ></Image>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{movie.name}</p>
                  </TooltipContent>
                </Tooltip>
              );
            }
          })}
        </div>
      </div>
    )
  );
}

export default Result;
