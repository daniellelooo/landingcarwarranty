import { ArrowDown, ArrowRight, CheckCircle2 } from "lucide-react";
import LeadForm from "@/components/LeadForm";

const trustPoints = [
  "Quick, no-obligation refinance check",
  "Options tailored to your vehicle and budget",
  "No upfront fees to explore your options",
];

export default function HeroSection() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background:
          "radial-gradient(circle at 12% 8%, rgba(56,189,248,0.22), transparent 42%), radial-gradient(circle at 88% 92%, rgba(3,105,161,0.35), transparent 48%), linear-gradient(160deg, #070C16 0%, #0F172A 55%, #14304D 100%)",
      }}
    >
      {/* Background texture — fine diagonal lines */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(115deg, #ffffff 0px, #ffffff 1px, transparent 1px, transparent 34px)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-24">
        <div className="grid lg:grid-cols-[1fr_1.15fr] gap-10 lg:gap-14 items-center">
          {/* Left: value proposition */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8">
              <span className="text-blue-100 text-sm font-medium">
                Simple Auto Refinancing for American Drivers
              </span>
            </div>

            <h1
              className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 leading-tight"
              style={{ fontFamily: "var(--font-lexend)" }}
            >
              Car Payments Too High?
              <span className="block text-blue-300 mt-1">We Can Help.</span>
            </h1>

            <p className="text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto lg:mx-0 mb-8 leading-relaxed">
              Explore auto refinancing options designed to help lower your{" "}
              <strong className="text-white">interest rate and monthly payment</strong>
              {" "}— with a simple process and no unnecessary runaround.
            </p>

            <a
              href="#get-quote"
              className="group inline-flex items-center gap-3 rounded-full border border-sky-300/50 bg-sky-400/15 px-5 py-3 mb-8 text-white font-bold backdrop-blur-sm shadow-lg transition-all duration-200 hover:bg-sky-400/25 hover:border-sky-200 focus:outline-none focus:ring-4 focus:ring-sky-300/40"
              aria-label="Go to the refinance form"
            >
              <span>Start here — it only takes 60 seconds</span>
              <span className="relative flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-sky-400 text-slate-950">
                <span
                  className="absolute inset-0 rounded-full bg-sky-300 opacity-50 animate-ping"
                  aria-hidden="true"
                />
                <ArrowDown className="relative w-5 h-5 lg:hidden" aria-hidden="true" />
                <ArrowRight className="relative hidden w-5 h-5 lg:block" aria-hidden="true" />
              </span>
            </a>

            <ul className="flex flex-col items-center lg:items-start gap-3 mb-8">
              {trustPoints.map((point) => (
                <li key={point} className="flex items-start gap-3 text-blue-100 text-left">
                  <CheckCircle2
                    className="w-5 h-5 flex-shrink-0 mt-0.5"
                    style={{ color: "#38BDF8" }}
                    aria-hidden="true"
                  />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <p className="text-blue-200 text-sm">
              Fast pre-approval check &nbsp;·&nbsp; No obligation
            </p>
          </div>

          {/* Right: lead form */}
          <div>
            <LeadForm />
          </div>
        </div>
      </div>
    </section>
  );
}
