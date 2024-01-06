"use client";
import React, { useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { Heart } from "lucide-react";
import Link from "next/link";

function Navbar() {
  const [searchValue, setSearchValue] = useState<string>();

  const handleInputChange = (e: any) => {
    setSearchValue(e.target.value);
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    alert(searchValue);
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className=" flex h-14 w-full
      max-w-[1200px] items-center gap-2"
      >
        <Link href={"/"}>
          <p className="text-xl font-bold">🍿Pick me a Movie</p>
        </Link>

        <form onSubmit={handleSubmit} className="flex-1">
          <input
            type="text"
            placeholder="search movies"
            value={searchValue}
            onChange={handleInputChange}
            className="h-10 w-full rounded-full border-0 bg-zinc-100 pl-4 outline-none dark:bg-zinc-900"
          />
        </form>

        <Link href={"/favorites"}>
          <Heart size={18} />
        </Link>

        <ThemeToggle />
      </div>
    </div>
  );
}

export default Navbar;
