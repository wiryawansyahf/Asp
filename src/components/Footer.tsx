import React from 'react';
import { MessageCircle, Mail, MapPin, Phone, ShieldCheck, Clock } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Footer: React.FC = () => {
  const { language, t, companySettings, setIsCompanyModalOpen, formatWhatsAppUrl } = useApp();
  const regions =
    companySettings.footerRegions && companySettings.footerRegions.length > 0
      ? companySettings.footerRegions
      : [
          'Jabodetabek & Cikarang',
          'Jawa & Surabaya',
          'Sumatera & Batam',
          'Kalimantan & Sulawesi'
        ];

  return (
    <footer className="no-print bg-slate-950 text-slate-300 pt-14 pb-10 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Brand Summary */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              {companySettings.logoUrl ? (
                <img
                  src={companySettings.logoUrl}
                  alt={companySettings.companyName}
                  referrerPolicy="no-referrer"
                  className="w-9 h-9 rounded-lg object-cover border border-slate-700"
                />
              ) : (
                <div className="w-9 h-9 rounded-lg bg-blue-700 flex items-center justify-center font-bold text-white text-sm">
                  {companySettings.logoText || 'AI'}
                </div>
              )}
              <span className="text-lg font-extrabold text-white tracking-tight">
                {companySettings.companyName}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-md">
              {language === 'id' ? companySettings.footerDesc || t.footerDesc : t.footerDesc}
            </p>

            <div className="pt-1 flex flex-wrap gap-3 text-xs text-slate-300">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-900 border border-slate-800 rounded-lg">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                {companySettings.footerBadge1 || 'Industrial Grade & QC'}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-900 border border-slate-800 rounded-lg">
                <Clock className="w-3.5 h-3.5 text-blue-400" />
                {companySettings.footerBadge2 || 'Main & Distributor Products'}
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">{t.quickLinks}</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <a href="#hero" className="hover:text-blue-400 transition-colors">
                  {language === 'id' ? companySettings.navHomeLabel || t.navHome : t.navHome}
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-blue-400 transition-colors">
                  {language === 'id' ? companySettings.navAboutLabel || t.navAbout : t.navAbout}
                </a>
              </li>
              <li>
                <a href="#catalog" className="hover:text-blue-400 transition-colors">
                  {language === 'id'
                    ? companySettings.navCatalogLabel || t.navCatalog
                    : t.navCatalog}
                </a>
              </li>
              <li>
                <a href="#ecatalog" className="hover:text-blue-400 transition-colors">
                  {language === 'id'
                    ? companySettings.navECatalogLabel || t.navECatalog
                    : t.navECatalog}
                </a>
              </li>
              <li>
                <a href="#main-products" className="hover:text-blue-400 transition-colors">
                  {language === 'id'
                    ? companySettings.navDistributorLabel || t.navDistributor
                    : t.navDistributor}
                </a>
              </li>
              <li>
                <a href="#contact-us" className="hover:text-blue-400 transition-colors">
                  {language === 'id'
                    ? companySettings.navContactLabel || t.navContact
                    : t.navContact}
                </a>
              </li>
            </ul>
          </div>

          {/* Address & Contact Info */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              {t.customerCare}
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>{companySettings.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <span className="font-mono">{companySettings.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <span>{companySettings.email}</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-400">
                <MessageCircle className="w-4 h-4 shrink-0" />
                <a
                  href={formatWhatsAppUrl(
                    `Halo Tim ${companySettings.companyName}, saya ingin bertanya seputar produk.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline font-bold"
                >
                  WhatsApp: +{companySettings.whatsappNumber}
                </a>
              </div>
            </div>
          </div>

          {/* Distribution Regions */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              {t.distributorNetwork}
            </h4>
            <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-300">
              {regions.map((region, idx) => (
                <span key={idx} className="px-2.5 py-1 bg-slate-900 border border-slate-800 rounded">
                  {region}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} {companySettings.companyName}.{' '}
            {language === 'id'
              ? companySettings.footerCopyrightText || t.copyright
              : t.copyright}
          </p>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setIsCompanyModalOpen(true)}
              className="hover:text-slate-300 transition cursor-pointer"
            >
              Profil Perusahaan
            </button>
            <span>·</span>
            <a href="#ecatalog" className="hover:text-slate-300 transition">
              E-Catalog
            </a>
            <span>·</span>
            <a href="#main-products" className="hover:text-slate-300 transition">
              Main & Distributor Products
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
