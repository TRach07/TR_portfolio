/**
 * Desktop component — the main workspace of the OS.
 * On desktop: renders wallpaper, icons, taskbar, dock, windows, and context menu.
 * On mobile: delegates to MobileDesktop for an iOS/Android-style experience.
 */

"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useSettingsStore } from "@/store/useSettingsStore";
import { useWindowStore } from "@/store/useWindowStore";
import { useIsMobile } from "@/hooks/useIsMobile";
import { APP_REGISTRY } from "@/constants/apps";
import { WALLPAPERS } from "@/constants/wallpapers";
import { Taskbar } from "./Taskbar";
import { Dock } from "./Dock";
import { DesktopIcon } from "./DesktopIcon";
import { MobileDesktop } from "./MobileDesktop";
import { WindowManager } from "@/components/window/WindowManager";

/** Lazy-load the 3D particle background to avoid SSR issues and reduce initial bundle */
const ParticleBackground = dynamic(
  () =>
    import("@/components/background/ParticleBackground").then(
      (mod) => mod.ParticleBackground
    ),
  { ssr: false }
);

interface ContextMenuState {
  visible: boolean;
  x: number;
  y: number;
}

export function Desktop() {
  const wallpaperId = useSettingsStore((s) => s.wallpaperId);
  const language = useSettingsStore((s) => s.language);
  const toggleTheme = useSettingsStore((s) => s.toggleTheme);
  const openWindow = useWindowStore((s) => s.openWindow);
  const isMobile = useIsMobile();

  const wallpaper = WALLPAPERS.find((w) => w.id === wallpaperId);
  const desktopApps = APP_REGISTRY.filter((app) => app.showOnDesktop);

  /* ─── Context menu state ─── */
  const [contextMenu, setContextMenu] = useState<ContextMenuState>({
    visible: false,
    x: 0,
    y: 0,
  });

  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({ visible: true, x: e.clientX, y: e.clientY });
  }, []);

  const closeContextMenu = useCallback(() => {
    setContextMenu((prev) => ({ ...prev, visible: false }));
  }, []);

  const contextMenuItems = [
    {
      label: language === "fr" ? "Changer le thème" : "Toggle Theme",
      action: () => { toggleTheme(); closeContextMenu(); },
    },
    {
      label: language === "fr" ? "Ouvrir le Terminal" : "Open Terminal",
      action: () => { openWindow("terminal"); closeContextMenu(); },
    },
    {
      label: language === "fr" ? "Paramètres" : "Settings",
      action: () => { openWindow("settings"); closeContextMenu(); },
    },
  ];

  /* On mobile, render the simplified app-grid layout */
  if (isMobile) return <MobileDesktop />;

  return (
    <motion.div
      className="fixed inset-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      onContextMenu={handleContextMenu}
      onClick={closeContextMenu}
    >
      {/* Wallpaper background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: wallpaper ? `url(${wallpaper.path})` : undefined,
          backgroundColor: "var(--os-bg)",
        }}
      />

      {/* 3D particle background overlay */}
      <ParticleBackground />

      {/* Top menu bar */}
      <Taskbar />

      {/* Desktop icons grid — flows top-to-bottom, then wraps to next column */}
      <div className="absolute top-12 left-4 bottom-20 flex flex-col flex-wrap gap-1 content-start pt-2">
        {desktopApps.map((app) => (
          <DesktopIcon key={app.id} app={app} />
        ))}
      </div>

      {/* Window manager renders all open windows */}
      <WindowManager />

      {/* Bottom dock */}
      <Dock />

      {/* ─── Right-click context menu ─── */}
      {contextMenu.visible && (
        <div
          className="fixed glass rounded-lg py-1 min-w-[180px] shadow-xl z-[9999]"
          style={{ top: contextMenu.y, left: contextMenu.x }}
          onClick={(e) => e.stopPropagation()}
        >
          {contextMenuItems.map((item, index) => (
            <button
              key={index}
              className="w-full text-left px-4 py-1.5 text-sm text-os-text hover:bg-os-accent/20 transition-colors"
              onClick={item.action}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </motion.div>
  );
}
