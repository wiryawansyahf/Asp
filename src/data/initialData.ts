import { Product, CompanySettings, Review, Order, DailySalesMetric } from '../types';

export const initialCompanySettings: CompanySettings = {
  companyName: 'Nusantara Catalog & Innovations',
  tagline: 'Katalog Produk Unggulan & Solusi Gaya Hidup Modern Nusantara',
  taglineEn: 'Premier Product Catalog & Modern Lifestyle Solutions',
  aboutStory: 'Berdiri sejak 2019, Nusantara Catalog & Innovations adalah pelopor platform kurasi produk unggulan berstandar tinggi di Indonesia. Kami menghubungkan keunggulan material lokal dengan inovasi desain kelas dunia. Melayani lebih dari 35.000 pelanggan korporat maupun perorangan di 38 provinsi di Indonesia dan mancanegara, kami berkomitmen menjaga transparansi harga, garansi purna jual resmi, serta kemudahan transaksi cepat melalui WhatsApp dan gateway pembayaran real-time.',
  aboutStoryEn: 'Established in 2019, Nusantara Catalog & Innovations is a premier platform curating high-standard goods in Indonesia. We unite indigenous craftsmanship with world-class engineering. Serving over 35,000 corporate and retail clients across 38 Indonesian provinces and internationally, we uphold absolute pricing transparency, genuine warranty coverage, and frictionless real-time purchasing.',
  vision: 'Menjadi sentra katalog produk terpercaya nomor satu di Asia Tenggara yang memadukan keunggulan kualitas autentik, teknologi belanja instan, dan kepuasan pelanggan tanpa batas.',
  visionEn: 'To be Southeast Asia\'s foremost trusted product catalog hub fusing authentic craftsmanship, instant shopping tech, and unparalleled customer satisfaction.',
  mission: [
    'Menyediakan kurasi produk bermutu tinggi dengan spesifikasi teknis transparan dan teruji laboratorium.',
    'Memberikan pengalaman belanja real-time terintegrasi WhatsApp dan sistem pembayaran multi-kanal instan.',
    'Menjamin kepastian purna jual, suku cadang, dan garansi pergantian unit tanpa proses berbelit.',
    'Memberdayakan talenta dan produsen lokal bermutu internasional untuk merambah pasar global.'
  ],
  missionEn: [
    'Deliver curated high-grade merchandise with transparent, lab-tested technical specifications.',
    'Provide frictionless real-time shopping integrated with WhatsApp and automated multi-channel payment.',
    'Guarantee dependable after-sales care, spare parts access, and seamless replacement policies.',
    'Empower international-grade local craftsmen and manufacturers to capture the global marketplace.'
  ],
  founderName: 'Wiryawan Syahfathur, S.T., M.M.',
  founderRole: 'Founder & Chief Executive Officer',
  founderBio: 'Berpengalaman lebih dari 12 tahun di bidang supply chain, industri teknologi, dan retail modern di Indonesia. Berkomitmen membangun ekosistem katalog digital yang mengutamakan integritas dan kepuasan konsumen.',
  founderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
  whatsappNumber: '6281234567890',
  email: 'halo@nusantaracatalog.id',
  phone: '+62 21 5589 4432',
  address: 'Menara Nusantara Lantai 18, Jl. Jenderal Sudirman Kav. 52-53, Jakarta Selatan, 12190',
  operatingHours: 'Senin - Minggu (08.00 - 21.00 WIB)',
  socialInstagram: '@nusantaracatalog.id',
  socialFacebook: 'Nusantara Catalog Official',
  socialLinkedIn: 'linkedin.com/company/nusantara-catalog',
  announcementText: '🔥 PROMO HARI INI: Gratis Ongkir Seluruh Indonesia + Diskon Tambahan 10% dengan Kode DISKONHEMAT!',
  announcementTextEn: '🔥 TODAY\'S PROMO: Free Nationwide Shipping + Extra 10% OFF with code DISKONHEMAT!',
  isAnnouncementActive: true
};

export const initialProducts: Product[] = [
  {
    id: 'prod-001',
    name: 'Nusantara Apex Wireless ANC Headphone Pro',
    nameEn: 'Nusantara Apex Wireless ANC Headphone Pro',
    category: 'Elektronik & Gadget',
    price: 1850000,
    originalPrice: 2450000,
    discountPercentage: 24,
    stock: 28,
    sku: 'NC-TECH-001',
    rating: 4.9,
    reviewCount: 142,
    featured: true,
    bestSeller: true,
    isNew: false,
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Headphone nirkabel kelas audiofil dengan Active Noise Cancelling (ANC) hibrida 40dB, driver titanium 40mm, daya tahan baterai hingga 55 jam, dan koneksi multi-point Bluetooth 5.4 latensi rendah.',
    descriptionEn: 'Audiophile-grade wireless headphone featuring 40dB hybrid Active Noise Cancellation, 40mm titanium drivers, up to 55-hour battery life, and low-latency Bluetooth 5.4 multi-point connectivity.',
    specifications: [
      { label: 'Driver Unit', value: '40mm Custom Titanium Diaphragm' },
      { label: 'Active Noise Cancelling', value: 'Hybrid ANC -40dB with Ambient Mode' },
      { label: 'Bluetooth Version', value: 'v5.4 (AAC, SBC, LDAC Hi-Res Audio)' },
      { label: 'Daya Tahan Baterai', value: '55 Jam (ANC Off) / 42 Jam (ANC On)' },
      { label: 'Waktu Pengisian', value: 'Fast Charge 10 Menit = 5 Jam Playtime (USB-C)' },
      { label: 'Mikrofon', value: 'Quad-mic dengan AI Environmental Noise Cancellation' },
      { label: 'Berat Bersih', value: '248 gram' },
      { label: 'Garansi', value: '2 Tahun Ganti Baru Resmi' }
    ],
    tags: ['ANC', 'Hi-Res Audio', 'Bluetooth 5.4', 'Titanium Driver']
  },
  {
    id: 'prod-002',
    name: 'Smart Ergonomic Office Chair Nusantara Titan',
    nameEn: 'Nusantara Titan Smart Ergonomic Office Chair',
    category: 'Home & Living',
    price: 3250000,
    originalPrice: 4100000,
    discountPercentage: 20,
    stock: 14,
    sku: 'NC-FURN-002',
    rating: 4.8,
    reviewCount: 88,
    featured: true,
    bestSeller: true,
    isNew: false,
    images: [
      'https://images.unsplash.com/photo-1580481077195-c322b724db68?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Kursi kerja ergonomis premium dengan lumbar support adaptif yang mengikuti lekuk tulang belakang, sandaran jaring breathable Korea mesh, armrest 4D, dan hidrolik Class 4 bersertifikat BIFMA.',
    descriptionEn: 'Premium ergonomic desk chair with adaptive lumbar tracking, Korean breathable mesh backrest, 4D adjustable armrests, and BIFMA-certified Class 4 heavy-duty gas lift.',
    specifications: [
      { label: 'Material Mesh', value: 'Ultra-breathable Korean Hybrid Polymesh' },
      { label: 'Mekanisme Recline', value: 'Multifunctional Synchronous Tilt 90° - 135°' },
      { label: 'Armrest', value: '4D (Tinggi, Maju-Mundur, Sudut, Lebar)' },
      { label: 'Lumbar Support', value: 'Auto-adjust dynamic spine support' },
      { label: 'Gas Lift', value: 'Heavy Duty Class 4 SGS & BIFMA Tested' },
      { label: 'Kapasitas Beban', value: 'Hingga 160 kg' },
      { label: 'Garansi Rangka', value: '5 Tahun Garansi Mekanisme' }
    ],
    tags: ['Ergonomic', 'Mesh Korea', 'BIFMA', '4D Armrest']
  },
  {
    id: 'prod-003',
    name: 'Artisan Pour-Over Drip Coffee Maker Set & Grinder',
    nameEn: 'Artisan Pour-Over Drip Coffee Maker & Conical Grinder Set',
    category: 'Kopi & F&B Nusantara',
    price: 890000,
    originalPrice: 1150000,
    discountPercentage: 22,
    stock: 45,
    sku: 'NC-COFF-003',
    rating: 4.9,
    reviewCount: 204,
    featured: true,
    bestSeller: true,
    isNew: true,
    images: [
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Satu set lengkap seduh kopi manual pour-over dengan dripper keramik berulir spiral presisi, server kaca borosilikat tahan panas 600ml, kettle gooseneck termometer, dan hand grinder burr stainless steel.',
    descriptionEn: 'Complete manual pour-over barista set featuring spiral ceramic dripper, 600ml heat-resistant borosilicate glass server, gooseneck thermometer kettle, and CNC stainless steel conical burr grinder.',
    specifications: [
      { label: 'Material Server', value: 'Borosilicate Glass High-Temp Resistant 600ml' },
      { label: 'Material Dripper', value: 'Ceramic Food Grade V60 Size 02' },
      { label: 'Kettle Gooseneck', value: 'Stainless Steel 304 Kapasitas 850ml with Bimetal Thermometer' },
      { label: 'Hand Grinder', value: 'CNC 420 Stainless Steel Burr 38mm (Stepless adjustment)' },
      { label: 'Aksesoris Termasuk', value: '100 pcs Kertas Filter Bleached + Spoon Barista' },
      { label: 'Garansi Grinder', value: '1 Tahun Garansi Burr' }
    ],
    tags: ['Specialty Coffee', 'V60 Set', 'Manual Brew', 'Stainless Burr']
  },
  {
    id: 'prod-004',
    name: 'Smart Touchscreen Smartwatch Horizon V5 Pro',
    nameEn: 'Horizon V5 Pro Smart Touchscreen AMOLED Smartwatch',
    category: 'Elektronik & Gadget',
    price: 1450000,
    originalPrice: 1950000,
    discountPercentage: 25,
    stock: 35,
    sku: 'NC-TECH-004',
    rating: 4.7,
    reviewCount: 95,
    featured: false,
    bestSeller: false,
    isNew: true,
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Jam tangan pintar berlayar AMOLED 1.43 inci Always-On Display dengan bodi aluminium alloy penerbangan, sensor detak jantung PPG generasi baru, SpO2 darah, GPS mandiri ganda, dan ketahanan air 5ATM.',
    descriptionEn: 'Flagship smartwatch with 1.43-inch AMOLED Always-On Display, aerospace-grade aluminum casing, multi-path PPG heart rate & SpO2 tracking, dual-band GPS, and 5ATM water resistance.',
    specifications: [
      { label: 'Layar', value: '1.43" Ultra-HD AMOLED (466x466 px, 1000 nits Peak)' },
      { label: 'Bahan Bezel', value: 'Aerospace Aluminum Alloy + Keramik Zirkonia' },
      { label: 'Sensor Kesehatan', value: 'BioTracker 4.0 PPG (SpO2, Heart Rate, Stress, Sleep Quality)' },
      { label: 'GPS', value: 'Dual-band 5 Satelit (GPS, GLONASS, Galileo, BeiDou, QZSS)' },
      { label: 'Baterai', value: '450 mAh (14 Hari Standby / 7 Hari Pemakaian Intens)' },
      { label: 'Water Resistant', value: '5 ATM (Aman untuk Berenang hingga 50m)' },
      { label: 'Kompatibilitas', value: 'Android 7.0+ & iOS 12.0+' }
    ],
    tags: ['AMOLED', '5ATM', 'Dual GPS', '14 Hari Baterai']
  },
  {
    id: 'prod-005',
    name: 'Tenun & Kulit Asli Nusantara Heritage Briefcase',
    nameEn: 'Nusantara Heritage Genuine Leather & Ikat Briefcase',
    category: 'Fashion & Apparel',
    price: 2150000,
    originalPrice: 2800000,
    discountPercentage: 23,
    stock: 12,
    sku: 'NC-LEAT-005',
    rating: 4.95,
    reviewCount: 67,
    featured: true,
    bestSeller: false,
    isNew: false,
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Tas kerja eksekutif pria/wanita buatan tangan pengrajin lokal berbahan 100% Full Grain Pull-Up Cowhide Leather yang dipadukan dengan aksen tenun ikat Jepara autentik. Dilengkapi kompartemen laptop 15.6 inch.',
    descriptionEn: 'Handcrafted executive briefcase tailored from 100% full-grain vegetable-tanned leather combined with authentic Indonesian handwoven Ikat accents. Dedicated padded compartment for 15.6-inch laptop.',
    specifications: [
      { label: 'Material Utama', value: '100% Full-Grain Cowhide Leather Grade A' },
      { label: 'Aksen Etnik', value: 'Kain Tenun Tradisional Ikat Jepara Tangan Asli' },
      { label: 'Hardware', value: 'Solid Brass Antik (Bebas Karat seumur hidup)' },
      { label: 'Kompartemen Laptop', value: 'Padded Velvet Sleeve hingga Laptop 15.6 Inci' },
      { label: 'Dimensi', value: '41 cm x 30 cm x 9 cm' },
      { label: 'Tali Bahu', value: 'Kulit Berlapis Kanvas Webbing Heavy Duty (Adjustable)' },
      { label: 'Garansi Kulit', value: '3 Tahun Garansi Jahitan & Kulit' }
    ],
    tags: ['Kulit Asli', 'Handmade', 'Tenun Nusantara', 'Executive']
  },
  {
    id: 'prod-006',
    name: 'Minimalist Walnut Wood Wireless Charging Station 3-in-1',
    nameEn: '3-in-1 Minimalist Solid Walnut Wireless Charging Station',
    category: 'Aksesoris',
    price: 580000,
    originalPrice: 750000,
    discountPercentage: 22,
    stock: 50,
    sku: 'NC-WOOD-006',
    rating: 4.85,
    reviewCount: 112,
    featured: false,
    bestSeller: true,
    isNew: false,
    images: [
      'https://images.unsplash.com/photo-1622445262464-84b1456045b6?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Dudukan pengisi daya nirkabel 3-in-1 berbahan kayu solid Walnut alami. Mengisi daya smartphone (15W MagSafe fast charge), smartwatch, dan earbuds secara simultan tanpa kabel berantakan di meja kerja.',
    descriptionEn: '3-in-1 desktop wireless charging station carved from solid natural Walnut wood. Fast-charges smartphone (15W MagSafe), smartwatch, and earbuds simultaneously with neat cable routing.',
    specifications: [
      { label: 'Material', value: 'Kayu Solid Black Walnut Amerika + Paduan Aluminium' },
      { label: 'Output Pengisian HP', value: '15W / 10W / 7.5W Qi & MagSafe Compatible' },
      { label: 'Output Watch & TWS', value: 'Watch 3W + Earbuds 5W' },
      { label: 'Proteksi Keamanan', value: 'Over-voltage, Over-current & Foreign Object Detection' },
      { label: 'Konektor Daya', value: 'USB Type-C (Termasuk Kabel Braided 1.2m)' },
      { label: 'Finishing', value: 'Natural Matte Beeswax Polish (Eco-friendly)' }
    ],
    tags: ['Solid Walnut', '15W MagSafe', 'Desk Setup', 'Minimalis']
  },
  {
    id: 'prod-007',
    name: 'Biji Kopi Specialty Nusantara Single Origin Gayo & Toraja (Bundle 2x250g)',
    nameEn: 'Specialty Nusantara Single Origin Coffee Beans Bundle (Gayo & Toraja)',
    category: 'Kopi & F&B Nusantara',
    price: 245000,
    originalPrice: 310000,
    discountPercentage: 20,
    stock: 80,
    sku: 'NC-COFF-007',
    rating: 4.96,
    reviewCount: 318,
    featured: true,
    bestSeller: true,
    isNew: false,
    images: [
      'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Dua varian biji kopi Arabika Specialty Grade 1 pilihan: Aceh Gayo Natural Process (notes: peach, black tea, brown sugar) dan Toraja Sapan Washed Process (notes: dark chocolate, herbal, sweet spice). Dipanggang fresh roast mingguan.',
    descriptionEn: 'Specialty Grade 1 100% Arabica duo: Aceh Gayo Natural (peach, black tea, brown sugar) and Toraja Sapan Washed (dark chocolate, herbal spice). Freshly roasted weekly with degassing valve bags.',
    specifications: [
      { label: 'Varietas', value: '100% Arabika Specialty Grade 1 (SCA Score > 85)' },
      { label: 'Asal Daerah', value: 'Gayo Takengon (1.500 mdpl) & Toraja Sapan (1.800 mdpl)' },
      { label: 'Profil Sangrai', value: 'Medium Light Roast (Cocok untuk Filter & Espresso)' },
      { label: 'Berat Bersih', value: '2 x 250 gram (Total 500g)' },
      { label: 'Kemasan', value: 'Valve Bag Food Grade dengan Zip Lock Kedap Udara' },
      { label: 'Rekomendasi Seduh', value: 'V60, French Press, Aeropress, Espresso' }
    ],
    tags: ['Specialty Coffee', 'SCA 85+', 'Aceh Gayo', 'Toraja Sapan']
  },
  {
    id: 'prod-008',
    name: 'Smart Air Purifier HEPA 13 Ionizer Nusantara PureClean',
    nameEn: 'Nusantara PureClean H13 True HEPA Air Purifier & Ionizer',
    category: 'Home & Living',
    price: 1980000,
    originalPrice: 2600000,
    discountPercentage: 23,
    stock: 19,
    sku: 'NC-HOME-008',
    rating: 4.88,
    reviewCount: 79,
    featured: false,
    bestSeller: false,
    isNew: true,
    images: [
      'https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Pembersih udara ruangan dengan filter True HEPA H13 4 lapis dan plasma ionizer. Menghilangkan 99.97% debu mikroskopis PM2.5, asap, bulu hewan, virus dan bau ruangan. Dilengkapi sensor PM2.5 real-time & kontrol aplikasi HP.',
    descriptionEn: 'Room air purifier featuring medical-grade 4-stage True HEPA H13 filtration and plasma ionizer. Eliminates 99.97% of airborne PM2.5 particles, allergens, bacteria, and odors with live air sensor.',
    specifications: [
      { label: 'Sistem Filter', value: 'Pre-filter + H13 True HEPA + Karbon Aktif + Plasma Ion' },
      { label: 'CADR Rating', value: '380 m³/jam (Efektif untuk ruangan hingga 50 m²)' },
      { label: 'Tingkat Kebisingan', value: 'Sleep Mode 24 dB (Sangat hening tidak mengganggu)' },
      { label: 'Sensor Kualitas Udara', value: 'Laser PM2.5 dengan Lampu Indikator 4 Warna' },
      { label: 'Konsumsi Daya', value: 'Hemat listrik 35 Watt' },
      { label: 'Garansi Mesin', value: '2 Tahun Garansi Resmi Sparepart' }
    ],
    tags: ['True HEPA H13', 'PM2.5 Sensor', 'Silent 24dB', 'Ionizer']
  }
];

export const initialReviews: Review[] = [
  {
    id: 'rev-001',
    productId: 'prod-001',
    userName: 'Budi Hartono, S.Kom',
    rating: 5,
    date: '2 hari yang lalu',
    title: 'Kualitas suara dan ANC melebihi ekspektasi!',
    comment: 'Peredam suaranya (ANC) sangat mantap untuk fokus kerja di coffee shop. Bass-nya punchy tapi vokalnya jernih banget. Pengiriman kilat dan admin WhatsApp-nya sangat ramah menjelaskan garansinya.',
    isVerifiedPurchase: true,
    helpfulCount: 24
  },
  {
    id: 'rev-002',
    productId: 'prod-001',
    userName: 'Jessica Anastasia',
    rating: 5,
    date: '5 hari yang lalu',
    title: 'Baterai luar biasa awet, nyaman berjam-jam',
    comment: 'Sudah saya pakai nonstop 3 hari untuk meeting Zoom dan mendengarkan Spotify masih sisa 60%. Bantalan telinganya empuk tidak bikin pusing atau panas di telinga. Sangat direkomendasikan!',
    isVerifiedPurchase: true,
    helpfulCount: 18
  },
  {
    id: 'rev-003',
    productId: 'prod-002',
    userName: 'Reza Pratama',
    rating: 5,
    date: '1 minggu yang lalu',
    title: 'Sakit pinggang hilang semenjak pakai kursi Titan ini',
    comment: 'Lumbar support-nya otomatis menyesuaikan posisi punggung saat bersandar maupun tegak. Jaring punggungnya adem banget. Perakitan juga mudah hanya 15 menit. Worth every rupiah!',
    isVerifiedPurchase: true,
    helpfulCount: 31
  },
  {
    id: 'rev-004',
    productId: 'prod-003',
    userName: 'Dimas Barista ID',
    rating: 5,
    date: '2 minggu yang lalu',
    title: 'Grinder burr stainless-nya presisi luar biasa',
    comment: 'Hasil gilingan kopi sangat konsisten dari coarse untuk French Press sampai fine V60. Kettle gooseneck dengan termometernya presisi banget untuk kontrol suhu 92 derajat Celsius.',
    isVerifiedPurchase: true,
    helpfulCount: 19
  },
  {
    id: 'rev-005',
    productId: 'prod-005',
    userName: 'Andi Nugroho, S.H.',
    rating: 5,
    date: '1 bulan yang lalu',
    title: 'Tas kulit berkelas dengan aksen tenun nusantara',
    comment: 'Bahan kulit pull up aslinya wangi khas kulit premium, jahitan sangat rapi dan kokoh. Ketika dipakai ke pengadilan atau meeting klien banyak yang memuji detail tenunnya. Bangga produk lokal!',
    isVerifiedPurchase: true,
    helpfulCount: 27
  }
];

export const initialOrders: Order[] = [
  {
    id: 'ord-8801',
    orderNumber: 'NC-202611-8801',
    createdAt: '2026-11-11 14:32 WIB',
    customerName: 'Anindya Putri',
    customerEmail: 'anindya.putri@gmail.com',
    customerPhone: '081388772211',
    customerAddress: 'Jl. Senopati No. 45, Kebayoran Baru',
    customerCity: 'Jakarta Selatan',
    customerNotes: 'Tolong packing bubble wrap tebal ya min.',
    items: [
      {
        productId: 'prod-001',
        productName: 'Nusantara Apex Wireless ANC Headphone Pro',
        price: 1850000,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80'
      }
    ],
    subtotal: 1850000,
    shippingFee: 0,
    discount: 185000,
    total: 1665000,
    paymentMethod: 'qris',
    paymentStatus: 'paid',
    orderStatus: 'processing',
    courier: 'JNE YES (Next Day)',
    trackingNumber: 'JNE88291044910',
    paidAt: '2026-11-11 14:33:12 WIB'
  },
  {
    id: 'ord-8802',
    orderNumber: 'NC-202611-8802',
    createdAt: '2026-11-11 11:15 WIB',
    customerName: 'Hendrawan Pratama',
    customerEmail: 'hendra.pratama@perusahaan.co.id',
    customerPhone: '081299884433',
    customerAddress: 'Ruko Golden Boulevard Blok C No. 12, BSD City',
    customerCity: 'Tangerang Selatan',
    items: [
      {
        productId: 'prod-002',
        productName: 'Smart Ergonomic Office Chair Nusantara Titan',
        price: 3250000,
        quantity: 2,
        image: 'https://images.unsplash.com/photo-1580481077195-c322b724db68?auto=format&fit=crop&w=400&q=80'
      }
    ],
    subtotal: 6500000,
    shippingFee: 50000,
    discount: 500000,
    total: 6050000,
    paymentMethod: 'virtual_account',
    paymentStatus: 'paid',
    orderStatus: 'shipped',
    courier: 'SiCepat Cargo',
    trackingNumber: 'SCP9900123849',
    paidAt: '2026-11-11 11:20:05 WIB'
  },
  {
    id: 'ord-8803',
    orderNumber: 'NC-202611-8803',
    createdAt: '2026-11-10 16:40 WIB',
    customerName: 'Dewi Lestari',
    customerEmail: 'dewi.lestari@yahoo.co.id',
    customerPhone: '085711223344',
    customerAddress: 'Jl. Dago Asri No. 8',
    customerCity: 'Bandung',
    items: [
      {
        productId: 'prod-003',
        productName: 'Artisan Pour-Over Drip Coffee Maker Set & Grinder',
        price: 890000,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=400&q=80'
      },
      {
        productId: 'prod-007',
        productName: 'Biji Kopi Specialty Nusantara Single Origin Gayo & Toraja',
        price: 245000,
        quantity: 2,
        image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=400&q=80'
      }
    ],
    subtotal: 1380000,
    shippingFee: 25000,
    discount: 100000,
    total: 1305000,
    paymentMethod: 'credit_card',
    paymentStatus: 'paid',
    orderStatus: 'completed',
    courier: 'J&T Express',
    trackingNumber: 'JT8817294401',
    paidAt: '2026-11-10 16:42:50 WIB'
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
