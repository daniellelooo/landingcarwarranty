import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | Drive Point Solutions",
  description:
    "Learn how Drive Point Solutions collects, uses, discloses, and protects personal information.",
  alternates: {
    canonical: "/privacy-policy",
  },
};

const sectionClass = "scroll-mt-24 border-t border-slate-200 pt-8";
const headingClass = "text-2xl font-bold text-slate-950 mb-4";
const paragraphClass = "text-slate-600 leading-7";
const listClass = "list-disc pl-6 space-y-2 text-slate-600 leading-7";

export default function PrivacyPolicyPage() {
  return (
    <main id="main-content" className="min-h-screen bg-slate-50 text-slate-950">
      <header className="border-b border-slate-200 bg-slate-950 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <ShieldCheck className="w-6 h-6 text-sky-400" aria-hidden="true" />
            Drive Point Solutions
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-sky-200 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Back to Home
          </Link>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <article className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-10 lg:p-14">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-widest text-sky-700 mb-3">
              Legal &amp; Privacy
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-950 mb-4">
              Privacy Policy
            </h1>
            <p className="text-sm text-slate-500 mb-6">
              Effective and last updated: July 6, 2026
            </p>
            <p className={`${paragraphClass} text-lg`}>
              This Privacy Policy explains how Drive Point Solutions (&quot;Drive Point,&quot;
              &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) collects, uses, discloses,
              retains, and protects personal information when you use our website, submit a
              refinancing inquiry, or communicate with us.
            </p>
          </div>

          <nav
            className="my-10 rounded-2xl border border-sky-200 bg-sky-50 p-6"
            aria-label="Privacy policy contents"
          >
            <h2 className="font-bold text-slate-950 mb-3">Policy Contents</h2>
            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-2 text-sm">
              <a href="#notice-at-collection" className="text-sky-800 hover:underline">Notice at Collection</a>
              <a href="#information-we-collect" className="text-sky-800 hover:underline">Information We Collect</a>
              <a href="#how-we-use-information" className="text-sky-800 hover:underline">How We Use Information</a>
              <a href="#how-we-disclose-information" className="text-sky-800 hover:underline">How We Disclose Information</a>
              <a href="#advertising-and-cookies" className="text-sky-800 hover:underline">Advertising and Cookies</a>
              <a href="#state-privacy-rights" className="text-sky-800 hover:underline">U.S. State Privacy Rights</a>
              <a href="#california-notice" className="text-sky-800 hover:underline">California Notice</a>
              <a href="#contact-us" className="text-sky-800 hover:underline">Contact Us</a>
            </div>
          </nav>

          <div className="space-y-10">
            <section id="scope" className={sectionClass}>
              <h2 className={headingClass}>1. Scope and Who We Are</h2>
              <p className={paragraphClass}>
                This Policy applies to personal information collected through this website and
                related communications. It does not govern the independent privacy practices of an
                advertising platform, a website you choose to visit, or another third party. Those
                parties&apos; privacy notices govern their own collection and use of information.
              </p>
            </section>

            <section id="notice-at-collection" className={sectionClass}>
              <h2 className={headingClass}>2. Notice at Collection</h2>
              <p className={`${paragraphClass} mb-5`}>
                At or before the time we collect personal information, we provide this summary of
                the categories we collect, why we collect them, and how long we retain them. We do
                not collect Social Security numbers, bank account credentials, payment card data,
                or precise geolocation through the inquiry form.
              </p>
              <div className="overflow-x-auto rounded-2xl border border-slate-200">
                <table className="w-full min-w-[720px] text-left text-sm">
                  <thead className="bg-slate-100 text-slate-950">
                    <tr>
                      <th className="px-4 py-3 font-bold">Category</th>
                      <th className="px-4 py-3 font-bold">Examples</th>
                      <th className="px-4 py-3 font-bold">Primary purposes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-slate-600">
                    <tr>
                      <td className="px-4 py-4 align-top font-semibold text-slate-800">Identifiers and contact details</td>
                      <td className="px-4 py-4 align-top">Name, email address, telephone number, IP address</td>
                      <td className="px-4 py-4 align-top">Respond to your inquiry, contact you, prevent fraud, and maintain records</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4 align-top font-semibold text-slate-800">Vehicle and inquiry details</td>
                      <td className="px-4 py-4 align-top">Vehicle year, make, model, mileage, warranty status, preferred call time</td>
                      <td className="px-4 py-4 align-top">Evaluate and respond to your refinancing request and prepare for the call</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4 align-top font-semibold text-slate-800">Location information</td>
                      <td className="px-4 py-4 align-top">State and ZIP code</td>
                      <td className="px-4 py-4 align-top">Determine service availability and applicable requirements</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4 align-top font-semibold text-slate-800">Internet and advertising data</td>
                      <td className="px-4 py-4 align-top">Campaign source, campaign name, referral parameters, and basic server logs</td>
                      <td className="px-4 py-4 align-top">Understand inquiry sources, maintain security, and improve our website</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className={`${paragraphClass} mt-5`}>
                We retain each category only for as long as reasonably necessary for the purposes
                described here, including responding to your request, maintaining business and
                legal records, resolving disputes, preventing misuse, and complying with law. The
                exact period depends on the nature of our relationship and applicable legal duties.
              </p>
            </section>

            <section id="information-we-collect" className={sectionClass}>
              <h2 className={headingClass}>3. Information We Collect and Its Sources</h2>
              <ul className={listClass}>
                <li><strong className="text-slate-900">Information you provide:</strong> the contact, vehicle, location, and preference information entered in the inquiry form or provided during communications.</li>
                <li><strong className="text-slate-900">Information collected automatically:</strong> IP address and basic technical or request information created when your browser communicates with our hosting systems.</li>
                <li><strong className="text-slate-900">Advertising and referral information:</strong> UTM campaign parameters or similar identifiers included in a link that brought you to the site.</li>
                <li><strong className="text-slate-900">Information from service providers or partners:</strong> status updates or other information needed to respond to and administer your inquiry.</li>
              </ul>
            </section>

            <section id="how-we-use-information" className={sectionClass}>
              <h2 className={headingClass}>4. How We Use Personal Information</h2>
              <ul className={listClass}>
                <li>Receive, review, process, and respond to your refinancing inquiry.</li>
                <li>Contact you by telephone or email at the time and using the details you provide.</li>
                <li>Operate, maintain, troubleshoot, secure, and improve the website and inquiry process.</li>
                <li>Measure campaign performance using referral or UTM information.</li>
                <li>Detect, investigate, and prevent fraud, abuse, security incidents, and unlawful activity.</li>
                <li>Comply with legal obligations and establish, exercise, or defend legal claims.</li>
              </ul>
              <p className={`${paragraphClass} mt-4`}>
                We will not use personal information for a materially different, unrelated purpose
                without providing notice and obtaining consent where required by law.
              </p>
            </section>

            <section id="how-we-disclose-information" className={sectionClass}>
              <h2 className={headingClass}>5. How We Disclose Personal Information</h2>
              <p className={`${paragraphClass} mb-4`}>We may disclose personal information to:</p>
              <ul className={listClass}>
                <li><strong className="text-slate-900">Service providers:</strong> companies that provide hosting, security, form processing, cloud storage, communications, and technical support. Our current infrastructure includes Vercel for website hosting and Google Sheets for lead storage and workflow support.</li>
                <li><strong className="text-slate-900">Legal and safety recipients:</strong> regulators, law enforcement, courts, advisers, or other parties when reasonably necessary to comply with law, protect rights and safety, or address fraud and security concerns.</li>
                <li><strong className="text-slate-900">Transaction recipients:</strong> parties involved in a merger, financing, acquisition, reorganization, bankruptcy, or transfer of business assets, subject to appropriate safeguards.</li>
              </ul>
              <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
                <h3 className="font-bold text-emerald-950 mb-2">Sale and targeted advertising</h3>
                <p className="text-emerald-900 leading-7">
                  We do not share leads with lenders, refinancing providers, or marketing partners.
                  We do not sell personal information for money or share personal information for
                  cross-context behavioral advertising. We also do not use personal information for
                  automated profiling that produces legal or similarly significant effects. If these
                  practices change, we will update this Policy and provide any legally required
                  notice and opt-out methods before using information in that way.
                </p>
              </div>
            </section>

            <section id="advertising-and-cookies" className={sectionClass}>
              <h2 className={headingClass}>6. Advertising Sources, Meta, and Cookies</h2>
              <p className={`${paragraphClass} mb-4`}>
                You may reach this website after interacting with an advertisement on Meta
                platforms or another advertising service. Those platforms process information
                under their own privacy policies. We may receive campaign parameters contained in
                the link you use, such as a campaign source or campaign name.
              </p>
              <p className={paragraphClass}>
                The current version of this website does not include the Meta Pixel and does not
                set advertising cookies through our application code. Our hosting provider may use
                essential technologies and server logs needed to deliver, secure, and operate the
                website. If we add advertising or analytics technologies, we will update this Policy
                and provide consent or opt-out controls where required.
              </p>
            </section>

            <section id="communications" className={sectionClass}>
              <h2 className={headingClass}>7. Communications and Your Choices</h2>
              <p className={paragraphClass}>
                When you submit the form, you ask us to contact you about your inquiry using the
                contact information you provide. You may ask us not to contact you again by telling
                the caller or emailing us. Your request will not affect communications that are
                legally required or necessary to complete an action you requested.
              </p>
            </section>

            <section id="retention" className={sectionClass}>
              <h2 className={headingClass}>8. Data Retention</h2>
              <p className={paragraphClass}>
                We retain personal information only for as long as reasonably necessary to process
                and follow up on your inquiry, maintain appropriate business and legal records,
                comply with law, resolve disputes, enforce agreements, and protect the website and
                our users. We consider the amount, nature, sensitivity, purpose, and legal or
                operational requirements associated with the information when setting retention.
                We delete or deidentify information when it is no longer reasonably needed, subject
                to lawful exceptions and backup cycles.
              </p>
            </section>

            <section id="security" className={sectionClass}>
              <h2 className={headingClass}>9. Information Security</h2>
              <p className={paragraphClass}>
                We use reasonable administrative, technical, and organizational safeguards designed
                to protect personal information against unauthorized access, loss, misuse, or
                alteration. No system or transmission method is completely secure, so we cannot
                guarantee absolute security.
              </p>
            </section>

            <section id="state-privacy-rights" className={sectionClass}>
              <h2 className={headingClass}>10. U.S. State Privacy Rights</h2>
              <p className={`${paragraphClass} mb-4`}>
                Depending on where you live and whether an applicable law covers our processing,
                you may have the right to:
              </p>
              <ul className={listClass}>
                <li>Confirm whether we process your personal information and access that information.</li>
                <li>Correct inaccuracies in your personal information.</li>
                <li>Delete personal information, subject to legal exceptions.</li>
                <li>Obtain a portable copy of personal information you provided.</li>
                <li>Opt out of sale, targeted advertising, or qualifying automated profiling.</li>
                <li>Limit certain uses or disclosures of sensitive personal information, where applicable.</li>
                <li>Receive equal service and not be discriminated against for exercising a privacy right.</li>
                <li>Appeal a decision we make about your request, where applicable.</li>
              </ul>
              <p className={`${paragraphClass} mt-5`}>
                To submit a request, email{" "}
                <a className="font-semibold text-sky-700 hover:underline" href="mailto:support@drivepointsolutions.org?subject=Privacy%20Request">
                  support@drivepointsolutions.org
                </a>{" "}
                with the subject &quot;Privacy Request&quot; or call{" "}
                <a className="font-semibold text-sky-700 hover:underline" href="tel:+18003839064">1-800-383-9064</a>.
                Describe the right you want to exercise and the state where you live. We may request
                information reasonably necessary to verify your identity and authority. Authorized
                agents may submit requests where permitted by law, but we may require proof of
                authorization and direct identity verification. We will respond within the period
                required by applicable law, generally 45 days, and explain how to appeal when required.
              </p>
              <p className={`${paragraphClass} mt-4`}>
                Because we do not currently sell personal information or use it for targeted
                advertising, a browser-based opt-out signal does not change our current practices.
                If we begin processing covered by a legally recognized universal opt-out signal,
                such as Global Privacy Control, we will honor that signal as required by law.
              </p>
            </section>

            <section id="california-notice" className={sectionClass}>
              <h2 className={headingClass}>11. Additional Notice for California Residents</h2>
              <p className={`${paragraphClass} mb-4`}>
                The categories of personal information we have collected during the preceding 12
                months are described in the Notice at Collection above. We collect them from you,
                your browser or device, referral links, and service providers. We use and disclose
                them for the business purposes described in Sections 4 and 5.
              </p>
              <p className={`${paragraphClass} mb-4`}>
                We may disclose identifiers, vehicle and inquiry information, location information,
                and internet or advertising data to service providers that support hosting, cloud
                storage, security, communications, and inquiry processing on our behalf. We do not
                share leads with lenders, refinancing providers, or marketing partners. We have not
                sold personal information for money or shared personal information for cross-context
                behavioral advertising during the preceding 12 months.
                We do not knowingly sell or share the personal information of consumers under 16.
              </p>
              <p className={paragraphClass}>
                California residents may request the categories or specific pieces of personal
                information collected, the sources, purposes, and categories of recipients, and may
                request correction or deletion, subject to exceptions. California residents may
                exercise these rights using the methods in Section 10 and may use an authorized agent.
                We will not discriminate against you for exercising a CCPA right.
              </p>
            </section>

            <section id="children" className={sectionClass}>
              <h2 className={headingClass}>12. Children&apos;s Privacy</h2>
              <p className={paragraphClass}>
                This website and its refinancing inquiry are intended for adults and are not directed
                to children under 13. We do not knowingly collect personal information from children
                under 13. If you believe a child has provided personal information, contact us so we
                can investigate and delete it as appropriate.
              </p>
            </section>

            <section id="financial-services" className={sectionClass}>
              <h2 className={headingClass}>13. Refinancing Providers and Financial Information</h2>
              <p className={paragraphClass}>
                Submitting an inquiry does not guarantee approval, create a loan, or establish an
                account with a lender. We do not request Social Security numbers, bank credentials,
                or payment information through this website. A lender or refinancing provider may
                provide a separate privacy notice and request additional information under its own
                policies and applicable financial privacy laws.
              </p>
            </section>

            <section id="changes" className={sectionClass}>
              <h2 className={headingClass}>14. Changes to This Policy</h2>
              <p className={paragraphClass}>
                We may update this Policy to reflect changes in our practices, technology, services,
                or legal obligations. We will post the revised Policy here and update the effective
                date. We will provide additional notice when required by law for a material change.
              </p>
            </section>

            <section id="contact-us" className={sectionClass}>
              <h2 className={headingClass}>15. Contact Us</h2>
              <p className={`${paragraphClass} mb-3`}>
                For privacy questions, requests, complaints, or accessibility assistance, contact:
              </p>
              <address className="not-italic rounded-2xl bg-slate-100 p-5 text-slate-700 leading-7">
                <strong className="text-slate-950">Drive Point Solutions — Privacy Team</strong><br />
                Email: <a className="text-sky-700 hover:underline" href="mailto:support@drivepointsolutions.org">support@drivepointsolutions.org</a><br />
                Phone: <a className="text-sky-700 hover:underline" href="tel:+18003839064">1-800-383-9064</a>
              </address>
            </section>
          </div>
        </article>
      </div>
    </main>
  );
}
