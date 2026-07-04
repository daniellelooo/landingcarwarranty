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
                AutoShield Warranty
              </span>
            </div>
            <p className="text-sm leading-relaxed">
              Providing comprehensive vehicle protection plans for American drivers
              since 2009. Licensed and regulated in all 50 states.
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
                  href="tel:+18005550100"
                  className="hover:text-white transition-colors duration-150"
                  aria-label="Call us at 1-800-555-0100"
                >
                  1-800-555-0100
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 flex-shrink-0" style={{ color: "#0369A1" }} aria-hidden="true" />
                <a
                  href="mailto:info@autoshieldwarranty.com"
                  className="hover:text-white transition-colors duration-150"
                >
                  info@autoshieldwarranty.com
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
                <a href="#" className="hover:text-white transition-colors duration-150">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors duration-150">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors duration-150">
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
            © {year} AutoShield Warranty. All rights reserved. AutoShield Warranty is a
            licensed vehicle service contract provider. Coverage terms and conditions may vary
            by state. Please review your contract for complete details.
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
