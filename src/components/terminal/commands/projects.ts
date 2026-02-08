/**
 * Projects command — lists all portfolio projects.
 */

import { CommandDefinition } from "@/types/terminal";
import { PROJECTS } from "@/data/projects";

export const projectsCommand: CommandDefinition = {
  name: "projects",
  description: "List all projects",
  aliases: ["ls projects", "ls"],
  execute: (args) => {
    // If a specific project name is given, show its details
    if (args.length > 0 && args[0] !== "projects") {
      const projectName = args.join(" ").toLowerCase();
      const project = PROJECTS.find(
        (p) => p.id.toLowerCase() === projectName || p.title.toLowerCase() === projectName
      );

      if (project) {
        return [
          `📁 ${project.title}`,
          `   ${project.description.en}`,
          `   Tech: ${project.techStack.join(", ")}`,
          project.githubUrl ? `   GitHub: ${project.githubUrl}` : "",
          project.liveUrl ? `   Live: ${project.liveUrl}` : "",
        ]
          .filter(Boolean)
          .join("\n");
      }

      return `Project "${args.join(" ")}" not found. Type 'projects' to see all.`;
    }

    // List all projects
    const lines = PROJECTS.map(
      (p) => `  📁 ${p.id.padEnd(20)} ${p.title}`
    );

    return ["Projects:", "", ...lines, "", 'Use "cat <project-id>" for details'].join(
      "\n"
    );
  },
};
