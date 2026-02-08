/**
 * About / whoami command — displays personal info.
 */

import { CommandDefinition } from "@/types/terminal";
import { PROFILE } from "@/data/profile";

export const aboutCommand: CommandDefinition = {
  name: "about",
  description: "Display personal info",
  aliases: ["whoami"],
  execute: () => {
    return [
      `┌─────────────────────────────────┐`,
      `│  ${PROFILE.fullName}                          │`,
      `│  ${PROFILE.role.en}              │`,
      `│                                 │`,
      `│  📧 ${PROFILE.email}             │`,
      `│  📍 ${PROFILE.location.en}                    │`,
      `│  🔗 ${PROFILE.github}            │`,
      `└─────────────────────────────────┘`,
    ].join("\n");
  },
};
