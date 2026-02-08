/**
 * Types for the application registry and configuration.
 * Each "app" is a window with its own content rendered inside.
 */

import { AppId, WindowSize } from "./window";

/** Configuration for an application in the OS */
export interface AppConfig {
  id: AppId;
  titleKey: string;
  icon: string;
  defaultSize: WindowSize;
  minSize: WindowSize;
  /** Whether to show the icon on the desktop */
  showOnDesktop: boolean;
  /** Whether to show the icon in the dock */
  showInDock: boolean;
}
