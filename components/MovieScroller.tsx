"use client";

import { getMovieDataByCatagory } from "@/lib/request";
import { Scroller } from "@/typing";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function MovieScroller({ catagory }: { catagory: string }) {
  const [movies, setMovies] = useState<Scroller[]>();

  const router = useRouter();

  useEffect(() => {
    getMovieDataByCatagory(catagory).then((data: Scroller[]) => {
      setMovies(data);
    });
  }, []);
  return (
    movies && (
      <div className="mt-4 w-full pl-2">
        <p>{catagory}</p>
        <div className="no-scrollbar flex overflow-x-scroll py-2">
          {movies.map((movie: Scroller) => {
            return (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Image
                    src={movie.image}
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
          })}
        </div>
      </div>
    )
  );
}

export default MovieScroller;
