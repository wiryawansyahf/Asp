/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutCompanySection, CompanyKnowledgeModal } from './components/AboutCompany';
import { CatalogSection } from './components/CatalogSection';
import { ECatalogSection } from './components/ECatalogSection';
import { PartnershipSection } from './components/PartnershipSection';
import { WhatsAppContactSection, FloatingWhatsAppButton } from './components/WhatsAppContactSection';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { AdminDashboard } from './components/AdminDashboard';

const AppContent: React.FC = () => {
  const { isAdminRoute } = useApp();

  if (isAdminRoute) {
    return <AdminDashboard />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-blue-700 selection:text-white">
      {/* Corporate Single-Row Top Bar */}
      <Navbar />

      {/* Main Corporate Sections */}
      <main className="flex-1">
        {/* Hero Corporate Introduction */}
        <HeroSection />

        {/* 1. Perkenalan PT Asiaparts Indotech / About Us */}
        <AboutCompanySection />

        {/* 2 & 3. Display Barang + Detail Spesifikasi + Tanya/Beli via WhatsApp */}
        <CatalogSection />

        {/* 4. Fitur E-Catalog */}
        <ECatalogSection />

        {/* 5. Menu / Fitur Partnership & Support Ship */}
        <PartnershipSection />

        {/* 6. Contact Us di Bagian Bawah Website */}
        <WhatsAppContactSection />
      </main>

      {/* Corporate Footer */}
      <Footer />

      {/* Floating Quick WhatsApp Sales Launcher */}
      <FloatingWhatsAppButton />

      {/* Detail Produk & Spesifikasi + Profil Perusahaan Modals */}
      <ProductDetailModal />
      <CompanyKnowledgeModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
