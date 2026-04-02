import React from 'react';
import { Download, ChevronDown, ShieldCheck, Award, Star, CheckCircle2 } from 'lucide-react';
import { Reveal } from './Reveal';
import { ShimmerBadge } from './ShimmerBadge';

export const Hero = ({ versionData, onDownload, scrollToInstall, screenshotIndex, handleScroll, setScreenshotIndex }) => {
  return (
    <section className="relative pt-28 pb-12 lg:pt-36 lg:pb-40 overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 mix-blend-overlay pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center justify-center text-center">

          {/* Top: Copy & CTA */}
          <div className="max-w-4xl">
            <Reveal delay={50}>
              <img src="/playstore-logo.webp" alt="AIO-YTDER Icon" className="w-24 h-24 mx-auto mb-8 shadow-2xl rounded-[2rem] border-2 border-white/10" width="96" height="96" loading="eager" decoding="sync" />
            </Reveal>
            <Reveal delay={100}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6 group hover:bg-blue-500/20 transition-colors mx-auto">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">v{versionData.latest_version} is Live!</span>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black text-slate-900 mb-6 leading-[1.1] tracking-tight px-4 sm:px-0">
                Download <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-fuchsia-600 drop-shadow-sm">Anything.</span><br />
                <span className="text-slate-800 animate-pulse-soft">Anywhere.</span>
              </h1>
            </Reveal>

            <Reveal delay={300}>
              <p className="text-base sm:text-lg lg:text-xl text-slate-600 mb-6 sm:mb-10 max-w-2xl mx-auto leading-relaxed px-2 sm:px-0">
                The #1 premium alternative to Snaptube and Vidmate. Download any video from any website in HD quality. Trusted by over <strong className="text-slate-900">5 Lakh+</strong> users worldwide. 🚀
              </p>
            </Reveal>

            <Reveal delay={400} className="flex flex-col sm:flex-row items-center gap-4 justify-center">
              <div className="relative group">
                <div className="absolute -top-3 -right-3 z-30 bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg border border-emerald-400 animate-pulse">
                  v{versionData.latest_version}
                </div>
                <a
                  href={versionData.latest_apk_url}
                  onClick={onDownload}
                  className="relative block w-full sm:w-auto px-10 py-4 sm:px-12 sm:py-5 bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 rounded-full font-bold text-lg sm:text-xl text-white shadow-xl shadow-orange-200 hover:shadow-2xl hover:shadow-orange-300 transition-all duration-300 hover:scale-105 active:scale-95 hover:-translate-y-1 overflow-hidden border border-white/20 group text-center"
                >
                  <div className="absolute inset-x-0 top-0 h-1/2 bg-white/10 group-hover:bg-white/20 transition-colors"></div>
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"></div>
                  <span className="relative flex items-center justify-center gap-2 drop-shadow-md">
                    <Download className="animate-bounce" />
                    Download APK Now (Free)
                  </span>
                </a>
              </div>
              <button
                onClick={scrollToInstall}
                className="w-full sm:w-auto px-10 py-5 rounded-full font-semibold text-xl text-slate-900 border border-slate-200 hover:bg-slate-50 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 group"
              >
                How to Install? <ChevronDown size={24} className="group-hover:translate-y-1 transition-transform" />
              </button>
            </Reveal>

            <Reveal delay={500} className="mt-12 grid grid-cols-2 md:flex md:flex-wrap justify-center gap-4 md:gap-6 w-full max-w-lg mx-auto md:max-w-none">
              <ShimmerBadge icon={ShieldCheck} text="Made in India" type="emerald" />
              <ShimmerBadge icon={Award} text="No.1 Choice" type="gold" />
              <ShimmerBadge icon={Star} text="4.9/5 Rating" type="blue" />
              <ShimmerBadge icon={CheckCircle2} text="100% Secured" type="purple" />
            </Reveal>
          </div>

          {/* --- ADAPTIVE SCREENSHOT SHOWCASE --- */}
          <div className="relative w-[calc(100%+3rem)] -mx-6 md:w-full md:mx-0 mt-12 md:mt-32 overflow-hidden md:overflow-visible">
            <div
              className="flex gap-4 md:gap-12 overflow-x-auto md:overflow-visible snap-x snap-mandatory no-scrollbar pb-12 pt-4 px-[11%] md:px-0 md:justify-center"
              onScroll={(e) => handleScroll(e, setScreenshotIndex)}
            >
              {[
                { img: '/shots/shot1.jpg', title: 'Power Splash', rotate: '-rotate-2' },
                { img: '/shots/shot2.jpg', title: 'Smart Browser', rotate: '-rotate-1' },
                { img: '/shots/shot3.jpg', title: 'Video Extractor', rotate: 'rotate-0' },
                { img: '/shots/shot4.jpg', title: 'Download Manager', rotate: 'rotate-1' },
                { img: '/shots/shot5.jpg', title: 'HD Quality', rotate: 'rotate-2' }
              ].map((shot, idx) => (
                <div
                  key={idx}
                  className={`min-w-[78%] sm:min-w-[45%] md:min-w-0 md:w-[280px] lg:w-[340px] snap-center transition-all duration-700 ease-out transform 
                    ${screenshotIndex === idx || (idx >= 0 && idx <= 4) // Always active on desktop
                      ? 'scale-100 opacity-100'
                      : 'scale-90 opacity-40'
                    } ${shot.rotate} md:rotate-0 hover:rotate-0 hover:scale-105 hover:z-30`}
                >
                  <div className="relative aspect-[9/19.5] rounded-[2.5rem] md:rounded-[4rem] overflow-hidden border-4 md:border-[12px] border-slate-100 shadow-2xl shadow-slate-200/50 group transition-all duration-500 bg-white">
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none z-10"></div>
                    <img
                      src={shot.img}
                      alt={shot.title}
                      className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110"
                      loading={idx === 1 ? "eager" : "lazy"}
                      decoding="async"
                      width="640"
                      height="640"
                    />
                    <div className="absolute top-4 right-4 md:top-8 md:right-8 bg-white/80 backdrop-blur-xl px-4 py-2 rounded-full border border-slate-200 shadow-xl flex items-center gap-2 z-20">
                      <div className="w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.8)] animate-pulse"></div>
                      <span className="text-[10px] md:text-xs font-black uppercase tracking-widest text-slate-800 leading-none">{shot.title}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Dots (Mobile Only) */}
            <div className="md:hidden flex justify-center gap-2 mt-4">
              {[0, 1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-500 ${i === screenshotIndex ? 'bg-orange-500 w-8' : 'bg-slate-300 w-2'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
