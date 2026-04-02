import React from 'react';
import { Download, ShieldCheck, Instagram, Facebook, Youtube, Twitter, Video } from 'lucide-react';
import { Reveal } from './Reveal';

export const Footer = ({ versionData, onDownload, setShowPrivacy, setShowTerms, setShowContact }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-white pt-12 md:pt-24 border-t border-slate-100">
      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center mb-24">
        <Reveal className="px-4">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-900 mb-8 leading-[1.2]">
            Ready to download <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-fuchsia-600">Anything?</span>
          </h2>
          <div className="relative group inline-block w-full md:w-auto">
            <div className="absolute -top-3 -right-3 z-30 bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg border border-emerald-400 animate-pulse">
              v{versionData.latest_version}
            </div>
            <a
              href={versionData.latest_apk_url}
              onClick={onDownload}
              className="relative block px-8 py-4 sm:px-10 sm:py-5 bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 rounded-full font-bold text-base sm:text-xl md:text-2xl text-white shadow-xl shadow-orange-200 hover:shadow-2xl hover:shadow-orange-300 transition-all duration-300 hover:scale-105 active:scale-95 hover:-translate-y-1 overflow-hidden border border-white/10 group text-center"
            >
              <div className="absolute inset-x-0 top-0 h-1/2 bg-white/10 group-hover:bg-white/20 transition-colors"></div>
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"></div>
              <span className="relative flex items-center justify-center gap-3 drop-shadow-md">
                <Download size={28} className="animate-bounce" />
                Download APK Now (Free)
              </span>
            </a>
          </div>
          <div className="mt-8 flex flex-col items-center gap-6">
            <p className="text-slate-500 font-medium flex items-center justify-center gap-2">
              <ShieldCheck size={18} className="text-emerald-500" /> 100% Safe, Secure & Free
            </p>

            <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10 px-4">
              <img src="https://upload.wikimedia.org/wikipedia/commons/c/cf/McAfee_logo.svg?width=320" alt="McAfee" className="h-5 md:h-7 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-default" width="120" height="28" loading="lazy" decoding="async" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/b/b0/Logo_NortonLifeLock.svg?width=320" alt="Norton" className="h-5 md:h-7 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-default" width="120" height="28" loading="lazy" decoding="async" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Trustpilot_Logo_%282022%29.svg?width=320" alt="Trustpilot" className="h-5 md:h-7 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-default" width="120" height="28" loading="lazy" decoding="async" />
            </div>
          </div>
        </Reveal>
      </div>

      <div className="h-px w-full bg-slate-200/60" />
      <div className="bg-slate-50 relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4 border-b border-slate-200/50 mb-6">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={scrollToTop}>
            <div className="w-8 h-8 rounded-lg overflow-hidden shadow-lg group-hover:scale-110 transition-transform">
              <img src="/playstore-logo.webp" alt="AIO-YTDER" className="w-full h-full object-cover" width="32" height="32" loading="lazy" decoding="async" />
            </div>
            <span className="text-xl font-black text-slate-900 tracking-tighter">
              AIO<span className="text-orange-600">-</span>YTDER
            </span>
          </div>

          <div className="flex gap-6 text-sm text-slate-500 font-medium">
            <button onClick={() => { setShowPrivacy(true); setShowTerms(false); setShowContact(false); scrollToTop(); }} className="hover:text-orange-600 transition-colors">Privacy Policy</button>
            <button onClick={() => { setShowTerms(true); setShowPrivacy(false); setShowContact(false); scrollToTop(); }} className="hover:text-orange-600 transition-colors">Terms of Service</button>
            <button onClick={() => { setShowContact(true); setShowPrivacy(false); setShowTerms(false); scrollToTop(); }} className="hover:text-orange-600 transition-colors">Contact Us</button>
          </div>

          <div className="text-slate-500 text-sm flex items-center gap-1">
            © 2026 AIO-YTDER. Made with <span className="text-red-500 text-lg animate-pulse">❤️</span> in India.
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 pb-8">
          <p className="text-[10px] text-slate-400 max-w-3xl mx-auto text-center uppercase tracking-[0.15em] leading-relaxed opacity-60 font-medium">
            Disclaimer: AIO-YTDER is built as a utility tool and is not responsible for any copyrighted material downloaded by users. Users are sole responsible for their actions and complying with relevant terms of service of any third-party websites.
          </p>
        </div>
      </div>
    </footer>
  );
};
