import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { FeatureTabs } from "@/components/FeatureTabs";
import { BentoGrid } from "@/components/BentoGrid";
import { Pricing } from "@/components/Pricing";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-black overflow-x-hidden text-white font-sans">
      <Navbar />
      <main>
        <Hero />
        <FeatureTabs />
        <BentoGrid />
        <Pricing />
      </main>
      
      <Footer />
    </div>
  );
}
