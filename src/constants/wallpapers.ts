/**
 * Available wallpaper options for the desktop settings.
 */

import { WallpaperOption } from "@/types/settings";

export const WALLPAPERS: WallpaperOption[] = [
  {
    id: "gradient-dark",
    name: "Dark Gradient",
    path: "/wallpapers/gradient-dark.svg",
  },
  {
    id: "gradient-light",
    name: "Light Gradient",
    path: "/wallpapers/gradient-light.svg",
  },
  {
    id: "abstract-geo",
    name: "Geometric",
    path: "/wallpapers/abstract-geo.svg",
  },
  {
    id: "minimal-dots",
    name: "Minimal",
    path: "/wallpapers/minimal-dots.svg",
  },
];

export const DEFAULT_WALLPAPER_ID = "gradient-dark";
