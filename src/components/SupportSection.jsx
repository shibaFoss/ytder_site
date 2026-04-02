import React from 'react';
import { Instagram, Facebook, Youtube, Twitter, Music, Image, PlaySquare, PlayCircle } from 'lucide-react';
import { Reveal } from './Reveal';

export const SupportSection = () => {
  return (
    <section className="py-12 md:py-20 bg-slate-50/30 relative z-20 overflow-hidden">
      {/* Subtle Section Flare */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-orange-200/20 blur-[100px] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
      <div className="absolute top-1/2 right-0 w-64 h-64 bg-blue-200/20 blur-[100px] rounded-full pointer-events-none translate-x-1/2 -translate-y-1/2 animate-pulse" style={{ animationDelay: '3s' }}></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <Reveal>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 text-center lg:text-left">
            <div className="flex-shrink-0">
              <div className="inline-block px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-xs font-bold mb-4 uppercase tracking-widest">Global Support</div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4 tracking-tight leading-tight">
                Support for <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-400">Everything</span>
              </h2>
              <p className="text-slate-500 font-medium text-base sm:text-lg max-w-md">Download high-quality content from these platforms and over <strong className="text-slate-900 font-black italic">1000+</strong> others.</p>
            </div>

            <div className="flex flex-wrap justify-center gap-5 md:gap-8">
              {[
                { icon: Instagram, color: "text-pink-500", glow: "shadow-pink-500/20", label: "Instagram" },
                { icon: Facebook, color: "text-blue-600", glow: "shadow-blue-600/20", label: "Facebook" },
                { icon: Youtube, color: "text-red-600", glow: "shadow-red-600/20", label: "YouTube" },
                { icon: Twitter, color: "text-sky-400", glow: "shadow-sky-400/20", label: "Twitter" },
                { icon: Music, color: "text-emerald-400", glow: "shadow-emerald-400/20", label: "TikTok" },
                { icon: Image, color: "text-rose-500", glow: "shadow-rose-500/20", label: "Pinterest" },
                { icon: PlaySquare, color: "text-blue-500", glow: "shadow-blue-500/20", label: "Dailymotion" },
                { icon: PlayCircle, color: "text-orange-500", glow: "shadow-orange-500/20", label: "Movies" }
              ].map((site, idx) => (
                <div key={idx} className={`group relative flex flex-col items-center ${idx >= 6 ? 'md:hidden' : ''}`}>
                  <div className={`w-16 h-16 md:w-20 md:h-20 bg-white border border-slate-200/80 rounded-2xl md:rounded-3xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:border-transparent group-hover:shadow-2xl ${site.glow} group-hover:-translate-y-2 relative overflow-hidden`}>
                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity bg-current ${site.color}`}></div>
                    <site.icon size={32} className={`transition-all duration-500 transform group-hover:scale-110 ${site.color}`} />
                  </div>
                  <span className="mt-4 text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-slate-900 transition-colors duration-300">{site.label}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
