/**
 * Window manager — renders all open windows and maps each to its app content.
 * Acts as the bridge between the window store and the app components.
 */

"use client";

import { AnimatePresence } from "framer-motion";
import { useWindowStore } from "@/store/useWindowStore";
import { Window } from "./Window";
import { AboutApp } from "@/components/apps/AboutApp";
import { ProjectsApp } from "@/components/apps/ProjectsApp";
import { SkillsApp } from "@/components/apps/SkillsApp";
import { CertificatesApp } from "@/components/apps/CertificatesApp";
import { ContactApp } from "@/components/apps/ContactApp";
import { TerminalApp } from "@/components/apps/TerminalApp";
import { SettingsApp } from "@/components/apps/SettingsApp";
import { AppId } from "@/types/window";

/** Maps an AppId to its corresponding React component */
function getAppContent(appId: AppId): React.ReactNode {
  switch (appId) {
    case "about":
      return <AboutApp />;
    case "projects":
      return <ProjectsApp />;
    case "skills":
      return <SkillsApp />;
    case "certificates":
      return <CertificatesApp />;
    case "contact":
      return <ContactApp />;
    case "terminal":
      return <TerminalApp />;
    case "settings":
      return <SettingsApp />;
    default:
      return <div>Unknown application</div>;
  }
}

export function WindowManager() {
  const windows = useWindowStore((s) => s.windows);

  return (
    <AnimatePresence>
      {windows.map((windowState) => (
        <Window key={windowState.id} windowState={windowState}>
          {getAppContent(windowState.appId)}
        </Window>
      ))}
    </AnimatePresence>
  );
}
