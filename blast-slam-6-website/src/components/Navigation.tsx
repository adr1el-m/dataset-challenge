"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const sections = [
  { id: "hero", label: "Home" },
  { id: "overview", label: "Overview" },
  { id: "teams", label: "Teams" },
  { id: "heroes", label: "Heroes" },
  { id: "analysis", label: "Analysis" },
  { id: "model", label: "Model" },
  { id: "quiz", label: "Quiz" },
  { id: "predictions", label: "Findings" },
];

export default function Navigation() {
  const [active, setActive] = useState("hero");
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const scrollPos = window.scrollY + 200;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el && el.offsetTop <= scrollPos) {
          setActive(sections[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-dota-gold z-[60] origin-left"
        style={{ width: progressWidth }}
      />

      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "nav-blur bg-dota-bg/80 border-b border-dota-border/30 py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a href="#hero" className="flex items-center gap-2 group">
            <Image
              src="/blast_slam_logo.png"
              alt="BLAST Slam 6"
              width={32}
              height={32}
              sizes="32px"
              className="h-8 w-auto object-contain"
            />
            <span className="font-heading font-bold text-sm tracking-wider hidden sm:block">
              <span className="text-dota-gold">BLAST</span>{" "}
              <span className="text-dota-text-dim">SLAM 6</span>
            </span>
          </a>

          {/* Champion badge */}
          <div
            className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500/20 to-cyan-400/10 border border-cyan-400/30"
          >
            <span className="text-cyan-300 text-[10px] font-bold tracking-widest uppercase">🏆 Liquid</span>
          </div>

          <div className="hidden md:flex items-center gap-1">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className={`relative px-3 py-1.5 text-xs font-medium tracking-wide uppercase transition-colors duration-300 rounded-full ${
                  active === s.id ? "text-dota-gold" : "text-dota-text-dim hover:text-dota-text"
                }`}
              >
                {active === s.id && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute inset-0 bg-dota-gold/10 border border-dota-gold/30 rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{s.label}</span>
              </a>
            ))}
          </div>

          <a
            href="#quiz"
            className="px-4 py-2 bg-gradient-to-r from-dota-gold/20 to-dota-gold/10 border border-dota-gold/40 rounded-full text-dota-gold text-xs font-semibold tracking-wide uppercase hover:from-dota-gold/30 hover:to-dota-gold/20 transition-all duration-300"
          >
            Play Quiz
          </a>
        </div>
      </motion.nav>
    </>
  );
}
