import React, { useState } from 'react';
import {
  BookOpen,
  FileText,
  MessageCircle,
  Printer,
  X,
  CheckCircle2,
  ArrowRight,
  Layers,
  Download,
  Loader2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ECatalogItem } from '../types';
import { downloadCatalogPdf } from '../utils/pdfDownload';

export const ECatalogSection: React.FC = () => {
  const {
    language,
    t,
    eCatalogs,
    selectedECatalog,
    setSelectedECatalog,
    products,
    openProductDetail,
    setSelectedCategory,
    companySettings,
    formatWhatsAppUrl
  } = useApp();

  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const markImgError = (id: string) => {
    setImgErrors((prev) => ({ ...prev, [id]: true }));
  };

  const handleDownloadCatalog = async (catalog: ECatalogItem) => {
    if (downloadingId) return;
    setDownloadingId(catalog.id);
    try {
      const matchingProducts = products.filter(
        (p) => p.category.toLowerCase() === catalog.category.toLowerCase()
      );
      await downloadCatalogPdf(catalog, matchingProducts, companySettings);
    } finally {
      setDownloadingId(null);
    }
  };

  const catalogProducts = selectedECatalog
    ? products.filter(
        (p) => p.category.toLowerCase() === selectedECatalog.category.toLowerCase()
      )
    : [];

  return (
    <section id="ecatalog" className="py-16 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="max-w-3xl space-y-2.5">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-700">
              <BookOpen className="w-4 h-4" />
              <span>
                {language === 'id'
                  ? companySettings.ecatalogBadge || t.ecatalogBadge
                  : t.ecatalogBadge}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              {language === 'id'
                ? companySettings.ecatalogTitle || t.ecatalogTitle
                : t.ecatalogTitle}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {language === 'id'
                ? companySettings.ecatalogSubtitle || t.ecatalogSubtitle
                : t.ecatalogSubtitle}
            </p>
          </div>

          <a
            href={formatWhatsAppUrl(
              `Halo Tim *${companySettings.companyName}*, saya ingin meminta paket E-Catalog lengkap semua divisi produk PT Asiaparts Indotech.`
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-800 text-xs font-bold transition-colors self-start md:self-auto"
          >
            <MessageCircle className="w-4 h-4 text-emerald-600" />
            <span>
              {language === 'id'
                ? companySettings.ecatalogRequestAllText || 'Minta Semua E-Catalog via WhatsApp'
                : 'Request All E-Catalogs via WA'}
            </span>
          </a>
        </div>

        {/* E-Catalog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {eCatalogs.map((cat) => {
            const title = language === 'en' ? cat.titleEn : cat.title;
            const desc = language === 'en' ? cat.descriptionEn : cat.description;
            const matchingCount = products.filter(
              (p) => p.category.toLowerCase() === cat.category.toLowerCase()
            ).length;

            return (
              <div
                key={cat.id}
                className="bg-white rounded-xl border border-slate-200 hover:border-blue-600/60 overflow-hidden shadow-2xs hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Cover Thumbnail */}
                  <div className="relative aspect-4/3 bg-slate-900 overflow-hidden border-b border-slate-200">
                    {!imgErrors[cat.id] && cat.coverImage ? (
                      <img
                        src={cat.coverImage}
                        alt={title}
                        referrerPolicy="no-referrer"
                        onError={() => markImgError(cat.id)}
                        className="w-full h-full object-cover opacity-85"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-800 to-slate-900 flex items-center justify-center text-white">
                        <BookOpen className="w-10 h-10 text-blue-300" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/25 to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-md bg-blue-700 text-white text-[10px] font-mono font-bold tracking-wide">
                        {cat.code}
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <span className="text-[11px] text-blue-200 font-semibold block">
                        {cat.edition} · {cat.pageCount} {language === 'id' ? 'Halaman' : 'Pages'}
                      </span>
                    </div>
                  </div>

                  {/* Catalog Body */}
                  <div className="p-5 space-y-3">
                    <div className="text-[11px] font-bold text-blue-700 uppercase tracking-wide flex items-center justify-between">
                      <span>{cat.category}</span>
                      <span className="text-slate-400 font-normal">
                        {matchingCount} {language === 'id' ? 'Item' : 'Items'}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 leading-snug">{title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">{desc}</p>

                    <ul className="space-y-1.5 pt-2 border-t border-slate-100">
                      {cat.highlights.slice(0, 3).map((hl, idx) => (
                        <li key={idx} className="flex items-start gap-1.5 text-[11px] text-slate-600">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-700 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{hl}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Catalog Actions */}
                <div className="p-4 pt-0 space-y-2">
                  <button
                    type="button"
                    onClick={() => setSelectedECatalog(cat)}
                    className="w-full py-2.5 px-3 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>
                      {language === 'id'
                        ? companySettings.ecatalogOpenBtnText || 'Buka E-Catalog'
                        : 'Open E-Catalog'}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDownloadCatalog(cat)}
                    disabled={downloadingId === cat.id}
                    className="w-full py-2 px-3 rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-blue-800 text-slate-800 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer disabled:opacity-60"
                  >
                    {downloadingId === cat.id ? (
                      <Loader2 className="w-3.5 h-3.5 text-blue-700 animate-spin" />
                    ) : (
                      <Download className="w-3.5 h-3.5 text-blue-700" />
                    )}
                    <span>
                      {downloadingId === cat.id
                        ? language === 'id'
                          ? 'Mengunduh PDF...'
                          : 'Downloading...'
                        : companySettings.ecatalogDownloadBtnText || 'Download File'}
                    </span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive E-Catalog Viewer Modal */}
      {selectedECatalog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-xs">
          <div className="bg-white w-full max-w-4xl max-h-[92vh] rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
            {/* Header */}
            <div className="p-5 sm:p-6 bg-gradient-to-r from-blue-900 to-slate-900 text-white flex items-center justify-between gap-4 shrink-0">
              <div>
                <div className="flex flex-wrap items-center gap-2 text-xs text-blue-200 font-mono">
                  <span>{selectedECatalog.code}</span>
                  <span>·</span>
                  <span>{selectedECatalog.edition}</span>
                  <span>·</span>
                  <span>{selectedECatalog.pageCount} Hal.</span>
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold mt-1">
                  {language === 'en' ? selectedECatalog.titleEn : selectedECatalog.title}
                </h3>
              </div>

              <div className="flex items-center gap-2 no-print">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">
                    {language === 'id' ? 'Cetak / Simpan PDF' : 'Print / Save PDF'}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedECatalog(null)}
                  className="p-2 rounded-lg hover:bg-white/10 text-blue-100 hover:text-white transition cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="p-5 sm:p-7 overflow-y-auto space-y-6">
              <div className="bg-blue-50/70 border border-blue-100 rounded-xl p-4 space-y-3">
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {language === 'en'
                    ? selectedECatalog.descriptionEn
                    : selectedECatalog.description}
                </p>
                <div className="flex flex-wrap gap-3 pt-1">
                  {selectedECatalog.highlights.map((item, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-900 bg-white px-3 py-1 rounded-lg border border-blue-200"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-700" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Products included in this catalog */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-blue-700" />
                    <span>
                      {language === 'id'
                        ? `Daftar Produk Divisi ${selectedECatalog.category}`
                        : `${selectedECatalog.category} Catalog Lineup`}
                    </span>
                  </h4>
                  <a
                    href="#catalog"
                    onClick={() => {
                      setSelectedCategory(selectedECatalog.category);
                      setSelectedECatalog(null);
                    }}
                    className="no-print text-xs font-bold text-blue-700 hover:underline inline-flex items-center gap-1"
                  >
                    <span>
                      {language === 'id' ? 'Filter di Display Produk' : 'Filter in Showcase'}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>

                {catalogProducts.length === 0 ? (
                  <p className="text-xs text-slate-500 p-4 bg-slate-50 rounded-xl border border-slate-200">
                    {language === 'id'
                      ? 'Hubungi tim sales kami via WhatsApp untuk mendapatkan daftar item terbaru pada edisi katalog ini.'
                      : 'Contact our sales team via WhatsApp for the latest part list in this catalog edition.'}
                  </p>
                ) : (
                  <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-200">
                    {catalogProducts.map((prod) => (
                      <div
                        key={prod.id}
                        className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white hover:bg-slate-50 transition-colors"
                      >
                        <div className="space-y-1 flex-1">
                          <div className="flex items-center gap-2 text-[11px] font-mono text-blue-700 font-bold">
                            <span>{prod.sku}</span>
                            <span className="text-slate-300">·</span>
                            <span className="text-slate-500">{prod.category}</span>
                          </div>
                          <h5 className="text-sm font-bold text-slate-900">
                            {language === 'en' && prod.nameEn ? prod.nameEn : prod.name}
                          </h5>
                          <p className="text-xs text-slate-500 line-clamp-2">
                            {prod.specifications
                              .slice(0, 3)
                              .map((s) => `${s.label}: ${s.value}`)
                              .join(' · ')}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 shrink-0 no-print">
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedECatalog(null);
                              openProductDetail(prod);
                            }}
                            className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-blue-50 text-slate-800 hover:text-blue-800 text-xs font-bold cursor-pointer"
                          >
                            {language === 'id' ? 'Spesifikasi' : 'Specs'}
                          </button>
                          <a
                            href={formatWhatsAppUrl(
                              `Halo Tim *${companySettings.companyName}*, saya melihat E-Catalog *${selectedECatalog.code}* dan ingin bertanya tentang *${prod.name}* (SKU: ${prod.sku}).`
                            )}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold inline-flex items-center gap-1"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>Tanya WA</span>
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="no-print p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
              <span className="text-xs text-slate-500">
                {companySettings.companyName} · {selectedECatalog.code}
              </span>
              <button
                type="button"
                onClick={() => handleDownloadCatalog(selectedECatalog)}
                disabled={downloadingId === selectedECatalog.id}
                className="px-4 py-2 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer disabled:opacity-60"
              >
                {downloadingId === selectedECatalog.id ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Download className="w-4 h-4" />
                )}
                <span>Download File (PDF)</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
