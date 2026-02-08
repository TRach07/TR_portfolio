/**
 * Types for user settings in the OS.
 * Theme, language, wallpaper, and sound preferences.
 */

export type Theme = "dark" | "light";

export type Language = "fr" | "en";

/** Wallpaper option available in the settings */
export interface WallpaperOption {
  id: string;
  name: string;
  /** Path to the image in /public/wallpapers/ */
  path: string;
}
