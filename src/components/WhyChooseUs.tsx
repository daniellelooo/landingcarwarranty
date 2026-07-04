import { DollarSign, Wrench, Phone, FileCheck } from "lucide-react";

const benefits = [
  {
    icon: DollarSign,
    title: "Save Thousands on Repairs",
    description:
      "The average major repair today costs $3,500+. With our coverage, you pay a small deductible and we handle the rest — keeping more money in your pocket.",
  },
  {
    icon: Wrench,
    title: "Any Licensed Repair Shop",
    description:
      "Take your vehicle to any ASE-certified repair facility in the United States. No network restrictions, no hoops to jump through — total freedom.",
  },
  {
    icon: Phone,
    title: "24/7 Roadside Assistance",
    description:
      "Stuck on the side of the road at 2 AM? Every plan includes round-the-clock roadside assistance, towing, lockout service, and fuel delivery.",
  },
  {
    icon: FileCheck,
    title: "Fast, Hassle-Free Claims",
    description:
      "Our dedicated claims team processes most claims within 24 hours. We work directly with your mechanic so you don't have to manage the paperwork.",
  },
];

export default function WhyChooseUs() {
  return (
    <section
      className="py-20"
      style={{ backgroundColor: "#F8FAFC" }}
      aria-labelledby="why-heading"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-14">
          <span
            className="inline-block text-sm font-semibold uppercase tracking-widest mb-3 px-3 py-1 rounded-full"
            style={{ color: "#0369A1", backgroundColor: "#EFF6FF" }}
          >
            Why Us
          </span>
          <h2
            id="why-heading"
            className="text-3xl sm:text-4xl font-bold mb-4"
            style={{ color: "#0F172A", fontFamily: "var(--font-lexend)" }}
          >
            Coverage You Can Actually Count On
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "#475569" }}>
            We've designed our plans around one goal: making sure you're never caught
            off guard by an unexpected repair bill.
          </p>
        </div>

        {/* Benefits grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <div
                key={benefit.title}
                className="group bg-white rounded-2xl p-6 shadow-sm border transition-all duration-200 hover:shadow-md hover:-translate-y-1"
                style={{ borderColor: "#E2E8F0" }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ backgroundColor: "#EFF6FF" }}
                >
                  <Icon className="w-6 h-6" style={{ color: "#0369A1" }} aria-hidden="true" />
                </div>
                <h3
                  className="text-lg font-semibold mb-3"
                  style={{ color: "#0F172A", fontFamily: "var(--font-lexend)" }}
                >
                  {benefit.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#475569" }}>
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
