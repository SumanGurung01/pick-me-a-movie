"use client";

import { generateRandomString, getMovieDataByCatagory } from "@/lib/request";
import { Scroller } from "@/typing";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Img from "./Img";

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
        <p className="font-bold">{catagory}</p>
        <div className="no-scrollbar flex overflow-x-scroll py-2">
          {movies.map((movie: Scroller) => {
            return (
              <Tooltip key={generateRandomString(20)}>
                <TooltipTrigger asChild>
                  <Img
                    src={movie.image}
                    width={120}
                    height={100}
                    alt="movie poster"
                    className="mr-2 rounded-sm duration-300 hover:scale-105 hover:cursor-pointer"
                    onClick={() => router.push(`/movie/${movie.id}`)}
                  />
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
