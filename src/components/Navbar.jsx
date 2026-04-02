import React from 'react';
import { Download, Star } from 'lucide-react';

export const Navbar = ({ stars, versionData, onDownload }) => {
  return (
    <nav className="fixed top-0 inset-x-0 z-[100] px-4 py-4 pointer-events-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3 bg-white/70 backdrop-blur-xl border border-white/20 rounded-full shadow-2xl shadow-slate-200/50 pointer-events-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl overflow-hidden shadow-lg hover:scale-110 transition-transform cursor-pointer">
            <img src="/playstore-logo.webp" alt="AIO-YTDER" className="w-full h-full object-cover" />
          </div>
          <span className="text-2xl font-black text-slate-900 tracking-tighter">
            AIO<span className="text-orange-600">-</span>YTDER
          </span>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com/shibaFoss/AIO-Video-Downloader"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-end group"
          >
            <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-slate-600 transition-colors">GitHub Repository</div>
            {stars > 0 && (
              <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 group-hover:text-amber-600 transition-colors">
                <Star size={10} fill="currentColor" className="text-amber-500" />
                <span>{stars.toLocaleString()}</span>
              </div>
            )}
          </a>

          <a
            href={versionData.latest_apk_url}
            onClick={onDownload}
            className="hidden md:flex items-center gap-2 px-6 py-2.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-full font-bold text-sm text-slate-900 transition-all duration-300 active:scale-95"
          >
            <Download size={16} className="text-fuchsia-500" />
            Download APK
          </a>
        </div>
      </div>
    </nav>
  );
};
