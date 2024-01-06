export interface BannerType {
  name: string;
  overview: string;
  id: number;
  image: string;
  video_link: string;
}

export interface Scroller {
  image: string;
  id: number;
  name: string;
}

export interface Movie {
  name: string;
  banner_image: string;
  runtime: number;
  year: string;
  rating: number;
  genre: any[];
  overview: string;
  poster_image: string;
  video_link: string;
  cast: any[];
  recommendation: any[];
}

export interface Person {
  name: string;
  bio: string;
  image: string;
  popularity: number;
  place_of_birth: string;
  films: Scroller[];
  birthday: string;
}
