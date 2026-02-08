/**
 * Shared animation constants used across the entire project.
 * Centralizes durations, easings, and Framer Motion variants.
 */

/** Animation durations in seconds */
export const DURATIONS = {
  fast: 0.15,
  normal: 0.3,
  slow: 0.5,
  boot: 3,
} as const;

/** Custom easing curves */
export const EASINGS = {
  /** Natural easing for window transitions */
  window: [0.25, 0.46, 0.45, 0.94] as const,
  /** Subtle bounce effect */
  bounce: [0.34, 1.56, 0.64, 1] as const,
  /** Smooth easing for general transitions */
  smooth: [0.4, 0, 0.2, 1] as const,
} as const;

/** Framer Motion variants for window open/close animations */
export const WINDOW_VARIANTS = {
  hidden: {
    scale: 0.8,
    opacity: 0,
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: DURATIONS.normal,
      ease: EASINGS.window,
    },
  },
  exit: {
    scale: 0.8,
    opacity: 0,
    transition: {
      duration: DURATIONS.fast,
    },
  },
} as const;

/** Framer Motion variants for the boot sequence */
export const BOOT_VARIANTS = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.8 },
  },
} as const;
