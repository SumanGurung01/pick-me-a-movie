import { Scroller } from "@/typing";
import { create } from "zustand";

interface AppStore {
  favorites: Scroller[];
  setFavorites: (item: Scroller[]) => void;
  resultMovies: Scroller[];
  setResultMovies: (movies: Scroller[]) => void;
}

export const useStore = create<AppStore>((set) => ({
  favorites: [],
  setFavorites: (item: Scroller[]) => set(() => ({ favorites: item })),
  resultMovies: [],
  setResultMovies: (movies: Scroller[]) =>
    set(() => ({ resultMovies: movies })),
}));
