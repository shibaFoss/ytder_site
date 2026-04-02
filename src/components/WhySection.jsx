import React from 'react';
import { Rocket, MonitorPlay, Globe, IndianRupee } from 'lucide-react';
import { Reveal } from './Reveal';

export const WhySection = ({ featureIndex, handleScroll, setFeatureIndex }) => {
  const desktopFeatures = [
    { icon: Rocket, title: "Ultra-Fast Speed", desc: "Download full-length movies in seconds with advanced multi-threading technology.", color: "text-blue-400", bg: "bg-blue-400/10" },
    { icon: MonitorPlay, title: "HD & 4K Quality", desc: "Choose your resolution: 144p to save data, or stunning 1080p and 4K for the big screen.", color: "text-purple-400", bg: "bg-purple-400/10" },
    { icon: Globe, title: "In-App Browser", desc: "Browse your favorite sites and download with a single tap, without ever leaving the app.", color: "text-cyan-400", bg: "bg-cyan-400/10" },
    { icon: IndianRupee, title: "100% Free", desc: "Bilkul Free! No hidden subscriptions. No credit cards. Premium features for everyone.", color: "text-emerald-400", bg: "bg-emerald-400/10" }
  ];

  const mobileFeatures = [
    { icon: Rocket, title: "Ultra Speed", desc: "Download full-length 4K HD movies in a few minutes.", color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-200" },
    { icon: MonitorPlay, title: "4K Quality", desc: "Play stunning 1080p and 4K resolution with built-in player.", color: "text-purple-600", bg: "bg-purple-50", border: "border-purple-200" },
    { icon: Globe, title: "Smart Browser", desc: "Browse and download online videos directly with a single tap.", color: "text-cyan-600", bg: "bg-cyan-50", border: "border-cyan-200" },
    { icon: IndianRupee, title: "100% Free", desc: "There is no hidden costs. No subscriptions. No hidden charges.", color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200" }
  ];

  return (
    <section className="py-8 md:py-24 bg-white relative overflow-hidden">
      {/* Stylized Mobile Atmosphere */}
      <div className="md:hidden absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(249,115,22,0.08)_0%,transparent_60%),radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.03)_0%,transparent_50%)] pointer-events-none"></div>
      <div className="md:hidden absolute inset-0 bg-[linear-gradient(to_right,#80808006_1px,transparent_1px),linear-gradient(to_bottom,#80808006_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <Reveal className="text-center mb-16 px-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 tracking-tight text-slate-900">Why AIO is the <span className="text-orange-600">King</span> of all downloaders?</h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            We didn’t just build another downloader, we engineered the <span className="font-bold text-slate-900">fastest</span>, <span className="font-bold text-slate-900">safest</span>, and <span className="font-bold text-orange-600">most powerful</span> tool for Android, combining effortless simplicity with full user control.
          </p>
        </Reveal>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {desktopFeatures.map((feature, idx) => (
            <Reveal key={idx} delay={idx * 100}>
              <div className="bg-slate-50/50 border border-slate-100 p-8 rounded-3xl hover:bg-white transition-all h-full group">
                <div className={`w-14 h-14 rounded-2xl ${feature.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`w-7 h-7 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* New Mobile Experience: Horizontal Snap Scroll Cards */}
        <div
          className="md:hidden flex overflow-x-auto snap-x snap-mandatory no-scrollbar gap-4 px-6 -mx-6 pb-4"
          onScroll={(e) => handleScroll(e, setFeatureIndex)}
        >
          {mobileFeatures.map((feature, idx) => (
            <div key={idx} className="min-w-[75%] snap-center px-1">
              <div className={`bg-white border border-slate-100 p-8 rounded-[2rem] h-full flex flex-col items-center text-center transition-all`}>
                <div className={`w-16 h-16 rounded-[1.5rem] ${feature.bg} flex items-center justify-center mb-6`}>
                  <feature.icon className={`w-8 h-8 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Slider Indicator */}
        <div className="md:hidden flex justify-center gap-1 mt-2">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className={`h-1 rounded-full transition-all duration-300 ${i === featureIndex ? 'w-4 bg-orange-500' : 'bg-slate-200'}`} />
          ))}
        </div>
      </div>
    </section>
  );
};
