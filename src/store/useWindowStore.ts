/**
 * Zustand store for window management.
 * Handles opening, closing, positioning, resizing,
 * minimizing, maximizing, and z-index layering of windows.
 */

import { create } from "zustand";
import { AppId, WindowPosition, WindowSize, WindowState } from "@/types/window";
import { getAppConfig } from "@/constants/apps";

/** Counter for generating unique, incrementing z-index values */
let zIndexCounter = 1;

/** Computes a centered position with a slight random offset to stagger windows */
function getCenteredPosition(size: WindowSize): WindowPosition {
  if (typeof window === "undefined") return { x: 100, y: 100 };

  const offsetX = Math.floor(Math.random() * 40) - 20;
  const offsetY = Math.floor(Math.random() * 40) - 20;

  return {
    x: Math.max(0, (window.innerWidth - size.width) / 2 + offsetX),
    y: Math.max(0, (window.innerHeight - size.height) / 2 + offsetY - 40),
  };
}

interface WindowStore {
  windows: WindowState[];
  openWindow: (appId: AppId) => void;
  closeWindow: (windowId: string) => void;
  minimizeWindow: (windowId: string) => void;
  maximizeWindow: (windowId: string) => void;
  restoreWindow: (windowId: string) => void;
  focusWindow: (windowId: string) => void;
  moveWindow: (windowId: string, position: WindowPosition) => void;
  resizeWindow: (windowId: string, size: WindowSize) => void;
  getActiveWindow: () => WindowState | undefined;
}

export const useWindowStore = create<WindowStore>((set, get) => ({
  windows: [],

  /** Opens a new window for the given app, or focuses it if already open */
  openWindow: (appId: AppId) => {
    const existing = get().windows.find((w) => w.appId === appId);
    if (existing) {
      if (existing.isMinimized) {
        get().restoreWindow(existing.id);
      }
      get().focusWindow(existing.id);
      return;
    }

    const config = getAppConfig(appId);
    if (!config) return;

    const newWindow: WindowState = {
      id: `${appId}-${Date.now()}`,
      appId,
      position: getCenteredPosition(config.defaultSize),
      size: { ...config.defaultSize },
      isMinimized: false,
      isMaximized: false,
      zIndex: ++zIndexCounter,
    };

    set((state) => ({ windows: [...state.windows, newWindow] }));
  },

  /** Closes and removes a window */
  closeWindow: (windowId: string) => {
    set((state) => ({
      windows: state.windows.filter((w) => w.id !== windowId),
    }));
  },

  /** Minimizes a window (hides from desktop but stays in dock) */
  minimizeWindow: (windowId: string) => {
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === windowId ? { ...w, isMinimized: true } : w
      ),
    }));
  },

  /** Toggles a window between maximized and normal state */
  maximizeWindow: (windowId: string) => {
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === windowId
          ? { ...w, isMaximized: !w.isMaximized, zIndex: ++zIndexCounter }
          : w
      ),
    }));
  },

  /** Restores a minimized window back to the desktop */
  restoreWindow: (windowId: string) => {
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === windowId
          ? { ...w, isMinimized: false, zIndex: ++zIndexCounter }
          : w
      ),
    }));
  },

  /** Brings a window to the foreground */
  focusWindow: (windowId: string) => {
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === windowId ? { ...w, zIndex: ++zIndexCounter } : w
      ),
    }));
  },

  /** Moves a window to a new position */
  moveWindow: (windowId: string, position: WindowPosition) => {
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === windowId ? { ...w, position } : w
      ),
    }));
  },

  /** Resizes a window to new dimensions */
  resizeWindow: (windowId: string, size: WindowSize) => {
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === windowId ? { ...w, size } : w
      ),
    }));
  },

  /** Returns the window with the highest z-index (foreground window) */
  getActiveWindow: () => {
    const windows = get().windows.filter((w) => !w.isMinimized);
    if (windows.length === 0) return undefined;
    return windows.reduce((a, b) => (a.zIndex > b.zIndex ? a : b));
  },
}));
