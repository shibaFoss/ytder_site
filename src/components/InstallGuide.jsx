import React from 'react';
import { Download, Settings, Rocket, CheckCircle2 } from 'lucide-react';
import { Reveal } from './Reveal';

export const InstallGuide = () => {
  return (
    <section id="install-guide" className="py-16 md:py-32 relative overflow-hidden bg-white">
      {/* Stylized Section Decor */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.06)_0%,transparent_50%),radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.05)_0%,transparent_50%)] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808006_1px,transparent_1px),linear-gradient(to_bottom,#80808006_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <Reveal className="text-center mb-20 md:mb-28 px-4">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black mb-8 tracking-tighter text-slate-900 leading-none">
            How to <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">Install?</span>
          </h2>
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-slate-50 border border-slate-200 text-slate-500 font-bold text-sm sm:text-base">
            Easily install on any Android device.
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 relative">
          {/* Step 1 */}
          <Reveal delay={0} className="relative flex flex-col group">
            <div className="text-8xl font-black text-slate-900/5 absolute -top-12 -left-6 z-0 select-none group-hover:text-orange-500/10 transition-colors">01</div>
            <div className="bg-white/40 backdrop-blur-xl p-6 rounded-[3rem] border border-slate-200/60 shadow-xl shadow-slate-100 mb-8 relative overflow-hidden group-hover:-translate-y-3 transition-all duration-500">
              <div className="p-4 flex flex-col items-center justify-center h-52 bg-slate-50 text-slate-900 relative rounded-[2rem] border border-slate-100 overflow-hidden group-hover:bg-white transition-colors">
                <div className="bg-white p-5 rounded-2xl shadow-xl border border-slate-100 w-full text-center relative z-10 transition-transform group-hover:scale-105">
                  <h4 className="font-black text-xs mb-3 text-slate-900 line-clamp-1 opacity-70">AIO-YTDER.apk</h4>
                  <div className="bg-orange-600 text-white w-full py-3 rounded-xl font-black text-[10px] sm:text-xs flex justify-center items-center gap-2 shadow-lg shadow-orange-200 animate-pulse">
                    <Download size={14} /> DOWNLOAD
                  </div>
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 scale-150">
                  <Rocket size={100} />
                </div>
              </div>
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-3 ml-2 group-hover:text-orange-600 transition-colors">1. Download APK</h3>
            <p className="text-slate-500 text-sm leading-relaxed px-2 font-medium">Click the main download button. The APK is small, safe, and ready in seconds.</p>
          </Reveal>

          {/* Step 2 */}
          <Reveal delay={150} className="relative flex flex-col group">
            <div className="text-8xl font-black text-slate-900/5 absolute -top-12 -left-6 z-0 select-none group-hover:text-fuchsia-500/10 transition-colors">02</div>
            <div className="bg-white/40 backdrop-blur-xl p-6 rounded-[3rem] border border-slate-200/60 shadow-xl shadow-slate-100 mb-8 relative overflow-hidden group-hover:-translate-y-3 transition-all duration-500">
              <div className="p-4 flex flex-col justify-center h-52 bg-slate-900 text-white relative rounded-[2rem] shadow-inner overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Settings size={60} className="animate-spin-slow" />
                </div>
                <div className="text-[10px] uppercase font-black text-slate-500 mb-3 tracking-widest">Security Setting</div>
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/10">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold font-mono">Unknown Apps</span>
                    <div className="w-10 h-5 bg-orange-500 rounded-full flex items-center p-1 justify-end shadow-[0_0_15px_rgba(249,115,22,0.5)]">
                      <div className="w-3.5 h-3.5 bg-white rounded-full shadow-sm"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-3 ml-2 group-hover:text-fuchsia-600 transition-colors">2. System Access</h3>
            <p className="text-slate-500 text-sm leading-relaxed px-2 font-medium">If Chrome asks, go to Settings & tap <b className="text-slate-900">'Allow from this source'</b>.</p>
          </Reveal>

          {/* Step 3 */}
          <Reveal delay={300} className="relative flex flex-col group">
            <div className="text-8xl font-black text-slate-900/5 absolute -top-12 -left-6 z-0 select-none group-hover:text-orange-500/10 transition-colors">03</div>
            <div className="bg-white/40 backdrop-blur-xl p-6 rounded-[3rem] border border-slate-200/60 shadow-xl shadow-slate-100 mb-8 relative overflow-hidden group-hover:-translate-y-3 transition-all duration-500">
              <div className="p-4 flex flex-col justify-center h-52 bg-slate-50 text-slate-900 relative rounded-[2rem] border border-slate-100 overflow-hidden group-hover:bg-white transition-colors">
                <div className="bg-white p-5 rounded-2xl shadow-xl border border-slate-100 w-full relative z-10 font-bold">
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-3 mb-4">
                    <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center text-white text-xs shadow-md">AIO</div>
                    <span className="font-black text-xs tracking-tight">YTDER Downloader</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <div className="flex-1 py-2 text-[10px] font-black text-slate-400 text-center uppercase tracking-wider">CANCEL</div>
                    <div className="flex-1 py-2 text-[10px] font-black text-orange-600 text-center uppercase tracking-wider bg-orange-50 rounded-lg animate-pulse">INSTALL</div>
                  </div>
                </div>
              </div>
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-3 ml-2 group-hover:text-orange-600 transition-colors">3. Quick Install</h3>
            <p className="text-slate-500 text-sm leading-relaxed px-2 font-medium">Just tap <b className="text-slate-900">'Install'</b>. The process is instant and automated.</p>
          </Reveal>

          {/* Step 4 */}
          <Reveal delay={450} className="relative flex flex-col group">
            <div className="text-8xl font-black text-slate-900/5 absolute -top-12 -left-6 z-0 select-none group-hover:text-emerald-500/10 transition-colors">04</div>
            <div className="bg-white/40 backdrop-blur-xl p-6 rounded-[3rem] border border-slate-200/60 shadow-xl shadow-slate-100 mb-8 relative overflow-hidden group-hover:-translate-y-3 transition-all duration-500">
              <div className="p-4 flex flex-col items-center justify-center h-52 bg-slate-50 text-slate-900 relative rounded-[2rem] border border-slate-100 overflow-hidden group-hover:bg-white transition-colors">
                <div className="w-16 h-16 bg-emerald-500 rounded-[1.2rem] flex items-center justify-center mb-4 shadow-2xl shadow-emerald-200 group-hover:scale-110 transition-transform">
                  <CheckCircle2 size={32} className="text-white" />
                </div>
                <h4 className="font-black text-xl text-emerald-600 tracking-tight">Success!</h4>
                <p className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-widest">Enjoy Your Power</p>
              </div>
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-3 ml-2 group-hover:text-emerald-600 transition-colors">4. Launch & Play</h3>
            <p className="text-slate-500 text-sm leading-relaxed px-2 font-medium">Open the app, browse your favorite site, and start saving content for free.</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
