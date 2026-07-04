"use client";

import { Shield, ChevronDown } from "lucide-react";

export default function HeroSection() {
  const scrollToForm = () => {
    document.getElementById("get-quote")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0F172A 0%, #1E3A5F 60%, #0369A1 100%)" }}
    >
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8">
          <Shield className="w-4 h-4 text-blue-300" aria-hidden="true" />
          <span className="text-blue-100 text-sm font-medium">
            Trusted by 50,000+ American Drivers
          </span>
        </div>

        {/* Headline */}
        <h1
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
          style={{ fontFamily: "var(--font-lexend)" }}
        >
          Protect Your Vehicle
          <span className="block text-blue-300 mt-1">Beyond the Dealership</span>
        </h1>

        <p className="text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto mb-10 leading-relaxed">
          The average car repair costs{" "}
          <strong className="text-white">$1,200+</strong>. Extended warranty
          coverage keeps your family protected and your budget intact — no surprises, no stress.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={scrollToForm}
            className="w-full sm:w-auto px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-200 cursor-pointer shadow-lg hover:shadow-xl active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-offset-2 focus:ring-offset-transparent"
            style={{ backgroundColor: "#0369A1", color: "#fff" }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#0284C7")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#0369A1")}
            aria-label="Get your free warranty quote now"
          >
            Get My Free Quote — 60 Seconds
          </button>

          <button
            onClick={scrollToForm}
            className="w-full sm:w-auto px-8 py-4 text-lg font-semibold rounded-xl border-2 border-white/40 text-white transition-all duration-200 cursor-pointer hover:border-white hover:bg-white/10 focus:outline-none focus:ring-4 focus:ring-white/30"
            aria-label="Check if your vehicle qualifies"
          >
            Check My Vehicle Eligibility
          </button>
        </div>

        {/* Trust micro-copy */}
        <p className="mt-6 text-blue-200 text-sm">
          No credit card required &nbsp;·&nbsp; No obligation &nbsp;·&nbsp; 100% Free
        </p>

        {/* Scroll indicator */}
        <button
          onClick={scrollToForm}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 hover:text-white transition-colors duration-200 cursor-pointer animate-bounce"
          aria-label="Scroll down to learn more"
        >
          <ChevronDown className="w-8 h-8" />
        </button>
      </div>
    </section>
  );
}
