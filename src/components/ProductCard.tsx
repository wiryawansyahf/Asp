import React from 'react';
import { 
  Star, 
  MessageCircle, 
  ShoppingBag, 
  Eye, 
  Check, 
  Flame, 
  Sparkles,
  Percent
} from 'lucide-react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { 
    language, 
    t, 
    openProductDetail, 
    addToCart, 
    createWhatsAppProductInquiryUrl 
  } = useApp();

  const [isAddedRecently, setIsAddedRecently] = React.useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
    setIsAddedRecently(true);
    setTimeout(() => setIsAddedRecently(false), 1500);
  };

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = createWhatsAppProductInquiryUrl(product);
    window.open(url, '_blank');
  };

  return (
    <div 
      onClick={() => openProductDetail(product)}
      className="group relative bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-xl hover:border-emerald-500/40 transition-all duration-300 flex flex-col cursor-pointer"
    >
      {/* Product Image & Badges */}
      <div className="relative aspect-4/3 w-full overflow-hidden bg-slate-100">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Badges Container */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10">
          {product.featured && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-white shadow-xs">
              <Sparkles className="w-2.5 h-2.5" />
              Unggulan
            </span>
          )}
          {product.bestSeller && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-600 text-white shadow-xs">
              <Flame className="w-2.5 h-2.5" />
              Terlaris
            </span>
          )}
          {product.isNew && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-600 text-white shadow-xs">
              Baru
            </span>
          )}
        </div>

        {/* Discount Badge */}
        {product.discountPercentage && product.discountPercentage > 0 && (
          <div className="absolute top-2.5 right-2.5 z-10">
            <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[11px] font-black bg-rose-500 text-white shadow-xs">
              <Percent className="w-3 h-3" />
              {product.discountPercentage}%
            </span>
          </div>
        )}

        {/* Quick View Overlay on Desktop Hover */}
        <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              openProductDetail(product);
            }}
            className="px-4 py-2 rounded-xl bg-white/95 text-slate-900 font-semibold text-xs shadow-lg backdrop-blur-xs flex items-center gap-1.5 hover:bg-white hover:scale-105 transition-all"
          >
            <Eye className="w-3.5 h-3.5 text-emerald-600" />
            <span>{t.viewDetails}</span>
          </button>
        </div>
      </div>

      {/* Product Content */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-1.5">
          {/* Category & SKU */}
          <div className="flex items-center justify-between text-[11px] text-slate-500">
            <span className="font-semibold text-emerald-700 uppercase tracking-wider">
              {product.category}
            </span>
            <span className="font-mono text-slate-400">SKU: {product.sku}</span>
          </div>

          {/* Product Name */}
          <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-emerald-700 transition line-clamp-2 leading-snug">
            {language === 'en' && product.nameEn ? product.nameEn : product.name}
          </h3>

          {/* Rating & Stock */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-1 text-xs font-semibold text-slate-800">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span>{product.rating}</span>
              <span className="text-[11px] text-slate-400 font-normal">
                ({product.reviewCount})
              </span>
            </div>

            <div className="text-[11px]">
              {product.stock > 0 ? (
                <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md font-medium">
                  {t.stockLeft} {product.stock}
                </span>
              ) : (
                <span className="text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md font-medium">
                  {t.stockEmpty}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="pt-2 border-t border-slate-100">
          <div className="flex items-baseline gap-2">
            <span className="text-base sm:text-lg font-extrabold text-slate-950 font-heading">
              Rp {product.price.toLocaleString('id-ID')}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs text-slate-400 line-through">
                Rp {product.originalPrice.toLocaleString('id-ID')}
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            disabled={product.stock <= 0}
            className={`py-2 px-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
              isAddedRecently
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
            } ${product.stock <= 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
            title="Tambah ke Keranjang"
          >
            {isAddedRecently ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Ditambahkan</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5 text-emerald-600" />
                <span>+ Keranjang</span>
              </>
            )}
          </button>

          {/* WhatsApp Inquire */}
          <button
            onClick={handleWhatsAppClick}
            className="py-2 px-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition border border-emerald-200/80"
            title="Tanya ketersediaan produk via WhatsApp"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>Tanya WA</span>
          </button>
        </div>
      </div>
    </div>
  );
};
