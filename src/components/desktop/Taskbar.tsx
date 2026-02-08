/**
 * Taskbar component — top menu bar of the OS.
 * Displays the OS name, current time, and quick-access controls.
 */

"use client";

import { useState, useEffect } from "react";
import { useSettingsStore } from "@/store/useSettingsStore";

export function Taskbar() {
  const { language, setLanguage, theme, toggleTheme } = useSettingsStore();
  const [time, setTime] = useState("");

  /* Update the clock every second */
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString(language === "fr" ? "fr-FR" : "en-US", {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [language]);

  return (
    <div className="fixed top-0 left-0 right-0 h-7 bg-os-titlebar/90 backdrop-blur-md border-b border-os-border flex items-center justify-between px-4 z-50 text-xs">
      {/* Left: OS name */}
      <div className="flex items-center gap-4">
        <span className="font-semibold text-os-text">TahaOS</span>
      </div>

      {/* Right: Controls */}
      <div className="flex items-center gap-3">
        {/* Language toggle */}
        <button
          onClick={() => setLanguage(language === "en" ? "fr" : "en")}
          className="text-os-text-secondary hover:text-os-text transition-colors px-1.5 py-0.5 rounded hover:bg-white/10"
        >
          {language.toUpperCase()}
        </button>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="text-os-text-secondary hover:text-os-text transition-colors px-1.5 py-0.5 rounded hover:bg-white/10"
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </button>

        {/* Clock */}
        <span className="text-os-text-secondary tabular-nums">{time}</span>
      </div>
    </div>
  );
}
