import { Scroller } from "@/typing";
import { create } from "zustand";

interface AppStore {
  favorites: Scroller[];
  setFavorites: (item: Scroller[]) => void;
}

export const useStore = create<AppStore>((set) => ({
  favorites: [],
  setFavorites: (item: Scroller[]) => set(() => ({ favorites: item })),
}));
