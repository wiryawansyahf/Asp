import React, { useState } from 'react';
import {
  MessageCircle,
  CheckCircle2,
  Building2
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const WhatsAppContactSection: React.FC = () => {
  const { language, t, companySettings, formatWhatsAppUrl, products } = useApp();

  const [senderName, setSenderName] = useState('');
  const [senderPhone, setSenderPhone] = useState('');
  const [selectedProductSku, setSelectedProductSku] = useState('umum');
  const [inquiryTopic, setInquiryTopic] = useState('Informasi & Spesifikasi Produk');
  const [message, setMessage] = useState('');
  const [imgError, setImgError] = useState(false);

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName.trim() || !message.trim()) return;

    const chosenProduct = products.find((p) => p.sku === selectedProductSku);
    const productInfo = chosenProduct
      ? `\n• *Produk Terkait:* ${chosenProduct.name} (Part No: ${chosenProduct.sku})`
      : '';

    const compiledText = `Halo Tim *${companySettings.companyName}*,

• *Nama:* ${senderName.trim()}
• *No. WhatsApp:* ${senderPhone.trim() || '-'}
• *Topik:* ${inquiryTopic}${productInfo}

*Pesan:*
"${message.trim()}"

Mohon respon dan informasinya. Terima kasih!`;

    window.open(formatWhatsAppUrl(compiledText), '_blank');
  };

  return (
    <section id="contact-us" className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="max-w-3xl space-y-2.5">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-700">
            <MessageCircle className="w-4 h-4" />
            <span>
              {language === 'id'
                ? companySettings.contactBadge || t.contactBadge
                : t.contactBadge}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            {language === 'id'
              ? companySettings.contactTitle || t.contactTitle
              : t.contactTitle}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {language === 'id'
              ? companySettings.contactSubtitle || t.contactSubtitle
              : t.contactSubtitle}
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Clean Photo Frame */}
          <div className="lg:col-span-5 flex">
            <div className="w-full min-h-[280px] sm:min-h-[360px] rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm flex items-center justify-center">
              {!imgError && (companySettings.contactImage || companySettings.heroImage) ? (
                <img
                  src={companySettings.contactImage || companySettings.heroImage}
                  alt={companySettings.companyName}
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-900 to-slate-900 flex flex-col items-center justify-center p-8 text-white text-center">
                  <Building2 className="w-12 h-12 text-blue-300 mb-3" />
                  <p className="text-base font-bold">{companySettings.companyName}</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Interactive WhatsApp Inquiry Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
            <form onSubmit={handleSendWhatsApp} className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h4 className="font-bold text-sm sm:text-base text-slate-900">
                  {language === 'id'
                    ? companySettings.contactFormTitle ||
                      'Formulir Contact Us — Terhubung ke WhatsApp'
                    : 'Contact Us Form — Direct to WhatsApp'}
                </h4>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-700">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Direct Dispatch</span>
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    {t.yourName} *
                  </label>
                  <input
                    type="text"
                    required
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="Nama Lengkap / Perusahaan"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    {t.yourPhone}
                  </label>
                  <input
                    type="tel"
                    value={senderPhone}
                    onChange={(e) => setSenderPhone(e.target.value)}
                    placeholder="Contoh: 08123456789"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    {t.inquiryTopic}:
                  </label>
                  <select
                    value={inquiryTopic}
                    onChange={(e) => setInquiryTopic(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none focus:border-blue-600"
                  >
                    <option value="Informasi & Spesifikasi Produk">
                      Informasi & Spesifikasi Produk
                    </option>
                    <option value="Our Main Products & Distributor Product">
                      Our Main Products & Distributor Product
                    </option>
                    <option value="Permintaan E-Catalog Divisi">
                      Permintaan E-Catalog Divisi
                    </option>
                    <option value="Konsultasi Pengadaan Industri">
                      Konsultasi Pengadaan Industri
                    </option>
                    <option value="Kunjungan & Layanan Purna Jual">
                      Kunjungan & Layanan Purna Jual
                    </option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    {language === 'id'
                      ? 'Pilih Produk yang Ditanyakan (Opsional):'
                      : 'Select Product (Optional):'}
                  </label>
                  <select
                    value={selectedProductSku}
                    onChange={(e) => setSelectedProductSku(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none focus:border-blue-600"
                  >
                    <option value="umum">-- Pertanyaan Umum --</option>
                    {products.map((p) => (
                      <option key={p.id} value={p.sku}>
                        {p.name} ({p.sku})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  {t.yourMessage} *
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tuliskan part number, spesifikasi yang dicari, jumlah kebutuhan, atau lokasi pengiriman..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none focus:border-blue-600"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>
                  {language === 'id'
                    ? companySettings.contactSubmitBtnText || t.sendWhatsAppBtn
                    : t.sendWhatsAppBtn}
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

// Clean Corporate Floating WhatsApp Launcher (no animate-pulse)
export const FloatingWhatsAppButton: React.FC = () => {
  const { companySettings, formatWhatsAppUrl } = useApp();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="no-print fixed bottom-6 right-6 z-40">
      {isOpen && (
        <div className="mb-3 w-72 bg-white rounded-2xl shadow-2xl border border-slate-200 p-4">
          <div className="flex items-center gap-2.5 pb-2.5 border-b border-slate-100">
            <div className="w-8 h-8 rounded-lg bg-blue-700 text-white flex items-center justify-center font-bold text-xs">
              {companySettings.logoText || 'AI'}
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">{companySettings.companyName}</p>
              <span className="text-[11px] text-blue-700 font-semibold">Sales & Technical Desk</span>
            </div>
          </div>
          <p className="text-xs text-slate-600 my-3 leading-relaxed">
            {companySettings.floatingWaDesc ||
              'Butuh informasi spesifikasi produk atau konsultasi teknis? Chat langsung tim kami via WhatsApp.'}
          </p>
          <a
            href={formatWhatsAppUrl(
              companySettings.whatsappDefaultMessage ||
                `Halo Tim ${companySettings.companyName}, saya ingin bertanya mengenai produk.`
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Mulai Chat WhatsApp</span>
          </a>
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-13 h-13 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center cursor-pointer"
        title="Hubungi Sales via WhatsApp"
        aria-label="WhatsApp Sales"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    </div>
  );
};
