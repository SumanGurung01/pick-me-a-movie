"use client";

import { useStore } from "@/store/store";
import { Scroller } from "@/typing";
import { useRouter } from "next/navigation";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { generateRandomString } from "@/lib/request";

function Favorite() {
  const router = useRouter();
  const [favorites, setFavorites] = useStore((state) => [
    state.favorites,
    state.setFavorites,
  ]);

  return (
    favorites && (
      <div className="flex items-center justify-center">
        <div className="m-2 max-w-[1200px]">
          <p className="my-4 text-center text-xl font-bold">
            {favorites.length === 0 ? "No Movies Found" : "Your Favorites"}
          </p>
          <div className="flex flex-wrap justify-center">
            {favorites.map((movie: Scroller) => {
              return (
                <Tooltip key={generateRandomString(20)}>
                  <TooltipTrigger asChild>
                    <img
                      src={movie.image}
                      width={120}
                      height={100}
                      alt="movie poster"
                      className="m-2 rounded-sm duration-300 hover:scale-105 hover:cursor-pointer"
                      onClick={() => router.push(`/movie/${movie.id}`)}
                      loading="lazy"
                    ></img>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{movie.name}</p>
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </div>
        </div>
      </div>
    )
  );
}

export default Favorite;
