/**
 * Window component — the core UI element of the OS.
 * Renders a macOS-style window with title bar, traffic light buttons,
 * drag-to-move, resize handles, and Framer Motion animations.
 */

"use client";

import { useRef, useCallback, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useWindowStore } from "@/store/useWindowStore";
import { useSettingsStore } from "@/store/useSettingsStore";
import { WindowState } from "@/types/window";
import { getAppConfig } from "@/constants/apps";
import { WINDOW_VARIANTS } from "@/constants/animations";
import { t } from "@/lib/i18n";

interface WindowProps {
  windowState: WindowState;
  children: React.ReactNode;
}

/** Minimum distance from screen edges when dragging */
const EDGE_PADDING = 0;

export function Window({ windowState, children }: WindowProps) {
  const {
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    focusWindow,
    moveWindow,
    resizeWindow,
  } = useWindowStore();

  const language = useSettingsStore((s) => s.language);
  const config = getAppConfig(windowState.appId);
  const windowRef = useRef<HTMLDivElement>(null);

  /* Dragging state */
  const [isDragging, setIsDragging] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });

  /* Resizing state */
  const [isResizing, setIsResizing] = useState(false);
  const resizeDirection = useRef("");
  const resizeStart = useRef({ x: 0, y: 0, width: 0, height: 0, posX: 0, posY: 0 });

  const title = config ? t(language, config.titleKey) : windowState.appId;

  /* ─── Drag handlers ─── */
  const handleDragStart = useCallback(
    (e: React.MouseEvent) => {
      // Only drag from the title bar, ignore traffic light buttons
      if ((e.target as HTMLElement).closest("[data-window-controls]")) return;
      e.preventDefault();
      setIsDragging(true);
      focusWindow(windowState.id);
      dragOffset.current = {
        x: e.clientX - windowState.position.x,
        y: e.clientY - windowState.position.y,
      };
    },
    [windowState.id, windowState.position, focusWindow]
  );

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const newX = Math.max(EDGE_PADDING, e.clientX - dragOffset.current.x);
      const newY = Math.max(EDGE_PADDING, e.clientY - dragOffset.current.y);
      moveWindow(windowState.id, { x: newX, y: newY });
    };

    const handleMouseUp = () => setIsDragging(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, windowState.id, moveWindow]);

  /* ─── Resize handlers ─── */
  const handleResizeStart = useCallback(
    (direction: string) => (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsResizing(true);
      resizeDirection.current = direction;
      resizeStart.current = {
        x: e.clientX,
        y: e.clientY,
        width: windowState.size.width,
        height: windowState.size.height,
        posX: windowState.position.x,
        posY: windowState.position.y,
      };
      focusWindow(windowState.id);
    },
    [windowState, focusWindow]
  );

  useEffect(() => {
    if (!isResizing) return;

    const minWidth = config?.minSize.width ?? 300;
    const minHeight = config?.minSize.height ?? 200;

    const handleMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - resizeStart.current.x;
      const dy = e.clientY - resizeStart.current.y;
      const dir = resizeDirection.current;

      let newWidth = resizeStart.current.width;
      let newHeight = resizeStart.current.height;
      let newX = resizeStart.current.posX;
      let newY = resizeStart.current.posY;

      if (dir.includes("e")) newWidth = Math.max(minWidth, resizeStart.current.width + dx);
      if (dir.includes("s")) newHeight = Math.max(minHeight, resizeStart.current.height + dy);
      if (dir.includes("w")) {
        newWidth = Math.max(minWidth, resizeStart.current.width - dx);
        if (newWidth > minWidth) newX = resizeStart.current.posX + dx;
      }
      if (dir.includes("n")) {
        newHeight = Math.max(minHeight, resizeStart.current.height - dy);
        if (newHeight > minHeight) newY = resizeStart.current.posY + dy;
      }

      resizeWindow(windowState.id, { width: newWidth, height: newHeight });
      moveWindow(windowState.id, { x: newX, y: newY });
    };

    const handleMouseUp = () => setIsResizing(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing, windowState.id, config, resizeWindow, moveWindow]);

  /* ─── Maximized state styles ─── */
  const positionStyle = windowState.isMaximized
    ? { top: 28, left: 0, width: "100vw", height: "calc(100vh - 76px)" }
    : {
        top: windowState.position.y,
        left: windowState.position.x,
        width: windowState.size.width,
        height: windowState.size.height,
      };

  if (windowState.isMinimized) return null;

  return (
    <motion.div
      ref={windowRef}
      className="fixed glass rounded-lg shadow-2xl flex flex-col overflow-hidden"
      style={{
        ...positionStyle,
        zIndex: windowState.zIndex,
      }}
      variants={WINDOW_VARIANTS}
      initial="hidden"
      animate="visible"
      exit="exit"
      onMouseDown={() => focusWindow(windowState.id)}
    >
      {/* ─── Title Bar ─── */}
      <div
        className="flex items-center h-10 px-3 bg-os-titlebar border-b border-os-border shrink-0 cursor-grab active:cursor-grabbing"
        onMouseDown={handleDragStart}
      >
        {/* Traffic light buttons (close, minimize, maximize) */}
        <div className="flex gap-2" data-window-controls>
          <button
            onClick={() => closeWindow(windowState.id)}
            className="w-3 h-3 rounded-full bg-[#ff5f57] hover:brightness-110 transition-all"
            aria-label="Close"
          />
          <button
            onClick={() => minimizeWindow(windowState.id)}
            className="w-3 h-3 rounded-full bg-[#febc2e] hover:brightness-110 transition-all"
            aria-label="Minimize"
          />
          <button
            onClick={() => maximizeWindow(windowState.id)}
            className="w-3 h-3 rounded-full bg-[#28c840] hover:brightness-110 transition-all"
            aria-label="Maximize"
          />
        </div>

        {/* Window title */}
        <span className="flex-1 text-center text-sm text-os-text-secondary font-medium truncate pointer-events-none">
          {title}
        </span>

        {/* Spacer to balance the traffic lights */}
        <div className="w-14" />
      </div>

      {/* ─── Window Content ─── */}
      <div className="flex-1 overflow-auto os-scrollbar p-4">
        {children}
      </div>

      {/* ─── Resize Handles (hidden when maximized) ─── */}
      {!windowState.isMaximized && (
        <>
          {/* Edge handles */}
          <div className="absolute top-0 left-2 right-2 h-1 cursor-n-resize" onMouseDown={handleResizeStart("n")} />
          <div className="absolute bottom-0 left-2 right-2 h-1 cursor-s-resize" onMouseDown={handleResizeStart("s")} />
          <div className="absolute left-0 top-2 bottom-2 w-1 cursor-w-resize" onMouseDown={handleResizeStart("w")} />
          <div className="absolute right-0 top-2 bottom-2 w-1 cursor-e-resize" onMouseDown={handleResizeStart("e")} />

          {/* Corner handles */}
          <div className="absolute top-0 left-0 w-3 h-3 cursor-nw-resize" onMouseDown={handleResizeStart("nw")} />
          <div className="absolute top-0 right-0 w-3 h-3 cursor-ne-resize" onMouseDown={handleResizeStart("ne")} />
          <div className="absolute bottom-0 left-0 w-3 h-3 cursor-sw-resize" onMouseDown={handleResizeStart("sw")} />
          <div className="absolute bottom-0 right-0 w-3 h-3 cursor-se-resize" onMouseDown={handleResizeStart("se")} />
        </>
      )}
    </motion.div>
  );
}
