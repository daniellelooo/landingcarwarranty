import { Shield, Phone, Mail } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{ backgroundColor: "#020617", color: "#475569" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid sm:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-6 h-6" style={{ color: "#0369A1" }} aria-hidden="true" />
              <span
                className="text-lg font-bold text-white"
                style={{ fontFamily: "var(--font-lexend)" }}
              >
                Drive Point Solutions
              </span>
            </div>
            <p className="text-sm leading-relaxed">
              Helping drivers explore auto refinancing options through a simple,
              straightforward inquiry process.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3
              className="text-sm font-semibold text-white uppercase tracking-widest mb-4"
              style={{ fontFamily: "var(--font-lexend)" }}
            >
              Contact Us
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 flex-shrink-0" style={{ color: "#0369A1" }} aria-hidden="true" />
                <a
                  href="tel:+18003839064"
                  className="hover:text-white transition-colors duration-150"
                  aria-label="Call us at 1-800-383-9064"
                >
                  1-800-383-9064
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 flex-shrink-0" style={{ color: "#0369A1" }} aria-hidden="true" />
                <a
                  href="mailto:support@drivepointsolutions.org"
                  className="hover:text-white transition-colors duration-150"
                >
                  support@drivepointsolutions.org
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3
              className="text-sm font-semibold text-white uppercase tracking-widest mb-4"
              style={{ fontFamily: "var(--font-lexend)" }}
            >
              Legal
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/privacy-policy" className="hover:text-white transition-colors duration-150">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors duration-150">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="/privacy-policy#state-privacy-rights" className="hover:text-white transition-colors duration-150">
                  Do Not Sell My Information
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div
          className="pt-8 border-t text-xs text-center leading-relaxed"
          style={{ borderColor: "#1E293B" }}
        >
          <p className="mb-2" style={{ color: "#334155" }}>
            © {year} Drive Point Solutions. All rights reserved. Refinancing options, rates,
            and eligibility vary by applicant and provider. Submitting an inquiry does not
            guarantee approval or specific terms.
          </p>
          <p style={{ color: "#1E293B" }}>
            This website is for informational purposes. Not an offer or solicitation in
            states where prohibited.
          </p>
        </div>
      </div>
    </footer>
  );
}
