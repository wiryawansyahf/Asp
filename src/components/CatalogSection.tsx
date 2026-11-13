import React, { useMemo } from 'react';
import { SlidersHorizontal, Search, Layers, ArrowUpDown, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProductCard } from './ProductCard';

export const CatalogSection: React.FC = () => {
  const {
    language,
    t,
    products,
    companySettings,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    badgeFilter,
    setBadgeFilter,
    sortBy,
    setSortBy
  } = useApp();

  const categories = useMemo(() => {
    const list = Array.from(new Set(products.map((p) => p.category)));
    return ['All', ...list];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        if (selectedCategory !== 'All' && p.category !== selectedCategory) {
          return false;
        }
        if (badgeFilter === 'featured' && !p.featured) return false;
        if (badgeFilter === 'bestseller' && !p.bestSeller) return false;
        if (badgeFilter === 'promo' && (!p.discountPercentage || p.discountPercentage <= 0)) {
          return false;
        }
        if (badgeFilter === 'new' && !p.isNew) return false;

        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName =
            p.name.toLowerCase().includes(q) || (p.nameEn && p.nameEn.toLowerCase().includes(q));
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
        return b.reviewCount * b.rating - a.reviewCount * a.rating;
      });
  }, [products, selectedCategory, badgeFilter, searchQuery, sortBy]);

  return (
    <section id="catalog" className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-700">
              <Layers className="w-4 h-4" />
              <span>
                {language === 'id'
                  ? companySettings.catalogBadge || t.catalogBadge
                  : t.catalogBadge}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              {language === 'id'
                ? companySettings.catalogTitle || t.catalogTitle
                : t.catalogTitle}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl">
              {language === 'id'
                ? companySettings.catalogSubtitle || t.catalogSubtitle
                : t.catalogSubtitle}
            </p>
          </div>

          <div className="text-xs font-semibold text-slate-600 bg-white px-4 py-2 rounded-lg border border-slate-200 self-start md:self-auto">
            {language === 'id' ? 'Menampilkan' : 'Showing'}{' '}
            <span className="text-blue-700 font-bold">{filteredProducts.length}</span>{' '}
            {language === 'id' ? 'dari' : 'of'} {products.length}{' '}
            {language === 'id' ? 'Produk' : 'Items'}
          </div>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 space-y-4">
          {/* Top Row: Search Input + Sort Dropdown */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  language === 'id'
                    ? companySettings.catalogSearchPlaceholder || t.searchPlaceholder
                    : t.searchPlaceholder
                }
                className="w-full pl-10 pr-9 py-2.5 bg-slate-50 focus:bg-white border border-slate-200 focus:border-blue-600 rounded-xl text-xs sm:text-sm outline-none transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-0.5 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 bg-slate-50 px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 shrink-0">
              <ArrowUpDown className="w-3.5 h-3.5 text-blue-700" />
              <span className="text-slate-500">{t.sortBy}</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'popular' | 'newest')}
                className="bg-transparent border-none outline-none font-bold text-slate-900 cursor-pointer"
              >
                <option value="popular">{t.sortPopular}</option>
                <option value="newest">{t.sortNewest}</option>
              </select>
            </div>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs font-semibold">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              const count =
                cat === 'All' ? products.length : products.filter((p) => p.category === cat).length;

              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-2 rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer ${
                    isSelected
                      ? 'bg-blue-700 text-white'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  <span>{cat === 'All' ? t.categoryAll : cat}</span>
                  <span
                    className={`text-[11px] px-1.5 py-0.2 rounded font-bold ${
                      isSelected ? 'bg-blue-800 text-blue-100' : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Collection Filter Strip */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
            <span className="text-xs font-semibold text-slate-400 mr-1">
              {language === 'id' ? 'Filter:' : 'Filter:'}
            </span>
            {(
              [
                { key: 'all', label: t.filterAll },
                { key: 'featured', label: t.filterFeatured },
                { key: 'bestseller', label: t.filterBestSeller },
                { key: 'promo', label: t.filterPromo },
                { key: 'new', label: t.filterNew }
              ] as const
            ).map((item) => (
              <button
                key={item.key}
                type="button"
                onClick={() => setBadgeFilter(item.key)}
                className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                  badgeFilter === item.key
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center mx-auto">
              <SlidersHorizontal className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              {language === 'id' ? 'Produk tidak ditemukan' : 'No matching components found'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
              {language === 'id'
                ? 'Ubah kata kunci pencarian atau reset filter kategori untuk melihat semua produk PT Asiaparts Indotech.'
                : 'Adjust your search keyword or reset category filters to browse all PT Asiaparts Indotech parts.'}
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('All');
                setBadgeFilter('all');
                setSearchQuery('');
              }}
              className="px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
            >
              {language === 'id' ? 'Reset Semua Filter' : 'Reset Filters'}
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
