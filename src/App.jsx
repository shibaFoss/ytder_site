import React, { useState, useEffect, useRef } from 'react';
import {
  Download,
  ChevronDown,
  ShieldCheck,
  Award,
  Rocket,
  MonitorPlay,
  Globe,
  IndianRupee,
  CheckCircle2,
  Settings,
  AlertTriangle,
  PlaySquare,
  Star,
  Instagram,
  Facebook,
  Youtube,
  Twitter,
  Video,
  Music,
  PlayCircle,
  Github,
  Image
} from 'lucide-react';

// --- Custom Hooks ---

// Hook for scroll-triggered reveal animations
const useScrollReveal = () => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
};

// Hook for animating numbers
const useCountUp = (end, duration = 2000) => {
  const [count, setCount] = useState(0);
  const { ref, isVisible } = useScrollReveal();

  useEffect(() => {
    let startTime = null;
    if (!isVisible) return;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      // Ease out quart
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeProgress * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [end, duration, isVisible]);

  return { ref, count };
};

// --- Components ---

const Reveal = ({ children, delay = 0, className = "" }) => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-[opacity,transform] duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        } ${className}`}
    >
      {children}
    </div>
  );
};

const ShimmerBadge = ({ icon: Icon, text, type = 'gold' }) => {
  const typeColors = {
    gold: 'from-amber-400 via-amber-100 to-amber-500 text-amber-900 border-amber-200 shadow-amber-100',
    emerald: 'from-emerald-500 via-emerald-100 to-emerald-600 text-emerald-900 border-emerald-200 shadow-emerald-100',
    blue: 'from-blue-500 via-blue-100 to-blue-600 text-blue-900 border-blue-200 shadow-blue-100',
    purple: 'from-purple-500 via-purple-100 to-purple-600 text-purple-900 border-purple-200 shadow-purple-100'
  };

  const colors = typeColors[type] || typeColors.gold;

  return (
    <div className={`relative overflow-hidden flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm shadow-md border ${colors} bg-gradient-to-r transition-all hover:scale-105 active:scale-95 cursor-default`}>
      <Icon size={16} className={colors.split(' ')[2]} />
      <span>{text}</span>
      {/* Shimmer Effect */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2.5s_infinite] bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-12" />
    </div>
  );
};

const PhoneMockup = ({ children, className = "" }) => (
  <div className={`relative mx-auto w-[280px] h-[580px] bg-gray-900 rounded-[3rem] border-[10px] border-gray-800 shadow-2xl overflow-hidden shadow-cyan-500/20 ${className}`}>
    {/* Notch */}
    <div className="absolute top-0 inset-x-0 h-6 bg-gray-800 rounded-b-3xl w-1/2 mx-auto z-20" />
    <div className="relative h-full w-full bg-slate-950 overflow-hidden text-white">
      {children}
    </div>
  </div>
);

const SpiderWeb = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (window.innerWidth < 768) return; // Disable canvas animation on mobile for performance
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let particles = [];
    const particleCount = 60;
    const connectionDistance = 180;
    const mouse = { x: null, y: null, radius: 200 };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    resize();

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = 2;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

        // Mouse interaction
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < mouse.radius) {
            const force = (mouse.radius - distance) / mouse.radius;
            this.x -= dx * force * 0.02;
            this.y -= dy * force * 0.02;
          }
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(249, 115, 22, 0.2)';
        ctx.fill();
      }
    }

    const init = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.03)';
      ctx.lineWidth = 0.5;

      particles.forEach((p, i) => {
        p.update();
        p.draw();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(249, 115, 22, ${0.1 * (1 - distance / connectionDistance)})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 hidden md:block"
      style={{ opacity: 0.6 }}
    />
  );
};


// --- Main Application ---

export default function App() {
  const { ref: counterRef, count } = useCountUp(587324, 2500);
  const [stars, setStars] = useState(0);
  const [featureIndex, setFeatureIndex] = useState(0);
  const [screenshotIndex, setScreenshotIndex] = useState(0);
  const [versionData, setVersionData] = useState({
    latest_version: 'v2.5.0',
    latest_apk_url: '#',
  });

  useEffect(() => {
    // Fetch GitHub Stars
    fetch('https://api.github.com/repos/shibaFoss/AIO-Video-Downloader')
      .then(res => res.json())
      .then(data => {
        if (data.stargazers_count) {
          setStars(data.stargazers_count);
        }
      })
      .catch(err => console.error('Error fetching stars:', err));

    // Fetch Version Info
    fetch('https://raw.githubusercontent.com/shibaFoss/AIO-Video-Downloader/refs/heads/master/others/version_info.txt')
      .then(res => res.text())
      .then(text => {
        const lines = text.split('\n');
        const data = {};
        lines.forEach(line => {
          const [key, value] = line.split('=');
          if (key && value) data[key.trim()] = value.trim();
        });
        if (data.latest_version) {
          setVersionData(data);
        }
      })
      .catch(err => console.error('Error fetching version info:', err));
  }, []);

  const scrollToInstall = () => {
    document.getElementById('install-guide').scrollIntoView({ behavior: 'smooth' });
  };

  const handleScroll = (e, setter) => {
    const container = e.target;
    const scrollLeft = container.scrollLeft;
    const itemWidth = container.children[0].offsetWidth + 16; // item width + gap
    const index = Math.round(scrollLeft / itemWidth);
    setter(index);
  };


  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-orange-500 selection:text-white overflow-x-hidden relative font-sans">
      {/* --- PREMIUM BACKGROUND SYSTEM --- */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Animated Mesh Blobs - Lightened for Light Mode */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-400/10 rounded-full blur-[120px] animate-blob"></div>
        <div className="absolute top-[20%] right-[-10%] w-[35%] h-[35%] bg-fuchsia-400/10 rounded-full blur-[120px] animate-blob" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-[10%] left-[10%] w-[30%] h-[30%] bg-blue-400/10 rounded-full blur-[120px] animate-blob" style={{ animationDelay: '4s' }}></div>

        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50/40 via-white to-fuchsia-50/40"></div>
      </div>

      <SpiderWeb />

      {/* --- PREMIUM NAVBAR --- */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-10 h-10 rounded-xl overflow-hidden shadow-lg shadow-orange-200 group-hover:scale-110 transition-transform">
              <img src="/playstore-logo.webp" alt="AIO-YTDER" className="w-full h-full object-cover" />
            </div>
            <span className="text-xl sm:text-2xl font-black text-slate-900 tracking-tighter">
              AIO<span className="text-orange-600">-</span>YTDER
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/shibaFoss/AIO-Video-Downloader"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-2.5 py-1 bg-slate-50 hover:bg-slate-100 border border-slate-200/60 rounded-full transition-all duration-300"
              title="View on GitHub"
            >
              <Github size={15} className="text-slate-500 group-hover:text-slate-900 transition-colors" />
              {stars > 0 && (
                <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 group-hover:text-amber-600 transition-colors">
                  <Star size={10} fill="currentColor" className="text-amber-500" />
                  <span>{stars.toLocaleString()}</span>
                </div>
              )}
            </a>

            <a
              href={versionData.latest_apk_url}
              className="hidden md:flex items-center gap-2 px-6 py-2.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-full font-bold text-sm text-slate-900 transition-all duration-300 active:scale-95"
            >
              <Download size={16} className="text-fuchsia-500" />
              Download APK
            </a>
          </div>
        </div>
      </nav>

      {/* Global Styles for Animations */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .bg-circuit {
          background-image: radial-gradient(circle, rgba(56, 189, 248, 0.4) 1px, transparent 1px);
          background-size: 24px 24px;
          background-position: center;
          -webkit-mask-image: radial-gradient(circle, black 40%, transparent 80%);
          mask-image: radial-gradient(circle, black 40%, transparent 80%);
        }
        .bg-glow-soft {
          background: radial-gradient(circle at center, rgba(56, 189, 248, 0.15) 0%, transparent 70%);
        }
        @keyframes pulse-soft {
          0%, 100% { transform: scale(1); opacity: 0.9; filter: drop-shadow(0 0 5px rgba(255,255,255,0.1)); }
          50% { transform: scale(1.02); opacity: 1; filter: drop-shadow(0 0 15px rgba(255,255,255,0.3)); }
        }
        .animate-pulse-soft { animation: pulse-soft 4s ease-in-out infinite; }
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        .animate-scan { animation: scan 2s linear infinite; }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow { animation: spin-slow 8s linear infinite; }
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob { animation: blob 7s infinite alternate; }
        .bg-grid-slate-800 {
          background-image: 
            linear-gradient(to right, rgb(30 41 59 / 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgb(30 41 59 / 0.1) 1px, transparent 1px);
          background-size: 44px 44px;
        }
        .noise {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
          opacity: 0.05;
        }
        @keyframes perspective-left {
          from { transform: perspective(1000px) rotateY(15deg) scale(0.9); }
          to { transform: perspective(1000px) rotateY(25deg) scale(0.95); }
        }
        @keyframes perspective-right {
          from { transform: perspective(1000px) rotateY(-15deg) scale(0.9); }
          to { transform: perspective(1000px) rotateY(-25deg) scale(0.95); }
        }
        .animate-perspective-left { animation: perspective-left 5s ease-in-out infinite alternate; }
        .animate-perspective-right { animation: perspective-right 5s ease-in-out infinite alternate; }
        .text-3d {
          text-shadow: 
            0 1px 0 #1e293b,
            0 2px 0 #161e2e,
            0 3px 0 #0f172a,
            0 4px 0 #020617,
            0 10px 15px rgba(0,0,0,0.8);
        }
        .text-glow-cyan {
          text-shadow: 0 0 10px rgba(34, 211, 238, 0.4), 0 0 20px rgba(34, 211, 238, 0.1);
        }
        .premium-divider {
          height: 1px;
          width: 100%;
          background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.05), rgba(56, 189, 248, 0.2), rgba(255, 255, 255, 0.05), transparent);
          position: relative;
        }
        .premium-divider-glow {
          height: 1px;
          width: 100%;
          background: linear-gradient(to right, transparent, rgba(56, 189, 248, 0.3), transparent);
          position: relative;
        }
        .premium-divider-glow::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 30%;
          height: 1px;
          background: linear-gradient(to right, transparent, #38bdf8, transparent);
          filter: blur(2px);
          box-shadow: 0 0 15px rgba(56, 189, 248, 0.4);
        }
        .premium-divider-orange {
          height: 1px;
          width: 100%;
          background: linear-gradient(to right, transparent, rgba(249, 115, 22, 0.1), rgba(249, 115, 22, 0.4), rgba(249, 115, 22, 0.1), transparent);
          position: relative;
        }

        /* --- EXTREME MOBILE OPTIMIZATIONS --- */
        @media (max-width: 768px) {
          [class*="animate-"] {
            animation: none !important;
          }
          .noise, .bg-circuit, .bg-glow-soft {
            display: none !important;
          }
          .text-3d {
            text-shadow: none !important;
            transform: none !important;
          }
          .text-glow-cyan {
            text-shadow: none !important;
          }
          .premium-divider-glow::after {
            display: none !important;
          }
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />

      {/* --- SECTION 1: HERO --- */}
      <section className="relative pt-16 pb-12 lg:pt-36 lg:pb-40 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 mix-blend-overlay"></div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center justify-center text-center">

            {/* Top: Copy & CTA */}
            <div className="max-w-4xl">
              <Reveal delay={50}>
                <img src="/playstore-logo.webp" alt="AIO-YTDER Icon" className="w-24 h-24 mx-auto mb-8 shadow-2xl rounded-[2rem] border-2 border-white/10" width="96" height="96" />
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
                  The #1 premium alternative to Snaptube and Vidmate. Download any video from any website in HD quality. Trusted by over <strong className="text-slate-900">5 Lakh+</strong> users.
                </p>
              </Reveal>

              <Reveal delay={400} className="flex flex-col sm:flex-row items-center gap-4 justify-center">
                <div className="relative group">
                  <div className="absolute -top-3 -right-3 z-30 bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg border border-emerald-400 animate-pulse">
                    v{versionData.latest_version}
                  </div>
                  <a
                    href={versionData.latest_apk_url}
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

            {/* --- MOBILE ONLY SLIDESHOW --- */}
            <div className="md:hidden relative w-full mt-12 overflow-visible">
              <div
                className="flex gap-2 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-12 pt-4 px-[6%]"
                onScroll={(e) => handleScroll(e, setScreenshotIndex)}
              >
                {[
                  { img: '/screenshot_home.webp', title: 'Power Home' },
                  { img: '/screenshot_browser.webp', title: 'Smart Search' },
                  { img: '/screenshot_downloads.webp', title: 'Ultra Speed' }
                ].map((shot, idx) => (
                  <div
                    key={idx}
                    className={`min-w-[88%] snap-center transition-all duration-700 ease-out transform ${screenshotIndex === idx ? 'scale-100 opacity-100 rotate-0' : 'scale-90 opacity-40 -rotate-1'
                      }`}
                  >
                    <div className="aspect-[9/17] relative rounded-[2.5rem] overflow-hidden border-4 border-slate-100 shadow-lg shadow-slate-200/30">
                      <img
                        src={shot.img}
                        alt={shot.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        width="640"
                        height="640"
                      />
                      <div className="absolute top-4 right-4 bg-white/50 backdrop-blur-xl px-4 py-2 rounded-full border border-white/20 shadow-2xl shadow-black/10 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.6)] animate-pulse"></div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-900 leading-none">{shot.title}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* Pagination Dots */}
              <div className="flex justify-center gap-1.5 mt-4">
                {[0, 1, 2].map((i) => (
                  <div key={i} className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === screenshotIndex ? 'bg-orange-500 w-5' : 'bg-slate-300'}`} />
                ))}
              </div>
            </div>

            {/* Bottom: 3D Triple Gallery (The "Better Idea") */}
            <div className="mt-16 lg:mt-32 w-full max-w-6xl md:block hidden">
              <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-0 relative">

                {/* 1. Left Feature: Smart Browser */}
                <Reveal delay={300} className="lg:w-1/3 order-2 lg:order-1 lg:-mr-12 hidden lg:block">
                  <div className="relative group animate-perspective-left">
                    <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur-2xl rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative rounded-[2.5rem] overflow-hidden border border-slate-200 shadow-xl transition-transform duration-500 group-hover:scale-105">
                      <img src="/hero-browser.webp" alt="Smart In-App Browser" className="w-full h-auto" width="640" height="640" loading="lazy" />
                    </div>
                    <div className="mt-8 text-center bg-white/60 backdrop-blur-md p-4 rounded-2xl border border-slate-200 opacity-0 lg:group-hover:opacity-100 transition-opacity">
                      <p className="text-slate-900 font-bold">Smart In-App Browser</p>
                      <p className="text-slate-500 text-sm">Download directly from any site.</p>
                    </div>
                  </div>
                </Reveal>

                {/* 2. Center: Main Experience (Download UI) */}
                <Reveal delay={500} className="lg:w-2/5 z-20 order-1 lg:order-2 scale-75 sm:scale-110 lg:scale-[1.2] -mt-10 lg:mt-0">
                  <div className="relative group animate-float">
                    <div className="hidden md:block absolute -inset-4 bg-gradient-to-r from-orange-500/20 to-fuchsia-500/20 blur-xl md:blur-3xl rounded-[3rem] opacity-40 md:opacity-70 animate-pulse"></div>
                    <div className="relative rounded-[3rem] overflow-hidden border-[8px] border-slate-100 shadow-2xl shadow-slate-200">
                      <img src="/hero-home.webp" alt="Speed Downloading Mockup" className="w-full h-auto" width="600" height="1200" />
                    </div>
                  </div>
                </Reveal>

                {/* 3. Right Feature: Advanced Manager */}
                <Reveal delay={400} className="lg:w-1/3 order-3 lg:order-3 lg:-ml-12 hidden lg:block">
                  <div className="relative group animate-perspective-right">
                    <div className="absolute -inset-2 bg-gradient-to-r from-purple-500/20 to-fuchsia-500/20 blur-2xl rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative rounded-[2.5rem] overflow-hidden border border-slate-200 shadow-xl transition-transform duration-500 group-hover:scale-105">
                      <img src="/hero-downloads.webp" alt="Download Management" className="w-full h-auto" width="640" height="640" loading="lazy" />
                    </div>
                    <div className="mt-8 text-center bg-white/60 backdrop-blur-md p-4 rounded-2xl border border-slate-200 opacity-0 lg:group-hover:opacity-100 transition-opacity">
                      <p className="text-slate-900 font-bold">Files Manager</p>
                      <p className="text-slate-500 text-sm">Organize & play offline.</p>
                    </div>
                  </div>
                </Reveal>

              </div>
            </div>

          </div>
        </div>
      </section>

      <div className="premium-divider-orange" />
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
                  <div key={idx} className="group relative flex flex-col items-center">
                    <div className={`w-16 h-16 md:w-20 md:h-20 bg-white border border-slate-200/80 rounded-2xl md:rounded-3xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:border-transparent group-hover:shadow-2xl ${site.glow} group-hover:-translate-y-2 relative overflow-hidden`}>
                      {/* Brand Gradient Overlay on Hover */}
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
      <div className="premium-divider-orange" />
      <section className="pt-8 pb-16 md:py-24 relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-white"></div>
        <div className="absolute inset-0 bg-white opacity-60"></div>
        <div className="absolute inset-0 bg-slate-50 opacity-10"></div>
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

      <div className="premium-divider-orange" />
      <div className="h-px w-full bg-slate-200" />
      <section className="py-8 md:py-24 bg-white relative">
        <div className="md:hidden absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(249,115,22,0.05)_0%,transparent_60%)]"></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal className="text-center mb-16 px-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 tracking-tight text-slate-900">Why AIO is the <span className="text-orange-600">King</span> of all downloaders?</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
              We didn’t just build another downloader, we engineered the <span className="font-bold text-slate-900">fastest</span>, <span className="font-bold text-slate-900">safest</span>, and <span className="font-bold text-orange-600">most powerful</span> tool for Android, combining effortless simplicity with full user control.
            </p>
          </Reveal>

          {/* Desktop Grid */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Rocket, title: "Ultra-Fast Speed", desc: "Download full-length movies in seconds with advanced multi-threading technology.", color: "text-blue-400", bg: "bg-blue-400/10" },
              { icon: MonitorPlay, title: "HD & 4K Quality", desc: "Choose your resolution: 144p to save data, or stunning 1080p and 4K for the big screen.", color: "text-purple-400", bg: "bg-purple-400/10" },
              { icon: Globe, title: "In-App Browser", desc: "Browse your favorite sites and download with a single tap, without ever leaving the app.", color: "text-cyan-400", bg: "bg-cyan-400/10" },
              { icon: IndianRupee, title: "100% Free", desc: "Bilkul Free! No hidden subscriptions. No credit cards. Premium features for everyone.", color: "text-emerald-400", bg: "bg-emerald-400/10" }
            ].map((feature, idx) => (
              <Reveal key={idx} delay={idx * 100}>
                <div className="bg-slate-50/50 border border-slate-200 p-8 rounded-3xl hover:bg-white transition-all shadow-sm hover:shadow-xl hover:shadow-slate-200/50 h-full group">
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
            {[
              { icon: Rocket, title: "Ultra Speed", desc: "Download full-length 4K HD movies in a few munites.", color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-200" },
              { icon: MonitorPlay, title: "4K Quality", desc: "Play stunning 1080p and 4K resolution with built-in player.", color: "text-purple-600", bg: "bg-purple-50", border: "border-purple-200" },
              { icon: Globe, title: "Smart Browser", desc: "Browse and download online videos directly with a single tap.", color: "text-cyan-600", bg: "bg-cyan-50", border: "border-cyan-200" },
              { icon: IndianRupee, title: "100% Free", desc: "There is no hidden costs. No subscriptions. No hidden charges.", color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200" }
            ].map((feature, idx) => (
              <div key={idx} className="min-w-[75%] snap-center">
                <div className={`bg-white/80 backdrop-blur-xl border border-slate-200 p-8 rounded-[2rem] h-full flex flex-col items-center text-center shadow-lg`}>
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

      {/* --- SECTION 3.5: PRO FEATURES (ANIMATED) --- */}
      <div className="premium-divider-glow hidden md:block" />
      <section className="py-12 md:py-24 relative overflow-hidden hidden md:block">
        <div className="absolute inset-0 bg-slate-900"></div>
        <div className="absolute inset-0 bg-glow-soft opacity-60"></div>
        <div className="absolute inset-0 bg-circuit animate-pulse-soft"></div>

        {/* Additional Decorative Blobs */}
        <div className="hidden md:block absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[150px] -mr-64 -mt-64"></div>
        <div className="hidden md:block absolute bottom-0 left-0 w-[500px] h-[500px] bg-fuchsia-500/10 blur-[150px] -ml-64 -mb-64"></div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <Reveal className="text-center mb-16 sm:mb-20 px-4">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black mb-6 tracking-tight">
              Power Features for <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500">Power Users</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-base sm:text-lg">Experience downloading like never before with our cutting-edge Pro Tools.</p>
          </Reveal>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* MP3 Extractions */}
            <Reveal delay={100} className="group flex flex-col md:flex-row bg-slate-900/50 border border-white/5 rounded-[2.5rem] overflow-hidden hover:border-fuchsia-500/50 transition-all duration-500">
              <div className="md:w-1/2 p-10 flex flex-col justify-center">
                <div className="w-12 h-12 bg-fuchsia-500/20 rounded-2xl flex items-center justify-center mb-6">
                  <Music className="text-fuchsia-400" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">Magic MP3 Extraction</h3>
                <p className="text-slate-400 leading-relaxed">Turn any music video into a high-quality 320kbps MP3 file instantly. Perfect for your workout playlists.</p>
              </div>
              <div className="md:w-1/2 bg-slate-800/30 relative flex items-center justify-center min-h-[250px] overflow-hidden">
                {/* Visualizer Animation */}
                <div className="flex items-end gap-1 h-24">
                  {[...Array(12)].map((_, i) => (
                    <div key={i} className="w-1.5 bg-fuchsia-500 rounded-full animate-[pulse_1s_ease-in-out_infinite]" style={{ height: `${Math.random() * 100}%`, animationDelay: `${i * 0.1}s` }}></div>
                  ))}
                </div>
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-slate-900 to-transparent"></div>
              </div>
            </Reveal>

            {/* 4K Downloads */}
            <Reveal delay={200} className="group flex flex-col md:flex-row-reverse bg-slate-900/50 border border-white/5 rounded-[2.5rem] overflow-hidden hover:border-cyan-500/50 transition-all duration-500">
              <div className="md:w-1/2 p-10 flex flex-col justify-center">
                <div className="w-12 h-12 bg-cyan-500/20 rounded-2xl flex items-center justify-center mb-6">
                  <MonitorPlay className="text-cyan-400" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">True 4K Ultra HD</h3>
                <p className="text-slate-400 leading-relaxed">Don't settle for grainy video. Download in crystal clear 4K resolution and feel every single pixel.</p>
              </div>
              <div className="md:w-1/2 bg-slate-800/30 relative flex items-center justify-center min-h-[250px]">
                <div className="relative">
                  <div className="text-8xl font-black text-cyan-500/10 select-none">4K</div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-20 border-2 border-cyan-400/30 rounded-lg flex items-center justify-center relative overflow-hidden">
                      <div className="w-full h-0.5 bg-cyan-400 absolute top-0 animate-scan"></div>
                      <div className="text-cyan-400 font-bold text-xl">UHD</div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Background Play */}
            <Reveal delay={300} className="group flex flex-col md:flex-row bg-slate-900/50 border border-slate-700/30 rounded-[2.5rem] overflow-hidden hover:border-white/20 transition-all duration-500">
              <div className="md:w-1/2 p-10 flex flex-col justify-center">
                <div className="w-12 h-12 bg-slate-100/10 rounded-2xl flex items-center justify-center mb-6">
                  <PlayCircle className="text-white" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">Background Playback</h3>
                <p className="text-slate-400 leading-relaxed">Keep your music playing even when the screen is off or you're using other apps. True multitasking.</p>
              </div>
              <div className="md:w-1/2 bg-slate-800/30 relative flex items-center justify-center min-h-[250px]">
                <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center animate-pulse-soft">
                  <PlayCircle size={48} className="text-white opacity-80" />
                </div>
                {/* Floating music notes */}
                <div className="absolute top-1/4 right-1/4 rotate-12 animate-bounce">🎵</div>
                <div className="absolute bottom-1/4 left-1/4 -rotate-12 animate-bounce" style={{ animationDelay: '0.5s' }}>🎶</div>
              </div>
            </Reveal>

            {/* Smart Converter */}
            <Reveal delay={400} className="group flex flex-col md:flex-row-reverse bg-slate-900/50 border border-slate-700/30 rounded-[2.5rem] overflow-hidden hover:border-emerald-500/50 transition-all duration-500">
              <div className="md:w-1/2 p-10 flex flex-col justify-center">
                <div className="w-12 h-12 bg-emerald-500/20 rounded-2xl flex items-center justify-center mb-6">
                  <Settings className="text-emerald-400 animate-spin-slow" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">Smart Converter</h3>
                <p className="text-slate-400 leading-relaxed">Convert videos to MP4, AVI, WebM or any format that fits your device. High-speed encoding guaranteed.</p>
              </div>
              <div className="md:w-1/2 bg-slate-800/30 relative flex items-center justify-center min-h-[250px]">
                <div className="flex gap-4 items-center">
                  <div className="p-4 bg-slate-700 rounded-xl text-xs font-mono text-slate-400">VIDEO.MOV</div>
                  <div className="text-emerald-400 animate-pulse">➔</div>
                  <div className="p-4 bg-emerald-500/20 border border-emerald-500/50 rounded-xl text-xs font-mono text-emerald-400 font-bold">VIDEO.MP4</div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>


      {/* --- SECTION 4: HOW TO INSTALL --- */}
      <div className="h-px w-full bg-slate-200" />
      <section id="install-guide" className="py-12 md:py-24 relative overflow-hidden bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <Reveal className="text-center mb-16 sm:mb-20 px-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6 tracking-tight text-slate-900">How to <span className="text-orange-600">Install?</span></h2>
            <p className="text-orange-600 font-semibold text-base sm:text-lg max-w-2xl mx-auto bg-orange-100/50 py-2 px-4 rounded-full border border-orange-200 inline-block">
              (Even if you're not a techie!)
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Step 1 */}
            <Reveal delay={0} className="relative flex flex-col">
              <div className="text-6xl font-black text-slate-200 absolute -top-8 -left-4 -z-0">01</div>
              <div className="bg-white p-6 rounded-[2.5rem] border border-slate-200 shadow-xl mb-6 relative overflow-hidden group">
                <div className="p-4 flex flex-col items-center justify-center h-48 bg-slate-50 text-slate-900 relative rounded-2xl border border-slate-100">
                  <div className="bg-white p-4 rounded-xl shadow-lg border w-full text-center">
                    <h4 className="font-bold text-sm mb-2 text-slate-900 line-clamp-1">AIO-YTDER.apk</h4>
                    <div className="bg-orange-600 text-white w-full py-2 rounded-lg font-bold text-xs flex justify-center items-center gap-2">
                      Download File
                    </div>
                  </div>
                  <div className="absolute -bottom-2 right-4 text-orange-500 font-bold flex flex-col items-center animate-bounce">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M19 12l-7 7-7-7" /></svg>
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">1. Download APK</h3>
              <p className="text-slate-500 text-sm">Tap the big orange button. It's 100% safe and virus-scanned.</p>
            </Reveal>

            {/* Step 2 */}
            <Reveal delay={100} className="relative flex flex-col">
              <div className="text-6xl font-black text-slate-200 absolute -top-8 -left-4 -z-0">02</div>
              <div className="bg-white p-6 rounded-[2.5rem] border border-slate-200 shadow-xl mb-6 relative overflow-hidden group">
                <div className="p-4 flex flex-col justify-center h-48 bg-slate-900 text-white relative rounded-2xl shadow-inner">
                  <div className="text-[10px] uppercase font-black text-slate-500 mb-2">Security Setting</div>
                  <div className="bg-slate-800 p-3 rounded-xl border border-slate-700">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold">Allow Unknown Apps</span>
                      <div className="w-8 h-4 bg-orange-500 rounded-full flex items-center p-0.5 justify-end">
                        <div className="w-3 h-3 bg-white rounded-full shadow-sm"></div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 animate-pulse">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">2. Enable Sources</h3>
              <p className="text-slate-500 text-sm">Your phone might ask. Tap 'Settings' and toggle 'Allow from this source'.</p>
            </Reveal>

            {/* Step 3 */}
            <Reveal delay={200} className="relative flex flex-col">
              <div className="text-6xl font-black text-slate-200 absolute -top-8 -left-4 -z-0">03</div>
              <div className="bg-white p-6 rounded-[2.5rem] border border-slate-200 shadow-xl mb-6 relative overflow-hidden group">
                <div className="p-4 flex flex-col justify-center h-48 bg-slate-50 text-slate-900 relative rounded-2xl border border-slate-100">
                  <div className="bg-white p-4 rounded-xl shadow-lg border w-full">
                    <div className="flex items-center gap-3 border-b border-slate-100 pb-2 mb-2">
                      <div className="w-6 h-6 bg-orange-600 rounded flex items-center justify-center text-white text-[10px]">AIO</div>
                      <span className="font-bold text-xs">YTDER</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <div className="flex-1 py-1 text-[10px] font-bold text-slate-400 text-center">CANCEL</div>
                      <div className="flex-1 py-1 text-[10px] font-bold text-orange-600 text-center">INSTALL</div>
                    </div>
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">3. Tap Install</h3>
              <p className="text-slate-500 text-sm">Tap 'Install'. It takes just 5 seconds to get everything set up.</p>
            </Reveal>

            {/* Step 4 */}
            <Reveal delay={300} className="relative flex flex-col">
              <div className="text-6xl font-black text-slate-200 absolute -top-8 -left-4 -z-0">04</div>
              <div className="bg-white p-6 rounded-[2.5rem] border border-slate-200 shadow-xl mb-6 relative overflow-hidden group">
                <div className="p-4 flex flex-col items-center justify-center h-48 bg-slate-50 text-slate-900 relative rounded-2xl border border-slate-100">
                  <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center mb-4 shadow-lg shadow-emerald-100">
                    <CheckCircle2 size={24} className="text-white" />
                  </div>
                  <h4 className="font-black text-lg text-emerald-600">App Ready!</h4>
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">4. Ready to Go!</h3>
              <p className="text-slate-500 text-sm">Launch AIO-YTDER from your app drawer and start downloading unlimitedly.</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* --- SECTION 5: TESTIMONIALS --- */}
      <div className="h-px w-full bg-slate-200" />
      <section className="py-12 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal className="text-center mb-16 px-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 tracking-tight text-slate-900">Loved by Millions Across India</h2>
            <div className="flex justify-center gap-1 text-amber-400 mb-4">
              <Star fill="currentColor" /> <Star fill="currentColor" /> <Star fill="currentColor" /> <Star fill="currentColor" /> <Star fill="currentColor" />
            </div>
            <p className="text-slate-500 font-medium">4.8/5 Average Rating from our global users</p>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Rajesh", loc: "Mumbai", text: "Finally a downloader that actually works. The speed is insane! Mere phone me kabhi buffer nahi karta ab.", color: "bg-orange-500" },
              { name: "Priya", loc: "Delhi", text: "The quality is amazing. Best app for saving reels and status videos without any watermark. Made in India rocks!", color: "bg-fuchsia-500" },
              { name: "Anita", loc: "Bengaluru", text: "Super easy to install. I'm not good with tech, but the guide was perfect. Thank you for keeping it free!", color: "bg-blue-500" }
            ].map((review, idx) => (
              <Reveal key={idx} delay={idx * 150}>
                <div className="bg-slate-50 p-8 rounded-3xl relative border border-slate-100 hover:shadow-xl transition-all">
                  <div className="flex text-amber-400 mb-4 gap-1">
                    {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                  </div>
                  <p className="text-lg text-slate-700 italic mb-6 leading-relaxed">"{review.text}"</p>
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full ${review.color} flex items-center justify-center text-white font-bold text-xl`}>
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">{review.name}</div>
                      <div className="text-sm text-slate-500">{review.loc}</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION 6: FINAL CTA & FOOTER --- */}
      <div className="h-px w-full bg-slate-200" />
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
                className="relative block px-8 py-4 sm:px-10 sm:py-5 bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 rounded-full font-bold text-base sm:text-xl md:text-2xl text-white shadow-xl shadow-orange-200 hover:shadow-2xl hover:shadow-orange-300 transition-all duration-300 hover:scale-105 active:scale-95 hover:-translate-y-1 overflow-hidden border border-white/10 group"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
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

              <div className="flex flex-wrap justify-center items-center gap-10">
                <img src="https://upload.wikimedia.org/wikipedia/commons/c/cf/McAfee_logo.svg?width=320" alt="McAfee" className="h-6 md:h-7 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-default" width="120" height="28" loading="lazy" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b0/Logo_NortonLifeLock.svg?width=320" alt="Norton" className="h-6 md:h-7 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-default" width="120" height="28" loading="lazy" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Trustpilot_Logo_%282022%29.svg?width=320" alt="Trustpilot" className="h-6 md:h-7 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-default" width="120" height="28" loading="lazy" />
              </div>
            </div>
          </Reveal>
        </div>

        <div className="h-px w-full bg-slate-200/60" />
        <div className="bg-slate-50 relative z-10">
          <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="w-9 h-9 rounded-xl overflow-hidden shadow-lg shadow-orange-100 group-hover:scale-110 transition-transform">
                <img src="/playstore-logo.webp" alt="AIO-YTDER" className="w-full h-full object-cover" />
              </div>
              <span className="text-xl font-black text-slate-900 tracking-tighter">
                AIO<span className="text-orange-600">-</span>YTDER
              </span>
            </div>

            <div className="flex gap-6 text-sm text-slate-500 font-medium">
              <a href="#" className="hover:text-orange-600 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-orange-600 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-orange-600 transition-colors">Contact Us</a>
            </div>

            <div className="text-slate-500 text-sm flex items-center gap-1">
              © 2026 AIO-YTDER. Made with <span className="text-red-500 text-lg animate-pulse">❤️</span> in India.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
