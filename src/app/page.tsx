/**
 * Main entry point for TahaOS Portfolio.
 * Orchestrates the boot sequence and desktop rendering.
 * This is a client component because it manages the OS lifecycle state.
 */

"use client";

import { useOSStore } from "@/store/useOSStore";
import { useSettingsStore } from "@/store/useSettingsStore";
import { BootScreen } from "@/components/boot/BootScreen";
import { Desktop } from "@/components/desktop/Desktop";
import { AnimatePresence } from "framer-motion";

export default function Home() {
  const bootPhase = useOSStore((s) => s.bootPhase);
  const theme = useSettingsStore((s) => s.theme);

  return (
    <div className={theme === "light" ? "light" : ""}>
      <AnimatePresence mode="wait">
        {bootPhase === "booting" && <BootScreen key="boot" />}
        {bootPhase === "desktop" && <Desktop key="desktop" />}
      </AnimatePresence>
    </div>
  );
}
