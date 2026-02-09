/**
 * Types for the OS window management system.
 * Defines the structure and behavior of each window on the desktop.
 */

/** Window position on the desktop (in pixels) */
export interface WindowPosition {
  x: number;
  y: number;
}

/** Window dimensions (in pixels) */
export interface WindowSize {
  width: number;
  height: number;
}

/** Complete state of a window in the system */
export interface WindowState {
  id: string;
  appId: AppId;
  position: WindowPosition;
  size: WindowSize;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
}

/** Available application identifiers in the OS */
export type AppId =
  | "about"
  | "projects"
  | "skills"
  | "certificates"
  | "education"
  | "contact"
  | "terminal"
  | "settings";
