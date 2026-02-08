/**
 * Zustand store for the global OS state.
 * Manages boot phase, current screen, and sound toggle.
 */

import { create } from "zustand";

/** Possible phases of the OS lifecycle */
export type BootPhase = "booting" | "desktop";

interface OSStore {
  bootPhase: BootPhase;
  isSoundEnabled: boolean;
  setBootPhase: (phase: BootPhase) => void;
  toggleSound: () => void;
}

export const useOSStore = create<OSStore>((set) => ({
  bootPhase: "booting",
  isSoundEnabled: false,

  /** Transition to a new boot phase */
  setBootPhase: (phase: BootPhase) => set({ bootPhase: phase }),

  /** Toggle sound effects on/off */
  toggleSound: () => set((state) => ({ isSoundEnabled: !state.isSoundEnabled })),
}));
