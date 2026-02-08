/**
 * Contact command — shows contact information.
 */

import { CommandDefinition } from "@/types/terminal";
import { PROFILE } from "@/data/profile";

export const contactCommand: CommandDefinition = {
  name: "contact",
  description: "Show contact info",
  execute: () => {
    return [
      "Get in touch:",
      "",
      `  📧 Email:    ${PROFILE.email}`,
      `  🐙 GitHub:   ${PROFILE.github}`,
      `  💼 LinkedIn: ${PROFILE.linkedin}`,
    ].join("\n");
  },
};
