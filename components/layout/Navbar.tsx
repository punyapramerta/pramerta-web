"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { companyData } from "@/lib/repositories/dataRepository";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Produk", href: "/#product" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Blog", href: "/blog" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const waLink = `https://wa.me/${companyData.contact.whatsapp}?text=${encodeURIComponent("Halo PAS HVAC, saya ingin berkonsultasi mengenai solusi HVAC untuk kebutuhan industri kami.")}`;

  return (
    <header className={cn(
      "fixed top-0 w-full z-50 transition-all duration-300",
      scrolled 
        ? "bg-white border-b border-gray-100 shadow-sm py-0" 
        : "bg-white/90 backdrop-blur-md border-b border-gray-100/50 py-0"
    )}>
      <nav className="flex justify-between items-center h-16 px-4 md:px-8 max-w-7xl mx-auto">
        <Link href="/" className="flex items-center">
          <img src="/images/logopas.png" alt={companyData.brand} className="h-10 md:h-12 w-auto" />
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.label}
              className={cn(
                "transition-all font-semibold text-sm hover:text-primary",
                link.label === "Home" 
                  ? "text-primary" 
                  : "text-gray-500"
              )} 
              href={link.href}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a 
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex bg-primary text-white px-5 py-2 rounded-lg font-bold text-sm hover:bg-primary/90 transition-all items-center gap-2"
          >
            WhatsApp Us
          </a>

          <button 
            className="md:hidden text-primary p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <span className="material-symbols-outlined text-2xl">
              {mobileOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 p-4 space-y-3">
          {navLinks.map((link) => (
            <Link 
              key={link.label}
              className="block font-semibold text-base text-on-surface p-3 hover:bg-primary/5 rounded-lg"
              href={link.href}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <a 
            href={waLink}
            className="block bg-primary text-white p-3 rounded-lg font-bold text-center text-sm"
            onClick={() => setMobileOpen(false)}
          >
            WhatsApp Us
          </a>
        </div>
      )}
    </header>
  );
}
