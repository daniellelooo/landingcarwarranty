import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Michael R.",
    location: "Houston, TX",
    vehicle: "2018 Ford F-150",
    rating: 5,
    text: "My transmission went out last winter — $4,800 repair. I only paid my $100 deductible. These guys literally saved me from financial disaster. Best investment I've ever made for my truck.",
    saving: "$4,700 saved",
  },
  {
    name: "Sandra L.",
    location: "Phoenix, AZ",
    vehicle: "2019 Honda CR-V",
    rating: 5,
    text: "I was skeptical at first — who isn't? But when my AC compressor failed in July (in Arizona!), the claim was approved in 18 hours and the shop dealt directly with them. Zero headache for me.",
    saving: "$2,200 saved",
  },
  {
    name: "James T.",
    location: "Chicago, IL",
    vehicle: "2020 Toyota Camry",
    rating: 5,
    text: "The roadside assistance alone is worth it. Got a flat on I-90 at midnight and a truck was there in 30 minutes. Three weeks later my alternator failed — covered 100%. Very happy customer.",
    saving: "$1,850 saved",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1" role="img" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className="w-4 h-4"
          style={{ color: i < rating ? "#FBBF24" : "#E2E8F0", fill: i < rating ? "#FBBF24" : "transparent" }}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section
      className="py-20"
      style={{ backgroundColor: "#EFF6FF" }}
      aria-labelledby="testimonials-heading"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span
            className="inline-block text-sm font-semibold uppercase tracking-widest mb-3 px-3 py-1 rounded-full"
            style={{ color: "#0369A1", backgroundColor: "#DBEAFE" }}
          >
            Customer Stories
          </span>
          <h2
            id="testimonials-heading"
            className="text-3xl sm:text-4xl font-bold mb-4"
            style={{ color: "#0F172A", fontFamily: "var(--font-lexend)" }}
          >
            Real Drivers. Real Savings.
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "#475569" }}>
            Don&apos;t take our word for it — hear from the thousands of drivers
            who&apos;ve protected their vehicles with our plans.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <article
              key={t.name}
              className="bg-white rounded-2xl p-8 pt-7 flex flex-col gap-4 relative overflow-hidden transition-all duration-200 hover:-translate-y-1 shadow-[0_1px_3px_rgba(15,23,42,0.06),0_1px_2px_rgba(15,23,42,0.04)] hover:shadow-[0_16px_32px_-12px_rgba(15,23,42,0.18)]"
            >
              <div
                className="absolute top-0 left-0 right-0 h-1"
                style={{ background: "linear-gradient(90deg, #0369A1, #38BDF8)" }}
                aria-hidden="true"
              />
              <Quote
                className="absolute top-6 right-6 w-8 h-8 opacity-10"
                style={{ color: "#0369A1" }}
                aria-hidden="true"
              />

              <StarRating rating={t.rating} />

              <blockquote>
                <p className="text-sm leading-relaxed" style={{ color: "#334155" }}>
                  &quot;{t.text}&quot;
                </p>
              </blockquote>

              <div className="pt-2 border-t flex items-center justify-between" style={{ borderColor: "#E2E8F0" }}>
                <div>
                  <p className="font-semibold text-sm" style={{ color: "#0F172A" }}>
                    {t.name}
                  </p>
                  <p className="text-xs" style={{ color: "#64748B" }}>
                    {t.location} · {t.vehicle}
                  </p>
                </div>
                <span
                  className="text-xs font-bold px-3 py-1 rounded-full"
                  style={{ backgroundColor: "#DCFCE7", color: "#16A34A" }}
                >
                  {t.saving}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
