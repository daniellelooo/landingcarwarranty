import { CheckCircle2 } from "lucide-react";
import LeadForm from "@/components/LeadForm";

const trustPoints = [
  "Licensed & bonded in all 50 states",
  "A+ rated with the Better Business Bureau",
  "No obligation — cancel anytime, no fees",
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
                Trusted by 50,000+ American Drivers
              </span>
            </div>

            <h1
              className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 leading-tight"
              style={{ fontFamily: "var(--font-lexend)" }}
            >
              Protect Your Vehicle
              <span className="block text-blue-300 mt-1">Beyond the Dealership</span>
            </h1>

            <p className="text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto lg:mx-0 mb-8 leading-relaxed">
              The average car repair costs{" "}
              <strong className="text-white">$1,200+</strong>. Extended warranty
              coverage keeps your family protected and your budget intact — no surprises, no stress.
            </p>

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
              No credit card required &nbsp;·&nbsp; No obligation &nbsp;·&nbsp; 100% Free
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
