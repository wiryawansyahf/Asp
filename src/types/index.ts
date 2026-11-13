export type Language = 'id' | 'en';

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  isVerifiedPurchase: boolean;
  helpfulCount: number;
}

export interface Product {
  id: string;
  name: string;
  nameEn?: string;
  category: string;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  stock: number;
  sku: string;
  rating: number;
  reviewCount: number;
  featured: boolean;
  bestSeller?: boolean;
  isNew?: boolean;
  images: string[];
  description: string;
  descriptionEn?: string;
  specifications: ProductSpec[];
  tags: string[];
}

export interface ECatalogItem {
  id: string;
  code: string;
  title: string;
  titleEn: string;
  category: string;
  edition: string;
  pageCount: number;
  description: string;
  descriptionEn: string;
  coverImage: string;
  highlights: string[];
  pdfUrl?: string;
  pdfFileName?: string;
}

export interface DistributorBrand {
  id: string;
  name: string;
  category: string;
  status: string;
  logoUrl: string;
  description?: string;
}

export type OrderStatus = 'pending_payment' | 'paid' | 'processing' | 'shipped' | 'completed' | 'cancelled';

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  customerCity: string;
  customerNotes?: string;
  items: OrderItem[];
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
  paymentMethod: 'qris' | 'virtual_account' | 'credit_card' | 'whatsapp';
  paymentStatus: 'unpaid' | 'paid' | 'failed';
  orderStatus: OrderStatus;
  courier: string;
  trackingNumber?: string;
  paidAt?: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: 'order' | 'review' | 'stock' | 'system';
  timestamp: string;
  read: boolean;
  orderId?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'customer' | 'admin';
  avatar?: string;
  address?: string;
}

export interface CompanySettings {
  companyName: string;
  logoText: string;
  logoUrl?: string;
  headerTitle: string;
  headerTitleHighlight: string;
  headerSubtitle: string;
  showWhatsAppInHeader: boolean;
  heroBadge: string;
  heroTitlePrefix: string;
  heroTitleHighlight: string;
  heroDescription: string;
  heroImage?: string;
  contactImage?: string;
  tagline: string;
  taglineEn: string;
  aboutStory: string;
  aboutStoryEn: string;
  vision: string;
  visionEn: string;
  mission: string[];
  missionEn: string[];
  founderName: string;
  founderRole: string;
  founderBio: string;
  founderAvatar: string;
  whatsappNumber: string; // e.g. "6281234567890"
  whatsappDefaultMessage: string;
  email: string;
  phone: string;
  address: string;
  operatingHours: string;
  socialInstagram: string;
  socialFacebook: string;
  socialLinkedIn: string;
  announcementText: string;
  announcementTextEn: string;
  announcementCtaText: string;
  isAnnouncementActive: boolean;

  // Navbar Menu Labels & CTA
  navHomeLabel?: string;
  navAboutLabel?: string;
  navCatalogLabel?: string;
  navECatalogLabel?: string;
  navDistributorLabel?: string;
  navContactLabel?: string;
  navWhatsAppLabel?: string;

  // Hero Extra Texts & 3 Stat Cards
  heroCtaCatalogText?: string;
  heroCtaWhatsAppText?: string;
  heroShortcutECatalog?: string;
  heroShortcutMainProducts?: string;
  heroShortcutProfile?: string;
  heroImageCaptionSubtitle?: string;
  heroStat1Value?: string;
  heroStat1Label?: string;
  heroStat1Sub?: string;
  heroStat2Value?: string;
  heroStat2Label?: string;
  heroStat2Sub?: string;
  heroStat3Value?: string;
  heroStat3Label?: string;
  heroStat3Sub?: string;

  // About Us Section Texts & 3 Pillars
  aboutSectionBadge?: string;
  aboutTitle?: string;
  aboutSubtitle?: string;
  aboutOverviewLabel?: string;
  aboutPillar1Title?: string;
  aboutPillar1Sub?: string;
  aboutPillar2Title?: string;
  aboutPillar2Sub?: string;
  aboutPillar3Title?: string;
  aboutPillar3Sub?: string;
  aboutProfileBtnText?: string;

  // Catalog Section Texts & Card Labels
  catalogBadge?: string;
  catalogTitle?: string;
  catalogSubtitle?: string;
  catalogSearchPlaceholder?: string;
  productDetailBtnText?: string;
  productInfoBtnText?: string;

  // E-Catalog Section Texts & Button Labels
  ecatalogBadge?: string;
  ecatalogTitle?: string;
  ecatalogSubtitle?: string;
  ecatalogRequestAllText?: string;
  ecatalogOpenBtnText?: string;
  ecatalogDownloadBtnText?: string;

  // Main Products & Brand Section Texts
  mainDistributorBadge?: string;
  mainDistributorTitle?: string;
  mainDistributorSubtitle?: string;
  brandSectionTitle?: string;

  // Contact Us Section Texts
  contactBadge?: string;
  contactTitle?: string;
  contactSubtitle?: string;
  contactFormTitle?: string;
  contactSubmitBtnText?: string;
  floatingWaDesc?: string;

  // Footer Texts & Regions
  footerDesc?: string;
  footerBadge1?: string;
  footerBadge2?: string;
  footerRegions?: string[];
  footerCopyrightText?: string;
}

export interface DailySalesMetric {
  date: string;
  revenue: number;
  orderCount: number;
}
