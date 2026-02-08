/**
 * Neofetch command — Easter egg displaying ASCII art system info.
 */

import { CommandDefinition } from "@/types/terminal";
import { PROFILE } from "@/data/profile";

export const neofetchCommand: CommandDefinition = {
  name: "neofetch",
  description: "System info (Easter egg)",
  execute: () => {
    const uptime = Math.floor((Date.now() - performance.timing.navigationStart) / 1000);
    const minutes = Math.floor(uptime / 60);
    const seconds = uptime % 60;

    return [
      "        ████████████        ",
      "      ██            ██      ",
      "    ██   ██      ██   ██    ",
      "    ██   ██      ██   ██      visitor@tahaos",
      "    ██                ██      ─────────────────",
      "    ██    ████████    ██      OS:      TahaOS v1.0.0",
      "      ██  ████████  ██        Host:    Web Browser",
      `      ██            ██        Uptime:  ${minutes}m ${seconds}s`,
      "        ████████████          Shell:   tahaOS-terminal",
      `                              User:    ${PROFILE.fullName}`,
      "    ████████████████████      Stack:   Next.js, React, TS",
      "                              Theme:   Glass Morphism",
      "  ██████████████████████████  Icons:   Custom SVG",
      "",
      "  ███ ███ ███ ███ ███ ███    ",
    ].join("\n");
  },
};
