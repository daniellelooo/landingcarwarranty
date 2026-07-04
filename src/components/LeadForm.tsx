"use client";

import { useState, FormEvent } from "react";
import { Shield, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

const VEHICLE_MAKES = [
  "Acura", "Audi", "BMW", "Buick", "Cadillac", "Chevrolet", "Chrysler",
  "Dodge", "Ford", "GMC", "Honda", "Hyundai", "Infiniti", "Jeep", "Kia",
  "Lexus", "Lincoln", "Mazda", "Mercedes-Benz", "Mitsubishi", "Nissan",
  "Ram", "Subaru", "Tesla", "Toyota", "Volkswagen", "Volvo", "Other",
];

const US_STATES = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN",
  "IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV",
  "NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN",
  "TX","UT","VT","VA","WA","WV","WI","WY",
];

const STATE_NAMES: Record<string, string> = {
  AL:"Alabama",AK:"Alaska",AZ:"Arizona",AR:"Arkansas",CA:"California",
  CO:"Colorado",CT:"Connecticut",DE:"Delaware",FL:"Florida",GA:"Georgia",
  HI:"Hawaii",ID:"Idaho",IL:"Illinois",IN:"Indiana",IA:"Iowa",KS:"Kansas",
  KY:"Kentucky",LA:"Louisiana",ME:"Maine",MD:"Maryland",MA:"Massachusetts",
  MI:"Michigan",MN:"Minnesota",MS:"Mississippi",MO:"Missouri",MT:"Montana",
  NE:"Nebraska",NV:"Nevada",NH:"New Hampshire",NJ:"New Jersey",NM:"New Mexico",
  NY:"New York",NC:"North Carolina",ND:"North Dakota",OH:"Ohio",OK:"Oklahoma",
  OR:"Oregon",PA:"Pennsylvania",RI:"Rhode Island",SC:"South Carolina",
  SD:"South Dakota",TN:"Tennessee",TX:"Texas",UT:"Utah",VT:"Vermont",
  VA:"Virginia",WA:"Washington",WV:"West Virginia",WI:"Wisconsin",WY:"Wyoming",
};

const currentYear = new Date().getFullYear();
const YEARS = Array.from({ length: currentYear - 1999 }, (_, i) => currentYear - i);

const MILEAGE_RANGES = [
  { value: "under_50k", label: "Under 50,000 miles" },
  { value: "50k_100k", label: "50,000 – 100,000 miles" },
  { value: "100k_150k", label: "100,000 – 150,000 miles" },
  { value: "150k_200k", label: "150,000 – 200,000 miles" },
  { value: "over_200k", label: "Over 200,000 miles" },
];

const CALL_TIMES = [
  { value: "morning", label: "Morning (8 AM – 12 PM)" },
  { value: "afternoon", label: "Afternoon (12 PM – 5 PM)" },
  { value: "evening", label: "Evening (5 PM – 8 PM)" },
];

const HEARD_ABOUT_US = [
  { value: "facebook", label: "Facebook Ad" },
  { value: "google", label: "Google Search" },
  { value: "friend", label: "Friend or Family" },
  { value: "tv", label: "Television" },
  { value: "radio", label: "Radio" },
  { value: "other", label: "Other" },
];

interface FormData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  vehicle_year: string;
  vehicle_make: string;
  vehicle_model: string;
  mileage: string;
  state: string;
  zip_code: string;
  has_warranty: string;
  best_time_to_call: string;
  heard_about_us: string;
}

const initialForm: FormData = {
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  vehicle_year: "",
  vehicle_make: "",
  vehicle_model: "",
  mileage: "",
  state: "",
  zip_code: "",
  has_warranty: "",
  best_time_to_call: "",
  heard_about_us: "",
};

type Status = "idle" | "loading" | "success" | "error";

const labelClass = "block text-sm font-semibold mb-1.5";
const inputClass =
  "w-full px-4 py-3 rounded-xl border text-sm transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-1 bg-white";
const inputStyle = {
  borderColor: "#CBD5E1",
  color: "#0F172A",
  focusRingColor: "#0369A1",
};

function FormField({
  id,
  label,
  required,
  children,
  error,
}: {
  id: string;
  label: string;
  required?: boolean;
  children: React.ReactNode;
  error?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className={labelClass} style={{ color: "#0F172A" }}>
        {label}
        {required && <span className="text-red-500 ml-1" aria-hidden="true">*</span>}
      </label>
      {children}
      {error && (
        <p className="mt-1 text-xs text-red-600 flex items-center gap-1" role="alert">
          <AlertCircle className="w-3 h-3" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}

export default function LeadForm() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState("");

  const set = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};
    const required: (keyof FormData)[] = [
      "first_name","last_name","email","phone","vehicle_year","vehicle_make",
      "vehicle_model","mileage","state","zip_code","has_warranty","best_time_to_call",
    ];

    for (const field of required) {
      if (!form[field].trim()) {
        newErrors[field] = "This field is required.";
      }
    }

    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (form.phone && !/^[\d\s\-\(\)\+]{10,}$/.test(form.phone)) {
      newErrors.phone = "Please enter a valid US phone number.";
    }

    if (form.zip_code && !/^\d{5}(-\d{4})?$/.test(form.zip_code)) {
      newErrors.zip_code = "Please enter a valid 5-digit ZIP code.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      const firstError = document.querySelector("[aria-invalid='true']") as HTMLElement;
      firstError?.focus();
      return;
    }

    setStatus("loading");
    setServerError("");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setServerError(data.error || "Submission failed. Please try again.");
        setStatus("error");
        return;
      }

      setStatus("success");
    } catch {
      setServerError("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <section
        id="get-quote"
        className="py-20"
        style={{ background: "linear-gradient(135deg, #0F172A 0%, #1E3A5F 100%)" }}
        aria-labelledby="success-heading"
      >
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ backgroundColor: "#16A34A" }}
          >
            <CheckCircle className="w-10 h-10 text-white" aria-hidden="true" />
          </div>
          <h2
            id="success-heading"
            className="text-3xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-lexend)" }}
          >
            You&apos;re All Set!
          </h2>
          <p className="text-lg mb-6" style={{ color: "#94A3B8" }}>
            One of our warranty specialists will contact you{" "}
            {form.best_time_to_call === "morning"
              ? "this morning (8 AM – 12 PM)"
              : form.best_time_to_call === "afternoon"
              ? "this afternoon (12 PM – 5 PM)"
              : "this evening (5 PM – 8 PM)"}{" "}
            at the number you provided.
          </p>
          <div
            className="rounded-2xl p-6 border text-left"
            style={{ backgroundColor: "#0C1F35", borderColor: "#1E3A5F" }}
          >
            <p className="text-sm font-semibold mb-2" style={{ color: "#38BDF8" }}>
              What happens next:
            </p>
            <ul className="space-y-2 text-sm" style={{ color: "#CBD5E1" }}>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#22C55E" }} aria-hidden="true" />
                A licensed specialist reviews your {form.vehicle_year} {form.vehicle_make} {form.vehicle_model}
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#22C55E" }} aria-hidden="true" />
                We present the best plans available for your vehicle
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#22C55E" }} aria-hidden="true" />
                You choose your coverage with zero pressure — or walk away free
              </li>
            </ul>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="get-quote"
      className="py-20"
      style={{ background: "linear-gradient(135deg, #0F172A 0%, #1E3A5F 100%)" }}
      aria-labelledby="form-heading"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-4">
            <Shield className="w-6 h-6" style={{ color: "#38BDF8" }} aria-hidden="true" />
            <span
              className="text-sm font-semibold uppercase tracking-widest"
              style={{ color: "#38BDF8" }}
            >
              Free Quote — No Obligation
            </span>
          </div>
          <h2
            id="form-heading"
            className="text-3xl sm:text-4xl font-bold text-white mb-3"
            style={{ fontFamily: "var(--font-lexend)" }}
          >
            Get Your Free Extended Warranty Quote
          </h2>
          <p style={{ color: "#94A3B8" }}>
            Fill out the form below and a specialist will contact you within hours.
            Takes less than 60 seconds.
          </p>
        </div>

        {/* Form card */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-2xl">
          <form onSubmit={handleSubmit} noValidate aria-label="Warranty quote request form">
            {/* Server error */}
            {status === "error" && serverError && (
              <div
                className="mb-6 p-4 rounded-xl border flex items-start gap-3"
                style={{ backgroundColor: "#FEF2F2", borderColor: "#FECACA" }}
                role="alert"
                aria-live="assertive"
              >
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <p className="text-sm text-red-700">{serverError}</p>
              </div>
            )}

            {/* Section: Contact Information */}
            <fieldset className="mb-8">
              <legend
                className="text-base font-bold mb-5 pb-2 w-full border-b"
                style={{
                  color: "#0F172A",
                  borderColor: "#E2E8F0",
                  fontFamily: "var(--font-lexend)",
                }}
              >
                Contact Information
              </legend>

              <div className="grid sm:grid-cols-2 gap-5">
                <FormField id="first_name" label="First Name" required error={errors.first_name}>
                  <input
                    id="first_name"
                    type="text"
                    autoComplete="given-name"
                    value={form.first_name}
                    onChange={set("first_name")}
                    className={inputClass}
                    style={inputStyle}
                    aria-invalid={!!errors.first_name}
                    aria-describedby={errors.first_name ? "first_name-error" : undefined}
                    placeholder="John"
                  />
                </FormField>

                <FormField id="last_name" label="Last Name" required error={errors.last_name}>
                  <input
                    id="last_name"
                    type="text"
                    autoComplete="family-name"
                    value={form.last_name}
                    onChange={set("last_name")}
                    className={inputClass}
                    style={inputStyle}
                    aria-invalid={!!errors.last_name}
                    placeholder="Smith"
                  />
                </FormField>

                <FormField id="email" label="Email Address" required error={errors.email}>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={set("email")}
                    className={inputClass}
                    style={inputStyle}
                    aria-invalid={!!errors.email}
                    placeholder="john@example.com"
                  />
                </FormField>

                <FormField id="phone" label="Phone Number" required error={errors.phone}>
                  <input
                    id="phone"
                    type="tel"
                    autoComplete="tel"
                    value={form.phone}
                    onChange={set("phone")}
                    className={inputClass}
                    style={inputStyle}
                    aria-invalid={!!errors.phone}
                    placeholder="(555) 000-0000"
                  />
                </FormField>

                <FormField id="state" label="State" required error={errors.state}>
                  <select
                    id="state"
                    value={form.state}
                    onChange={set("state")}
                    className={inputClass}
                    style={inputStyle}
                    aria-invalid={!!errors.state}
                  >
                    <option value="">Select your state</option>
                    {US_STATES.map((s) => (
                      <option key={s} value={s}>
                        {STATE_NAMES[s]} ({s})
                      </option>
                    ))}
                  </select>
                </FormField>

                <FormField id="zip_code" label="ZIP Code" required error={errors.zip_code}>
                  <input
                    id="zip_code"
                    type="text"
                    autoComplete="postal-code"
                    value={form.zip_code}
                    onChange={set("zip_code")}
                    className={inputClass}
                    style={inputStyle}
                    aria-invalid={!!errors.zip_code}
                    placeholder="90210"
                    maxLength={10}
                  />
                </FormField>
              </div>
            </fieldset>

            {/* Section: Vehicle Information */}
            <fieldset className="mb-8">
              <legend
                className="text-base font-bold mb-5 pb-2 w-full border-b"
                style={{
                  color: "#0F172A",
                  borderColor: "#E2E8F0",
                  fontFamily: "var(--font-lexend)",
                }}
              >
                Vehicle Information
              </legend>

              <div className="grid sm:grid-cols-2 gap-5">
                <FormField id="vehicle_year" label="Vehicle Year" required error={errors.vehicle_year}>
                  <select
                    id="vehicle_year"
                    value={form.vehicle_year}
                    onChange={set("vehicle_year")}
                    className={inputClass}
                    style={inputStyle}
                    aria-invalid={!!errors.vehicle_year}
                  >
                    <option value="">Select year</option>
                    {YEARS.map((y) => (
                      <option key={y} value={String(y)}>
                        {y}
                      </option>
                    ))}
                  </select>
                </FormField>

                <FormField id="vehicle_make" label="Vehicle Make" required error={errors.vehicle_make}>
                  <select
                    id="vehicle_make"
                    value={form.vehicle_make}
                    onChange={set("vehicle_make")}
                    className={inputClass}
                    style={inputStyle}
                    aria-invalid={!!errors.vehicle_make}
                  >
                    <option value="">Select make</option>
                    {VEHICLE_MAKES.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                </FormField>

                <FormField id="vehicle_model" label="Vehicle Model" required error={errors.vehicle_model}>
                  <input
                    id="vehicle_model"
                    type="text"
                    value={form.vehicle_model}
                    onChange={set("vehicle_model")}
                    className={inputClass}
                    style={inputStyle}
                    aria-invalid={!!errors.vehicle_model}
                    placeholder="e.g. F-150, Camry, Accord"
                  />
                </FormField>

                <FormField id="mileage" label="Current Mileage" required error={errors.mileage}>
                  <select
                    id="mileage"
                    value={form.mileage}
                    onChange={set("mileage")}
                    className={inputClass}
                    style={inputStyle}
                    aria-invalid={!!errors.mileage}
                  >
                    <option value="">Select mileage range</option>
                    {MILEAGE_RANGES.map((r) => (
                      <option key={r.value} value={r.value}>
                        {r.label}
                      </option>
                    ))}
                  </select>
                </FormField>
              </div>
            </fieldset>

            {/* Section: Warranty & Preferences */}
            <fieldset className="mb-8">
              <legend
                className="text-base font-bold mb-5 pb-2 w-full border-b"
                style={{
                  color: "#0F172A",
                  borderColor: "#E2E8F0",
                  fontFamily: "var(--font-lexend)",
                }}
              >
                Preferences
              </legend>

              <div className="grid sm:grid-cols-2 gap-5">
                {/* Has warranty */}
                <div>
                  <p
                    className={labelClass}
                    style={{ color: "#0F172A" }}
                    id="warranty-label"
                  >
                    Do you currently have any warranty?{" "}
                    <span className="text-red-500" aria-hidden="true">*</span>
                  </p>
                  <div
                    className="flex gap-4 mt-2"
                    role="radiogroup"
                    aria-labelledby="warranty-label"
                    aria-required="true"
                  >
                    {["Yes", "No"].map((opt) => (
                      <label
                        key={opt}
                        className="flex items-center gap-2 cursor-pointer text-sm font-medium"
                        style={{ color: "#334155" }}
                      >
                        <input
                          type="radio"
                          name="has_warranty"
                          value={opt.toLowerCase()}
                          checked={form.has_warranty === opt.toLowerCase()}
                          onChange={set("has_warranty")}
                          className="w-4 h-4 cursor-pointer"
                          style={{ accentColor: "#0369A1" }}
                        />
                        {opt}
                      </label>
                    ))}
                  </div>
                  {errors.has_warranty && (
                    <p className="mt-1 text-xs text-red-600 flex items-center gap-1" role="alert">
                      <AlertCircle className="w-3 h-3" aria-hidden="true" />
                      {errors.has_warranty}
                    </p>
                  )}
                </div>

                <FormField
                  id="best_time_to_call"
                  label="Best Time to Call You"
                  required
                  error={errors.best_time_to_call}
                >
                  <select
                    id="best_time_to_call"
                    value={form.best_time_to_call}
                    onChange={set("best_time_to_call")}
                    className={inputClass}
                    style={inputStyle}
                    aria-invalid={!!errors.best_time_to_call}
                  >
                    <option value="">Select time window</option>
                    {CALL_TIMES.map((t) => (
                      <option key={t.value} value={t.value}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                </FormField>

                <FormField id="heard_about_us" label="How did you hear about us?">
                  <select
                    id="heard_about_us"
                    value={form.heard_about_us}
                    onChange={set("heard_about_us")}
                    className={inputClass}
                    style={inputStyle}
                  >
                    <option value="">Select (optional)</option>
                    {HEARD_ABOUT_US.map((h) => (
                      <option key={h.value} value={h.value}>
                        {h.label}
                      </option>
                    ))}
                  </select>
                </FormField>
              </div>
            </fieldset>

            {/* Submit */}
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full py-4 px-8 rounded-xl text-white font-bold text-lg transition-all duration-200 cursor-pointer shadow-lg hover:shadow-xl active:scale-98 focus:outline-none focus:ring-4 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              style={{
                backgroundColor: status === "loading" ? "#0284C7" : "#0369A1",
              }}
              onMouseEnter={(e) => {
                if (status !== "loading") e.currentTarget.style.backgroundColor = "#0284C7";
              }}
              onMouseLeave={(e) => {
                if (status !== "loading") e.currentTarget.style.backgroundColor = "#0369A1";
              }}
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
                  Submitting...
                </>
              ) : (
                <>
                  <Shield className="w-5 h-5" aria-hidden="true" />
                  Get My Free Quote Now
                </>
              )}
            </button>

            <p className="mt-4 text-center text-xs" style={{ color: "#94A3B8" }}>
              By submitting this form, you agree to be contacted by a licensed warranty
              specialist. We respect your privacy and will never sell your information.
              Fields marked <span className="text-red-500">*</span> are required.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
