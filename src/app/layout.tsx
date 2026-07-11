import type { Metadata } from "next";
import { Lexend, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import MetaPixel from "@/components/MetaPixel";

const lexend = Lexend({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-lexend",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-source-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Extended Vehicle Warranty | Protect Your Car Today",
  description:
    "Get comprehensive extended warranty coverage for your vehicle. Protect yourself from unexpected repair costs. Get a free quote in 60 seconds.",
  keywords:
    "extended warranty, vehicle protection, car warranty, auto warranty USA, vehicle service contract",
  openGraph: {
    title: "Extended Vehicle Warranty | Protect Your Car Today",
    description:
      "Get comprehensive extended warranty coverage. Protect yourself from unexpected repair costs.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${lexend.variable} ${sourceSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:rounded-lg focus:bg-white focus:text-slate-900 focus:shadow-lg"
        >
          Skip to main content
        </a>
        {children}
        <MetaPixel />
      </body>
    </html>
  );
}
