import React, { useState } from 'react';
import { MessageCircle, Eye, Package } from 'lucide-react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { language, companySettings, openProductDetail, createWhatsAppProductInquiryUrl } =
    useApp();
  const [imgError, setImgError] = useState(false);

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = createWhatsAppProductInquiryUrl(product);
    window.open(url, '_blank');
  };

  const displayName = language === 'en' && product.nameEn ? product.nameEn : product.name;
  const topHighlight = product.featured
    ? language === 'id'
      ? 'Unggulan'
      : 'Featured'
    : product.bestSeller
    ? language === 'id'
      ? 'Diminati'
      : 'Popular'
    : product.isNew
    ? language === 'id'
      ? 'Baru'
      : 'New'
    : null;

  return (
    <div
      onClick={() => openProductDetail(product)}
      className="group bg-white rounded-xl border border-slate-200 hover:border-blue-600/60 overflow-hidden shadow-2xs hover:shadow-lg transition-all duration-200 flex flex-col cursor-pointer"
    >
      {/* Product Image */}
      <div className="relative aspect-4/3 w-full overflow-hidden bg-slate-100 border-b border-slate-100">
        {!imgError && product.images[0] ? (
          <img
            src={product.images[0]}
            alt={displayName}
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-slate-100 text-blue-700 p-4 text-center">
            <Package className="w-8 h-8 mb-1.5 opacity-70" />
            <span className="text-[11px] font-mono font-bold text-slate-600">{product.sku}</span>
          </div>
        )}

        {topHighlight && (
          <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-blue-700 text-white shadow-xs">
            {topHighlight}
          </span>
        )}
      </div>

      {/* Card Body */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          {/* Unboxed Metadata Line */}
          <div className="text-[11px] text-slate-500 flex items-center justify-between gap-2">
            <span className="font-bold text-blue-700 uppercase tracking-wide truncate">
              {product.category}
            </span>
            <span className="font-mono text-slate-400 shrink-0">{product.sku}</span>
          </div>

          {/* Product Name */}
          <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-blue-700 transition-colors line-clamp-2 leading-snug">
            {displayName}
          </h3>

          {/* Key Spec Preview */}
          {product.specifications.length > 0 && (
            <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
              {product.specifications
                .slice(0, 2)
                .map((s) => `${s.label}: ${s.value}`)
                .join(' · ')}
            </p>
          )}
        </div>

        {/* Action Buttons: Specs Details & Direct WhatsApp */}
        <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-100">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              openProductDetail(product);
            }}
            className="py-2 px-2.5 rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-blue-800 text-slate-800 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-blue-700" />
            <span className="truncate">
              {language === 'id' ? companySettings.productDetailBtnText || 'Detail & Spek' : 'Details'}
            </span>
          </button>

          <button
            type="button"
            onClick={handleWhatsAppClick}
            className="py-2 px-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
            title="Info detail produk via WhatsApp"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span className="truncate">
              {language === 'id' ? companySettings.productInfoBtnText || 'Info Detail' : 'Detail Info'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
