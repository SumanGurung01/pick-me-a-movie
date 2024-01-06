"use client";
import {
  BASE_IMAGE_URL,
  generateRandomString,
  getMovieData,
} from "@/lib/request";
import { Movie, Scroller } from "@/typing";
import { Heart, PlayCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useStore } from "@/store/store";
import toast from "react-hot-toast";
import { PuffLoader } from "react-spinners";

function Movie({ params }: any) {
  const [movieDetails, setMovieDetails] = useState<Movie>();
  const [favorites, setFavorites] = useStore((state) => [
    state.favorites,
    state.setFavorites,
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMovieData(params.movie_id).then((data: Movie) => {
      setMovieDetails(data);
      setLoading(false);
    });
  }, []);

  const router = useRouter();

  const addToFavorite = () => {
    var exist: boolean = false;
    favorites.forEach((movie: Scroller) => {
      if (movie.id === params.movie_id) {
        exist = true;
      }
    });

    if (!exist && movieDetails) {
      setFavorites([
        ...favorites,
        {
          name: movieDetails.name,
          id: params.movie_id,
          image: movieDetails.poster_image,
        },
      ]);
      toast("Added to Favorites!", {
        icon: "❤️",
      });
    } else {
      setFavorites(
        favorites.filter((movie: Scroller) => movie.id !== params.movie_id),
      );
      toast("Removed from Favorites!", {
        icon: "🔽",
      });
    }
  };

  return loading ? (
    <div className="flex h-screen w-full items-center justify-center">
      <PuffLoader color="#36d7b7" />
    </div>
  ) : (
    movieDetails && (
      <div className="flex items-center justify-center">
        <div className="max-w-[1200px]">
          <div>
            <Image
              src={movieDetails.banner_image}
              alt="banner image"
              width={1200}
              height={100}
              className="object-cover md:h-[500px]"
            />
            <div className="absolute top-16 mx-5 flex gap-5">
              <Link href={movieDetails.video_link} target="_blank">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <PlayCircle
                      size={30}
                      className="text-zinc-200 duration-300 hover:scale-105 hover:cursor-pointer"
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Watch Trailor</p>
                  </TooltipContent>
                </Tooltip>
              </Link>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Heart
                    size={30}
                    className="text-zinc-200 duration-300 hover:scale-105 hover:cursor-pointer"
                    onClick={() => {
                      addToFavorite();
                    }}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Add / Remove from favorites</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
          <div className="ml-2 mt-4 flex">
            <Image
              src={movieDetails.poster_image}
              width={200}
              height={10}
              alt="banner image"
              className="hidden rounded-sm md:block md:max-h-[500px]"
            />
            <div className="md:ml-4">
              <p className="mb-2 text-lg font-bold md:text-2xl">
                {movieDetails.name}
              </p>
              <p className="mb-2 text-sm">
                ⭐ {movieDetails.rating.toFixed(1)} / 10
              </p>
              <p className="mb-2 md:text-lg">{movieDetails.overview}</p>
              <p className="mb-2 text-sm md:text-base">
                Release Year : {movieDetails.year.substring(0, 4)}
              </p>
              <p className="mb-4 text-sm md:text-base">
                Running Time : {movieDetails.runtime} minutes
              </p>

              {movieDetails.genre.map((gnr: any) => {
                return (
                  <span
                    className="mr-2 rounded-full border-[1px] border-zinc-400 px-2 py-1 text-sm dark:border-zinc-400"
                    key={generateRandomString(20)}
                  >
                    {gnr.name}
                  </span>
                );
              })}
            </div>
          </div>
          <div className="mt-6 w-full pl-2">
            <p className="font-bold">Casts and Crews</p>
            <div className="no-scrollbar flex overflow-x-scroll py-2">
              {movieDetails.cast.map((person: any) => {
                if (person.profile_path) {
                  return (
                    <Tooltip key={generateRandomString(20)}>
                      <TooltipTrigger asChild>
                        <Image
                          src={`${BASE_IMAGE_URL}${person.profile_path}`}
                          width={60}
                          height={60}
                          alt="movie poster"
                          className="mr-2 rounded-sm object-cover duration-300 hover:scale-105 hover:cursor-pointer"
                          onClick={() => router.push(`/person/${person.id}`)}
                        ></Image>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{person.original_name}</p>
                      </TooltipContent>
                    </Tooltip>
                  );
                }
              })}
            </div>
          </div>
          {movieDetails.recommendation.length !== 0 ? (
            <div className="mt-6 w-full pl-2">
              <p className="font-bold">Recommendations for You</p>
              <div className="no-scrollbar flex overflow-x-scroll py-2">
                {movieDetails.recommendation.map((movie: any) => {
                  return (
                    <Tooltip key={generateRandomString(20)}>
                      <TooltipTrigger asChild>
                        <Image
                          src={`${BASE_IMAGE_URL}${movie.poster_path}`}
                          width={120}
                          height={100}
                          alt="movie poster"
                          className="mr-2 rounded-sm duration-300 hover:scale-105 hover:cursor-pointer"
                          onClick={() => router.push(`/movie/${movie.id}`)}
                        ></Image>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{movie.title}</p>
                      </TooltipContent>
                    </Tooltip>
                  );
                })}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    )
  );
}

export default Movie;
