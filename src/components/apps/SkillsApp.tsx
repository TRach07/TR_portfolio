/**
 * Skills application — displays skill categories with animated progress bars.
 */

"use client";

import { motion } from "framer-motion";
import { useSettingsStore } from "@/store/useSettingsStore";
import { SKILL_CATEGORIES } from "@/data/skills";
import { t } from "@/lib/i18n";

export function SkillsApp() {
  const language = useSettingsStore((s) => s.language);

  return (
    <div className="space-y-6">
      {SKILL_CATEGORIES.map((category, catIndex) => (
        <motion.div
          key={category.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: catIndex * 0.15, duration: 0.3 }}
        >
          <h3 className="text-sm font-semibold text-os-accent mb-3">
            {t(language, category.titleKey)}
          </h3>

          <div className="space-y-2.5">
            {category.skills.map((skill, skillIndex) => (
              <div key={skill.name} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-os-text">{skill.name}</span>
                  <span className="text-os-text-secondary">{skill.level}%</span>
                </div>

                {/* Animated progress bar */}
                <div className="w-full h-1.5 bg-os-border rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-os-accent rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{
                      delay: catIndex * 0.15 + skillIndex * 0.08,
                      duration: 0.6,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
