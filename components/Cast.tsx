import { BASE_IMAGE_URL } from "@/lib/request";
import Image from "next/image";
import React from "react";

function Cast({ cast }: any) {
  return (
    <div className="mt-4 w-full pl-2">
      <div className="no-scrollbar flex overflow-x-scroll py-2">
        {cast.map((person: any) => {
          return (
            <Image
              src={`${BASE_IMAGE_URL}${person.profile_path}`}
              width={120}
              height={100}
              alt="movie poster"
              className="mr-2 rounded-sm duration-300 hover:scale-105 hover:cursor-pointer"
            ></Image>
          );
        })}
      </div>
    </div>
  );
}

export default Cast;
