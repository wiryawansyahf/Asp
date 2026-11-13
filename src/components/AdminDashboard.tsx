import React, { useState } from 'react';
import { 
  X, 
  BarChart3, 
  Package, 
  ShoppingBag, 
  Settings, 
  Star, 
  Plus, 
  Edit, 
  Trash2, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp, 
  DollarSign, 
  Users, 
  Clock, 
  Truck, 
  Save, 
  MessageCircle,
  Eye,
  Filter,
  Check,
  Search,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Product, Order, OrderStatus } from '../types';

export const AdminDashboard: React.FC = () => {
  const { 
    isAdminOpen, 
    setIsAdminOpen, 
    products, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    orders, 
    updateOrderStatus, 
    reviews, 
    companySettings, 
    updateCompanySettings, 
    dailyMetrics,
    formatWhatsAppUrl
  } = useApp();

  const [activeTab, setActiveTab] = useState<'analytics' | 'products' | 'orders' | 'settings' | 'reviews'>('analytics');

  // Product Add / Edit Modal
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);

  // Product Form State
  const [prodName, setProdName] = useState('');
  const [prodCategory, setProdCategory] = useState('Elektronik & Gadget');
  const [prodPrice, setProdPrice] = useState(0);
  const [prodOriginalPrice, setProdOriginalPrice] = useState(0);
  const [prodStock, setProdStock] = useState(10);
  const [prodSku, setProdSku] = useState('');
  const [prodImage, setProdImage] = useState('');
  const [prodDesc, setProdDesc] = useState('');
  const [prodFeatured, setProdFeatured] = useState(false);
  const [prodBestSeller, setProdBestSeller] = useState(false);
  const [prodSpecs, setProdSpecs] = useState<{ label: string; value: string }[]>([
    { label: 'Garansi', value: '1 Tahun Resmi' },
    { label: 'Kondisi', value: 'Baru 100% Original' }
  ]);

  // Order Filter State
  const [orderFilter, setOrderFilter] = useState<string>('all');
  const [orderSearch, setOrderSearch] = useState('');

  // Settings Form State
  const [compName, setCompName] = useState(companySettings.companyName);
  const [compTagline, setCompTagline] = useState(companySettings.tagline);
  const [compStory, setCompStory] = useState(companySettings.aboutStory);
  const [compVision, setCompVision] = useState(companySettings.vision);
  const [compWa, setCompWa] = useState(companySettings.whatsappNumber);
  const [compEmail, setCompEmail] = useState(companySettings.email);
  const [compAddress, setCompAddress] = useState(companySettings.address);
  const [compFounderName, setCompFounderName] = useState(companySettings.founderName);
  const [compAnnouncement, setCompAnnouncement] = useState(companySettings.announcementText);
  const [compAnnouncementActive, setCompAnnouncementActive] = useState(companySettings.isAnnouncementActive);
  const [settingsSaved, setSettingsSaved] = useState(false);

  if (!isAdminOpen) return null;

  // Analytics Computations
  const totalRevenue = orders.reduce((sum, ord) => sum + (ord.paymentStatus === 'paid' ? ord.total : 0), 0);
  const todayRevenue = orders
    .filter((ord) => ord.createdAt.includes('11') || ord.createdAt.includes('Baru saja'))
    .reduce((sum, ord) => sum + ord.total, 0);
  const totalOrdersCount = orders.length;
  const avgOrderValue = totalOrdersCount > 0 ? Math.round(totalRevenue / totalOrdersCount) : 0;
  const lowStockCount = products.filter((p) => p.stock <= 15).length;

  // Max revenue for bar chart scaling
  const maxMetricRevenue = Math.max(...dailyMetrics.map((m) => m.revenue), 12000000);

  // Open Edit Product
  const handleOpenEdit = (p: Product) => {
    setEditingProduct(p);
    setProdName(p.name);
    setProdCategory(p.category);
    setProdPrice(p.price);
    setProdOriginalPrice(p.originalPrice || p.price);
    setProdStock(p.stock);
    setProdSku(p.sku);
    setProdImage(p.images[0] || '');
    setProdDesc(p.description);
    setProdFeatured(p.featured);
    setProdBestSeller(p.bestSeller || false);
    setProdSpecs(p.specifications.length > 0 ? p.specifications : [{ label: 'Garansi', value: '1 Tahun' }]);
    setIsProductModalOpen(true);
  };

  // Open Add Product
  const handleOpenAdd = () => {
    setEditingProduct(null);
    setProdName('');
    setProdCategory('Elektronik & Gadget');
    setProdPrice(500000);
    setProdOriginalPrice(650000);
    setProdStock(25);
    setProdSku(`NC-${Date.now().toString().slice(-4)}`);
    setProdImage('https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80');
    setProdDesc('');
    setProdFeatured(false);
    setProdBestSeller(false);
    setProdSpecs([
      { label: 'Garansi', value: '1 Tahun Resmi Toko' },
      { label: 'Kondisi', value: '100% Baru & Segel' }
    ]);
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodName.trim() || prodPrice <= 0) return;

    const discount = prodOriginalPrice > prodPrice 
      ? Math.round(((prodOriginalPrice - prodPrice) / prodOriginalPrice) * 100) 
      : 0;

    if (editingProduct) {
      updateProduct({
        ...editingProduct,
        name: prodName,
        category: prodCategory,
        price: prodPrice,
        originalPrice: prodOriginalPrice,
        discountPercentage: discount,
        stock: prodStock,
        sku: prodSku,
        images: [prodImage, ...editingProduct.images.slice(1)],
        description: prodDesc,
        featured: prodFeatured,
        bestSeller: prodBestSeller,
        specifications: prodSpecs
      });
    } else {
      addProduct({
        name: prodName,
        category: prodCategory,
        price: prodPrice,
        originalPrice: prodOriginalPrice,
        discountPercentage: discount,
        stock: prodStock,
        sku: prodSku,
        images: [prodImage],
        description: prodDesc,
        featured: prodFeatured,
        bestSeller: prodBestSeller,
        isNew: true,
        specifications: prodSpecs,
        tags: [prodCategory.split(' ')[0]]
      });
    }

    setIsProductModalOpen(false);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateCompanySettings({
      companyName: compName,
      tagline: compTagline,
      aboutStory: compStory,
      vision: compVision,
      whatsappNumber: compWa,
      email: compEmail,
      address: compAddress,
      founderName: compFounderName,
      announcementText: compAnnouncement,
      isAnnouncementActive: compAnnouncementActive
    });
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 2000);
  };

  // Filter Orders
  const filteredOrders = orders.filter((o) => {
    if (orderFilter !== 'all' && o.orderStatus !== orderFilter) return false;
    if (orderSearch.trim()) {
      const q = orderSearch.toLowerCase();
      return (
        o.orderNumber.toLowerCase().includes(q) ||
        o.customerName.toLowerCase().includes(q) ||
        o.customerPhone.includes(q)
      );
    }
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white w-full max-w-6xl max-h-[96vh] rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        
        {/* Top Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center font-bold text-white shadow-md">
              ADM
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-white text-base sm:text-lg">
                  Dashboard Admin & CMS Website
                </h3>
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                  Live System
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Kontrol katalog produk, pesanan baru, laporan penjualan harian & profil website
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsAdminOpen(false)}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="flex items-center border-b border-slate-200 bg-slate-50 px-4 sm:px-6 overflow-x-auto shrink-0 scrollbar-none text-xs sm:text-sm font-bold">
          <button
            onClick={() => setActiveTab('analytics')}
            className={`py-3.5 px-3 flex items-center gap-2 border-b-2 transition whitespace-nowrap ${
              activeTab === 'analytics'
                ? 'border-emerald-600 text-emerald-700 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <BarChart3 className="w-4 h-4 text-emerald-600" />
            <span>Analitik Penjualan Harian</span>
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`py-3.5 px-3 flex items-center gap-2 border-b-2 transition whitespace-nowrap ${
              activeTab === 'products'
                ? 'border-emerald-600 text-emerald-700 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Package className="w-4 h-4 text-blue-600" />
            <span>Katalog Produk ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`py-3.5 px-3 flex items-center gap-2 border-b-2 transition whitespace-nowrap ${
              activeTab === 'orders'
                ? 'border-emerald-600 text-emerald-700 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShoppingBag className="w-4 h-4 text-indigo-600" />
            <span>Pesanan Masuk ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`py-3.5 px-3 flex items-center gap-2 border-b-2 transition whitespace-nowrap ${
              activeTab === 'settings'
                ? 'border-emerald-600 text-emerald-700 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Settings className="w-4 h-4 text-slate-600" />
            <span>Edit Profile & Website</span>
          </button>

          <button
            onClick={() => setActiveTab('reviews')}
            className={`py-3.5 px-3 flex items-center gap-2 border-b-2 transition whitespace-nowrap ${
              activeTab === 'reviews'
                ? 'border-emerald-600 text-emerald-700 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Star className="w-4 h-4 text-amber-500" />
            <span>Ulasan Pelanggan ({reviews.length})</span>
          </button>
        </div>

        {/* Tab Body Contents */}
        <div className="p-5 sm:p-8 overflow-y-auto flex-1 bg-slate-50/50">
          
          {/* ========================================================
              TAB 1: ANALYTICS
             ======================================================== */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              
              {/* Top Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-1">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>Total Pendapatan Terverifikasi</span>
                    <DollarSign className="w-4 h-4 text-emerald-600" />
                  </div>
                  <h4 className="text-xl font-extrabold text-slate-900 font-heading">
                    Rp {totalRevenue.toLocaleString('id-ID')}
                  </h4>
                  <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" /> +18.4% dari minggu lalu
                  </span>
                </div>

                <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-1">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>Penjualan Hari Ini</span>
                    <Clock className="w-4 h-4 text-teal-600" />
                  </div>
                  <h4 className="text-xl font-extrabold text-slate-900 font-heading">
                    Rp {todayRevenue.toLocaleString('id-ID')}
                  </h4>
                  <span className="text-[11px] text-slate-500">
                    Real-time terupdate otomatis
                  </span>
                </div>

                <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-1">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>Total Transaksi Masuk</span>
                    <ShoppingBag className="w-4 h-4 text-blue-600" />
                  </div>
                  <h4 className="text-xl font-extrabold text-slate-900 font-heading">
                    {totalOrdersCount} Pesanan
                  </h4>
                  <span className="text-[11px] text-blue-600 font-semibold">
                    Rata-rata Order: Rp {avgOrderValue.toLocaleString('id-ID')}
                  </span>
                </div>

                <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-1">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>Peringatan Stok Tipis</span>
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                  </div>
                  <h4 className="text-xl font-extrabold text-slate-900 font-heading">
                    {lowStockCount} Produk
                  </h4>
                  <span className="text-[11px] text-amber-600 font-semibold">
                    Perlu penambahan suplai
                  </span>
                </div>
              </div>

              {/* Daily Sales Bar Chart */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h4 className="font-bold text-base text-slate-900">
                      Grafik Performa Penjualan Harian (7 Hari Terakhir)
                    </h4>
                    <p className="text-xs text-slate-500">
                      Volume omset harian dan akumulasi pesanan berhasil
                    </p>
                  </div>
                  <span className="text-xs font-semibold px-3 py-1 bg-emerald-50 text-emerald-800 rounded-lg">
                    Rata-rata: Rp 7.500.000 / Hari
                  </span>
                </div>

                {/* Simulated SVG / CSS Bar Chart */}
                <div className="pt-6">
                  <div className="h-48 flex items-end justify-between gap-2 sm:gap-6 border-b border-slate-200 pb-2">
                    {dailyMetrics.map((item, idx) => {
                      const heightPercent = Math.min(100, Math.round((item.revenue / maxMetricRevenue) * 100));
                      return (
                        <div key={idx} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                          {/* Tooltip on hover */}
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] bg-slate-900 text-white px-2 py-1 rounded whitespace-nowrap pointer-events-none mb-1 shadow-md">
                            Rp {(item.revenue / 1000000).toFixed(1)} Jt ({item.orderCount} order)
                          </div>
                          
                          {/* Bar */}
                          <div
                            style={{ height: `${heightPercent}%` }}
                            className="w-full max-w-[42px] bg-gradient-to-t from-emerald-600 to-teal-400 rounded-t-xl group-hover:brightness-110 transition-all shadow-xs"
                          />
                          
                          {/* Label */}
                          <span className="text-[11px] font-semibold text-slate-600 truncate">
                            {item.date}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Bottom Row: Top Products & Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Top Selling Products */}
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
                  <h4 className="font-bold text-sm text-slate-900">Produk Paling Banyak Terjual</h4>
                  <div className="space-y-3">
                    {products.slice(0, 4).map((p, idx) => (
                      <div key={p.id} className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                        <span className="w-6 text-center font-bold text-xs text-slate-400">#{idx + 1}</span>
                        <img src={p.images[0]} alt={p.name} className="w-10 h-10 rounded-lg object-cover" />
                        <div className="flex-1 min-w-0 text-xs">
                          <p className="font-bold text-slate-800 truncate">{p.name}</p>
                          <span className="text-slate-500">Rp {p.price.toLocaleString('id-ID')} • Terjual {p.reviewCount + 40} unit</span>
                        </div>
                        <span className="text-xs font-bold text-emerald-600">Sisa {p.stock}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Real-time Order Stream */}
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-sm text-slate-900">Aliran Transaksi Terkini</h4>
                    <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" /> Live
                    </span>
                  </div>
                  <div className="space-y-3 max-h-72 overflow-y-auto">
                    {orders.slice(0, 5).map((o) => (
                      <div key={o.id} className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs flex items-center justify-between">
                        <div>
                          <p className="font-bold text-slate-800">{o.customerName}</p>
                          <span className="text-slate-400 text-[11px]">{o.orderNumber} • {o.courier}</span>
                        </div>
                        <div className="text-right">
                          <span className="font-bold text-slate-900 block">Rp {o.total.toLocaleString('id-ID')}</span>
                          <span className="text-[10px] text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded font-semibold">
                            {o.orderStatus.toUpperCase()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* ========================================================
              TAB 2: PRODUCTS CMS
             ======================================================== */}
          {activeTab === 'products' && (
            <div className="space-y-4">
              
              {/* Product Toolbar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200">
                <span className="font-bold text-sm text-slate-800">
                  Total {products.length} Produk di Katalog
                </span>
                
                <button
                  onClick={handleOpenAdd}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Tambah Produk Baru</span>
                </button>
              </div>

              {/* Products Table */}
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
                      <tr>
                        <th className="p-3.5">Produk</th>
                        <th className="p-3.5">Kategori & SKU</th>
                        <th className="p-3.5">Harga</th>
                        <th className="p-3.5">Stok</th>
                        <th className="p-3.5">Badge</th>
                        <th className="p-3.5 text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {products.map((p) => (
                        <tr key={p.id} className="hover:bg-slate-50 transition">
                          <td className="p-3.5">
                            <div className="flex items-center gap-3">
                              <img
                                src={p.images[0]}
                                alt={p.name}
                                className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0"
                              />
                              <div className="max-w-xs">
                                <span className="font-bold text-slate-900 block truncate">{p.name}</span>
                                <span className="text-[11px] text-slate-500">⭐ {p.rating} ({p.reviewCount} ulasan)</span>
                              </div>
                            </div>
                          </td>

                          <td className="p-3.5">
                            <span className="font-semibold text-slate-700 block">{p.category}</span>
                            <span className="font-mono text-slate-400 text-[11px]">SKU: {p.sku}</span>
                          </td>

                          <td className="p-3.5 font-bold text-slate-900 font-heading">
                            Rp {p.price.toLocaleString('id-ID')}
                          </td>

                          <td className="p-3.5">
                            <span className={`px-2.5 py-1 rounded-lg font-bold text-xs ${
                              p.stock > 15 ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                            }`}>
                              {p.stock} unit
                            </span>
                          </td>

                          <td className="p-3.5 space-y-1">
                            {p.featured && (
                              <span className="inline-block bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.2 rounded mr-1">
                                Unggulan
                              </span>
                            )}
                            {p.bestSeller && (
                              <span className="inline-block bg-rose-100 text-rose-800 text-[10px] font-bold px-2 py-0.2 rounded">
                                Terlaris
                              </span>
                            )}
                          </td>

                          <td className="p-3.5 text-right space-x-1">
                            <button
                              onClick={() => handleOpenEdit(p)}
                              className="p-1.5 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                              title="Edit Produk"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Yakin ingin menghapus produk "${p.name}"?`)) {
                                  deleteProduct(p.id);
                                }
                              }}
                              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                              title="Hapus Produk"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* ========================================================
              TAB 3: ORDERS MANAGEMENT
             ======================================================== */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              
              {/* Order Filters */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200">
                <div className="flex items-center gap-2 overflow-x-auto">
                  {(['all', 'pending_payment', 'paid', 'processing', 'shipped', 'completed', 'cancelled'] as const).map((st) => (
                    <button
                      key={st}
                      onClick={() => setOrderFilter(st)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                        orderFilter === st
                          ? 'bg-slate-900 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {st === 'all' ? 'Semua Status' : st.replace('_', ' ').toUpperCase()}
                    </button>
                  ))}
                </div>

                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={orderSearch}
                    onChange={(e) => setOrderSearch(e.target.value)}
                    placeholder="Cari No. Order / Pelanggan..."
                    className="pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Order List Cards */}
              <div className="space-y-4">
                {filteredOrders.length === 0 ? (
                  <div className="bg-white p-8 rounded-2xl text-center text-slate-400 text-xs">
                    Tidak ada pesanan ditemukan.
                  </div>
                ) : (
                  filteredOrders.map((ord) => (
                    <div key={ord.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                      
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-sm font-bold text-slate-900">
                              {ord.orderNumber}
                            </span>
                            <span className="text-xs text-slate-400">• {ord.createdAt}</span>
                          </div>
                          <p className="text-xs text-slate-600 mt-0.5">
                            Pembeli: <strong>{ord.customerName}</strong> ({ord.customerPhone}) • {ord.customerCity}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-slate-500">Ubah Status:</span>
                          <select
                            value={ord.orderStatus}
                            onChange={(e) => updateOrderStatus(ord.id, e.target.value as OrderStatus)}
                            className="bg-slate-100 border border-slate-200 text-xs font-bold rounded-lg p-1.5 outline-none focus:border-emerald-500 cursor-pointer"
                          >
                            <option value="pending_payment">Menunggu Pembayaran</option>
                            <option value="paid">Sudah Dibayar</option>
                            <option value="processing">Sedang Diproses</option>
                            <option value="shipped">Sedang Dikirim</option>
                            <option value="completed">Selesai</option>
                            <option value="cancelled">Dibatalkan</option>
                          </select>
                        </div>
                      </div>

                      {/* Items & Address */}
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 text-xs">
                        <div className="md:col-span-7 space-y-2">
                          <span className="font-semibold text-slate-500 block">Item Belanja:</span>
                          <div className="space-y-1.5">
                            {ord.items.map((it, idx) => (
                              <div key={idx} className="flex items-center justify-between bg-slate-50 p-2 rounded-lg">
                                <span className="text-slate-800 font-medium truncate max-w-xs">
                                  {it.productName} (x{it.quantity})
                                </span>
                                <span className="font-bold text-slate-900">
                                  Rp {(it.price * it.quantity).toLocaleString('id-ID')}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="md:col-span-5 bg-slate-50 p-3 rounded-xl space-y-1 text-slate-600">
                          <span className="font-semibold text-slate-800 block">Alamat Tujuan:</span>
                          <p>{ord.customerAddress}</p>
                          <p className="pt-1 text-slate-500">
                            Kurir: <strong>{ord.courier}</strong>
                          </p>
                          {ord.trackingNumber && (
                            <p className="font-mono text-emerald-700">Resi: {ord.trackingNumber}</p>
                          )}
                        </div>
                      </div>

                      {/* Footer Info & WhatsApp Chat Button */}
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                        <div>
                          <span className="text-slate-500">Total Transaksi: </span>
                          <strong className="text-base text-slate-950 font-heading">
                            Rp {ord.total.toLocaleString('id-ID')}
                          </strong>
                          <span className="ml-2 uppercase text-[10px] bg-slate-100 text-slate-700 font-bold px-2 py-0.5 rounded">
                            {ord.paymentMethod}
                          </span>
                        </div>

                        <a
                          href={formatWhatsAppUrl(`Halo Kak ${ord.customerName}, kami dari Admin Nusantara Catalog mengabarkan pesanan No. ${ord.orderNumber} dengan status: ${ord.orderStatus.toUpperCase()}`)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold flex items-center gap-1.5 transition"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>Hubungi Pelanggan via WA</span>
                        </a>
                      </div>

                    </div>
                  ))
                )}
              </div>

            </div>
          )}

          {/* ========================================================
              TAB 4: SETTINGS & COMPANY PROFILE CMS
             ======================================================== */}
          {activeTab === 'settings' && (
            <form onSubmit={handleSaveSettings} className="space-y-6 max-w-3xl">
              
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <h4 className="font-bold text-base text-slate-900">
                    Informasi & Identitas Perusahaan (Company Knowledge)
                  </h4>
                  {settingsSaved && (
                    <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Pengaturan Tersimpan!
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Nama Perusahaan / Toko:
                    </label>
                    <input
                      type="text"
                      value={compName}
                      onChange={(e) => setCompName(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Tagline Resmi:
                    </label>
                    <input
                      type="text"
                      value={compTagline}
                      onChange={(e) => setCompTagline(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Kisah / About Us (Knowlage Perusahaan):
                  </label>
                  <textarea
                    rows={4}
                    value={compStory}
                    onChange={(e) => setCompStory(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-emerald-500 leading-relaxed"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Visi Perusahaan:
                  </label>
                  <input
                    type="text"
                    value={compVision}
                    onChange={(e) => setCompVision(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Nama Pendiri (Founder):
                    </label>
                    <input
                      type="text"
                      value={compFounderName}
                      onChange={(e) => setCompFounderName(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Nomor WhatsApp Resmi (Contoh: 6281234567890):
                    </label>
                    <input
                      type="text"
                      value={compWa}
                      onChange={(e) => setCompWa(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-emerald-500 font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Email Customer Care:
                    </label>
                    <input
                      type="email"
                      value={compEmail}
                      onChange={(e) => setCompEmail(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Alamat Kantor Pusat:
                    </label>
                    <input
                      type="text"
                      value={compAddress}
                      onChange={(e) => setCompAddress(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                {/* Announcement Bar */}
                <div className="pt-2 border-t border-slate-100 space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-slate-700">
                      Teks Bar Pengumuman (Top Banner):
                    </label>
                    <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={compAnnouncementActive}
                        onChange={(e) => setCompAnnouncementActive(e.target.checked)}
                        className="rounded text-emerald-600"
                      />
                      <span>Tampilkan Banner</span>
                    </label>
                  </div>
                  <input
                    type="text"
                    value={compAnnouncement}
                    onChange={(e) => setCompAnnouncement(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-emerald-500"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-md transition"
                >
                  <Save className="w-4 h-4" />
                  <span>Simpan Perubahan Website</span>
                </button>

              </div>

            </form>
          )}

          {/* ========================================================
              TAB 5: REVIEWS MODERATION
             ======================================================== */}
          {activeTab === 'reviews' && (
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-2xl border border-slate-200">
                <span className="font-bold text-sm text-slate-800">
                  Moderasi Ulasan & Testimoni Pelanggan
                </span>
                <p className="text-xs text-slate-500">
                  Semua ulasan masuk dari halaman produk tampil di sini secara real-time.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {reviews.map((rev) => (
                  <div key={rev.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-slate-900">{rev.userName}</span>
                      <div className="flex text-amber-400">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                        ))}
                      </div>
                    </div>
                    <h5 className="font-bold text-xs text-slate-800">{rev.title}</h5>
                    <p className="text-xs text-slate-600 leading-relaxed">{rev.comment}</p>
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                      <span>{rev.date}</span>
                      <span className="text-emerald-700 font-semibold">✓ Pembeli Terverifikasi</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>

      {/* PRODUCT ADD / EDIT POPUP MODAL */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/80 animate-in fade-in">
          <div className="bg-white w-full max-w-xl max-h-[90vh] rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
            <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
              <h4 className="font-bold text-sm text-slate-900">
                {editingProduct ? 'Edit Informasi Produk' : 'Tambah Produk Baru ke Katalog'}
              </h4>
              <button onClick={() => setIsProductModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="p-6 overflow-y-auto space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Nama Produk *</label>
                <input
                  type="text"
                  required
                  value={prodName}
                  onChange={(e) => setProdName(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Kategori</label>
                  <select
                    value={prodCategory}
                    onChange={(e) => setProdCategory(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-emerald-500"
                  >
                    <option value="Elektronik & Gadget">Elektronik & Gadget</option>
                    <option value="Home & Living">Home & Living</option>
                    <option value="Kopi & F&B Nusantara">Kopi & F&B Nusantara</option>
                    <option value="Fashion & Apparel">Fashion & Apparel</option>
                    <option value="Aksesoris">Aksesoris</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">SKU Produk</label>
                  <input
                    type="text"
                    value={prodSku}
                    onChange={(e) => setProdSku(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-emerald-500 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Harga Jual (Rp) *</label>
                  <input
                    type="number"
                    required
                    value={prodPrice}
                    onChange={(e) => setProdPrice(Number(e.target.value))}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-emerald-500 font-bold"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Harga Coret (Rp)</label>
                  <input
                    type="number"
                    value={prodOriginalPrice}
                    onChange={(e) => setProdOriginalPrice(Number(e.target.value))}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Jumlah Stok</label>
                  <input
                    type="number"
                    value={prodStock}
                    onChange={(e) => setProdStock(Number(e.target.value))}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-emerald-500 font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">URL Foto Produk</label>
                <input
                  type="url"
                  value={prodImage}
                  onChange={(e) => setProdImage(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Deskripsi Lengkap Produk</label>
                <textarea
                  rows={3}
                  value={prodDesc}
                  onChange={(e) => setProdDesc(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-emerald-500 leading-relaxed"
                />
              </div>

              {/* Toggles */}
              <div className="flex gap-4 pt-2 border-t border-slate-100">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={prodFeatured}
                    onChange={(e) => setProdFeatured(e.target.checked)}
                    className="rounded text-emerald-600"
                  />
                  <span>Jadikan Produk Unggulan</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={prodBestSeller}
                    onChange={(e) => setProdBestSeller(e.target.checked)}
                    className="rounded text-emerald-600"
                  />
                  <span>Badge Terlaris (Best Seller)</span>
                </label>
              </div>

              <div className="pt-4 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 rounded-xl font-semibold text-slate-700"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold"
                >
                  Simpan Produk
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
