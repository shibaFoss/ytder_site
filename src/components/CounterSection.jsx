import React from 'react';
import { Star, Instagram, Facebook, Youtube, Twitter, Video } from 'lucide-react';
import { Reveal } from './Reveal';

export const CounterSection = ({ count, counterRef }) => {
  return (
    <section className="pt-8 pb-16 md:py-24 relative overflow-hidden bg-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,237,213,0.4)_0%,transparent_40%),radial-gradient(circle_at_70%_80%,rgba(245,243,255,0.4)_0%,transparent_40%)] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>
      <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
        {/* Mobile-only background spice */}
        <div className="md:hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none">
          <div className="absolute top-0 left-0 w-32 h-32 bg-fuchsia-500/20 blur-[60px] animate-blob"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-cyan-500/20 blur-[60px] animate-blob" style={{ animationDelay: '2s' }}></div>
        </div>

        <Reveal className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/10 to-purple-500/10 rounded-[2.2rem] blur-xl md:hidden opacity-50 animate-pulse"></div>
          <div className="relative bg-white/95 md:bg-white/80 backdrop-blur-none md:backdrop-blur-md border border-slate-200 md:group-hover:border-slate-300 p-6 sm:p-12 rounded-3xl shadow-xl transition-all duration-500 overflow-hidden">
            {/* Internal spice items */}
            <div className="md:hidden absolute top-0 right-0 p-4 opacity-5">
              <Star size={80} className="text-slate-900 rotate-12" />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black mb-8 leading-[1.1] tracking-tighter text-slate-900">
              <span className="text-slate-700">Millions trust </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-fuchsia-500 to-purple-600 bg-[length:200%_auto] animate-[gradient_4s_linear_infinite]">
                AIO-YTDER
              </span>
              <span className="text-base sm:text-lg md:text-xl font-medium text-slate-500 tracking-normal block mt-4 max-w-2xl mx-auto px-2 sm:px-0">
                The ultimate downloading powerhouse for your everyday digital life.
              </span>
            </h2>

            <div className="py-8 relative" ref={counterRef}>
              <div className="absolute inset-0 bg-orange-500/5 blur-3xl md:hidden rounded-full animate-pulse"></div>
              <div className="relative text-7xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-slate-900 via-slate-800 to-slate-500 tracking-tighter">
                {count.toLocaleString()}
              </div>
              <div className="text-orange-600 font-bold mt-3 uppercase tracking-widest text-[10px] sm:text-sm animate-pulse flex items-center justify-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]"></span>
                Downloads & Counting...
              </div>
            </div>

            <p className="text-slate-400 mb-6 font-medium">Supports downloads from all your favorite platforms:</p>
            <div className="flex flex-wrap justify-center gap-8 md:gap-12 text-slate-500">
              <Instagram className="w-8 h-8 md:w-10 md:h-10 hover:text-pink-500 transition-colors cursor-pointer" />
              <Facebook className="w-8 h-8 md:w-10 md:h-10 hover:text-blue-500 transition-colors cursor-pointer" />
              <Youtube className="w-8 h-8 md:w-10 md:h-10 hover:text-red-500 transition-colors cursor-pointer" />
              <Twitter className="w-8 h-8 md:w-10 md:h-10 hover:text-blue-400 transition-colors cursor-pointer" />
              <Video className="w-8 h-8 md:w-10 md:h-10 hover:text-purple-500 transition-colors cursor-pointer" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
