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
  OrderStatus 
} from '../types';
import { 
  initialProducts, 
  initialCompanySettings, 
  initialReviews, 
  initialOrders, 
  initialDailySalesMetrics 
} from '../data/initialData';
import { translations } from '../locales/translations';

export type AdminTab = 'analytics' | 'products' | 'orders' | 'header_wa' | 'settings' | 'reviews';
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
  
  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  cartTotal: number;
  cartItemCount: number;
  
  // Orders & Checkout
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
  importSiteData: (data: { products?: Product[]; companySettings?: Partial<CompanySettings> }) => void;
  
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

// Safe Audio Chime using Web Audio API (cross-browser, no external audio file failure risk)
const playChimeTone = () => {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    
    const now = ctx.currentTime;
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(587.33, now); // D5
    osc1.frequency.exponentialRampToValueAtTime(880, now + 0.15); // A5

    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(880, now);
    osc2.frequency.exponentialRampToValueAtTime(1174.66, now + 0.2); // D6

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
    // Audio might be blocked if user hasn't interacted yet; ignore gracefully
  }
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Language
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('nc_lang');
    return (saved === 'en' || saved === 'id') ? saved : 'id';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('nc_lang', lang);
  };

  const t = translations[language];

  // Products
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('nc_products');
    if (saved) {
      try { return JSON.parse(saved); } catch { /* ignore */ }
    }
    return initialProducts;
  });

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

  useEffect(() => {
    localStorage.setItem('nc_products', JSON.stringify(products));
    if (!isExternalSyncRef.current) {
      broadcastSync('nc_products', products);
    }
  }, [products]);

  // Company Settings (merged with initialCompanySettings for backwards compatibility)
  const [companySettings, setCompanySettings] = useState<CompanySettings>(() => {
    const saved = localStorage.getItem('nc_company');
    if (saved) {
      try {
        return { ...initialCompanySettings, ...JSON.parse(saved) };
      } catch { /* ignore */ }
    }
    return initialCompanySettings;
  });

  useEffect(() => {
    localStorage.setItem('nc_company', JSON.stringify(companySettings));
    if (!isExternalSyncRef.current) {
      broadcastSync('nc_company', companySettings);
    }
  }, [companySettings]);

  // Reviews
  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem('nc_reviews');
    if (saved) {
      try { return JSON.parse(saved); } catch { /* ignore */ }
    }
    return initialReviews;
  });

  useEffect(() => {
    localStorage.setItem('nc_reviews', JSON.stringify(reviews));
    if (!isExternalSyncRef.current) {
      broadcastSync('nc_reviews', reviews);
    }
  }, [reviews]);

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('nc_orders');
    if (saved) {
      try { return JSON.parse(saved); } catch { /* ignore */ }
    }
    return initialOrders;
  });

  useEffect(() => {
    localStorage.setItem('nc_orders', JSON.stringify(orders));
    if (!isExternalSyncRef.current) {
      broadcastSync('nc_orders', orders);
    }
  }, [orders]);

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('nc_cart');
    if (saved) {
      try { return JSON.parse(saved); } catch { /* ignore */ }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('nc_cart', JSON.stringify(cart));
  }, [cart]);

  // Real-time Cross-Tab Synchronization (storage event + BroadcastChannel)
  useEffect(() => {
    const applySyncedData = (key: string, payload: unknown) => {
      isExternalSyncRef.current = true;
      if (key === 'nc_products' && Array.isArray(payload)) {
        setProducts(payload as Product[]);
      } else if (key === 'nc_company' && payload && typeof payload === 'object') {
        setCompanySettings({ ...initialCompanySettings, ...(payload as Partial<CompanySettings>) });
      } else if (key === 'nc_orders' && Array.isArray(payload)) {
        setOrders(payload as Order[]);
      } else if (key === 'nc_reviews' && Array.isArray(payload)) {
        setReviews(payload as Review[]);
      }
      setTimeout(() => {
        isExternalSyncRef.current = false;
      }, 0);
    };

    const handleStorage = (e: StorageEvent) => {
      if (!e.key || !e.newValue) return;
      if (['nc_products', 'nc_company', 'nc_orders', 'nc_reviews'].includes(e.key)) {
        try {
          applySyncedData(e.key, JSON.parse(e.newValue));
        } catch {
          // Ignore malformed JSON
        }
      }
    };

    window.addEventListener('storage', handleStorage);

    if (typeof BroadcastChannel !== 'undefined') {
      const channel = new BroadcastChannel('nc_sync_channel');
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
      title: 'Selamat Datang di Nusantara Catalog',
      message: 'Sistem siap menerima pesanan dan pertanyaan langsung via WhatsApp & Payment Gateway.',
      type: 'system',
      timestamp: 'Baru saja',
      read: false
    },
    {
      id: 'notif-init-2',
      title: 'Pesanan Masuk #NC-202611-8801',
      message: 'Anindya Putri telah membayar pesanan Rp 1.665.000 via QRIS Real-Time.',
      type: 'order',
      timestamp: '14:33 WIB',
      read: false,
      orderId: 'ord-8801'
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
    return localStorage.getItem('nc_admin_auth') === 'true';
  });

  const loginAdmin = () => {
    setIsAdminAuthenticated(true);
    localStorage.setItem('nc_admin_auth', 'true');
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    localStorage.removeItem('nc_admin_auth');
  };

  // Auth User (Customer)
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('nc_user');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Ensure public customer session does not show legacy admin badge
        return parsed.role === 'admin' ? null : parsed;
      } catch { /* ignore */ }
    }
    return null;
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('nc_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('nc_user');
    }
  }, [currentUser]);

  // Filter & Search
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [badgeFilter, setBadgeFilter] = useState<'all' | 'featured' | 'bestseller' | 'promo' | 'new'>('all');
  const [sortBy, setSortBy] = useState<'popular' | 'price_low' | 'price_high' | 'rating' | 'newest'>('popular');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Modals state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authInitialTab, setAuthInitialTab] = useState<AuthTab>('signin');
  const [adminActiveTab, setAdminActiveTab] = useState<AdminTab>('analytics');
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [isCompanyModalOpen, setIsCompanyModalOpen] = useState(false);

  // Product Detail
  const openProductDetail = (prod: Product) => {
    setSelectedProduct(prod);
  };

  const closeProductDetail = () => {
    setSelectedProduct(null);
  };

  // Cart Actions
  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
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
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
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

  // Play Sound
  const playNotificationSound = () => {
    playChimeTone();
  };

  // Create Order with Real-Time Notification & Metrics update
  const createOrder = async (orderInput: Omit<Order, 'id' | 'orderNumber' | 'createdAt'>): Promise<Order> => {
    const timestampStr = new Date().toLocaleString('id-ID', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }) + ' WIB';
    
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newOrderNumber = `NC-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}-${randomSuffix}`;
    const newOrderId = `ord-${Date.now()}`;

    const newOrder: Order = {
      ...orderInput,
      id: newOrderId,
      orderNumber: newOrderNumber,
      createdAt: timestampStr,
    };

    // Deduct stock
    setProducts((prev) =>
      prev.map((p) => {
        const orderedItem = orderInput.items.find((item) => item.productId === p.id);
        if (orderedItem) {
          const newStock = Math.max(0, p.stock - orderedItem.quantity);
          return { ...p, stock: newStock };
        }
        return p;
      })
    );

    // Save order
    setOrders((prev) => [newOrder, ...prev]);

    // Push real-time Admin notification
    const newNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      title: `Pesanan Baru #${newOrderNumber}`,
      message: `${newOrder.customerName} baru saja memesan Rp ${newOrder.total.toLocaleString('id-ID')} via ${newOrder.paymentMethod.toUpperCase()}`,
      type: 'order',
      timestamp: 'Baru saja',
      read: false,
      orderId: newOrderId
    };

    setNotifications((prev) => [newNotif, ...prev]);

    // Update daily sales metrics
    setDailyMetrics((prev) => {
      const todayLabel = 'Hari Ini';
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

    // Play chime sound
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

    // Update Product average rating
    setProducts((prev) =>
      prev.map((prod) => {
        if (prod.id === reviewInput.productId) {
          const currentReviews = reviews.filter((r) => r.productId === prod.id);
          const totalRating = currentReviews.reduce((sum, r) => sum + r.rating, 0) + reviewInput.rating;
          const newCount = currentReviews.length + 1;
          const avg = Number((totalRating / newCount).toFixed(1));
          return {
            ...prod,
            rating: avg,
            reviewCount: newCount
          };
        }
        return prod;
      })
    );

    // Notify admin
    const newNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      title: 'Ulasan Baru Diterima',
      message: `${reviewInput.userName} memberi rating ⭐ ${reviewInput.rating}/5`,
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

  // Company Settings Update
  const updateCompanySettings = (settings: Partial<CompanySettings>) => {
    setCompanySettings((prev) => ({ ...prev, ...settings }));
  };

  // Product CMS
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
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
  };

  const deleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  const importSiteData = (data: { products?: Product[]; companySettings?: Partial<CompanySettings> }) => {
    if (Array.isArray(data.products)) {
      setProducts(data.products);
    }
    if (data.companySettings && typeof data.companySettings === 'object') {
      setCompanySettings((prev) => ({ ...prev, ...data.companySettings }));
    }
  };

  // Notifications
  const unreadNotificationCount = notifications.filter((n) => !n.read).length;

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  // Auth
  const login = (email: string, _role: 'customer' | 'admin' = 'customer', name?: string) => {
    const user: User = {
      id: `user-${Date.now()}`,
      name: name || email.split('@')[0],
      email,
      phone: '08123456789',
      role: 'customer',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'
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
    const text = `Halo Admin *${companySettings.companyName}*, saya tertarik untuk bertanya/memesan produk berikut:
    
📦 *Nama Produk:* ${product.name}
🏷️ *SKU:* ${product.sku}
💰 *Harga:* Rp ${product.price.toLocaleString('id-ID')}
📊 *Stok Tersedia:* ${product.stock} unit

Apakah item ini ready stock dan bisa dikirim hari ini? Mohon informasi ketersediaan dan promo terbarunya. Terima kasih!`;
    return formatWhatsAppUrl(text);
  };

  const createWhatsAppCartOrderUrl = () => {
    if (cart.length === 0) return formatWhatsAppUrl('Halo Admin, saya ingin konsultasi produk.');
    const itemsList = cart.map((item, idx) => 
      `${idx + 1}. ${item.product.name} (x${item.quantity}) - Rp ${(item.product.price * item.quantity).toLocaleString('id-ID')}`
    ).join('\n');

    const text = `Halo Admin *${companySettings.companyName}*, saya ingin memesan barang dari keranjang belanja saya:

${itemsList}

💵 *Total Pesanan:* Rp ${cartTotal.toLocaleString('id-ID')}

Mohon konfirmasi ketersediaan dan langkah pembayaran selanjutnya. Terima kasih!`;
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
