import Footer from "@/page/landing/ui/Footer";
import { Header } from "@/page/landing/ui/Header";
import Hero from "@/page/landing/ui/Hero";
import HowItWorksSection from "@/page/landing/ui/HowItWorksSection";
import PeopleAndPromo from "@/page/landing/ui/PeopleAndPromo";
import PricingSection from "@/page/landing/ui/PricingSection";
import { StatsSection } from "@/page/landing/ui/StatsSection";
import TestimonialsSection from "@/page/landing/ui/TestimonialsSection";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <StatsSection />
        <HowItWorksSection />
        <PricingSection />
        <PeopleAndPromo />
        <TestimonialsSection />
      </main>
      <Footer />
    </div>
  );
}