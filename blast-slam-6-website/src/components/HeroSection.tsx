"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import dynamic from "next/dynamic";
import Image from "next/image";
import { tournamentStats, teams, isImageLogo } from "@/data/tournament";

const ParticleArena = dynamic(() => import("./ParticleArena"), { ssr: false });

const stats = [
  { label: "Teams", value: tournamentStats.teamsParticipated, suffix: "" },
  { label: "Total Games", value: tournamentStats.totalGames, suffix: "" },
  { label: "Comeback Rate", value: Math.round(tournamentStats.comebackRate * 100), suffix: "%" },
  { label: "Prize Pool", value: tournamentStats.prizePool, suffix: "", prefix: "$", format: true },
];

function AnimatedNumber({ value, prefix = "", suffix = "", format = false, delay = 0 }: { value: number; prefix?: string; suffix?: string; format?: boolean; delay?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const duration = 2000;
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        setCount(Math.round(eased * value));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, delay);
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return (
    <span>
      {prefix}{format ? count.toLocaleString() : count}{suffix}
    </span>
  );
}

export default function HeroSection() {
  const { scrollY } = useScroll();
  const titleY = useTransform(scrollY, [0, 500], [0, 100]);
  const titleOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const bgScale = useTransform(scrollY, [0, 500], [1, 1.15]);
  const liquid = teams.find((team) => team.tag === "Liquid");
  const navi = teams.find((team) => team.tag === "NaVi");
  const liquidLogo = liquid?.logo || "💧";
  const naviLogo = navi?.logo || "⚔️";

  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* 3D Background with parallax */}
      <motion.div className="absolute inset-0" style={{ scale: bgScale }}>
        <ParticleArena />
      </motion.div>

      {/* Scan line effect */}
      <div className="absolute inset-0 scan-line z-[1] pointer-events-none" />

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-dota-bg/50 to-dota-bg z-[1]" />

      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
        style={{ y: titleY, opacity: titleOpacity }}
      >
        {/* CONCLUDED Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1, type: "spring" }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-600/80 to-cyan-500/80 border border-cyan-400/40 mb-4"
        >
          <span className="text-white text-xs font-bold tracking-widest uppercase">
            🏆 Tournament Concluded
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-dota-gold/10 border border-dota-gold/30 mb-8"
        >
          <span className="text-dota-gold text-xs font-semibold tracking-widest uppercase">
            February 3–15, 2026 • Malta • Complete
          </span>
        </motion.div>

        {/* Main title with stagger */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, type: "spring", stiffness: 50 }}
          className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.9] mb-6"
        >
          <motion.span
            className="text-gradient-gold inline-block"
            animate={{ backgroundPosition: ["0% center", "200% center"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            BLAST
          </motion.span>
          <br />
          <motion.span
            className="text-white inline-block"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            SLAM 6
          </motion.span>
        </motion.h1>

        {/* Champion Announcement */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, filter: "blur(20px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.2, delay: 0.9, type: "spring" }}
          className="mb-4"
        >
          <motion.p
            className="text-lg sm:text-xl text-dota-text-dim font-light mb-2"
          >
            Twelve teams. $1,000,000. One champion.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex items-center justify-center gap-4"
          >
            <motion.span
              className="h-12 w-12 sm:h-14 sm:w-14 inline-flex items-center justify-center"
              animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
            >
              {isImageLogo(liquidLogo) ? (
                <Image
                  src={liquidLogo}
                  alt="Team Liquid logo"
                  width={56}
                  height={56}
                  sizes="56px"
                  className="h-full w-full object-contain drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]"
                />
              ) : (
                <span className="text-5xl sm:text-6xl">{liquidLogo}</span>
              )}
            </motion.span>
            <div>
              <motion.h2
                className="font-heading text-3xl sm:text-4xl md:text-5xl font-black"
                style={{ color: "#06b6d4" }}
                animate={{ textShadow: ["0 0 20px rgba(6,182,212,0)", "0 0 40px rgba(6,182,212,0.6)", "0 0 20px rgba(6,182,212,0)"] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                TEAM LIQUID
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, letterSpacing: "0em" }}
                animate={{ opacity: 1, letterSpacing: "0.25em" }}
                transition={{ duration: 1, delay: 1.5 }}
                className="text-dota-gold text-sm font-bold uppercase"
              >
                Champions
              </motion.p>
            </div>
            <motion.span
              className="text-5xl sm:text-6xl"
              animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 4, repeat: Infinity, repeatDelay: 1 }}
            >
              🏆
            </motion.span>
          </motion.div>
        </motion.div>

        {/* The reverse sweep story */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="text-sm text-dota-text-dim/80 mb-4 max-w-xl mx-auto"
        >
          A dominant <span className="text-cyan-400 font-bold">3-1</span> Grand Final victory over Natus Vincere.{" "}
          <span className="text-cyan-400 font-semibold">miCKe and Nisha</span> led from the front.{" "}
          <span className="text-dota-gold font-semibold">Synergy conquered tempo.</span>
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="text-xs text-dota-text-dim/50 mb-8"
        >
          A complete data-driven post-tournament analysis. Synergy won over tempo.
        </motion.p>

        {/* Grand Final Score */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.0 }}
          className="flex items-center justify-center gap-6 mb-10"
        >
          <motion.div whileHover={{ scale: 1.1 }} className="text-center">
            <div className="h-9 w-9 mx-auto mb-1 flex items-center justify-center">
              {isImageLogo(liquidLogo) ? (
                <Image
                  src={liquidLogo}
                  alt="Team Liquid logo"
                  width={36}
                  height={36}
                  sizes="36px"
                  className="h-full w-full object-contain drop-shadow-[0_0_6px_rgba(6,182,212,0.5)]"
                />
              ) : (
                <span className="text-3xl">{liquidLogo}</span>
              )}
            </div>
            <div className="text-xs text-cyan-400 font-bold">Liquid</div>
            <div className="font-heading text-2xl font-bold text-cyan-400">3</div>
          </motion.div>
          <div className="flex flex-col items-center">
            <div className="font-heading text-xs text-dota-gold/60 uppercase tracking-wider mb-1">Grand Final</div>
            <div className="font-heading text-lg text-dota-text-dim font-bold">—</div>
          </div>
          <motion.div whileHover={{ scale: 1.1 }} className="text-center">
            <div className="h-9 w-9 mx-auto mb-1 flex items-center justify-center">
              {isImageLogo(naviLogo) ? (
                <Image
                  src={naviLogo}
                  alt="Natus Vincere logo"
                  width={36}
                  height={36}
                  sizes="36px"
                  className="h-full w-full object-contain drop-shadow-[0_0_6px_rgba(0,0,0,0.35)]"
                />
              ) : (
                <span className="text-3xl">{naviLogo}</span>
              )}
            </div>
            <div className="text-xs text-dota-text-dim font-semibold">NaVi</div>
            <div className="font-heading text-2xl font-bold text-dota-text-dim">1</div>
          </motion.div>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.3 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto mb-12"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8, rotateX: -15 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0 }}
              transition={{ duration: 0.6, delay: 2.4 + i * 0.12, type: "spring" }}
              whileHover={{ scale: 1.05, rotateY: 5 }}
              className="glass-card p-4 cursor-default"
            >
              <div className="text-2xl sm:text-3xl font-heading font-bold text-white">
                <AnimatedNumber value={stat.value} prefix={stat.prefix} suffix={stat.suffix} format={stat.format} delay={2600 + i * 150} />
              </div>
              <div className="text-xs text-dota-text-dim mt-1 uppercase tracking-wider">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 3.0 }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs text-dota-text-dim/50 tracking-widest uppercase">Scroll to explore the full story</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-5 h-8 rounded-full border border-dota-gold/30 flex items-start justify-center pt-1.5"
          >
            <div className="w-1 h-2 rounded-full bg-dota-gold" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dota-bg to-transparent z-[2]" />
    </section>
  );
}
