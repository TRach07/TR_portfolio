/**
 * Mobile desktop — iOS/Android-style app grid for small screens.
 * Apps open fullscreen instead of in draggable windows.
 */

"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useSettingsStore } from "@/store/useSettingsStore";
import { APP_REGISTRY } from "@/constants/apps";
import { WALLPAPERS } from "@/constants/wallpapers";
import { t } from "@/lib/i18n";
import { AppId } from "@/types/window";
import { AboutApp } from "@/components/apps/AboutApp";
import { ProjectsApp } from "@/components/apps/ProjectsApp";
import { SkillsApp } from "@/components/apps/SkillsApp";
import { CertificatesApp } from "@/components/apps/CertificatesApp";
import { ContactApp } from "@/components/apps/ContactApp";
import { TerminalApp } from "@/components/apps/TerminalApp";
import { SettingsApp } from "@/components/apps/SettingsApp";

/** Maps an AppId to its component */
function getAppContent(appId: AppId): React.ReactNode {
  switch (appId) {
    case "about": return <AboutApp />;
    case "projects": return <ProjectsApp />;
    case "skills": return <SkillsApp />;
    case "certificates": return <CertificatesApp />;
    case "contact": return <ContactApp />;
    case "terminal": return <TerminalApp />;
    case "settings": return <SettingsApp />;
  }
}

export function MobileDesktop() {
  const language = useSettingsStore((s) => s.language);
  const wallpaperId = useSettingsStore((s) => s.wallpaperId);
  const [openApp, setOpenApp] = useState<AppId | null>(null);

  const wallpaper = WALLPAPERS.find((w) => w.id === wallpaperId);

  return (
    <motion.div
      className="fixed inset-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Wallpaper */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: wallpaper ? `url(${wallpaper.path})` : undefined,
          backgroundColor: "var(--os-bg)",
        }}
      />

      {/* Status bar */}
      <div className="relative z-10 flex items-center justify-between px-4 h-10 text-xs text-os-text-secondary">
        <span className="font-semibold text-os-text">TahaOS</span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => useSettingsStore.getState().setLanguage(language === "en" ? "fr" : "en")}
            className="px-1.5"
          >
            {language.toUpperCase()}
          </button>
          <span className="tabular-nums">
            {new Date().toLocaleTimeString(language === "fr" ? "fr-FR" : "en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      </div>

      {/* App grid */}
      <div className="relative z-10 grid grid-cols-3 gap-6 px-8 pt-8">
        {APP_REGISTRY.filter((a) => a.showInDock).map((app, index) => (
          <motion.button
            key={app.id}
            className="flex flex-col items-center gap-1.5"
            onClick={() => setOpenApp(app.id)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileTap={{ scale: 0.9 }}
          >
            <div className="w-14 h-14 relative">
              <Image
                src={app.icon}
                alt={t(language, app.titleKey)}
                fill
                className="object-contain drop-shadow-lg"
              />
            </div>
            <span className="text-[10px] text-os-text text-center drop-shadow-md">
              {t(language, app.titleKey)}
            </span>
          </motion.button>
        ))}
      </div>

      {/* Fullscreen app overlay */}
      <AnimatePresence>
        {openApp && (
          <motion.div
            className="fixed inset-0 z-50 bg-os-bg flex flex-col"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            {/* App header with back button */}
            <div className="flex items-center h-12 px-4 bg-os-titlebar border-b border-os-border shrink-0">
              <button
                onClick={() => setOpenApp(null)}
                className="text-os-accent text-sm font-medium"
              >
                ← {language === "fr" ? "Retour" : "Back"}
              </button>
              <span className="flex-1 text-center text-sm text-os-text font-medium">
                {t(language, APP_REGISTRY.find((a) => a.id === openApp)?.titleKey ?? "")}
              </span>
              <div className="w-12" />
            </div>

            {/* App content */}
            <div className="flex-1 overflow-auto os-scrollbar p-4">
              {getAppContent(openApp)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
