import React from 'react';
import { 
  Sparkles, 
  MessageCircle, 
  ArrowRight, 
  ShieldCheck, 
  Truck, 
  QrCode, 
  Star, 
  Award,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const HeroSection: React.FC = () => {
  const { 
    language, 
    t, 
    companySettings, 
    formatWhatsAppUrl, 
    products, 
    openProductDetail,
    setSelectedCategory 
  } = useApp();

  const featuredProduct = products.find((p) => p.featured) || products[0];

  const handleWhatsAppHero = () => {
    const text = `Halo Tim Official *${companySettings.companyName}*, saya ingin bertanya seputar katalog produk unggulan dan penawaran terbaik hari ini.`;
    window.open(formatWhatsAppUrl(text), '_blank');
  };

  const categories = [
    'Semua Kategori',
    'Elektronik & Gadget',
    'Home & Living',
    'Kopi & F&B Nusantara',
    'Fashion & Apparel',
    'Aksesoris'
  ];

  return (
    <section id="hero" className="relative overflow-hidden bg-gradient-to-b from-emerald-950 via-slate-900 to-slate-950 text-white pt-10 pb-16 lg:pt-16 lg:pb-24">
      {/* Decorative ambient background glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headlines & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold backdrop-blur-xs">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t.heroBadge}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              {t.heroTitlePrefix}{' '}
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-300 bg-clip-text text-transparent">
                {t.heroTitleHighlight}
              </span>
            </h1>

            {/* Tagline / Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              {language === 'id' ? companySettings.tagline : companySettings.taglineEn}. {t.heroDescription}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#catalog"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold text-sm sm:text-base shadow-lg shadow-emerald-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>{t.heroCtaCatalog}</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={handleWhatsAppHero}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-300 font-semibold text-sm sm:text-base transition-all hover:border-emerald-400"
              >
                <MessageCircle className="w-5 h-5 text-emerald-400 fill-emerald-400/20" />
                <span>{t.heroCtaWhatsApp}</span>
              </button>
            </div>

            {/* Quick Category Quick-Filter Tags */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-2">
              <span className="text-xs text-slate-400 font-medium mr-1">Kategori:</span>
              {categories.map((cat, idx) => (
                <a
                  key={idx}
                  href="#catalog"
                  onClick={() => setSelectedCategory(cat === 'Semua Kategori' ? 'All' : cat)}
                  className="text-xs px-3 py-1 rounded-full bg-slate-800/80 hover:bg-emerald-900/60 hover:text-emerald-300 text-slate-300 border border-slate-700/60 transition"
                >
                  {cat}
                </a>
              ))}
            </div>

            {/* Key Trust Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-800/80">
              <div className="flex items-center gap-2.5 text-left">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-slate-200">Garansi Resmi</h4>
                  <p className="text-[11px] text-slate-400">Ganti Baru 100%</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5 text-left">
                <Truck className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-slate-200">Seluruh RI</h4>
                  <p className="text-[11px] text-slate-400">Gratis Ongkir Promo</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5 text-left">
                <QrCode className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-slate-200">QRIS Real-Time</h4>
                  <p className="text-[11px] text-slate-400">Verifikasi Otomatis</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5 text-left">
                <MessageCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-slate-200">WhatsApp 24/7</h4>
                  <p className="text-[11px] text-slate-400">Respon Hitungan Menit</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Featured Product Card Preview */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md bg-gradient-to-br from-slate-800/90 to-slate-900/95 border border-slate-700/80 rounded-3xl p-5 shadow-2xl backdrop-blur-xl group hover:border-emerald-500/50 transition-all duration-300">
              
              {/* Top highlight bar */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-700/60">
                <div className="flex items-center gap-2">
                  <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                    Produk Paling Direkomendasikan
                  </span>
                </div>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-bold border border-rose-500/30">
                  Hemat {featuredProduct.discountPercentage}%
                </span>
              </div>

              {/* Product Image with Hover Zoom */}
              <div 
                onClick={() => openProductDetail(featuredProduct)}
                className="relative mt-4 aspect-4/3 rounded-2xl overflow-hidden cursor-pointer bg-slate-950"
              >
                <img
                  src={featuredProduct.images[0]}
                  alt={featuredProduct.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                  <div className="flex items-center gap-1 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-semibold">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span>{featuredProduct.rating}</span>
                    <span className="text-slate-400">({featuredProduct.reviewCount})</span>
                  </div>
                  <span className="text-xs font-medium text-emerald-300 bg-emerald-950/80 border border-emerald-500/30 px-2.5 py-1 rounded-full">
                    Stok: {featuredProduct.stock} unit
                  </span>
                </div>
              </div>

              {/* Product Info */}
              <div className="mt-4 space-y-2">
                <p className="text-xs text-emerald-400 font-semibold tracking-wide uppercase">
                  {featuredProduct.category}
                </p>
                <h3 
                  onClick={() => openProductDetail(featuredProduct)}
                  className="text-lg font-bold text-white hover:text-emerald-300 cursor-pointer transition line-clamp-1"
                >
                  {featuredProduct.name}
                </h3>
                <p className="text-xs text-slate-300 line-clamp-2">
                  {featuredProduct.description}
                </p>

                {/* Price display */}
                <div className="flex items-baseline gap-2 pt-1">
                  <span className="text-xl font-extrabold text-white">
                    Rp {featuredProduct.price.toLocaleString('id-ID')}
                  </span>
                  {featuredProduct.originalPrice && (
                    <span className="text-xs text-slate-400 line-through">
                      Rp {featuredProduct.originalPrice.toLocaleString('id-ID')}
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons for Featured Card */}
              <div className="grid grid-cols-2 gap-2.5 pt-4 mt-2 border-t border-slate-700/60">
                <button
                  onClick={() => openProductDetail(featuredProduct)}
                  className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-600 transition"
                >
                  {t.viewDetails}
                </button>
                <a
                  href={formatWhatsAppUrl(`Halo Admin, saya tertarik dengan produk unggulan *${featuredProduct.name}* (SKU: ${featuredProduct.sku}). Apakah masih ada stok dan promo?`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/30 transition"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Tanya WhatsApp</span>
                </a>
              </div>

              {/* Floating Verified Badge */}
              <div className="absolute -bottom-4 -left-4 bg-white text-slate-900 rounded-2xl p-3 shadow-xl flex items-center gap-3 border border-slate-200">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-1 text-xs font-bold">
                    <span>Terverifikasi SNI & ISO</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  </div>
                  <p className="text-[10px] text-slate-500">100% Produk Original Bergaransi</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
