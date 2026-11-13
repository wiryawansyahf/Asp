import React, { useState } from 'react';
import { MessageCircle, Globe, Menu, X, ExternalLink } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Navbar: React.FC = () => {
  const { language, setLanguage, t, companySettings, formatWhatsAppUrl } = useApp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleLanguage = () => {
    setLanguage(language === 'id' ? 'en' : 'id');
  };

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { id: 'hero', label: language === 'id' ? companySettings.navHomeLabel || t.navHome : t.navHome },
    { id: 'about', label: language === 'id' ? companySettings.navAboutLabel || t.navAbout : t.navAbout },
    { id: 'catalog', label: language === 'id' ? companySettings.navCatalogLabel || t.navCatalog : t.navCatalog },
    { id: 'ecatalog', label: language === 'id' ? companySettings.navECatalogLabel || t.navECatalog : t.navECatalog },
    {
      id: 'main-products',
      label: language === 'id' ? companySettings.navDistributorLabel || t.navDistributor : t.navDistributor
    },
    { id: 'contact-us', label: language === 'id' ? companySettings.navContactLabel || t.navContact : t.navContact }
  ];

  return (
    <header className="no-print sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 transition-colors">
      {/* Optional Announcement Bar (disabled by default in initialData) */}
      {companySettings.isAnnouncementActive && (
        <div className="bg-blue-800 text-white text-xs py-1.5 px-4 text-center font-medium flex items-center justify-center gap-2 flex-wrap">
          <span>{language === 'id' ? companySettings.announcementText : companySettings.announcementTextEn}</span>
          <a
            href={formatWhatsAppUrl(
              companySettings.whatsappDefaultMessage ||
                'Halo PT Asiaparts Indotech, saya ingin berkonsultasi mengenai produk.'
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-blue-200 transition-colors inline-flex items-center gap-1 font-semibold ml-1"
          >
            {companySettings.announcementCtaText || 'Chat Sales'} <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      )}

      {/* Main 3-Zone Single-Row Corporate Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18 gap-4">
          {/* Left Zone: Brand Logo + Wordmark */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2.5 text-left shrink-0 group cursor-pointer"
          >
            {companySettings.logoUrl ? (
              <img
                src={companySettings.logoUrl}
                alt={companySettings.companyName}
                referrerPolicy="no-referrer"
                className="w-9 h-9 rounded-lg object-cover border border-slate-200"
              />
            ) : (
              <div className="w-9 h-9 rounded-lg bg-blue-700 flex items-center justify-center text-white shadow-xs group-hover:bg-blue-800 transition-colors">
                {/* Corporate Blue & White Geometric Emblem */}
                <svg
                  viewBox="0 0 32 32"
                  fill="none"
                  className="w-5 h-5"
                  aria-hidden="true"
                >
                  <path
                    d="M16 4L27 10.2V21.8L16 28L5 21.8V10.2L16 4Z"
                    stroke="white"
                    strokeWidth="2.2"
                  />
                  <path
                    d="M16 10L21.5 21H10.5L16 10Z"
                    fill="white"
                  />
                </svg>
              </div>
            )}
            <span className="text-base sm:text-lg font-extrabold tracking-tight text-slate-900 whitespace-nowrap">
              {companySettings.headerTitle || 'PT Asiaparts'}{' '}
              <span className="text-blue-700">{companySettings.headerTitleHighlight || 'Indotech'}</span>
            </span>
          </button>

          {/* Center Zone: 6 Clean Single-Line Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-slate-600">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="whitespace-nowrap hover:text-blue-700 transition-colors cursor-pointer py-1"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Zone: Language Toggle + Primary WhatsApp Sales CTA */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={toggleLanguage}
              title={language === 'id' ? 'Switch to English' : 'Ganti ke Bahasa Indonesia'}
              className="flex items-center gap-1.5 px-2.5 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 transition-colors cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-blue-700" />
              <span>{language === 'id' ? 'ID' : 'EN'}</span>
            </button>

            <a
              href={formatWhatsAppUrl(
                companySettings.whatsappDefaultMessage ||
                  'Halo Tim PT Asiaparts Indotech, saya ingin menanyakan ketersediaan dan spesifikasi produk.'
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-xs sm:text-sm font-bold whitespace-nowrap shadow-xs transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>
                {language === 'id'
                  ? companySettings.navWhatsAppLabel || t.whatsappDirectChat
                  : t.whatsappDirectChat}
              </span>
            </a>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-2">
          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="p-2.5 rounded-lg bg-slate-50 hover:bg-blue-50 hover:text-blue-700 text-left text-xs font-semibold text-slate-800 transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>
          <a
            href={formatWhatsAppUrl(
              companySettings.whatsappDefaultMessage ||
                'Halo Tim PT Asiaparts Indotech, saya ingin konsultasi produk.'
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full mt-2 py-2.5 px-4 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            <span>
              {t.whatsappDirectChat} (+{companySettings.whatsappNumber})
            </span>
          </a>
        </div>
      )}
    </header>
  );
};
