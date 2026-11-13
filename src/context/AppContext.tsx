import React, { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';
import {
  Product,
  CartItem,
  Order,
  Review,
  CompanySettings,
  AppNotification,
  User,
  Language,
  DailySalesMetric,
  OrderStatus,
  ECatalogItem,
  DistributorBrand
} from '../types';
import {
  initialProducts,
  initialCompanySettings,
  initialReviews,
  initialOrders,
  initialDailySalesMetrics,
  initialECatalogs,
  initialDistributorBrands
} from '../data/initialData';
import { translations } from '../locales/translations';

export type AdminTab =
  | 'analytics'
  | 'header_wa'
  | 'content'
  | 'products'
  | 'ecatalogs'
  | 'brands'
  | 'orders'
  | 'settings'
  | 'reviews';
export type AuthTab = 'signin' | 'signup' | 'forgot';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations.id;

  // Route Navigation (/ vs /admin)
  isAdminRoute: boolean;
  navigateTo: (path: '/' | '/admin') => void;

  // Products & Filtering
  products: Product[];
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  badgeFilter: 'all' | 'featured' | 'bestseller' | 'promo' | 'new';
  setBadgeFilter: (badge: 'all' | 'featured' | 'bestseller' | 'promo' | 'new') => void;
  sortBy: 'popular' | 'price_low' | 'price_high' | 'rating' | 'newest';
  setSortBy: (sort: 'popular' | 'price_low' | 'price_high' | 'rating' | 'newest') => void;
  selectedProduct: Product | null;
  openProductDetail: (prod: Product) => void;
  closeProductDetail: () => void;

  // E-Catalogs
  eCatalogs: ECatalogItem[];
  selectedECatalog: ECatalogItem | null;
  setSelectedECatalog: (cat: ECatalogItem | null) => void;
  addECatalog: (catalog: Omit<ECatalogItem, 'id'>) => void;
  updateECatalog: (catalog: ECatalogItem) => void;
  deleteECatalog: (catalogId: string) => void;

  // Distributor Brands & Logos
  distributorBrands: DistributorBrand[];
  addDistributorBrand: (brand: Omit<DistributorBrand, 'id'>) => void;
  updateDistributorBrand: (brand: DistributorBrand) => void;
  deleteDistributorBrand: (brandId: string) => void;

  // Cart (retained for legacy/compatibility if needed)
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  cartTotal: number;
  cartItemCount: number;

  // Orders & Inquiries
  orders: Order[];
  createOrder: (orderInput: Omit<Order, 'id' | 'orderNumber' | 'createdAt'>) => Promise<Order>;
  updateOrderStatus: (orderId: string, status: OrderStatus, trackingNumber?: string) => void;

  // Reviews
  reviews: Review[];
  getProductReviews: (productId: string) => Review[];
  addReview: (reviewInput: Omit<Review, 'id' | 'date' | 'helpfulCount'>) => void;
  likeReview: (reviewId: string) => void;

  // Company Settings & CMS
  companySettings: CompanySettings;
  updateCompanySettings: (settings: Partial<CompanySettings>) => void;

  // Admin CMS for Products & Data Sync
  addProduct: (product: Omit<Product, 'id' | 'rating' | 'reviewCount'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  importSiteData: (data: {
    products?: Product[];
    companySettings?: Partial<CompanySettings>;
    eCatalogs?: ECatalogItem[];
    distributorBrands?: DistributorBrand[];
  }) => void;

  // Notifications
  notifications: AppNotification[];
  unreadNotificationCount: number;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  playNotificationSound: () => void;

  // Customer Auth
  currentUser: User | null;
  login: (email: string, role?: 'customer' | 'admin', name?: string) => void;
  logout: () => void;

  // Dedicated Admin Portal Auth (/admin)
  isAdminAuthenticated: boolean;
  loginAdmin: () => void;
  logoutAdmin: () => void;
  adminActiveTab: AdminTab;
  setAdminActiveTab: (tab: AdminTab) => void;

  // Modals & Navigation
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isAuthOpen: boolean;
  setIsAuthOpen: (open: boolean) => void;
  authInitialTab: AuthTab;
  setAuthInitialTab: (tab: AuthTab) => void;
  isOrdersOpen: boolean;
  setIsOrdersOpen: (open: boolean) => void;
  isCompanyModalOpen: boolean;
  setIsCompanyModalOpen: (open: boolean) => void;

  // WhatsApp Helpers
  formatWhatsAppUrl: (message: string) => string;
  createWhatsAppProductInquiryUrl: (product: Product) => string;
  createWhatsAppCartOrderUrl: () => string;

  // Daily Sales Metrics
  dailyMetrics: DailySalesMetric[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  lang: 'api_lang_v1',
  products: 'api_products_v1',
  company: 'api_company_v1',
  ecatalogs: 'api_ecatalogs_v1',
  brands: 'api_brands_v2',
  reviews: 'api_reviews_v1',
  orders: 'api_orders_v1',
  cart: 'api_cart_v1',
  adminAuth: 'api_admin_auth_v1',
  user: 'api_user_v1'
};

const playChimeTone = () => {
  try {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();

    const now = ctx.currentTime;
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(587.33, now);
    osc1.frequency.exponentialRampToValueAtTime(880, now + 0.15);

    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(880, now);
    osc2.frequency.exponentialRampToValueAtTime(1174.66, now + 0.2);

    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.6);
    osc2.stop(now + 0.6);
  } catch {
    // Ignore audio blocks
  }
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Language
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.lang);
    return saved === 'en' || saved === 'id' ? saved : 'id';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(STORAGE_KEYS.lang, lang);
  };

  const t = translations[language];

  const isExternalSyncRef = useRef(false);
  const syncChannelRef = useRef<BroadcastChannel | null>(null);
  const tabIdRef = useRef<string>(`tab-${Math.random().toString(36).slice(2)}`);

  const broadcastSync = (key: string, payload: unknown) => {
    try {
      syncChannelRef.current?.postMessage({
        senderId: tabIdRef.current,
        key,
        payload
      });
    } catch {
      // Ignore if BroadcastChannel is unavailable
    }
  };

  // Products
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.products);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // ignore
      }
    }
    return initialProducts;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.products, JSON.stringify(products));
    if (!isExternalSyncRef.current) {
      broadcastSync(STORAGE_KEYS.products, products);
    }
  }, [products]);

  // E-Catalogs
  const [eCatalogs, setECatalogs] = useState<ECatalogItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ecatalogs);
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as ECatalogItem[];
        if (Array.isArray(parsed)) {
          return parsed.map((item) => {
            const fallback = initialECatalogs.find((init) => init.id === item.id);
            return {
              ...item,
              pdfUrl: item.pdfUrl ?? fallback?.pdfUrl ?? `/catalogs/${item.code}.pdf`,
              pdfFileName: item.pdfFileName ?? fallback?.pdfFileName ?? `${item.code}.pdf`
            };
          });
        }
      } catch {
        // ignore
      }
    }
    return initialECatalogs;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ecatalogs, JSON.stringify(eCatalogs));
    if (!isExternalSyncRef.current) {
      broadcastSync(STORAGE_KEYS.ecatalogs, eCatalogs);
    }
  }, [eCatalogs]);

  // Distributor Brands & Logos
  const [distributorBrands, setDistributorBrands] = useState<DistributorBrand[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.brands);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      } catch {
        // ignore
      }
    }
    return initialDistributorBrands;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.brands, JSON.stringify(distributorBrands));
    if (!isExternalSyncRef.current) {
      broadcastSync(STORAGE_KEYS.brands, distributorBrands);
    }
  }, [distributorBrands]);

  // Company Settings
  const [companySettings, setCompanySettings] = useState<CompanySettings>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.company);
    if (saved) {
      try {
        return { ...initialCompanySettings, ...JSON.parse(saved) };
      } catch {
        // ignore
      }
    }
    return initialCompanySettings;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.company, JSON.stringify(companySettings));
    if (!isExternalSyncRef.current) {
      broadcastSync(STORAGE_KEYS.company, companySettings);
    }
  }, [companySettings]);

  // Reviews
  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.reviews);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // ignore
      }
    }
    return initialReviews;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.reviews, JSON.stringify(reviews));
    if (!isExternalSyncRef.current) {
      broadcastSync(STORAGE_KEYS.reviews, reviews);
    }
  }, [reviews]);

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.orders);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // ignore
      }
    }
    return initialOrders;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.orders, JSON.stringify(orders));
    if (!isExternalSyncRef.current) {
      broadcastSync(STORAGE_KEYS.orders, orders);
    }
  }, [orders]);

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.cart);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // ignore
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(cart));
  }, [cart]);

  // Real-time Cross-Tab Synchronization
  useEffect(() => {
    const applySyncedData = (key: string, payload: unknown) => {
      isExternalSyncRef.current = true;
      if (key === STORAGE_KEYS.products && Array.isArray(payload)) {
        setProducts(payload as Product[]);
      } else if (key === STORAGE_KEYS.ecatalogs && Array.isArray(payload)) {
        setECatalogs(payload as ECatalogItem[]);
      } else if (key === STORAGE_KEYS.brands && Array.isArray(payload)) {
        setDistributorBrands(payload as DistributorBrand[]);
      } else if (key === STORAGE_KEYS.company && payload && typeof payload === 'object') {
        setCompanySettings({ ...initialCompanySettings, ...(payload as Partial<CompanySettings>) });
      } else if (key === STORAGE_KEYS.orders && Array.isArray(payload)) {
        setOrders(payload as Order[]);
      } else if (key === STORAGE_KEYS.reviews && Array.isArray(payload)) {
        setReviews(payload as Review[]);
      }
      setTimeout(() => {
        isExternalSyncRef.current = false;
      }, 0);
    };

    const handleStorage = (e: StorageEvent) => {
      if (!e.key || !e.newValue) return;
      if (
        [
          STORAGE_KEYS.products,
          STORAGE_KEYS.ecatalogs,
          STORAGE_KEYS.brands,
          STORAGE_KEYS.company,
          STORAGE_KEYS.orders,
          STORAGE_KEYS.reviews
        ].includes(e.key)
      ) {
        try {
          applySyncedData(e.key, JSON.parse(e.newValue));
        } catch {
          // ignore
        }
      }
    };

    window.addEventListener('storage', handleStorage);

    if (typeof BroadcastChannel !== 'undefined') {
      const channel = new BroadcastChannel('api_sync_channel');
      syncChannelRef.current = channel;
      channel.onmessage = (event) => {
        const data = event.data;
        if (!data || data.senderId === tabIdRef.current) return;
        applySyncedData(data.key, data.payload);
      };
    }

    return () => {
      window.removeEventListener('storage', handleStorage);
      syncChannelRef.current?.close();
      syncChannelRef.current = null;
    };
  }, []);

  // Notifications
  const [notifications, setNotifications] = useState<AppNotification[]>([
    {
      id: 'notif-init-1',
      title: 'Selamat Datang di PT Asiaparts Indotech',
      message: 'Sistem siap menerima konsultasi teknis dan pengadaan komponen via WhatsApp.',
      type: 'system',
      timestamp: 'Hari ini',
      read: false
    }
  ]);

  // Daily Sales Metrics
  const [dailyMetrics, setDailyMetrics] = useState<DailySalesMetric[]>(initialDailySalesMetrics);

  // Route Detection (/admin vs /)
  const checkIsAdminRoute = () => {
    const cleanPath = window.location.pathname.replace(/\/+$/, '').toLowerCase();
    const params = new URLSearchParams(window.location.search);
    return (
      cleanPath === '/admin' ||
      cleanPath.endsWith('/admin') ||
      cleanPath.endsWith('/admin.html') ||
      window.location.hash === '#/admin' ||
      params.has('admin') ||
      params.get('page') === 'admin'
    );
  };

  const [isAdminRoute, setIsAdminRoute] = useState<boolean>(checkIsAdminRoute);

  useEffect(() => {
    const handleRouteChange = () => {
      setIsAdminRoute(checkIsAdminRoute());
    };
    window.addEventListener('popstate', handleRouteChange);
    window.addEventListener('hashchange', handleRouteChange);
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
      window.removeEventListener('hashchange', handleRouteChange);
    };
  }, []);

  const navigateTo = (path: '/' | '/admin') => {
    window.history.pushState({}, '', path);
    setIsAdminRoute(path === '/admin');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Dedicated Admin Authentication (/admin portal)
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem(STORAGE_KEYS.adminAuth) === 'true';
  });

  const loginAdmin = () => {
    setIsAdminAuthenticated(true);
    localStorage.setItem(STORAGE_KEYS.adminAuth, 'true');
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    localStorage.removeItem(STORAGE_KEYS.adminAuth);
  };

  // Auth User
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.user);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.role === 'admin' ? null : parsed;
      } catch {
        // ignore
      }
    }
    return null;
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(STORAGE_KEYS.user);
    }
  }, [currentUser]);

  // Filter & Search
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [badgeFilter, setBadgeFilter] = useState<'all' | 'featured' | 'bestseller' | 'promo' | 'new'>('all');
  const [sortBy, setSortBy] = useState<'popular' | 'price_low' | 'price_high' | 'rating' | 'newest'>('popular');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedECatalog, setSelectedECatalog] = useState<ECatalogItem | null>(null);

  // Modals state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authInitialTab, setAuthInitialTab] = useState<AuthTab>('signin');
  const [adminActiveTab, setAdminActiveTab] = useState<AdminTab>('analytics');
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [isCompanyModalOpen, setIsCompanyModalOpen] = useState(false);

  const openProductDetail = (prod: Product) => {
    setSelectedProduct(prod);
  };

  const closeProductDetail = () => {
    setSelectedProduct(null);
  };

  // E-Catalog CRUD
  const addECatalog = (catalogInput: Omit<ECatalogItem, 'id'>) => {
    const newItem: ECatalogItem = {
      ...catalogInput,
      id: `cat-${Date.now()}`
    };
    setECatalogs((prev) => [newItem, ...prev]);
  };

  const updateECatalog = (updated: ECatalogItem) => {
    setECatalogs((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
  };

  const deleteECatalog = (catalogId: string) => {
    setECatalogs((prev) => prev.filter((c) => c.id !== catalogId));
  };

  // Distributor Brand CRUD
  const addDistributorBrand = (brandInput: Omit<DistributorBrand, 'id'>) => {
    const newBrand: DistributorBrand = {
      ...brandInput,
      id: `brand-${Date.now()}`
    };
    setDistributorBrands((prev) => [...prev, newBrand]);
  };

  const updateDistributorBrand = (updatedBrand: DistributorBrand) => {
    setDistributorBrands((prev) =>
      prev.map((b) => (b.id === updatedBrand.id ? updatedBrand : b))
    );
  };

  const deleteDistributorBrand = (brandId: string) => {
    setDistributorBrands((prev) => prev.filter((b) => b.id !== brandId));
  };

  // Cart Actions
  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  const playNotificationSound = () => {
    playChimeTone();
  };

  // Create Order / RFQ Inquiry
  const createOrder = async (
    orderInput: Omit<Order, 'id' | 'orderNumber' | 'createdAt'>
  ): Promise<Order> => {
    const timestampStr =
      new Date().toLocaleString('id-ID', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      }) + ' WIB';

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newOrderNumber = `API-${new Date().getFullYear()}${String(
      new Date().getMonth() + 1
    ).padStart(2, '0')}-${randomSuffix}`;
    const newOrderId = `ord-${Date.now()}`;

    const newOrder: Order = {
      ...orderInput,
      id: newOrderId,
      orderNumber: newOrderNumber,
      createdAt: timestampStr
    };

    setProducts((prev) =>
      prev.map((p) => {
        const orderedItem = orderInput.items.find((item) => item.productId === p.id);
        if (orderedItem) {
          return { ...p, stock: Math.max(0, p.stock - orderedItem.quantity) };
        }
        return p;
      })
    );

    setOrders((prev) => [newOrder, ...prev]);

    const newNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      title: `Permintaan Baru #${newOrderNumber}`,
      message: `${newOrder.customerName} mengirim permintaan senilai Rp ${newOrder.total.toLocaleString(
        'id-ID'
      )}`,
      type: 'order',
      timestamp: 'Baru saja',
      read: false,
      orderId: newOrderId
    };

    setNotifications((prev) => [newNotif, ...prev]);

    setDailyMetrics((prev) => {
      const lastIndex = prev.length - 1;
      const updated = [...prev];
      if (lastIndex >= 0) {
        updated[lastIndex] = {
          ...updated[lastIndex],
          revenue: updated[lastIndex].revenue + newOrder.total,
          orderCount: updated[lastIndex].orderCount + 1
        };
      }
      return updated;
    });

    playNotificationSound();
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus, trackingNumber?: string) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          return {
            ...ord,
            orderStatus: status,
            trackingNumber: trackingNumber || ord.trackingNumber,
            paymentStatus: status === 'cancelled' ? 'failed' : ord.paymentStatus
          };
        }
        return ord;
      })
    );
  };

  // Reviews
  const getProductReviews = (productId: string) => {
    return reviews.filter((r) => r.productId === productId);
  };

  const addReview = (reviewInput: Omit<Review, 'id' | 'date' | 'helpfulCount'>) => {
    const newRev: Review = {
      ...reviewInput,
      id: `rev-${Date.now()}`,
      date: 'Baru saja',
      helpfulCount: 0
    };

    setReviews((prev) => [newRev, ...prev]);

    setProducts((prev) =>
      prev.map((prod) => {
        if (prod.id === reviewInput.productId) {
          const currentReviews = reviews.filter((r) => r.productId === prod.id);
          const totalRating =
            currentReviews.reduce((sum, r) => sum + r.rating, 0) + reviewInput.rating;
          const newCount = currentReviews.length + 1;
          const avg = Number((totalRating / newCount).toFixed(1));
          return { ...prod, rating: avg, reviewCount: newCount };
        }
        return prod;
      })
    );

    const newNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      title: 'Ulasan Baru Diterima',
      message: `${reviewInput.userName} memberi rating ${reviewInput.rating}/5`,
      type: 'review',
      timestamp: 'Baru saja',
      read: false
    };
    setNotifications((prev) => [newNotif, ...prev]);
    playNotificationSound();
  };

  const likeReview = (reviewId: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === reviewId ? { ...r, helpfulCount: r.helpfulCount + 1 } : r))
    );
  };

  const updateCompanySettings = (settings: Partial<CompanySettings>) => {
    setCompanySettings((prev) => ({ ...prev, ...settings }));
  };

  const addProduct = (productInput: Omit<Product, 'id' | 'rating' | 'reviewCount'>) => {
    const newProduct: Product = {
      ...productInput,
      id: `prod-${Date.now()}`,
      rating: 5.0,
      reviewCount: 0
    };
    setProducts((prev) => [newProduct, ...prev]);
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)));
  };

  const deleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  const importSiteData = (data: {
    products?: Product[];
    companySettings?: Partial<CompanySettings>;
    eCatalogs?: ECatalogItem[];
    distributorBrands?: DistributorBrand[];
  }) => {
    if (Array.isArray(data.products)) {
      setProducts(data.products);
    }
    if (Array.isArray(data.eCatalogs)) {
      setECatalogs(data.eCatalogs);
    }
    if (Array.isArray(data.distributorBrands)) {
      setDistributorBrands(data.distributorBrands);
    }
    if (data.companySettings && typeof data.companySettings === 'object') {
      setCompanySettings((prev) => ({ ...prev, ...data.companySettings }));
    }
  };

  const unreadNotificationCount = notifications.filter((n) => !n.read).length;

  const markNotificationRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const login = (email: string, _role: 'customer' | 'admin' = 'customer', name?: string) => {
    const user: User = {
      id: `user-${Date.now()}`,
      name: name || email.split('@')[0],
      email,
      phone: '08123456789',
      role: 'customer'
    };
    setCurrentUser(user);
    setIsAuthOpen(false);
  };

  const logout = () => {
    setCurrentUser(null);
    setIsOrdersOpen(false);
  };

  // WhatsApp Helpers
  const formatWhatsAppUrl = (message: string) => {
    const cleanNumber = companySettings.whatsappNumber.replace(/[^0-9]/g, '');
    const encoded = encodeURIComponent(message);
    return `https://wa.me/${cleanNumber}?text=${encoded}`;
  };

  const createWhatsAppProductInquiryUrl = (product: Product) => {
    const text = `Halo Tim Sales *${companySettings.companyName}*, saya tertarik dan ingin menanyakan informasi produk berikut:

• *Nama Produk:* ${product.name}
• *Part Number / SKU:* ${product.sku}
• *Kategori:* ${product.category}

Mohon informasinya lebih lanjut. Terima kasih!`;
    return formatWhatsAppUrl(text);
  };

  const createWhatsAppCartOrderUrl = () => {
    if (cart.length === 0) {
      return formatWhatsAppUrl(
        `Halo Tim ${companySettings.companyName}, saya ingin konsultasi pengadaan produk.`
      );
    }
    const itemsList = cart
      .map(
        (item, idx) =>
          `${idx + 1}. ${item.product.name} (${item.product.sku}) x${item.quantity} — Rp ${(
            item.product.price * item.quantity
          ).toLocaleString('id-ID')}`
      )
      .join('\n');

    const text = `Halo Tim Sales *${companySettings.companyName}*, saya ingin mengajukan permintaan penawaran (RFQ) untuk item berikut:

${itemsList}

Estimasi Total: Rp ${cartTotal.toLocaleString('id-ID')}

Mohon konfirmasi ketersediaan stok dan penawaran resmi. Terima kasih!`;
    return formatWhatsAppUrl(text);
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        t,
        isAdminRoute,
        navigateTo,
        products,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        badgeFilter,
        setBadgeFilter,
        sortBy,
        setSortBy,
        selectedProduct,
        openProductDetail,
        closeProductDetail,
        eCatalogs,
        selectedECatalog,
        setSelectedECatalog,
        addECatalog,
        updateECatalog,
        deleteECatalog,
        distributorBrands,
        addDistributorBrand,
        updateDistributorBrand,
        deleteDistributorBrand,
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartTotal,
        cartItemCount,
        orders,
        createOrder,
        updateOrderStatus,
        reviews,
        getProductReviews,
        addReview,
        likeReview,
        companySettings,
        updateCompanySettings,
        addProduct,
        updateProduct,
        deleteProduct,
        importSiteData,
        notifications,
        unreadNotificationCount,
        markNotificationRead,
        markAllNotificationsRead,
        playNotificationSound,
        currentUser,
        login,
        logout,
        isAdminAuthenticated,
        loginAdmin,
        logoutAdmin,
        adminActiveTab,
        setAdminActiveTab,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isAuthOpen,
        setIsAuthOpen,
        authInitialTab,
        setAuthInitialTab,
        isOrdersOpen,
        setIsOrdersOpen,
        isCompanyModalOpen,
        setIsCompanyModalOpen,
        formatWhatsAppUrl,
        createWhatsAppProductInquiryUrl,
        createWhatsAppCartOrderUrl,
        dailyMetrics
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
