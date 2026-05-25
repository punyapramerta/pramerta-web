"use client";

import { useState, useEffect } from "react";
import { WA_NUMBER } from "@/lib/repositories/dataRepository";

export default function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);
  const [showLabel, setShowLabel] = useState(true);

  const waLink = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
    "Halo PAS HVAC, saya ingin konsultasi gratis mengenai kebutuhan HVAC saya."
  )}`;

  // Tampilkan setelah 1 detik agar tidak ganggu LCP
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Sembunyikan label setelah 6 detik supaya tidak mengganggu
  useEffect(() => {
    const timer = setTimeout(() => setShowLabel(false), 6000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3"
      style={{ filter: "drop-shadow(0 8px 24px rgba(37,211,102,0.35))" }}
    >
      {/* Label bubble */}
      <div
        className="transition-all duration-500 overflow-hidden"
        style={{
          maxWidth: showLabel ? "220px" : "0px",
          opacity: showLabel ? 1 : 0,
        }}
      >
        <div className="bg-white text-gray-800 text-xs font-extrabold px-4 py-2.5 rounded-2xl shadow-lg border border-gray-100 whitespace-nowrap leading-snug">
          💬 Konsultasi Gratis,
          <br />
          <span className="text-[#25D366]">Klik Disini!</span>
        </div>
        {/* Caret pointing right */}
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full w-0 h-0"
          style={{
            borderTop: "6px solid transparent",
            borderBottom: "6px solid transparent",
            borderLeft: "8px solid white",
          }}
        />
      </div>

      {/* Main WhatsApp Button */}
      <a
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Konsultasi Gratis via WhatsApp"
        onClick={() => setShowLabel(false)}
        className="relative flex items-center justify-center w-16 h-16 rounded-full text-white transition-transform hover:scale-110 active:scale-95"
        style={{ background: "#25D366" }}
      >
        {/* Pulse ring animation */}
        <span
          className="absolute inset-0 rounded-full animate-ping"
          style={{ background: "rgba(37,211,102,0.4)" }}
        />
        <span
          className="absolute inset-0 rounded-full animate-ping"
          style={{
            background: "rgba(37,211,102,0.25)",
            animationDelay: "0.5s",
          }}
        />

        {/* WhatsApp SVG icon */}
        <svg
          className="w-8 h-8 relative z-10"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.556 4.112 1.528 5.836L.057 23.999l6.305-1.654A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.005-1.373l-.36-.214-3.727.977.995-3.636-.235-.374A9.818 9.818 0 1112 21.818z" />
        </svg>
      </a>
    </div>
  );
}
