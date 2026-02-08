/**
 * Projects application — displays a grid of project cards.
 * Each card shows the project title, description, tech stack, and links.
 */

"use client";

import { motion } from "framer-motion";
import { useSettingsStore } from "@/store/useSettingsStore";
import { PROJECTS } from "@/data/projects";

export function ProjectsApp() {
  const language = useSettingsStore((s) => s.language);

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-os-text">
        {language === "fr" ? "Mes Projets" : "My Projects"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {PROJECTS.map((project, index) => (
          <motion.div
            key={project.id}
            className="p-4 rounded-lg border border-os-border bg-os-accent/5 hover:bg-os-accent/10 transition-colors"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
          >
            {/* Project title */}
            <h3 className="font-semibold text-os-text mb-2">{project.title}</h3>

            {/* Description */}
            <p className="text-xs text-os-text-secondary leading-relaxed mb-3">
              {project.description[language]}
            </p>

            {/* Tech stack tags */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 text-xs rounded-full bg-os-accent/20 text-os-accent"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Action links */}
            <div className="flex gap-2">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-os-accent hover:underline"
                >
                  {language === "fr" ? "Code" : "Code"} →
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-os-accent hover:underline"
                >
                  {language === "fr" ? "Démo" : "Demo"} →
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
