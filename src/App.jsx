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
  Github
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
  const colors = type === 'gold'
    ? 'from-amber-400 via-yellow-200 to-amber-500 text-amber-900 border-amber-300'
    : 'from-emerald-500 via-emerald-300 to-emerald-600 text-white border-emerald-400';

  return (
    <div className={`relative overflow-hidden flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm shadow-lg border ${colors} bg-gradient-to-r`}>
      <Icon size={16} className={type === 'gold' ? 'text-amber-900' : 'text-white'} />
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
        ctx.fillStyle = 'rgba(148, 163, 184, 0.3)';
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
            ctx.strokeStyle = `rgba(148, 163, 184, ${0.15 * (1 - distance / connectionDistance)})`;
            ctx.lineWidth = 1;
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

  return (
    <div className="min-h-screen bg-slate-900 text-slate-50 selection:bg-fuchsia-500 selection:text-white overflow-x-hidden relative">
      {/* --- PREMIUM BACKGROUND SYSTEM --- */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Animated Mesh Blobs */}
        <div className="hidden md:block absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px] animate-blob"></div>
        <div className="hidden md:block absolute top-[20%] right-[-10%] w-[35%] h-[35%] bg-cyan-600/15 rounded-full blur-[120px] animate-blob" style={{ animationDelay: '2s' }}></div>
        <div className="hidden md:block absolute bottom-[10%] left-[10%] w-[30%] h-[30%] bg-blue-600/20 rounded-full blur-[120px] animate-blob" style={{ animationDelay: '4s' }}></div>

        {/* Pattern Overlays */}
        <div className="absolute inset-0 bg-grid-slate-800 opacity-30"></div>
        <div className="absolute inset-0 noise mix-blend-normal md:mix-blend-overlay"></div>

        {/* Subtle Vignette for depth, much lighter now */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(15,23,42,0.4)_100%)] hidden md:block"></div>
      </div>

      <SpiderWeb />

      {/* --- PREMIUM NAVBAR --- */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-slate-900/95 md:bg-slate-900/50 backdrop-blur-none md:backdrop-blur-xl border-b border-white/5 py-4">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-fuchsia-500 to-cyan-500 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <img src="/playstore-logo.webp" alt="AIO-YTDER" className="relative w-10 h-10 rounded-lg shadow-2xl" width="40" height="40" />
            </div>
            <span className="text-xl sm:text-2xl md:text-3xl font-black tracking-tighter flex items-center group perspective-1000">
              <span className="text-white text-3d transform transition-transform duration-500 group-hover:translate-z-10 group-hover:rotate-y-10">AIO-</span>
              <span className="relative">
                <span className="absolute -inset-2 bg-cyan-500/10 blur-2xl opacity-0 group-hover:opacity-60 transition-opacity animate-pulse"></span>
                <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-fuchsia-500 bg-[length:200%_auto] animate-[gradient_4s_linear_infinite] text-glow-cyan transition-all duration-500 group-hover:scale-110 inline-block">
                  YTDER
                </span>
              </span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/shibaFoss/AIO-Video-Downloader"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-3 py-1.5 bg-slate-800/40 hover:bg-slate-800 border border-slate-700/50 rounded-full transition-all duration-300 shadow-lg"
              title="View on GitHub"
            >
              <Github size={18} className="text-slate-400 group-hover:text-white transition-colors" />
              {stars > 0 && (
                <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 group-hover:text-amber-400 transition-colors">
                  <Star size={10} fill="currentColor" className="text-amber-500" />
                  <span>{stars.toLocaleString()}</span>
                </div>
              )}
            </a>

            <a
              href={versionData.latest_apk_url}
              className="hidden md:flex items-center gap-2 px-6 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full font-bold text-sm transition-all duration-300 active:scale-95"
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
        body { font-family: 'Ubuntu', sans-serif; }
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
      `}} />

      {/* --- SECTION 1: HERO --- */}
      <section className="relative pt-24 pb-32 lg:pt-36 lg:pb-40 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 mix-blend-overlay"></div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center justify-center text-center">

            {/* Top: Copy & CTA */}
            <div className="max-w-4xl">
              <Reveal delay={50}>
                <img src="/playstore-logo.webp" alt="AIO-YTDER Icon" className="w-24 h-24 mx-auto mb-8 shadow-2xl rounded-[2rem] border-2 border-white/10" width="96" height="96" />
              </Reveal>
              <Reveal delay={100}>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/20 mb-6 group hover:bg-fuchsia-500/20 transition-colors mx-auto">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-fuchsia-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-fuchsia-500"></span>
                  </span>
                  <span className="text-xs font-bold text-fuchsia-400 uppercase tracking-wider">v{versionData.latest_version} is Live!</span>
                </div>
              </Reveal>

              <Reveal delay={200}>
                <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black text-white mb-6 leading-[1.1] tracking-tight px-4 sm:px-0">
                  Download <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-purple-600 drop-shadow-[0_0_15px_rgba(192,38,211,0.3)]">Anything.</span><br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-200 via-white to-slate-400 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] animate-pulse-soft">Anywhere.</span>
                </h1>
              </Reveal>

              <Reveal delay={300}>
                <p className="text-base sm:text-lg lg:text-xl text-indigo-100 mb-6 sm:mb-10 max-w-2xl mx-auto leading-relaxed px-2 sm:px-0">
                  The #1 premium alternative to Snaptube and Vidmate. Download any video from any website in HD quality. Trusted by over <strong className="text-white">5 Lakh+</strong> users.
                </p>
              </Reveal>

              <Reveal delay={400} className="flex flex-col sm:flex-row items-center gap-4 justify-center">
                <div className="relative group">
                  <div className="absolute -top-3 -right-3 z-30 bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg border border-emerald-400 animate-pulse">
                    v{versionData.latest_version}
                  </div>
                  <a
                    href={versionData.latest_apk_url}
                    className="relative block w-full sm:w-auto px-10 py-4 sm:px-12 sm:py-5 bg-gradient-to-r from-fuchsia-600 via-purple-600 to-indigo-600 rounded-full font-bold text-lg sm:text-xl text-white shadow-[0_0_40px_rgba(192,38,211,0.4)] hover:shadow-[0_0_60px_rgba(192,38,211,0.6)] transition-all duration-300 hover:scale-105 active:scale-95 hover:-translate-y-1 overflow-hidden border border-white/10 group text-center"
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
                  className="w-full sm:w-auto px-10 py-5 rounded-full font-semibold text-xl text-white border border-white/20 hover:bg-white/10 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 group"
                >
                  How to Install? <ChevronDown size={24} className="group-hover:translate-y-1 transition-transform" />
                </button>
              </Reveal>

              <Reveal delay={500} className="mt-12 flex flex-wrap justify-center gap-6">
                <ShimmerBadge icon={ShieldCheck} text="🇮🇳 Made in India" type="emerald" />
                <ShimmerBadge icon={Award} text="India's No. 1 App 2026" type="gold" />
                <div className="flex items-center gap-2 text-slate-400 font-medium">
                  <Star className="text-amber-400" size={18} fill="currentColor" />
                  <span className="text-white">4.9/5</span> Rating
                </div>
              </Reveal>
            </div>

            {/* Bottom: 3D Triple Gallery (The "Better Idea") */}
            <div className="mt-24 lg:mt-32 w-full max-w-6xl">
              <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-0 relative">

                {/* 1. Left Feature: Smart Browser */}
                <Reveal delay={300} className="lg:w-1/3 order-2 lg:order-1 lg:-mr-12 hidden lg:block">
                  <div className="relative group animate-perspective-left">
                    <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur-2xl rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl transition-transform duration-500 group-hover:scale-105">
                      <img src="/hero-browser.webp" alt="Smart In-App Browser" className="w-full h-auto" width="640" height="640" loading="lazy" />
                      <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-transparent pointer-events-none"></div>
                    </div>
                    <div className="mt-8 text-center bg-slate-800/40 backdrop-blur-md p-4 rounded-2xl border border-white/5 opacity-0 lg:group-hover:opacity-100 transition-opacity">
                      <h4 className="text-lg font-bold text-white mb-1">Smart Browser</h4>
                      <p className="text-xs text-slate-400">Auto-detect any video on any site.</p>
                    </div>
                  </div>
                </Reveal>

                {/* 2. Center: Main Experience (Download UI) */}
                <Reveal delay={500} className="hidden lg:block lg:w-2/5 z-20 order-1 lg:order-2 scale-95 sm:scale-110 lg:scale-[1.2]">
                  <div className="relative group animate-float">
                    <div className="hidden md:block absolute -inset-4 bg-gradient-to-r from-fuchsia-500/30 to-purple-500/30 blur-xl md:blur-3xl rounded-[3rem] opacity-40 md:opacity-70 animate-pulse"></div>
                    <div className="relative md:rounded-[3rem] md:overflow-hidden border-none md:border-4 md:border-white/20 shadow-none md:shadow-[0_0_80px_rgba(192,38,211,0.4)] transition-transform duration-700">
                      <img src="/hero-mockup-blended.webp" alt="High-Speed Downloading" className="w-full h-auto" width="640" height="640" loading="lazy" />
                      <div className="hidden md:block absolute inset-0 bg-gradient-to-t from-fuchsia-500/10 via-transparent to-white/5 pointer-events-none"></div>
                    </div>
                    {/* Floating Hero Badges */}
                    <div className="absolute -top-6 -right-2 lg:-top-10 lg:-right-10 w-20 h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-fuchsia-600 to-indigo-700 rounded-full flex flex-col items-center justify-center shadow-2xl border-2 border-white/20 animate-float invisible lg:visible" style={{ animationDelay: '1s' }}>
                      <span className="text-[10px] font-black uppercase text-white/70 tracking-tighter">Ultra</span>
                      <span className="text-lg lg:text-xl font-black text-white">4K</span>
                    </div>
                  </div>
                </Reveal>

                {/* 3. Right Feature: Advanced Manager */}
                <Reveal delay={700} className="lg:w-1/3 order-3 lg:-ml-12 hidden lg:block">
                  <div className="relative group animate-perspective-right">
                    <div className="absolute -inset-2 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 blur-2xl rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl transition-transform duration-500 group-hover:scale-105">
                      <img src="/hero-downloads.webp" alt="Advanced Multi-threaded Download Manager" className="w-full h-auto" width="640" height="640" loading="lazy" />
                      <div className="absolute inset-0 bg-gradient-to-tl from-purple-500/10 to-transparent pointer-events-none"></div>
                    </div>
                    <div className="mt-8 text-center bg-slate-800/40 backdrop-blur-md p-4 rounded-2xl border border-white/5 opacity-0 lg:group-hover:opacity-100 transition-opacity">
                      <h4 className="text-lg font-bold text-white mb-1">Downloader v2</h4>
                      <p className="text-xs text-slate-400">10x Speed with multi-threading.</p>
                    </div>
                  </div>
                </Reveal>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- SECTION 1.5: SUPPORTED PLATFORMS --- */}
      <div className="premium-divider" />
      <section className="py-12 bg-slate-900/90 md:bg-slate-900/40 backdrop-blur-none md:backdrop-blur-md relative z-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal>
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12 text-center lg:text-left">
              <div className="flex-shrink-0">
                <h2 className="text-2xl sm:text-3xl font-black text-white mb-2 tracking-tight">Support for <span className="text-cyan-400">Everything</span></h2>
                <p className="text-slate-400 font-medium text-sm sm:text-base">Download from these platforms & 1000+ others.</p>
              </div>

              <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                {[
                  { icon: Instagram, color: "text-pink-500", label: "Instagram" },
                  { icon: Facebook, color: "text-blue-600", label: "Facebook" },
                  { icon: Youtube, color: "text-red-600", label: "YouTube" },
                  { icon: Twitter, color: "text-sky-400", label: "X / Twitter" },
                  { icon: Music, color: "text-emerald-400", label: "TikTok / Music" },
                  { icon: PlayCircle, color: "text-orange-500", label: "Movies / OTT" },
                  { icon: Globe, color: "text-indigo-400", label: "All Websites" }
                ].map((site, idx) => (
                  <div key={idx} className="group relative flex flex-col items-center">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-slate-800/80 border border-slate-700/50 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:border-slate-500 group-hover:bg-slate-800 relative overflow-hidden shadow-lg shadow-black/20">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <site.icon size={32} className={`transition-all duration-500 transform group-hover:scale-110 ${site.color}`} />
                    </div>
                    <span className="mt-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 group-hover:text-slate-200 transition-colors duration-300">{site.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="premium-divider-glow" />
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-slate-900"></div>
        <div className="absolute inset-0 bg-glow-soft opacity-60"></div>
        <div className="absolute inset-0 bg-circuit animate-pulse-soft"></div>
        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
          <Reveal>
            <div className="bg-slate-900/95 md:bg-slate-900/80 backdrop-blur-none md:backdrop-blur-md border border-slate-700 p-6 sm:p-12 rounded-3xl shadow-2xl">
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-black mb-8 leading-[1.1] tracking-tighter">
                <span className="text-slate-300">Millions trust </span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-purple-600 bg-[length:200%_auto] animate-[gradient_4s_linear_infinite]">
                  AIO-YTDER
                </span>
                <span className="text-base sm:text-lg md:text-xl font-medium text-slate-400 tracking-normal block mt-4 max-w-2xl mx-auto px-2 sm:px-0">
                  The ultimate downloading powerhouse for your everyday digital life.
                </span>
              </h2>

              <div className="py-8" ref={counterRef}>
                <div className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400 tracking-tighter drop-shadow-sm">
                  {count.toLocaleString()}
                </div>
                <div className="text-cyan-400 font-bold mt-2 uppercase tracking-widest text-sm animate-pulse">
                  Downloads & Counting... growing every second!
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

      <div className="premium-divider" />
      <section className="py-24 bg-slate-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal className="text-center mb-16 px-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 tracking-tight">Why AIO-YTDER is the <span className="text-fuchsia-400">King</span></h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-base sm:text-lg">We didn't just build another downloader. We built the fastest, safest, and most powerful tool for Android.</p>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Rocket, title: "Ultra-Fast Speed", desc: "Download full-length movies in seconds with advanced multi-threading technology.", color: "text-blue-400", bg: "bg-blue-400/10" },
              { icon: MonitorPlay, title: "HD & 4K Quality", desc: "Choose your resolution: 144p to save data, or stunning 1080p and 4K for the big screen.", color: "text-purple-400", bg: "bg-purple-400/10" },
              { icon: Globe, title: "In-App Browser", desc: "Browse your favorite sites and download with a single tap, without ever leaving the app.", color: "text-cyan-400", bg: "bg-cyan-400/10" },
              { icon: IndianRupee, title: "100% Free", desc: "Bilkul Free! No hidden subscriptions. No credit cards. Premium features for everyone.", color: "text-emerald-400", bg: "bg-emerald-400/10" }
            ].map((feature, idx) => (
              <Reveal key={idx} delay={idx * 100}>
                <div className="bg-slate-800/50 border border-slate-700/50 p-8 rounded-3xl hover:bg-slate-800 transition-colors h-full group">
                  <div className={`w-14 h-14 rounded-2xl ${feature.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className={`w-7 h-7 ${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION 3.5: PRO FEATURES (ANIMATED) --- */}
      <div className="premium-divider-glow" />
      <section className="py-24 relative overflow-hidden">
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
      <div className="premium-divider" />
      <section id="install-guide" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-slate-900"></div>
        <div className="absolute inset-0 bg-glow-soft opacity-60"></div>
        <div className="absolute inset-0 bg-circuit animate-pulse-soft"></div>

        {/* Background glow */}
        <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[500px] bg-purple-900/20 blur-[150px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <Reveal className="text-center mb-16 px-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 tracking-tight">Install in Minutes</h2>
            <p className="text-cyan-400 font-semibold text-base sm:text-lg max-w-2xl mx-auto bg-cyan-900/30 py-2 px-4 rounded-full border border-cyan-800/50 inline-block">
              (Even if you're not a techie!)
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Step 1 */}
            <Reveal delay={0} className="relative flex flex-col">
              <div className="text-6xl font-black text-slate-700 absolute -top-8 -left-4 -z-10">01</div>
              <PhoneMockup className="!w-full !h-[350px] mb-6 rounded-[2rem] border-[6px]">
                <div className="p-4 flex flex-col items-center justify-center h-full bg-slate-100 text-slate-900 relative">
                  <div className="bg-white p-6 rounded-2xl shadow-xl border w-full text-center">
                    <h4 className="font-bold text-lg mb-4">AIO-YTDER.apk</h4>
                    <button className="bg-purple-600 text-white w-full py-3 rounded-xl font-bold flex justify-center items-center gap-2">
                      <Download size={18} /> Download File
                    </button>
                  </div>
                  {/* Annotation */}
                  <div className="absolute bottom-16 right-8 text-red-500 font-bold flex flex-col items-center animate-bounce">
                    <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded shadow mb-1 border border-red-200">Tap Here</span>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M19 12l-7 7-7-7" /></svg>
                  </div>
                </div>
              </PhoneMockup>
              <h3 className="text-xl font-bold text-white mb-2">1. Download the APK</h3>
              <p className="text-slate-400 text-sm">Tap the big purple button above. Don't worry, it's 100% safe and virus-scanned.</p>
            </Reveal>

            {/* Step 2 */}
            <Reveal delay={100} className="relative flex flex-col">
              <div className="text-6xl font-black text-slate-700 absolute -top-8 -left-4 -z-10">02</div>
              <PhoneMockup className="!w-full !h-[350px] mb-6 rounded-[2rem] border-[6px]">
                <div className="p-4 flex flex-col h-full bg-slate-900 text-white relative">
                  <div className="mt-8">
                    <div className="flex items-center gap-3 mb-6">
                      <AlertTriangle className="text-yellow-500" />
                      <span className="font-bold text-lg">Chrome Settings</span>
                    </div>
                    <div className="bg-slate-800 p-4 rounded-xl relative">
                      <div className="flex justify-between items-center relative z-10">
                        <span className="text-sm">Allow from this source</span>
                        <div className="w-10 h-6 bg-blue-500 rounded-full flex items-center p-1 justify-end">
                          <div className="w-4 h-4 bg-white rounded-full"></div>
                        </div>
                      </div>
                      {/* Red Annotation Circle */}
                      <div className="absolute inset-0 border-2 border-red-500 rounded-xl z-0 scale-105 animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </PhoneMockup>
              <h3 className="text-xl font-bold text-white mb-2">2. Allow Unknown Apps</h3>
              <p className="text-slate-400 text-sm">Your phone might be cautious. Tap 'Settings' and toggle 'Allow from this source'.</p>
            </Reveal>

            {/* Step 3 */}
            <Reveal delay={200} className="relative flex flex-col">
              <div className="text-6xl font-black text-slate-700 absolute -top-8 -left-4 -z-10">03</div>
              <PhoneMockup className="!w-full !h-[350px] mb-6 rounded-[2rem] border-[6px]">
                <div className="p-4 flex flex-col justify-end h-full bg-slate-100 relative">
                  <div className="bg-white p-4 rounded-t-2xl shadow-[0_-10px_20px_rgba(0,0,0,0.1)] -mx-4 -mb-4 border-t">
                    <div className="flex items-center gap-4 mb-6">
                      <img src="/logo.webp" alt="AIO-YTDER Logo" className="w-12 h-12 rounded-xl" width="48" height="48" loading="lazy" />
                      <div>
                        <div className="font-bold text-slate-900">AIO-YTDER</div>
                        <div className="text-xs text-emerald-600 font-semibold flex items-center gap-1"><CheckCircle2 size={12} /> App Installed</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="flex-1 py-2 text-purple-600 font-semibold">Done</button>
                      <button className="flex-1 py-2 bg-purple-600 text-white rounded-lg font-bold shadow-md shadow-purple-600/30 relative">
                        Open
                        <div className="absolute -inset-1 border-2 border-red-500 rounded-xl animate-pulse"></div>
                      </button>
                    </div>
                  </div>
                </div>
              </PhoneMockup>
              <h3 className="text-xl font-bold text-white mb-2">3. Install & Open</h3>
              <p className="text-slate-400 text-sm">Tap 'Install'. It takes just 5 seconds. Once done, tap 'Open' to launch the app!</p>
            </Reveal>

            {/* Step 4 */}
            <Reveal delay={300} className="relative flex flex-col">
              <div className="text-6xl font-black text-slate-700 absolute -top-8 -left-4 -z-10">04</div>
              <PhoneMockup className="!w-full !h-[350px] mb-6 rounded-[2rem] border-[6px]">
                <div className="p-4 flex flex-col h-full bg-slate-900 relative">
                  <div className="mt-8 text-center">
                    <img src="/logo.webp" alt="AIO-YTDER Logo" className="w-16 h-16 rounded-2xl mx-auto mb-4" width="64" height="64" loading="lazy" />
                    <h4 className="font-bold text-white mb-6">Welcome to AIO-YTDER</h4>
                    <div className="bg-slate-800 p-3 rounded-lg flex items-center justify-between border border-dashed border-slate-600 relative">
                      <span className="text-slate-400 text-sm">Paste copied link...</span>
                      <button className="bg-white text-slate-900 px-3 py-1 rounded font-bold text-sm">Paste</button>
                      {/* Red Pointer */}
                      <div className="absolute -right-2 -bottom-6 text-red-500 flex flex-col items-center animate-bounce z-10">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
                      </div>
                    </div>
                  </div>
                </div>
              </PhoneMockup>
              <h3 className="text-xl font-bold text-white mb-2">4. Start Downloading</h3>
              <p className="text-slate-400 text-sm">Copy any video link from Instagram/FB/YT, paste it here, and hit download. Welcome to the club!</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* --- SECTION 5: TESTIMONIALS --- */}
      <div className="premium-divider-glow" />
      <section className="py-24 bg-slate-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal className="text-center mb-16 px-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 tracking-tight">Loved by Millions Across India</h2>
            <div className="flex justify-center gap-1 text-amber-400 mb-4">
              <Star fill="currentColor" /> <Star fill="currentColor" /> <Star fill="currentColor" /> <Star fill="currentColor" /> <Star fill="currentColor" />
            </div>
            <p className="text-slate-400 text-sm sm:text-base">4.8/5 Average Rating from our users</p>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Rajesh", loc: "Mumbai", text: "Finally a downloader that actually works for all apps. The speed is insane! Mere phone me kabhi buffer nahi karta ab.", color: "bg-orange-500" },
              { name: "Priya", loc: "Delhi", text: "The 'Made in India' badge caught my attention, but the quality kept me here. Best app for saving reels and status videos.", color: "bg-purple-500" },
              { name: "Anita", loc: "Bengaluru", text: "Super easy to install. I'm not good with tech, but the step-by-step guide was perfect. Thank you for keeping it 100% free!", color: "bg-blue-500" }
            ].map((review, idx) => (
              <Reveal key={idx} delay={idx * 150}>
                <div className="bg-slate-800 p-8 rounded-3xl relative">
                  <div className="flex text-amber-400 mb-4 gap-1">
                    {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                  </div>
                  <p className="text-lg text-slate-300 italic mb-6">"{review.text}"</p>
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full ${review.color} flex items-center justify-center text-white font-bold text-xl`}>
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-white">{review.name}</div>
                      <div className="text-sm text-slate-400">{review.loc}</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION 6: FINAL CTA & FOOTER --- */}
      <div className="premium-divider" />
      <footer className="relative bg-gradient-to-t from-slate-900 to-slate-800 pt-24">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 mix-blend-overlay"></div>

        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center mb-24">
          <Reveal className="px-4">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 mb-8 leading-[1.2]">
              Ready to download anything?
            </h2>
            <div className="relative group inline-block w-full md:w-auto">
              <div className="absolute -top-3 -right-3 z-30 bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg border border-emerald-400 animate-pulse">
                v{versionData.latest_version}
              </div>
              <a
                href={versionData.latest_apk_url}
                className="relative block px-8 py-4 sm:px-10 sm:py-5 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-full font-bold text-base sm:text-xl md:text-2xl shadow-[0_0_50px_rgba(79,70,229,0.3)] hover:shadow-[0_0_80px_rgba(79,70,229,0.7)] transition-all duration-300 hover:scale-105 active:scale-95 hover:-translate-y-1 overflow-hidden border border-white/10"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
                {/* Interactive Shimmer */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"></div>
                <span className="relative flex items-center justify-center gap-3 drop-shadow-md">
                  <Download size={28} className="animate-bounce" />
                  Download APK Now (Free)
                </span>
              </a>
            </div>
            <div className="mt-8 flex flex-col items-center gap-6">
              <p className="text-slate-400 font-medium flex items-center justify-center gap-2">
                <ShieldCheck size={18} className="text-emerald-400" /> 100% Safe, Secure & Free
              </p>

              <div className="flex flex-wrap justify-center items-center gap-10">
                <img src="https://upload.wikimedia.org/wikipedia/commons/c/cf/McAfee_logo.svg?width=320" alt="McAfee" className="h-6 md:h-7 brightness-0 invert opacity-40 hover:opacity-80 transition-all duration-500 cursor-default" width="120" height="28" loading="lazy" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b0/Logo_NortonLifeLock.svg?width=320" alt="Norton" className="h-6 md:h-7 brightness-0 invert opacity-40 hover:opacity-80 transition-all duration-500 cursor-default" width="120" height="28" loading="lazy" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Trustpilot_Logo_%282022%29.svg?width=320" alt="Trustpilot" className="h-6 md:h-7 brightness-0 invert opacity-40 hover:opacity-80 transition-all duration-500 cursor-default" width="120" height="28" loading="lazy" />
                <div className="flex items-center gap-2 text-white font-bold text-xs border border-white/20 px-3 py-1.5 rounded-lg bg-white/5 backdrop-blur-sm opacity-40 hover:opacity-80 hover:bg-white/10 transition-all duration-500 cursor-default">
                  <ShieldCheck size={16} className="text-cyan-400" />
                  SSL SECURE
                </div>
              </div>
            </div>

          </Reveal>
        </div>

        <div className="premium-divider mt-8 opacity-50" />
        <div className="bg-slate-900 relative z-10">
          <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3 text-slate-300 font-bold text-xl">
              <img src="/playstore-logo.webp" alt="AIO-YTDER Logo" className="w-10 h-10 rounded-xl" width="40" height="40" loading="lazy" />
              AIO-YTDER
            </div>

            <div className="flex gap-6 text-sm text-slate-500 font-medium">
              <a href="#" className="hover:text-cyan-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-cyan-400 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-cyan-400 transition-colors">Contact Us</a>
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
