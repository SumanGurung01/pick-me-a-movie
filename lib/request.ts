import { BannerType, Scroller, Movie, Person } from "@/typing";
import toast from "react-hot-toast";

export const BASE_URL = "https://api.themoviedb.org/3";
export const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/original";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export const generateRandomString = (len: number) => {
  const charset =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomString = "";

  for (let i = 0; i < len; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    randomString += charset.charAt(randomIndex);
  }

  return randomString;
};

// https://api.themoviedb.org/3/movie/recommendations?api_key=0f2398402682d07d570408efd2d6db30
const movieCatagories = {
  nowPlaying: `${BASE_URL}/movie/now_playing?api_key=${API_KEY}`,
  popular: `${BASE_URL}/movie/popular?api_key=${API_KEY}`,
  topRated: `${BASE_URL}/movie/top_rated?api_key=${API_KEY}`,
  action: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=28`,
  animation: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=16`,
  comedy: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=35`,
  romance: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=10749`,
  horror: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=27`,
};

export const genre: Record<string, number> = {
  Action: 28,
  Adventure: 12,
  Animation: 16,
  Comedy: 35,
  Crime: 80,
  Documentary: 99,
  Drama: 18,
  Family: 10751,
  Fantasy: 14,
  History: 36,
  Horror: 27,
  Music: 10402,
  Mystery: 9648,
  Romance: 10749,
  "Science Fiction": 878,
  Thriller: 53,
  War: 10752,
  Western: 37,
};

const makeQuery = (value: string) => {
  var words: string[] = value.split(" ");
  words = words.filter((val: string) => val !== "");

  words = words.map((val: string, index: number) => {
    if (index !== words.length - 1) val = `${val}+`;
    return val;
  });
  return words.join("");
};

export const getMovieDataByKeyword = async (keyword: string) => {
  if (keyword === "") {
    toast("Please enter movie name", {
      icon: "⚠️",
    });

    return [];
  }

  const query: string = makeQuery(keyword);

  var result: Scroller[] = [];

  for (var i = 1; i <= 2; i++) {
    await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&page=${i}`,
    )
      .then((response) => response.json())
      .then((data) => {
        data.results.forEach((movie: any) => {
          result = [
            ...result,
            { id: movie.id, image: movie.poster_path, name: movie.title },
          ];
        });
      });
  }

  if (result.length === 0) {
    toast(`No result found for ${keyword}`, {
      icon: "😔",
    });
    return [];
  }

  return result;
};

export const getMovieByGenre = async (genre: number) => {
  var result: Scroller[] = [];

  for (var i = 1; i <= 2; i++) {
    await fetch(
      `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genre}&page=${i}`,
    )
      .then((response) => response.json())
      .then((data) => {
        data.results.forEach((movie: any) => {
          result = [
            ...result,
            { id: movie.id, image: movie.poster_path, name: movie.title },
          ];
        });
      });
  }

  return result;
};

const getTrailorById = async (movie_id: number) => {
  var videoLink: string = "";

  const query = `${BASE_URL}/movie/${movie_id}/videos?api_key=${API_KEY}`;

  await fetch(query)
    .then((response) => response.json())
    .then((data) => {
      for (var i = 0; i < data.results.length; i++) {
        if (data.results[i].type === "Trailer") {
          videoLink = `http://youtube.com/watch?v=${data.results[i].key}`;
          break;
        }
      }
    });

  return videoLink;
};

export const getMovieBanner = async (movie_ids: number[]) => {
  var result: BannerType[] = [];

  for (var i = 0; i < movie_ids.length; i++) {
    await fetch(`${BASE_URL}/movie/${movie_ids[i]}?api_key=${API_KEY}`)
      .then((response) => response.json())
      .then(async (data) => {
        const temp: BannerType = {
          name: data.original_title,
          overview: data.overview,
          id: data.id,
          image: `${BASE_IMAGE_URL}${data.backdrop_path}`,
          video_link: await getTrailorById(data.id),
        };

        result = [...result, temp];
      });
  }

  return result;
};

// get movie for movie scroller
export const getMovieDataByCatagory = async (catagory: string) => {
  var query: string = "";

  if (catagory === "Popular") query = movieCatagories.popular;
  if (catagory === "Now Playing") query = movieCatagories.nowPlaying;
  if (catagory === "Top Rated") query = movieCatagories.topRated;
  if (catagory === "Action") query = movieCatagories.action;
  if (catagory === "Romance") query = movieCatagories.romance;
  if (catagory === "Comedy") query = movieCatagories.comedy;
  if (catagory === "Animation") query = movieCatagories.animation;
  if (catagory === "Horror") query = movieCatagories.horror;

  var movieEachPage: Scroller[] = [];

  for (var i = 1; i <= 2; i++) {
    await fetch(`${query}&page=${i}`)
      .then((response) => response.json())
      .then((data) => {
        data.results.forEach((movie: any) => {
          const temp: Scroller = {
            id: movie.id,
            image: `${BASE_IMAGE_URL}${movie.poster_path}`,
            name: movie.original_title,
          };
          movieEachPage = [...movieEachPage, temp];
        });
      });
  }

  return movieEachPage;
};

export const getMovieData = async (movie_id: number) => {
  var movie: Movie = {
    name: "",
    banner_image: "",
    runtime: 0,
    year: "",
    rating: 0,
    genre: [],
    overview: "",
    poster_image: "",
    video_link: "",
    cast: [],
    recommendation: [],
  };

  await fetch(`${BASE_URL}/movie/${movie_id}?api_key=${API_KEY}`)
    .then((response) => response.json())
    .then(async (data) => {
      movie.name = data.title;
      movie.banner_image = `${BASE_IMAGE_URL}${data.backdrop_path}`;
      movie.runtime = data.runtime;
      movie.year = data.release_date;
      movie.rating = data.vote_average;
      movie.genre = [...data.genres];
      movie.overview = data.overview;
      movie.poster_image = `${BASE_IMAGE_URL}${data.poster_path}`;
      movie.video_link = await getTrailorById(movie_id);
    });

  await fetch(`${BASE_URL}/movie/${movie_id}/credits?api_key=${API_KEY}`)
    .then((response) => response.json())
    .then((data) => {
      movie.cast = [...data.cast];
    });

  await fetch(
    `${BASE_URL}/movie/${movie_id}/recommendations?api_key=${API_KEY}`,
  )
    .then((response) => response.json())
    .then((data) => {
      movie.recommendation = [...data.results];
    });

  return movie;
};

export const getPersonData = async (person_id: number) => {
  var person: Person = {
    name: "",
    bio: "",
    image: "",
    films: [],
    place_of_birth: "",
    birthday: "",
    popularity: 0,
  };

  await fetch(`${BASE_URL}/person/${person_id}?api_key=${API_KEY}`)
    .then((response) => response.json())
    .then((data) => {
      person.name = data.name;
      person.bio = data.biography;
      person.image = `${BASE_IMAGE_URL}${data.profile_path}`;
      person.popularity = data.popularity;
      person.birthday = data.birthday;
      person.place_of_birth = data.place_of_birth;
    });

  var temp: Scroller[] = [];
  await fetch(
    `${BASE_URL}/person/${person_id}/movie_credits?api_key=${API_KEY}`,
  )
    .then((response) => response.json())
    .then((data) => {
      data.cast.forEach((film: any) => {
        temp = [
          ...temp,
          {
            id: film.id,
            name: film.title,
            image: film.poster_path,
          },
        ];
      });

      person.films = [...temp];
    });
  return person;
};
