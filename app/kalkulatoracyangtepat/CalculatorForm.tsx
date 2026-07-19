"use client";

import React, { useState } from "react";

export default function CalculatorForm() {
  const [panjang, setPanjang] = useState("");
  const [lebar, setLebar] = useState("");
  const [tinggi, setTinggi] = useState("");
  const [result, setResult] = useState<{
    btu: number;
    exactPk: number;
    recommendedPk: number | "sales";
  } | null>(null);

  const KONSTANTA = 550;
  const BTU_PK_MAPPING = [
    { limit: 5000, pk: 0.5 },
    { limit: 7000, pk: 0.75 },
    { limit: 9000, pk: 1 },
    { limit: 12000, pk: 1.5 },
    { limit: 18000, pk: 2 },
    { limit: 24000, pk: 2.5 },
    { limit: 27000, pk: 3 },
    { limit: 36000, pk: 4 },
    { limit: 48000, pk: 5 },
    { limit: 54000, pk: 6 },
  ];
  const WHATSAPP_NUMBER = "6285880006888";

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();

    const p = parseFloat(panjang);
    const l = parseFloat(lebar);
    const t = parseFloat(tinggi);

    if (isNaN(p) || isNaN(l) || isNaN(t) || p <= 0 || l <= 0 || t <= 0) {
      alert("Mohon masukkan angka panjang, lebar, dan tinggi yang valid.");
      return;
    }

    const btu = (p * l * t / 3) * KONSTANTA;
    const exactPk = btu / 9000;

    let recommendedPk: number | "sales" = "sales";
    for (const mapping of BTU_PK_MAPPING) {
      if (btu <= mapping.limit) {
        recommendedPk = mapping.pk;
        break;
      }
    }

    setResult({ btu, exactPk, recommendedPk });
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("id-ID", { maximumFractionDigits: 2 }).format(num);
  };

  const getWhatsappLink = () => {
    let message = "Halo Tim Pramerta, saya butuh konsultasi mengenai AC untuk ruangan saya.";
    if (result) {
      message = `Halo Tim Pramerta, saya telah menggunakan kalkulator AC. Ruangan saya berukuran ${panjang}x${lebar}x${tinggi}m. Kebutuhan pendinginan saya sekitar ${formatNumber(result.btu)} BTU/h. Saya ingin konsultasi lebih lanjut.`;
    }
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="grid md:grid-cols-2 gap-8 items-start">
      {/* Form Card */}
      <div className="bg-white rounded-3xl border border-neutral-100 p-8 md:p-10 shadow-xl shadow-primary/5">
        <h3 className="text-xl font-headline font-extrabold text-neutral-900 mb-2 leading-tight">
          Dimensi Ruangan
        </h3>
        <p className="text-sm text-neutral-500 mb-8 font-body">
          Masukkan panjang, lebar, dan tinggi ruangan Anda dalam satuan meter.
        </p>

        <form onSubmit={handleCalculate} className="space-y-5">
          <div>
            <label
              htmlFor="panjang"
              className="block text-[10px] font-extrabold text-neutral-400 uppercase tracking-widest mb-1.5"
            >
              Panjang (Meter)
            </label>
            <input
              id="panjang"
              type="number"
              step="0.1"
              min="0.1"
              value={panjang}
              onChange={(e) => setPanjang(e.target.value)}
              placeholder="Cth: 4"
              className="w-full px-4 py-3.5 text-sm font-bold border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-neutral-50 placeholder:text-neutral-400 transition-all"
              required
            />
          </div>

          <div>
            <label
              htmlFor="lebar"
              className="block text-[10px] font-extrabold text-neutral-400 uppercase tracking-widest mb-1.5"
            >
              Lebar (Meter)
            </label>
            <input
              id="lebar"
              type="number"
              step="0.1"
              min="0.1"
              value={lebar}
              onChange={(e) => setLebar(e.target.value)}
              placeholder="Cth: 3"
              className="w-full px-4 py-3.5 text-sm font-bold border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-neutral-50 placeholder:text-neutral-400 transition-all"
              required
            />
          </div>

          <div>
            <label
              htmlFor="tinggi"
              className="block text-[10px] font-extrabold text-neutral-400 uppercase tracking-widest mb-1.5"
            >
              Tinggi (Meter)
            </label>
            <input
              id="tinggi"
              type="number"
              step="0.1"
              min="0.1"
              value={tinggi}
              onChange={(e) => setTinggi(e.target.value)}
              placeholder="Cth: 3"
              className="w-full px-4 py-3.5 text-sm font-bold border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-neutral-50 placeholder:text-neutral-400 transition-all"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-white font-extrabold py-4 px-6 rounded-xl transition-all duration-300 text-sm mt-4 active:scale-[0.98] shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-[20px]">calculate</span>
            Hitung Kebutuhan AC
          </button>
        </form>
      </div>

      {/* Result Card */}
      <div className="flex flex-col gap-6 h-full">
        {!result ? (
          <div className="bg-white/60 rounded-3xl border border-neutral-200 border-dashed p-10 flex flex-col items-center justify-center text-center h-full min-h-[300px]">
            <div className="w-16 h-16 bg-neutral-100 rounded-2xl flex items-center justify-center mb-4 text-neutral-400">
              <span className="material-symbols-outlined text-3xl">ac_unit</span>
            </div>
            <p className="text-neutral-500 font-bold max-w-[250px]">
              Isi form di samping untuk melihat hasil perhitungan AC Anda.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-neutral-100 p-8 md:p-10 shadow-xl shadow-primary/5 h-full flex flex-col relative overflow-hidden">
            {/* Decorative background element */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-10" />

            <h3 className="text-xl font-headline font-extrabold text-neutral-900 mb-6 leading-tight flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">check_circle</span>
              Hasil Perhitungan
            </h3>

            <div className="space-y-6 flex-grow">
              <div>
                <p className="text-[11px] font-extrabold text-neutral-400 uppercase tracking-widest mb-1">
                  Kebutuhan Pendinginan
                </p>
                <p className="text-3xl font-extrabold text-neutral-900 flex items-end gap-2">
                  {formatNumber(result.btu)} <span className="text-lg text-neutral-500 font-bold mb-1">BTU/h</span>
                </p>
              </div>

              <div className="h-px w-full bg-neutral-100" />

              <div>
                <p className="text-[11px] font-extrabold text-neutral-400 uppercase tracking-widest mb-2">
                  Rekomendasi Kapasitas AC
                </p>
                {result.recommendedPk === "sales" ? (
                  <div className="bg-orange-50 border border-orange-100 text-orange-800 rounded-xl p-4">
                    <p className="font-bold text-sm mb-1">Kebutuhan melebihi 6 PK</p>
                    <p className="text-xs opacity-80">
                      (Tepatnya: {formatNumber(result.exactPk)} PK). Ruangan Anda mungkin membutuhkan sistem AC tersentralisasi (VRV/VRF) atau beberapa unit AC.
                    </p>
                  </div>
                ) : (
                  <div className="flex items-center gap-4">
                    <div className="bg-primary text-white font-black text-4xl py-3 px-6 rounded-2xl shadow-lg shadow-primary/30">
                      {result.recommendedPk} PK
                    </div>
                    <p className="text-xs text-neutral-500 font-bold max-w-[120px] leading-relaxed">
                      Estimasi ideal untuk ruangan Anda.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* CTA Section */}
            <div className="mt-8 pt-8 border-t border-neutral-100">
              <p className="text-sm font-bold text-neutral-800 mb-4 text-center">
                Ingin pasang AC atau butuh sistem tata udara khusus?
              </p>
              <a
                href={getWhatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold py-4 px-6 rounded-xl transition-all duration-300 text-sm flex items-center justify-center gap-2 active:scale-[0.98] shadow-lg shadow-[#25D366]/20"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                </svg>
                Konsultasi HVAC Sekarang
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
