"use client";

import {
  BASE_IMAGE_URL,
  generateRandomString,
  getPersonData,
} from "@/lib/request";
import { Person, Scroller } from "@/typing";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useRouter } from "next/navigation";

function Person({ params }: any) {
  const [person, setPerson] = useState<Person>();
  const router = useRouter();

  useEffect(() => {
    getPersonData(params.person_id).then((data: Person) => {
      setPerson(data);
    });
  }, []);

  return (
    person && (
      <div className="flex items-center justify-center">
        <div className="mx-3 max-w-[1200px]">
          <div className="flex">
            <Image
              src={person.image}
              alt={person.name}
              width={140}
              height={10}
              className="w-1/2 max-w-[200px] rounded-sm"
            />
            <div className="ml-2 w-1/2 md:ml-4">
              <p className="mb-2 text-xl font-bold">{person.name}</p>
              <p className="mb-2">
                Popularity : {person.popularity.toFixed(1)}
              </p>
              <p className="mb-2">Born : {person.birthday}</p>
              <p className="mb-2">Place : {person.place_of_birth}</p>
            </div>
          </div>

          <div className="my-4">
            <p className="mb-2 text-xl font-bold">Biography</p>
            <p>{person.bio}</p>
          </div>

          <div className="mt-6 w-full">
            <p className="font-bold">Feature Films</p>
            <div className="no-scrollbar flex overflow-x-scroll py-2">
              {person.films.map((movie: Scroller, index: number) => {
                if (movie.image && index < 50) {
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
        </div>
      </div>
    )
  );
}

export default Person;
