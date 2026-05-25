import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import ClientLogos from "@/components/home/ClientLogos";
import StatsBar from "@/components/home/StatsBar";
import About from "@/components/home/About";
import ProductTeaser from "@/components/home/ProductTeaser";
import Certifications from "@/components/home/Certifications";
import PortfolioSection from "@/components/home/PortfolioSection";
import Testimonials from "@/components/home/Testimonials";
import FAQ from "@/components/home/FAQ";
import LeadGenSection from "@/components/home/LeadGenSection";

export const metadata: Metadata = {
  title: "PAS HVAC | Solusi HVAC Industri Terpercaya",
  description:
    "PT. Pratama Amerta Solusi — Authorized Distributor FRIMEC & Gree. Air Handling Unit, Chiller, VRF, Sheet Metal Ducting, dan Textile Duct untuk industri Indonesia.",
  alternates: {
    canonical: "https://www.pramerta.co.id",
  },
};

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        {/* 1. Hero – Trust + Lead Form */}
        <Hero />

        {/* 2. Client Logos – Social proof */}
        <ClientLogos />

        {/* 3. Stats Bar – Scale & credibility */}
        <StatsBar />

        {/* 4. About – Expertise */}
        <About />

        {/* 5. Product Teaser – Our Solutions */}
        <ProductTeaser />

        {/* 6. Certifications */}
        <Certifications />

        {/* 7. Portfolio - Recent Case Studies */}
        <PortfolioSection />

        {/* 8. Testimonials – Client Trust */}
        <Testimonials />

        {/* 9. FAQ - Frequently Asked Questions */}
        <FAQ />

        {/* 10. Lead Gen Section – Pre-footer CTA */}
        <LeadGenSection />
      </main>
      <Footer />
    </>
  );
}
