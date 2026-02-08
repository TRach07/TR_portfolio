/**
 * Boot screen component — the first thing visitors see.
 * Displays a BIOS-style text animation followed by a loading bar,
 * then transitions to the desktop. Users can skip with Enter or click.
 */

"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useOSStore } from "@/store/useOSStore";
import { BOOT_VARIANTS } from "@/constants/animations";

/** Lines displayed during the BIOS boot sequence */
const BOOT_LINES = [
  "TahaOS v1.0.0 — BIOS Setup Utility",
  "Copyright (C) 2026 Taha. All Rights Reserved.",
  "",
  "Checking system memory... 8192 MB OK",
  "Detecting primary drive... SSD 512 GB OK",
  "Loading kernel modules...",
  "Initializing network interfaces... OK",
  "Mounting portfolio filesystem...",
  "Starting TahaOS services...",
  "",
  "System ready. Launching desktop environment...",
];

/** Delay (ms) between each line appearing during the boot sequence */
const LINE_DELAY = 180;

export function BootScreen() {
  const setBootPhase = useOSStore((s) => s.setBootPhase);
  const [visibleLines, setVisibleLines] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isBooting, setIsBooting] = useState(true);

  /** Skip the boot sequence and go directly to the desktop */
  const skipBoot = useCallback(() => {
    setIsBooting(false);
    setBootPhase("desktop");
  }, [setBootPhase]);

  /* Animate boot lines appearing one by one */
  useEffect(() => {
    if (!isBooting) return;

    if (visibleLines < BOOT_LINES.length) {
      const timer = setTimeout(() => {
        setVisibleLines((prev) => prev + 1);
      }, LINE_DELAY);
      return () => clearTimeout(timer);
    }
  }, [visibleLines, isBooting]);

  /* Animate progress bar after all lines are shown */
  useEffect(() => {
    if (!isBooting || visibleLines < BOOT_LINES.length) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          // Transition to desktop after a short pause
          setTimeout(() => setBootPhase("desktop"), 400);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [visibleLines, isBooting, setBootPhase]);

  /* Listen for Enter key to skip */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") skipBoot();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [skipBoot]);

  return (
    <motion.div
      className="fixed inset-0 bg-black flex flex-col justify-center px-8 md:px-16 cursor-pointer"
      variants={BOOT_VARIANTS}
      initial="hidden"
      animate="visible"
      exit="exit"
      onClick={skipBoot}
    >
      {/* BIOS text output */}
      <div className="font-mono text-sm md:text-base text-green-400 max-w-3xl space-y-1">
        {BOOT_LINES.slice(0, visibleLines).map((line, index) => (
          <motion.p
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1 }}
            className={line === "" ? "h-4" : ""}
          >
            {line}
          </motion.p>
        ))}
      </div>

      {/* Progress bar — appears after all lines are shown */}
      {visibleLines >= BOOT_LINES.length && (
        <div className="mt-8 max-w-3xl">
          <div className="w-full h-2 bg-green-900/30 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-green-400 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.05, ease: "linear" }}
            />
          </div>
          <p className="text-green-400/60 font-mono text-xs mt-2">
            Loading... {progress}%
          </p>
        </div>
      )}

      {/* Skip hint */}
      <p className="absolute bottom-8 left-1/2 -translate-x-1/2 text-green-400/40 font-mono text-xs">
        Press Enter or click to skip
      </p>
    </motion.div>
  );
}
