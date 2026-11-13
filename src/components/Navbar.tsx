import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Search, 
  MessageCircle, 
  Bell, 
  User as UserIcon, 
  ShieldCheck, 
  Globe, 
  Menu, 
  X, 
  Volume2, 
  CheckCheck,
  ChevronRight,
  ExternalLink,
  Pencil,
  Package,
  LayoutDashboard,
  PhoneCall
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Navbar: React.FC = () => {
  const { 
    language, 
    setLanguage, 
    t, 
    companySettings, 
    cartItemCount, 
    setIsCartOpen,
    searchQuery,
    setSearchQuery,
    currentUser,
    isAdmin,
    isInlineEditMode,
    setIsInlineEditMode,
    setIsAuthOpen,
    setAuthInitialTab,
    openAdminTab,
    openAdminAccess,
    setIsOrdersOpen,
    setIsCompanyModalOpen,
    logout,
    notifications,
    unreadNotificationCount,
    markNotificationRead,
    markAllNotificationsRead,
    playNotificationSound,
    formatWhatsAppUrl
  } = useApp();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotifDropdownOpen, setIsNotifDropdownOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

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

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all">
      {/* Admin Live Control Bar (Visible when logged in as Admin) */}
      {isAdmin && (
        <div className="bg-slate-950 text-white px-4 py-1.5 border-b border-slate-800">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-[11px] sm:text-xs">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Mode Admin Aktif
              </span>
              <button
                onClick={() => setIsInlineEditMode(!isInlineEditMode)}
                className={`px-2.5 py-0.5 rounded-lg font-semibold border transition flex items-center gap-1 ${
                  isInlineEditMode
                    ? 'bg-amber-500 text-slate-950 border-amber-400'
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                }`}
              >
                <Pencil className="w-3 h-3" />
                <span>{isInlineEditMode ? 'Edit Langsung: ON' : 'Edit Langsung: OFF'}</span>
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <button
                onClick={() => openAdminTab('header_wa')}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-emerald-700 text-slate-200 hover:text-white font-semibold transition flex items-center gap-1"
              >
                <Pencil className="w-3 h-3 text-emerald-400" />
                <span>Edit Header & No. WA</span>
              </button>
              <button
                onClick={() => openAdminTab('products')}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-blue-700 text-slate-200 hover:text-white font-semibold transition flex items-center gap-1"
              >
                <Package className="w-3 h-3 text-blue-400" />
                <span>Edit Produk</span>
              </button>
              <button
                onClick={() => openAdminTab('analytics')}
                className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition flex items-center gap-1"
              >
                <LayoutDashboard className="w-3 h-3" />
                <span>Dashboard CMS</span>
              </button>
              <button
                onClick={logout}
                className="px-2 py-1 rounded-lg text-rose-300 hover:bg-rose-950/60 hover:text-rose-200 font-medium transition"
              >
                Keluar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Announcement Bar */}
      {companySettings.isAnnouncementActive && (
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 text-white text-xs sm:text-sm py-1.5 px-4 text-center font-medium flex items-center justify-center gap-2 flex-wrap">
          <span>{language === 'id' ? companySettings.announcementText : companySettings.announcementTextEn}</span>
          <a
            href={formatWhatsAppUrl(companySettings.whatsappDefaultMessage || 'Halo Admin, saya ingin klaim promo hari ini.')}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-emerald-200 transition-colors inline-flex items-center gap-1 font-semibold ml-1"
          >
            {companySettings.announcementCtaText || 'Klaim Promo'} <ExternalLink className="w-3 h-3" />
          </a>
          {isAdmin && isInlineEditMode && (
            <button
              onClick={() => openAdminTab('header_wa')}
              className="ml-2 px-2 py-0.5 rounded bg-slate-950/70 hover:bg-slate-950 text-amber-300 text-[10px] font-bold inline-flex items-center gap-1"
            >
              <Pencil className="w-2.5 h-2.5" /> Edit Banner
            </button>
          )}
        </div>
      )}

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-3">
          
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-2 shrink-0">
            <button 
              onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="flex items-center gap-2.5 text-left group"
            >
              {companySettings.logoUrl ? (
                <img
                  src={companySettings.logoUrl}
                  alt={companySettings.headerTitle}
                  className="w-10 h-10 rounded-xl object-cover shadow-md border border-slate-200 group-hover:scale-105 transition-transform"
                />
              ) : (
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center shadow-md shadow-emerald-500/20 text-white font-bold text-xl group-hover:scale-105 transition-transform">
                  {companySettings.logoText || 'N'}
                </div>
              )}
              <div className="hidden sm:block">
                <span className="text-lg font-extrabold tracking-tight text-slate-900 block leading-tight font-heading">
                  {companySettings.headerTitle || 'Nusantara'}{' '}
                  <span className="text-emerald-600">{companySettings.headerTitleHighlight || 'Catalog'}</span>
                </span>
                <span className="text-[11px] font-medium text-slate-500 tracking-wider uppercase block">
                  {companySettings.headerSubtitle || 'Official Store & Innovations'}
                </span>
              </div>
            </button>

            {isAdmin && isInlineEditMode && (
              <button
                onClick={() => openAdminTab('header_wa')}
                title="Edit Logo & Judul Header"
                className="p-1.5 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 transition"
              >
                <Pencil className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full pl-10 pr-9 py-2 bg-slate-100/80 hover:bg-slate-100 focus:bg-white text-sm rounded-full border border-slate-200/90 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all placeholder:text-slate-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
            <button 
              onClick={() => scrollToSection('hero')} 
              className="hover:text-emerald-600 transition-colors"
            >
              {t.navHome}
            </button>
            <button 
              onClick={() => scrollToSection('catalog')} 
              className="hover:text-emerald-600 transition-colors"
            >
              {t.navCatalog}
            </button>
            <button 
              onClick={() => setIsCompanyModalOpen(true)} 
              className="hover:text-emerald-600 transition-colors flex items-center gap-1"
            >
              {t.navAbout}
            </button>
            <button 
              onClick={() => scrollToSection('contact-whatsapp')} 
              className="hover:text-emerald-600 transition-colors flex items-center gap-1.5"
            >
              <MessageCircle className="w-4 h-4 text-emerald-500" />
              WhatsApp
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">

            {/* Header WhatsApp Pill (Editable via Admin) */}
            {companySettings.showWhatsAppInHeader && (
              <div className="hidden xl:flex items-center gap-1">
                <a
                  href={formatWhatsAppUrl(companySettings.whatsappDefaultMessage || 'Halo Admin, saya ingin bertanya seputar produk.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-semibold transition"
                  title="Chat WhatsApp Resmi"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="font-mono">+{companySettings.whatsappNumber}</span>
                </a>
                {isAdmin && isInlineEditMode && (
                  <button
                    onClick={() => openAdminTab('header_wa')}
                    title="Edit Nomor WhatsApp"
                    className="p-1 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300"
                  >
                    <Pencil className="w-3 h-3" />
                  </button>
                )}
              </div>
            )}
            
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              title={language === 'id' ? 'Switch to English' : 'Ganti ke Bahasa Indonesia'}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-slate-500" />
              <span>{language === 'id' ? 'ID 🇮🇩' : 'EN 🇬🇧'}</span>
            </button>

            {/* Notification Bell with Audio test */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsNotifDropdownOpen(!isNotifDropdownOpen);
                  setIsUserMenuOpen(false);
                }}
                className="relative p-2 rounded-full text-slate-600 hover:text-emerald-600 hover:bg-slate-100 transition-colors"
                title="Notifikasi Pesanan"
              >
                <Bell className="w-5 h-5" />
                {unreadNotificationCount > 0 && (
                  <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white animate-pulse">
                    {unreadNotificationCount}
                  </span>
                )}
              </button>

              {/* Notification Dropdown */}
              {isNotifDropdownOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-200 py-3 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="flex items-center justify-between px-4 pb-2 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-slate-900">Notifikasi Pesanan</span>
                      <button
                        onClick={playNotificationSound}
                        title="Tes Audio Chime"
                        className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-emerald-600 transition"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    {unreadNotificationCount > 0 && (
                      <button
                        onClick={markAllNotificationsRead}
                        className="text-xs text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1"
                      >
                        <CheckCheck className="w-3.5 h-3.5" /> {t.markAllRead}
                      </button>
                    )}
                  </div>
                  <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                    {notifications.length === 0 ? (
                      <p className="p-4 text-xs text-center text-slate-400">Tidak ada notifikasi</p>
                    ) : (
                      notifications.slice(0, 6).map((n) => (
                        <div
                          key={n.id}
                          onClick={() => {
                            markNotificationRead(n.id);
                            if (n.orderId) openAdminTab('orders');
                          }}
                          className={`p-3 text-xs cursor-pointer hover:bg-slate-50 transition ${
                            !n.read ? 'bg-emerald-50/50' : ''
                          }`}
                        >
                          <div className="flex items-center justify-between font-semibold text-slate-800 mb-0.5">
                            <span className="truncate">{n.title}</span>
                            <span className="text-[10px] text-slate-400 shrink-0 ml-2">{n.timestamp}</span>
                          </div>
                          <p className="text-slate-600 line-clamp-2">{n.message}</p>
                        </div>
                      ))
                    )}
                  </div>
                  <div className="pt-2 px-3 border-t border-slate-100 text-center">
                    <button
                      onClick={() => {
                        setIsNotifDropdownOpen(false);
                        openAdminTab('orders');
                      }}
                      className="text-xs font-semibold text-emerald-600 hover:text-emerald-700"
                    >
                      Buka Dashboard Admin Pesanan →
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Shopping Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 px-3 py-2 bg-emerald-50 hover:bg-emerald-100/80 text-emerald-700 rounded-full font-semibold text-xs sm:text-sm transition-all shadow-xs"
            >
              <ShoppingBag className="w-4 h-4 text-emerald-600" />
              <span className="hidden sm:inline">{t.cartTitle}</span>
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-[11px] font-bold text-white">
                {cartItemCount}
              </span>
            </button>

            {/* User Account / Admin Trigger */}
            <div className="relative">
              {currentUser ? (
                <button
                  onClick={() => {
                    setIsUserMenuOpen(!isUserMenuOpen);
                    setIsNotifDropdownOpen(false);
                  }}
                  className="flex items-center gap-2 p-1 pl-2 rounded-full border border-slate-200 hover:border-emerald-500 bg-white transition"
                >
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-7 h-7 rounded-full object-cover"
                  />
                  <span className="text-xs font-medium text-slate-700 hidden sm:inline max-w-[90px] truncate">
                    {currentUser.name}
                  </span>
                  {currentUser.role === 'admin' && (
                    <span className="bg-emerald-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase">
                      Admin
                    </span>
                  )}
                </button>
              ) : (
                <button
                  onClick={() => {
                    setAuthInitialTab('signin');
                    setIsAuthOpen(true);
                  }}
                  className="hidden sm:flex items-center gap-1.5 px-3 py-2 border border-slate-300 text-slate-700 hover:text-emerald-600 hover:border-emerald-500 rounded-full text-xs font-semibold transition"
                >
                  <UserIcon className="w-4 h-4" />
                  <span>{t.navLogin}</span>
                </button>
              )}

              {/* User Dropdown Menu */}
              {isUserMenuOpen && currentUser && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50">
                  <div className="px-4 py-2 border-b border-slate-100">
                    <p className="text-xs font-semibold text-slate-900 truncate">{currentUser.name}</p>
                    <p className="text-[11px] text-slate-500 truncate">{currentUser.email}</p>
                  </div>
                  <button
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      setIsOrdersOpen(true);
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center justify-between"
                  >
                    <span>{t.navOrders}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  </button>
                  <button
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      openAdminTab('analytics');
                    }}
                    className="w-full text-left px-4 py-2 text-xs font-medium text-emerald-700 hover:bg-emerald-50 flex items-center justify-between"
                  >
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      {t.navAdmin}
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 text-emerald-500" />
                  </button>
                  <div className="border-t border-slate-100 my-1"></div>
                  <button
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      logout();
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-rose-600 hover:bg-rose-50"
                  >
                    {t.navLogout}
                  </button>
                </div>
              )}
            </div>

            {/* Direct Admin Access Button (Visible across tablet & desktop) */}
            <button
              onClick={openAdminAccess}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold shadow-xs transition"
              title="Akses Admin untuk Edit Header, WhatsApp & Produk"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>{isAdmin ? 'Admin CMS' : 'Akses Admin'}</span>
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-3">
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full pl-10 pr-9 py-2 bg-slate-100 text-sm rounded-full border border-slate-200 outline-none focus:border-emerald-500 focus:bg-white transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 p-0.5"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-2">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <button
              onClick={() => scrollToSection('hero')}
              className="p-2.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-left font-medium text-slate-800"
            >
              {t.navHome}
            </button>
            <button
              onClick={() => scrollToSection('catalog')}
              className="p-2.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-left font-medium text-slate-800"
            >
              {t.navCatalog}
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsCompanyModalOpen(true);
              }}
              className="p-2.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-left font-medium text-slate-800"
            >
              {t.navAbout}
            </button>
            <button
              onClick={() => scrollToSection('contact-whatsapp')}
              className="p-2.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-left font-medium text-emerald-800 flex items-center gap-1.5"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              WhatsApp
            </button>
          </div>

          <div className="pt-2 border-t border-slate-100 space-y-2">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                openAdminAccess();
              }}
              className="w-full flex items-center justify-between p-2.5 bg-slate-900 text-white rounded-xl text-sm font-semibold"
            >
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                {isAdmin ? `${t.navAdmin} & CMS` : 'Akses Admin (Edit Website)'}
              </span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>

            {!currentUser ? (
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsAuthOpen(true);
                }}
                className="w-full p-2.5 border border-slate-300 rounded-xl text-center text-sm font-semibold text-slate-700"
              >
                {t.navLogin}
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsOrdersOpen(true);
                  }}
                  className="flex-1 p-2 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700"
                >
                  {t.navOrders}
                </button>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    logout();
                  }}
                  className="p-2 text-rose-600 border border-rose-200 rounded-lg text-xs font-semibold"
                >
                  {t.navLogout}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
