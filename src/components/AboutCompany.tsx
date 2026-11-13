import React, { useState } from 'react';
import {
  Building2,
  Target,
  Compass,
  ShieldCheck,
  CheckCircle,
  Truck,
  MapPin,
  Clock,
  Phone,
  MessageCircle,
  Award,
  X,
  FileCheck2
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AboutCompanySection: React.FC = () => {
  const { language, t, companySettings, setIsCompanyModalOpen } = useApp();
  const [imgError, setImgError] = useState(false);

  return (
    <section id="about" className="py-16 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="max-w-3xl space-y-2.5">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-700">
            <Building2 className="w-4 h-4" />
            <span>
              {language === 'id'
                ? companySettings.aboutSectionBadge || t.aboutSectionBadge
                : t.aboutSectionBadge}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            {language === 'id' ? companySettings.aboutTitle || t.aboutTitle : t.aboutTitle}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {language === 'id' ? companySettings.aboutSubtitle || t.aboutSubtitle : t.aboutSubtitle}
          </p>
        </div>

        {/* Corporate Introduction Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8">
          {/* Left Visual / Leadership Block */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-5">
            <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-900 aspect-4/3">
              {!imgError && companySettings.founderAvatar ? (
                <img
                  src={companySettings.founderAvatar}
                  alt={companySettings.companyName}
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-900 to-slate-900 flex flex-col items-center justify-center p-6 text-white text-center">
                  <Building2 className="w-10 h-10 text-blue-300 mb-2" />
                  <span className="font-bold text-sm">{companySettings.companyName}</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[11px] uppercase tracking-wider text-blue-300 font-bold block">
                  {companySettings.founderRole}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white mt-0.5">
                  {companySettings.founderName}
                </h3>
                <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                  {companySettings.founderBio}
                </p>
              </div>
            </div>

            {/* Corporate Address Summary Box */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-2 text-xs text-slate-600">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                <span>{companySettings.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-700 shrink-0" />
                <span>{companySettings.operatingHours}</span>
              </div>
            </div>
          </div>

          {/* Right Story, Vision, Mission & Service Commitments */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
                {language === 'id'
                  ? companySettings.aboutOverviewLabel || 'Profil Perusahaan & Knowlage'
                  : 'Company Profile & Overview'}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                {companySettings.companyName}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {language === 'id' ? companySettings.aboutStory : companySettings.aboutStoryEn}
              </p>
            </div>

            {/* Vision & Mission */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-1.5">
                <div className="flex items-center gap-2 text-blue-800 font-bold text-sm">
                  <Target className="w-4 h-4 text-blue-700" />
                  <h4>{t.visionTitle}</h4>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {language === 'id' ? companySettings.vision : companySettings.visionEn}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-1.5">
                <div className="flex items-center gap-2 text-blue-800 font-bold text-sm">
                  <Compass className="w-4 h-4 text-blue-700" />
                  <h4>{t.missionTitle}</h4>
                </div>
                <ul className="text-xs text-slate-600 space-y-1">
                  {(language === 'id' ? companySettings.mission : companySettings.missionEn)
                    .slice(0, 2)
                    .map((item, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <CheckCircle className="w-3.5 h-3.5 text-blue-700 shrink-0 mt-0.5" />
                        <span className="line-clamp-2">{item}</span>
                      </li>
                    ))}
                </ul>
              </div>
            </div>

            {/* 3 Corporate Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-200">
              <div className="bg-white rounded-xl border border-slate-200 p-3 text-center">
                <ShieldCheck className="w-5 h-5 text-blue-700 mx-auto mb-1" />
                <span className="text-xs font-bold text-slate-900 block">
                  {language === 'id' ? companySettings.aboutPillar1Title || t.valQuality : t.valQuality}
                </span>
                <span className="text-[11px] text-slate-500">
                  {companySettings.aboutPillar1Sub || 'QC Terukur'}
                </span>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-3 text-center">
                <Truck className="w-5 h-5 text-blue-700 mx-auto mb-1" />
                <span className="text-xs font-bold text-slate-900 block">
                  {language === 'id' ? companySettings.aboutPillar2Title || t.valSpeed : t.valSpeed}
                </span>
                <span className="text-[11px] text-slate-500">
                  {companySettings.aboutPillar2Sub || 'Nasional'}
                </span>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-3 text-center">
                <FileCheck2 className="w-5 h-5 text-blue-700 mx-auto mb-1" />
                <span className="text-xs font-bold text-slate-900 block">
                  {language === 'id' ? companySettings.aboutPillar3Title || t.valWarranty : t.valWarranty}
                </span>
                <span className="text-[11px] text-slate-500">
                  {companySettings.aboutPillar3Sub || 'Purna Jual'}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 pt-1">
              <button
                onClick={() => setIsCompanyModalOpen(true)}
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm transition-colors cursor-pointer"
              >
                {language === 'id'
                  ? companySettings.aboutProfileBtnText || 'Lihat Profil & Visi Misi Lengkap →'
                  : 'View Full Company Profile →'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Full Corporate Knowledge Modal
export const CompanyKnowledgeModal: React.FC = () => {
  const { language, t, companySettings, isCompanyModalOpen, setIsCompanyModalOpen, formatWhatsAppUrl } =
    useApp();
  const [imgError, setImgError] = useState(false);

  if (!isCompanyModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs">
      <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-blue-900 via-blue-800 to-slate-900 text-white flex items-center justify-between shrink-0">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-200 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5" />
              Official Company Profile & Overview
            </span>
            <h3 className="text-xl sm:text-2xl font-bold mt-1">{companySettings.companyName}</h3>
            <p className="text-xs sm:text-sm text-blue-100 mt-0.5">
              {language === 'id' ? companySettings.tagline : companySettings.taglineEn}
            </p>
          </div>
          <button
            onClick={() => setIsCompanyModalOpen(false)}
            className="p-2 rounded-lg hover:bg-white/10 text-blue-100 hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-slate-700 text-sm">
          <div className="space-y-2.5">
            <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-blue-700" />
              <span>{language === 'id' ? 'Tentang Perusahaan' : 'Company Background'}</span>
            </h4>
            <p className="leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
              {language === 'id' ? companySettings.aboutStory : companySettings.aboutStoryEn}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2.5 bg-blue-50/60 p-5 rounded-xl border border-blue-100">
              <h4 className="text-sm font-bold text-blue-900 flex items-center gap-2">
                <Target className="w-4 h-4 text-blue-700" />
                <span>{t.visionTitle}</span>
              </h4>
              <p className="text-xs leading-relaxed text-slate-700">
                {language === 'id' ? companySettings.vision : companySettings.visionEn}
              </p>
            </div>

            <div className="space-y-2.5 bg-slate-50 p-5 rounded-xl border border-slate-200">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Compass className="w-4 h-4 text-blue-700" />
                <span>{t.missionTitle}</span>
              </h4>
              <ul className="text-xs space-y-2 text-slate-700">
                {(language === 'id' ? companySettings.mission : companySettings.missionEn).map(
                  (m, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                      <span>{m}</span>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>

          <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-center gap-5">
            {!imgError && companySettings.founderAvatar ? (
              <img
                src={companySettings.founderAvatar}
                alt={companySettings.founderName}
                referrerPolicy="no-referrer"
                onError={() => setImgError(true)}
                className="w-24 h-24 rounded-xl object-cover shrink-0 border border-slate-200"
              />
            ) : (
              <div className="w-24 h-24 rounded-xl bg-blue-800 text-white flex items-center justify-center font-bold text-lg shrink-0">
                {companySettings.logoText || 'AI'}
              </div>
            )}
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-xs font-bold text-blue-700 uppercase">
                {companySettings.founderRole}
              </span>
              <h4 className="text-base font-bold text-slate-900">{companySettings.founderName}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{companySettings.founderBio}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-slate-200 pt-5 text-xs">
            <div>
              <div className="flex items-center gap-1.5 text-slate-900 font-bold mb-1">
                <MapPin className="w-4 h-4 text-blue-700" />
                <span>Kantor & Gudang</span>
              </div>
              <p className="text-slate-600">{companySettings.address}</p>
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-slate-900 font-bold mb-1">
                <Clock className="w-4 h-4 text-blue-700" />
                <span>Jam Operasional</span>
              </div>
              <p className="text-slate-600">{companySettings.operatingHours}</p>
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-slate-900 font-bold mb-1">
                <Phone className="w-4 h-4 text-blue-700" />
                <span>Kontak Resmi</span>
              </div>
              <p className="text-slate-600 font-mono">WA: +{companySettings.whatsappNumber}</p>
              <p className="text-slate-600">Email: {companySettings.email}</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <p className="text-xs text-slate-500">
            {companySettings.companyName} · {companySettings.phone}
          </p>
          <a
            href={formatWhatsAppUrl(
              `Halo Tim *${companySettings.companyName}*, saya ingin bertanya lebih lanjut seputar profil perusahaan dan katalog produk.`
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat WhatsApp Official</span>
          </a>
        </div>
      </div>
    </div>
  );
};
