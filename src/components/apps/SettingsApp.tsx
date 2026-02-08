/**
 * Settings application — lets users customize the OS experience.
 * Toggle theme, switch language, change wallpaper, and toggle sounds.
 */

"use client";

import { motion } from "framer-motion";
import { useSettingsStore } from "@/store/useSettingsStore";
import { useOSStore } from "@/store/useOSStore";
import { WALLPAPERS } from "@/constants/wallpapers";
import { t } from "@/lib/i18n";

export function SettingsApp() {
  const { theme, setTheme, language, setLanguage, wallpaperId, setWallpaper } =
    useSettingsStore();
  const { isSoundEnabled, toggleSound } = useOSStore();

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* ─── Theme ─── */}
      <section>
        <h3 className="text-sm font-semibold text-os-text mb-3">
          {t(language, "settings.theme")}
        </h3>
        <div className="flex gap-2">
          <button
            onClick={() => setTheme("dark")}
            className={`px-4 py-2 rounded-lg text-sm transition-all ${
              theme === "dark"
                ? "bg-os-accent text-white"
                : "bg-os-accent/10 text-os-text hover:bg-os-accent/20"
            }`}
          >
            🌙 {t(language, "settings.dark")}
          </button>
          <button
            onClick={() => setTheme("light")}
            className={`px-4 py-2 rounded-lg text-sm transition-all ${
              theme === "light"
                ? "bg-os-accent text-white"
                : "bg-os-accent/10 text-os-text hover:bg-os-accent/20"
            }`}
          >
            ☀️ {t(language, "settings.light")}
          </button>
        </div>
      </section>

      {/* ─── Language ─── */}
      <section>
        <h3 className="text-sm font-semibold text-os-text mb-3">
          {t(language, "settings.language")}
        </h3>
        <div className="flex gap-2">
          <button
            onClick={() => setLanguage("en")}
            className={`px-4 py-2 rounded-lg text-sm transition-all ${
              language === "en"
                ? "bg-os-accent text-white"
                : "bg-os-accent/10 text-os-text hover:bg-os-accent/20"
            }`}
          >
            English
          </button>
          <button
            onClick={() => setLanguage("fr")}
            className={`px-4 py-2 rounded-lg text-sm transition-all ${
              language === "fr"
                ? "bg-os-accent text-white"
                : "bg-os-accent/10 text-os-text hover:bg-os-accent/20"
            }`}
          >
            Français
          </button>
        </div>
      </section>

      {/* ─── Wallpaper ─── */}
      <section>
        <h3 className="text-sm font-semibold text-os-text mb-3">
          {t(language, "settings.wallpaper")}
        </h3>
        <div className="grid grid-cols-4 gap-2">
          {WALLPAPERS.map((wp) => (
            <button
              key={wp.id}
              onClick={() => setWallpaper(wp.id)}
              className={`relative h-16 rounded-lg overflow-hidden border-2 transition-all ${
                wallpaperId === wp.id
                  ? "border-os-accent scale-105"
                  : "border-transparent hover:border-os-border"
              }`}
              style={{
                backgroundImage: `url(${wp.path})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <span className="absolute bottom-0.5 left-0 right-0 text-center text-[10px] text-white drop-shadow-md">
                {wp.name}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* ─── Sound ─── */}
      <section>
        <h3 className="text-sm font-semibold text-os-text mb-3">
          {t(language, "settings.sound")}
        </h3>
        <button
          onClick={toggleSound}
          className={`px-4 py-2 rounded-lg text-sm transition-all ${
            isSoundEnabled
              ? "bg-os-accent text-white"
              : "bg-os-accent/10 text-os-text hover:bg-os-accent/20"
          }`}
        >
          {isSoundEnabled ? "🔊 On" : "🔇 Off"}
        </button>
      </section>
    </motion.div>
  );
}
