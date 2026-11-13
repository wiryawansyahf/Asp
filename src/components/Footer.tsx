import React from 'react';
import { 
  Building2, 
  MessageCircle, 
  Mail, 
  MapPin, 
  Phone, 
  ShieldCheck, 
  Clock, 
  Globe, 
  ExternalLink 
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Footer: React.FC = () => {
  const { 
    t, 
    companySettings, 
    setIsCompanyModalOpen, 
    formatWhatsAppUrl 
  } = useApp();

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Brand Info & Mission */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              {companySettings.logoUrl ? (
                <img
                  src={companySettings.logoUrl}
                  alt={companySettings.companyName}
                  className="w-10 h-10 rounded-xl object-cover shadow-md"
                />
              ) : (
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center font-bold text-white shadow-md text-xl">
                  {companySettings.logoText || 'N'}
                </div>
              )}
              <span className="text-xl font-extrabold text-white font-heading">
                {companySettings.companyName}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed text-justify">
              {companySettings.tagline}. {t.footerDesc}
            </p>

            <div className="pt-2 flex flex-wrap gap-2 text-xs">
              <span className="px-3 py-1 bg-slate-900 border border-slate-800 rounded-full text-slate-300 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                100% Produk Original & SNI
              </span>
              <span className="px-3 py-1 bg-slate-900 border border-slate-800 rounded-full text-slate-300 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                Dukungan 24/7
              </span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              {t.quickLinks}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#hero" className="hover:text-emerald-400 transition">
                  {t.navHome}
                </a>
              </li>
              <li>
                <a href="#catalog" className="hover:text-emerald-400 transition">
                  {t.navCatalog}
                </a>
              </li>
              <li>
                <button
                  onClick={() => setIsCompanyModalOpen(true)}
                  className="hover:text-emerald-400 transition text-left"
                >
                  {t.navAbout}
                </button>
              </li>
              <li>
                <a href="#contact-whatsapp" className="hover:text-emerald-400 transition">
                  {t.navContact}
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Care & Contacts */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              {t.customerCare}
            </h4>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{companySettings.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{companySettings.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{companySettings.email}</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-300">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={formatWhatsAppUrl('Halo Admin, saya ingin menanyakan produk.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline font-semibold"
                >
                  WhatsApp: +{companySettings.whatsappNumber}
                </a>
              </div>
            </div>
          </div>

          {/* Payment & Logistics Badges */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Metode Pembayaran
            </h4>
            <div className="flex flex-wrap gap-1.5 text-[10px] font-mono">
              <span className="px-2 py-1 bg-slate-900 border border-slate-800 rounded font-bold text-white">QRIS</span>
              <span className="px-2 py-1 bg-slate-900 border border-slate-800 rounded font-bold text-white">BCA VA</span>
              <span className="px-2 py-1 bg-slate-900 border border-slate-800 rounded font-bold text-white">MANDIRI</span>
              <span className="px-2 py-1 bg-slate-900 border border-slate-800 rounded font-bold text-white">BRI VA</span>
              <span className="px-2 py-1 bg-slate-900 border border-slate-800 rounded font-bold text-white">VISA</span>
              <span className="px-2 py-1 bg-slate-900 border border-slate-800 rounded font-bold text-white">MASTERCARD</span>
            </div>

            <h4 className="text-xs font-bold text-white uppercase tracking-wider pt-2">
              Mitra Ekspedisi
            </h4>
            <div className="flex flex-wrap gap-1.5 text-[10px]">
              <span className="px-2 py-1 bg-slate-900 border border-slate-800 rounded text-slate-300">JNE Express</span>
              <span className="px-2 py-1 bg-slate-900 border border-slate-800 rounded text-slate-300">SiCepat</span>
              <span className="px-2 py-1 bg-slate-900 border border-slate-800 rounded text-slate-300">J&T Express</span>
              <span className="px-2 py-1 bg-slate-900 border border-slate-800 rounded text-slate-300">GoSend Instant</span>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} {companySettings.companyName}. {t.copyright}
          </p>
          <div className="flex items-center gap-4">
            <button onClick={() => setIsCompanyModalOpen(true)} className="hover:text-slate-300 transition">
              Kebijakan Privasi
            </button>
            <span>•</span>
            <button onClick={() => setIsCompanyModalOpen(true)} className="hover:text-slate-300 transition">
              Syarat & Ketentuan
            </button>
            <span>•</span>
            <button onClick={() => setIsCompanyModalOpen(true)} className="hover:text-slate-300 transition">
              Garansi & Retur
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
