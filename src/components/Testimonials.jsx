import React from 'react';
import { Star } from 'lucide-react';
import { Reveal } from './Reveal';

export const Testimonials = () => {
  const reviews = [
    { name: "Rajesh", loc: "Mumbai", text: "Finally a downloader that actually works. The speed is insane! Mere phone me kabhi buffer nahi karta ab.", color: "bg-orange-500" },
    { name: "Priya", loc: "Delhi", text: "The quality is amazing. Best app for saving reels and status videos without any watermark. Made in India rocks!", color: "bg-fuchsia-500" },
    { name: "Anita", loc: "Bengaluru", text: "Super easy to install. I'm not good with tech, but the guide was perfect. Thank you for keeping it free!", color: "bg-blue-500" }
  ];

  return (
    <section className="py-16 md:py-28 bg-slate-50 relative overflow-hidden">
      {/* Stylized Section Flare */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(249,115,22,0.08)_0%,transparent_50%),radial-gradient(circle_at_top_left,rgba(168,85,247,0.05)_0%,transparent_50%)] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808006_1px,transparent_1px),linear-gradient(to_bottom,#80808006_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none"></div>

      {/* Floating Decorative Elements */}
      <div className="absolute top-1/4 left-10 opacity-20 animate-spin-slow pointer-events-none hidden md:block">
        <Star size={40} className="text-orange-300" />
      </div>
      <div className="absolute bottom-1/4 right-10 opacity-20 animate-spin-slow pointer-events-none hidden md:block" style={{ animationDirection: 'reverse' }}>
        <Star size={60} className="text-purple-300" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <Reveal className="text-center mb-16 px-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6 tracking-tight text-slate-900">
            Loved by Millions <span className="text-orange-600">Across India</span>
          </h2>
          <div className="flex justify-center gap-1 text-amber-400 mb-6 scale-125">
            <Star fill="currentColor" /> <Star fill="currentColor" /> <Star fill="currentColor" /> <Star fill="currentColor" /> <Star fill="currentColor" />
          </div>
          <p className="text-slate-500 font-medium text-lg">Trusted by users globally with a <span className="text-slate-900 font-bold underline decoration-orange-500/30">4.8/5 Rating</span></p>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review, idx) => (
            <Reveal key={idx} delay={idx * 150}>
              <div className="bg-white/70 backdrop-blur-md p-8 rounded-[2.5rem] relative border border-white shadow-xl hover:shadow-2xl hover:bg-white transition-all duration-500 group">
                <div className="flex text-amber-400 mb-6 gap-1 group-hover:scale-110 transition-transform origin-left">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <p className="text-lg text-slate-700 font-medium italic mb-8 leading-relaxed">"{review.text}"</p>
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-2xl ${review.color} flex items-center justify-center text-white font-black text-2xl shadow-lg transition-transform group-hover:rotate-12`}>
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-black text-slate-900 text-lg">{review.name}</div>
                    <div className="text-xs font-bold text-orange-500/70 uppercase tracking-widest">{review.loc}</div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
