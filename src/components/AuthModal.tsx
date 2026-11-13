import React, { useState } from 'react';
import { 
  X, 
  Mail, 
  Lock, 
  User as UserIcon, 
  Phone, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight,
  KeyRound,
  Eye,
  EyeOff
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AuthModal: React.FC = () => {
  const { 
    t, 
    isAuthOpen, 
    setIsAuthOpen, 
    authInitialTab, 
    login 
  } = useApp();

  const [tab, setTab] = useState<'signin' | 'signup' | 'forgot'>(authInitialTab);

  // Sign In State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Sign Up State
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPhone, setSignupPhone] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');

  // Forgot Password State
  const [forgotEmail, setForgotEmail] = useState('');
  const [otpStep, setOtpStep] = useState<'request' | 'verify'>('request');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [enteredOtp, setEnteredOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [resetSuccessMessage, setResetSuccessMessage] = useState('');

  if (!isAuthOpen) return null;

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;

    // Check if admin login credentials
    const role = email.toLowerCase().includes('admin') ? 'admin' : 'customer';
    login(email, role);
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signupName.trim() || !signupEmail.trim() || !signupPassword.trim()) return;
    if (signupPassword !== signupConfirmPassword) {
      alert('Konfirmasi password tidak cocok.');
      return;
    }
    login(signupEmail, 'customer', signupName);
  };

  const handleRequestOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail.trim()) return;

    // Generate simulated 6-digit OTP
    const code = String(Math.floor(100000 + Math.random() * 900000));
    setGeneratedOtp(code);
    setOtpStep('verify');
  };

  const handleVerifyOtpAndReset = (e: React.FormEvent) => {
    e.preventDefault();
    if (enteredOtp !== generatedOtp) {
      alert('Kode OTP yang Anda masukkan salah. Silakan periksa kembali kode di atas.');
      return;
    }
    if (!newPassword || newPassword.length < 6) {
      alert('Password baru minimal 6 karakter.');
      return;
    }

    setResetSuccessMessage('Password berhasil diperbarui dengan aman! Silakan masuk kembali.');
    setTimeout(() => {
      setResetSuccessMessage('');
      setOtpStep('request');
      setTab('signin');
      setEmail(forgotEmail);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
              <UserIcon className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">
                {tab === 'signin' && t.authSignIn}
                {tab === 'signup' && t.authSignUp}
                {tab === 'forgot' && t.authForgotPassword}
              </h3>
            </div>
          </div>

          <button
            onClick={() => setIsAuthOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Demo Logins Banner */}
        <div className="px-6 pt-4 pb-2 bg-emerald-50/60 border-b border-emerald-100/80">
          <span className="text-[11px] font-bold text-emerald-800 block mb-1.5">
            ⚡ Akses Demo Cepat (1-Klik Tanpa Ketik):
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => login('pelanggan.setia@gmail.com', 'customer', 'Budi Hartono')}
              className="py-1.5 px-2 bg-white hover:bg-emerald-100 border border-emerald-300 rounded-lg text-[11px] font-semibold text-emerald-800 transition"
            >
              Masuk: Pelanggan
            </button>
            <button
              onClick={() => login('admin@nusantaracatalog.id', 'admin', 'Admin Official')}
              className="py-1.5 px-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-[11px] font-semibold transition"
            >
              Masuk: Admin Toko
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-4">
          
          {/* TAB 1: SIGN IN */}
          {tab === 'signin' && (
            <form onSubmit={handleSignIn} className="space-y-4">
              <div>
                <label className="text-xs font-medium text-slate-700 block mb-1">
                  {t.emailLabel}
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nama@email.com"
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-medium text-slate-700">
                    {t.passwordLabel}
                  </label>
                  <button
                    type="button"
                    onClick={() => setTab('forgot')}
                    className="text-[11px] text-emerald-600 hover:text-emerald-700 font-semibold"
                  >
                    {t.authForgotPassword}
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-9 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-emerald-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="p-1 text-slate-400 hover:text-slate-600 absolute right-2.5 top-1/2 -translate-y-1/2"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md shadow-emerald-600/20 transition active:scale-[0.99]"
              >
                {t.authSignIn}
              </button>

              <div className="text-center pt-2 border-t border-slate-100 text-xs text-slate-500">
                Belum memiliki akun?{' '}
                <button
                  type="button"
                  onClick={() => setTab('signup')}
                  className="font-bold text-emerald-600 hover:underline"
                >
                  Daftar Sekarang
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: SIGN UP */}
          {tab === 'signup' && (
            <form onSubmit={handleSignUp} className="space-y-3.5">
              <div>
                <label className="text-xs font-medium text-slate-700 block mb-1">
                  Nama Lengkap *
                </label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={signupName}
                    onChange={(e) => setSignupName(e.target.value)}
                    placeholder="Contoh: Rian Anggara"
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-700 block mb-1">
                  Alamat Email *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    placeholder="nama@email.com"
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-700 block mb-1">
                  Nomor WhatsApp *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    value={signupPhone}
                    onChange={(e) => setSignupPhone(e.target.value)}
                    placeholder="08123456789"
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-medium text-slate-700 block mb-1">
                    Password *
                  </label>
                  <input
                    type="password"
                    required
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-700 block mb-1">
                    Ulangi *
                  </label>
                  <input
                    type="password"
                    required
                    value={signupConfirmPassword}
                    onChange={(e) => setSignupConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md shadow-emerald-600/20 transition active:scale-[0.99]"
              >
                Buat Akun Pelanggan
              </button>

              <div className="text-center pt-2 border-t border-slate-100 text-xs text-slate-500">
                Sudah memiliki akun?{' '}
                <button
                  type="button"
                  onClick={() => setTab('signin')}
                  className="font-bold text-emerald-600 hover:underline"
                >
                  Masuk di Sini
                </button>
              </div>
            </form>
          )}

          {/* TAB 3: FORGOT PASSWORD WITH SECURE EMAIL SIMULATION */}
          {tab === 'forgot' && (
            <div className="space-y-4">
              {resetSuccessMessage ? (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                  <p className="text-xs font-bold text-emerald-900">{resetSuccessMessage}</p>
                </div>
              ) : otpStep === 'request' ? (
                <form onSubmit={handleRequestOtp} className="space-y-4">
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {t.forgotPasswordPrompt}
                  </p>

                  <div>
                    <label className="text-xs font-medium text-slate-700 block mb-1">
                      {t.emailLabel}
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value)}
                        placeholder="nama@email.com"
                        className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm rounded-xl transition flex items-center justify-center gap-1.5"
                  >
                    <span>{t.sendResetLink}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="text-center pt-2">
                    <button
                      type="button"
                      onClick={() => setTab('signin')}
                      className="text-xs text-slate-500 hover:text-slate-800"
                    >
                      ← Kembali ke Halaman Masuk
                    </button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtpAndReset} className="space-y-4">
                  {/* Simulated OTP Email Notification Notice */}
                  <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-2xl space-y-1">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
                      <KeyRound className="w-4 h-4 text-amber-600" />
                      <span>{t.resetOtpSent} {forgotEmail}</span>
                    </div>
                    <p className="text-[11px] text-amber-800">
                      Gunakan Kode OTP verifikasi berikut: <strong className="font-mono text-xs bg-amber-200 px-1.5 py-0.5 rounded">{generatedOtp}</strong>
                    </p>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-slate-700 block mb-1">
                      {t.enterOtpCode}
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      value={enteredOtp}
                      onChange={(e) => setEnteredOtp(e.target.value)}
                      placeholder="Masukkan 6 Digit OTP"
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-center text-sm font-mono tracking-widest outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-slate-700 block mb-1">
                      {t.newPasswordLabel}
                    </label>
                    <input
                      type="password"
                      required
                      minLength={6}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Minimal 6 karakter"
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-emerald-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm rounded-xl transition"
                  >
                    {t.saveNewPassword}
                  </button>
                </form>
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
