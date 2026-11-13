import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  MessageCircle, 
  Tag, 
  Check, 
  ShieldCheck 
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CartDrawer: React.FC = () => {
  const { 
    t, 
    cart, 
    isCartOpen, 
    setIsCartOpen, 
    updateCartQuantity, 
    removeFromCart, 
    clearCart, 
    cartTotal, 
    cartItemCount,
    setIsCheckoutOpen,
    createWhatsAppCartOrderUrl 
  } = useApp();

  const [couponCode, setCouponCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [couponMessage, setCouponMessage] = useState('');

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (code === 'DISKONHEMAT') {
      const discount = Math.round(cartTotal * 0.1);
      setDiscountAmount(discount);
      setCouponMessage('Kupon DISKONHEMAT (10%) berhasil diterapkan!');
    } else if (code === 'NUSANTARA50') {
      setDiscountAmount(50000);
      setCouponMessage('Kupon Potongan Rp 50.000 aktif!');
    } else {
      setCouponMessage('Kode kupon tidak valid atau telah kedaluwarsa.');
      setDiscountAmount(0);
    }
  };

  const finalTotal = Math.max(0, cartTotal - discountAmount);

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleWhatsAppOrder = () => {
    const url = createWhatsAppCartOrderUrl();
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity animate-in fade-in"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-slate-200 animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">{t.cartTitle}</h3>
                <span className="text-xs text-slate-500">{cartItemCount} item terpilih</span>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-slate-400 hover:text-slate-700 rounded-lg transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">{t.cartEmpty}</h4>
                  <p className="text-xs text-slate-500 mt-1 max-w-xs">
                    Temukan produk unggulan dan tambahkan ke keranjang untuk melanjutkan pemesanan.
                  </p>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition shadow-xs"
                >
                  {t.continueShopping}
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                  <span className="text-xs font-semibold text-slate-500">Daftar Barang</span>
                  <button
                    onClick={clearCart}
                    className="text-xs text-rose-500 hover:text-rose-700 font-medium"
                  >
                    Kosongkan Semua
                  </button>
                </div>

                <div className="space-y-3">
                  {cart.map((item) => (
                    <div 
                      key={item.product.id}
                      className="flex gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-emerald-300 transition"
                    >
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-18 h-18 rounded-xl object-cover border border-slate-200 bg-white shrink-0"
                      />

                      <div className="flex-1 flex flex-col justify-between min-w-0">
                        <div>
                          <h5 className="font-bold text-xs text-slate-900 truncate">
                            {item.product.name}
                          </h5>
                          <span className="text-[11px] font-mono text-slate-400">
                            SKU: {item.product.sku}
                          </span>
                        </div>

                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs font-bold text-slate-900 font-heading">
                            Rp {(item.product.price * item.quantity).toLocaleString('id-ID')}
                          </span>

                          <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-lg p-0.5">
                            <button
                              onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                              className="p-1 text-slate-500 hover:text-slate-800"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2 text-xs font-semibold text-slate-800">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                              className="p-1 text-slate-500 hover:text-slate-800"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="p-1 text-slate-400 hover:text-rose-500 transition"
                            title="Hapus item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Coupon Input */}
                <form onSubmit={handleApplyCoupon} className="pt-2">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Kupon: DISKONHEMAT"
                        className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-emerald-500 uppercase font-mono"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold"
                    >
                      {t.applyVoucher}
                    </button>
                  </div>
                  {couponMessage && (
                    <p className={`text-[11px] mt-1.5 ${discountAmount > 0 ? 'text-emerald-600 font-semibold' : 'text-rose-500'}`}>
                      {couponMessage}
                    </p>
                  )}
                </form>
              </>
            )}
          </div>

          {/* Footer Summary & Checkout */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-slate-200 bg-slate-50 space-y-3">
              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>{t.subtotal}</span>
                  <span className="font-semibold text-slate-900">
                    Rp {cartTotal.toLocaleString('id-ID')}
                  </span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Diskon Kupon</span>
                    <span>- Rp {discountAmount.toLocaleString('id-ID')}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-bold text-slate-900 pt-2 border-t border-slate-200">
                  <span>{t.total}</span>
                  <span className="text-base text-emerald-700 font-heading">
                    Rp {finalTotal.toLocaleString('id-ID')}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-1">
                <button
                  onClick={handleProceedToCheckout}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition active:scale-[0.98]"
                >
                  <span>{t.checkout}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={handleWhatsAppOrder}
                  className="w-full py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold text-xs flex items-center justify-center gap-2 transition"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>Kirim Pesanan Lengkap ke WhatsApp</span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Transaksi Terenkripsi & Dilindungi Pembayaran Resmi</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
