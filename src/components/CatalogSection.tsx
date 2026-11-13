import React, { useMemo } from 'react';
import { 
  SlidersHorizontal, 
  Search, 
  Sparkles, 
  Flame, 
  Percent, 
  Clock, 
  Layers,
  ArrowUpDown
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProductCard } from './ProductCard';

export const CatalogSection: React.FC = () => {
  const { 
    t, 
    products, 
    selectedCategory, 
    setSelectedCategory, 
    searchQuery, 
    setSearchQuery, 
    badgeFilter, 
    setBadgeFilter, 
    sortBy, 
    setSortBy
  } = useApp();

  // Extract unique categories from products
  const categories = useMemo(() => {
    const list = Array.from(new Set(products.map((p) => p.category)));
    return ['All', ...list];
  }, [products]);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category Filter
        if (selectedCategory !== 'All' && p.category !== selectedCategory) {
          return false;
        }
        // Badge Filter
        if (badgeFilter === 'featured' && !p.featured) return false;
        if (badgeFilter === 'bestseller' && !p.bestSeller) return false;
        if (badgeFilter === 'promo' && (!p.discountPercentage || p.discountPercentage <= 0)) return false;
        if (badgeFilter === 'new' && !p.isNew) return false;

        // Search Query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = p.name.toLowerCase().includes(q) || (p.nameEn && p.nameEn.toLowerCase().includes(q));
          const matchSku = p.sku.toLowerCase().includes(q);
          const matchCat = p.category.toLowerCase().includes(q);
          const matchDesc = p.description.toLowerCase().includes(q);
          const matchSpecs = p.specifications.some(
            (s) => s.label.toLowerCase().includes(q) || s.value.toLowerCase().includes(q)
          );
          return matchName || matchSku || matchCat || matchDesc || matchSpecs;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price_low') return a.price - b.price;
        if (sortBy === 'price_high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        // Default: popular (by reviewCount & rating)
        return b.reviewCount * b.rating - a.reviewCount * a.rating;
      });
  }, [products, selectedCategory, badgeFilter, searchQuery, sortBy]);

  return (
    <section id="catalog" className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold tracking-wider uppercase mb-2">
              <Layers className="w-3.5 h-3.5" />
              <span>{t.catalogBadge}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              {t.catalogTitle}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-1 max-w-2xl">
              {t.catalogSubtitle}
            </p>
          </div>

          {/* Quick Item Counter */}
          <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
            <div className="text-xs font-semibold text-slate-500 bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-xs">
              Menampilkan <span className="text-emerald-700 font-bold">{filteredProducts.length}</span> dari {products.length} Produk
            </div>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="space-y-4 bg-white p-4 sm:p-6 rounded-3xl border border-slate-200 shadow-xs">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs sm:text-sm font-semibold">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              const count = cat === 'All' 
                ? products.length 
                : products.filter((p) => p.category === cat).length;

              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl whitespace-nowrap transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  <span>{cat === 'All' ? t.categoryAll : cat}</span>
                  <span className={`text-[11px] px-1.5 py-0.2 rounded-full ${
                    isSelected ? 'bg-emerald-800 text-emerald-100' : 'bg-slate-200 text-slate-600'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Secondary Filter & Search Row */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4 pt-2 border-t border-slate-100">
            
            {/* Badges Quick Filter */}
            <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
              <span className="text-xs font-semibold text-slate-400 mr-1 hidden sm:inline">
                Koleksi:
              </span>
              <button
                onClick={() => setBadgeFilter('all')}
                className={`text-xs px-3 py-1.5 rounded-lg font-medium transition ${
                  badgeFilter === 'all'
                    ? 'bg-slate-900 text-white font-semibold'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                }`}
              >
                {t.filterAll}
              </button>
              <button
                onClick={() => setBadgeFilter('featured')}
                className={`text-xs px-3 py-1.5 rounded-lg font-medium flex items-center gap-1 transition ${
                  badgeFilter === 'featured'
                    ? 'bg-amber-500 text-white font-semibold'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t.filterFeatured}</span>
              </button>
              <button
                onClick={() => setBadgeFilter('bestseller')}
                className={`text-xs px-3 py-1.5 rounded-lg font-medium flex items-center gap-1 transition ${
                  badgeFilter === 'bestseller'
                    ? 'bg-rose-600 text-white font-semibold'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                }`}
              >
                <Flame className="w-3.5 h-3.5" />
                <span>{t.filterBestSeller}</span>
              </button>
              <button
                onClick={() => setBadgeFilter('promo')}
                className={`text-xs px-3 py-1.5 rounded-lg font-medium flex items-center gap-1 transition ${
                  badgeFilter === 'promo'
                    ? 'bg-teal-600 text-white font-semibold'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                }`}
              >
                <Percent className="w-3.5 h-3.5" />
                <span>{t.filterPromo}</span>
              </button>
              <button
                onClick={() => setBadgeFilter('new')}
                className={`text-xs px-3 py-1.5 rounded-lg font-medium flex items-center gap-1 transition ${
                  badgeFilter === 'new'
                    ? 'bg-blue-600 text-white font-semibold'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>{t.filterNew}</span>
              </button>
            </div>

            {/* Sort & Inline Search */}
            <div className="flex items-center gap-3 w-full lg:w-auto justify-end">
              
              {/* Sort Dropdown */}
              <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700">
                <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />
                <span className="hidden sm:inline text-slate-400">{t.sortBy}</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent border-none outline-none font-semibold text-slate-800 cursor-pointer"
                >
                  <option value="popular">{t.sortPopular}</option>
                  <option value="price_low">{t.sortPriceLow}</option>
                  <option value="price_high">{t.sortPriceHigh}</option>
                  <option value="rating">{t.sortRating}</option>
                  <option value="newest">{t.sortNewest}</option>
                </select>
              </div>

            </div>

          </div>

          {/* Search Result Feedback Indicator */}
          {searchQuery && (
            <div className="flex items-center justify-between text-xs bg-emerald-50 text-emerald-900 p-2.5 rounded-xl border border-emerald-200">
              <div className="flex items-center gap-1.5">
                <Search className="w-3.5 h-3.5 text-emerald-600" />
                <span>Hasil pencarian kata kunci: <strong>"{searchQuery}"</strong></span>
              </div>
              <button
                onClick={() => setSearchQuery('')}
                className="underline font-semibold hover:text-emerald-700"
              >
                Hapus Filter Pencarian
              </button>
            </div>
          )}

        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
              <SlidersHorizontal className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">Tidak ada produk yang cocok</h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
              Cobalah mengubah kata kunci pencarian atau memilih kategori filter yang berbeda.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setBadgeFilter('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-semibold hover:bg-emerald-700 transition"
            >
              Reset Semua Filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
