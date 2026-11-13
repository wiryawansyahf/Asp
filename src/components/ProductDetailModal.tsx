import React, { useState, useEffect } from 'react';
import {
  X,
  MessageCircle,
  ShieldCheck,
  Share2,
  Copy,
  Package
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ProductDetailModal: React.FC = () => {
  const {
    language,
    t,
    selectedProduct,
    closeProductDetail,
    createWhatsAppProductInquiryUrl
  } = useApp();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [imgError, setImgError] = useState(false);
  const [activeTab, setActiveTab] = useState<'specs' | 'desc'>('specs');
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    setActiveImageIndex(0);
    setImgError(false);
    setActiveTab('specs');
  }, [selectedProduct?.id]);

  if (!selectedProduct) return null;

  const displayName =
    language === 'en' && selectedProduct.nameEn ? selectedProduct.nameEn : selectedProduct.name;

  const handleWhatsAppAction = () => {
    const url = createWhatsAppProductInquiryUrl(selectedProduct);
    window.open(url, '_blank');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-xs">
      <div className="bg-white w-full max-w-4xl max-h-[92vh] rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        {/* Top Header */}
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50 shrink-0">
          <div className="flex items-center gap-2 text-xs">
            <span className="font-bold text-blue-700 uppercase tracking-wide">
              {selectedProduct.category}
            </span>
            <span className="text-slate-300">·</span>
            <span className="font-mono text-slate-600 font-semibold">
              {t.skuLabel}: {selectedProduct.sku}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleShare}
              title="Salin tautan produk"
              className="p-1.5 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-200 transition cursor-pointer"
            >
              {copiedLink ? <Copy className="w-4 h-4 text-blue-700" /> : <Share2 className="w-4 h-4" />}
            </button>
            <button
              type="button"
              onClick={closeProductDetail}
              className="p-1.5 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-200 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="p-5 sm:p-8 overflow-y-auto space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Left Gallery */}
            <div className="md:col-span-6 space-y-3">
              <div className="aspect-4/3 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                {!imgError && (selectedProduct.images[activeImageIndex] || selectedProduct.images[0]) ? (
                  <img
                    src={selectedProduct.images[activeImageIndex] || selectedProduct.images[0]}
                    alt={displayName}
                    referrerPolicy="no-referrer"
                    onError={() => setImgError(true)}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-blue-50 text-blue-700">
                    <Package className="w-12 h-12 mb-2 opacity-70" />
                    <span className="font-mono text-xs font-bold">{selectedProduct.sku}</span>
                  </div>
                )}
              </div>

              {selectedProduct.images.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {selectedProduct.images.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setImgError(false);
                        setActiveImageIndex(idx);
                      }}
                      className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition cursor-pointer ${
                        activeImageIndex === idx
                          ? 'border-blue-700 ring-2 ring-blue-600/20'
                          : 'border-slate-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`Thumbnail ${idx + 1}`}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right Key Details & Single WhatsApp CTA */}
            <div className="md:col-span-6 space-y-5">
              <div className="space-y-2">
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug">
                  {displayName}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {language === 'en' && selectedProduct.descriptionEn
                    ? selectedProduct.descriptionEn
                    : selectedProduct.description}
                </p>
              </div>

              {/* Direct WhatsApp Inquiry / Purchase Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleWhatsAppAction}
                  className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>
                    {language === 'id'
                      ? 'Hubungi / Beli Produk via WhatsApp'
                      : 'Contact / Order via WhatsApp'}
                  </span>
                </button>
              </div>

              {/* Assurance */}
              <div className="pt-3 text-xs text-slate-600 border-t border-slate-100 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-700 shrink-0" />
                <span>
                  {language === 'id'
                    ? 'Unit Teruji & Garansi Resmi PT Asiaparts Indotech'
                    : 'Verified Quality & Official PT Asiaparts Indotech Warranty'}
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Tabs: Specifications & Product Overview */}
          <div className="border-t border-slate-200 pt-6">
            <div className="flex border-b border-slate-200 gap-6 text-sm font-bold">
              <button
                type="button"
                onClick={() => setActiveTab('specs')}
                className={`pb-3 relative transition cursor-pointer ${
                  activeTab === 'specs' ? 'text-blue-700' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <span>{t.specificationsTitle}</span>
                {activeTab === 'specs' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-700 rounded-full" />
                )}
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('desc')}
                className={`pb-3 relative transition cursor-pointer ${
                  activeTab === 'desc' ? 'text-blue-700' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <span>{t.descriptionTitle}</span>
                {activeTab === 'desc' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-700 rounded-full" />
                )}
              </button>
            </div>

            <div className="py-6">
              {activeTab === 'specs' && (
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      {language === 'id'
                        ? 'Spesifikasi Teknis & Detail Komponen'
                        : 'Technical Specifications & Component Details'}
                    </h4>
                    <button
                      type="button"
                      onClick={handleWhatsAppAction}
                      className="text-xs font-bold text-blue-700 hover:underline inline-flex items-center gap-1 cursor-pointer"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>
                        {language === 'id'
                          ? 'Konsultasi Spesifikasi via WhatsApp'
                          : 'Discuss Specs on WhatsApp'}
                      </span>
                    </button>
                  </div>

                  <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100 bg-white">
                    {selectedProduct.specifications.map((spec, idx) => (
                      <div
                        key={idx}
                        className={`grid grid-cols-1 sm:grid-cols-3 p-3.5 text-xs ${
                          idx % 2 === 0 ? 'bg-slate-50/70' : 'bg-white'
                        }`}
                      >
                        <span className="font-bold text-slate-700 sm:col-span-1">{spec.label}</span>
                        <span className="text-slate-700 sm:col-span-2 font-medium">
                          {spec.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'desc' && (
                <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-6 rounded-xl border border-slate-200">
                  <p className="whitespace-pre-line">
                    {language === 'en' && selectedProduct.descriptionEn
                      ? selectedProduct.descriptionEn
                      : selectedProduct.description}
                  </p>
                  <div className="pt-4 border-t border-slate-200 flex flex-wrap gap-1.5">
                    {selectedProduct.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2.5 py-1 bg-white border border-slate-200 text-slate-600 rounded-md"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
