"use client";
import React, { useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { Heart } from "lucide-react";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  generateRandomString,
  genre,
  getMovieByGenre,
  getMovieDataByKeyword,
} from "@/lib/request";
import { useStore } from "@/store/store";
import { Scroller } from "@/typing";

function Navbar() {
  const [keyword, setKeyword] = useState<string>("");
  const [favorites, setResultMovies] = useStore((state) => [
    state.favorites,
    state.setResultMovies,
  ]);

  const handleInputChange = (e: any) => {
    setKeyword(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    getMovieDataByKeyword(keyword).then((data: Scroller[]) => {
      setResultMovies(data);
    });
    setKeyword("");
  };

  return (
    <div className="flex items-center justify-center">
      <div className="flex h-14 w-full max-w-[1200px] items-center gap-3 md:gap-4">
        <Link href={"/"}>
          <p className="hidden text-xl font-bold md:block">🍿Pick me a Movie</p>
          <p className="pl-2 text-xl font-bold md:hidden">🍿</p>
        </Link>

        <form onSubmit={handleSubmit} className="flex-1">
          <input
            type="text"
            placeholder="search movies"
            value={keyword}
            onChange={handleInputChange}
            className="h-10 w-full rounded-full border-0 bg-zinc-100 pl-4 outline-none dark:bg-zinc-900"
          />
        </form>

        <Select
          onValueChange={(e: any) => {
            getMovieByGenre(Number(e)).then((data: Scroller[]) => {
              setResultMovies(data);
            });
          }}
        >
          <SelectTrigger className="w-[80px] md:w-[150px]">
            <SelectValue placeholder="Genre" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {Object.keys(genre).map((gnr: string) => (
                <SelectItem
                  value={String(genre[gnr])}
                  key={generateRandomString(20)}
                >
                  {gnr}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Link href={"/favorites"}>
          <Heart size={18} />
          <p className="absolute top-3 ml-3 flex h-4 w-4 items-center justify-center rounded-full bg-zinc-900 text-xs font-bold text-zinc-100 dark:bg-zinc-200 dark:text-zinc-900">
            {favorites.length}
          </p>
        </Link>

        <ThemeToggle />
      </div>
    </div>
  );
}

export default Navbar;
