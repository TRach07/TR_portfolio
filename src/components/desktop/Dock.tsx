/**
 * Dock component — macOS-style dock at the bottom of the screen.
 * Shows app icons with hover magnification effect.
 * Indicates which apps are currently open with a dot.
 */

"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useWindowStore } from "@/store/useWindowStore";
import { useSettingsStore } from "@/store/useSettingsStore";
import { APP_REGISTRY } from "@/constants/apps";
import { t } from "@/lib/i18n";

export function Dock() {
  const { openWindow, windows } = useWindowStore();
  const language = useSettingsStore((s) => s.language);

  /** Apps displayed in the dock */
  const dockApps = APP_REGISTRY.filter((app) => app.showInDock);

  /** Check if an app has an open window */
  const isAppOpen = (appId: string) =>
    windows.some((w) => w.appId === appId);

  return (
    <motion.div
      className="fixed bottom-2 left-1/2 -translate-x-1/2 z-50"
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="flex items-end gap-1 px-3 py-1.5 glass rounded-2xl">
        {dockApps.map((app) => (
          <motion.button
            key={app.id}
            className="relative flex flex-col items-center p-1 group"
            onClick={() => openWindow(app.id)}
            whileHover={{ scale: 1.3, y: -8 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            {/* Tooltip */}
            <span className="absolute -top-8 px-2 py-1 bg-os-surface rounded text-xs text-os-text whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-os-border">
              {t(language, app.titleKey)}
            </span>

            {/* App icon */}
            <div className="w-10 h-10 relative">
              <Image
                src={app.icon}
                alt={t(language, app.titleKey)}
                fill
                className="object-contain drop-shadow-lg"
              />
            </div>

            {/* Open indicator dot */}
            {isAppOpen(app.id) && (
              <div className="absolute -bottom-0.5 w-1 h-1 rounded-full bg-os-accent" />
            )}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
