import HeroSection from "@/components/HeroSection";
import TrustBadges from "@/components/TrustBadges";
import WhyChooseUs from "@/components/WhyChooseUs";
import WhatsCovered from "@/components/WhatsCovered";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main id="main-content">
      <HeroSection />
      <TrustBadges />
      <WhyChooseUs />
      <WhatsCovered />
      <HowItWorks />
      <Testimonials />
      <Footer />
    </main>
  );
}
