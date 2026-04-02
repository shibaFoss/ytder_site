import React from 'react';
import { Link } from 'react-router-dom';
import { Download, Star, Github, FileEdit } from 'lucide-react';

export const Navbar = ({ stars, versionData, onDownload }) => {
  return (
    <nav className="fixed top-0 inset-x-0 z-[100] px-4 py-4 pointer-events-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3 bg-white/70 backdrop-blur-xl border border-slate-200/60 rounded-full shadow-2xl shadow-slate-200/50 pointer-events-auto">
        <Link to="/" className="flex items-center gap-3 pointer-events-auto">
          <div className="w-10 h-10 rounded-xl overflow-hidden shadow-lg hover:scale-110 transition-transform cursor-pointer">
            <img src="/playstore-logo.webp" alt="AIO-YTDER" className="w-full h-full object-cover" />
          </div>
          <span className="text-xl sm:text-2xl font-black text-slate-900 tracking-tighter">
            AIO<span className="text-orange-600">-</span>YTDER
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <Link to="/blog" className="hidden md:flex items-center gap-2 px-6 py-2 hover:bg-slate-50 text-slate-400 hover:text-slate-900 rounded-full font-black text-[11px] transition-all uppercase tracking-[0.2em] pointer-events-auto border border-transparent hover:border-slate-100">
             <FileEdit size={14} className="text-orange-500" />
             Blog
          </Link>

          <a
            href="https://github.com/shibaFoss/AIO-Video-Downloader"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 px-3 py-2 bg-slate-900 text-white rounded-full group hover:bg-black transition-all duration-300 active:scale-95 shadow-xl shadow-slate-200/50"
          >
            <Github size={16} className="opacity-90 group-hover:scale-110 transition-transform" />
            {stars > 0 && (
              <div className="flex items-center gap-1.5 border-l border-white/20 pl-2">
                <Star size={11} fill="#fbbf24" className="text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.4)]" />
                <span className="text-[11px] font-black tracking-tight">{stars.toLocaleString()}</span>
              </div>
            )}
          </a>

          <a
            href={versionData.latest_apk_url}
            onClick={onDownload}
            className="hidden md:flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white rounded-full font-black text-sm transition-all duration-300 active:scale-95 shadow-xl shadow-orange-200/40 relative overflow-hidden group/btn"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 ease-in-out"></div>
            <Download size={16} className="group-hover/btn:-translate-y-0.5 transition-transform" />
            Download APK
          </a>
        </div>
      </div>
    </nav>
  );
};
