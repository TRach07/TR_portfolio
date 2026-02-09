/**
 * Skills application — displays tech skills as a grid of logo cards.
 * Each card shows the technology icon, name, and reveals proficiency on hover.
 * ML/DL section has a special "concepts" area displayed as styled tags.
 */

"use client";

import { motion } from "framer-motion";
import { useSettingsStore } from "@/store/useSettingsStore";
import { SKILL_CATEGORIES, DEVICON_BASE, Skill, ConceptSkill } from "@/data/skills";
import { t } from "@/lib/i18n";

/** Returns an RGB string based on skill level */
function getLevelColor(level: number): string {
  if (level >= 85) return "34, 197, 94";
  if (level >= 70) return "59, 130, 246";
  if (level >= 55) return "245, 158, 11";
  return "239, 68, 68";
}

/** Individual skill card with tech logo */
function SkillCard({ skill, delay }: { skill: Skill; delay: number }) {
  const rgb = getLevelColor(skill.level);
  const src = skill.local ? skill.icon : `${DEVICON_BASE}/${skill.icon}`;

  return (
    <motion.div
      className="group relative flex flex-col items-center gap-2 p-3 rounded-xl border border-os-border bg-os-bg/30 cursor-default transition-all duration-300 hover:border-transparent"
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.3 }}
      whileHover={{ y: -4, scale: 1.05 }}
    >
      {/* Glow effect on hover */}
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ boxShadow: `0 0 20px rgba(${rgb}, 0.15), inset 0 0 20px rgba(${rgb}, 0.05)` }}
      />

      {/* Tech logo */}
      <div className="relative w-10 h-10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={skill.name}
          width={40}
          height={40}
          className="w-full h-full object-contain drop-shadow-sm group-hover:drop-shadow-lg transition-all duration-300"
          loading="lazy"
        />
      </div>

      {/* Skill name */}
      <span className="relative text-[11px] text-os-text text-center leading-tight font-medium">
        {skill.name}
      </span>

      {/* Level badge — appears on hover */}
      <span
        className="absolute -top-2 -right-1 text-[9px] font-bold px-1.5 py-0.5 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        style={{ backgroundColor: `rgba(${rgb}, 0.9)` }}
      >
        {skill.level}%
      </span>
    </motion.div>
  );
}

/** Concept tag — styled text chip for ML/DL concepts */
function ConceptTag({ concept, delay }: { concept: ConceptSkill; delay: number }) {
  const rgb = getLevelColor(concept.level);

  return (
    <motion.span
      className="group relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-os-border bg-os-bg/30 text-xs text-os-text font-medium cursor-default transition-all duration-200 hover:border-transparent"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3 }}
      whileHover={{ scale: 1.05 }}
    >
      {/* Color dot indicator */}
      <span
        className="w-2 h-2 rounded-full shrink-0"
        style={{ backgroundColor: `rgba(${rgb}, 0.8)` }}
      />
      {concept.name}

      {/* Level badge on hover */}
      <span
        className="absolute -top-2 -right-1 text-[9px] font-bold px-1.5 py-0.5 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        style={{ backgroundColor: `rgba(${rgb}, 0.9)` }}
      >
        {concept.level}%
      </span>
    </motion.span>
  );
}

export function SkillsApp() {
  const language = useSettingsStore((s) => s.language);

  return (
    <div className="space-y-6">
      {SKILL_CATEGORIES.map((category, catIndex) => (
        <motion.div
          key={category.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: catIndex * 0.1, duration: 0.3 }}
        >
          {/* Category title */}
          <h3 className="text-sm font-semibold text-os-accent mb-3 flex items-center gap-2">
            <span className="w-1 h-4 rounded-full bg-os-accent" />
            {t(language, category.titleKey)}
          </h3>

          {/* Concept tags (ML/DL section) */}
          {category.concepts && (
            <div className="flex flex-wrap gap-2 mb-4">
              {category.concepts.map((concept, i) => (
                <ConceptTag
                  key={concept.name}
                  concept={concept}
                  delay={catIndex * 0.08 + i * 0.04}
                />
              ))}
            </div>
          )}

          {/* Tools subtitle for ML section */}
          {category.concepts && (
            <p className="text-xs text-os-text-secondary mb-2">
              {language === "fr" ? "Outils & Frameworks" : "Tools & Frameworks"}
            </p>
          )}

          {/* Skills grid */}
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-2">
            {category.skills.map((skill, skillIndex) => (
              <SkillCard
                key={skill.name}
                skill={skill}
                delay={catIndex * 0.08 + skillIndex * 0.03}
              />
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
