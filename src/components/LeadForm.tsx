"use client";

import { useState, FormEvent } from "react";
import { ArrowRight, CheckCircle, AlertCircle, BadgePercent, CarFront, Loader2 } from "lucide-react";

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

const STEPS: { id: string; title: string; fields: (keyof FormData)[] }[] = [
  {
    id: "vehicle",
    title: "Your vehicle",
    fields: ["vehicle_year", "vehicle_make", "vehicle_model", "mileage", "has_warranty"],
  },
  {
    id: "coverage",
    title: "Location & timing",
    fields: ["state", "zip_code", "best_time_to_call", "heard_about_us"],
  },
  {
    id: "contact",
    title: "Your contact info",
    fields: ["first_name", "last_name", "email", "phone"],
  },
];

const REQUIRED_FIELDS: (keyof FormData)[] = [
  "first_name", "last_name", "email", "phone", "vehicle_year", "vehicle_make",
  "vehicle_model", "mileage", "state", "zip_code", "has_warranty", "best_time_to_call",
];

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

const labelClass = "block text-sm font-semibold mb-2";
const inputClass =
  "w-full px-4 py-3.5 rounded-xl border text-base transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-1 bg-white";
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
  const [step, setStep] = useState(0);

  const set = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validateFields = (fields: (keyof FormData)[]): boolean => {
    const newErrors: Partial<FormData> = { ...errors };
    let valid = true;

    for (const field of fields) {
      if (REQUIRED_FIELDS.includes(field) && !form[field].trim()) {
        newErrors[field] = "This field is required.";
        valid = false;
      } else {
        newErrors[field] = "";
      }
    }

    if (fields.includes("email") && form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email address.";
      valid = false;
    }

    if (fields.includes("phone") && form.phone && !/^[\d\s\-\(\)\+]{10,}$/.test(form.phone)) {
      newErrors.phone = "Please enter a valid US phone number.";
      valid = false;
    }

    if (fields.includes("zip_code") && form.zip_code && !/^\d{5}(-\d{4})?$/.test(form.zip_code)) {
      newErrors.zip_code = "Please enter a valid 5-digit ZIP code.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const focusFirstError = () => {
    const firstError = document.querySelector("[aria-invalid='true']") as HTMLElement;
    firstError?.focus();
  };

  const handleBack = () => {
    setStep((s) => Math.max(s - 1, 0));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateFields(STEPS[step].fields)) {
      focusFirstError();
      return;
    }

    if (step < STEPS.length - 1) {
      setStep((s) => s + 1);
      return;
    }

    setStatus("loading");
    setServerError("");

    try {
      const params = new URLSearchParams(window.location.search);
      const payload = {
        ...form,
        utm_source: params.get("utm_source") || undefined,
        utm_campaign: params.get("utm_campaign") || undefined,
      };

      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
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
      <div
        id="get-quote"
        className="bg-white rounded-3xl p-8 sm:p-10 text-center"
        style={{
          boxShadow:
            "0 30px 60px -15px rgba(2,8,23,0.5), 0 0 90px -25px rgba(56,189,248,0.35)",
        }}
        aria-labelledby="success-heading"
      >
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{ backgroundColor: "#16A34A" }}
        >
          <CheckCircle className="w-8 h-8 text-white" aria-hidden="true" />
        </div>
        <h2
          id="success-heading"
          className="text-2xl sm:text-3xl font-bold mb-3"
          style={{ color: "#0F172A", fontFamily: "var(--font-lexend)" }}
        >
          You&apos;re All Set!
        </h2>
        <p className="text-base mb-6" style={{ color: "#64748B" }}>
          One of our refinance specialists will contact you{" "}
          {form.best_time_to_call === "morning"
            ? "this morning (8 AM – 12 PM)"
            : form.best_time_to_call === "afternoon"
            ? "this afternoon (12 PM – 5 PM)"
            : "this evening (5 PM – 8 PM)"}{" "}
          at the number you provided.
        </p>
        <div
          className="rounded-2xl p-4 mb-6 border flex items-start gap-3 text-left"
          style={{ backgroundColor: "#EFF6FF", borderColor: "#7DD3FC" }}
          role="note"
          aria-label="License plate reminder"
        >
          <span
            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: "#0369A1" }}
          >
            <CarFront className="w-5 h-5 text-white" aria-hidden="true" />
          </span>
          <div>
            <p className="text-sm font-bold mb-1" style={{ color: "#0F172A" }}>
              Have your license plate number ready
            </p>
            <p className="text-sm" style={{ color: "#475569" }}>
              Your refinance specialist will need your vehicle&apos;s license plate number during the call.
            </p>
          </div>
        </div>
        <div
          className="rounded-2xl p-6 border text-left"
          style={{ backgroundColor: "#F8FAFC", borderColor: "#E2E8F0" }}
        >
          <p className="text-sm font-semibold mb-2" style={{ color: "#0369A1" }}>
            What happens next:
          </p>
          <ul className="space-y-2 text-sm" style={{ color: "#334155" }}>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#16A34A" }} aria-hidden="true" />
              A specialist reviews your {form.vehicle_year} {form.vehicle_make} {form.vehicle_model} and application
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#16A34A" }} aria-hidden="true" />
              We share personalized refinance options available to you
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#16A34A" }} aria-hidden="true" />
              You choose what works for your budget with zero pressure
            </li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div
      id="get-quote"
      className="bg-white rounded-3xl p-6 sm:p-8 lg:p-12"
      style={{
        boxShadow:
          "0 30px 60px -15px rgba(2,8,23,0.5), 0 0 90px -25px rgba(56,189,248,0.35)",
      }}
      aria-labelledby="form-heading"
    >
      {/* Prominent refinance offer notice */}
      <div
        className="mb-6 rounded-2xl border p-4 sm:p-5 flex items-start gap-4"
        style={{
          background: "linear-gradient(135deg, #EFF6FF 0%, #E0F2FE 100%)",
          borderColor: "#38BDF8",
          boxShadow: "0 10px 25px -18px rgba(3,105,161,0.65)",
        }}
        role="note"
        aria-label="Pre-approval rate notice"
      >
        <span
          className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: "#0369A1" }}
        >
          <BadgePercent className="w-6 h-6 text-white" aria-hidden="true" />
        </span>
        <div>
          <p
            className="text-xs font-bold uppercase tracking-widest mb-1"
            style={{ color: "#0369A1" }}
          >
            Today&apos;s Refinance Opportunity
          </p>
          <p className="text-base sm:text-lg font-bold leading-snug" style={{ color: "#0F172A" }}>
            Apply today to see if you&apos;re pre-approved for an interest rate as low as 5% APR.
          </p>
          <p className="text-xs mt-1.5" style={{ color: "#475569" }}>
            Rates and approval are subject to lender terms and eligibility.
          </p>
        </div>
      </div>

      {/* Header */}
      <div className="mb-6">
        <div className="inline-flex items-center gap-2 mb-3">
          <span
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: "#0369A1" }}
          >
            Free Refinance Check — No Obligation
          </span>
        </div>
        <h2
          id="form-heading"
          className="text-2xl sm:text-3xl font-bold mb-2"
          style={{ color: "#0F172A", fontFamily: "var(--font-lexend)" }}
        >
          Explore Your Refinance Options
        </h2>
        <p className="text-sm" style={{ color: "#64748B" }}>
          Takes less than 60 seconds. See how much you may be able to save.
        </p>
      </div>

      {/* Progress */}
      <div className="mb-6" aria-live="polite">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold" style={{ color: "#0369A1" }}>
            Step {step + 1} of {STEPS.length}
          </span>
          <span className="text-xs" style={{ color: "#94A3B8" }}>
            {STEPS[step].title}
          </span>
        </div>
        <div className="flex gap-1.5">
          {STEPS.map((s, i) => (
            <div
              key={s.id}
              className="h-1.5 flex-1 rounded-full transition-colors duration-300"
              style={{ backgroundColor: i <= step ? "#0369A1" : "#E2E8F0" }}
            />
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate aria-label="Auto refinance request form">
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

            {/* Step 1: Vehicle */}
            {step === 0 && (
              <fieldset className="mb-2">
                <legend className="sr-only">Your vehicle</legend>
                <div className="grid sm:grid-cols-2 gap-6">
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

                  <div className="sm:col-span-2">
                    <p className={labelClass} style={{ color: "#0F172A" }} id="warranty-label">
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
                </div>
              </fieldset>
            )}

            {/* Step 2: Coverage area */}
            {step === 1 && (
              <fieldset className="mb-2">
                <legend className="sr-only">Coverage area</legend>
                <div className="grid sm:grid-cols-2 gap-6">
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
            )}

            {/* Step 3: Contact info */}
            {step === 2 && (
              <fieldset className="mb-2">
                <legend className="sr-only">Your contact info</legend>
                <div className="grid sm:grid-cols-2 gap-6">
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
                </div>
              </fieldset>
            )}

            {/* Navigation */}
            <div className="flex items-center gap-3 mt-6">
              {step > 0 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-5 py-4 rounded-xl font-semibold text-sm transition-all duration-200 cursor-pointer border hover:bg-slate-50"
                  style={{ borderColor: "#CBD5E1", color: "#334155" }}
                >
                  Back
                </button>
              )}
              <button
                type="submit"
                disabled={status === "loading"}
                className="flex-1 py-4 px-8 rounded-xl text-white font-bold text-lg transition-all duration-200 cursor-pointer shadow-lg hover:shadow-xl active:scale-98 focus:outline-none focus:ring-4 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
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
                ) : step < STEPS.length - 1 ? (
                  <>
                    Continue
                    <ArrowRight className="w-5 h-5" aria-hidden="true" />
                  </>
                ) : (
                  <>
                    See My Refinance Options
                    <ArrowRight className="w-5 h-5" aria-hidden="true" />
                  </>
                )}
              </button>
            </div>

            {step === STEPS.length - 1 ? (
              <p className="mt-4 text-center text-xs" style={{ color: "#94A3B8" }}>
                By submitting this form, you agree to be contacted by a refinance
                specialist. We respect your privacy and will never sell your information.
              </p>
            ) : (
              <p className="mt-4 text-center text-xs" style={{ color: "#94A3B8" }}>
                No obligation. Your information is kept private.
              </p>
            )}
            <p className="mt-3 text-center text-xs leading-relaxed" style={{ color: "#64748B" }}>
              Privacy Notice: We collect your contact, vehicle, location, and request details to
              evaluate and respond to your refinancing inquiry. We may disclose information only
              to service providers that process it on our behalf, as described in our{" "}
              <a
                href="/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold underline underline-offset-2"
                style={{ color: "#0369A1" }}
              >
                Privacy Policy
              </a>
              .
            </p>
          </form>
    </div>
  );
}
