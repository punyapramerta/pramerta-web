import Link from "next/link";
import { companyData, WA_NUMBER } from "@/lib/repositories/dataRepository";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="pt-16 pb-8 text-white" style={{ background: "#0d1117" }}>
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 lg:gap-16 mb-14">
          {/* Brand column */}
          <div className="space-y-5">
            <div>
              <Link href="/" className="inline-block">
                <img src="/images/logopas_footer.PNG" alt={companyData.brand} className="h-12 w-auto" />
              </Link>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
              Perusahaan engineering HVAC yang berfokus pada inovasi. Menyediakan solusi Procurement, Instalasi, dan Maintenance sistem pendingin udara industri.
            </p>
            <div className="flex gap-3">
              <a
                href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Halo PAS HVAC, saya ingin informasi lebih lanjut tentang layanan Anda.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-all text-gray-400 hover:text-white border border-white/8"
                aria-label="Hubungi via WhatsApp"
              >
                <span className="material-symbols-outlined text-base">public</span>
              </a>
              <a
                href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Halo PAS HVAC, saya ingin menghubungi tim Anda.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-all text-gray-400 hover:text-white border border-white/8"
                aria-label="Share via WhatsApp"
              >
                <span className="material-symbols-outlined text-base">share</span>
              </a>
            </div>
          </div>
          
          {/* Produk */}
          <div>
            <h4 className="font-bold mb-6 text-white uppercase tracking-widest text-[10px]">Produk</h4>
            <ul className="space-y-3 text-sm text-gray-500">
              <li><a className="hover:text-white transition-colors" href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Halo PAS HVAC, saya ingin konsultasi mengenai Air Handling Unit.")}`} target="_blank" rel="noopener noreferrer">Air Handling Unit</a></li>
              <li><a className="hover:text-white transition-colors" href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Halo PAS HVAC, saya ingin konsultasi mengenai Chiller & VRF System.")}`} target="_blank" rel="noopener noreferrer">Chiller &amp; VRF System</a></li>
              <li><a className="hover:text-white transition-colors" href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Halo PAS HVAC, saya ingin konsultasi mengenai Sheet Metal Ducting.")}`} target="_blank" rel="noopener noreferrer">Sheet Metal Ducting</a></li>
              <li><a className="hover:text-white transition-colors" href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Halo PAS HVAC, saya ingin konsultasi mengenai Textile / Fabric Duct.")}`} target="_blank" rel="noopener noreferrer">Textile / Fabric Duct</a></li>
              <li><a className="hover:text-white transition-colors" href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Halo PAS HVAC, saya ingin konsultasi mengenai layanan Maintenance & Service.")}`} target="_blank" rel="noopener noreferrer">Maintenance &amp; Service</a></li>
            </ul>
          </div>
          
          {/* Social Media */}
          <div>
            <h4 className="font-bold mb-6 text-white uppercase tracking-widest text-[10px]">Social Media</h4>
            <ul className="space-y-3 text-sm text-gray-500">
              <li><a className="hover:text-white transition-colors" href="https://www.instagram.com/pashvac.id" target="_blank" rel="noopener noreferrer">Instagram</a></li>
              <li><a className="hover:text-white transition-colors" href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Halo PAS HVAC, saya ingin menghubungi tim Anda.")}`} target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
            </ul>
          </div>
          
          {/* Cabang */}
          <div>
            <h4 className="font-bold mb-6 text-white uppercase tracking-widest text-[10px]">Cabang</h4>
            <ul className="space-y-5 text-sm text-gray-500">
              <li className="space-y-1">
                <div className="font-bold text-white text-[10px] uppercase tracking-widest">Surabaya (HQ)</div>
                <div className="leading-relaxed text-xs">Ruko Permata Bintoro, Jl. Ketampon No.52-53, Kec. Tegalsari, Surabaya 60264</div>
              </li>
              <li className="space-y-1">
                <div className="font-bold text-white text-[10px] uppercase tracking-widest">Jakarta</div>
                <div className="leading-relaxed text-xs">Jl. Tembaga Raya No.176A, Harapan Mulya, Kec. Kemayoran, Jakarta Pusat 10640</div>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold text-gray-600 uppercase tracking-[0.15em]">
          <div>© {year} {companyData.name}. All Rights Reserved.</div>
          <div className="flex gap-6">
            <Link className="hover:text-white transition-colors" href="#">Privacy Policy</Link>
            <Link className="hover:text-white transition-colors" href="#">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
