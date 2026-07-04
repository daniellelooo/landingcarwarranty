import HeroSection from "@/components/HeroSection";
import TrustBadges from "@/components/TrustBadges";
import WhyChooseUs from "@/components/WhyChooseUs";
import WhatsCovered from "@/components/WhatsCovered";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import LeadForm from "@/components/LeadForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <TrustBadges />
      <WhyChooseUs />
      <WhatsCovered />
      <HowItWorks />
      <Testimonials />
      <LeadForm />
      <Footer />
    </main>
  );
}
