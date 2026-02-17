"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Section {
  id: string;
  label: string;
  icon: string;
}

const sections: Section[] = [
  { id: "hero", label: "Home", icon: "◆" },
  { id: "overview", label: "Overview", icon: "◇" },
  { id: "teams", label: "Teams", icon: "⬡" },
  { id: "heroes", label: "Heroes", icon: "◈" },
  { id: "draft-replay", label: "Draft", icon: "⬢" },
  { id: "synergy", label: "Synergy", icon: "◇" },
  { id: "model", label: "Model", icon: "◆" },
  { id: "simulator", label: "Simulator", icon: "⬡" },
  { id: "players", label: "Players", icon: "◈" },
  { id: "predict", label: "Predict", icon: "⬢" },
  { id: "findings", label: "Findings", icon: "◆" },
];

export default function ScrollHUD() {
  const [activeSection, setActiveSection] = useState("hero");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Observe sections
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? scrollTop / docHeight : 0);
      setIsVisible(scrollTop > 300);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // IntersectionObserver for active section
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(section.id);
            }
          });
        },
        { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const activeIndex = useMemo(
    () => sections.findIndex((s) => s.id === activeSection),
    [activeSection]
  );

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 30 }}
          transition={{ duration: 0.4 }}
          className="fixed right-3 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center"
        >
          {/* Container */}
          <div className="relative bg-dota-bg/80 backdrop-blur-xl rounded-xl border border-dota-gold/10 px-2 py-4 shadow-2xl">
            {/* Top indicator */}
            <div className="text-[9px] font-mono text-dota-gold/50 text-center mb-3 uppercase tracking-widest">
              Map
            </div>

            {/* Vertical track */}
            <div className="relative flex flex-col items-center gap-0">
              {/* Progress line */}
              <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px] bg-dota-border/20" />
              <motion.div
                className="absolute left-1/2 -translate-x-1/2 top-0 w-[1px] bg-dota-gold/60"
                style={{ height: `${(activeIndex / Math.max(sections.length - 1, 1)) * 100}%` }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />

              {sections.map((section, i) => {
                const isActive = section.id === activeSection;
                const isPast = i < activeIndex;

                return (
                  <button
                    key={section.id}
                    onClick={() => handleClick(section.id)}
                    className="relative group flex items-center py-2 z-10"
                    title={section.label}
                  >
                    {/* Dot */}
                    <motion.div
                      className={`w-2.5 h-2.5 rounded-full border transition-all duration-300 ${
                        isActive
                          ? "bg-dota-gold border-dota-gold scale-125 shadow-[0_0_8px_rgba(195,255,0,0.5)]"
                          : isPast
                          ? "bg-dota-gold/40 border-dota-gold/40"
                          : "bg-dota-surface border-dota-border/30"
                      }`}
                      animate={
                        isActive
                          ? { scale: [1, 1.3, 1], opacity: [1, 0.8, 1] }
                          : {}
                      }
                      transition={
                        isActive
                          ? { duration: 2, repeat: Infinity, ease: "easeInOut" }
                          : {}
                      }
                    />

                    {/* Tooltip on hover */}
                    <div
                      className="absolute right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap"
                    >
                      <div className={`px-2.5 py-1 rounded-md text-[10px] font-mono ${
                        isActive
                          ? "bg-dota-gold/20 text-dota-gold border border-dota-gold/30"
                          : "bg-dota-surface/90 text-gray-400 border border-dota-border/30"
                      }`}>
                        {section.label}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Bottom progress */}
            <div className="mt-3 text-center">
              <div className="text-[10px] font-mono text-dota-gold/40">
                {Math.round(scrollProgress * 100)}%
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
