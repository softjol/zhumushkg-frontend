import { Footer } from "@/widgets/footer";
import { Header } from "@/page/landing/ui/Header";
import Hero from "@/page/landing/ui/Hero";
import HowItWorksSection from "@/page/landing/ui/HowItWorksSection";
import PeopleAndPromo from "@/page/landing/ui/PeopleAndPromo";
import { StatsSection } from "@/page/landing/ui/StatsSection";

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      name: 'Жумуш.kg',
      url: 'https://www.zhumushkg.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.zhumushkg.com/logo.svg',
      },
      sameAs: [
        'https://www.instagram.com/softjol_tech',
        'https://t.me/amirbek_amiraev',
      ],
    },
    {
      '@type': 'WebSite',
      name: 'Жумуш.kg',
      url: 'https://www.zhumushkg.com',
    },
  ],
}

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main className="flex-1">
        <Hero />
        <StatsSection />
        <HowItWorksSection />
        <PeopleAndPromo />
      </main>
      <Footer />
    </div>
  );
}