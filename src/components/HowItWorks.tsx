import { ClipboardList, Phone, ShieldCheck } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: ClipboardList,
    title: "Fill Out the Quick Form",
    description:
      "Tell us about your vehicle and contact details. Takes less than 60 seconds. No credit card needed.",
  },
  {
    number: "02",
    icon: Phone,
    title: "A Specialist Calls You",
    description:
      "One of our licensed warranty specialists will contact you at your preferred time to review your options and answer any questions.",
  },
  {
    number: "03",
    icon: ShieldCheck,
    title: "Get Covered — Today",
    description:
      "Choose the plan that fits your needs and budget. Coverage activates within 24 hours of enrollment. Drive with total confidence.",
  },
];

export default function HowItWorks() {
  return (
    <section
      className="py-20"
      style={{ backgroundColor: "#F8FAFC" }}
      aria-labelledby="how-it-works-heading"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span
            className="inline-block text-sm font-semibold uppercase tracking-widest mb-3 px-3 py-1 rounded-full"
            style={{ color: "#0369A1", backgroundColor: "#EFF6FF" }}
          >
            Simple Process
          </span>
          <h2
            id="how-it-works-heading"
            className="text-3xl sm:text-4xl font-bold mb-4"
            style={{ color: "#0F172A", fontFamily: "var(--font-lexend)" }}
          >
            Get Protected in 3 Easy Steps
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "#475569" }}>
            We&apos;ve made the process as simple as possible. No confusing jargon,
            no pushy sales calls — just straightforward protection for your vehicle.
          </p>
        </div>

        <div className="relative">
          {/* Connector line — desktop */}
          <div
            className="hidden lg:block absolute top-8 left-1/6 right-1/6 h-0.5"
            style={{ backgroundColor: "#E2E8F0" }}
            aria-hidden="true"
          />

          <div className="grid sm:grid-cols-3 gap-10">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.number} className="text-center relative">
                  {/* Number bubble */}
                  <div className="relative inline-flex mb-6">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg"
                      style={{ backgroundColor: "#0369A1" }}
                    >
                      <Icon className="w-7 h-7 text-white" aria-hidden="true" />
                    </div>
                    <span
                      className="absolute -top-2 -right-2 w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center text-white"
                      style={{ backgroundColor: "#0F172A", fontFamily: "var(--font-lexend)" }}
                      aria-hidden="true"
                    >
                      {step.number.replace("0", "")}
                    </span>
                  </div>

                  <h3
                    className="text-xl font-semibold mb-3"
                    style={{ color: "#0F172A", fontFamily: "var(--font-lexend)" }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#475569" }}>
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
