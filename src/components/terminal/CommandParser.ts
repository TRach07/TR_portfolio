/**
 * Command parser — resolves user input to the correct command and executes it.
 * Supports aliases and provides error messages for unknown commands.
 */

import { CommandDefinition } from "@/types/terminal";
import { helpCommand } from "./commands/help";
import { aboutCommand } from "./commands/about";
import { projectsCommand } from "./commands/projects";
import { skillsCommand } from "./commands/skills";
import { contactCommand } from "./commands/contact";
import { neofetchCommand } from "./commands/neofetch";
import { PROJECTS } from "@/data/projects";

/** Registry of all available commands */
const COMMANDS: CommandDefinition[] = [
  helpCommand,
  aboutCommand,
  projectsCommand,
  skillsCommand,
  contactCommand,
  neofetchCommand,
];

/** Special commands handled separately (theme, lang, clear, sudo) */
export type SpecialCommand =
  | { type: "clear" }
  | { type: "theme"; value: "dark" | "light" }
  | { type: "lang"; value: "en" | "fr" }
  | { type: "output"; output: string };

/**
 * Parses and executes a terminal command string.
 * Returns either a string output or a special command object.
 */
export function parseCommand(input: string): SpecialCommand {
  const trimmed = input.trim();
  if (!trimmed) return { type: "output", output: "" };

  const parts = trimmed.split(/\s+/);
  const commandName = parts[0].toLowerCase();
  const args = parts.slice(1);

  // Handle "clear" command
  if (commandName === "clear") {
    return { type: "clear" };
  }

  // Handle "theme" command
  if (commandName === "theme") {
    const value = args[0]?.toLowerCase();
    if (value === "dark" || value === "d") return { type: "theme", value: "dark" };
    if (value === "light" || value === "l") return { type: "theme", value: "light" };
    return { type: "output", output: 'Usage: theme [dark|light] or theme [d|l]' };
  }

  // Handle "lang" command
  if (commandName === "lang" || commandName === "language") {
    const value = args[0]?.toLowerCase();
    if (value === "en" || value === "english") return { type: "lang", value: "en" };
    if (value === "fr" || value === "french" || value === "français")
      return { type: "lang", value: "fr" };
    return { type: "output", output: 'Usage: lang [en|fr]' };
  }

  // Handle "sudo hire-me" Easter egg
  if (commandName === "sudo" && args.join(" ").toLowerCase() === "hire-me") {
    return {
      type: "output",
      output: [
        "",
        "  🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉",
        "",
        "    CONGRATULATIONS!",
        "    You have unlocked: HIRE MODE",
        "",
        "    Sending resume to all recruiters...",
        "    Just kidding! But thanks for the interest 😄",
        "",
        "    Feel free to reach out:",
        "    → Type 'contact' for my details",
        "",
        "  🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉",
        "",
      ].join("\n"),
    };
  }

  // Handle "cat" command — show project details
  if (commandName === "cat") {
    const projectName = args.join(" ").toLowerCase().replace(/\.md$/, "");
    const project = PROJECTS.find(
      (p) =>
        p.id.toLowerCase() === projectName ||
        p.title.toLowerCase() === projectName
    );

    if (project) {
      return {
        type: "output",
        output: [
          `📁 ${project.title}`,
          `${"─".repeat(40)}`,
          project.description.en,
          "",
          `Tech: ${project.techStack.join(", ")}`,
          project.githubUrl ? `GitHub: ${project.githubUrl}` : "",
          project.liveUrl ? `Live: ${project.liveUrl}` : "",
        ]
          .filter(Boolean)
          .join("\n"),
      };
    }

    if (args.length === 0) {
      return { type: "output", output: 'Usage: cat <project-id>\nType "projects" to see available projects.' };
    }

    return { type: "output", output: `cat: ${args.join(" ")}: No such file or directory` };
  }

  // Search in registered commands (including aliases)
  const fullInput = trimmed.toLowerCase();
  const command = COMMANDS.find(
    (cmd) =>
      cmd.name === commandName ||
      cmd.aliases?.some(
        (alias) => alias === commandName || alias === fullInput
      )
  );

  if (command) {
    return { type: "output", output: command.execute(args) };
  }

  // Command not found
  return {
    type: "output",
    output: `bash: ${commandName}: command not found. Type 'help' for available commands.`,
  };
}
