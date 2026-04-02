import React from 'react';
import { Download } from 'lucide-react';

export const StickyCTA = ({ showStickyCTA, versionData, onDownload }) => {
  return (
    <div className={`md:hidden fixed bottom-6 inset-x-6 z-[60] transition-all duration-700 ease-in-out transform 
      ${showStickyCTA ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-40 opacity-0 scale-95 pointer-events-none'}`}>

      {/* Backdrop Environmental Glow */}
      <div className="absolute inset-x-0 -bottom-4 h-16 bg-orange-500/30 blur-[40px] rounded-full -z-10 animate-pulse"></div>

      <a
        href={versionData.latest_apk_url}
        onClick={onDownload}
        className="flex items-center justify-between p-2 pl-6 bg-gradient-to-r from-orange-600 to-orange-500 text-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(249,115,22,0.4)] border-t border-white/20 active:scale-95 transition-all overflow-hidden relative group"
      >
        {/* Animated High-Gloss Stripe */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-[45deg] translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-out"></div>

        <div className="flex flex-col text-left py-2">
          <div className="flex items-center gap-1.5 opacity-70 mb-1">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-40"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white"></span>
            </span>
            <span className="text-[10px] font-black uppercase tracking-[0.15em] leading-none">Official Release v{versionData.latest_version}</span>
          </div>
          <span className="text-xl font-black tracking-tighter leading-none italic">Download Now</span>
        </div>

        <div className="bg-white text-orange-600 p-4 rounded-[2rem] shadow-lg transform active:scale-90 transition-transform">
          <Download size={24} className="animate-bounce" />
        </div>
      </a>
    </div>
  );
};
