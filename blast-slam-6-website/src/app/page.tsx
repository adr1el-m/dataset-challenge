import dynamic from "next/dynamic";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";

// Dynamic imports for heavy/interactive components (better code splitting)
const TournamentOverview = dynamic(() => import("@/components/TournamentOverview"), { ssr: true });
const TeamExplorer = dynamic(() => import("@/components/TeamExplorer"), { ssr: false });
const HeroMeta = dynamic(() => import("@/components/HeroMeta"), { ssr: false });
const DraftReplay = dynamic(() => import("@/components/DraftReplay"), { ssr: false });
const SynergyVsTempo = dynamic(() => import("@/components/SynergyVsTempo"), { ssr: false });
const ModelDashboard = dynamic(() => import("@/components/ModelDashboard"), { ssr: false });
const DraftSimulator = dynamic(() => import("@/components/DraftSimulator"), { ssr: false });
const PlayerSpotlight = dynamic(() => import("@/components/PlayerSpotlight"), { ssr: false });
const PredictTheWinner = dynamic(() => import("@/components/PredictTheWinner"), { ssr: false });
const KeyFindings = dynamic(() => import("@/components/KeyFindings"), { ssr: true });
const ScrollHUD = dynamic(() => import("@/components/ScrollHUD"), { ssr: false });

export default function Home() {
  return (
    <main className="relative">
      <Navigation />
      <ScrollHUD />
      <HeroSection />
      <TournamentOverview />
      <TeamExplorer />
      <HeroMeta />
      <DraftReplay />
      <SynergyVsTempo />
      <ModelDashboard />
      <DraftSimulator />
      <PlayerSpotlight />
      <PredictTheWinner />
      <KeyFindings />
      <Footer />
    </main>
  );
}
