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
  email: string;
  phone: string;
  address: string;
  operatingHours: string;
  socialInstagram: string;
  socialFacebook: string;
  socialLinkedIn: string;
  announcementText: string;
  announcementTextEn: string;
  isAnnouncementActive: boolean;
}

export interface DailySalesMetric {
  date: string;
  revenue: number;
  orderCount: number;
}
