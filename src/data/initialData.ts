import {
  Product,
  CompanySettings,
  Review,
  Order,
  DailySalesMetric,
  ECatalogItem,
  DistributorBrand
} from '../types';

const svgDataUri = (inner: string) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 90" width="260" height="90"><rect width="260" height="90" fill="#ffffff"/>${inner}</svg>`
  )}`;
import heroFacilityImg from '../assets/images/hero_asiaparts_facility_1794553949777.jpg';
import valveImg from '../assets/images/prod_precision_valve_1794553950530.jpg';
import servoImg from '../assets/images/prod_servo_motor_1794553950354.jpg';
import plcImg from '../assets/images/prod_plc_module_1794553951293.jpg';
import bearingImg from '../assets/images/prod_bearing_kit_1794553954009.jpg';

export const initialCompanySettings: CompanySettings = {
  companyName: 'PT Asiaparts Indotech',
  logoText: 'AI',
  logoUrl: '',
  headerTitle: 'PT Asiaparts',
  headerTitleHighlight: 'Indotech',
  headerSubtitle: 'Industrial Parts & Automation Solutions',
  showWhatsAppInHeader: true,
  heroBadge: 'Mitra Pengadaan Suku Cadang & Otomasi Industri',
  heroTitlePrefix: 'Solusi Komponen Industri &',
  heroTitleHighlight: 'Otomasi Presisi Terpercaya',
  heroDescription:
    'PT Asiaparts Indotech menyediakan komponen otomasi industri, pneumatic & valve, linear motion bearing, serta suku cadang mekanikal presisi untuk kebutuhan pabrik dan proyek B2B di seluruh Indonesia.',
  heroImage: heroFacilityImg,
  contactImage: heroFacilityImg,
  tagline: 'Precision Industrial Spareparts, Automation & Technical Support Partner',
  taglineEn: 'Precision Industrial Spareparts, Automation & Technical Support Partner',
  aboutStory:
    'PT Asiaparts Indotech adalah perusahaan penyedia suku cadang presisi, sistem otomasi industri, dan komponen mekanikal-elektrikal yang berfokus mendukung kelancaran lini produksi manufaktur di Indonesia. Dengan dukungan jaringan pemasok tersertifikasi, ketersediaan stok terukur, serta tim teknis berpengalaman, kami melayani pengadaan unit satuan maupun kontrak suplai B2B, lengkap dengan konsultasi spesifikasi dan penawaran cepat melalui WhatsApp.',
  aboutStoryEn:
    'PT Asiaparts Indotech is an industrial precision spare parts, factory automation, and electro-mechanical component supplier dedicated to supporting manufacturing reliability across Indonesia. Backed by certified global sourcing, controlled inventory, and experienced technical engineers, we fulfill both single-unit replacements and corporate B2B supply contracts with direct WhatsApp engineering consultation.',
  vision:
    'Menjadi mitra pengadaan komponen industri dan otomasi manufaktur paling andal di Indonesia dengan standar kualitas tinggi, ketepatan pengiriman, dan layanan teknis yang responsif.',
  visionEn:
    'To become Indonesia’s most dependable industrial spare parts and automation partner driven by certified quality, on-time fulfillment, and responsive engineering support.',
  mission: [
    'Menyediakan komponen otomasi, pneumatic, bearing, dan suku cadang mesin berstandar mutu internasional.',
    'Memberikan transparansi spesifikasi teknis serta konsultasi langsung melalui tim sales & engineering via WhatsApp.',
    'Mengembangkan distribusi resmi Our Main Products & Distributor Product of PT ASIAPARTS untuk sektor manufaktur dan otomasi.',
    'Menjamin ketepatan distribusi serta layanan purna jual yang jelas untuk menjaga keandalan produksi klien.'
  ],
  missionEn: [
    'Supply certified automation, pneumatic, bearing, and precision mechanical spare parts meeting international standards.',
    'Provide clear technical specification sheets and direct engineering consultation via WhatsApp.',
    'Expand Our Main Products & Distributor Product of PT ASIAPARTS distribution lines for manufacturing and automation.',
    'Ensure reliable nationwide distribution and responsive after-sales support to maintain plant uptime.'
  ],
  founderName: 'Wiryawan Syahfathur',
  founderRole: 'Direktur Utama · PT Asiaparts Indotech',
  founderBio:
    'Berpengalaman dalam rantai pasok komponen manufaktur, sistem otomasi pabrik, dan kemitraan pengadaan B2B lintas sektor industri di Indonesia.',
  founderAvatar: heroFacilityImg,
  whatsappNumber: '6281234567890',
  whatsappDefaultMessage:
    'Halo Tim PT Asiaparts Indotech, saya ingin menanyakan ketersediaan dan spesifikasi produk.',
  email: 'sales@asiaparts.my.id',
  phone: '+62 21 8984 2210',
  address: 'Kawasan Industri Jababeka, Jl. Industri Utama Blok C-12, Cikarang, Bekasi, Jawa Barat 17530',
  operatingHours: 'Senin - Jumat (08.00 - 17.00 WIB) · Sabtu (08.00 - 13.00 WIB)',
  socialInstagram: '@asiaparts.indotech',
  socialFacebook: 'PT Asiaparts Indotech',
  socialLinkedIn: 'linkedin.com/company/pt-asiaparts-indotech',
  announcementText:
    'Layanan Pengadaan B2B & Konsultasi Teknis PT Asiaparts Indotech — Respon Cepat via WhatsApp.',
  announcementTextEn:
    'PT Asiaparts Indotech B2B Procurement & Technical Consultation — Fast Response via WhatsApp.',
  announcementCtaText: 'Chat Sales',
  isAnnouncementActive: false,

  navHomeLabel: 'Beranda',
  navAboutLabel: 'Tentang Kami',
  navCatalogLabel: 'Produk',
  navECatalogLabel: 'E-Catalog',
  navDistributorLabel: 'Main & Distributor',
  navContactLabel: 'Contact Us',
  navWhatsAppLabel: 'Chat WhatsApp',

  heroCtaCatalogText: 'Lihat Display Produk',
  heroCtaWhatsAppText: 'Hubungi WhatsApp Sales',
  heroShortcutECatalog: 'Lihat E-Catalog Digital',
  heroShortcutMainProducts: 'Our Main Products & Distributor Product of PT ASIAPARTS',
  heroShortcutProfile: 'Profil PT Asiaparts Indotech',
  heroImageCaptionSubtitle: 'Pusat Pengadaan Suku Cadang Industri & Otomasi Presisi',
  heroStat1Value: '',
  heroStat1Label: 'Produk Terverifikasi',
  heroStat1Sub: 'Lolos QC Standar Industri',
  heroStat2Value: '',
  heroStat2Label: 'E-Catalog Digital',
  heroStat2Sub: 'Otomasi, Pneumatic, Motion & Bearing',
  heroStat3Value: '38 Provinsi',
  heroStat3Label: 'Jangkauan Distribusi',
  heroStat3Sub: 'Distribusi ke Kawasan Industri',

  aboutSectionBadge: 'Tentang Perusahaan',
  aboutTitle: 'Mengenal PT Asiaparts Indotech',
  aboutSubtitle:
    'Dedikasi kami dalam menyediakan komponen presisi, rantai pasok yang andal, dan dukungan teknis terpadu bagi industri Indonesia.',
  aboutOverviewLabel: 'Profil Perusahaan & Knowlage',
  aboutPillar1Title: 'Mutu Terstandar',
  aboutPillar1Sub: 'QC Terukur',
  aboutPillar2Title: 'Distribusi Andal',
  aboutPillar2Sub: 'Nasional',
  aboutPillar3Title: 'Garansi Resmi',
  aboutPillar3Sub: 'Purna Jual',
  aboutProfileBtnText: 'Lihat Profil & Visi Misi Lengkap →',

  catalogBadge: 'Display Produk',
  catalogTitle: 'Display Produk & Komponen Industri',
  catalogSubtitle:
    'Klik produk mana saja untuk melihat spesifikasi teknis lengkap atau hubungi tim kami langsung melalui WhatsApp.',
  catalogSearchPlaceholder: 'Cari nama produk, part number / SKU, atau spesifikasi...',
  productDetailBtnText: 'Detail & Spek',
  productInfoBtnText: 'Info Detail',

  ecatalogBadge: 'E-Catalog Digital',
  ecatalogTitle: 'E-Catalog Resmi PT Asiaparts Indotech',
  ecatalogSubtitle:
    'Jelajahi daftar katalog produk per divisi untuk referensi teknis tim procurement dan engineering perusahaan Anda.',
  ecatalogRequestAllText: 'Minta Semua E-Catalog via WhatsApp',
  ecatalogOpenBtnText: 'Buka E-Catalog',
  ecatalogDownloadBtnText: 'Download File',

  mainDistributorBadge: 'Produk Utama & Distribusi Resmi',
  mainDistributorTitle: 'Our Main Products & Distributor Product of PT ASIAPARTS',
  mainDistributorSubtitle:
    'Rangkaian lini produk utama dan distribusi resmi komponen otomasi, pneumatik, sistem gerak, serta suku cadang mekanikal presisi untuk kebutuhan industri manufaktur.',
  brandSectionTitle: 'BRAND',

  contactBadge: 'Contact Us',
  contactTitle: 'Hubungi Tim PT Asiaparts Indotech',
  contactSubtitle:
    'Kirim pertanyaan produk, permintaan informasi teknis, atau diskusi pengadaan langsung ke WhatsApp resmi kami.',
  contactFormTitle: 'Formulir Contact Us — Terhubung ke WhatsApp',
  contactSubmitBtnText: 'Kirim Pesan via WhatsApp',
  floatingWaDesc:
    'Butuh informasi spesifikasi produk atau konsultasi teknis? Chat langsung tim kami via WhatsApp.',

  footerDesc:
    'PT Asiaparts Indotech — Penyedia komponen otomasi industri, pneumatic, linear motion, bearing, dan suku cadang presisi terpercaya di Indonesia.',
  footerBadge1: 'Industrial Grade & QC',
  footerBadge2: 'Main & Distributor Products',
  footerRegions: [
    'Jabodetabek & Cikarang',
    'Jawa & Surabaya',
    'Sumatera & Batam',
    'Kalimantan & Sulawesi'
  ],
  footerCopyrightText: 'Seluruh Hak Cipta Dilindungi.'
};

export const initialProducts: Product[] = [
  {
    id: 'prod-001',
    name: 'Pneumatic Solenoid Control Valve & Regulator SS316',
    nameEn: 'SS316 Pneumatic Solenoid Control Valve & Pressure Regulator Assembly',
    category: 'Pneumatic & Valve',
    price: 1850000,
    originalPrice: 2150000,
    discountPercentage: 14,
    stock: 42,
    sku: 'API-PNV-001',
    rating: 4.9,
    reviewCount: 38,
    featured: true,
    bestSeller: true,
    isNew: false,
    images: [valveImg, heroFacilityImg],
    description:
      'Katup solenoid pneumatik 24VDC dengan regulator tekanan presisi berbahan Stainless Steel AISI 316. Dirancang untuk kontrol aliran udara bertekanan dan fluida industri yang membutuhkan ketahanan korosi tinggi serta pembacaan manometer akurat.',
    descriptionEn:
      '24VDC pneumatic solenoid control valve paired with an AISI 316 stainless steel precision pressure regulator and integrated pressure gauge for industrial air and fluid control.',
    specifications: [
      { label: 'Part Number / SKU', value: 'API-PNV-001 (APR-500 Series)' },
      { label: 'Material Bodi', value: 'Stainless Steel AISI 316 Anti-Korosi' },
      { label: 'Tegangan Koil', value: '24VDC (Tersedia opsi 220VAC)' },
      { label: 'Tekanan Kerja Maksimal', value: '0.5 – 12 Bar (Gauge 0–16 Bar)' },
      { label: 'Ukuran Port', value: '3/8" BSPP / NPT Threaded + Barb Fitting' },
      { label: 'Suhu Operasional', value: '-10°C hingga +85°C' },
      { label: 'Proteksi Koil', value: 'IP65 Dust & Splash Proof, CE Certified' },
      { label: 'Garansi', value: '12 Bulan Garansi Resmi PT Asiaparts Indotech' }
    ],
    tags: ['Pneumatic', 'Solenoid Valve', 'SS316', '24VDC']
  },
  {
    id: 'prod-002',
    name: 'Industrial AC Servo Motor 400W + Planetary Gearbox 10:1',
    nameEn: '400W Industrial Servo Motor with 10:1 Precision Planetary Gearbox',
    category: 'Motion & Gearbox',
    price: 4650000,
    originalPrice: 5200000,
    discountPercentage: 11,
    stock: 18,
    sku: 'API-SRV-002',
    rating: 4.95,
    reviewCount: 29,
    featured: true,
    bestSeller: true,
    isNew: true,
    images: [servoImg, bearingImg],
    description:
      'Unit motor servo presisi 400W yang sudah terintegrasi dengan planetary gearbox rasio 10:1 (torsi output hingga 25 Nm). Ideal untuk mesin pengemasan, konveyor sinkron, CNC router, dan lengan otomasi lini produksi.',
    descriptionEn:
      '400W precision servo motor coupled with a 10:1 planetary reduction gearbox delivering 25 Nm output torque for packaging machinery, CNC axes, and automated conveyors.',
    specifications: [
      { label: 'Part Number / SKU', value: 'API-SRV-002 (AM40-4A-PG10)' },
      { label: 'Daya Output Motor', value: '400W Continuous · 24VDC / 220VAC Drive Ready' },
      { label: 'Rasio Gearbox', value: 'Planetary Reduction 10:1 Low Backlash' },
      { label: 'Torsi Output Nominal', value: '25 Nm (Peak up to 48 Nm)' },
      { label: 'Diameter Poros (Shaft)', value: '14 mm Keyway H7 Tolerance' },
      { label: 'Material Housing', value: 'Anodized Aluminum & Hardened Alloy Steel' },
      { label: 'Encoder Feedback', value: 'High-Resolution Incremental / Absolute 17-bit' },
      { label: 'Garansi', value: '12 Bulan Garansi Resmi & Dukungan Teknis' }
    ],
    tags: ['Servo Motor', 'Planetary Gearbox', 'CNC', 'Motion Control']
  },
  {
    id: 'prod-003',
    name: 'DIN-Rail Industrial PLC Controller 16-Channel Ethernet',
    nameEn: 'DIN-Rail Industrial PLC Automation Controller 16-DI Ethernet',
    category: 'Automation & PLC',
    price: 3890000,
    originalPrice: 4300000,
    discountPercentage: 10,
    stock: 25,
    sku: 'API-PLC-003',
    rating: 4.9,
    reviewCount: 41,
    featured: true,
    bestSeller: true,
    isNew: true,
    images: [plcImg, heroFacilityImg],
    description:
      'Modul pengendali logika terprogram (PLC) standar industri pemasangan DIN-rail dengan 2 port Ethernet RJ45 (Modbus TCP / Profinet ready), layar status OLED terintegrasi, dan terminal blok push-in 16 saluran.',
    descriptionEn:
      'Industrial DIN-rail PLC automation controller featuring dual Ethernet ports, integrated diagnostic OLED display, and 16 digital I/O push-in terminal channels.',
    specifications: [
      { label: 'Part Number / SKU', value: 'API-PLC-003 (AXL-DI16-ETH)' },
      { label: 'Input Daya', value: '24VDC ±20% Reverse Polarity Protected' },
      { label: 'Kapasitas I/O', value: '16 Digital Inputs / Expandable Modular Bus' },
      { label: 'Antarmuka Jaringan', value: 'Dual LAN 10/100 Mbps (Modbus TCP, EtherNet/IP)' },
      { label: 'Pemasangan', value: 'Standard 35mm DIN-Rail EN 60715' },
      { label: 'Layar Diagnostik', value: 'OLED Real-time IP, RUN, PWR & Fault Status' },
      { label: 'Sertifikasi', value: 'CE, UL Industrial Control Equipment' },
      { label: 'Garansi', value: '18 Bulan Garansi Penggantian Unit' }
    ],
    tags: ['PLC', 'DIN-Rail', 'Modbus TCP', 'Factory Automation']
  },
  {
    id: 'prod-004',
    name: 'Linear Guide Rail HGR20 + Ball Screw SFU1605 & Bearing Kit',
    nameEn: 'Precision Linear Guide Rail, Ball Screw & Heavy-Duty Roller Bearing Kit',
    category: 'Bearing & Linear',
    price: 2750000,
    originalPrice: 3100000,
    discountPercentage: 11,
    stock: 34,
    sku: 'API-BRG-004',
    rating: 4.92,
    reviewCount: 52,
    featured: true,
    bestSeller: false,
    isNew: false,
    images: [bearingImg, servoImg],
    description:
      'Paket lengkap komponen gerak linier presisi tinggi yang terdiri dari rel pemandu linier (Linear Guideway), blok carriage pre-loaded, ball screw CNC dengan mur presisi, serta spherical roller bearing beban berat.',
    descriptionEn:
      'Complete precision linear motion kit including hardened profile linear guide rails with carriage blocks, ground ball screw assembly, and heavy-duty spherical roller bearings.',
    specifications: [
      { label: 'Part Number / SKU', value: 'API-BRG-004 (LGR-BS-20)' },
      { label: 'Material Rel & Bearing', value: 'High-Carbon Chromium Bearing Steel (SUJ2)' },
      { label: 'Tipe Linear Guide', value: 'Series 20 Heavy-Load Flange Block (Z0 Preload)' },
      { label: 'Ball Screw Spec', value: 'Diameter 16mm · Pitch 5mm · C7 Ground Grade' },
      { label: 'Tipe Bearing Tambahan', value: 'Spherical & Cylindrical Roller Bearing Brass Cage' },
      { label: 'Kekerasan Permukaan', value: 'HRC 58 – 62 Induction Hardened' },
      { label: 'Aplikasi Utama', value: 'Mesin CNC, Laser Cutting, Robot Gantry, Konveyor' },
      { label: 'Garansi', value: '12 Bulan Garansi Presisi Material' }
    ],
    tags: ['Linear Guide', 'Ball Screw', 'Roller Bearing', 'CNC Parts']
  },
  {
    id: 'prod-005',
    name: 'High-Pressure Brass & Stainless Check Valve Manifold 3/8"',
    nameEn: 'Industrial High-Pressure Stainless Manifold & Air Prep Unit',
    category: 'Pneumatic & Valve',
    price: 1290000,
    stock: 60,
    sku: 'API-PNV-005',
    rating: 4.8,
    reviewCount: 21,
    featured: false,
    bestSeller: false,
    isNew: true,
    images: [valveImg],
    description:
      'Unit manifold katup pengatur tekanan dengan knob kontrol mikrometer untuk kestabilan tekanan udara mesin stamping, mesin pengisian botol, dan jalur perakitan otomatis.',
    descriptionEn:
      'Precision manifold air pressure regulator unit with micrometer flow dial for stamping presses, bottling machines, and pneumatic assembly stations.',
    specifications: [
      { label: 'Part Number / SKU', value: 'API-PNV-005' },
      { label: 'Material', value: 'AISI 316 Stainless Steel + Viton Seal' },
      { label: 'Rentang Tekanan', value: '0.2 – 10 Bar' },
      { label: 'Koneksi Pipa', value: '3/8 Inch Female Thread' },
      { label: 'Akurasi Pengukuran', value: 'Class 1.6 Glycerine-Ready Gauge' }
    ],
    tags: ['Manifold', 'Regulator', 'Pneumatic']
  },
  {
    id: 'prod-006',
    name: 'Compact Industrial Power Supply & PLC Expansion Module 24V',
    nameEn: 'Industrial 24VDC DIN-Rail Power & PLC I/O Expansion Kit',
    category: 'Automation & PLC',
    price: 1650000,
    stock: 48,
    sku: 'API-PLC-006',
    rating: 4.85,
    reviewCount: 19,
    featured: false,
    bestSeller: false,
    isNew: false,
    images: [plcImg],
    description:
      'Modul ekspansi input/output dan catu daya panel kontrol industri 24VDC yang stabil, tahan lonjakan tegangan, dan mudah dipelihara untuk panel mesin produksi.',
    descriptionEn:
      'Stabilized 24VDC industrial DIN-rail control power and modular I/O expansion unit engineered for factory electrical cabinets.',
    specifications: [
      { label: 'Part Number / SKU', value: 'API-PLC-006' },
      { label: 'Tegangan Output', value: '24VDC Regulated (5A / 120W)' },
      { label: 'Proteksi', value: 'Short-Circuit, Overload & Over-Voltage Protection' },
      { label: 'Mounting', value: 'DIN-Rail 35mm Compact Footprint' }
    ],
    tags: ['Power Supply', '24VDC', 'Panel Industri']
  },
  {
    id: 'prod-007',
    name: 'Heavy-Duty Spherical & Cylindrical Industrial Bearing Set',
    nameEn: 'Heavy-Duty Industrial Spherical & Cylindrical Bearing Set',
    category: 'Bearing & Linear',
    price: 1420000,
    stock: 75,
    sku: 'API-BRG-007',
    rating: 4.9,
    reviewCount: 34,
    featured: false,
    bestSeller: true,
    isNew: false,
    images: [bearingImg],
    description:
      'Set bearing rol silindris dan sferis dengan sangkar kuningan (brass cage) berdaya tahan tinggi terhadap beban radial berat, getaran mesin tambang, pompa industri, dan gearbox besar.',
    descriptionEn:
      'Heavy-duty spherical and cylindrical roller bearings with machined brass cages designed for high radial loads in pumps, crushers, and industrial gearboxes.',
    specifications: [
      { label: 'Part Number / SKU', value: 'API-BRG-007' },
      { label: 'Tipe Sangkar (Cage)', value: 'Machined Solid Brass Cage (EM/MB)' },
      { label: 'Clearance Standar', value: 'C3 / CN Precision Grade' },
      { label: 'Maksimal Suhu Kerja', value: 'Hingga +150°C Stabilized Ring' }
    ],
    tags: ['Roller Bearing', 'Brass Cage', 'Heavy Duty']
  },
  {
    id: 'prod-008',
    name: 'High-Torque Planetary Gearbox Reducer Nema34 / 80mm Flange',
    nameEn: 'Precision Low-Backlash Planetary Gearbox Reducer 80mm Flange',
    category: 'Motion & Gearbox',
    price: 2350000,
    stock: 22,
    sku: 'API-SRV-008',
    rating: 4.88,
    reviewCount: 16,
    featured: false,
    bestSeller: false,
    isNew: true,
    images: [servoImg],
    description:
      'Gearbox planetary presisi rendah backlash (< 5 arcmin) untuk motor servo 400W–750W maupun stepper Nema 34. Dilengkapi segel pelumasan seumur hidup bebas perawatan.',
    descriptionEn:
      'Low-backlash (< 5 arcmin) planetary speed reducer compatible with 400W–750W servo motors and NEMA 34 frames, pre-lubricated for maintenance-free operation.',
    specifications: [
      { label: 'Part Number / SKU', value: 'API-SRV-008' },
      { label: 'Rasio Tersedia', value: '5:1 / 10:1 / 20:1' },
      { label: 'Backlash Presisi', value: '≤ 5 arcmin (Single Stage)' },
      { label: 'Efisiensi Transmisi', value: '≥ 96%' }
    ],
    tags: ['Gearbox', 'Planetary', 'Low Backlash']
  }
];

export const initialECatalogs: ECatalogItem[] = [
  {
    id: 'cat-001',
    code: 'ECAT-API-2026-01',
    title: 'E-Catalog Otomasi & Sistem Kontrol PLC',
    titleEn: 'Factory Automation & PLC Control Systems E-Catalog',
    category: 'Automation & PLC',
    edition: 'Edisi 2026 · Rev 2.1',
    pageCount: 28,
    description:
      'Daftar lengkap modul PLC DIN-Rail, HMI, Industrial Ethernet Switch, sensor fotoelektrik, serta catu daya 24VDC untuk integrasi panel kontrol pabrik.',
    descriptionEn:
      'Complete lineup of DIN-rail PLCs, HMIs, industrial Ethernet switches, sensors, and 24VDC control power supplies for factory electrical panels.',
    coverImage: plcImg,
    highlights: [
      'PLC Controller 16–64 I/O Modbus TCP & Profinet',
      'Industrial Power Supply 24VDC 5A – 20A',
      'Proximity, Photoelectric & Laser Sensors'
    ],
    pdfUrl: '/catalogs/ECAT-API-2026-01.pdf',
    pdfFileName: 'ECAT-API-2026-01-Otomasi-PLC.pdf'
  },
  {
    id: 'cat-002',
    code: 'ECAT-API-2026-02',
    title: 'E-Catalog Pneumatic, Solenoid Valve & Hidrolik',
    titleEn: 'Pneumatic, Solenoid Valve & Air Preparation E-Catalog',
    category: 'Pneumatic & Valve',
    edition: 'Edisi 2026 · Rev 1.8',
    pageCount: 36,
    description:
      'Katalog teknis komponen udara bertekanan: Solenoid Valve SS316/Brass, Air Cylinder ISO 15552, FRL Unit, Pressure Gauge, dan Push-In Fittings.',
    descriptionEn:
      'Technical catalog for compressed air systems: SS316/Brass solenoid valves, ISO 15552 air cylinders, FRL units, gauges, and industrial fittings.',
    coverImage: valveImg,
    highlights: [
      'Solenoid Control Valve 24VDC / 220VAC',
      'Regulator Tekanan & Manifold Stainless AISI 316',
      'Silinder Pneumatik & Selang PU Tekanan Tinggi'
    ],
    pdfUrl: '/catalogs/ECAT-API-2026-02.pdf',
    pdfFileName: 'ECAT-API-2026-02-Pneumatic-Valve.pdf'
  },
  {
    id: 'cat-003',
    code: 'ECAT-API-2026-03',
    title: 'E-Catalog Linear Motion, Bearing & Ball Screw',
    titleEn: 'Precision Linear Motion, Bearing & Ball Screw E-Catalog',
    category: 'Bearing & Linear',
    edition: 'Edisi 2026 · Rev 3.0',
    pageCount: 42,
    description:
      'Panduan ukuran, dimensi mounting, dan kapasitas beban (dynamic load rating) untuk Linear Guideway, Ball Screw CNC, serta Industrial Roller Bearings.',
    descriptionEn:
      'Dimensional tables, mounting references, and dynamic load ratings for linear guideways, CNC ball screws, and heavy-duty industrial bearings.',
    coverImage: bearingImg,
    highlights: [
      'Linear Guideway HGR15 / HGR20 / HGR25 / HGR30',
      'Ball Screw SFU1605 / SFU2005 + End Support BK/BF',
      'Spherical, Tapered & Cylindrical Roller Bearings'
    ],
    pdfUrl: '/catalogs/ECAT-API-2026-03.pdf',
    pdfFileName: 'ECAT-API-2026-03-Linear-Bearing.pdf'
  },
  {
    id: 'cat-004',
    code: 'ECAT-API-2026-04',
    title: 'E-Catalog Servo Motor & Planetary Gearbox',
    titleEn: 'Servo Drives, Motors & Planetary Gearbox E-Catalog',
    category: 'Motion & Gearbox',
    edition: 'Edisi 2026 · Rev 1.4',
    pageCount: 24,
    description:
      'Spesifikasi torsi, kurva kecepatan, dan diagram wiring untuk Servo Motor 200W–3kW, Inverter VFD, dan Planetary Gearbox presisi rendah backlash.',
    descriptionEn:
      'Torque specs, speed curves, and wiring references for 200W–3kW AC servo systems, VFD drives, and low-backlash planetary gearboxes.',
    coverImage: servoImg,
    highlights: [
      'AC Servo Motor & Driver 200W – 3.0kW',
      'Planetary Gearbox Rasio 3:1 hingga 100:1',
      'Coupling Fleksibel & Mounting Bracket Presisi'
    ],
    pdfUrl: '/catalogs/ECAT-API-2026-04.pdf',
    pdfFileName: 'ECAT-API-2026-04-Servo-Gearbox.pdf'
  }
];

export const initialDistributorBrands: DistributorBrand[] = [
  {
    id: 'brand-001',
    name: 'KLAB',
    category: 'Automation & PLC',
    status: 'Distributor Brand',
    logoUrl: svgDataUri(
      `<polygon points="48,26 68,26 55,44 68,58 48,58" fill="#002b5c"/><rect x="38" y="26" width="8" height="32" fill="#002b5c"/><text x="72" y="56" font-family="Arial,sans-serif" font-weight="900" font-size="30" fill="#002b5c">LAB</text><text x="130" y="74" text-anchor="middle" font-family="Arial,sans-serif" font-size="10.5" fill="#475569">Keen Innovative Solutions</text>`
    )
  },
  {
    id: 'brand-002',
    name: 'ZEISS',
    category: 'Automation & PLC',
    status: 'Authorized Partner',
    logoUrl: svgDataUri(
      `<path d="M26 24 H66 V48 C66 58 46 66 46 66 C46 66 26 58 26 48 Z" fill="#004a99"/><text x="46" y="47" text-anchor="middle" font-family="Arial,sans-serif" font-weight="800" font-size="11" fill="#ffffff">ZEISS</text><text x="76" y="44" font-family="Arial,sans-serif" font-weight="700" font-size="14" fill="#1e293b">#HandsOnMetrology</text><text x="76" y="59" font-family="Arial,sans-serif" font-weight="600" font-size="10" letter-spacing="1" fill="#64748b">PARTNER</text>`
    )
  },
  {
    id: 'brand-003',
    name: 'Hanon',
    category: 'Automation & PLC',
    status: 'Distributor Brand',
    logoUrl: svgDataUri(
      `<rect x="44" y="26" width="12" height="36" fill="#ea7600"/><rect x="66" y="26" width="12" height="36" fill="#ea7600"/><rect x="52" y="38" width="18" height="10" fill="#ea7600"/><text x="84" y="61" font-family="Arial,sans-serif" font-weight="800" font-size="31" fill="#ea7600">anon</text>`
    )
  },
  {
    id: 'brand-004',
    name: 'JFE Advantech Co., Ltd.',
    category: 'Automation & PLC',
    status: 'Distributor Brand',
    logoUrl: svgDataUri(
      `<circle cx="38" cy="43" r="14" fill="#0284c7"/><circle cx="34" cy="39" r="5" fill="#7dd3fc"/><text x="38" y="69" text-anchor="middle" font-family="Arial,sans-serif" font-weight="700" font-size="10" fill="#0f172a">JFE</text><text x="60" y="48" font-family="Georgia,serif" font-weight="700" font-size="15.5" fill="#0f172a">JFE Advantech Co., Ltd.</text>`
    )
  },
  {
    id: 'brand-005',
    name: 'SCITEK',
    category: 'Automation & PLC',
    status: 'Distributor Brand',
    logoUrl: svgDataUri(
      `<text x="130" y="55" text-anchor="middle" font-family="Arial,sans-serif" font-weight="900" font-style="italic" font-size="31" letter-spacing="1"><tspan fill="#0f172a">SCI</tspan><tspan fill="#2563eb">TEK</tspan></text>`
    )
  },
  {
    id: 'brand-006',
    name: 'DEWALT',
    category: 'Motion & Gearbox',
    status: 'Distributor Brand',
    logoUrl: svgDataUri(
      `<rect x="26" y="18" width="208" height="54" rx="4" fill="#febd17"/><text x="130" y="55" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-weight="900" font-size="30" letter-spacing="-0.5" fill="#111827">DEWALT</text><rect x="55" y="59" width="150" height="4" fill="#111827"/>`
    )
  },
  {
    id: 'brand-007',
    name: 'GOTECH',
    category: 'Motion & Gearbox',
    status: 'Distributor Brand',
    logoUrl: svgDataUri(
      `<rect x="24" y="23" width="42" height="44" rx="4" fill="#0284c7"/><circle cx="45" cy="45" r="13" fill="none" stroke="#ffffff" stroke-width="4"/><rect x="42" y="32" width="6" height="26" fill="#ffffff"/><rect x="69" y="23" width="167" height="44" rx="4" fill="#64748b"/><text x="152" y="54" text-anchor="middle" font-family="Arial,sans-serif" font-weight="800" font-size="25" letter-spacing="1" fill="#ffffff">GOTECH</text>`
    )
  },
  {
    id: 'brand-008',
    name: 'ahn',
    category: 'Pneumatic & Valve',
    status: 'Distributor Brand',
    logoUrl: svgDataUri(
      `<text x="130" y="61" text-anchor="middle" font-family="Arial,sans-serif" font-weight="500" font-size="48" letter-spacing="-1" fill="#db2777">ahn</text><text x="182" y="34" font-family="Arial,sans-serif" font-size="11" fill="#db2777">®</text>`
    )
  },
  {
    id: 'brand-009',
    name: 'ElektroPhysik',
    category: 'Automation & PLC',
    status: 'Distributor Brand',
    logoUrl: svgDataUri(
      `<text x="130" y="54" text-anchor="middle" font-family="Arial,sans-serif" font-weight="700" font-size="27" letter-spacing="-0.5" fill="#475569">ElektroPhysik</text>`
    )
  },
  {
    id: 'brand-010',
    name: 'BRADY',
    category: 'Automation & PLC',
    status: 'Distributor Brand',
    logoUrl: svgDataUri(
      `<rect x="30" y="27" width="38" height="36" rx="4" fill="#1e3a8a"/><circle cx="47" cy="45" r="10" fill="#ffffff"/><circle cx="47" cy="45" r="5" fill="#1e3a8a"/><text x="78" y="56" font-family="Arial,sans-serif" font-weight="900" font-size="31" letter-spacing="0.5" fill="#1e3a8a">BRADY</text>`
    )
  },
  {
    id: 'brand-011',
    name: 'ADAM',
    category: 'Automation & PLC',
    status: 'Distributor Brand',
    logoUrl: svgDataUri(
      `<text x="96" y="49" text-anchor="middle" font-family="Arial,sans-serif" font-weight="900" font-style="italic" font-size="29" fill="#0284c7">ADAM</text><text x="96" y="62" text-anchor="middle" font-family="Arial,sans-serif" font-weight="700" font-size="7.5" letter-spacing="1.2" fill="#0284c7">SCALES &amp; BALANCES</text><line x1="168" y1="26" x2="168" y2="64" stroke="#cbd5e1" stroke-width="1.5"/><text x="176" y="39" font-family="Arial,sans-serif" font-weight="700" font-size="10.5" fill="#0f172a">Agile.</text><text x="176" y="51" font-family="Arial,sans-serif" font-weight="700" font-size="10.5" fill="#0f172a">Precise.</text><text x="176" y="63" font-family="Arial,sans-serif" font-weight="700" font-size="10.5" fill="#0284c7">Trusted.</text>`
    )
  },
  {
    id: 'brand-012',
    name: 'QNIX',
    category: 'Automation & PLC',
    status: 'Distributor Brand',
    logoUrl: svgDataUri(
      `<text x="130" y="58" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-weight="900" font-size="35" letter-spacing="1" fill="#00338d">QNIX</text><text x="184" y="37" font-family="Arial,sans-serif" font-size="11" fill="#0f172a">®</text>`
    )
  },
  {
    id: 'brand-013',
    name: 'YOUNG IN Chromass',
    category: 'Automation & PLC',
    status: 'Distributor Brand',
    logoUrl: svgDataUri(
      `<circle cx="52" cy="30" r="5" fill="#0284c7"/><path d="M36 52 L56 34" stroke="#0284c7" stroke-width="7" stroke-linecap="round"/><path d="M40 66 L58 50" stroke="#0284c7" stroke-width="7" stroke-linecap="round"/><text x="72" y="45" font-family="Arial,sans-serif" font-weight="800" font-size="22" fill="#1e3a8a">YOUNG IN</text><text x="72" y="63" font-family="Arial,sans-serif" font-weight="700" font-size="16" fill="#0f172a">Chromass</text>`
    )
  },
  {
    id: 'brand-014',
    name: 'Fuji',
    category: 'Pneumatic & Valve',
    status: 'Distributor Brand',
    logoUrl: svgDataUri(
      `<text x="130" y="58" text-anchor="middle" font-family="Arial,sans-serif" font-weight="900" font-size="39" letter-spacing="-0.5" fill="#ea580c">Fuji</text>`
    )
  },
  {
    id: 'brand-015',
    name: 'FEELER',
    category: 'Motion & Gearbox',
    status: 'Distributor Brand',
    logoUrl: svgDataUri(
      `<polygon points="34,32 68,32 60,42 28,42" fill="#0d9488"/><polygon points="28,46 58,46 46,60 36,60" fill="#0d9488"/><text x="148" y="56" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-weight="900" font-style="italic" font-size="27" fill="#0d9488">FEELER</text><text x="213" y="36" font-family="Arial,sans-serif" font-size="10" fill="#0d9488">®</text>`
    )
  },
  {
    id: 'brand-016',
    name: 'CLIMAX',
    category: 'Bearing & Linear',
    status: 'Distributor Brand',
    logoUrl: svgDataUri(
      `<polygon points="44,30 56,39 51,54 37,54 32,39" fill="#0f172a"/><circle cx="44" cy="43" r="4" fill="#ffffff"/><text x="145" y="55" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-weight="900" font-size="27" letter-spacing="1.5" fill="#111827">CLIMAX</text>`
    )
  }
];

export const initialReviews: Review[] = [
  {
    id: 'rev-001',
    productId: 'prod-001',
    userName: 'Ir. Hendrawan · Plant Maintenance',
    rating: 5,
    date: '3 hari yang lalu',
    title: 'Valve SS316 presisi dan pengiriman sangat cepat',
    comment:
      'Unit langsung terpasang di lini bottling kami. Konsultasi spesifikasi port via WhatsApp sangat membantu sebelum PO diterbitkan.',
    isVerifiedPurchase: true,
    helpfulCount: 14
  },
  {
    id: 'rev-002',
    productId: 'prod-002',
    userName: 'PT Maju Otomasi Engineering',
    rating: 5,
    date: '1 minggu yang lalu',
    title: 'Torsi servo + planetary gearbox stabil tanpa backlash',
    comment:
      'Sudah repeat order 6 unit untuk mesin packaging klien kami. Dokumentasi teknis lengkap dan respon support cepat.',
    isVerifiedPurchase: true,
    helpfulCount: 19
  }
];

export const initialOrders: Order[] = [
  {
    id: 'ord-8801',
    orderNumber: 'API-202611-8801',
    createdAt: '2026-11-11 14:32 WIB',
    customerName: 'PT Sentosa Manufaktur',
    customerEmail: 'procurement@sentosa.co.id',
    customerPhone: '081388772211',
    customerAddress: 'Kawasan Industri MM2100 Blok F-4',
    customerCity: 'Bekasi',
    items: [
      {
        productId: 'prod-001',
        productName: 'Pneumatic Solenoid Control Valve & Regulator SS316',
        price: 1850000,
        quantity: 2,
        image: valveImg
      }
    ],
    subtotal: 3700000,
    shippingFee: 0,
    discount: 0,
    total: 3700000,
    paymentMethod: 'whatsapp',
    paymentStatus: 'paid',
    orderStatus: 'processing',
    courier: 'Kurir Perusahaan / Ekspedisi Darat',
    trackingNumber: 'API-DO-8801'
  }
];

export const initialDailySalesMetrics: DailySalesMetric[] = [
  { date: '05 Nov', revenue: 4250000, orderCount: 3 },
  { date: '06 Nov', revenue: 6890000, orderCount: 5 },
  { date: '07 Nov', revenue: 5400000, orderCount: 4 },
  { date: '08 Nov', revenue: 9150000, orderCount: 7 },
  { date: '09 Nov', revenue: 8420000, orderCount: 6 },
  { date: '10 Nov', revenue: 11200000, orderCount: 9 },
  { date: '11 Nov', revenue: 9020000, orderCount: 7 }
];
