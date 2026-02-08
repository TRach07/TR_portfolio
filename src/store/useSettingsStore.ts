/**
 * Zustand store for user preferences.
 * Manages theme, language, and wallpaper selection.
 */

import { create } from "zustand";
import { Theme, Language } from "@/types/settings";
import { DEFAULT_WALLPAPER_ID } from "@/constants/wallpapers";

interface SettingsStore {
  theme: Theme;
  language: Language;
  wallpaperId: string;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  setLanguage: (language: Language) => void;
  setWallpaper: (wallpaperId: string) => void;
}

export const useSettingsStore = create<SettingsStore>((set) => ({
  theme: "dark",
  language: "en",
  wallpaperId: DEFAULT_WALLPAPER_ID,

  /** Set the theme directly */
  setTheme: (theme: Theme) => set({ theme }),

  /** Toggle between dark and light themes */
  toggleTheme: () =>
    set((state) => ({
      theme: state.theme === "dark" ? "light" : "dark",
    })),

  /** Set the display language */
  setLanguage: (language: Language) => set({ language }),

  /** Set the desktop wallpaper by its ID */
  setWallpaper: (wallpaperId: string) => set({ wallpaperId }),
}));
