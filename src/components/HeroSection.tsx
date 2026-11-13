import React, { useState } from 'react';
import {
  ArrowRight,
  MessageCircle,
  ShieldCheck,
  Truck,
  Award,
  Building2,
  BookOpen
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const HeroSection: React.FC = () => {
  const { language, t, companySettings, products, eCatalogs, formatWhatsAppUrl } = useApp();
  const [imgError, setImgError] = useState(false);

  const heroTitlePrefix =
    language === 'id' ? companySettings.heroTitlePrefix || t.heroTitlePrefix : t.heroTitlePrefix;
  const heroTitleHighlight =
    language === 'id'
      ? companySettings.heroTitleHighlight || t.heroTitleHighlight
      : t.heroTitleHighlight;
  const heroDesc =
    language === 'id' ? companySettings.heroDescription || t.heroDescription : t.heroDescription;
  const heroBadgeText =
    language === 'id' ? companySettings.heroBadge || t.heroBadge : t.heroBadge;

  const stats = [
    {
      icon: ShieldCheck,
      value: companySettings.heroStat1Value?.trim() || `${products.length}+ Series`,
      label: language === 'id' ? companySettings.heroStat1Label || t.heroStatsProducts : t.heroStatsProducts,
      sub:
        language === 'id'
          ? companySettings.heroStat1Sub || 'Lolos QC Standar Industri'
          : 'Industrial QC Verified'
    },
    {
      icon: Building2,
      value: companySettings.heroStat2Value?.trim() || `${eCatalogs.length} Divisi`,
      label: language === 'id' ? companySettings.heroStat2Label || 'E-Catalog Digital' : 'E-Catalog Digital',
      sub:
        language === 'id'
          ? companySettings.heroStat2Sub || 'Otomasi, Pneumatic, Motion & Bearing'
          : 'Automation, Pneumatic, Motion & Bearing'
    },
    {
      icon: Truck,
      value: companySettings.heroStat3Value?.trim() || '38 Provinsi',
      label: language === 'id' ? companySettings.heroStat3Label || t.heroStatsShipping : t.heroStatsShipping,
      sub:
        language === 'id'
          ? companySettings.heroStat3Sub || 'Distribusi ke Kawasan Industri'
          : 'Nationwide Industrial Distribution'
    }
  ];

  return (
    <section
      id="hero"
      className="relative bg-gradient-to-b from-blue-50/70 via-white to-white border-b border-slate-200 pt-10 pb-14 lg:pt-14 lg:pb-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top Split Layout: Strict items-stretch equal baseline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column: Corporate Introduction & Direct CTAs */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-700">
                <Award className="w-4 h-4 text-blue-700" />
                <span>{heroBadgeText}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
                {heroTitlePrefix}{' '}
                <span className="text-blue-700">{heroTitleHighlight}</span>
              </h1>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl">
                {heroDesc}
              </p>

              {/* Primary CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
                <a
                  href="#catalog"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm shadow-sm transition-colors"
                >
                  <span>
                    {language === 'id'
                      ? companySettings.heroCtaCatalogText || t.heroCtaCatalog
                      : t.heroCtaCatalog}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <a
                  href={formatWhatsAppUrl(
                    `Halo Tim Sales *${companySettings.companyName}*, saya ingin bertanya seputar produk dan spesifikasi teknis.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-blue-50 text-blue-800 border border-blue-200 font-bold text-sm transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>
                    {language === 'id'
                      ? companySettings.heroCtaWhatsAppText || t.heroCtaWhatsApp
                      : t.heroCtaWhatsApp}
                  </span>
                </a>
              </div>
            </div>

            {/* Secondary Shortcut Links */}
            <div className="pt-4 border-t border-slate-200/80 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-semibold text-slate-600">
              <a
                href="#ecatalog"
                className="inline-flex items-center gap-1.5 hover:text-blue-700 transition-colors"
              >
                <BookOpen className="w-4 h-4 text-blue-700" />
                <span>
                  {language === 'id'
                    ? companySettings.heroShortcutECatalog || 'Lihat E-Catalog Digital'
                    : 'Browse Digital E-Catalog'}
                </span>
              </a>
              <span className="text-slate-300">·</span>
              <a
                href="#main-products"
                className="hover:text-blue-700 transition-colors"
              >
                {companySettings.heroShortcutMainProducts ||
                  'Our Main Products & Distributor Product of PT ASIAPARTS'}
              </a>
              <span className="text-slate-300">·</span>
              <a
                href="#about"
                className="hover:text-blue-700 transition-colors"
              >
                {language === 'id'
                  ? companySettings.heroShortcutProfile || 'Profil PT Asiaparts Indotech'
                  : 'Company Profile'}
              </a>
            </div>
          </div>

          {/* Right Column: Corporate Industrial Engineering Facility Showcase */}
          <div className="lg:col-span-6 flex">
            <div className="relative w-full rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 shadow-lg flex flex-col justify-between min-h-[280px] sm:min-h-[340px]">
              {!imgError && companySettings.heroImage ? (
                <img
                  src={companySettings.heroImage}
                  alt={companySettings.companyName}
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover flex-1"
                />
              ) : (
                <div className="w-full h-full flex-1 bg-gradient-to-br from-blue-800 to-slate-900 flex flex-col items-center justify-center p-8 text-white text-center">
                  <Building2 className="w-12 h-12 text-blue-300 mb-3" />
                  <p className="text-lg font-bold">{companySettings.companyName}</p>
                  <p className="text-xs text-blue-200 mt-1">{companySettings.tagline}</p>
                </div>
              )}

              {/* Subtle Bottom Corporate Caption Bar */}
              <div className="bg-slate-900/90 backdrop-blur-xs text-white px-5 py-3.5 border-t border-white/10 flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="text-xs font-bold tracking-wide text-blue-300 uppercase">
                    {companySettings.companyName}
                  </p>
                  <p className="text-xs text-slate-200 mt-0.5">
                    {language === 'id'
                      ? companySettings.heroImageCaptionSubtitle ||
                        'Pusat Pengadaan Suku Cadang Industri & Otomasi Presisi'
                      : 'Industrial Spare Parts & Factory Automation Center'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3-Column Corporate Trust & Capability KPI Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl border border-slate-200 p-4 flex items-start gap-3.5 shadow-2xs"
              >
                <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-700 shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-extrabold text-slate-900">{stat.value}</p>
                  <p className="text-xs font-bold text-blue-700">{stat.label}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">{stat.sub}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
