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
  FileCode,
  BookOpen,
  Award
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Product, OrderStatus, ECatalogItem, DistributorBrand } from '../types';

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
    eCatalogs,
    addECatalog,
    updateECatalog,
    deleteECatalog,
    distributorBrands,
    addDistributorBrand,
    updateDistributorBrand,
    deleteDistributorBrand,
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
  const [adminEmail, setAdminEmail] = useState('admin@asiaparts.my.id');
  const [adminPin, setAdminPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Product Add / Edit / Delete Modal
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [productSearch, setProductSearch] = useState('');

  // E-Catalog Add / Edit / Delete Modal
  const [editingCatalog, setEditingCatalog] = useState<ECatalogItem | null>(null);
  const [deletingCatalog, setDeletingCatalog] = useState<ECatalogItem | null>(null);
  const [isCatalogModalOpen, setIsCatalogModalOpen] = useState(false);
  const [catCode, setCatCode] = useState('');
  const [catTitle, setCatTitle] = useState('');
  const [catTitleEn, setCatTitleEn] = useState('');
  const [catCategory, setCatCategory] = useState('Automation & PLC');
  const [catEdition, setCatEdition] = useState('Edisi 2026 · Rev 1.0');
  const [catPages, setCatPages] = useState(24);
  const [catCover, setCatCover] = useState('');
  const [catDesc, setCatDesc] = useState('');
  const [catHighlightsText, setCatHighlightsText] = useState('');
  const [catPdfUrl, setCatPdfUrl] = useState('');
  const [catPdfFileName, setCatPdfFileName] = useState('');

  // Distributor Brand Add / Edit / Delete Modal
  const [editingBrand, setEditingBrand] = useState<DistributorBrand | null>(null);
  const [deletingBrand, setDeletingBrand] = useState<DistributorBrand | null>(null);
  const [isBrandModalOpen, setIsBrandModalOpen] = useState(false);
  const [brandName, setBrandName] = useState('');
  const [brandCategory, setBrandCategory] = useState('Pneumatic & Valve');
  const [brandStatus, setBrandStatus] = useState('Official Distributor');
  const [brandLogoUrl, setBrandLogoUrl] = useState('');
  const [brandDesc, setBrandDesc] = useState('');

  // Product Form State
  const [prodName, setProdName] = useState('');
  const [prodNameEn, setProdNameEn] = useState('');
  const [prodCategory, setProdCategory] = useState('Pneumatic & Valve');
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
    { label: 'Garansi', value: '12 Bulan Resmi PT Asiaparts Indotech' },
    { label: 'Kondisi', value: 'Baru 100% Original' }
  ]);

  // Order Filter State
  const [orderFilter, setOrderFilter] = useState<string>('all');
  const [orderSearch, setOrderSearch] = useState('');

  // Header, Hero & WhatsApp Form State
  const [logoText, setLogoText] = useState(companySettings.logoText || 'AI');
  const [logoUrl, setLogoUrl] = useState(companySettings.logoUrl || '');
  const [headerTitle, setHeaderTitle] = useState(companySettings.headerTitle || 'PT Asiaparts');
  const [headerTitleHighlight, setHeaderTitleHighlight] = useState(
    companySettings.headerTitleHighlight || 'Indotech'
  );
  const [headerSubtitle, setHeaderSubtitle] = useState(
    companySettings.headerSubtitle || 'Industrial Parts & Automation Solutions'
  );
  const [showWhatsAppInHeader, setShowWhatsAppInHeader] = useState(
    companySettings.showWhatsAppInHeader
  );
  const [heroBadge, setHeroBadge] = useState(companySettings.heroBadge || '');
  const [heroTitlePrefix, setHeroTitlePrefix] = useState(companySettings.heroTitlePrefix || '');
  const [heroTitleHighlight, setHeroTitleHighlight] = useState(
    companySettings.heroTitleHighlight || ''
  );
  const [heroDescription, setHeroDescription] = useState(companySettings.heroDescription || '');
  const [heroImage, setHeroImage] = useState(companySettings.heroImage || '');
  const [contactImage, setContactImage] = useState(
    companySettings.contactImage || companySettings.heroImage || ''
  );
  const [compWa, setCompWa] = useState(companySettings.whatsappNumber);
  const [waDefaultMsg, setWaDefaultMsg] = useState(companySettings.whatsappDefaultMessage || '');
  const [compAnnouncement, setCompAnnouncement] = useState(companySettings.announcementText);
  const [announcementCtaText, setAnnouncementCtaText] = useState(
    companySettings.announcementCtaText || 'Chat Sales'
  );
  const [compAnnouncementActive, setCompAnnouncementActive] = useState(
    companySettings.isAnnouncementActive
  );
  const [headerSaved, setHeaderSaved] = useState(false);

  // Company Settings Form State
  const [compName, setCompName] = useState(companySettings.companyName);
  const [compTagline, setCompTagline] = useState(companySettings.tagline);
  const [compStory, setCompStory] = useState(companySettings.aboutStory);
  const [compVision, setCompVision] = useState(companySettings.vision);
  const [compMissionText, setCompMissionText] = useState((companySettings.mission || []).join('\n'));
  const [compEmail, setCompEmail] = useState(companySettings.email);
  const [compPhone, setCompPhone] = useState(companySettings.phone);
  const [compAddress, setCompAddress] = useState(companySettings.address);
  const [compFounderName, setCompFounderName] = useState(companySettings.founderName);
  const [compFounderRole, setCompFounderRole] = useState(companySettings.founderRole || '');
  const [compFounderBio, setCompFounderBio] = useState(companySettings.founderBio || '');
  const [compFounderAvatar, setCompFounderAvatar] = useState(companySettings.founderAvatar || '');
  const [compHours, setCompHours] = useState(companySettings.operatingHours);
  const [settingsSaved, setSettingsSaved] = useState(false);
  const [syncNotice, setSyncNotice] = useState('');

  // Full Page Content Editor ('content' tab) State
  const [contentSectionFilter, setContentSectionFilter] = useState<string>('all');
  const [contentSaved, setContentSaved] = useState(false);
  const [navHomeLabel, setNavHomeLabel] = useState(companySettings.navHomeLabel || 'Beranda');
  const [navAboutLabel, setNavAboutLabel] = useState(companySettings.navAboutLabel || 'Tentang Kami');
  const [navCatalogLabel, setNavCatalogLabel] = useState(companySettings.navCatalogLabel || 'Produk');
  const [navECatalogLabel, setNavECatalogLabel] = useState(companySettings.navECatalogLabel || 'E-Catalog');
  const [navDistributorLabel, setNavDistributorLabel] = useState(
    companySettings.navDistributorLabel || 'Main & Distributor'
  );
  const [navContactLabel, setNavContactLabel] = useState(companySettings.navContactLabel || 'Contact Us');
  const [navWhatsAppLabel, setNavWhatsAppLabel] = useState(
    companySettings.navWhatsAppLabel || 'Chat WhatsApp'
  );

  const [heroCtaCatalogText, setHeroCtaCatalogText] = useState(
    companySettings.heroCtaCatalogText || 'Lihat Display Produk'
  );
  const [heroCtaWhatsAppText, setHeroCtaWhatsAppText] = useState(
    companySettings.heroCtaWhatsAppText || 'Hubungi WhatsApp Sales'
  );
  const [heroShortcutECatalog, setHeroShortcutECatalog] = useState(
    companySettings.heroShortcutECatalog || 'Lihat E-Catalog Digital'
  );
  const [heroShortcutMainProducts, setHeroShortcutMainProducts] = useState(
    companySettings.heroShortcutMainProducts ||
      'Our Main Products & Distributor Product of PT ASIAPARTS'
  );
  const [heroShortcutProfile, setHeroShortcutProfile] = useState(
    companySettings.heroShortcutProfile || 'Profil PT Asiaparts Indotech'
  );
  const [heroImageCaptionSubtitle, setHeroImageCaptionSubtitle] = useState(
    companySettings.heroImageCaptionSubtitle ||
      'Pusat Pengadaan Suku Cadang Industri & Otomasi Presisi'
  );
  const [heroStat1Value, setHeroStat1Value] = useState(companySettings.heroStat1Value || '8+ Series');
  const [heroStat1Label, setHeroStat1Label] = useState(
    companySettings.heroStat1Label || 'Produk Terverifikasi'
  );
  const [heroStat1Sub, setHeroStat1Sub] = useState(
    companySettings.heroStat1Sub || 'Lolos QC Standar Industri'
  );
  const [heroStat2Value, setHeroStat2Value] = useState(companySettings.heroStat2Value || '4 Divisi');
  const [heroStat2Label, setHeroStat2Label] = useState(
    companySettings.heroStat2Label || 'E-Catalog Digital'
  );
  const [heroStat2Sub, setHeroStat2Sub] = useState(
    companySettings.heroStat2Sub || 'Otomasi, Pneumatic, Motion & Bearing'
  );
  const [heroStat3Value, setHeroStat3Value] = useState(companySettings.heroStat3Value || '38 Provinsi');
  const [heroStat3Label, setHeroStat3Label] = useState(
    companySettings.heroStat3Label || 'Jangkauan Distribusi'
  );
  const [heroStat3Sub, setHeroStat3Sub] = useState(
    companySettings.heroStat3Sub || 'Distribusi ke Kawasan Industri'
  );

  const [aboutSectionBadge, setAboutSectionBadge] = useState(
    companySettings.aboutSectionBadge || 'Tentang Perusahaan'
  );
  const [aboutTitle, setAboutTitle] = useState(
    companySettings.aboutTitle || 'Mengenal PT Asiaparts Indotech'
  );
  const [aboutSubtitle, setAboutSubtitle] = useState(companySettings.aboutSubtitle || '');
  const [aboutOverviewLabel, setAboutOverviewLabel] = useState(
    companySettings.aboutOverviewLabel || 'Profil Perusahaan & Overview'
  );
  const [aboutPillar1Title, setAboutPillar1Title] = useState(
    companySettings.aboutPillar1Title || 'Mutu Terstandar'
  );
  const [aboutPillar1Sub, setAboutPillar1Sub] = useState(
    companySettings.aboutPillar1Sub || 'QC Terukur'
  );
  const [aboutPillar2Title, setAboutPillar2Title] = useState(
    companySettings.aboutPillar2Title || 'Distribusi Andal'
  );
  const [aboutPillar2Sub, setAboutPillar2Sub] = useState(
    companySettings.aboutPillar2Sub || 'Nasional'
  );
  const [aboutPillar3Title, setAboutPillar3Title] = useState(
    companySettings.aboutPillar3Title || 'Garansi Resmi'
  );
  const [aboutPillar3Sub, setAboutPillar3Sub] = useState(
    companySettings.aboutPillar3Sub || 'Purna Jual'
  );
  const [aboutProfileBtnText, setAboutProfileBtnText] = useState(
    companySettings.aboutProfileBtnText || 'Lihat Profil & Visi Misi Lengkap →'
  );

  const [catalogBadge, setCatalogBadge] = useState(companySettings.catalogBadge || 'Display Produk');
  const [catalogTitle, setCatalogTitle] = useState(
    companySettings.catalogTitle || 'Display Barang & Komponen Industri'
  );
  const [catalogSubtitle, setCatalogSubtitle] = useState(companySettings.catalogSubtitle || '');
  const [catalogSearchPlaceholder, setCatalogSearchPlaceholder] = useState(
    companySettings.catalogSearchPlaceholder ||
      'Cari nama barang, part number / SKU, atau kategori...'
  );
  const [productDetailBtnText, setProductDetailBtnText] = useState(
    companySettings.productDetailBtnText || 'Detail & Spek'
  );
  const [productInfoBtnText, setProductInfoBtnText] = useState(
    companySettings.productInfoBtnText || 'Info Detail'
  );

  const [ecatalogBadge, setEcatalogBadge] = useState(
    companySettings.ecatalogBadge || 'E-Catalog Digital'
  );
  const [ecatalogTitle, setEcatalogTitle] = useState(
    companySettings.ecatalogTitle || 'E-Catalog Resmi PT Asiaparts Indotech'
  );
  const [ecatalogSubtitle, setEcatalogSubtitle] = useState(companySettings.ecatalogSubtitle || '');
  const [ecatalogRequestAllText, setEcatalogRequestAllText] = useState(
    companySettings.ecatalogRequestAllText || 'Minta Semua E-Catalog via WhatsApp'
  );
  const [ecatalogOpenBtnText, setEcatalogOpenBtnText] = useState(
    companySettings.ecatalogOpenBtnText || 'Buka E-Catalog'
  );
  const [ecatalogDownloadBtnText, setEcatalogDownloadBtnText] = useState(
    companySettings.ecatalogDownloadBtnText || 'Download File'
  );

  const [mainDistributorBadge, setMainDistributorBadge] = useState(
    companySettings.mainDistributorBadge || 'Produk Utama & Distribusi Resmi'
  );
  const [mainDistributorTitle, setMainDistributorTitle] = useState(
    companySettings.mainDistributorTitle || 'Our Main Products & Distributor Product of PT ASIAPARTS'
  );
  const [mainDistributorSubtitle, setMainDistributorSubtitle] = useState(
    companySettings.mainDistributorSubtitle || ''
  );
  const [brandSectionTitle, setBrandSectionTitle] = useState(
    companySettings.brandSectionTitle || 'BRAND'
  );

  const [contactBadge, setContactBadge] = useState(companySettings.contactBadge || 'Contact Us');
  const [contactTitle, setContactTitle] = useState(
    companySettings.contactTitle || 'Hubungi PT Asiaparts Indotech'
  );
  const [contactSubtitle, setContactSubtitle] = useState(companySettings.contactSubtitle || '');
  const [contactFormTitle, setContactFormTitle] = useState(
    companySettings.contactFormTitle || 'Formulir Contact Us — Terhubung ke WhatsApp'
  );
  const [contactSubmitBtnText, setContactSubmitBtnText] = useState(
    companySettings.contactSubmitBtnText || 'Kirim Pesan via WhatsApp'
  );
  const [floatingWaDesc, setFloatingWaDesc] = useState(companySettings.floatingWaDesc || '');

  const [footerDesc, setFooterDesc] = useState(companySettings.footerDesc || '');
  const [footerBadge1, setFooterBadge1] = useState(
    companySettings.footerBadge1 || 'Industrial Grade & QC'
  );
  const [footerBadge2, setFooterBadge2] = useState(
    companySettings.footerBadge2 || 'Main & Distributor Products'
  );
  const [footerRegionsText, setFooterRegionsText] = useState(
    (companySettings.footerRegions || []).join('\n')
  );
  const [footerCopyrightText, setFooterCopyrightText] = useState(
    companySettings.footerCopyrightText || 'Hak Cipta Dilindungi Undang-Undang.'
  );

  useEffect(() => {
    setLogoText(companySettings.logoText || 'AI');
    setLogoUrl(companySettings.logoUrl || '');
    setHeaderTitle(companySettings.headerTitle || 'PT Asiaparts');
    setHeaderTitleHighlight(companySettings.headerTitleHighlight || 'Indotech');
    setHeaderSubtitle(companySettings.headerSubtitle || 'Industrial Parts & Automation Solutions');
    setShowWhatsAppInHeader(companySettings.showWhatsAppInHeader);
    setHeroBadge(companySettings.heroBadge || '');
    setHeroTitlePrefix(companySettings.heroTitlePrefix || '');
    setHeroTitleHighlight(companySettings.heroTitleHighlight || '');
    setHeroDescription(companySettings.heroDescription || '');
    setHeroImage(companySettings.heroImage || '');
    setContactImage(companySettings.contactImage || companySettings.heroImage || '');
    setCompWa(companySettings.whatsappNumber);
    setWaDefaultMsg(companySettings.whatsappDefaultMessage || '');
    setCompAnnouncement(companySettings.announcementText);
    setAnnouncementCtaText(companySettings.announcementCtaText || 'Chat Sales');
    setCompAnnouncementActive(companySettings.isAnnouncementActive);

    setCompName(companySettings.companyName);
    setCompTagline(companySettings.tagline);
    setCompStory(companySettings.aboutStory);
    setCompVision(companySettings.vision);
    setCompMissionText((companySettings.mission || []).join('\n'));
    setCompEmail(companySettings.email);
    setCompPhone(companySettings.phone);
    setCompAddress(companySettings.address);
    setCompFounderName(companySettings.founderName);
    setCompFounderRole(companySettings.founderRole || '');
    setCompFounderBio(companySettings.founderBio || '');
    setCompFounderAvatar(companySettings.founderAvatar || '');
    setCompHours(companySettings.operatingHours);

    setNavHomeLabel(companySettings.navHomeLabel || 'Beranda');
    setNavAboutLabel(companySettings.navAboutLabel || 'Tentang Kami');
    setNavCatalogLabel(companySettings.navCatalogLabel || 'Produk');
    setNavECatalogLabel(companySettings.navECatalogLabel || 'E-Catalog');
    setNavDistributorLabel(companySettings.navDistributorLabel || 'Main & Distributor');
    setNavContactLabel(companySettings.navContactLabel || 'Contact Us');
    setNavWhatsAppLabel(companySettings.navWhatsAppLabel || 'Chat WhatsApp');

    setHeroCtaCatalogText(companySettings.heroCtaCatalogText || 'Lihat Display Produk');
    setHeroCtaWhatsAppText(companySettings.heroCtaWhatsAppText || 'Hubungi WhatsApp Sales');
    setHeroShortcutECatalog(companySettings.heroShortcutECatalog || 'Lihat E-Catalog Digital');
    setHeroShortcutMainProducts(
      companySettings.heroShortcutMainProducts ||
        'Our Main Products & Distributor Product of PT ASIAPARTS'
    );
    setHeroShortcutProfile(companySettings.heroShortcutProfile || 'Profil PT Asiaparts Indotech');
    setHeroImageCaptionSubtitle(
      companySettings.heroImageCaptionSubtitle ||
        'Pusat Pengadaan Suku Cadang Industri & Otomasi Presisi'
    );
    setHeroStat1Value(companySettings.heroStat1Value || '8+ Series');
    setHeroStat1Label(companySettings.heroStat1Label || 'Produk Terverifikasi');
    setHeroStat1Sub(companySettings.heroStat1Sub || 'Lolos QC Standar Industri');
    setHeroStat2Value(companySettings.heroStat2Value || '4 Divisi');
    setHeroStat2Label(companySettings.heroStat2Label || 'E-Catalog Digital');
    setHeroStat2Sub(companySettings.heroStat2Sub || 'Otomasi, Pneumatic, Motion & Bearing');
    setHeroStat3Value(companySettings.heroStat3Value || '38 Provinsi');
    setHeroStat3Label(companySettings.heroStat3Label || 'Jangkauan Distribusi');
    setHeroStat3Sub(companySettings.heroStat3Sub || 'Distribusi ke Kawasan Industri');

    setAboutSectionBadge(companySettings.aboutSectionBadge || 'Tentang Perusahaan');
    setAboutTitle(companySettings.aboutTitle || 'Mengenal PT Asiaparts Indotech');
    setAboutSubtitle(companySettings.aboutSubtitle || '');
    setAboutOverviewLabel(companySettings.aboutOverviewLabel || 'Profil Perusahaan & Overview');
    setAboutPillar1Title(companySettings.aboutPillar1Title || 'Mutu Terstandar');
    setAboutPillar1Sub(companySettings.aboutPillar1Sub || 'QC Terukur');
    setAboutPillar2Title(companySettings.aboutPillar2Title || 'Distribusi Andal');
    setAboutPillar2Sub(companySettings.aboutPillar2Sub || 'Nasional');
    setAboutPillar3Title(companySettings.aboutPillar3Title || 'Garansi Resmi');
    setAboutPillar3Sub(companySettings.aboutPillar3Sub || 'Purna Jual');
    setAboutProfileBtnText(
      companySettings.aboutProfileBtnText || 'Lihat Profil & Visi Misi Lengkap →'
    );

    setCatalogBadge(companySettings.catalogBadge || 'Display Produk');
    setCatalogTitle(companySettings.catalogTitle || 'Display Barang & Komponen Industri');
    setCatalogSubtitle(companySettings.catalogSubtitle || '');
    setCatalogSearchPlaceholder(
      companySettings.catalogSearchPlaceholder ||
        'Cari nama barang, part number / SKU, atau kategori...'
    );
    setProductDetailBtnText(companySettings.productDetailBtnText || 'Detail & Spek');
    setProductInfoBtnText(companySettings.productInfoBtnText || 'Info Detail');

    setEcatalogBadge(companySettings.ecatalogBadge || 'E-Catalog Digital');
    setEcatalogTitle(companySettings.ecatalogTitle || 'E-Catalog Resmi PT Asiaparts Indotech');
    setEcatalogSubtitle(companySettings.ecatalogSubtitle || '');
    setEcatalogRequestAllText(
      companySettings.ecatalogRequestAllText || 'Minta Semua E-Catalog via WhatsApp'
    );
    setEcatalogOpenBtnText(companySettings.ecatalogOpenBtnText || 'Buka E-Catalog');
    setEcatalogDownloadBtnText(companySettings.ecatalogDownloadBtnText || 'Download File');

    setMainDistributorBadge(
      companySettings.mainDistributorBadge || 'Produk Utama & Distribusi Resmi'
    );
    setMainDistributorTitle(
      companySettings.mainDistributorTitle ||
        'Our Main Products & Distributor Product of PT ASIAPARTS'
    );
    setMainDistributorSubtitle(companySettings.mainDistributorSubtitle || '');
    setBrandSectionTitle(companySettings.brandSectionTitle || 'BRAND');

    setContactBadge(companySettings.contactBadge || 'Contact Us');
    setContactTitle(companySettings.contactTitle || 'Hubungi PT Asiaparts Indotech');
    setContactSubtitle(companySettings.contactSubtitle || '');
    setContactFormTitle(
      companySettings.contactFormTitle || 'Formulir Contact Us — Terhubung ke WhatsApp'
    );
    setContactSubmitBtnText(companySettings.contactSubmitBtnText || 'Kirim Pesan via WhatsApp');
    setFloatingWaDesc(companySettings.floatingWaDesc || '');

    setFooterDesc(companySettings.footerDesc || '');
    setFooterBadge1(companySettings.footerBadge1 || 'Industrial Grade & QC');
    setFooterBadge2(companySettings.footerBadge2 || 'Main & Distributor Products');
    setFooterRegionsText((companySettings.footerRegions || []).join('\n'));
    setFooterCopyrightText(
      companySettings.footerCopyrightText || 'Hak Cipta Dilindungi Undang-Undang.'
    );
  }, [companySettings, isAdminAuthenticated]);

  const presetCategories = [
    'Pneumatic & Valve',
    'Motion & Gearbox',
    'Automation & PLC',
    'Bearing & Linear'
  ];

  const handleOpenEdit = (p: Product) => {
    setEditingProduct(p);
    setProdName(p.name);
    setProdNameEn(p.nameEn || '');
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
    setProdImages(p.images.length > 0 ? p.images : [companySettings.heroImage || '']);
    setProdDesc(p.description);
    setProdFeatured(p.featured);
    setProdBestSeller(p.bestSeller || false);
    setProdIsNew(p.isNew || false);
    setProdSpecs(
      p.specifications.length > 0
        ? p.specifications
        : [{ label: 'Garansi', value: '12 Bulan Resmi' }]
    );
    setIsProductModalOpen(true);
  };

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setProdName('');
    setProdNameEn('');
    setProdCategory('Pneumatic & Valve');
    setProdCustomCategory('');
    setProdPrice(1500000);
    setProdOriginalPrice(1800000);
    setProdStock(20);
    setProdSku(`API-${Date.now().toString().slice(-4)}`);
    setProdImages([companySettings.heroImage || '']);
    setProdDesc('');
    setProdFeatured(false);
    setProdBestSeller(false);
    setProdIsNew(true);
    setProdSpecs([
      { label: 'Part Number / SKU', value: `API-${Date.now().toString().slice(-4)}` },
      { label: 'Garansi', value: '12 Bulan Resmi PT Asiaparts Indotech' }
    ]);
    setIsProductModalOpen(true);
  };

  const handleOpenAddCatalog = () => {
    const nextCode = `ECAT-API-2026-0${eCatalogs.length + 1}`;
    setEditingCatalog(null);
    setCatCode(nextCode);
    setCatTitle('');
    setCatTitleEn('');
    setCatCategory('Automation & PLC');
    setCatEdition('Edisi 2026 · Rev 1.0');
    setCatPages(28);
    setCatCover(companySettings.heroImage || '');
    setCatDesc('');
    setCatHighlightsText('Produk Terstandar Industri\nDukungan Teknis & Konsultasi WA');
    setCatPdfUrl(`/catalogs/${nextCode}.pdf`);
    setCatPdfFileName(`${nextCode}.pdf`);
    setIsCatalogModalOpen(true);
  };

  const handleOpenEditCatalog = (cat: ECatalogItem) => {
    setEditingCatalog(cat);
    setCatCode(cat.code);
    setCatTitle(cat.title);
    setCatTitleEn(cat.titleEn);
    setCatCategory(cat.category);
    setCatEdition(cat.edition);
    setCatPages(cat.pageCount);
    setCatCover(cat.coverImage);
    setCatDesc(cat.description);
    setCatHighlightsText(cat.highlights.join('\n'));
    setCatPdfUrl(cat.pdfUrl || `/catalogs/${cat.code}.pdf`);
    setCatPdfFileName(cat.pdfFileName || `${cat.code}.pdf`);
    setIsCatalogModalOpen(true);
  };

  const handleSaveCatalog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!catTitle.trim()) return;
    const highlights = catHighlightsText
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean);

    const cleanCode = catCode.trim() || `ECAT-${Date.now().toString().slice(-4)}`;
    const payload = {
      code: cleanCode,
      title: catTitle.trim(),
      titleEn: catTitleEn.trim() || catTitle.trim(),
      category: catCategory.trim() || 'Automation & PLC',
      edition: catEdition.trim() || 'Edisi 2026',
      pageCount: Math.max(1, Number(catPages) || 12),
      description: catDesc.trim(),
      descriptionEn: catDesc.trim(),
      coverImage: catCover.trim() || companySettings.heroImage || '',
      highlights: highlights.length > 0 ? highlights : ['Industrial Standard Lineup'],
      pdfUrl: catPdfUrl.trim() || `/catalogs/${cleanCode}.pdf`,
      pdfFileName: catPdfFileName.trim() || `${cleanCode}.pdf`
    };

    if (editingCatalog) {
      updateECatalog({ ...editingCatalog, ...payload });
    } else {
      addECatalog(payload);
    }
    setIsCatalogModalOpen(false);
  };

  const handleOpenAddBrand = () => {
    setEditingBrand(null);
    setBrandName('');
    setBrandCategory('Pneumatic & Valve');
    setBrandStatus('Official Distributor');
    setBrandLogoUrl('');
    setBrandDesc('');
    setIsBrandModalOpen(true);
  };

  const handleOpenEditBrand = (brand: DistributorBrand) => {
    setEditingBrand(brand);
    setBrandName(brand.name);
    setBrandCategory(brand.category);
    setBrandStatus(brand.status);
    setBrandLogoUrl(brand.logoUrl);
    setBrandDesc(brand.description || '');
    setIsBrandModalOpen(true);
  };

  const handleBrandLogoFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setBrandLogoUrl(reader.result);
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleSaveBrand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!brandName.trim()) return;
    const payload = {
      name: brandName.trim(),
      category: brandCategory.trim() || 'Pneumatic & Valve',
      status: brandStatus.trim() || 'Official Distributor',
      logoUrl: brandLogoUrl.trim(),
      description: brandDesc.trim() || undefined
    };

    if (editingBrand) {
      updateDistributorBrand({ ...editingBrand, ...payload });
    } else {
      addDistributorBrand(payload);
    }
    setIsBrandModalOpen(false);
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
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md space-y-4">
          <button
            onClick={() => navigateTo('/')}
            className="inline-flex items-center gap-2 text-xs font-semibold text-blue-200 hover:text-white transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Website {companySettings.companyName}</span>
          </button>

          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-6 bg-blue-950 text-white border-b border-blue-900 flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-blue-700 flex items-center justify-center text-white shadow-md">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h1 className="font-extrabold text-base sm:text-lg leading-tight">
                  Portal Admin CMS
                </h1>
                <p className="text-xs text-blue-200">
                  {companySettings.companyName} · Akses /admin
                </p>
              </div>
            </div>

            <form onSubmit={handleAdminLoginSubmit} className="p-6 space-y-4">
              <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-950 leading-relaxed">
                Masuk untuk mengelola{' '}
                <strong>
                  Header, Nomor WhatsApp, Display Produk, E-Catalog, dan Profil PT Asiaparts Indotech
                </strong>
                .
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Email Admin
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-blue-600"
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
                    className="w-full pl-9 pr-9 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-blue-600 font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPin(!showPin)}
                    className="p-1 text-slate-400 hover:text-slate-600 absolute right-2.5 top-1/2 -translate-y-1/2 cursor-pointer"
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
                className="w-full py-3 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
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
  const totalRevenue = orders.reduce(
    (sum, ord) => sum + (ord.paymentStatus === 'paid' ? ord.total : 0),
    0
  );
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

    const finalCategory =
      prodCategory === '__custom__' ? prodCustomCategory.trim() || 'Lainnya' : prodCategory;

    const cleanImages = prodImages.map((img) => img.trim()).filter(Boolean);
    if (cleanImages.length === 0 && companySettings.heroImage) {
      cleanImages.push(companySettings.heroImage);
    }

    const cleanSpecs = prodSpecs.filter((s) => s.label.trim() && s.value.trim());

    const discount =
      prodOriginalPrice > prodPrice
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
      logoText: logoText.trim() || 'AI',
      logoUrl: logoUrl.trim(),
      headerTitle: headerTitle.trim() || 'PT Asiaparts',
      headerTitleHighlight: headerTitleHighlight.trim() || 'Indotech',
      headerSubtitle: headerSubtitle.trim(),
      showWhatsAppInHeader,
      heroBadge: heroBadge.trim(),
      heroTitlePrefix: heroTitlePrefix.trim(),
      heroTitleHighlight: heroTitleHighlight.trim(),
      heroDescription: heroDescription.trim(),
      heroImage: heroImage.trim() || companySettings.heroImage,
      contactImage: contactImage.trim() || companySettings.contactImage || companySettings.heroImage,
      whatsappNumber: cleanedWa || '6281234567890',
      whatsappDefaultMessage: waDefaultMsg.trim(),
      announcementText: compAnnouncement.trim(),
      announcementCtaText: announcementCtaText.trim() || 'Chat Sales',
      isAnnouncementActive: compAnnouncementActive
    });
    setCompWa(cleanedWa || '6281234567890');
    setHeaderSaved(true);
    setTimeout(() => setHeaderSaved(false), 2500);
  };

  const handleImageFileToState = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (dataUrl: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setter(reader.result);
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanMissions = compMissionText
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean);
    updateCompanySettings({
      companyName: compName,
      tagline: compTagline,
      aboutStory: compStory,
      vision: compVision,
      mission: cleanMissions.length > 0 ? cleanMissions : companySettings.mission,
      email: compEmail,
      phone: compPhone,
      address: compAddress,
      founderName: compFounderName,
      founderRole: compFounderRole,
      founderBio: compFounderBio,
      founderAvatar: compFounderAvatar.trim() || companySettings.founderAvatar,
      operatingHours: compHours
    });
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 2500);
  };

  const handleSaveAllContent = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanMissions = compMissionText
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean);
    const cleanRegions = footerRegionsText
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean);

    updateCompanySettings({
      // Logo & Navbar
      logoText: logoText.trim() || 'AI',
      logoUrl: logoUrl.trim(),
      headerTitle: headerTitle.trim() || 'PT Asiaparts',
      headerTitleHighlight: headerTitleHighlight.trim() || 'Indotech',
      navHomeLabel: navHomeLabel.trim(),
      navAboutLabel: navAboutLabel.trim(),
      navCatalogLabel: navCatalogLabel.trim(),
      navECatalogLabel: navECatalogLabel.trim(),
      navDistributorLabel: navDistributorLabel.trim(),
      navContactLabel: navContactLabel.trim(),
      navWhatsAppLabel: navWhatsAppLabel.trim(),

      // Hero & Stats
      heroBadge: heroBadge.trim(),
      heroTitlePrefix: heroTitlePrefix.trim(),
      heroTitleHighlight: heroTitleHighlight.trim(),
      heroDescription: heroDescription.trim(),
      heroImage: heroImage.trim() || companySettings.heroImage,
      heroImageCaptionSubtitle: heroImageCaptionSubtitle.trim(),
      heroCtaCatalogText: heroCtaCatalogText.trim(),
      heroCtaWhatsAppText: heroCtaWhatsAppText.trim(),
      heroShortcutECatalog: heroShortcutECatalog.trim(),
      heroShortcutMainProducts: heroShortcutMainProducts.trim(),
      heroShortcutProfile: heroShortcutProfile.trim(),
      heroStat1Value: heroStat1Value.trim(),
      heroStat1Label: heroStat1Label.trim(),
      heroStat1Sub: heroStat1Sub.trim(),
      heroStat2Value: heroStat2Value.trim(),
      heroStat2Label: heroStat2Label.trim(),
      heroStat2Sub: heroStat2Sub.trim(),
      heroStat3Value: heroStat3Value.trim(),
      heroStat3Label: heroStat3Label.trim(),
      heroStat3Sub: heroStat3Sub.trim(),

      // About Us & Leadership
      aboutSectionBadge: aboutSectionBadge.trim(),
      aboutTitle: aboutTitle.trim(),
      aboutSubtitle: aboutSubtitle.trim(),
      aboutOverviewLabel: aboutOverviewLabel.trim(),
      aboutStory: compStory.trim(),
      vision: compVision.trim(),
      mission: cleanMissions.length > 0 ? cleanMissions : companySettings.mission,
      founderAvatar: compFounderAvatar.trim() || companySettings.founderAvatar,
      founderName: compFounderName.trim(),
      founderRole: compFounderRole.trim(),
      founderBio: compFounderBio.trim(),
      aboutPillar1Title: aboutPillar1Title.trim(),
      aboutPillar1Sub: aboutPillar1Sub.trim(),
      aboutPillar2Title: aboutPillar2Title.trim(),
      aboutPillar2Sub: aboutPillar2Sub.trim(),
      aboutPillar3Title: aboutPillar3Title.trim(),
      aboutPillar3Sub: aboutPillar3Sub.trim(),
      aboutProfileBtnText: aboutProfileBtnText.trim(),

      // Display Produk
      catalogBadge: catalogBadge.trim(),
      catalogTitle: catalogTitle.trim(),
      catalogSubtitle: catalogSubtitle.trim(),
      catalogSearchPlaceholder: catalogSearchPlaceholder.trim(),
      productDetailBtnText: productDetailBtnText.trim(),
      productInfoBtnText: productInfoBtnText.trim(),

      // E-Catalog
      ecatalogBadge: ecatalogBadge.trim(),
      ecatalogTitle: ecatalogTitle.trim(),
      ecatalogSubtitle: ecatalogSubtitle.trim(),
      ecatalogRequestAllText: ecatalogRequestAllText.trim(),
      ecatalogOpenBtnText: ecatalogOpenBtnText.trim(),
      ecatalogDownloadBtnText: ecatalogDownloadBtnText.trim(),

      // Main Products & Brand
      mainDistributorBadge: mainDistributorBadge.trim(),
      mainDistributorTitle: mainDistributorTitle.trim(),
      mainDistributorSubtitle: mainDistributorSubtitle.trim(),
      brandSectionTitle: brandSectionTitle.trim(),

      // Contact Us & Floating WA
      contactBadge: contactBadge.trim(),
      contactTitle: contactTitle.trim(),
      contactSubtitle: contactSubtitle.trim(),
      contactImage: contactImage.trim() || companySettings.contactImage || companySettings.heroImage,
      contactFormTitle: contactFormTitle.trim(),
      contactSubmitBtnText: contactSubmitBtnText.trim(),
      floatingWaDesc: floatingWaDesc.trim(),

      // Footer
      footerDesc: footerDesc.trim(),
      footerBadge1: footerBadge1.trim(),
      footerBadge2: footerBadge2.trim(),
      footerRegions: cleanRegions.length > 0 ? cleanRegions : companySettings.footerRegions,
      footerCopyrightText: footerCopyrightText.trim()
    });
    setContentSaved(true);
    setTimeout(() => setContentSaved(false), 3000);
  };

  const handleExportJson = () => {
    const payload = {
      exportedAt: new Date().toISOString(),
      companySettings,
      products,
      eCatalogs,
      distributorBrands
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'backup-asiaparts-indotech.json';
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
          eCatalogs: Array.isArray(parsed.eCatalogs) ? parsed.eCatalogs : undefined,
          distributorBrands: Array.isArray(parsed.distributorBrands)
            ? parsed.distributorBrands
            : undefined,
          companySettings:
            parsed.companySettings && typeof parsed.companySettings === 'object'
              ? parsed.companySettings
              : undefined
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
    const tsContent = `import { Product, CompanySettings, Review, Order, DailySalesMetric, ECatalogItem, DistributorBrand } from '../types';

export const initialCompanySettings: CompanySettings = ${JSON.stringify(companySettings, null, 2)};

export const initialProducts: Product[] = ${JSON.stringify(products, null, 2)};

export const initialECatalogs: ECatalogItem[] = ${JSON.stringify(eCatalogs, null, 2)};

export const initialDistributorBrands: DistributorBrand[] = ${JSON.stringify(distributorBrands, null, 2)};

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

  const filteredAdminProducts = products.filter((p) => {
    if (!productSearch.trim()) return true;
    const q = productSearch.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.sku.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  });

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
      {/* Top Admin Header */}
      <header className="sticky top-0 z-30 bg-blue-950 text-white border-b border-blue-900 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-700 flex items-center justify-center font-bold text-white shadow-sm">
              ADM
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-extrabold text-white text-base sm:text-lg">
                  Admin CMS · {companySettings.companyName}
                </h1>
                <span className="bg-blue-800 text-blue-200 border border-blue-700 text-[10px] font-mono font-bold px-2 py-0.5 rounded-md">
                  /admin
                </span>
              </div>
              <p className="text-xs text-blue-200 hidden sm:block">
                Edit Header, No. WhatsApp, Display Produk, E-Catalog & Profil Perusahaan
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigateTo('/')}
              className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5 border border-white/15 transition cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5 text-blue-300" />
              <span>Lihat Website</span>
            </button>
            <button
              onClick={logoutAdmin}
              className="px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Keluar</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-slate-50 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center overflow-x-auto scrollbar-none text-xs sm:text-sm font-bold">
            <button
              onClick={() => setAdminActiveTab('analytics')}
              className={`py-3.5 px-3.5 flex items-center gap-2 border-b-2 transition whitespace-nowrap cursor-pointer ${
                adminActiveTab === 'analytics'
                  ? 'border-blue-700 text-blue-700 bg-white'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <BarChart3 className="w-4 h-4 text-blue-700" />
              <span>Ringkasan</span>
            </button>

            <button
              onClick={() => setAdminActiveTab('header_wa')}
              className={`py-3.5 px-3.5 flex items-center gap-2 border-b-2 transition whitespace-nowrap cursor-pointer ${
                adminActiveTab === 'header_wa'
                  ? 'border-blue-700 text-blue-700 bg-white'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <LayoutTemplate className="w-4 h-4 text-blue-700" />
              <span>Header, Logo & No. WA</span>
            </button>

            <button
              onClick={() => setAdminActiveTab('content')}
              className={`py-3.5 px-3.5 flex items-center gap-2 border-b-2 transition whitespace-nowrap cursor-pointer ${
                adminActiveTab === 'content'
                  ? 'border-blue-700 text-blue-700 bg-white'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <Edit className="w-4 h-4 text-blue-700" />
              <span>Semua Konten (Teks & Foto)</span>
            </button>

            <button
              onClick={() => setAdminActiveTab('products')}
              className={`py-3.5 px-3.5 flex items-center gap-2 border-b-2 transition whitespace-nowrap cursor-pointer ${
                adminActiveTab === 'products'
                  ? 'border-blue-700 text-blue-700 bg-white'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <Package className="w-4 h-4 text-blue-700" />
              <span>Kelola Produk ({products.length})</span>
            </button>

            <button
              onClick={() => setAdminActiveTab('ecatalogs')}
              className={`py-3.5 px-3.5 flex items-center gap-2 border-b-2 transition whitespace-nowrap cursor-pointer ${
                adminActiveTab === 'ecatalogs'
                  ? 'border-blue-700 text-blue-700 bg-white'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-4 h-4 text-blue-700" />
              <span>Kelola E-Catalog ({eCatalogs.length})</span>
            </button>

            <button
              onClick={() => setAdminActiveTab('brands')}
              className={`py-3.5 px-3.5 flex items-center gap-2 border-b-2 transition whitespace-nowrap cursor-pointer ${
                adminActiveTab === 'brands'
                  ? 'border-blue-700 text-blue-700 bg-white'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <Award className="w-4 h-4 text-blue-700" />
              <span>Logo Brand ({distributorBrands.length})</span>
            </button>

            <button
              onClick={() => setAdminActiveTab('orders')}
              className={`py-3.5 px-3.5 flex items-center gap-2 border-b-2 transition whitespace-nowrap cursor-pointer ${
                adminActiveTab === 'orders'
                  ? 'border-blue-700 text-blue-700 bg-white'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <ShoppingBag className="w-4 h-4 text-blue-700" />
              <span>Permintaan ({orders.length})</span>
            </button>

            <button
              onClick={() => setAdminActiveTab('settings')}
              className={`py-3.5 px-3.5 flex items-center gap-2 border-b-2 transition whitespace-nowrap cursor-pointer ${
                adminActiveTab === 'settings'
                  ? 'border-blue-700 text-blue-700 bg-white'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <Settings className="w-4 h-4 text-slate-600" />
              <span>Profil PT</span>
            </button>

            <button
              onClick={() => setAdminActiveTab('reviews')}
              className={`py-3.5 px-3.5 flex items-center gap-2 border-b-2 transition whitespace-nowrap cursor-pointer ${
                adminActiveTab === 'reviews'
                  ? 'border-blue-700 text-blue-700 bg-white'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <Star className="w-4 h-4 text-amber-500" />
              <span>Ulasan ({reviews.length})</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto w-full p-5 sm:p-8 flex-1">
        {/* TAB 1: ANALYTICS */}
        {adminActiveTab === 'analytics' && (
          <div className="space-y-6">
            <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-900 to-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
              <div>
                <h4 className="font-bold text-sm flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-blue-300" />
                  <span>Pintasan Editor Website {companySettings.companyName}</span>
                </h4>
                <p className="text-xs text-blue-100/85 mt-0.5">
                  Kelola header, nomor WhatsApp sales, display produk, E-Catalog, serta profil perusahaan.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setAdminActiveTab('content')}
                  className="px-3.5 py-2 rounded-xl bg-white text-blue-900 hover:bg-blue-50 text-xs font-bold transition cursor-pointer"
                >
                  Edit Semua Teks & Foto
                </button>
                <button
                  onClick={() => setAdminActiveTab('header_wa')}
                  className="px-3.5 py-2 rounded-xl bg-blue-800 hover:bg-blue-700 text-white border border-blue-600 text-xs font-bold transition cursor-pointer"
                >
                  Edit Header & No. WA
                </button>
                <button
                  onClick={() => {
                    setAdminActiveTab('products');
                    handleOpenAdd();
                  }}
                  className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition cursor-pointer"
                >
                  + Tambah Produk
                </button>
                <button
                  onClick={() => setAdminActiveTab('brands')}
                  className="px-3.5 py-2 rounded-xl bg-blue-800 hover:bg-blue-700 text-white border border-blue-600 text-xs font-bold transition cursor-pointer"
                >
                  Kelola Logo Brand
                </button>
              </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 bg-white rounded-2xl border border-slate-200 space-y-1">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>Nilai RFQ / Order Tercatat</span>
                  <DollarSign className="w-4 h-4 text-blue-700" />
                </div>
                <h4 className="text-xl font-extrabold text-slate-900">
                  Rp {totalRevenue.toLocaleString('id-ID')}
                </h4>
                <span className="text-[11px] text-blue-700 font-semibold flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> Aktif Bulan Ini
                </span>
              </div>

              <div className="p-5 bg-white rounded-2xl border border-slate-200 space-y-1">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>Total Display Produk</span>
                  <Package className="w-4 h-4 text-blue-700" />
                </div>
                <h4 className="text-xl font-extrabold text-slate-900">{products.length} Unit</h4>
                <span className="text-[11px] text-slate-500">
                  {eCatalogs.length} Divisi E-Catalog aktif
                </span>
              </div>

              <div className="p-5 bg-white rounded-2xl border border-slate-200 space-y-1">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>Permintaan Masuk</span>
                  <ShoppingBag className="w-4 h-4 text-blue-700" />
                </div>
                <h4 className="text-xl font-extrabold text-slate-900">
                  {totalOrdersCount} Permintaan
                </h4>
                <span className="text-[11px] text-blue-700 font-semibold">
                  Rata-rata: Rp {avgOrderValue.toLocaleString('id-ID')}
                </span>
              </div>

              <div className="p-5 bg-white rounded-2xl border border-slate-200 space-y-1">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>Stok Menipis (≤ 15)</span>
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                </div>
                <h4 className="text-xl font-extrabold text-slate-900">{lowStockCount} Item</h4>
                <span className="text-[11px] text-amber-600 font-semibold">
                  Hari ini: Rp {todayRevenue.toLocaleString('id-ID')}
                </span>
              </div>
            </div>

            {/* Chart */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h4 className="font-bold text-base text-slate-900">
                    Aktivitas Pengadaan & Penawaran Harian
                  </h4>
                  <p className="text-xs text-slate-500">
                    Akumulasi nilai permintaan komponen 7 hari terakhir
                  </p>
                </div>
              </div>

              <div className="pt-4">
                <div className="h-44 flex items-end justify-between gap-2 sm:gap-6 border-b border-slate-200 pb-2">
                  {dailyMetrics.map((item, idx) => {
                    const heightPercent = Math.min(
                      100,
                      Math.round((item.revenue / maxMetricRevenue) * 100)
                    );
                    return (
                      <div
                        key={idx}
                        className="flex-1 flex flex-col items-center gap-2 group h-full justify-end"
                      >
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] bg-slate-900 text-white px-2 py-1 rounded whitespace-nowrap pointer-events-none mb-1">
                          Rp {(item.revenue / 1000000).toFixed(1)} Jt ({item.orderCount})
                        </div>
                        <div
                          style={{ height: `${heightPercent}%` }}
                          className="w-full max-w-[42px] bg-gradient-to-t from-blue-700 to-blue-500 rounded-t-lg group-hover:brightness-110 transition-all"
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
          </div>
        )}

        {/* TAB 2: EDIT HEADER, HERO & NO. WHATSAPP */}
        {adminActiveTab === 'header_wa' && (
          <form onSubmit={handleSaveHeaderAndWa} className="space-y-6 max-w-4xl">
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
              <div className="px-5 py-2.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs font-bold text-slate-600">
                <span>Pratinjau Header Corporate</span>
                {headerSaved && (
                  <span className="text-blue-700 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Tersimpan!
                  </span>
                )}
              </div>

              <div className="px-5 py-3.5 flex flex-wrap items-center justify-between gap-3 bg-white">
                <div className="flex items-center gap-2.5">
                  {logoUrl ? (
                    <img
                      src={logoUrl}
                      alt="Logo"
                      referrerPolicy="no-referrer"
                      className="w-9 h-9 rounded-lg object-cover border border-slate-200"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-lg bg-blue-700 flex items-center justify-center text-white font-bold text-sm">
                      {logoText || 'AI'}
                    </div>
                  )}
                  <span className="text-base font-extrabold text-slate-900">
                    {headerTitle} <span className="text-blue-700">{headerTitleHighlight}</span>
                  </span>
                </div>

                {showWhatsAppInHeader && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-700 text-white text-xs font-bold">
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span className="font-mono">+{compWa.replace(/[^0-9]/g, '')}</span>
                  </div>
                )}
              </div>
            </div>

            {/* WhatsApp Settings */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-emerald-600" />
                  <h4 className="font-bold text-base text-slate-900">
                    1. Pengaturan Nomor WhatsApp Resmi
                  </h4>
                </div>
                <a
                  href={`https://wa.me/${compWa.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                    waDefaultMsg || 'Tes koneksi WhatsApp'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-blue-700 hover:underline flex items-center gap-1"
                >
                  <span>Tes Link WA</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Nomor WhatsApp Tujuan (misal: 6281234567890):
                  </label>
                  <input
                    type="text"
                    required
                    value={compWa}
                    onChange={(e) => setCompWa(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono outline-none focus:border-blue-600"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Pesan Pembuka Default WhatsApp:
                  </label>
                  <input
                    type="text"
                    value={waDefaultMsg}
                    onChange={(e) => setWaDefaultMsg(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-blue-600"
                  />
                  <label className="flex items-center gap-2 text-xs text-slate-700 font-medium mt-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showWhatsAppInHeader}
                      onChange={(e) => setShowWhatsAppInHeader(e.target.checked)}
                      className="rounded text-blue-700"
                    />
                    <span>Tampilkan Nomor WhatsApp di Banner Hero</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Header & Logo */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <LayoutTemplate className="w-5 h-5 text-blue-700" />
                <h4 className="font-bold text-base text-slate-900">
                  2. Edit Judul Header, Logo & Banner Pengumuman
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Judul Header (Hitam):
                  </label>
                  <input
                    type="text"
                    value={headerTitle}
                    onChange={(e) => setHeaderTitle(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-blue-600 font-bold"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Sorotan Header (Biru):
                  </label>
                  <input
                    type="text"
                    value={headerTitleHighlight}
                    onChange={(e) => setHeaderTitleHighlight(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-blue-600 font-bold text-blue-700"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Inisial Ikon Logo:
                  </label>
                  <input
                    type="text"
                    maxLength={2}
                    value={logoText}
                    onChange={(e) => setLogoText(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-blue-600 font-bold text-center"
                  />
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <label className="text-xs font-semibold text-slate-700">
                    Logo PT Asiaparts Indotech (Upload atau URL):
                  </label>
                  <label className="px-3 py-1.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-[11px] font-bold inline-flex items-center gap-1.5 cursor-pointer">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Logo</span>
                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/svg+xml,image/webp"
                      onChange={(e) => handleImageFileToState(e, setLogoUrl)}
                      className="hidden"
                    />
                  </label>
                </div>
                <input
                  type="text"
                  value={logoUrl}
                  onChange={(e) => setLogoUrl(e.target.value)}
                  placeholder="https://... (kosongkan untuk memakai logo geometris biru-putih)"
                  className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs outline-none focus:border-blue-600"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-700">
                    Banner Pengumuman Atas (Opsional):
                  </label>
                  <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer font-medium">
                    <input
                      type="checkbox"
                      checked={compAnnouncementActive}
                      onChange={(e) => setCompAnnouncementActive(e.target.checked)}
                      className="rounded text-blue-700"
                    />
                    <span>Aktifkan Banner Atas</span>
                  </label>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <div className="sm:col-span-3">
                    <input
                      type="text"
                      value={compAnnouncement}
                      onChange={(e) => setCompAnnouncement(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-blue-600"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      value={announcementCtaText}
                      onChange={(e) => setAnnouncementCtaText(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-blue-600 font-semibold"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Text & Image */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <Sparkles className="w-5 h-5 text-blue-700" />
                <h4 className="font-bold text-base text-slate-900">
                  3. Edit Teks & Gambar Hero Section
                </h4>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Label Atas Hero:
                </label>
                <input
                  type="text"
                  value={heroBadge}
                  onChange={(e) => setHeroBadge(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-blue-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Judul Utama Hero:
                  </label>
                  <input
                    type="text"
                    value={heroTitlePrefix}
                    onChange={(e) => setHeroTitlePrefix(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-blue-600 font-bold"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Judul Sorotan Biru:
                  </label>
                  <input
                    type="text"
                    value={heroTitleHighlight}
                    onChange={(e) => setHeroTitleHighlight(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-blue-600 font-bold text-blue-700"
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
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-blue-600 leading-relaxed"
                />
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <label className="text-xs font-semibold text-slate-700">
                    Foto Utama Hero (Upload atau URL):
                  </label>
                  <label className="px-3 py-1.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-[11px] font-bold inline-flex items-center gap-1.5 cursor-pointer">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Foto Hero</span>
                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/webp"
                      onChange={(e) => handleImageFileToState(e, setHeroImage)}
                      className="hidden"
                    />
                  </label>
                </div>
                {heroImage && (
                  <img
                    src={heroImage}
                    alt="Preview Hero"
                    referrerPolicy="no-referrer"
                    className="w-full max-w-xs h-28 object-cover rounded-xl border border-slate-200 bg-white"
                  />
                )}
                <input
                  type="text"
                  value={heroImage}
                  onChange={(e) => setHeroImage(e.target.value)}
                  placeholder="https://... atau /assets/..."
                  className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs outline-none focus:border-blue-600"
                />
              </div>

              <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200 space-y-2.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <label className="text-xs font-bold text-blue-950">
                    Foto Bagian Contact Us (Samping Formulir):
                  </label>
                  <label className="px-3 py-1.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-[11px] font-bold inline-flex items-center gap-1.5 cursor-pointer">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Foto</span>
                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/webp"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        const reader = new FileReader();
                        reader.onload = () => {
                          if (typeof reader.result === 'string') {
                            setContactImage(reader.result);
                          }
                        };
                        reader.readAsDataURL(file);
                        e.target.value = '';
                      }}
                      className="hidden"
                    />
                  </label>
                </div>

                {contactImage && (
                  <img
                    src={contactImage}
                    alt="Preview Contact Us"
                    referrerPolicy="no-referrer"
                    className="w-full max-w-xs h-32 object-cover rounded-xl border border-slate-200 bg-white"
                  />
                )}

                <input
                  type="text"
                  value={contactImage}
                  onChange={(e) => setContactImage(e.target.value)}
                  placeholder="Atau masukkan URL foto (https://...)"
                  className="w-full p-2.5 bg-white border border-blue-200 rounded-xl text-xs outline-none focus:border-blue-600"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              {headerSaved ? (
                <span className="text-xs text-blue-700 font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Perubahan Header, Hero & WhatsApp tersimpan!
                </span>
              ) : (
                <span className="text-xs text-slate-500">
                  Perubahan langsung tampil pada halaman website.
                </span>
              )}
              <button
                type="submit"
                className="px-6 py-3 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-sm transition cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Simpan Header & No. WA</span>
              </button>
            </div>
          </form>
        )}

        {/* TAB 2B: SEMUA KONTEN HALAMAN (FOTO, TEKS & LOGO) */}
        {adminActiveTab === 'content' && (
          <form onSubmit={handleSaveAllContent} className="space-y-6 max-w-5xl">
            {/* Top Sticky/Summary Bar */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
              <div>
                <h3 className="font-extrabold text-base text-slate-900">
                  Editor Isi Konten Website (Foto, Teks & Logo)
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Sesuaikan seluruh teks judul, label tombol, deskripsi, foto, dan logo di setiap bagian halaman website.
                </p>
              </div>
              <div className="flex items-center gap-3">
                {contentSaved && (
                  <span className="text-xs text-blue-700 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Semua Konten Tersimpan!
                  </span>
                )}
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Simpan Semua Konten</span>
                </button>
              </div>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {[
                { key: 'all', label: 'Semua Bagian' },
                { key: 'navbar', label: '1. Header & Menu' },
                { key: 'hero', label: '2. Beranda / Hero' },
                { key: 'about', label: '3. Tentang Kami' },
                { key: 'catalog', label: '4. Produk' },
                { key: 'ecatalog', label: '5. E-Catalog' },
                { key: 'brands', label: '6. Main Products & Brand' },
                { key: 'contact', label: '7. Contact Us' },
                { key: 'footer', label: '8. Footer' }
              ].map((sec) => (
                <button
                  key={sec.key}
                  type="button"
                  onClick={() => setContentSectionFilter(sec.key)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                    contentSectionFilter === sec.key
                      ? 'bg-blue-700 text-white shadow-xs'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {sec.label}
                </button>
              ))}
            </div>

            {/* 1. HEADER & MENU NAVIGASI */}
            {(contentSectionFilter === 'all' || contentSectionFilter === 'navbar') && (
              <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
                <h4 className="font-bold text-sm text-blue-900 uppercase tracking-wide border-b border-slate-100 pb-2">
                  1. Header, Logo & Nama Menu Navigasi
                </h4>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-bold text-slate-800">Logo Website (Header & Footer)</span>
                    <label className="px-3 py-1.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-[11px] font-bold inline-flex items-center gap-1.5 cursor-pointer">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload Logo</span>
                      <input
                        type="file"
                        accept="image/png,image/jpeg,image/svg+xml,image/webp"
                        onChange={(e) => handleImageFileToState(e, setLogoUrl)}
                        className="hidden"
                      />
                    </label>
                  </div>
                  <div className="flex items-center gap-3">
                    {logoUrl && (
                      <img
                        src={logoUrl}
                        alt="Logo Preview"
                        referrerPolicy="no-referrer"
                        className="w-10 h-10 rounded-lg object-cover border border-slate-200 bg-white shrink-0"
                      />
                    )}
                    <input
                      type="text"
                      value={logoUrl}
                      onChange={(e) => setLogoUrl(e.target.value)}
                      placeholder="URL Logo (atau upload file di atas)"
                      className="flex-1 p-2.5 bg-white border border-slate-200 rounded-xl text-xs outline-none focus:border-blue-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Judul Header (Kiri)</label>
                    <input
                      type="text"
                      value={headerTitle}
                      onChange={(e) => setHeaderTitle(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-600"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Sorotan Header (Biru)</label>
                    <input
                      type="text"
                      value={headerTitleHighlight}
                      onChange={(e) => setHeaderTitleHighlight(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-600"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Tombol Kanan Header</label>
                    <input
                      type="text"
                      value={navWhatsAppLabel}
                      onChange={(e) => setNavWhatsAppLabel(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Menu 1</label>
                    <input
                      type="text"
                      value={navHomeLabel}
                      onChange={(e) => setNavHomeLabel(e.target.value)}
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-600"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Menu 2</label>
                    <input
                      type="text"
                      value={navAboutLabel}
                      onChange={(e) => setNavAboutLabel(e.target.value)}
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-600"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Menu 3</label>
                    <input
                      type="text"
                      value={navCatalogLabel}
                      onChange={(e) => setNavCatalogLabel(e.target.value)}
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-600"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Menu 4</label>
                    <input
                      type="text"
                      value={navECatalogLabel}
                      onChange={(e) => setNavECatalogLabel(e.target.value)}
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-600"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Menu 5</label>
                    <input
                      type="text"
                      value={navDistributorLabel}
                      onChange={(e) => setNavDistributorLabel(e.target.value)}
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-600"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Menu 6</label>
                    <input
                      type="text"
                      value={navContactLabel}
                      onChange={(e) => setNavContactLabel(e.target.value)}
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-600"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 2. HERO / BERANDA */}
            {(contentSectionFilter === 'all' || contentSectionFilter === 'hero') && (
              <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4 text-xs">
                <h4 className="font-bold text-sm text-blue-900 uppercase tracking-wide border-b border-slate-100 pb-2">
                  2. Bagian Hero / Beranda, Foto Utama & 3 Kartu Ringkasan
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Label Atas Hero</label>
                    <input
                      type="text"
                      value={heroBadge}
                      onChange={(e) => setHeroBadge(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-600"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Judul Utama (Hitam)</label>
                    <input
                      type="text"
                      value={heroTitlePrefix}
                      onChange={(e) => setHeroTitlePrefix(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-600"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Judul Sorotan (Biru)</label>
                    <input
                      type="text"
                      value={heroTitleHighlight}
                      onChange={(e) => setHeroTitleHighlight(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Deskripsi Hero</label>
                  <textarea
                    rows={2}
                    value={heroDescription}
                    onChange={(e) => setHeroDescription(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-600"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Teks Tombol Utama (Biru)</label>
                    <input
                      type="text"
                      value={heroCtaCatalogText}
                      onChange={(e) => setHeroCtaCatalogText(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-600"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Teks Tombol WhatsApp (Putih)</label>
                    <input
                      type="text"
                      value={heroCtaWhatsAppText}
                      onChange={(e) => setHeroCtaWhatsAppText(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Tautan Cepat 1</label>
                    <input
                      type="text"
                      value={heroShortcutECatalog}
                      onChange={(e) => setHeroShortcutECatalog(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-600"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Tautan Cepat 2</label>
                    <input
                      type="text"
                      value={heroShortcutMainProducts}
                      onChange={(e) => setHeroShortcutMainProducts(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-600"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Tautan Cepat 3</label>
                    <input
                      type="text"
                      value={heroShortcutProfile}
                      onChange={(e) => setHeroShortcutProfile(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-600"
                    />
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-200 space-y-2.5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-bold text-blue-950">Foto Utama Hero (Kanan)</span>
                    <label className="px-3 py-1.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-[11px] font-bold inline-flex items-center gap-1.5 cursor-pointer">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload Foto Hero</span>
                      <input
                        type="file"
                        accept="image/png,image/jpeg,image/webp"
                        onChange={(e) => handleImageFileToState(e, setHeroImage)}
                        className="hidden"
                      />
                    </label>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                    <input
                      type="text"
                      value={heroImage}
                      onChange={(e) => setHeroImage(e.target.value)}
                      placeholder="URL Foto Hero..."
                      className="w-full p-2.5 bg-white border border-blue-200 rounded-xl outline-none focus:border-blue-600"
                    />
                    <input
                      type="text"
                      value={heroImageCaptionSubtitle}
                      onChange={(e) => setHeroImageCaptionSubtitle(e.target.value)}
                      placeholder="Keterangan Bawah Foto Hero"
                      className="w-full p-2.5 bg-white border border-blue-200 rounded-xl outline-none focus:border-blue-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <span className="font-bold text-slate-800 block">Kartu Statistik 1</span>
                    <input
                      type="text"
                      value={heroStat1Value}
                      onChange={(e) => setHeroStat1Value(e.target.value)}
                      placeholder="Angka / Nilai"
                      className="w-full p-2 bg-white border border-slate-200 rounded-lg font-bold"
                    />
                    <input
                      type="text"
                      value={heroStat1Label}
                      onChange={(e) => setHeroStat1Label(e.target.value)}
                      placeholder="Judul Biru"
                      className="w-full p-2 bg-white border border-slate-200 rounded-lg"
                    />
                    <input
                      type="text"
                      value={heroStat1Sub}
                      onChange={(e) => setHeroStat1Sub(e.target.value)}
                      placeholder="Keterangan Singkat"
                      className="w-full p-2 bg-white border border-slate-200 rounded-lg"
                    />
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <span className="font-bold text-slate-800 block">Kartu Statistik 2</span>
                    <input
                      type="text"
                      value={heroStat2Value}
                      onChange={(e) => setHeroStat2Value(e.target.value)}
                      placeholder="Angka / Nilai"
                      className="w-full p-2 bg-white border border-slate-200 rounded-lg font-bold"
                    />
                    <input
                      type="text"
                      value={heroStat2Label}
                      onChange={(e) => setHeroStat2Label(e.target.value)}
                      placeholder="Judul Biru"
                      className="w-full p-2 bg-white border border-slate-200 rounded-lg"
                    />
                    <input
                      type="text"
                      value={heroStat2Sub}
                      onChange={(e) => setHeroStat2Sub(e.target.value)}
                      placeholder="Keterangan Singkat"
                      className="w-full p-2 bg-white border border-slate-200 rounded-lg"
                    />
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <span className="font-bold text-slate-800 block">Kartu Statistik 3</span>
                    <input
                      type="text"
                      value={heroStat3Value}
                      onChange={(e) => setHeroStat3Value(e.target.value)}
                      placeholder="Angka / Nilai"
                      className="w-full p-2 bg-white border border-slate-200 rounded-lg font-bold"
                    />
                    <input
                      type="text"
                      value={heroStat3Label}
                      onChange={(e) => setHeroStat3Label(e.target.value)}
                      placeholder="Judul Biru"
                      className="w-full p-2 bg-white border border-slate-200 rounded-lg"
                    />
                    <input
                      type="text"
                      value={heroStat3Sub}
                      onChange={(e) => setHeroStat3Sub(e.target.value)}
                      placeholder="Keterangan Singkat"
                      className="w-full p-2 bg-white border border-slate-200 rounded-lg"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 3. TENTANG KAMI (ABOUT US) */}
            {(contentSectionFilter === 'all' || contentSectionFilter === 'about') && (
              <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4 text-xs">
                <h4 className="font-bold text-sm text-blue-900 uppercase tracking-wide border-b border-slate-100 pb-2">
                  3. Tentang Perusahaan, Foto Pimpinan, Visi-Misi & 3 Pilar
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Badge Seksi</label>
                    <input
                      type="text"
                      value={aboutSectionBadge}
                      onChange={(e) => setAboutSectionBadge(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-600"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Judul Besar Seksi</label>
                    <input
                      type="text"
                      value={aboutTitle}
                      onChange={(e) => setAboutTitle(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-600 font-bold"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Label Kecil Atas Nama PT</label>
                    <input
                      type="text"
                      value={aboutOverviewLabel}
                      onChange={(e) => setAboutOverviewLabel(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Subjudul Tentang Perusahaan</label>
                  <input
                    type="text"
                    value={aboutSubtitle}
                    onChange={(e) => setAboutSubtitle(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-600"
                  />
                </div>

                <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-200 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-bold text-blue-950">Foto Kartu Profil / Pimpinan (Kiri)</span>
                    <label className="px-3 py-1.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-[11px] font-bold inline-flex items-center gap-1.5 cursor-pointer">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload Foto</span>
                      <input
                        type="file"
                        accept="image/png,image/jpeg,image/webp"
                        onChange={(e) => handleImageFileToState(e, setCompFounderAvatar)}
                        className="hidden"
                      />
                    </label>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                    {compFounderAvatar && (
                      <img
                        src={compFounderAvatar}
                        alt="Preview Profil"
                        referrerPolicy="no-referrer"
                        className="w-24 h-18 object-cover rounded-lg border border-slate-200 bg-white shrink-0"
                      />
                    )}
                    <input
                      type="text"
                      value={compFounderAvatar}
                      onChange={(e) => setCompFounderAvatar(e.target.value)}
                      placeholder="URL Foto Profil / Pimpinan..."
                      className="flex-1 w-full p-2.5 bg-white border border-blue-200 rounded-xl outline-none focus:border-blue-600"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={compFounderName}
                      onChange={(e) => setCompFounderName(e.target.value)}
                      placeholder="Nama Pimpinan"
                      className="w-full p-2.5 bg-white border border-blue-200 rounded-xl font-bold"
                    />
                    <input
                      type="text"
                      value={compFounderRole}
                      onChange={(e) => setCompFounderRole(e.target.value)}
                      placeholder="Jabatan Pimpinan"
                      className="w-full p-2.5 bg-white border border-blue-200 rounded-xl"
                    />
                  </div>
                  <input
                    type="text"
                    value={compFounderBio}
                    onChange={(e) => setCompFounderBio(e.target.value)}
                    placeholder="Deskripsi Singkat Pimpinan"
                    className="w-full p-2.5 bg-white border border-blue-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Teks Perkenalan Perusahaan (About Story)</label>
                  <textarea
                    rows={3}
                    value={compStory}
                    onChange={(e) => setCompStory(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-600"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Visi Perusahaan</label>
                    <textarea
                      rows={3}
                      value={compVision}
                      onChange={(e) => setCompVision(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-600"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">
                      Misi Perusahaan (1 poin per baris)
                    </label>
                    <textarea
                      rows={3}
                      value={compMissionText}
                      onChange={(e) => setCompMissionText(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <span className="font-bold text-slate-800 block">Pilar 1</span>
                    <input
                      type="text"
                      value={aboutPillar1Title}
                      onChange={(e) => setAboutPillar1Title(e.target.value)}
                      className="w-full p-2 bg-white border border-slate-200 rounded-lg font-bold"
                    />
                    <input
                      type="text"
                      value={aboutPillar1Sub}
                      onChange={(e) => setAboutPillar1Sub(e.target.value)}
                      className="w-full p-2 bg-white border border-slate-200 rounded-lg"
                    />
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <span className="font-bold text-slate-800 block">Pilar 2</span>
                    <input
                      type="text"
                      value={aboutPillar2Title}
                      onChange={(e) => setAboutPillar2Title(e.target.value)}
                      className="w-full p-2 bg-white border border-slate-200 rounded-lg font-bold"
                    />
                    <input
                      type="text"
                      value={aboutPillar2Sub}
                      onChange={(e) => setAboutPillar2Sub(e.target.value)}
                      className="w-full p-2 bg-white border border-slate-200 rounded-lg"
                    />
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <span className="font-bold text-slate-800 block">Pilar 3</span>
                    <input
                      type="text"
                      value={aboutPillar3Title}
                      onChange={(e) => setAboutPillar3Title(e.target.value)}
                      className="w-full p-2 bg-white border border-slate-200 rounded-lg font-bold"
                    />
                    <input
                      type="text"
                      value={aboutPillar3Sub}
                      onChange={(e) => setAboutPillar3Sub(e.target.value)}
                      className="w-full p-2 bg-white border border-slate-200 rounded-lg"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Teks Tombol Profil Lengkap</label>
                  <input
                    type="text"
                    value={aboutProfileBtnText}
                    onChange={(e) => setAboutProfileBtnText(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-600"
                  />
                </div>
              </div>
            )}

            {/* 4. DISPLAY PRODUK */}
            {(contentSectionFilter === 'all' || contentSectionFilter === 'catalog') && (
              <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4 text-xs">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2">
                  <h4 className="font-bold text-sm text-blue-900 uppercase tracking-wide">
                    4. Teks Bagian Display Produk & Tombol Kartu Produk
                  </h4>
                  <button
                    type="button"
                    onClick={() => setAdminActiveTab('products')}
                    className="text-xs font-bold text-blue-700 hover:underline cursor-pointer"
                  >
                    Buka Edit Daftar Produk & Foto Barang →
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Badge Seksi Produk</label>
                    <input
                      type="text"
                      value={catalogBadge}
                      onChange={(e) => setCatalogBadge(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-600"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Judul Seksi Produk</label>
                    <input
                      type="text"
                      value={catalogTitle}
                      onChange={(e) => setCatalogTitle(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold outline-none focus:border-blue-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Subjudul Display Produk</label>
                  <input
                    type="text"
                    value={catalogSubtitle}
                    onChange={(e) => setCatalogSubtitle(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-600"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Placeholder Pencarian</label>
                    <input
                      type="text"
                      value={catalogSearchPlaceholder}
                      onChange={(e) => setCatalogSearchPlaceholder(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-600"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Teks Tombol Kiri Kartu</label>
                    <input
                      type="text"
                      value={productDetailBtnText}
                      onChange={(e) => setProductDetailBtnText(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-600"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Teks Tombol Kanan Kartu</label>
                    <input
                      type="text"
                      value={productInfoBtnText}
                      onChange={(e) => setProductInfoBtnText(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-600"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 5. E-CATALOG */}
            {(contentSectionFilter === 'all' || contentSectionFilter === 'ecatalog') && (
              <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4 text-xs">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2">
                  <h4 className="font-bold text-sm text-blue-900 uppercase tracking-wide">
                    5. Teks Bagian E-Catalog & Label Tombol Unduh
                  </h4>
                  <button
                    type="button"
                    onClick={() => setAdminActiveTab('ecatalogs')}
                    className="text-xs font-bold text-blue-700 hover:underline cursor-pointer"
                  >
                    Buka Edit Daftar E-Catalog & File PDF →
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Badge Seksi E-Catalog</label>
                    <input
                      type="text"
                      value={ecatalogBadge}
                      onChange={(e) => setEcatalogBadge(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-600"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Judul Seksi E-Catalog</label>
                    <input
                      type="text"
                      value={ecatalogTitle}
                      onChange={(e) => setEcatalogTitle(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold outline-none focus:border-blue-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Subjudul Seksi E-Catalog</label>
                  <input
                    type="text"
                    value={ecatalogSubtitle}
                    onChange={(e) => setEcatalogSubtitle(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-600"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Tombol Minta Semua Katalog</label>
                    <input
                      type="text"
                      value={ecatalogRequestAllText}
                      onChange={(e) => setEcatalogRequestAllText(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-600"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Tombol Buka Katalog</label>
                    <input
                      type="text"
                      value={ecatalogOpenBtnText}
                      onChange={(e) => setEcatalogOpenBtnText(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-600"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Tombol Download File</label>
                    <input
                      type="text"
                      value={ecatalogDownloadBtnText}
                      onChange={(e) => setEcatalogDownloadBtnText(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-600"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 6. MAIN PRODUCTS & BRAND */}
            {(contentSectionFilter === 'all' || contentSectionFilter === 'brands') && (
              <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4 text-xs">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2">
                  <h4 className="font-bold text-sm text-blue-900 uppercase tracking-wide">
                    6. Our Main Products & Judul Galeri Logo Brand
                  </h4>
                  <button
                    type="button"
                    onClick={() => setAdminActiveTab('brands')}
                    className="text-xs font-bold text-blue-700 hover:underline cursor-pointer"
                  >
                    Buka Edit 16 Logo Brand Distributor →
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Badge Atas Main Products</label>
                    <input
                      type="text"
                      value={mainDistributorBadge}
                      onChange={(e) => setMainDistributorBadge(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-600"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Judul Kotak Logo Brand</label>
                    <input
                      type="text"
                      value={brandSectionTitle}
                      onChange={(e) => setBrandSectionTitle(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold outline-none focus:border-blue-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Judul Utama Main Products & Distributor</label>
                  <input
                    type="text"
                    value={mainDistributorTitle}
                    onChange={(e) => setMainDistributorTitle(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Subjudul Main Products</label>
                  <textarea
                    rows={2}
                    value={mainDistributorSubtitle}
                    onChange={(e) => setMainDistributorSubtitle(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-600"
                  />
                </div>
              </div>
            )}

            {/* 7. CONTACT US & FLOATING WA */}
            {(contentSectionFilter === 'all' || contentSectionFilter === 'contact') && (
              <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4 text-xs">
                <h4 className="font-bold text-sm text-blue-900 uppercase tracking-wide border-b border-slate-100 pb-2">
                  7. Bagian Contact Us, Foto Samping Formulir & Widget WhatsApp
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Badge Seksi Contact Us</label>
                    <input
                      type="text"
                      value={contactBadge}
                      onChange={(e) => setContactBadge(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-600"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Judul Seksi Contact Us</label>
                    <input
                      type="text"
                      value={contactTitle}
                      onChange={(e) => setContactTitle(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold outline-none focus:border-blue-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Subjudul Contact Us</label>
                  <input
                    type="text"
                    value={contactSubtitle}
                    onChange={(e) => setContactSubtitle(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-600"
                  />
                </div>

                <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-200 space-y-2.5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-bold text-blue-950">Foto Sebelah Kiri Formulir Contact Us</span>
                    <label className="px-3 py-1.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-[11px] font-bold inline-flex items-center gap-1.5 cursor-pointer">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload Foto</span>
                      <input
                        type="file"
                        accept="image/png,image/jpeg,image/webp"
                        onChange={(e) => handleImageFileToState(e, setContactImage)}
                        className="hidden"
                      />
                    </label>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                    {contactImage && (
                      <img
                        src={contactImage}
                        alt="Preview Contact"
                        referrerPolicy="no-referrer"
                        className="w-24 h-18 object-cover rounded-lg border border-slate-200 bg-white shrink-0"
                      />
                    )}
                    <input
                      type="text"
                      value={contactImage}
                      onChange={(e) => setContactImage(e.target.value)}
                      placeholder="URL Foto Contact Us..."
                      className="flex-1 w-full p-2.5 bg-white border border-blue-200 rounded-xl outline-none focus:border-blue-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Judul Atas Formulir WA</label>
                    <input
                      type="text"
                      value={contactFormTitle}
                      onChange={(e) => setContactFormTitle(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-600"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Teks Tombol Kirim Formulir</label>
                    <input
                      type="text"
                      value={contactSubmitBtnText}
                      onChange={(e) => setContactSubmitBtnText(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    Pesan Widget Tombol WhatsApp Mengambang (Pojok Kanan Bawah)
                  </label>
                  <input
                    type="text"
                    value={floatingWaDesc}
                    onChange={(e) => setFloatingWaDesc(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-600"
                  />
                </div>
              </div>
            )}

            {/* 8. FOOTER */}
            {(contentSectionFilter === 'all' || contentSectionFilter === 'footer') && (
              <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4 text-xs">
                <h4 className="font-bold text-sm text-blue-900 uppercase tracking-wide border-b border-slate-100 pb-2">
                  8. Footer Website (Deskripsi, Badge, Wilayah Distribusi & Hak Cipta)
                </h4>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Deskripsi Singkat Perusahaan di Footer</label>
                  <textarea
                    rows={2}
                    value={footerDesc}
                    onChange={(e) => setFooterDesc(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-600"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Lencana Footer 1</label>
                    <input
                      type="text"
                      value={footerBadge1}
                      onChange={(e) => setFooterBadge1(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-600"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Lencana Footer 2</label>
                    <input
                      type="text"
                      value={footerBadge2}
                      onChange={(e) => setFooterBadge2(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">
                      Wilayah Jangkauan Distribusi (1 wilayah per baris)
                    </label>
                    <textarea
                      rows={4}
                      value={footerRegionsText}
                      onChange={(e) => setFooterRegionsText(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-600"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Teks Hak Cipta Bawah</label>
                    <input
                      type="text"
                      value={footerCopyrightText}
                      onChange={(e) => setFooterCopyrightText(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-600"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center justify-end gap-3 pt-2">
              {contentSaved && (
                <span className="text-xs text-blue-700 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> Semua Konten Tersimpan!
                </span>
              )}
              <button
                type="submit"
                className="px-6 py-3 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-sm transition cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Simpan Semua Perubahan Konten</span>
              </button>
            </div>
          </form>
        )}

        {/* TAB 3: PRODUCTS CMS */}
        {adminActiveTab === 'products' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200">
              <div className="flex items-center gap-3 flex-1">
                <span className="font-bold text-sm text-slate-800 whitespace-nowrap">
                  Display Produk ({products.length})
                </span>
                <div className="relative flex-1 max-w-xs">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    placeholder="Cari nama produk atau SKU..."
                    className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <button
                onClick={handleOpenAdd}
                className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Produk Baru</span>
              </button>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
                    <tr>
                      <th className="p-3.5">Produk</th>
                      <th className="p-3.5">Kategori & Part No</th>
                      <th className="p-3.5">Estimasi Harga</th>
                      <th className="p-3.5">Stok</th>
                      <th className="p-3.5">Spesifikasi</th>
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
                              referrerPolicy="no-referrer"
                              className="w-12 h-12 rounded-lg object-cover border border-slate-200 shrink-0 bg-slate-100"
                            />
                            <div className="max-w-xs">
                              <span className="font-bold text-slate-900 block truncate">
                                {p.name}
                              </span>
                              <span className="text-[11px] text-slate-500">
                                ★ {p.rating} ({p.reviewCount} ulasan)
                              </span>
                            </div>
                          </div>
                        </td>

                        <td className="p-3.5">
                          <span className="font-semibold text-blue-700 block">{p.category}</span>
                          <span className="font-mono text-slate-400 text-[11px]">{p.sku}</span>
                        </td>

                        <td className="p-3.5 font-bold text-slate-900">
                          Rp {p.price.toLocaleString('id-ID')}
                        </td>

                        <td className="p-3.5">
                          <span
                            className={`px-2.5 py-1 rounded-lg font-bold text-xs ${
                              p.stock > 15
                                ? 'bg-blue-50 text-blue-700'
                                : 'bg-amber-50 text-amber-700'
                            }`}
                          >
                            {p.stock} unit
                          </span>
                        </td>

                        <td className="p-3.5 text-[11px] text-slate-500">
                          {p.specifications.length} baris spek · {p.images.length} foto
                        </td>

                        <td className="p-3.5 text-right whitespace-nowrap space-x-1">
                          <button
                            onClick={() => handleOpenEdit(p)}
                            className="px-2.5 py-1.5 text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg font-semibold inline-flex items-center gap-1 transition cursor-pointer"
                          >
                            <Edit className="w-3.5 h-3.5" />
                            <span>Edit</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeletingProduct(p)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition cursor-pointer"
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

        {/* TAB 4: E-CATALOG MANAGEMENT */}
        {adminActiveTab === 'ecatalogs' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200">
              <div>
                <h4 className="font-bold text-sm text-slate-900">
                  Manajemen E-Catalog Digital ({eCatalogs.length} Edisi)
                </h4>
                <p className="text-xs text-slate-500">
                  Tambah atau perbarui edisi E-Catalog yang tampil di halaman depan.
                </p>
              </div>
              <button
                onClick={handleOpenAddCatalog}
                className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah E-Catalog Baru</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {eCatalogs.map((cat) => (
                <div
                  key={cat.id}
                  className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col justify-between gap-4"
                >
                  <div className="flex items-start gap-4">
                    <img
                      src={cat.coverImage}
                      alt={cat.title}
                      referrerPolicy="no-referrer"
                      className="w-20 h-20 rounded-xl object-cover border border-slate-200 shrink-0 bg-slate-100"
                    />
                    <div className="space-y-1 flex-1 min-w-0">
                      <span className="text-[11px] font-mono font-bold text-blue-700 block">
                        {cat.code} · {cat.edition}
                      </span>
                      <h5 className="font-bold text-sm text-slate-900 truncate">{cat.title}</h5>
                      <p className="text-xs text-slate-500">
                        Divisi: <strong>{cat.category}</strong> · {cat.pageCount} Halaman
                      </p>
                      <p className="text-xs text-slate-600 line-clamp-2">{cat.description}</p>
                      <p className="text-[11px] font-mono text-blue-700 truncate pt-1">
                        File PDF: {cat.pdfUrl || `/catalogs/${cat.code}.pdf`}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => handleOpenEditCatalog(cat)}
                      className="px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold inline-flex items-center gap-1 cursor-pointer"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeletingCatalog(cat)}
                      className="px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold inline-flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Hapus</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4B: DISTRIBUTOR BRANDS & LOGOS */}
        {adminActiveTab === 'brands' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200">
              <div>
                <h4 className="font-bold text-sm text-slate-900">
                  Logo Brand & Principal Distributor ({distributorBrands.length} Brand)
                </h4>
                <p className="text-xs text-slate-500">
                  Logo brand yang tampil pada bagian &ldquo;Our Main Products &amp; Distributor Product of PT ASIAPARTS&rdquo;.
                </p>
              </div>
              <button
                onClick={handleOpenAddBrand}
                className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Brand & Logo</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {distributorBrands.map((brand) => (
                <div
                  key={brand.id}
                  className="bg-white rounded-2xl border border-slate-200 p-4 flex flex-col justify-between gap-3"
                >
                  <div className="space-y-2.5">
                    <div className="h-20 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center p-3 overflow-hidden">
                      {brand.logoUrl ? (
                        <img
                          src={brand.logoUrl}
                          alt={brand.name}
                          referrerPolicy="no-referrer"
                          className="max-h-14 max-w-full object-contain"
                        />
                      ) : (
                        <span className="text-sm font-extrabold text-blue-800">{brand.name}</span>
                      )}
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase text-blue-700 block">
                        {brand.status}
                      </span>
                      <h5 className="font-bold text-sm text-slate-900 truncate">{brand.name}</h5>
                      <p className="text-[11px] text-slate-500">{brand.category}</p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => handleOpenEditBrand(brand)}
                      className="px-2.5 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold inline-flex items-center gap-1 cursor-pointer"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeletingBrand(brand)}
                      className="px-2.5 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold inline-flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Hapus</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: ORDERS / INQUIRIES */}
        {adminActiveTab === 'orders' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200">
              <div className="flex items-center gap-2 overflow-x-auto">
                {(
                  [
                    'all',
                    'pending_payment',
                    'paid',
                    'processing',
                    'shipped',
                    'completed',
                    'cancelled'
                  ] as const
                ).map((st) => (
                  <button
                    key={st}
                    onClick={() => setOrderFilter(st)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                      orderFilter === st
                        ? 'bg-blue-700 text-white'
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
                  placeholder="Cari No. Order / Klien..."
                  className="pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-blue-600"
                />
              </div>
            </div>

            <div className="space-y-4">
              {filteredOrders.length === 0 ? (
                <div className="bg-white p-8 rounded-2xl text-center text-slate-400 text-xs">
                  Tidak ada permintaan ditemukan.
                </div>
              ) : (
                filteredOrders.map((ord) => (
                  <div
                    key={ord.id}
                    className="bg-white p-5 rounded-2xl border border-slate-200 space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sm font-bold text-slate-900">
                            {ord.orderNumber}
                          </span>
                          <span className="text-xs text-slate-400">· {ord.createdAt}</span>
                        </div>
                        <p className="text-xs text-slate-600 mt-0.5">
                          Klien: <strong>{ord.customerName}</strong> ({ord.customerPhone}) ·{' '}
                          {ord.customerCity}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-slate-500">Status:</span>
                        <select
                          value={ord.orderStatus}
                          onChange={(e) =>
                            updateOrderStatus(ord.id, e.target.value as OrderStatus)
                          }
                          className="bg-slate-100 border border-slate-200 text-xs font-bold rounded-lg p-1.5 outline-none focus:border-blue-600 cursor-pointer"
                        >
                          <option value="pending_payment">Menunggu Konfirmasi</option>
                          <option value="paid">Terkonfirmasi</option>
                          <option value="processing">Sedang Diproses</option>
                          <option value="shipped">Dalam Pengiriman</option>
                          <option value="completed">Selesai</option>
                          <option value="cancelled">Dibatalkan</option>
                        </select>
                      </div>
                    </div>

                    <div className="pt-1 flex flex-wrap items-center justify-between gap-3 text-xs">
                      <div>
                        <span className="text-slate-500">Estimasi Nilai: </span>
                        <strong className="text-base text-slate-950">
                          Rp {ord.total.toLocaleString('id-ID')}
                        </strong>
                      </div>

                      <a
                        href={formatWhatsAppUrl(
                          `Halo ${ord.customerName}, kami dari ${companySettings.companyName} menindaklanjuti permintaan No. ${ord.orderNumber} (status: ${ord.orderStatus.toUpperCase()}).`
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold flex items-center gap-1.5 transition"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Hubungi via WhatsApp</span>
                      </a>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* TAB 6: COMPANY PROFILE & SYNC */}
        {adminActiveTab === 'settings' && (
          <form onSubmit={handleSaveSettings} className="space-y-6 max-w-3xl">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <h4 className="font-bold text-base text-slate-900">
                  Profil Perusahaan PT Asiaparts Indotech
                </h4>
                {settingsSaved && (
                  <span className="text-xs text-blue-700 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Tersimpan!
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Nama Perusahaan:
                  </label>
                  <input
                    type="text"
                    value={compName}
                    onChange={(e) => setCompName(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-blue-600"
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
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Perkenalan / Tentang Perusahaan (About Us):
                </label>
                <textarea
                  rows={4}
                  value={compStory}
                  onChange={(e) => setCompStory(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-blue-600 leading-relaxed"
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
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-blue-600"
                />
              </div>

              <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-200 space-y-2.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <label className="text-xs font-bold text-blue-950">
                    Foto Pimpinan / Profil Perusahaan (About Us):
                  </label>
                  <label className="px-3 py-1.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-[11px] font-bold inline-flex items-center gap-1.5 cursor-pointer">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Foto</span>
                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/webp"
                      onChange={(e) => handleImageFileToState(e, setCompFounderAvatar)}
                      className="hidden"
                    />
                  </label>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                  {compFounderAvatar && (
                    <img
                      src={compFounderAvatar}
                      alt="Preview Pimpinan"
                      referrerPolicy="no-referrer"
                      className="w-20 h-16 object-cover rounded-lg border border-slate-200 bg-white shrink-0"
                    />
                  )}
                  <input
                    type="text"
                    value={compFounderAvatar}
                    onChange={(e) => setCompFounderAvatar(e.target.value)}
                    placeholder="URL Foto Profil / Pimpinan..."
                    className="flex-1 w-full p-2.5 bg-white border border-blue-200 rounded-xl text-xs outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Nama Pimpinan / Direktur:
                  </label>
                  <input
                    type="text"
                    value={compFounderName}
                    onChange={(e) => setCompFounderName(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-blue-600"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Jabatan Pimpinan:
                  </label>
                  <input
                    type="text"
                    value={compFounderRole}
                    onChange={(e) => setCompFounderRole(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Profil Singkat Pimpinan:
                </label>
                <input
                  type="text"
                  value={compFounderBio}
                  onChange={(e) => setCompFounderBio(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Misi Perusahaan (1 poin per baris):
                </label>
                <textarea
                  rows={3}
                  value={compMissionText}
                  onChange={(e) => setCompMissionText(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-blue-600 leading-relaxed"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Telepon Kantor:
                </label>
                <input
                  type="text"
                  value={compPhone}
                  onChange={(e) => setCompPhone(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-blue-600 font-mono"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Email Perusahaan:
                  </label>
                  <input
                    type="email"
                    value={compEmail}
                    onChange={(e) => setCompEmail(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-blue-600"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Jam Operasional:
                  </label>
                  <input
                    type="text"
                    value={compHours}
                    onChange={(e) => setCompHours(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Alamat Kantor & Gudang:
                </label>
                <input
                  type="text"
                  value={compAddress}
                  onChange={(e) => setCompAddress(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-blue-600"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-3 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Simpan Profil Perusahaan</span>
              </button>
            </div>

            {/* Backup & Publish Sync */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
              <div>
                <h4 className="font-bold text-base text-slate-900">
                  Ekspor Backup & Sinkronisasi Publish Permanen
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Gunakan Export/Import JSON untuk memindahkan data antar perangkat, atau unduh{' '}
                  <code>initialData.ts</code> untuk memperbarui data bawaan sebelum publish ulang.
                </p>
              </div>

              {syncNotice && (
                <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-xs font-semibold text-blue-900 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-700 shrink-0" />
                  <span>{syncNotice}</span>
                </div>
              )}

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handleExportJson}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-2 transition cursor-pointer"
                >
                  <Download className="w-4 h-4 text-blue-300" />
                  <span>Export Backup (.json)</span>
                </button>

                <label className="px-4 py-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200 text-xs font-bold flex items-center gap-2 cursor-pointer transition">
                  <Upload className="w-4 h-4 text-blue-700" />
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
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 text-xs font-bold flex items-center gap-2 transition cursor-pointer"
                >
                  <FileCode className="w-4 h-4 text-blue-700" />
                  <span>Download initialData.ts</span>
                </button>
              </div>
            </div>
          </form>
        )}

        {/* TAB 7: REVIEWS */}
        {adminActiveTab === 'reviews' && (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-2xl border border-slate-200">
              <span className="font-bold text-sm text-slate-800">Ulasan & Testimoni Klien</span>
              <p className="text-xs text-slate-500">
                Umpan balik klien yang tampil pada halaman detail produk.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {reviews.map((rev) => (
                <div
                  key={rev.id}
                  className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2"
                >
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
                    <span className="text-blue-700 font-semibold">✓ Klien Terverifikasi</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* PRODUCT ADD / EDIT MODAL */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/80">
          <div className="bg-white w-full max-w-2xl max-h-[92vh] rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
            <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Package className="w-5 h-5 text-blue-700" />
                <h4 className="font-bold text-sm sm:text-base text-slate-900">
                  {editingProduct ? 'Edit Informasi & Spesifikasi Produk' : 'Tambah Produk Baru'}
                </h4>
              </div>
              <button
                onClick={() => setIsProductModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="p-5 sm:p-6 overflow-y-auto space-y-5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    Nama Produk (Indonesia) *
                  </label>
                  <input
                    type="text"
                    required
                    value={prodName}
                    onChange={(e) => setProdName(e.target.value)}
                    placeholder="Contoh: Pneumatic Solenoid Valve"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-600 font-semibold"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    Nama Produk (English - Opsional)
                  </label>
                  <input
                    type="text"
                    value={prodNameEn}
                    onChange={(e) => setProdNameEn(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Kategori</label>
                  <select
                    value={prodCategory}
                    onChange={(e) => setProdCategory(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-600"
                  >
                    <option value="Pneumatic & Valve">Pneumatic & Valve</option>
                    <option value="Motion & Gearbox">Motion & Gearbox</option>
                    <option value="Automation & PLC">Automation & PLC</option>
                    <option value="Bearing & Linear">Bearing & Linear</option>
                    <option value="__custom__">+ Tulis Kategori Baru...</option>
                  </select>
                  {prodCategory === '__custom__' && (
                    <input
                      type="text"
                      required
                      value={prodCustomCategory}
                      onChange={(e) => setProdCustomCategory(e.target.value)}
                      placeholder="Masukkan nama kategori baru"
                      className="mt-2 w-full p-2.5 bg-blue-50 border border-blue-300 rounded-xl outline-none focus:border-blue-600"
                    />
                  )}
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Part Number / SKU</label>
                  <input
                    type="text"
                    value={prodSku}
                    onChange={(e) => setProdSku(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-600 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    Estimasi Harga (Rp) *
                  </label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={prodPrice}
                    onChange={(e) => setProdPrice(Number(e.target.value))}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-600 font-bold"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    Harga Coret (Rp)
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={prodOriginalPrice}
                    onChange={(e) => setProdOriginalPrice(Number(e.target.value))}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Stok Unit</label>
                  <input
                    type="number"
                    min={0}
                    value={prodStock}
                    onChange={(e) => setProdStock(Number(e.target.value))}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-600 font-bold"
                  />
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800 flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4 text-blue-700" />
                    <span>Foto Produk (Upload File atau URL Gambar)</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setProdImages([...prodImages, ''])}
                    className="px-2.5 py-1 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg text-[11px] font-bold text-slate-700 cursor-pointer"
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
                          referrerPolicy="no-referrer"
                          className="w-9 h-9 rounded-lg object-cover border border-slate-200 shrink-0 bg-white"
                        />
                      )}
                      <input
                        type="text"
                        value={imgUrl}
                        onChange={(e) => {
                          const updated = [...prodImages];
                          updated[idx] = e.target.value;
                          setProdImages(updated);
                        }}
                        placeholder="https://... atau klik Upload"
                        className="flex-1 p-2 bg-white border border-slate-200 rounded-xl outline-none focus:border-blue-600"
                      />
                      <label className="px-2.5 py-2 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-[11px] font-bold inline-flex items-center gap-1 shrink-0 cursor-pointer">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload</span>
                        <input
                          type="file"
                          accept="image/png,image/jpeg,image/webp"
                          onChange={(e) =>
                            handleImageFileToState(e, (dataUrl) => {
                              const updated = [...prodImages];
                              updated[idx] = dataUrl;
                              setProdImages(updated);
                            })
                          }
                          className="hidden"
                        />
                      </label>
                      {prodImages.length > 1 && (
                        <button
                          type="button"
                          onClick={() => setProdImages(prodImages.filter((_, i) => i !== idx))}
                          className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Deskripsi Lengkap Produk
                </label>
                <textarea
                  rows={3}
                  value={prodDesc}
                  onChange={(e) => setProdDesc(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-600 leading-relaxed"
                />
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800 flex items-center gap-1.5">
                    <ListChecks className="w-4 h-4 text-blue-700" />
                    <span>Spesifikasi Teknis</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setProdSpecs([...prodSpecs, { label: '', value: '' }])}
                    className="px-2.5 py-1 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg text-[11px] font-bold text-slate-700 cursor-pointer"
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
                        placeholder="Label (misal: Material)"
                        className="w-1/3 p-2 bg-white border border-slate-200 rounded-xl outline-none focus:border-blue-600 font-semibold"
                      />
                      <input
                        type="text"
                        value={spec.value}
                        onChange={(e) => {
                          const updated = [...prodSpecs];
                          updated[idx] = { ...updated[idx], value: e.target.value };
                          setProdSpecs(updated);
                        }}
                        placeholder="Nilai (misal: Stainless Steel 316)"
                        className="flex-1 p-2 bg-white border border-slate-200 rounded-xl outline-none focus:border-blue-600"
                      />
                      <button
                        type="button"
                        onClick={() => setProdSpecs(prodSpecs.filter((_, i) => i !== idx))}
                        className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-2 border-t border-slate-100">
                <label className="flex items-center gap-2 cursor-pointer font-medium">
                  <input
                    type="checkbox"
                    checked={prodFeatured}
                    onChange={(e) => setProdFeatured(e.target.checked)}
                    className="rounded text-blue-700"
                  />
                  <span>Produk Unggulan</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer font-medium">
                  <input
                    type="checkbox"
                    checked={prodBestSeller}
                    onChange={(e) => setProdBestSeller(e.target.checked)}
                    className="rounded text-blue-700"
                  />
                  <span>Paling Diminati</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer font-medium">
                  <input
                    type="checkbox"
                    checked={prodIsNew}
                    onChange={(e) => setProdIsNew(e.target.checked)}
                    className="rounded text-blue-700"
                  />
                  <span>Unit Baru</span>
                </label>
              </div>

              <div className="pt-4 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 rounded-xl font-semibold text-slate-700 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-xl font-bold shadow-sm cursor-pointer"
                >
                  Simpan Produk
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* E-CATALOG ADD / EDIT MODAL */}
      {isCatalogModalOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/80">
          <div className="bg-white w-full max-w-xl max-h-[92vh] rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
            <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-700" />
                <h4 className="font-bold text-sm sm:text-base text-slate-900">
                  {editingCatalog ? 'Edit E-Catalog' : 'Tambah E-Catalog Baru'}
                </h4>
              </div>
              <button
                onClick={() => setIsCatalogModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCatalog} className="p-5 sm:p-6 overflow-y-auto space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Kode E-Catalog *</label>
                  <input
                    type="text"
                    required
                    value={catCode}
                    onChange={(e) => setCatCode(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono outline-none focus:border-blue-600"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Divisi / Kategori *</label>
                  <input
                    type="text"
                    required
                    value={catCategory}
                    onChange={(e) => setCatCategory(e.target.value)}
                    placeholder="Contoh: Automation & PLC"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Judul E-Catalog *</label>
                <input
                  type="text"
                  required
                  value={catTitle}
                  onChange={(e) => setCatTitle(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold outline-none focus:border-blue-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Edisi</label>
                  <input
                    type="text"
                    value={catEdition}
                    onChange={(e) => setCatEdition(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-600"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Jumlah Halaman</label>
                  <input
                    type="number"
                    min={1}
                    value={catPages}
                    onChange={(e) => setCatPages(Number(e.target.value))}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <label className="font-semibold text-slate-700">Sampul E-Catalog (Upload atau URL)</label>
                  <label className="px-2.5 py-1 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-[11px] font-bold inline-flex items-center gap-1 cursor-pointer">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Sampul</span>
                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/webp"
                      onChange={(e) => handleImageFileToState(e, setCatCover)}
                      className="hidden"
                    />
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  {catCover && (
                    <img
                      src={catCover}
                      alt="Preview Sampul"
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 rounded-lg object-cover border border-slate-200 bg-white shrink-0"
                    />
                  )}
                  <input
                    type="text"
                    value={catCover}
                    onChange={(e) => setCatCover(e.target.value)}
                    placeholder="https://..."
                    className="flex-1 p-2.5 bg-white border border-slate-200 rounded-xl outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Deskripsi E-Catalog</label>
                <textarea
                  rows={2}
                  value={catDesc}
                  onChange={(e) => setCatDesc(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Poin Isi Katalog (1 poin per baris):
                </label>
                <textarea
                  rows={3}
                  value={catHighlightsText}
                  onChange={(e) => setCatHighlightsText(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-600"
                />
              </div>

              <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200 space-y-3">
                <div>
                  <label className="font-bold text-blue-950 block mb-1">
                    URL / Path File PDF di Hosting *
                  </label>
                  <input
                    type="text"
                    value={catPdfUrl}
                    onChange={(e) => setCatPdfUrl(e.target.value)}
                    placeholder="Contoh: /catalogs/ECAT-API-2026-01.pdf atau https://asiaparts.my.id/files/katalog.pdf"
                    className="w-full p-2.5 bg-white border border-blue-200 rounded-xl font-mono outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    Nama File Saat Diunduh (.pdf)
                  </label>
                  <input
                    type="text"
                    value={catPdfFileName}
                    onChange={(e) => setCatPdfFileName(e.target.value)}
                    placeholder="Contoh: Katalog-Otomasi-Asiaparts.pdf"
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl font-mono outline-none focus:border-blue-600"
                  />
                </div>

                <p className="text-[11px] text-blue-900 leading-relaxed">
                  <strong>Panduan Hosting:</strong> Upload file PDF Anda ke folder{' '}
                  <code>/catalogs/</code> di file manager hosting (atau masukkan link lengkap URL PDF
                  dari hosting Anda). Jika file di hosting belum diupload, tombol{' '}
                  <strong>Download File</strong> tetap otomatis mengunduh file PDF katalog yang
                  terbuat langsung agar tidak error.
                </p>
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCatalogModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 rounded-xl font-semibold text-slate-700 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-xl font-bold cursor-pointer"
                >
                  Simpan E-Catalog
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* IN-APP DELETE PRODUCT MODAL */}
      {deletingProduct && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/80">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 overflow-hidden p-6 space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                <Trash2 className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-base text-slate-900">Hapus Produk dari Display?</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Produk <strong>"{deletingProduct.name}"</strong> akan dihapus dari display website di browser ini.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setDeletingProduct(null)}
                className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={() => {
                  deleteProduct(deletingProduct.id);
                  setDeletingProduct(null);
                }}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-sm transition cursor-pointer"
              >
                Ya, Hapus Produk
              </button>
            </div>
          </div>
        </div>
      )}

      {/* IN-APP DELETE E-CATALOG MODAL */}
      {deletingCatalog && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/80">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 overflow-hidden p-6 space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                <Trash2 className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-base text-slate-900">Hapus E-Catalog?</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  E-Catalog <strong>"{deletingCatalog.title}"</strong> akan dihapus dari daftar E-Catalog.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setDeletingCatalog(null)}
                className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={() => {
                  deleteECatalog(deletingCatalog.id);
                  setDeletingCatalog(null);
                }}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-sm transition cursor-pointer"
              >
                Ya, Hapus E-Catalog
              </button>
            </div>
          </div>
        </div>
      )}

      {/* BRAND ADD / EDIT MODAL */}
      {isBrandModalOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/80">
          <div className="bg-white w-full max-w-lg max-h-[92vh] rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
            <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-blue-700" />
                <h4 className="font-bold text-sm sm:text-base text-slate-900">
                  {editingBrand ? 'Edit Brand & Logo Distributor' : 'Tambah Brand & Logo Baru'}
                </h4>
              </div>
              <button
                onClick={() => setIsBrandModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveBrand} className="p-5 sm:p-6 overflow-y-auto space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Nama Brand *</label>
                <input
                  type="text"
                  required
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  placeholder="Contoh: SMC, OMRON, HIWIN, FESTO"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold outline-none focus:border-blue-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Divisi / Kategori</label>
                  <select
                    value={brandCategory}
                    onChange={(e) => setBrandCategory(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-600"
                  >
                    <option value="Pneumatic & Valve">Pneumatic & Valve</option>
                    <option value="Automation & PLC">Automation & PLC</option>
                    <option value="Motion & Gearbox">Motion & Gearbox</option>
                    <option value="Bearing & Linear">Bearing & Linear</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Status Kemitraan</label>
                  <input
                    type="text"
                    value={brandStatus}
                    onChange={(e) => setBrandStatus(e.target.value)}
                    placeholder="Official Distributor / Main Product"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200 space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-bold text-blue-950">Logo Brand (Upload atau URL)</span>
                  <label className="px-3 py-1.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-[11px] font-bold inline-flex items-center gap-1.5 cursor-pointer">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload File Logo</span>
                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/svg+xml,image/webp"
                      onChange={handleBrandLogoFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                {brandLogoUrl && (
                  <div className="h-20 rounded-xl bg-white border border-slate-200 flex items-center justify-center p-3">
                    <img
                      src={brandLogoUrl}
                      alt="Preview Logo"
                      referrerPolicy="no-referrer"
                      className="max-h-14 max-w-full object-contain"
                    />
                  </div>
                )}

                <input
                  type="text"
                  value={brandLogoUrl}
                  onChange={(e) => setBrandLogoUrl(e.target.value)}
                  placeholder="Atau tempel URL logo gambar (https://... /assets/...)"
                  className="w-full p-2.5 bg-white border border-blue-200 rounded-xl outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Keterangan Singkat (Opsional)
                </label>
                <textarea
                  rows={2}
                  value={brandDesc}
                  onChange={(e) => setBrandDesc(e.target.value)}
                  placeholder="Contoh: Solenoid valve, FRL unit, dan aktuator pneumatik"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-600"
                />
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsBrandModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 rounded-xl font-semibold text-slate-700 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-xl font-bold cursor-pointer"
                >
                  Simpan Brand
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* IN-APP DELETE BRAND MODAL */}
      {deletingBrand && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/80">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 overflow-hidden p-6 space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                <Trash2 className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-base text-slate-900">Hapus Brand Distributor?</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Brand <strong>"{deletingBrand.name}"</strong> akan dihapus dari tampilan logo brand.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setDeletingBrand(null)}
                className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={() => {
                  deleteDistributorBrand(deletingBrand.id);
                  setDeletingBrand(null);
                }}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-sm transition cursor-pointer"
              >
                Ya, Hapus Brand
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
