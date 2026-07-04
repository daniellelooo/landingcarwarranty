import { Award, Users, Clock, Star } from "lucide-react";

const badges = [
  {
    icon: Award,
    value: "A+ Rated",
    label: "Better Business Bureau",
  },
  {
    icon: Users,
    value: "50,000+",
    label: "Satisfied Customers",
  },
  {
    icon: Clock,
    value: "15+ Years",
    label: "Industry Experience",
  },
  {
    icon: Star,
    value: "4.9/5 Stars",
    label: "Customer Rating",
  },
];

export default function TrustBadges() {
  return (
    <section
      className="py-10 border-b"
      style={{ backgroundColor: "#0F172A", borderColor: "#1E293B" }}
      aria-label="Trust indicators"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {badges.map((badge) => {
            const Icon = badge.icon;
            return (
              <div
                key={badge.label}
                className="flex flex-col items-center text-center gap-2 py-4"
              >
                <Icon
                  className="w-8 h-8 mb-1"
                  style={{ color: "#38BDF8" }}
                  aria-hidden="true"
                />
                <span
                  className="text-xl font-bold text-white"
                  style={{ fontFamily: "var(--font-lexend)" }}
                >
                  {badge.value}
                </span>
                <span className="text-sm" style={{ color: "#94A3B8" }}>
                  {badge.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
