import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import Script from "next/script";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.pramerta.co.id"),
  title: {
    template: "%s | PAS HVAC",
    default: "PAS HVAC | Solusi HVAC Industri Terpercaya",
  },
  description:
    "PT. Pratama Amerta Solusi — Authorized Distributor FRIMEC & Gree. Menyediakan solusi HVAC industri: Air Handling Unit, Chiller, VRF System, Sheet Metal Ducting, dan Textile Duct untuk berbagai sektor industri di Indonesia.",
  keywords: [
    "HVAC Industri Indonesia",
    "Air Handling Unit Surabaya",
    "Chiller System Indonesia",
    "FRIMEC Distributor Indonesia",
    "Gree VRF System",
    "Sheet Metal Ducting SMACNA",
    "Textile Duct Fabric Duct",
    "PAS HVAC Pratama Amerta Solusi",
  ],
  authors: [{ name: "PT. Pratama Amerta Solusi", url: "https://www.pramerta.co.id" }],
  creator: "PT. Pratama Amerta Solusi",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://www.pramerta.co.id",
    siteName: "PAS HVAC | Solusi HVAC Industri Terpercaya",
    title: "PAS HVAC | Solusi HVAC Industri Terpercaya",
    description:
      "Authorized Distributor FRIMEC & Gree. Solusi HVAC lengkap untuk industri manufaktur, F&B, energi, dan sipil di Indonesia.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "PAS HVAC Industrial Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PAS HVAC | Solusi HVAC Industri Terpercaya",
    description: "Authorized Distributor FRIMEC & Gree untuk solusi HVAC industri di Indonesia.",
    images: ["/images/og-image.jpg"],
  },
  alternates: {
    canonical: "https://www.pramerta.co.id",
    languages: {
      "id-ID": "https://www.pramerta.co.id",
      "x-default": "https://www.pramerta.co.id",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION ?? "",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${manrope.variable} ${inter.variable} h-full antialiased scroll-smooth`} suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "PT. Pratama Amerta Solusi",
                "alternateName": "PAS HVAC",
                "url": "https://www.pramerta.co.id",
                "logo": "https://www.pramerta.co.id/images/logo.png",
                "contactPoint": {
                  "@type": "ContactPoint",
                  "telephone": "+62-31-995-48097",
                  "contactType": "customer service",
                  "areaServed": "ID",
                  "availableLanguage": "Indonesian"
                },
                "sameAs": [
                  "https://www.facebook.com/pramerta",
                  "https://www.instagram.com/pramerta",
                  "https://www.linkedin.com/company/pramerta"
                ]
              },
              {
                "@context": "https://schema.org",
                "@type": "HVACBusiness",
                "name": "PAS HVAC - PT. Pratama Amerta Solusi",
                "image": "https://www.pramerta.co.id/images/logo.png",
                "@id": "https://www.pramerta.co.id",
                "url": "https://www.pramerta.co.id",
                "telephone": "+628155503777",
                "priceRange": "$$",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "Jl. Raya Menganti Jeruk No.240",
                  "addressLocality": "Surabaya",
                  "addressRegion": "Jawa Timur",
                  "postalCode": "60228",
                  "addressCountry": "ID"
                },
                "geo": {
                  "@type": "GeoCoordinates",
                  "latitude": -7.311740,
                  "longitude": 112.684170
                },
                "openingHoursSpecification": {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday"
                  ],
                  "opens": "08:00",
                  "closes": "17:00"
                }
              }
            ])
          }}
        />
      </head>
      <body className="min-h-full flex flex-col font-body bg-background text-on-surface selection:bg-primary-fixed-dim selection:text-on-primary-fixed" suppressHydrationWarning>
        {children}
        <FloatingWhatsApp />

        {/* Google Analytics 4 */}
        {GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="gtag-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}', { page_path: window.location.pathname });
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
