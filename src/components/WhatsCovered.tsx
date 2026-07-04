import { CheckCircle, XCircle } from "lucide-react";

const covered = [
  "Engine & all internal parts",
  "Transmission & drivetrain",
  "Electrical systems & components",
  "Air conditioning & heating",
  "Fuel system components",
  "Brake system (hydraulics)",
  "Steering & suspension",
  "Cooling system",
  "Turbocharger / Supercharger",
  "Navigation & infotainment",
  "Hybrid / EV battery systems",
  "Differential components",
];

const notCovered = [
  "Routine maintenance (oil, filters)",
  "Tires & brake pads",
  "Cosmetic damage (paint, dents)",
  "Pre-existing conditions",
];

export default function WhatsCovered() {
  return (
    <section
      className="py-20"
      style={{ backgroundColor: "#0F172A" }}
      aria-labelledby="coverage-heading"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span
            className="inline-block text-sm font-semibold uppercase tracking-widest mb-3 px-3 py-1 rounded-full"
            style={{ color: "#38BDF8", backgroundColor: "#0C2A45" }}
          >
            Coverage Details
          </span>
          <h2
            id="coverage-heading"
            className="text-3xl sm:text-4xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-lexend)" }}
          >
            What&apos;s Included in Your Plan
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "#94A3B8" }}>
            Our comprehensive coverage protects the components that matter most,
            from the engine to the electronics.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Covered */}
          <div
            className="lg:col-span-2 rounded-2xl p-8 border"
            style={{ backgroundColor: "#0C1F35", borderColor: "#1E3A5F" }}
          >
            <h3
              className="text-xl font-semibold text-white mb-6 flex items-center gap-2"
              style={{ fontFamily: "var(--font-lexend)" }}
            >
              <CheckCircle className="w-5 h-5" style={{ color: "#22C55E" }} aria-hidden="true" />
              Components Covered
            </h3>
            <ul className="grid sm:grid-cols-2 gap-3" role="list">
              {covered.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <CheckCircle
                    className="w-4 h-4 flex-shrink-0"
                    style={{ color: "#22C55E" }}
                    aria-hidden="true"
                  />
                  <span className="text-sm" style={{ color: "#CBD5E1" }}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Not Covered */}
          <div
            className="rounded-2xl p-8 border"
            style={{ backgroundColor: "#0C1F35", borderColor: "#1E3A5F" }}
          >
            <h3
              className="text-xl font-semibold text-white mb-6 flex items-center gap-2"
              style={{ fontFamily: "var(--font-lexend)" }}
            >
              <XCircle className="w-5 h-5" style={{ color: "#EF4444" }} aria-hidden="true" />
              Not Included
            </h3>
            <ul className="space-y-3" role="list">
              {notCovered.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <XCircle
                    className="w-4 h-4 flex-shrink-0"
                    style={{ color: "#EF4444" }}
                    aria-hidden="true"
                  />
                  <span className="text-sm" style={{ color: "#CBD5E1" }}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <div
              className="mt-8 p-4 rounded-xl border"
              style={{ backgroundColor: "#0F2840", borderColor: "#0369A1" }}
            >
              <p className="text-sm font-medium" style={{ color: "#38BDF8" }}>
                Plans available for vehicles up to 20 years old and 200,000 miles.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
