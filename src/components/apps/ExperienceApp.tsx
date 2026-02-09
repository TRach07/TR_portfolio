/**
 * Experience application — displays professional work history as a vertical timeline.
 * Each entry shows company logo, role, period, location, and description.
 */

"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useSettingsStore } from "@/store/useSettingsStore";
import { EXPERIENCES } from "@/data/experience";

export function ExperienceApp() {
  const language = useSettingsStore((s) => s.language);

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-os-text">
        {language === "fr" ? "Expériences Professionnelles" : "Professional Experience"}
      </h2>

      {/* Vertical timeline */}
      <div className="relative ml-2">
        {/* Timeline line */}
        <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-os-accent/30" />

        {EXPERIENCES.map((exp, index) => (
          <motion.div
            key={exp.id}
            className="relative flex items-start gap-4 pb-8 last:pb-0"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.15, duration: 0.4 }}
          >
            {/* Timeline dot */}
            <div className="relative z-10 w-4 h-4 mt-4 shrink-0 rounded-full bg-os-accent border-2 border-os-accent/50" />

            {/* Content card */}
            <div className="flex-1 p-4 rounded-lg border border-os-border bg-os-accent/5 hover:bg-os-accent/10 transition-colors">
              <div className="flex items-start gap-3">
                {exp.logo ? (
                  <div className="w-12 h-12 relative shrink-0 rounded-lg overflow-hidden bg-white p-1">
                    <Image
                      src={exp.logo}
                      alt={exp.company}
                      fill
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <span className="text-2xl shrink-0">💼</span>
                )}
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-os-text text-sm">
                    {exp.role[language]}
                  </h3>
                  <p className="text-xs text-os-accent mt-0.5">
                    {exp.company} · {exp.type[language]}
                  </p>
                  <div className="flex items-center gap-2 mt-1 text-xs text-os-text-secondary">
                    <span>{exp.period}</span>
                    <span>·</span>
                    <span>{exp.location}</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="mt-3 text-xs text-os-text-secondary leading-relaxed whitespace-pre-line">
                {exp.description[language]}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
