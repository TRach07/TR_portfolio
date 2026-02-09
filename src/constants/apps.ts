/**
 * Centralized registry of all OS applications.
 * Each app defines its icon, default size, and visibility settings.
 */

import { AppConfig } from "@/types/apps";

export const APP_REGISTRY: AppConfig[] = [
  {
    id: "about",
    titleKey: "apps.about.title",
    icon: "/icons/about.svg",
    defaultSize: { width: 700, height: 500 },
    minSize: { width: 400, height: 300 },
    showOnDesktop: true,
    showInDock: true,
  },
  {
    id: "projects",
    titleKey: "apps.projects.title",
    icon: "/icons/projects.svg",
    defaultSize: { width: 800, height: 550 },
    minSize: { width: 500, height: 400 },
    showOnDesktop: true,
    showInDock: true,
  },
  {
    id: "skills",
    titleKey: "apps.skills.title",
    icon: "/icons/skills.svg",
    defaultSize: { width: 650, height: 500 },
    minSize: { width: 400, height: 300 },
    showOnDesktop: true,
    showInDock: true,
  },
  {
    id: "certificates",
    titleKey: "apps.certificates.title",
    icon: "/icons/certificates.svg",
    defaultSize: { width: 750, height: 550 },
    minSize: { width: 450, height: 350 },
    showOnDesktop: true,
    showInDock: true,
  },
  {
    id: "education",
    titleKey: "apps.education.title",
    icon: "/icons/education.svg",
    defaultSize: { width: 650, height: 500 },
    minSize: { width: 400, height: 350 },
    showOnDesktop: true,
    showInDock: true,
  },
  {
    id: "contact",
    titleKey: "apps.contact.title",
    icon: "/icons/contact.svg",
    defaultSize: { width: 500, height: 450 },
    minSize: { width: 350, height: 300 },
    showOnDesktop: true,
    showInDock: true,
  },
  {
    id: "terminal",
    titleKey: "apps.terminal.title",
    icon: "/icons/terminal.svg",
    defaultSize: { width: 700, height: 450 },
    minSize: { width: 400, height: 250 },
    showOnDesktop: true,
    showInDock: true,
  },
  {
    id: "settings",
    titleKey: "apps.settings.title",
    icon: "/icons/settings.svg",
    defaultSize: { width: 550, height: 450 },
    minSize: { width: 350, height: 300 },
    showOnDesktop: false,
    showInDock: true,
  },
];

/** Retrieve an app config by its ID */
export function getAppConfig(appId: string): AppConfig | undefined {
  return APP_REGISTRY.find((app) => app.id === appId);
}
