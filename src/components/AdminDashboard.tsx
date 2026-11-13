import React, { useState, useEffect } from 'react';
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
  Clock, 
  Save, 
  MessageCircle,
  Search,
  ExternalLink,
  LayoutTemplate,
  PhoneCall,
  Image as ImageIcon,
  ListChecks,
  Sparkles,
  ShieldCheck,
  KeyRound,
  Lock,
  ArrowLeft,
  LogOut,
  Mail,
  Eye,
  EyeOff,
  Download,
  Upload,
  FileCode
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Product, OrderStatus } from '../types';

export const AdminDashboard: React.FC = () => {
  const { 
    isAdminAuthenticated,
    loginAdmin,
    logoutAdmin,
    navigateTo,
    adminActiveTab,
    setAdminActiveTab,
    products, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    importSiteData,
    orders, 
    updateOrderStatus, 
    reviews, 
    companySettings, 
    updateCompanySettings, 
    dailyMetrics,
    formatWhatsAppUrl
  } = useApp();

  // Admin Login Gate State (/admin)
  const [adminEmail, setAdminEmail] = useState('admin@nusantaracatalog.id');
  const [adminPin, setAdminPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Product Add / Edit / Delete Modal
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [productSearch, setProductSearch] = useState('');

  // Product Form State
  const [prodName, setProdName] = useState('');
  const [prodNameEn, setProdNameEn] = useState('');
  const [prodCategory, setProdCategory] = useState('Elektronik & Gadget');
  const [prodCustomCategory, setProdCustomCategory] = useState('');
  const [prodPrice, setProdPrice] = useState(0);
  const [prodOriginalPrice, setProdOriginalPrice] = useState(0);
  const [prodStock, setProdStock] = useState(10);
  const [prodSku, setProdSku] = useState('');
  const [prodImages, setProdImages] = useState<string[]>(['']);
  const [prodDesc, setProdDesc] = useState('');
  const [prodFeatured, setProdFeatured] = useState(false);
  const [prodBestSeller, setProdBestSeller] = useState(false);
  const [prodIsNew, setProdIsNew] = useState(true);
  const [prodSpecs, setProdSpecs] = useState<{ label: string; value: string }[]>([
    { label: 'Garansi', value: '1 Tahun Resmi' },
    { label: 'Kondisi', value: 'Baru 100% Original' }
  ]);

  // Order Filter State
  const [orderFilter, setOrderFilter] = useState<string>('all');
  const [orderSearch, setOrderSearch] = useState('');

  // Header, Hero & WhatsApp Form State
  const [logoText, setLogoText] = useState(companySettings.logoText || 'N');
  const [logoUrl, setLogoUrl] = useState(companySettings.logoUrl || '');
  const [headerTitle, setHeaderTitle] = useState(companySettings.headerTitle || 'Nusantara');
  const [headerTitleHighlight, setHeaderTitleHighlight] = useState(companySettings.headerTitleHighlight || 'Catalog');
  const [headerSubtitle, setHeaderSubtitle] = useState(companySettings.headerSubtitle || 'Official Store & Innovations');
  const [showWhatsAppInHeader, setShowWhatsAppInHeader] = useState(companySettings.showWhatsAppInHeader);
  const [heroBadge, setHeroBadge] = useState(companySettings.heroBadge || '');
  const [heroTitlePrefix, setHeroTitlePrefix] = useState(companySettings.heroTitlePrefix || '');
  const [heroTitleHighlight, setHeroTitleHighlight] = useState(companySettings.heroTitleHighlight || '');
  const [heroDescription, setHeroDescription] = useState(companySettings.heroDescription || '');
  const [compWa, setCompWa] = useState(companySettings.whatsappNumber);
  const [waDefaultMsg, setWaDefaultMsg] = useState(companySettings.whatsappDefaultMessage || '');
  const [compAnnouncement, setCompAnnouncement] = useState(companySettings.announcementText);
  const [announcementCtaText, setAnnouncementCtaText] = useState(companySettings.announcementCtaText || 'Klaim Promo');
  const [compAnnouncementActive, setCompAnnouncementActive] = useState(companySettings.isAnnouncementActive);
  const [headerSaved, setHeaderSaved] = useState(false);

  // Company Settings Form State
  const [compName, setCompName] = useState(companySettings.companyName);
  const [compTagline, setCompTagline] = useState(companySettings.tagline);
  const [compStory, setCompStory] = useState(companySettings.aboutStory);
  const [compVision, setCompVision] = useState(companySettings.vision);
  const [compEmail, setCompEmail] = useState(companySettings.email);
  const [compPhone, setCompPhone] = useState(companySettings.phone);
  const [compAddress, setCompAddress] = useState(companySettings.address);
  const [compFounderName, setCompFounderName] = useState(companySettings.founderName);
  const [settingsSaved, setSettingsSaved] = useState(false);
  const [syncNotice, setSyncNotice] = useState('');

  // Keep local form states synchronized with companySettings
  useEffect(() => {
    setLogoText(companySettings.logoText || 'N');
    setLogoUrl(companySettings.logoUrl || '');
    setHeaderTitle(companySettings.headerTitle || 'Nusantara');
    setHeaderTitleHighlight(companySettings.headerTitleHighlight || 'Catalog');
    setHeaderSubtitle(companySettings.headerSubtitle || 'Official Store & Innovations');
    setShowWhatsAppInHeader(companySettings.showWhatsAppInHeader);
    setHeroBadge(companySettings.heroBadge || '');
    setHeroTitlePrefix(companySettings.heroTitlePrefix || '');
    setHeroTitleHighlight(companySettings.heroTitleHighlight || '');
    setHeroDescription(companySettings.heroDescription || '');
    setCompWa(companySettings.whatsappNumber);
    setWaDefaultMsg(companySettings.whatsappDefaultMessage || '');
    setCompAnnouncement(companySettings.announcementText);
    setAnnouncementCtaText(companySettings.announcementCtaText || 'Klaim Promo');
    setCompAnnouncementActive(companySettings.isAnnouncementActive);

    setCompName(companySettings.companyName);
    setCompTagline(companySettings.tagline);
    setCompStory(companySettings.aboutStory);
    setCompVision(companySettings.vision);
    setCompEmail(companySettings.email);
    setCompPhone(companySettings.phone);
    setCompAddress(companySettings.address);
    setCompFounderName(companySettings.founderName);
  }, [companySettings, isAdminAuthenticated]);

  // Open Edit Product helper
  const handleOpenEdit = (p: Product) => {
    setEditingProduct(p);
    setProdName(p.name);
    setProdNameEn(p.nameEn || '');
    const presetCategories = ['Elektronik & Gadget', 'Home & Living', 'Kopi & F&B Nusantara', 'Fashion & Apparel', 'Aksesoris'];
    if (presetCategories.includes(p.category)) {
      setProdCategory(p.category);
      setProdCustomCategory('');
    } else {
      setProdCategory('__custom__');
      setProdCustomCategory(p.category);
    }
    setProdPrice(p.price);
    setProdOriginalPrice(p.originalPrice || p.price);
    setProdStock(p.stock);
    setProdSku(p.sku);
    setProdImages(p.images.length > 0 ? p.images : ['']);
    setProdDesc(p.description);
    setProdFeatured(p.featured);
    setProdBestSeller(p.bestSeller || false);
    setProdIsNew(p.isNew || false);
    setProdSpecs(p.specifications.length > 0 ? p.specifications : [{ label: 'Garansi', value: '1 Tahun' }]);
    setIsProductModalOpen(true);
  };

  // Open Add Product helper
  const handleOpenAdd = () => {
    setEditingProduct(null);
    setProdName('');
    setProdNameEn('');
    setProdCategory('Elektronik & Gadget');
    setProdCustomCategory('');
    setProdPrice(500000);
    setProdOriginalPrice(650000);
    setProdStock(25);
    setProdSku(`NC-${Date.now().toString().slice(-4)}`);
    setProdImages(['https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80']);
    setProdDesc('');
    setProdFeatured(false);
    setProdBestSeller(false);
    setProdIsNew(true);
    setProdSpecs([
      { label: 'Garansi', value: '1 Tahun Resmi Toko' },
      { label: 'Kondisi', value: '100% Baru & Segel' }
    ]);
    setIsProductModalOpen(true);
  };

  const handleAdminLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = adminPin.trim();
    if (val === '1234' || val.toLowerCase() === 'admin' || val.toLowerCase() === 'admin123') {
      loginAdmin();
      setAdminPin('');
      setLoginError('');
    } else {
      setLoginError('PIN / Password Admin salah. Gunakan PIN demo: 1234');
    }
  };

  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md space-y-4">
          <button
            onClick={() => navigateTo('/')}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-emerald-300 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Katalog Website</span>
          </button>

          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-6 bg-slate-900 text-white border-b border-slate-800 flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white shadow-lg">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h1 className="font-extrabold text-base sm:text-lg leading-tight">
                  Portal Admin CMS
                </h1>
                <p className="text-xs text-slate-400">
                  {companySettings.companyName} • Akses Terproteksi (/admin)
                </p>
              </div>
            </div>

            <form onSubmit={handleAdminLoginSubmit} className="p-6 space-y-4">
              <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 leading-relaxed">
                Masuk untuk mengelola <strong>Header, Nomor WhatsApp, Katalog Produk, Pesanan, Analitik, dan Profil Perusahaan</strong>.
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Email / Username Admin
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-slate-700">
                    PIN / Password Akses
                  </label>
                  <span className="text-[11px] font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-600">
                    PIN Demo: <strong>1234</strong>
                  </span>
                </div>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPin ? 'text' : 'password'}
                    required
                    autoFocus
                    value={adminPin}
                    onChange={(e) => {
                      setAdminPin(e.target.value);
                      setLoginError('');
                    }}
                    placeholder="Masukkan PIN Admin (1234)"
                    className="w-full pl-9 pr-9 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-emerald-500 font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPin(!showPin)}
                    className="p-1 text-slate-400 hover:text-slate-600 absolute right-2.5 top-1/2 -translate-y-1/2"
                  >
                    {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {loginError && (
                  <p className="text-[11px] text-rose-600 font-semibold mt-1.5">{loginError}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg shadow-emerald-600/20 transition flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4" />
                <span>Masuk ke Dashboard Admin</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Analytics Computations
  const totalRevenue = orders.reduce((sum, ord) => sum + (ord.paymentStatus === 'paid' ? ord.total : 0), 0);
  const todayRevenue = orders
    .filter((ord) => ord.createdAt.includes('11') || ord.createdAt.includes('Baru saja'))
    .reduce((sum, ord) => sum + ord.total, 0);
  const totalOrdersCount = orders.length;
  const avgOrderValue = totalOrdersCount > 0 ? Math.round(totalRevenue / totalOrdersCount) : 0;
  const lowStockCount = products.filter((p) => p.stock <= 15).length;
  const maxMetricRevenue = Math.max(...dailyMetrics.map((m) => m.revenue), 12000000);

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodName.trim() || prodPrice <= 0) return;

    const finalCategory = prodCategory === '__custom__'
      ? (prodCustomCategory.trim() || 'Lainnya')
      : prodCategory;

    const cleanImages = prodImages.map((img) => img.trim()).filter(Boolean);
    if (cleanImages.length === 0) {
      cleanImages.push('https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80');
    }

    const cleanSpecs = prodSpecs.filter((s) => s.label.trim() && s.value.trim());

    const discount = prodOriginalPrice > prodPrice 
      ? Math.round(((prodOriginalPrice - prodPrice) / prodOriginalPrice) * 100) 
      : 0;

    if (editingProduct) {
      updateProduct({
        ...editingProduct,
        name: prodName.trim(),
        nameEn: prodNameEn.trim() || undefined,
        category: finalCategory,
        price: prodPrice,
        originalPrice: prodOriginalPrice,
        discountPercentage: discount,
        stock: prodStock,
        sku: prodSku.trim(),
        images: cleanImages,
        description: prodDesc.trim(),
        featured: prodFeatured,
        bestSeller: prodBestSeller,
        isNew: prodIsNew,
        specifications: cleanSpecs
      });
    } else {
      addProduct({
        name: prodName.trim(),
        nameEn: prodNameEn.trim() || undefined,
        category: finalCategory,
        price: prodPrice,
        originalPrice: prodOriginalPrice,
        discountPercentage: discount,
        stock: prodStock,
        sku: prodSku.trim(),
        images: cleanImages,
        description: prodDesc.trim(),
        featured: prodFeatured,
        bestSeller: prodBestSeller,
        isNew: prodIsNew,
        specifications: cleanSpecs,
        tags: [finalCategory.split(' ')[0]]
      });
    }

    setIsProductModalOpen(false);
  };

  const handleSaveHeaderAndWa = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanedWa = compWa.replace(/[^0-9]/g, '');
    updateCompanySettings({
      logoText: logoText.trim() || 'N',
      logoUrl: logoUrl.trim(),
      headerTitle: headerTitle.trim() || 'Nusantara',
      headerTitleHighlight: headerTitleHighlight.trim() || 'Catalog',
      headerSubtitle: headerSubtitle.trim(),
      showWhatsAppInHeader,
      heroBadge: heroBadge.trim(),
      heroTitlePrefix: heroTitlePrefix.trim(),
      heroTitleHighlight: heroTitleHighlight.trim(),
      heroDescription: heroDescription.trim(),
      whatsappNumber: cleanedWa || '6281234567890',
      whatsappDefaultMessage: waDefaultMsg.trim(),
      announcementText: compAnnouncement.trim(),
      announcementCtaText: announcementCtaText.trim() || 'Klaim Promo',
      isAnnouncementActive: compAnnouncementActive
    });
    setCompWa(cleanedWa || '6281234567890');
    setHeaderSaved(true);
    setTimeout(() => setHeaderSaved(false), 2500);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateCompanySettings({
      companyName: compName,
      tagline: compTagline,
      aboutStory: compStory,
      vision: compVision,
      email: compEmail,
      phone: compPhone,
      address: compAddress,
      founderName: compFounderName
    });
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 2500);
  };

  const handleExportJson = () => {
    const payload = {
      exportedAt: new Date().toISOString(),
      companySettings,
      products
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'backup-website-catalog.json';
    a.click();
    URL.revokeObjectURL(url);
    setSyncNotice('File backup JSON berhasil diunduh!');
    setTimeout(() => setSyncNotice(''), 3000);
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result));
        importSiteData({
          products: Array.isArray(parsed.products) ? parsed.products : undefined,
          companySettings: parsed.companySettings && typeof parsed.companySettings === 'object' ? parsed.companySettings : undefined
        });
        setSyncNotice('Data berhasil diimpor dan disinkronkan ke browser ini!');
        setTimeout(() => setSyncNotice(''), 3500);
      } catch {
        setSyncNotice('Format file JSON tidak valid.');
        setTimeout(() => setSyncNotice(''), 3500);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleDownloadInitialDataTs = () => {
    const tsContent = `import { Product, CompanySettings, Review, Order, DailySalesMetric } from '../types';

export const initialCompanySettings: CompanySettings = ${JSON.stringify(companySettings, null, 2)};

export const initialProducts: Product[] = ${JSON.stringify(products, null, 2)};

export const initialReviews: Review[] = ${JSON.stringify(reviews, null, 2)};

export const initialOrders: Order[] = ${JSON.stringify(orders, null, 2)};

export const initialDailySalesMetrics: DailySalesMetric[] = ${JSON.stringify(dailyMetrics, null, 2)};
`;
    const blob = new Blob([tsContent], { type: 'text/typescript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'initialData.ts';
    a.click();
    URL.revokeObjectURL(url);
    setSyncNotice('File initialData.ts berhasil diunduh untuk publish permanen!');
    setTimeout(() => setSyncNotice(''), 3500);
  };

  // Filter Products in Admin Table
  const filteredAdminProducts = products.filter((p) => {
    if (!productSearch.trim()) return true;
    const q = productSearch.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.sku.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  });

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
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-slate-900 text-white border-b border-slate-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center font-bold text-white shadow-md">
              ADM
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-extrabold text-white text-base sm:text-lg">
                  Dashboard Admin & Editor Website
                </h1>
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                  /admin
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Edit Header, Nomor WhatsApp, Katalog Produk, Laporan Penjualan Harian & Profil Perusahaan
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigateTo('/')}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 border border-slate-700 transition"
            >
              <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
              <span>Lihat Website</span>
            </button>
            <button
              onClick={logoutAdmin}
              className="px-3.5 py-2 rounded-xl bg-rose-600/90 hover:bg-rose-600 text-white text-xs font-bold flex items-center gap-1.5 transition"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Keluar Admin</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="bg-slate-50 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center overflow-x-auto scrollbar-none text-xs sm:text-sm font-bold">
          <button
            onClick={() => setAdminActiveTab('analytics')}
            className={`py-3.5 px-3 flex items-center gap-2 border-b-2 transition whitespace-nowrap ${
              adminActiveTab === 'analytics'
                ? 'border-emerald-600 text-emerald-700 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <BarChart3 className="w-4 h-4 text-emerald-600" />
            <span>Analitik Penjualan</span>
          </button>

          <button
            onClick={() => setAdminActiveTab('header_wa')}
            className={`py-3.5 px-3 flex items-center gap-2 border-b-2 transition whitespace-nowrap ${
              adminActiveTab === 'header_wa'
                ? 'border-emerald-600 text-emerald-700 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <LayoutTemplate className="w-4 h-4 text-amber-600" />
            <span>Edit Header, Hero & No. WA</span>
          </button>

          <button
            onClick={() => setAdminActiveTab('products')}
            className={`py-3.5 px-3 flex items-center gap-2 border-b-2 transition whitespace-nowrap ${
              adminActiveTab === 'products'
                ? 'border-emerald-600 text-emerald-700 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Package className="w-4 h-4 text-blue-600" />
            <span>Edit Produk ({products.length})</span>
          </button>

          <button
            onClick={() => setAdminActiveTab('orders')}
            className={`py-3.5 px-3 flex items-center gap-2 border-b-2 transition whitespace-nowrap ${
              adminActiveTab === 'orders'
                ? 'border-emerald-600 text-emerald-700 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShoppingBag className="w-4 h-4 text-indigo-600" />
            <span>Pesanan Masuk ({orders.length})</span>
          </button>

          <button
            onClick={() => setAdminActiveTab('settings')}
            className={`py-3.5 px-3 flex items-center gap-2 border-b-2 transition whitespace-nowrap ${
              adminActiveTab === 'settings'
                ? 'border-emerald-600 text-emerald-700 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Settings className="w-4 h-4 text-slate-600" />
            <span>Edit Profil Perusahaan</span>
          </button>

          <button
            onClick={() => setAdminActiveTab('reviews')}
            className={`py-3.5 px-3 flex items-center gap-2 border-b-2 transition whitespace-nowrap ${
              adminActiveTab === 'reviews'
                ? 'border-emerald-600 text-emerald-700 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Star className="w-4 h-4 text-amber-500" />
            <span>Ulasan ({reviews.length})</span>
          </button>
          </div>
        </div>
      </header>

        {/* Tab Body Contents */}
        <main className="max-w-7xl mx-auto w-full p-5 sm:p-8 flex-1">
          
          {/* ========================================================
              TAB 1: ANALYTICS
             ======================================================== */}
          {adminActiveTab === 'analytics' && (
            <div className="space-y-6">
              
              {/* Quick Edit Shortcuts Banner */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 to-emerald-950 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
                <div>
                  <h4 className="font-bold text-sm flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    <span>Pintasan Edit Website Cepat</span>
                  </h4>
                  <p className="text-xs text-slate-300">
                    Ubah tampilan header, nomor WhatsApp tujuan, atau tambah barang baru dalam 1 klik.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setAdminActiveTab('header_wa')}
                    className="px-3 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold transition"
                  >
                    Edit Header & No. WA
                  </button>
                  <button
                    onClick={() => {
                      setAdminActiveTab('products');
                      handleOpenAdd();
                    }}
                    className="px-3 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white text-xs font-bold transition"
                  >
                    + Tambah Produk
                  </button>
                </div>
              </div>

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

                <div className="pt-6">
                  <div className="h-48 flex items-end justify-between gap-2 sm:gap-6 border-b border-slate-200 pb-2">
                    {dailyMetrics.map((item, idx) => {
                      const heightPercent = Math.min(100, Math.round((item.revenue / maxMetricRevenue) * 100));
                      return (
                        <div key={idx} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] bg-slate-900 text-white px-2 py-1 rounded whitespace-nowrap pointer-events-none mb-1 shadow-md">
                            Rp {(item.revenue / 1000000).toFixed(1)} Jt ({item.orderCount} order)
                          </div>
                          <div
                            style={{ height: `${heightPercent}%` }}
                            className="w-full max-w-[42px] bg-gradient-to-t from-emerald-600 to-teal-400 rounded-t-xl group-hover:brightness-110 transition-all shadow-xs"
                          />
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
              TAB 2: EDIT HEADER, HERO & NOMOR WHATSAPP
             ======================================================== */}
          {adminActiveTab === 'header_wa' && (
            <form onSubmit={handleSaveHeaderAndWa} className="space-y-6 max-w-4xl">
              
              {/* Live Header Preview */}
              <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
                <div className="px-5 py-2.5 bg-slate-100 border-b border-slate-200 flex items-center justify-between text-xs font-bold text-slate-600">
                  <span>Pratinjau Langsung Header Website</span>
                  {headerSaved && (
                    <span className="text-emerald-600 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Header & No. WA Diperbarui!
                    </span>
                  )}
                </div>

                {/* Simulated Banner */}
                {compAnnouncementActive && (
                  <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 text-white text-xs py-1.5 px-4 text-center font-medium">
                    {compAnnouncement} <span className="underline font-bold ml-1">{announcementCtaText}</span>
                  </div>
                )}

                {/* Simulated Navbar */}
                <div className="px-5 py-3.5 flex flex-wrap items-center justify-between gap-3 bg-white">
                  <div className="flex items-center gap-2.5">
                    {logoUrl ? (
                      <img src={logoUrl} alt="Logo" className="w-9 h-9 rounded-xl object-cover border border-slate-200" />
                    ) : (
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white font-bold text-lg">
                        {logoText || 'N'}
                      </div>
                    )}
                    <div>
                      <span className="text-base font-extrabold text-slate-900 block leading-tight font-heading">
                        {headerTitle} <span className="text-emerald-600">{headerTitleHighlight}</span>
                      </span>
                      <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider block">
                        {headerSubtitle}
                      </span>
                    </div>
                  </div>

                  {showWhatsAppInHeader && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
                      <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="font-mono">+{compWa.replace(/[^0-9]/g, '')}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Section 1: WhatsApp Integration Settings */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-5 h-5 text-emerald-600" />
                    <h4 className="font-bold text-base text-slate-900">
                      1. Pengaturan Nomor WhatsApp Resmi
                    </h4>
                  </div>
                  <a
                    href={`https://wa.me/${compWa.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(waDefaultMsg || 'Tes koneksi WhatsApp')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1"
                  >
                    <span>Tes Link WA</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Nomor WhatsApp Tujuan (Format Internasional, misal: 6281234567890):
                    </label>
                    <input
                      type="text"
                      required
                      value={compWa}
                      onChange={(e) => setCompWa(e.target.value)}
                      placeholder="6281234567890"
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono outline-none focus:border-emerald-500"
                    />
                    <p className="text-[11px] text-slate-400 mt-1">
                      Seluruh tombol "Tanya WA", form kontak, keranjang, dan tombol floating otomatis terhubung ke nomor ini.
                    </p>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Pesan Pembuka Default WhatsApp:
                    </label>
                    <input
                      type="text"
                      value={waDefaultMsg}
                      onChange={(e) => setWaDefaultMsg(e.target.value)}
                      placeholder="Halo Admin, saya ingin bertanya seputar produk..."
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-emerald-500"
                    />
                    <label className="flex items-center gap-2 text-xs text-slate-700 font-medium mt-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={showWhatsAppInHeader}
                        onChange={(e) => setShowWhatsAppInHeader(e.target.checked)}
                        className="rounded text-emerald-600"
                      />
                      <span>Tampilkan Nomor WhatsApp langsung di Header atas</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Section 2: Header Logo, Brand Title & Top Banner */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                  <LayoutTemplate className="w-5 h-5 text-blue-600" />
                  <h4 className="font-bold text-base text-slate-900">
                    2. Edit Header Website & Banner Pengumuman
                  </h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Judul Header (Teks Hitam):
                    </label>
                    <input
                      type="text"
                      value={headerTitle}
                      onChange={(e) => setHeaderTitle(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-emerald-500 font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Sorotan Header (Teks Hijau):
                    </label>
                    <input
                      type="text"
                      value={headerTitleHighlight}
                      onChange={(e) => setHeaderTitleHighlight(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-emerald-500 font-bold text-emerald-700"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Subjudul Kecil Header:
                    </label>
                    <input
                      type="text"
                      value={headerSubtitle}
                      onChange={(e) => setHeaderSubtitle(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Inisial Ikon Logo (1-2 Huruf):
                    </label>
                    <input
                      type="text"
                      maxLength={2}
                      value={logoText}
                      onChange={(e) => setLogoText(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-emerald-500 font-bold text-center"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      URL Gambar Logo Custom (Opsional, kosongkan jika pakai inisial):
                    </label>
                    <input
                      type="url"
                      value={logoUrl}
                      onChange={(e) => setLogoUrl(e.target.value)}
                      placeholder="https://example.com/logo.png"
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-slate-700">
                      Teks Banner Promo Paling Atas:
                    </label>
                    <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer font-medium">
                      <input
                        type="checkbox"
                        checked={compAnnouncementActive}
                        onChange={(e) => setCompAnnouncementActive(e.target.checked)}
                        className="rounded text-emerald-600"
                      />
                      <span>Aktifkan Banner Pengumuman</span>
                    </label>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                    <div className="sm:col-span-3">
                      <input
                        type="text"
                        value={compAnnouncement}
                        onChange={(e) => setCompAnnouncement(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        value={announcementCtaText}
                        onChange={(e) => setAnnouncementCtaText(e.target.value)}
                        placeholder="Teks Link CTA"
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-emerald-500 font-semibold"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 3: Hero Headline & Description */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  <h4 className="font-bold text-base text-slate-900">
                    3. Edit Teks Hero Section (Bagian Pembuka Utama)
                  </h4>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Badge Atas Hero:
                  </label>
                  <input
                    type="text"
                    value={heroBadge}
                    onChange={(e) => setHeroBadge(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Judul Utama Hero (Bagian 1):
                    </label>
                    <input
                      type="text"
                      value={heroTitlePrefix}
                      onChange={(e) => setHeroTitlePrefix(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-emerald-500 font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Judul Sorotan Warna (Bagian 2):
                    </label>
                    <input
                      type="text"
                      value={heroTitleHighlight}
                      onChange={(e) => setHeroTitleHighlight(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-emerald-500 font-bold text-emerald-700"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Deskripsi Paragraf Hero:
                  </label>
                  <textarea
                    rows={3}
                    value={heroDescription}
                    onChange={(e) => setHeroDescription(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-emerald-500 leading-relaxed"
                  />
                </div>
              </div>

              {/* Sticky Submit Row */}
              <div className="flex items-center justify-between pt-2">
                {headerSaved ? (
                  <span className="text-xs text-emerald-600 font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> Semua perubahan Header, Hero & WhatsApp berhasil disimpan ke website!
                  </span>
                ) : (
                  <span className="text-xs text-slate-500">Perubahan langsung tampil di halaman depan setelah disimpan.</span>
                )}
                <button
                  type="submit"
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-md transition"
                >
                  <Save className="w-4 h-4" />
                  <span>Simpan Header & No. WhatsApp</span>
                </button>
              </div>

            </form>
          )}

          {/* ========================================================
              TAB 3: PRODUCTS CMS
             ======================================================== */}
          {adminActiveTab === 'products' && (
            <div className="space-y-4">
              
              {/* Product Toolbar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200">
                <div className="flex items-center gap-3 flex-1">
                  <span className="font-bold text-sm text-slate-800 whitespace-nowrap">
                    Katalog ({products.length} Produk)
                  </span>
                  <div className="relative flex-1 max-w-xs">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={productSearch}
                      onChange={(e) => setProductSearch(e.target.value)}
                      placeholder="Cari nama produk atau SKU..."
                      className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>
                
                <button
                  onClick={handleOpenAdd}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Produk Baru</span>
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
                        <th className="p-3.5">Badge & Spek</th>
                        <th className="p-3.5 text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredAdminProducts.map((p) => (
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
                            {p.originalPrice && p.originalPrice > p.price && (
                              <span className="block text-[10px] font-normal text-slate-400 line-through">
                                Rp {p.originalPrice.toLocaleString('id-ID')}
                              </span>
                            )}
                          </td>

                          <td className="p-3.5">
                            <span className={`px-2.5 py-1 rounded-lg font-bold text-xs ${
                              p.stock > 15 ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                            }`}>
                              {p.stock} unit
                            </span>
                          </td>

                          <td className="p-3.5 space-y-1">
                            <div>
                              {p.featured && (
                                <span className="inline-block bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.2 rounded mr-1">
                                  Unggulan
                                </span>
                              )}
                              {p.bestSeller && (
                                <span className="inline-block bg-rose-100 text-rose-800 text-[10px] font-bold px-2 py-0.2 rounded mr-1">
                                  Terlaris
                                </span>
                              )}
                              {p.isNew && (
                                <span className="inline-block bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.2 rounded">
                                  Baru
                                </span>
                              )}
                            </div>
                            <span className="block text-[10px] text-slate-400">
                              {p.specifications.length} spesifikasi • {p.images.length} foto
                            </span>
                          </td>

                          <td className="p-3.5 text-right whitespace-nowrap space-x-1">
                            <button
                              onClick={() => handleOpenEdit(p)}
                              className="px-2.5 py-1.5 text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg font-semibold inline-flex items-center gap-1 transition"
                              title="Edit Produk"
                            >
                              <Edit className="w-3.5 h-3.5" />
                              <span>Edit</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => setDeletingProduct(p)}
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
              TAB 4: ORDERS MANAGEMENT
             ======================================================== */}
          {adminActiveTab === 'orders' && (
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
                          href={formatWhatsAppUrl(`Halo Kak ${ord.customerName}, kami dari Admin ${companySettings.companyName} mengabarkan pesanan No. ${ord.orderNumber} dengan status: ${ord.orderStatus.toUpperCase()}`)}
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
              TAB 5: COMPANY PROFILE CMS
             ======================================================== */}
          {adminActiveTab === 'settings' && (
            <form onSubmit={handleSaveSettings} className="space-y-6 max-w-3xl">
              
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <h4 className="font-bold text-base text-slate-900">
                    Informasi & Identitas Perusahaan (Company Knowledge)
                  </h4>
                  {settingsSaved && (
                    <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Profil Perusahaan Tersimpan!
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
                      Nomor Telepon Kantor:
                    </label>
                    <input
                      type="text"
                      value={compPhone}
                      onChange={(e) => setCompPhone(e.target.value)}
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

                <button
                  type="submit"
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-md transition"
                >
                  <Save className="w-4 h-4" />
                  <span>Simpan Profil Perusahaan</span>
                </button>

              </div>

              {/* Backup, Transfer & Publish Sync Card */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
                  <div>
                    <h4 className="font-bold text-base text-slate-900">
                      Sinkronisasi Antar Browser & Publish Permanen
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Perubahan di /admin otomatis sinkron antar-tab di browser yang sama. Untuk memindahkan data ke browser/profil Chrome lain atau memperbarui data bawaan saat publish ulang ke Netlify, gunakan tombol di bawah.
                    </p>
                  </div>
                </div>

                {syncNotice && (
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{syncNotice}</span>
                  </div>
                )}

                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={handleExportJson}
                    className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-2 transition"
                  >
                    <Download className="w-4 h-4 text-emerald-400" />
                    <span>Export Backup (.json)</span>
                  </button>

                  <label className="px-4 py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold flex items-center gap-2 cursor-pointer transition">
                    <Upload className="w-4 h-4 text-emerald-600" />
                    <span>Import Backup (.json)</span>
                    <input
                      type="file"
                      accept=".json,application/json"
                      onChange={handleImportJson}
                      className="hidden"
                    />
                  </label>

                  <button
                    type="button"
                    onClick={handleDownloadInitialDataTs}
                    className="px-4 py-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200 text-xs font-bold flex items-center gap-2 transition"
                  >
                    <FileCode className="w-4 h-4 text-blue-600" />
                    <span>Download initialData.ts (Publish)</span>
                  </button>
                </div>
              </div>

            </form>
          )}

          {/* ========================================================
              TAB 6: REVIEWS MODERATION
             ======================================================== */}
          {adminActiveTab === 'reviews' && (
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

        </main>

      {/* PRODUCT ADD / EDIT POPUP MODAL */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/80 animate-in fade-in">
          <div className="bg-white w-full max-w-2xl max-h-[92vh] rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
            <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Package className="w-5 h-5 text-emerald-600" />
                <h4 className="font-bold text-sm sm:text-base text-slate-900">
                  {editingProduct ? 'Edit Informasi & Spesifikasi Produk' : 'Tambah Produk Baru ke Katalog'}
                </h4>
              </div>
              <button onClick={() => setIsProductModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="p-5 sm:p-6 overflow-y-auto space-y-5 text-xs">
              
              {/* Basic Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Nama Produk (Indonesia) *</label>
                  <input
                    type="text"
                    required
                    value={prodName}
                    onChange={(e) => setProdName(e.target.value)}
                    placeholder="Contoh: Nusantara Headphone Pro"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-emerald-500 font-semibold"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Nama Produk (English - Opsional)</label>
                  <input
                    type="text"
                    value={prodNameEn}
                    onChange={(e) => setProdNameEn(e.target.value)}
                    placeholder="Opsional untuk mode multi-bahasa"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                    <option value="__custom__">+ Tulis Kategori Baru...</option>
                  </select>
                  {prodCategory === '__custom__' && (
                    <input
                      type="text"
                      required
                      value={prodCustomCategory}
                      onChange={(e) => setProdCustomCategory(e.target.value)}
                      placeholder="Masukkan nama kategori baru"
                      className="mt-2 w-full p-2.5 bg-emerald-50 border border-emerald-300 rounded-xl outline-none focus:border-emerald-500"
                    />
                  )}
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
                    min={0}
                    value={prodPrice}
                    onChange={(e) => setProdPrice(Number(e.target.value))}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-emerald-500 font-bold"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Harga Coret (Rp)</label>
                  <input
                    type="number"
                    min={0}
                    value={prodOriginalPrice}
                    onChange={(e) => setProdOriginalPrice(Number(e.target.value))}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Jumlah Stok</label>
                  <input
                    type="number"
                    min={0}
                    value={prodStock}
                    onChange={(e) => setProdStock(Number(e.target.value))}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-emerald-500 font-bold"
                  />
                </div>
              </div>

              {/* Multiple Images Editor */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800 flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4 text-emerald-600" />
                    <span>Foto Produk (URL Gambar)</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setProdImages([...prodImages, ''])}
                    className="px-2.5 py-1 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg text-[11px] font-bold text-slate-700"
                  >
                    + Tambah Foto
                  </button>
                </div>

                <div className="space-y-2">
                  {prodImages.map((imgUrl, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      {imgUrl && (
                        <img
                          src={imgUrl}
                          alt="Preview"
                          className="w-9 h-9 rounded-lg object-cover border border-slate-200 shrink-0 bg-white"
                        />
                      )}
                      <input
                        type="url"
                        value={imgUrl}
                        onChange={(e) => {
                          const updated = [...prodImages];
                          updated[idx] = e.target.value;
                          setProdImages(updated);
                        }}
                        placeholder="https://images.unsplash.com/..."
                        className="flex-1 p-2 bg-white border border-slate-200 rounded-xl outline-none focus:border-emerald-500"
                      />
                      {prodImages.length > 1 && (
                        <button
                          type="button"
                          onClick={() => setProdImages(prodImages.filter((_, i) => i !== idx))}
                          className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
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

              {/* Dynamic Specifications Editor */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800 flex items-center gap-1.5">
                    <ListChecks className="w-4 h-4 text-blue-600" />
                    <span>Spesifikasi Teknis Produk</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setProdSpecs([...prodSpecs, { label: '', value: '' }])}
                    className="px-2.5 py-1 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg text-[11px] font-bold text-slate-700"
                  >
                    + Tambah Baris Spek
                  </button>
                </div>

                <div className="space-y-2">
                  {prodSpecs.map((spec, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={spec.label}
                        onChange={(e) => {
                          const updated = [...prodSpecs];
                          updated[idx] = { ...updated[idx], label: e.target.value };
                          setProdSpecs(updated);
                        }}
                        placeholder="Label (misal: Baterai)"
                        className="w-1/3 p-2 bg-white border border-slate-200 rounded-xl outline-none focus:border-emerald-500 font-semibold"
                      />
                      <input
                        type="text"
                        value={spec.value}
                        onChange={(e) => {
                          const updated = [...prodSpecs];
                          updated[idx] = { ...updated[idx], value: e.target.value };
                          setProdSpecs(updated);
                        }}
                        placeholder="Nilai (misal: 450 mAh / 14 Hari)"
                        className="flex-1 p-2 bg-white border border-slate-200 rounded-xl outline-none focus:border-emerald-500"
                      />
                      <button
                        type="button"
                        onClick={() => setProdSpecs(prodSpecs.filter((_, i) => i !== idx))}
                        className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Toggles */}
              <div className="flex flex-wrap gap-4 pt-2 border-t border-slate-100">
                <label className="flex items-center gap-2 cursor-pointer font-medium">
                  <input
                    type="checkbox"
                    checked={prodFeatured}
                    onChange={(e) => setProdFeatured(e.target.checked)}
                    className="rounded text-emerald-600"
                  />
                  <span>Produk Unggulan</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer font-medium">
                  <input
                    type="checkbox"
                    checked={prodBestSeller}
                    onChange={(e) => setProdBestSeller(e.target.checked)}
                    className="rounded text-emerald-600"
                  />
                  <span>Terlaris (Best Seller)</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer font-medium">
                  <input
                    type="checkbox"
                    checked={prodIsNew}
                    onChange={(e) => setProdIsNew(e.target.checked)}
                    className="rounded text-emerald-600"
                  />
                  <span>Label Baru (New)</span>
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
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold shadow-sm"
                >
                  Simpan Produk
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* IN-APP DELETE CONFIRMATION MODAL (Iframe-safe, no window.confirm) */}
      {deletingProduct && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/80 animate-in fade-in">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-slate-200 overflow-hidden p-6 space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                <Trash2 className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-base text-slate-900">
                  Hapus Produk dari Katalog?
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Produk <strong>"{deletingProduct.name}"</strong> akan dihapus dari katalog website di browser ini.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setDeletingProduct(null)}
                className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={() => {
                  deleteProduct(deletingProduct.id);
                  setDeletingProduct(null);
                }}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-sm transition"
              >
                Ya, Hapus Produk
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
