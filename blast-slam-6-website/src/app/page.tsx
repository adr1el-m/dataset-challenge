import dynamic from "next/dynamic";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";
import SectionFade from "@/components/SectionFade";
import BackToTop from "@/components/BackToTop";

const sectionFallback = () => (
  <section className="relative py-20 sm:py-32 px-4 sm:px-6">
    <div className="max-w-7xl mx-auto">
      <div className="glass-card p-6 sm:p-8 shimmer-overlay">
        <div className="h-4 w-40 bg-dota-surface/60 rounded mb-3" />
        <div className="h-3 w-full bg-dota-surface/40 rounded" />
        <div className="h-3 w-5/6 bg-dota-surface/40 rounded mt-2" />
        <div className="h-3 w-2/3 bg-dota-surface/40 rounded mt-2" />
      </div>
    </div>
  </section>
);

const scrollHudFallback = () => (
  <div className="fixed right-3 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center">
    <div className="w-10 h-40 rounded-xl bg-dota-bg/70 border border-dota-border/30 shimmer-overlay" />
  </div>
);

const TournamentOverview = dynamic(() => import("@/components/TournamentOverview"), { ssr: true, loading: sectionFallback });
const TeamExplorer = dynamic(() => import("@/components/TeamExplorer"), { ssr: false, loading: sectionFallback });
const HeroMeta = dynamic(() => import("@/components/HeroMeta"), { ssr: false, loading: sectionFallback });
const DraftReplay = dynamic(() => import("@/components/DraftReplay"), { ssr: false, loading: sectionFallback });
const SynergyVsTempo = dynamic(() => import("@/components/SynergyVsTempo"), { ssr: false, loading: sectionFallback });
const ModelDashboard = dynamic(() => import("@/components/ModelDashboard"), { ssr: false, loading: sectionFallback });
const DraftSimulator = dynamic(() => import("@/components/DraftSimulator"), { ssr: false, loading: sectionFallback });
const PlayerSpotlight = dynamic(() => import("@/components/PlayerSpotlight"), { ssr: false, loading: sectionFallback });
const PredictTheWinner = dynamic(() => import("@/components/PredictTheWinner"), { ssr: false, loading: sectionFallback });
const KeyFindings = dynamic(() => import("@/components/KeyFindings"), { ssr: true, loading: sectionFallback });
const ScrollHUD = dynamic(() => import("@/components/ScrollHUD"), { ssr: false, loading: scrollHudFallback });

export default function Home() {
  return (
    <main className="relative">
      <Navigation />
      <ScrollHUD />
      <BackToTop />
      <SectionFade delay={0}>
        <HeroSection />
      </SectionFade>
      <SectionFade delay={0.05}>
        <TournamentOverview />
      </SectionFade>
      <SectionFade delay={0.1}>
        <TeamExplorer />
      </SectionFade>
      <SectionFade delay={0.15}>
        <HeroMeta />
      </SectionFade>
      <SectionFade delay={0.2}>
        <DraftReplay />
      </SectionFade>
      <SectionFade delay={0.25}>
        <SynergyVsTempo />
      </SectionFade>
      <SectionFade delay={0.3}>
        <ModelDashboard />
      </SectionFade>
      <SectionFade delay={0.35}>
        <DraftSimulator />
      </SectionFade>
      <SectionFade delay={0.4}>
        <PlayerSpotlight />
      </SectionFade>
      <SectionFade delay={0.45}>
        <PredictTheWinner />
      </SectionFade>
      <SectionFade delay={0.5}>
        <KeyFindings />
      </SectionFade>
      <Footer />
    </main>
  );
}
