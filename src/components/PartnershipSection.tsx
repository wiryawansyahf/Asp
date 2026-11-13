import React, { useState } from 'react';
import {
  Award,
  Pause,
  Play,
  LayoutGrid
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { DistributorBrand } from '../types';

export const MainDistributorSection: React.FC = () => {
  const { language, t, distributorBrands, setSelectedCategory, companySettings } = useApp();
  const [logoErrors, setLogoErrors] = useState<Record<string, boolean>>({});
  const [showAllBrands, setShowAllBrands] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const markLogoError = (id: string) => {
    setLogoErrors((prev) => ({ ...prev, [id]: true }));
  };

  const handleFilterCategory = (cat: string) => {
    setSelectedCategory(cat);
    const catalogEl = document.getElementById('catalog');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const midPoint = Math.ceil(distributorBrands.length / 2);
  const rowOneBrands = distributorBrands.slice(0, midPoint);
  const rowTwoBrands =
    distributorBrands.length > 4 ? distributorBrands.slice(midPoint) : distributorBrands;

  const renderBrandTile = (brand: DistributorBrand, keyPrefix: string, idx: number, isGrid = false) => (
    <button
      key={`${keyPrefix}-${brand.id}-${idx}`}
      type="button"
      onClick={() => handleFilterCategory(brand.category)}
      title={`${brand.name} — ${brand.category}`}
      className={`group bg-white border border-slate-200 hover:border-blue-600 rounded-lg p-2.5 flex items-center justify-center shadow-2xs hover:shadow-md transition-all cursor-pointer ${
        isGrid ? 'w-full h-[76px] sm:h-[82px]' : 'w-[170px] sm:w-[200px] h-[76px] sm:h-[84px] shrink-0'
      }`}
    >
      {!logoErrors[brand.id] && brand.logoUrl ? (
        <img
          src={brand.logoUrl}
          alt={brand.name}
          referrerPolicy="no-referrer"
          onError={() => markLogoError(brand.id)}
          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-200"
        />
      ) : (
        <span className="text-sm font-extrabold tracking-tight text-slate-900 text-center px-2">
          {brand.name}
        </span>
      )}
    </button>
  );

  return (
    <section
      id="main-products"
      className="py-16 sm:py-20 bg-gradient-to-b from-blue-950 via-blue-900 to-slate-900 text-white border-b border-slate-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="max-w-3xl space-y-2.5">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-300">
            <Award className="w-4 h-4" />
            <span>
              {language === 'id'
                ? companySettings.mainDistributorBadge || t.mainDistributorBadge
                : t.mainDistributorBadge}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white">
            {language === 'id'
              ? companySettings.mainDistributorTitle || t.mainDistributorTitle
              : t.mainDistributorTitle}
          </h2>
          <p className="text-sm sm:text-base text-blue-100/90 leading-relaxed">
            {language === 'id'
              ? companySettings.mainDistributorSubtitle || t.mainDistributorSubtitle
              : t.mainDistributorSubtitle}
          </p>
        </div>

        {/* Clean White Brand Logo Showcase with Smooth Slideshow Animation */}
        <div className="bg-white text-slate-900 rounded-2xl p-5 sm:p-7 border border-blue-100 shadow-xl space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex-1 hidden sm:block" />
            <h3 className="text-xl sm:text-2xl font-extrabold tracking-wider uppercase text-slate-900 text-center">
              {companySettings.brandSectionTitle || 'BRAND'}
            </h3>
            <div className="flex-1 flex items-center justify-end gap-2">
              {!showAllBrands && (
                <button
                  type="button"
                  onClick={() => setIsPaused((prev) => !prev)}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
                  title={isPaused ? 'Putar Slideshow' : 'Jeda Slideshow'}
                >
                  {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
                  <span className="hidden sm:inline">{isPaused ? 'Play' : 'Pause'}</span>
                </button>
              )}
              <button
                type="button"
                onClick={() => setShowAllBrands((prev) => !prev)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-blue-700 hover:bg-blue-50 transition-colors cursor-pointer"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>
                  {showAllBrands
                    ? language === 'id'
                      ? 'Mode Slideshow'
                      : 'Slideshow Mode'
                    : language === 'id'
                    ? 'Lihat semua'
                    : 'View all'}
                </span>
              </button>
            </div>
          </div>

          {showAllBrands ? (
            /* Full 8-Column x 2-Row Grid View */
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5 sm:gap-3">
              {distributorBrands.map((brand, idx) => renderBrandTile(brand, 'grid', idx, true))}
            </div>
          ) : (
            /* Animated Dual-Row Slideshow Marquee */
            <div className="marquee-container relative overflow-hidden space-y-3 py-1">
              {/* Soft Left & Right Edge Fades */}
              <div className="pointer-events-none absolute inset-y-0 left-0 w-8 sm:w-14 bg-gradient-to-r from-white to-transparent z-10" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-8 sm:w-14 bg-gradient-to-l from-white to-transparent z-10" />

              {/* Row 1: Slides Left */}
              <div
                className="animate-marquee-left gap-3"
                style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
              >
                {[...rowOneBrands, ...rowOneBrands].map((brand, idx) =>
                  renderBrandTile(brand, 'row1', idx, false)
                )}
              </div>

              {/* Row 2: Slides Right */}
              <div
                className="animate-marquee-right gap-3"
                style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
              >
                {[...rowTwoBrands, ...rowTwoBrands].map((brand, idx) =>
                  renderBrandTile(brand, 'row2', idx, false)
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export const PartnershipSection = MainDistributorSection;
