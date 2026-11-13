import React, { useState, useEffect } from 'react';
import { 
  X, 
  CheckCircle2, 
  QrCode, 
  CreditCard, 
  Building, 
  MessageCircle, 
  Truck, 
  ShieldCheck, 
  Copy, 
  Check, 
  Clock, 
  FileText, 
  ArrowRight,
  Loader2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';
import { Order } from '../types';

export const CheckoutPaymentModal: React.FC = () => {
  const { 
    t, 
    cart, 
    cartTotal, 
    clearCart, 
    isCheckoutOpen, 
    setIsCheckoutOpen, 
    createOrder, 
    currentUser, 
    formatWhatsAppUrl 
  } = useApp();

  // Form State
  const [name, setName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [address, setAddress] = useState(currentUser?.address || '');
  const [city, setCity] = useState('Jakarta Selatan');
  const [courier, setCourier] = useState('JNE Regular (1-2 Hari)');
  const [shippingFee, setShippingFee] = useState(20000);
  const [notes, setNotes] = useState('');

  // Payment Method: 'qris' | 'virtual_account' | 'credit_card' | 'whatsapp'
  const [paymentMethod, setPaymentMethod] = useState<'qris' | 'virtual_account' | 'credit_card' | 'whatsapp'>('qris');
  const [selectedBank, setSelectedBank] = useState<'bca' | 'mandiri' | 'bri'>('bca');
  
  // Checkout Steps: 'form' | 'processing' | 'success'
  const [checkoutStep, setCheckoutStep] = useState<'form' | 'processing' | 'success'>('form');
  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);

  // QRIS Countdown timer (15 minutes simulation)
  const [timeLeft, setTimeLeft] = useState(900);
  const [copiedVA, setCopiedVA] = useState(false);

  useEffect(() => {
    if (checkoutStep === 'processing' && paymentMethod === 'qris') {
      const interval = setInterval(() => {
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [checkoutStep, paymentMethod]);

  if (!isCheckoutOpen) return null;

  const totalPayment = cartTotal + shippingFee;

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }
  };

  const handleStartPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !address.trim()) return;

    if (paymentMethod === 'whatsapp') {
      // Direct WhatsApp order
      finalizeOrder('unpaid');
      return;
    }

    // Go to real-time verification processing step
    setCheckoutStep('processing');
  };

  const finalizeOrder = async (payStatus: 'paid' | 'unpaid' = 'paid') => {
    const orderItems = cart.map((c) => ({
      productId: c.product.id,
      productName: c.product.name,
      price: c.product.price,
      quantity: c.quantity,
      image: c.product.images[0]
    }));

    const orderData = {
      customerName: name,
      customerEmail: email || 'customer@example.com',
      customerPhone: phone,
      customerAddress: address,
      customerCity: city,
      customerNotes: notes,
      items: orderItems,
      subtotal: cartTotal,
      shippingFee,
      discount: 0,
      total: totalPayment,
      paymentMethod,
      paymentStatus: payStatus,
      orderStatus: payStatus === 'paid' ? 'processing' as const : 'pending_payment' as const,
      courier,
      trackingNumber: `EXP-${Math.floor(100000000 + Math.random() * 900000000)}`,
      paidAt: payStatus === 'paid' ? new Date().toLocaleTimeString('id-ID') : undefined
    };

    const newOrder = await createOrder(orderData);
    setCreatedOrder(newOrder);
    clearCart();
    setCheckoutStep('success');
    triggerConfetti();
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const vaNumber = selectedBank === 'bca' 
    ? '8277 0812 8899 4432' 
    : selectedBank === 'mandiri' 
    ? '8932 1098 7765 4421' 
    : '8810 0987 6543 2190';

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text.replace(/\s+/g, ''));
    setCopiedVA(true);
    setTimeout(() => setCopiedVA(false), 2000);
  };

  const sendWhatsAppNotification = () => {
    if (!createdOrder) return;
    const text = `Halo Admin, saya telah berhasil melakukan pembayaran pesanan di website Nusantara Catalog:
    
🧾 *No. Pesanan:* ${createdOrder.orderNumber}
👤 *Nama Penerima:* ${createdOrder.customerName}
📞 *WhatsApp:* ${createdOrder.customerPhone}
📍 *Alamat:* ${createdOrder.customerAddress}, ${createdOrder.customerCity}
🚚 *Ekspedisi:* ${createdOrder.courier}
💳 *Metode Pembayaran:* ${createdOrder.paymentMethod.toUpperCase()} (Status: ${createdOrder.paymentStatus.toUpperCase()})
💰 *Total Dibayar:* Rp ${createdOrder.total.toLocaleString('id-ID')}

Mohon segera diproses dan dikirimkan resinya. Terima kasih!`;
    window.open(formatWhatsAppUrl(text), '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white w-full max-w-2xl max-h-[94vh] rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">{t.checkoutModalTitle}</h3>
              <p className="text-xs text-slate-500">Gateway Pembayaran Otomatis & Terverifikasi Real-Time</p>
            </div>
          </div>

          {checkoutStep !== 'processing' && (
            <button
              onClick={() => setIsCheckoutOpen(false)}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg transition"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Body Content by Step */}
        <div className="p-5 sm:p-8 overflow-y-auto flex-1">
          
          {/* STEP 1: FORM */}
          {checkoutStep === 'form' && (
            <form onSubmit={handleStartPayment} className="space-y-6">
              
              {/* Order Items Snapshot */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-slate-700 block">Ringkasan Pesanan ({cart.length} item)</span>
                <div className="max-h-28 overflow-y-auto space-y-1.5 divide-y divide-slate-100 pr-1">
                  {cart.map((c) => (
                    <div key={c.product.id} className="pt-1.5 flex items-center justify-between text-xs">
                      <span className="text-slate-800 truncate max-w-[240px]">
                        {c.product.name} (x{c.quantity})
                      </span>
                      <span className="font-semibold text-slate-900">
                        Rp {(c.product.price * c.quantity).toLocaleString('id-ID')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recipient Details */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  1. Informasi Pengiriman
                </h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-slate-700 block mb-1">
                      {t.fullName} *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Nama Lengkap Penerima"
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-slate-700 block mb-1">
                      {t.phoneNumber} *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Contoh: 08123456789"
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-slate-700 block mb-1">
                      {t.yourEmail}
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="nama@email.com (Untuk Bukti Faktur)"
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-slate-700 block mb-1">
                      {t.city} *
                    </label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Kota / Kabupaten"
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-700 block mb-1">
                    {t.fullAddress} *
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Nama Jalan, Nomor Rumah, RT/RW, Kecamatan, Kodepos..."
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-emerald-500"
                  />
                </div>

                {/* Courier Selection */}
                <div>
                  <label className="text-xs font-medium text-slate-700 block mb-1">
                    {t.selectCourier}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                    {[
                      { name: 'JNE Express (Reguler)', fee: 20000 },
                      { name: 'SiCepat Best (1 Hari)', fee: 28000 },
                      { name: 'GoSend / Grab Instant', fee: 35000 }
                    ].map((c) => (
                      <button
                        type="button"
                        key={c.name}
                        onClick={() => {
                          setCourier(c.name);
                          setShippingFee(c.fee);
                        }}
                        className={`p-2.5 rounded-xl border text-left flex flex-col justify-between transition ${
                          courier === c.name
                            ? 'border-emerald-600 bg-emerald-50/50 text-emerald-950 font-semibold'
                            : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <span className="truncate">{c.name}</span>
                        <span className="text-[11px] text-slate-500 mt-1">
                          Rp {c.fee.toLocaleString('id-ID')}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  2. {t.paymentMethod}
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  
                  {/* QRIS Real-Time */}
                  <label 
                    onClick={() => setPaymentMethod('qris')}
                    className={`p-3.5 rounded-2xl border cursor-pointer flex items-start gap-3 transition ${
                      paymentMethod === 'qris'
                        ? 'border-emerald-600 bg-emerald-50/60 ring-2 ring-emerald-500/20'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="pay"
                      checked={paymentMethod === 'qris'}
                      onChange={() => setPaymentMethod('qris')}
                      className="mt-1 text-emerald-600 focus:ring-emerald-500"
                    />
                    <div>
                      <div className="flex items-center gap-1.5 font-bold text-xs text-slate-900">
                        <QrCode className="w-4 h-4 text-emerald-600" />
                        <span>QRIS Real-Time</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        BCA, Mandiri, GoPay, OVO, ShopeePay (Verifikasi Instan)
                      </p>
                    </div>
                  </label>

                  {/* Virtual Account */}
                  <label 
                    onClick={() => setPaymentMethod('virtual_account')}
                    className={`p-3.5 rounded-2xl border cursor-pointer flex items-start gap-3 transition ${
                      paymentMethod === 'virtual_account'
                        ? 'border-emerald-600 bg-emerald-50/60 ring-2 ring-emerald-500/20'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="pay"
                      checked={paymentMethod === 'virtual_account'}
                      onChange={() => setPaymentMethod('virtual_account')}
                      className="mt-1 text-emerald-600 focus:ring-emerald-500"
                    />
                    <div>
                      <div className="flex items-center gap-1.5 font-bold text-xs text-slate-900">
                        <Building className="w-4 h-4 text-blue-600" />
                        <span>Virtual Account (VA)</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Transfer via ATM & M-Banking 24 Jam
                      </p>
                    </div>
                  </label>

                  {/* Credit Card */}
                  <label 
                    onClick={() => setPaymentMethod('credit_card')}
                    className={`p-3.5 rounded-2xl border cursor-pointer flex items-start gap-3 transition ${
                      paymentMethod === 'credit_card'
                        ? 'border-emerald-600 bg-emerald-50/60 ring-2 ring-emerald-500/20'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="pay"
                      checked={paymentMethod === 'credit_card'}
                      onChange={() => setPaymentMethod('credit_card')}
                      className="mt-1 text-emerald-600 focus:ring-emerald-500"
                    />
                    <div>
                      <div className="flex items-center gap-1.5 font-bold text-xs text-slate-900">
                        <CreditCard className="w-4 h-4 text-indigo-600" />
                        <span>Kartu Kredit / Debit</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Visa, Mastercard, JCB (3D Secure)
                      </p>
                    </div>
                  </label>

                  {/* WhatsApp Manual */}
                  <label 
                    onClick={() => setPaymentMethod('whatsapp')}
                    className={`p-3.5 rounded-2xl border cursor-pointer flex items-start gap-3 transition ${
                      paymentMethod === 'whatsapp'
                        ? 'border-emerald-600 bg-emerald-50/60 ring-2 ring-emerald-500/20'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="pay"
                      checked={paymentMethod === 'whatsapp'}
                      onChange={() => setPaymentMethod('whatsapp')}
                      className="mt-1 text-emerald-600 focus:ring-emerald-500"
                    />
                    <div>
                      <div className="flex items-center gap-1.5 font-bold text-xs text-slate-900">
                        <MessageCircle className="w-4 h-4 text-emerald-600" />
                        <span>Manual via WhatsApp</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Kirim bukti bayar langsung ke WhatsApp CS
                      </p>
                    </div>
                  </label>

                </div>
              </div>

              {/* Total & Submit Button */}
              <div className="pt-4 border-t border-slate-200 space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-semibold text-slate-700">Total Tagihan Pembayaran:</span>
                  <span className="text-xl font-extrabold text-emerald-700 font-heading">
                    Rp {totalPayment.toLocaleString('id-ID')}
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition active:scale-[0.99]"
                >
                  <span>Lanjutkan ke Gateway Pembayaran Real-Time</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </form>
          )}

          {/* STEP 2: PROCESSING & GATEWAY SIMULATOR */}
          {checkoutStep === 'processing' && (
            <div className="space-y-6 text-center animate-in fade-in">
              
              {/* QRIS VIEW */}
              {paymentMethod === 'qris' && (
                <div className="max-w-md mx-auto space-y-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{t.qrisTimerNotice} {formatTimer(timeLeft)}</span>
                  </div>

                  <h4 className="text-base font-bold text-slate-900">
                    Pindai Kode QRIS di Bawah Ini
                  </h4>
                  <p className="text-xs text-slate-500">
                    {t.qrisScanPrompt}
                  </p>

                  {/* QR Code Container */}
                  <div className="relative mx-auto w-56 h-56 bg-white p-3 rounded-2xl border-2 border-slate-300 shadow-md flex flex-col items-center justify-center">
                    <img
                      src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://nusantaracatalog.id/payment/simulate"
                      alt="QRIS Code"
                      className="w-full h-full object-contain"
                    />
                    <div className="absolute inset-0 border-2 border-dashed border-emerald-500/40 rounded-2xl pointer-events-none" />
                  </div>

                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs text-slate-700 flex justify-between items-center">
                    <span>Nominal Otomatis:</span>
                    <span className="font-extrabold text-slate-900 text-sm">
                      Rp {totalPayment.toLocaleString('id-ID')}
                    </span>
                  </div>

                  {/* Simulate Instant Payment Click Button */}
                  <button
                    onClick={() => finalizeOrder('paid')}
                    className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition animate-pulse"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{t.simulateInstantPay}</span>
                  </button>
                  <p className="text-[11px] text-slate-400">
                    Sistem akan memverifikasi status pembayaran secara real-time dan menerbitkan notifikasi ke dashboard admin.
                  </p>
                </div>
              )}

              {/* VIRTUAL ACCOUNT VIEW */}
              {paymentMethod === 'virtual_account' && (
                <div className="max-w-md mx-auto space-y-4 text-left">
                  <div className="flex gap-2">
                    {(['bca', 'mandiri', 'bri'] as const).map((bank) => (
                      <button
                        key={bank}
                        onClick={() => setSelectedBank(bank)}
                        className={`flex-1 py-2 rounded-xl text-xs font-bold uppercase transition border ${
                          selectedBank === bank
                            ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        Bank {bank}
                      </button>
                    ))}
                  </div>

                  <div className="p-5 rounded-2xl bg-blue-50/60 border border-blue-200 space-y-2">
                    <span className="text-xs text-slate-500">Nomor Rekening Virtual Account:</span>
                    <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-blue-200">
                      <span className="font-mono text-base font-bold text-slate-900 tracking-wider">
                        {vaNumber}
                      </span>
                      <button
                        onClick={() => copyToClipboard(vaNumber)}
                        className="px-2.5 py-1 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-lg text-xs font-bold flex items-center gap-1 transition"
                      >
                        {copiedVA ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedVA ? 'Tersalin' : 'Salin'}</span>
                      </button>
                    </div>

                    <div className="flex justify-between text-xs pt-1">
                      <span className="text-slate-600">Total Transfer:</span>
                      <span className="font-bold text-slate-900">Rp {totalPayment.toLocaleString('id-ID')}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => finalizeOrder('paid')}
                    className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Simulasikan Pembayaran Berhasil (Auto Check Real-Time)</span>
                  </button>
                </div>
              )}

              {/* CREDIT CARD VIEW */}
              {paymentMethod === 'credit_card' && (
                <div className="max-w-md mx-auto space-y-4 text-left">
                  <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-4 shadow-xl">
                    <div className="flex justify-between items-center text-xs text-slate-400">
                      <span>Simulasi Kartu Kredit</span>
                      <CreditCard className="w-5 h-5 text-emerald-400" />
                    </div>
                    <p className="font-mono text-lg tracking-widest text-slate-200">
                      4532 •••• •••• 8892
                    </p>
                    <div className="flex justify-between text-xs text-slate-400">
                      <span>{name.toUpperCase() || 'PEMEGANG KARTU'}</span>
                      <span>EXP: 12/28</span>
                    </div>
                  </div>

                  <button
                    onClick={() => finalizeOrder('paid')}
                    className="w-full py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Otorisasi Pembayaran Rp {totalPayment.toLocaleString('id-ID')}</span>
                  </button>
                </div>
              )}

            </div>
          )}

          {/* STEP 3: SUCCESS CONFIRMATION */}
          {checkoutStep === 'success' && createdOrder && (
            <div className="space-y-6 text-center animate-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-1">
                <h4 className="text-xl font-bold text-slate-900">{t.paymentSuccessTitle}</h4>
                <p className="text-xs text-slate-600 max-w-md mx-auto">
                  {t.paymentSuccessDesc}
                </p>
              </div>

              {/* Order Receipt Box */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-3">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <span className="text-xs font-semibold text-slate-500">Nomor Pesanan:</span>
                  <span className="font-mono text-sm font-bold text-emerald-700">
                    {createdOrder.orderNumber}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Nama Pembeli:</span>
                    <span className="font-medium text-slate-800">{createdOrder.customerName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">WhatsApp:</span>
                    <span className="font-medium text-slate-800">{createdOrder.customerPhone}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Ekspedisi:</span>
                    <span className="font-medium text-slate-800">{createdOrder.courier}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Metode Pembayaran:</span>
                    <span className="font-medium text-slate-800 uppercase">{createdOrder.paymentMethod}</span>
                  </div>
                </div>

                <div className="border-t border-slate-200 pt-2 flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-800">Total Pembayaran:</span>
                  <span className="text-base font-extrabold text-slate-950 font-heading">
                    Rp {createdOrder.total.toLocaleString('id-ID')}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5">
                <button
                  onClick={sendWhatsAppNotification}
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 transition"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{t.sendOrderToWA}</span>
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => window.print()}
                    className="py-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Cetak Invoice</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsCheckoutOpen(false);
                      setCheckoutStep('form');
                    }}
                    className="py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition"
                  >
                    Selesai & Tutup
                  </button>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
