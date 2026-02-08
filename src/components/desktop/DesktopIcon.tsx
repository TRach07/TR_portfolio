/**
 * Desktop icon component — clickable app shortcut on the desktop.
 * Double-click opens the corresponding application window.
 */

"use client";

import Image from "next/image";
import { useWindowStore } from "@/store/useWindowStore";
import { useSettingsStore } from "@/store/useSettingsStore";
import { AppConfig } from "@/types/apps";
import { t } from "@/lib/i18n";

interface DesktopIconProps {
  app: AppConfig;
}

export function DesktopIcon({ app }: DesktopIconProps) {
  const openWindow = useWindowStore((s) => s.openWindow);
  const language = useSettingsStore((s) => s.language);

  return (
    <button
      className="flex flex-col items-center gap-1.5 p-3 rounded-lg hover:bg-white/10 transition-colors w-20 group"
      onDoubleClick={() => openWindow(app.id)}
    >
      <div className="w-12 h-12 relative group-hover:scale-110 transition-transform">
        <Image
          src={app.icon}
          alt={t(language, app.titleKey)}
          fill
          className="object-contain drop-shadow-lg"
        />
      </div>
      <span className="text-xs text-os-text text-center leading-tight truncate w-full drop-shadow-md">
        {t(language, app.titleKey)}
      </span>
    </button>
  );
}
