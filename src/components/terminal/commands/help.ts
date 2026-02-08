/**
 * Help command — lists all available terminal commands.
 */

import { CommandDefinition } from "@/types/terminal";

export const helpCommand: CommandDefinition = {
  name: "help",
  description: "List all available commands",
  execute: () => {
    return [
      "Available commands:",
      "",
      "  help          — Show this help message",
      "  about         — Display personal info",
      "  whoami        — Alias for about",
      "  projects      — List all projects",
      "  skills        — Show skill categories",
      "  contact       — Show contact info",
      "  neofetch      — System info (Easter egg)",
      "  theme [d|l]   — Switch theme (dark/light)",
      "  lang [en|fr]  — Switch language",
      "  clear         — Clear the terminal",
      "  sudo hire-me  — ???",
    ].join("\n");
  },
};
