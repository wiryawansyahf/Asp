/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutCompanySection, CompanyKnowledgeModal } from './components/AboutCompany';
import { CatalogSection } from './components/CatalogSection';
import { WhatsAppContactSection, FloatingWhatsAppButton } from './components/WhatsAppContactSection';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutPaymentModal } from './components/CheckoutPaymentModal';
import { AuthModal } from './components/AuthModal';
import { CustomerOrdersModal } from './components/CustomerOrdersModal';
import { AdminDashboard } from './components/AdminDashboard';

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-emerald-500 selection:text-white">
        {/* Navigation Bar with Search, Language Switcher, Cart Badge & Admin Entry */}
        <Navbar />

        {/* Main Content Sections */}
        <main className="flex-1">
          {/* Hero Banner with Brand Tagline & Quick WhatsApp CTAs */}
          <HeroSection />

          {/* Catalog Section with Category Filters, Search, and Tech Specs */}
          <CatalogSection />

          {/* Company Knowledge / Profile / About Me / Founder Story */}
          <AboutCompanySection />

          {/* Dedicated WhatsApp Contact Section with Form & Live Message Preview */}
          <WhatsAppContactSection />
        </main>

        {/* Global Footer */}
        <Footer />

        {/* Floating Quick WhatsApp Launcher */}
        <FloatingWhatsAppButton />

        {/* Modals & Slide-overs */}
        <ProductDetailModal />
        <CartDrawer />
        <CheckoutPaymentModal />
        <AuthModal />
        <CustomerOrdersModal />
        <AdminDashboard />
        <CompanyKnowledgeModal />
      </div>
    </AppProvider>
  );
}
