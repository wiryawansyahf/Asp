import React, { useState } from 'react';
import { 
  X, 
  Star, 
  MessageCircle, 
  ShoppingBag, 
  ShieldCheck, 
  Truck, 
  CheckCircle, 
  ThumbsUp, 
  Send, 
  Share2,
  Copy,
  Plus,
  Minus
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ProductDetailModal: React.FC = () => {
  const { 
    language, 
    t, 
    selectedProduct, 
    closeProductDetail, 
    addToCart, 
    setIsCheckoutOpen,
    getProductReviews, 
    addReview, 
    likeReview, 
    currentUser, 
    setIsAuthOpen,
    createWhatsAppProductInquiryUrl 
  } = useApp();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'desc' | 'reviews'>('specs');
  const [copiedLink, setCopiedLink] = useState(false);

  // New Review Form State
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [ratingInput, setRatingInput] = useState(5);
  const [nameInput, setNameInput] = useState('');
  const [titleInput, setTitleInput] = useState('');
  const [commentInput, setCommentInput] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  if (!selectedProduct) return null;

  const reviews = getProductReviews(selectedProduct.id);

  const handleAddToCart = () => {
    addToCart(selectedProduct, quantity);
  };

  const handleDirectBuy = () => {
    addToCart(selectedProduct, quantity);
    closeProductDetail();
    setIsCheckoutOpen(true);
  };

  const handleWhatsAppInquiry = () => {
    const url = createWhatsAppProductInquiryUrl(selectedProduct);
    window.open(url, '_blank');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput.trim() || !commentInput.trim()) return;

    addReview({
      productId: selectedProduct.id,
      userName: nameInput.trim(),
      rating: ratingInput,
      title: titleInput.trim() || 'Pengalaman Produk',
      comment: commentInput.trim(),
      isVerifiedPurchase: true
    });

    setReviewSubmitted(true);
    setTimeout(() => {
      setReviewSubmitted(false);
      setShowReviewForm(false);
      setNameInput('');
      setTitleInput('');
      setCommentInput('');
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-4xl max-h-[92vh] rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        
        {/* Top Header */}
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/80 shrink-0">
          <div className="flex items-center gap-2 text-xs">
            <span className="font-semibold text-emerald-700 uppercase tracking-wide">
              {selectedProduct.category}
            </span>
            <span className="text-slate-300">•</span>
            <span className="font-mono text-slate-500">SKU: {selectedProduct.sku}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              title="Salin tautan produk"
              className="p-1.5 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-200 transition"
            >
              {copiedLink ? <Copy className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
            </button>
            <button
              onClick={closeProductDetail}
              className="p-1.5 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-200 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-8 overflow-y-auto space-y-8">
          
          {/* Top Row: Gallery + Buying Details */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Left: Gallery */}
            <div className="md:col-span-6 space-y-3">
              <div className="aspect-4/3 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-inner">
                <img
                  src={selectedProduct.images[activeImageIndex] || selectedProduct.images[0]}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover transition-all duration-300"
                />
              </div>

              {/* Thumbnails */}
              {selectedProduct.images.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {selectedProduct.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition ${
                        activeImageIndex === idx ? 'border-emerald-600 ring-2 ring-emerald-500/30' : 'border-slate-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Key Info & Buying Actions */}
            <div className="md:col-span-6 space-y-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                  {language === 'en' && selectedProduct.nameEn ? selectedProduct.nameEn : selectedProduct.name}
                </h2>
                
                {/* Rating & Reviews counter */}
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center gap-1 text-sm font-bold text-slate-800">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <span>{selectedProduct.rating}</span>
                  </div>
                  <span className="text-xs text-slate-400">({selectedProduct.reviewCount} ulasan)</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-medium">
                    Stok: {selectedProduct.stock} unit
                  </span>
                </div>
              </div>

              {/* Price & Discounts */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="flex items-baseline gap-2.5">
                  <span className="text-2xl sm:text-3xl font-extrabold text-slate-950 font-heading">
                    Rp {selectedProduct.price.toLocaleString('id-ID')}
                  </span>
                  {selectedProduct.originalPrice && (
                    <span className="text-sm text-slate-400 line-through">
                      Rp {selectedProduct.originalPrice.toLocaleString('id-ID')}
                    </span>
                  )}
                  {selectedProduct.discountPercentage && selectedProduct.discountPercentage > 0 && (
                    <span className="text-xs font-bold bg-rose-500 text-white px-2 py-0.5 rounded-full">
                      Hemat {selectedProduct.discountPercentage}%
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-500">
                  Harga sudah termasuk PPN 11% & bergaransi resmi toko.
                </p>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center justify-between pt-1">
                <span className="text-xs font-semibold text-slate-700">Jumlah Pesanan:</span>
                <div className="flex items-center border border-slate-300 rounded-xl overflow-hidden bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 text-slate-600 hover:bg-slate-100 transition"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-4 text-xs font-bold text-slate-900 min-w-8 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(selectedProduct.stock, quantity + 1))}
                    className="p-2 text-slate-600 hover:bg-slate-100 transition"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-2">
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    onClick={handleAddToCart}
                    disabled={selectedProduct.stock <= 0}
                    className="py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition"
                  >
                    <ShoppingBag className="w-4 h-4 text-emerald-400" />
                    <span>+ Ke Keranjang</span>
                  </button>

                  <button
                    onClick={handleDirectBuy}
                    disabled={selectedProduct.stock <= 0}
                    className="py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/20 transition"
                  >
                    <span>Bayar Real-Time</span>
                  </button>
                </div>

                {/* Direct WhatsApp Ordering */}
                <button
                  onClick={handleWhatsAppInquiry}
                  className="w-full py-3 px-4 rounded-xl bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-300 text-emerald-800 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>Pesan / Negosiasi via WhatsApp</span>
                </button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-2 pt-2 text-[11px] text-slate-600 border-t border-slate-100">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>100% Produk Bergaransi Resmi</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Siap Kirim Hari Ini (Reguler / Instant)</span>
                </div>
              </div>

            </div>

          </div>

          {/* Bottom Tabs: Spesifikasi, Deskripsi, Ulasan */}
          <div className="border-t border-slate-200 pt-6">
            
            {/* Tab Nav */}
            <div className="flex border-b border-slate-200 gap-6 text-sm font-bold">
              <button
                onClick={() => setActiveTab('specs')}
                className={`pb-3 relative transition ${
                  activeTab === 'specs' ? 'text-emerald-700' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <span>{t.specificationsTitle}</span>
                {activeTab === 'specs' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600 rounded-full" />
                )}
              </button>

              <button
                onClick={() => setActiveTab('desc')}
                className={`pb-3 relative transition ${
                  activeTab === 'desc' ? 'text-emerald-700' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <span>{t.descriptionTitle}</span>
                {activeTab === 'desc' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600 rounded-full" />
                )}
              </button>

              <button
                onClick={() => setActiveTab('reviews')}
                className={`pb-3 relative transition flex items-center gap-1.5 ${
                  activeTab === 'reviews' ? 'text-emerald-700' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <span>{t.reviewsTitle}</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-semibold">
                  {reviews.length}
                </span>
                {activeTab === 'reviews' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600 rounded-full" />
                )}
              </button>
            </div>

            {/* Tab Contents */}
            <div className="py-6">
              
              {/* TAB 1: SPESIFIKASI */}
              {activeTab === 'specs' && (
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Tabel Spesifikasi Teknis Produk
                  </h4>
                  <div className="border border-slate-200 rounded-2xl overflow-hidden divide-y divide-slate-100 bg-white">
                    {selectedProduct.specifications.map((spec, idx) => (
                      <div 
                        key={idx} 
                        className={`grid grid-cols-1 sm:grid-cols-3 p-3.5 text-xs ${
                          idx % 2 === 0 ? 'bg-slate-50/60' : 'bg-white'
                        }`}
                      >
                        <span className="font-semibold text-slate-700 sm:col-span-1">{spec.label}</span>
                        <span className="text-slate-600 sm:col-span-2 font-medium">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 2: DESKRIPSI */}
              {activeTab === 'desc' && (
                <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-6 rounded-2xl border border-slate-200">
                  <p className="whitespace-pre-line">
                    {language === 'en' && selectedProduct.descriptionEn
                      ? selectedProduct.descriptionEn
                      : selectedProduct.description}
                  </p>
                  <div className="pt-4 border-t border-slate-200 flex flex-wrap gap-1.5">
                    {selectedProduct.tags.map((tag, idx) => (
                      <span key={idx} className="text-xs px-2.5 py-1 bg-white border border-slate-200 text-slate-600 rounded-lg">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: ULASAN PELANGGAN */}
              {activeTab === 'reviews' && (
                <div className="space-y-6">
                  
                  {/* Reviews Header & Button */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-200">
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <span className="text-3xl font-extrabold text-slate-900 block font-heading">
                          {selectedProduct.rating}
                        </span>
                        <div className="flex text-amber-400 justify-center">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star key={s} className="w-3.5 h-3.5 fill-amber-400" />
                          ))}
                        </div>
                        <span className="text-[10px] text-slate-400">dari 5 bintang</span>
                      </div>
                      <div className="border-l border-slate-200 pl-4 space-y-0.5 text-xs text-slate-600">
                        <p className="font-semibold text-slate-800">100% Ulasan Terverifikasi</p>
                        <p className="text-[11px] text-slate-500">Berdasarkan ulasan pelanggan nyata</p>
                      </div>
                    </div>

                    <button
                      onClick={() => setShowReviewForm(!showReviewForm)}
                      className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-xs"
                    >
                      {showReviewForm ? 'Tutup Formulir' : '+ Tulis Ulasan Anda'}
                    </button>
                  </div>

                  {/* Write Review Form */}
                  {showReviewForm && (
                    <form onSubmit={handleReviewSubmit} className="p-5 rounded-2xl bg-white border-2 border-emerald-500/30 space-y-4 animate-in fade-in">
                      <h4 className="font-bold text-sm text-slate-900">Tulis Ulasan Produk Ini</h4>
                      
                      {/* Star Picker */}
                      <div>
                        <label className="text-xs text-slate-600 block mb-1">Pilih Rating:</label>
                        <div className="flex gap-1.5">
                          {[1, 2, 3, 4, 5].map((num) => (
                            <button
                              type="button"
                              key={num}
                              onClick={() => setRatingInput(num)}
                              className="p-1 hover:scale-110 transition"
                            >
                              <Star
                                className={`w-6 h-6 ${
                                  num <= ratingInput ? 'text-amber-400 fill-amber-400' : 'text-slate-300'
                                }`}
                              />
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs text-slate-600 block mb-1">Nama Lengkap:</label>
                          <input
                            type="text"
                            required
                            value={nameInput}
                            onChange={(e) => setNameInput(e.target.value)}
                            placeholder="Contoh: Rian Anggara"
                            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-emerald-500"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-slate-600 block mb-1">Judul Ulasan:</label>
                          <input
                            type="text"
                            value={titleInput}
                            onChange={(e) => setTitleInput(e.target.value)}
                            placeholder="Contoh: Sangat puas dengan kualitasnya!"
                            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-emerald-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-xs text-slate-600 block mb-1">Komentar & Pengalaman:</label>
                        <textarea
                          required
                          rows={3}
                          value={commentInput}
                          onChange={(e) => setCommentInput(e.target.value)}
                          placeholder="Jelaskan kualitas produk, pengiriman, dan pelayanan toko..."
                          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-emerald-500"
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        {reviewSubmitted && (
                          <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                            <CheckCircle className="w-4 h-4" /> Ulasan berhasil dikirim!
                          </span>
                        )}
                        <button
                          type="submit"
                          className="ml-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 transition"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>Kirim Ulasan</span>
                        </button>
                      </div>
                    </form>
                  )}

                  {/* Reviews List */}
                  <div className="space-y-4">
                    {reviews.length === 0 ? (
                      <p className="text-xs text-center text-slate-400 py-6">
                        Belum ada ulasan untuk produk ini. Jadilah yang pertama memberikan ulasan!
                      </p>
                    ) : (
                      reviews.map((rev) => (
                        <div key={rev.id} className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200/80 space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center">
                                {rev.userName.charAt(0)}
                              </div>
                              <div>
                                <span className="font-bold text-xs text-slate-900 block">{rev.userName}</span>
                                <div className="flex items-center gap-1">
                                  <div className="flex text-amber-400">
                                    {[...Array(rev.rating)].map((_, i) => (
                                      <Star key={i} className="w-3 h-3 fill-amber-400" />
                                    ))}
                                  </div>
                                  <span className="text-[10px] text-slate-400 ml-1">{rev.date}</span>
                                </div>
                              </div>
                            </div>

                            {rev.isVerifiedPurchase && (
                              <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full font-semibold">
                                <CheckCircle className="w-3 h-3" />
                                Pembeli Resmi
                              </span>
                            )}
                          </div>

                          <h5 className="text-xs font-bold text-slate-800">{rev.title}</h5>
                          <p className="text-xs text-slate-600 leading-relaxed">{rev.comment}</p>

                          <div className="pt-2 flex items-center justify-end">
                            <button
                              onClick={() => likeReview(rev.id)}
                              className="inline-flex items-center gap-1 text-[11px] text-slate-500 hover:text-emerald-600 transition"
                            >
                              <ThumbsUp className="w-3 h-3" />
                              <span>Membantu ({rev.helpfulCount})</span>
                            </button>
                          </div>
                        </div>
                      ))
                    )}
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
