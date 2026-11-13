import React, { useState } from 'react';
import { 
  MessageCircle, 
  Send, 
  Clock, 
  CheckCircle2, 
  Sparkles, 
  Headphones, 
  ArrowUpRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const WhatsAppContactSection: React.FC = () => {
  const { 
    t, 
    companySettings, 
    formatWhatsAppUrl, 
    products
  } = useApp();

  const [senderName, setSenderName] = useState('');
  const [senderPhone, setSenderPhone] = useState('');
  const [selectedProductSku, setSelectedProductSku] = useState('umum');
  const [inquiryTopic, setInquiryTopic] = useState('Konsultasi Produk & Ketersediaan');
  const [message, setMessage] = useState('');

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName.trim() || !message.trim()) return;

    const chosenProduct = products.find((p) => p.sku === selectedProductSku);
    const productInfo = chosenProduct ? `\n📦 *Produk Terkait:* ${chosenProduct.name} (${chosenProduct.sku})` : '';

    const compiledText = `Halo Tim Customer Care *${companySettings.companyName}*,

Nama: *${senderName.trim()}*
No. WhatsApp: ${senderPhone.trim() || 'Tidak disertakan'}
Topik: *${inquiryTopic}*${productInfo}

*Pesan:*
"${message.trim()}"

Mohon respon dan informasinya. Terima kasih!`;

    const url = formatWhatsAppUrl(compiledText);
    window.open(url, '_blank');
  };

  return (
    <section id="contact-whatsapp" className="py-16 sm:py-24 bg-gradient-to-b from-white to-emerald-50/50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <MessageCircle className="w-3.5 h-3.5" />
            <span>{t.contactBadge}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            {t.contactTitle}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {t.contactSubtitle}
          </p>
        </div>

        {/* Content Box */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Contact Info & Fast Chat Buttons */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/20 rounded-full blur-2xl pointer-events-none" />

              <div className="space-y-2">
                <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider">
                  Live Customer Support
                </span>
                <h3 className="text-xl sm:text-2xl font-bold">
                  Bicara Langsung dengan Tim Konsultan Kami
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Kami mengutamakan jalur komunikasi cepat tanpa chatbot rumit. Pesan Anda langsung diteruskan ke representatif sales kami.
                </p>
              </div>

              {/* Status indicator */}
              <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-slate-800/80 border border-slate-700/80">
                <span className="flex h-3 w-3 rounded-full bg-emerald-400 animate-ping" />
                <div className="text-xs">
                  <span className="font-bold text-slate-200 block">Tim Support Sedang Online</span>
                  <span className="text-slate-400">{t.whatsappFastResponse}</span>
                </div>
              </div>

              {/* Official WhatsApp number display */}
              <div className="space-y-1">
                <span className="text-xs text-slate-400 block">Nomor WhatsApp Resmi:</span>
                <p className="font-mono text-lg font-bold text-emerald-300">
                  +{companySettings.whatsappNumber}
                </p>
                <p className="text-xs text-slate-400">
                  Email: {companySettings.email}
                </p>
              </div>

              {/* Preset 1-Click WhatsApp Quick Questions */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <span className="text-xs font-bold text-slate-400 block">Pertanyaan Cepat 1-Klik:</span>
                <div className="space-y-1.5">
                  {[
                    'Apakah ada promo diskon spesial minggu ini?',
                    'Bisa minta katalog harga grosir / corporate B2B?',
                    'Bagaimana klaim garansi produk jika ada kendala?'
                  ].map((quickText, idx) => (
                    <a
                      key={idx}
                      href={formatWhatsAppUrl(`Halo Admin, ${quickText}`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full text-left p-2.5 rounded-xl bg-slate-800 hover:bg-emerald-950/80 text-xs text-slate-200 hover:text-emerald-300 border border-slate-700/60 transition flex items-center justify-between"
                    >
                      <span className="truncate">{quickText}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    </a>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Interactive WhatsApp Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md">
            <form onSubmit={handleSendWhatsApp} className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <h4 className="font-bold text-sm sm:text-base text-slate-900">
                  Formulir Kirim Pesan Otomatis ke WhatsApp
                </h4>
                <div className="flex items-center gap-1 text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Terintegrasi Langsung</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-slate-700 block mb-1">
                    {t.yourName} *
                  </label>
                  <input
                    type="text"
                    required
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="Nama Lengkap Anda"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-700 block mb-1">
                    {t.yourPhone}
                  </label>
                  <input
                    type="tel"
                    value={senderPhone}
                    onChange={(e) => setSenderPhone(e.target.value)}
                    placeholder="Contoh: 08123456789"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-slate-700 block mb-1">
                    Topik Pertanyaan:
                  </label>
                  <select
                    value={inquiryTopic}
                    onChange={(e) => setInquiryTopic(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-emerald-500"
                  >
                    <option value="Konsultasi Produk & Ketersediaan">Konsultasi Produk & Ketersediaan</option>
                    <option value="Pemesanan Partai Besar / Grosir">Pemesanan Partai Besar / Grosir</option>
                    <option value="Pertanyaan Spesifikasi Teknis">Pertanyaan Spesifikasi Teknis</option>
                    <option value="Status Pengiriman Pesanan">Status Pengiriman Pesanan</option>
                    <option value="Kerjasama Bisnis / Reseller">Kerjasama Bisnis / Reseller</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-700 block mb-1">
                    Pilih Produk Tertentu (Opsional):
                  </label>
                  <select
                    value={selectedProductSku}
                    onChange={(e) => setSelectedProductSku(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-emerald-500"
                  >
                    <option value="umum">-- Pertanyaan Umum --</option>
                    {products.map((p) => (
                      <option key={p.id} value={p.sku}>
                        {p.name} (SKU: {p.sku})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-700 block mb-1">
                  {t.yourMessage} *
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tuliskan pertanyaan detail, jumlah pesanan yang diinginkan, atau alamat tujuan pengiriman..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-emerald-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition active:scale-[0.98]"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{t.sendWhatsAppBtn}</span>
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
};

// Floating WhatsApp Fast Launcher Button for Desktop & Mobile
export const FloatingWhatsAppButton: React.FC = () => {
  const { companySettings, formatWhatsAppUrl } = useApp();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {isOpen && (
        <div className="mb-3 w-72 bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 animate-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
            <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
              WA
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">{companySettings.companyName}</p>
              <span className="text-[10px] text-emerald-600 flex items-center gap-1 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Online
              </span>
            </div>
          </div>
          <p className="text-xs text-slate-600 my-3">
            Halo! Ada yang bisa kami bantu seputar produk atau pemesanan hari ini?
          </p>
          <a
            href={formatWhatsAppUrl('Halo Admin, saya ingin konsultasi produk.')}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Mulai Chat Sekarang</span>
          </a>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow-xl shadow-emerald-600/40 hover:scale-110 active:scale-95 transition-all flex items-center justify-center"
        title="Hubungi WhatsApp Kami"
      >
        <MessageCircle className="w-7 h-7" />
      </button>
    </div>
  );
};
