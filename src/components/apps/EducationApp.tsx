/**
 * Education application — displays academic background as a vertical timeline.
 * Each entry shows school logo, degree, institution, and period.
 */

"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useSettingsStore } from "@/store/useSettingsStore";
import { EDUCATION } from "@/data/education";

export function EducationApp() {
  const language = useSettingsStore((s) => s.language);

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-os-text">
        {language === "fr" ? "Formation" : "Education"}
      </h2>

      {EDUCATION.length === 0 && (
        <p className="text-os-text-secondary text-sm">
          {language === "fr" ? "Aucune formation ajoutée." : "No education added yet."}
        </p>
      )}

      {/* Vertical timeline */}
      <div className="relative ml-2">
        {/* Timeline line */}
        <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-os-accent/30" />

        {EDUCATION.map((edu, index) => (
          <motion.div
            key={edu.id}
            className="relative flex items-start gap-4 pb-8 last:pb-0"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.15, duration: 0.4 }}
          >
            {/* Timeline dot */}
            <div className="relative z-10 w-4 h-4 mt-4 shrink-0 rounded-full bg-os-accent border-2 border-os-accent/50" />

            {/* Content card with logo */}
            <div className="flex-1 p-4 rounded-lg border border-os-border bg-os-accent/5 hover:bg-os-accent/10 transition-colors">
              <div className="flex items-start gap-3">
                {edu.logo ? (
                  <div className="w-12 h-12 relative shrink-0 rounded-lg overflow-hidden bg-white p-1">
                    <Image
                      src={edu.logo}
                      alt={edu.school[language]}
                      fill
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <span className="text-2xl shrink-0">🎓</span>
                )}
                <div className="min-w-0">
                  <h3 className="font-semibold text-os-text text-sm">
                    {edu.degree[language]}
                  </h3>
                  <p className="text-xs text-os-accent mt-1">
                    {edu.school[language]}
                  </p>
                  <div className="flex items-center gap-2 mt-1 text-xs text-os-text-secondary">
                    <span>{edu.period}</span>
                    <span>·</span>
                    <span>{edu.location}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
