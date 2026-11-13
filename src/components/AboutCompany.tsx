import React from 'react';
import { 
  Building2, 
  Target, 
  Compass, 
  ShieldCheck, 
  CheckCircle, 
  Users, 
  MapPin, 
  Clock, 
  Mail, 
  Phone, 
  MessageCircle, 
  Award, 
  X,
  FileCheck2
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AboutCompanySection: React.FC = () => {
  const { 
    language, 
    t, 
    companySettings, 
    setIsCompanyModalOpen, 
    formatWhatsAppUrl 
  } = useApp();

  return (
    <section id="about" className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold tracking-wider uppercase">
            <Building2 className="w-3.5 h-3.5" />
            <span>{t.aboutSectionBadge}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            {t.aboutTitle}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {t.aboutSubtitle}
          </p>
        </div>

        {/* Story & Founder Highlight Card */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-50 border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-xs">
          
          {/* Founder & Image */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-sm rounded-2xl overflow-hidden shadow-lg border-2 border-white">
              <img
                src={companySettings.founderAvatar}
                alt={companySettings.founderName}
                className="w-full h-80 sm:h-96 object-cover object-top hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-xs uppercase tracking-wider text-emerald-400 font-semibold block">
                  {companySettings.founderRole}
                </span>
                <h3 className="text-lg font-bold text-white">{companySettings.founderName}</h3>
                <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                  {companySettings.founderBio}
                </p>
              </div>
            </div>

            {/* Floating Experience Badge */}
            <div className="absolute -top-3 -right-2 sm:-right-4 bg-emerald-600 text-white rounded-2xl px-4 py-2.5 shadow-md flex items-center gap-2">
              <Award className="w-5 h-5 text-emerald-200" />
              <div>
                <span className="text-xs font-bold block">100% Terverifikasi</span>
                <span className="text-[10px] text-emerald-100">Standar Mutu Resmi</span>
              </div>
            </div>
          </div>

          {/* Company Story & Vision */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                Profil & Dedikasi Kami
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                {companySettings.companyName}
              </h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed text-justify">
                {language === 'id' ? companySettings.aboutStory : companySettings.aboutStoryEn}
              </p>
            </div>

            {/* Vision & Mission Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1.5">
                <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
                  <Target className="w-4 h-4" />
                  <h4>{t.visionTitle}</h4>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {language === 'id' ? companySettings.vision : companySettings.visionEn}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1.5">
                <div className="flex items-center gap-2 text-teal-700 font-bold text-sm">
                  <Compass className="w-4 h-4" />
                  <h4>{t.missionTitle} (Poin Utama)</h4>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {(language === 'id' ? companySettings.mission : companySettings.missionEn)[0]}
                </p>
              </div>
            </div>

            {/* Core Values 4 Icons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-200">
              <div className="text-center p-2">
                <ShieldCheck className="w-6 h-6 text-emerald-600 mx-auto mb-1" />
                <span className="text-xs font-bold text-slate-800 block">{t.valQuality}</span>
                <span className="text-[10px] text-slate-500">QC Lolos Uji</span>
              </div>
              <div className="text-center p-2">
                <Users className="w-6 h-6 text-emerald-600 mx-auto mb-1" />
                <span className="text-xs font-bold text-slate-800 block">35.000+ Klien</span>
                <span className="text-[10px] text-slate-500">Puas & Setia</span>
              </div>
              <div className="text-center p-2">
                <MessageCircle className="w-6 h-6 text-emerald-600 mx-auto mb-1" />
                <span className="text-xs font-bold text-slate-800 block">WhatsApp 24/7</span>
                <span className="text-[10px] text-slate-500">Respon Instan</span>
              </div>
              <div className="text-center p-2">
                <FileCheck2 className="w-6 h-6 text-emerald-600 mx-auto mb-1" />
                <span className="text-xs font-bold text-slate-800 block">Garansi Resmi</span>
                <span className="text-[10px] text-slate-500">Purna Jual Terjamin</span>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={() => setIsCompanyModalOpen(true)}
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm transition shadow-xs"
              >
                Buka Dokumen Profil & Legalitas Lengkap →
              </button>
              <a
                href={formatWhatsAppUrl('Halo Admin, saya ingin berdiskusi mengenai kerjasama B2B / pengadaan produk perusahaan.')}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm transition flex items-center gap-1.5 shadow-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Konsultasi B2B via WhatsApp</span>
              </a>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

// Full Company Knowledge Modal
export const CompanyKnowledgeModal: React.FC = () => {
  const { 
    language, 
    t, 
    companySettings, 
    isCompanyModalOpen, 
    setIsCompanyModalOpen,
    formatWhatsAppUrl 
  } = useApp();

  if (!isCompanyModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        
        {/* Modal Header */}
        <div className="p-6 bg-gradient-to-r from-emerald-800 via-teal-800 to-slate-900 text-white flex items-center justify-between shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-bold uppercase tracking-wider">
                Official Company Knowledge & Profile
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold mt-1">{companySettings.companyName}</h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
              {language === 'id' ? companySettings.tagline : companySettings.taglineEn}
            </p>
          </div>
          <button
            onClick={() => setIsCompanyModalOpen(false)}
            className="p-2 rounded-full hover:bg-white/10 text-slate-300 hover:text-white transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 text-slate-700 text-sm">
          
          {/* Story */}
          <div className="space-y-3">
            <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-emerald-600" />
              <span>Sejarah Singkat & Landasan Berdiri</span>
            </h4>
            <p className="leading-relaxed text-justify bg-slate-50 p-4 rounded-2xl border border-slate-200">
              {language === 'id' ? companySettings.aboutStory : companySettings.aboutStoryEn}
            </p>
          </div>

          {/* Vision & Mission Full List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3 bg-emerald-50/50 p-5 rounded-2xl border border-emerald-100">
              <h4 className="text-sm font-bold text-emerald-900 flex items-center gap-2">
                <Target className="w-4 h-4 text-emerald-600" />
                <span>{t.visionTitle}</span>
              </h4>
              <p className="text-xs leading-relaxed text-slate-700">
                {language === 'id' ? companySettings.vision : companySettings.visionEn}
              </p>
            </div>

            <div className="space-y-3 bg-teal-50/50 p-5 rounded-2xl border border-teal-100">
              <h4 className="text-sm font-bold text-teal-900 flex items-center gap-2">
                <Compass className="w-4 h-4 text-teal-600" />
                <span>{t.missionTitle}</span>
              </h4>
              <ul className="text-xs space-y-2 text-slate-700">
                {(language === 'id' ? companySettings.mission : companySettings.missionEn).map((m, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Founder Bio */}
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center gap-6">
            <img
              src={companySettings.founderAvatar}
              alt={companySettings.founderName}
              className="w-24 h-24 rounded-2xl object-cover shrink-0 shadow-md"
            />
            <div className="space-y-1.5 text-center sm:text-left">
              <span className="text-xs font-semibold text-emerald-600 uppercase">
                {companySettings.founderRole}
              </span>
              <h4 className="text-lg font-bold text-slate-900">{companySettings.founderName}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {companySettings.founderBio}
              </p>
            </div>
          </div>

          {/* Address, Contacts & Operational Hours */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-slate-200 pt-6">
            <div className="space-y-1 text-xs">
              <div className="flex items-center gap-1.5 text-slate-900 font-bold mb-1">
                <MapPin className="w-4 h-4 text-emerald-600" />
                <span>Kantor Pusat</span>
              </div>
              <p className="text-slate-600">{companySettings.address}</p>
            </div>

            <div className="space-y-1 text-xs">
              <div className="flex items-center gap-1.5 text-slate-900 font-bold mb-1">
                <Clock className="w-4 h-4 text-emerald-600" />
                <span>Jam Operasional</span>
              </div>
              <p className="text-slate-600">{companySettings.operatingHours}</p>
            </div>

            <div className="space-y-1 text-xs">
              <div className="flex items-center gap-1.5 text-slate-900 font-bold mb-1">
                <Phone className="w-4 h-4 text-emerald-600" />
                <span>Saluran Komunikasi</span>
              </div>
              <p className="text-slate-600">WA: +{companySettings.whatsappNumber}</p>
              <p className="text-slate-600">Email: {companySettings.email}</p>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
          <p className="text-xs text-slate-500">
            Profil perusahaan ini dapat diperbarui sewaktu-waktu melalui Dashboard Admin.
          </p>
          <a
            href={formatWhatsAppUrl('Halo Admin, saya ingin informasi lebih lanjut mengenai profil dan produk Nusantara Catalog.')}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat WhatsApp Admin</span>
          </a>
        </div>

      </div>
    </div>
  );
};
