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
  Image,
  Mail,
  ExternalLink,
  MessageSquare
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
      { threshold: 0.05, rootMargin: '0px 0px -50px 0px' }
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
      if (document.hidden) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }
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
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [versionData, setVersionData] = useState({
    latest_version: 'v2.5.0',
    latest_apk_url: '#',
  });

  const [showStickyCTA, setShowStickyCTA] = useState(false);

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

    // Sticky CTA Logic with Throttle
    let lastScrollY = 0;
    let ticking = false;

    const handleScrollEvent = () => {
      lastScrollY = window.scrollY;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (lastScrollY > 600) {
            setShowStickyCTA(true);
          } else {
            setShowStickyCTA(false);
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScrollEvent, { passive: true });
    return () => window.removeEventListener('scroll', handleScrollEvent);
  }, []);

  const scrollToInstall = () => {
    document.getElementById('install-guide').scrollIntoView({ behavior: 'smooth' });
  };

  const handleScroll = (e, setter) => {
    const container = e.target;
    if (container.ticking) return;

    window.requestAnimationFrame(() => {
      const scrollLeft = container.scrollLeft;
      const firstChild = container.children[0];
      if (firstChild) {
        const itemWidth = firstChild.offsetWidth + 16; // item width + gap
        const index = Math.round(scrollLeft / itemWidth);
        setter(index);
      }
      container.ticking = false;
    });
    container.ticking = true;
  };


  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-orange-500 selection:text-white overflow-x-hidden relative font-sans">
      {/* --- PREMIUM BACKGROUND SYSTEM --- */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Animated Mesh Blobs - Lightened for Light Mode */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-400/10 rounded-full blur-[120px] animate-blob pointer-events-none"></div>
        <div className="absolute top-[20%] right-[-10%] w-[35%] h-[35%] bg-fuchsia-400/10 rounded-full blur-[120px] animate-blob pointer-events-none" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-[10%] left-[10%] w-[30%] h-[30%] bg-blue-400/10 rounded-full blur-[120px] animate-blob pointer-events-none" style={{ animationDelay: '4s' }}></div>

        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-30 pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50/40 via-white to-fuchsia-50/40 pointer-events-none"></div>
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
                      {/* Reflection/Glow Effect */}
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

                      {/* Floating Badge */}
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
                  <div key={idx} className={`group relative flex flex-col items-center ${idx >= 6 ? 'md:hidden' : ''}`}>
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

      <div className="premium-divider-orange" />
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
            {[
              { icon: Rocket, title: "Ultra-Fast Speed", desc: "Download full-length movies in seconds with advanced multi-threading technology.", color: "text-blue-400", bg: "bg-blue-400/10" },
              { icon: MonitorPlay, title: "HD & 4K Quality", desc: "Choose your resolution: 144p to save data, or stunning 1080p and 4K for the big screen.", color: "text-purple-400", bg: "bg-purple-400/10" },
              { icon: Globe, title: "In-App Browser", desc: "Browse your favorite sites and download with a single tap, without ever leaving the app.", color: "text-cyan-400", bg: "bg-cyan-400/10" },
              { icon: IndianRupee, title: "100% Free", desc: "Bilkul Free! No hidden subscriptions. No credit cards. Premium features for everyone.", color: "text-emerald-400", bg: "bg-emerald-400/10" }
            ].map((feature, idx) => (
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
            {[
              { icon: Rocket, title: "Ultra Speed", desc: "Download full-length 4K HD movies in a few minutes.", color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-200" },
              { icon: MonitorPlay, title: "4K Quality", desc: "Play stunning 1080p and 4K resolution with built-in player.", color: "text-purple-600", bg: "bg-purple-50", border: "border-purple-200" },
              { icon: Globe, title: "Smart Browser", desc: "Browse and download online videos directly with a single tap.", color: "text-cyan-600", bg: "bg-cyan-50", border: "border-cyan-200" },
              { icon: IndianRupee, title: "100% Free", desc: "There is no hidden costs. No subscriptions. No hidden charges.", color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200" }
            ].map((feature, idx) => (
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

      <div className="premium-divider-orange" />
      {/* --- SECTION 4: HOW TO INSTALL --- */}
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

      <div className="premium-divider-orange" />
      {/* --- SECTION 5: TESTIMONIALS --- */}
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
            {[
              { name: "Rajesh", loc: "Mumbai", text: "Finally a downloader that actually works. The speed is insane! Mere phone me kabhi buffer nahi karta ab.", color: "bg-orange-500" },
              { name: "Priya", loc: "Delhi", text: "The quality is amazing. Best app for saving reels and status videos without any watermark. Made in India rocks!", color: "bg-fuchsia-500" },
              { name: "Anita", loc: "Bengaluru", text: "Super easy to install. I'm not good with tech, but the guide was perfect. Thank you for keeping it free!", color: "bg-blue-500" }
            ].map((review, idx) => (
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
                className="relative block px-8 py-4 sm:px-10 sm:py-5 bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 rounded-full font-bold text-base sm:text-xl md:text-2xl text-white shadow-xl shadow-orange-200 hover:shadow-2xl hover:shadow-orange-300 transition-all duration-300 hover:scale-105 active:scale-95 hover:-translate-y-1 overflow-hidden border border-white/10 group text-center"
              >
                <div className="absolute inset-x-0 top-0 h-1/2 bg-white/10 group-hover:bg-white/20 transition-colors"></div>
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

              <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10 px-4">
                <img src="https://upload.wikimedia.org/wikipedia/commons/c/cf/McAfee_logo.svg?width=320" alt="McAfee" className="h-5 md:h-7 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-default" width="120" height="28" loading="lazy" decoding="async" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b0/Logo_NortonLifeLock.svg?width=320" alt="Norton" className="h-5 md:h-7 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-default" width="120" height="28" loading="lazy" decoding="async" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Trustpilot_Logo_%282022%29.svg?width=320" alt="Trustpilot" className="h-5 md:h-7 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-default" width="120" height="28" loading="lazy" decoding="async" />
              </div>
            </div>
          </Reveal>
        </div>

        <div className="h-px w-full bg-slate-200/60" />
        <div className="bg-slate-50 relative z-10">
          <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4 border-b border-slate-200/50 mb-6">
            <div className="flex items-center gap-3 group cursor-pointer" onClick={() => { setShowPrivacy(false); window.scrollTo(0, 0); }}>
              <div className="w-8 h-8 rounded-lg overflow-hidden shadow-lg group-hover:scale-110 transition-transform">
                <img src="/playstore-logo.webp" alt="AIO-YTDER" className="w-full h-full object-cover" width="32" height="32" loading="lazy" decoding="async" />
              </div>
              <span className="text-xl font-black text-slate-900 tracking-tighter">
                AIO<span className="text-orange-600">-</span>YTDER
              </span>
            </div>

            <div className="flex gap-6 text-sm text-slate-500 font-medium">
              <button onClick={() => { setShowPrivacy(true); setShowTerms(false); setShowContact(false); window.scrollTo(0, 0); }} className="hover:text-orange-600 transition-colors">Privacy Policy</button>
              <button onClick={() => { setShowTerms(true); setShowPrivacy(false); setShowContact(false); window.scrollTo(0, 0); }} className="hover:text-orange-600 transition-colors">Terms of Service</button>
              <button onClick={() => { setShowContact(true); setShowPrivacy(false); setShowTerms(false); window.scrollTo(0, 0); }} className="hover:text-orange-600 transition-colors">Contact Us</button>
            </div>

            <div className="text-slate-500 text-sm flex items-center gap-1">
              © 2026 AIO-YTDER. Made with <span className="text-red-500 text-lg animate-pulse">❤️</span> in India.
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-6 pb-8">
            <p className="text-[10px] text-slate-400 max-w-3xl mx-auto text-center uppercase tracking-[0.15em] leading-relaxed opacity-60 font-medium">
              Disclaimer: AIO-YTDER is built as a utility tool and is not responsible for any copyrighted material downloaded by users. Users are sole responsible for their actions and complying with relevant terms of service of any third-party websites.
            </p>
          </div>
        </div>
      </footer>
      {/* --- PREMIUM MOBILE STICKY CTA --- */}
      <div className={`md:hidden fixed bottom-6 inset-x-6 z-[60] transition-all duration-700 ease-in-out transform 
        ${showStickyCTA ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-40 opacity-0 scale-95 pointer-events-none'}`}>

        {/* Backdrop Environmental Glow */}
        <div className="absolute inset-x-0 -bottom-4 h-16 bg-orange-500/30 blur-[40px] rounded-full -z-10 animate-pulse"></div>

        <a
          href={versionData.latest_apk_url}
          className="flex items-center justify-between p-2 pl-6 bg-gradient-to-r from-orange-600 to-orange-500 text-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(249,115,22,0.4)] border-t border-white/20 active:scale-95 transition-all overflow-hidden relative group"
        >
          {/* Animated High-Gloss Stripe */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-[45deg] translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-out"></div>

          <div className="flex flex-col text-left py-2">
            <div className="flex items-center gap-1.5 opacity-70 mb-1">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-40"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white"></span>
              </span>
              <span className="text-[10px] font-black uppercase tracking-[0.15em] leading-none">Official Release v{versionData.latest_version}</span>
            </div>
            <span className="text-xl font-black tracking-tighter leading-none italic">Download Now</span>
          </div>

          <div className="bg-white text-orange-600 p-4 rounded-[2rem] shadow-lg transform active:scale-90 transition-transform">
            <Download size={24} className="animate-bounce" />
          </div>
        </a>
      </div>
      {/* --- PRIVACY POLICY VIEW --- */}
      {showPrivacy && (
        <div className="fixed inset-0 z-[100] bg-white overflow-y-auto animate-in fade-in duration-500">
          <div className="max-w-4xl mx-auto px-6 py-20 relative">
            <button
              onClick={() => { setShowPrivacy(false); window.scrollTo(0, 0); }}
              className="fixed top-8 left-8 p-3 rounded-full bg-slate-100 hover:bg-orange-100 hover:text-orange-600 transition-all z-50 flex items-center gap-2 group"
            >
              <Rocket className="rotate-[270deg] group-hover:scale-110 transition-transform" size={20} />
              <span className="font-bold text-sm pr-2">Back to Home</span>
            </button>

            <div className="text-center mb-16">
              <div className="inline-block px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-xs font-bold mb-4 uppercase tracking-widest">Privacy Central</div>
              <h1 className="text-4xl sm:text-6xl font-black text-slate-900 mb-6 tracking-tight">Privacy <span className="text-orange-600">Policy</span></h1>
              <p className="text-slate-500 font-medium">Last Updated: March 29, 2026</p>
            </div>

            <div className="space-y-12">
              <div className="p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100">
                <h2 className="text-2xl font-black text-slate-900 mb-4 italic">1. Our Commitment</h2>
                <p className="text-slate-600 leading-relaxed font-medium">
                  AIO-YTDER is built as a privacy-first utility. We believe your downloads and browsing history are your business alone. The application is engineered to operate without collecting any personally identifiable information (PII).
                </p>
              </div>

              <div className="p-8 rounded-[2.5rem] bg-white border border-slate-200">
                <h2 className="text-2xl font-black text-slate-900 mb-4 italic">2. Data Collection</h2>
                <ul className="space-y-4 text-slate-600 font-medium">
                  <li className="flex gap-3"><span className="text-orange-500 font-bold">•</span> <b>No User Accounts:</b> We do not require any registration or account creation.</li>
                  <li className="flex gap-3"><span className="text-orange-500 font-bold">•</span> <b>No Tracking:</b> We do not track your location, contacts, or device identifiers.</li>
                  <li className="flex gap-3"><span className="text-orange-500 font-bold">•</span> <b>No Logs:</b> Your download history is stored locally on your device and is never uploaded to our servers.</li>
                </ul>
              </div>

              <div className="p-8 rounded-[2.5rem] bg-orange-50/30 border border-orange-100">
                <h2 className="text-2xl font-black text-slate-900 mb-4 italic">3. Permissions</h2>
                <p className="text-slate-600 leading-relaxed font-medium mb-4">
                  The app requests only the minimum permissions required to function:
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-2xl border border-orange-100 shadow-sm">
                    <div className="font-black text-orange-600 text-xs mb-1">STORAGE</div>
                    <div className="text-sm text-slate-500">To save the downloaded videos and audios to your gallery.</div>
                  </div>
                  <div className="bg-white p-4 rounded-2xl border border-orange-100 shadow-sm">
                    <div className="font-black text-orange-600 text-xs mb-1">INTERNET</div>
                    <div className="text-sm text-slate-500">To access the websites you wish to download from.</div>
                  </div>
                </div>
              </div>

              <div className="p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100">
                <h2 className="text-2xl font-black text-slate-900 mb-4 italic">4. Third-Party Analytics</h2>
                <p className="text-slate-600 leading-relaxed font-medium">
                  To improve the app's stability, we may use standard tools like Firebase Crashlytics. These tools only collect anonymous crash reports and technical device data (model, OS version) to help us fix bugs. They cannot identify you.
                </p>
              </div>

              <div className="text-center pt-12">
                <p className="text-slate-400 text-sm font-medium">Have questions? Contact us at the official GitHub repository.</p>
                <button
                  onClick={() => { setShowPrivacy(false); window.scrollTo(0, 0); }}
                  className="mt-8 px-10 py-4 bg-slate-900 text-white rounded-full font-black hover:bg-orange-600 transition-all active:scale-95"
                >
                  Close & Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* --- CONTACT US VIEW --- */}
      {showContact && (
        <div className="fixed inset-0 z-[110] bg-white overflow-y-auto animate-in fade-in duration-500">
          {/* Decorative Section Ambient Glows */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-100/30 blur-[120px] rounded-full -mr-64 -mt-64 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-100/20 blur-[120px] rounded-full -ml-64 -mb-64 pointer-events-none"></div>

          <div className="max-w-4xl mx-auto px-6 py-20 relative">
            <button
              onClick={() => { setShowContact(false); window.scrollTo(0, 0); }}
              className="fixed top-8 left-8 p-3 rounded-full bg-slate-100 hover:bg-orange-100 hover:text-orange-600 transition-all z-50 flex items-center gap-2 group shadow-sm"
            >
              <Rocket className="rotate-[270deg] group-hover:scale-110 transition-transform" size={20} />
              <span className="font-bold text-sm pr-2">Back to Home</span>
            </button>

            <div className="text-center mb-16">
              <div className="inline-block px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-xs font-bold mb-4 uppercase tracking-widest">Support Portal</div>
              <h1 className="text-4xl sm:text-6xl font-black text-slate-900 mb-6 tracking-tight">Get in <span className="text-orange-600">Touch</span></h1>
              <p className="text-slate-500 font-medium text-lg">We're here to help you get the most out of AIO-YTDER.</p>
            </div>

            <div className="grid gap-8">
              {/* Primary Email Card */}
              <div className="p-8 md:p-12 rounded-[3rem] bg-gradient-to-br from-white to-slate-50 border border-slate-200 shadow-2xl shadow-slate-200/50 flex flex-col items-center text-center group hover:border-orange-200 transition-colors">
                <div className="w-20 h-20 rounded-[2rem] bg-orange-500 text-white flex items-center justify-center mb-8 shadow-[0_15px_30px_rgba(249,115,22,0.3)] group-hover:scale-110 transition-all duration-500">
                  <Mail size={40} />
                </div>
                <h2 className="text-2xl font-black text-slate-900 mb-2">Official Email Support</h2>
                <p className="text-slate-500 font-medium mb-8">Response time: Within 24-48 Business Hours</p>
                <a
                  href="mailto:contact@ytder.com"
                  className="px-10 py-5 bg-slate-900 text-white rounded-[2rem] font-black text-lg hover:bg-orange-600 transition-all active:scale-95 shadow-xl shadow-slate-200 flex items-center gap-3"
                >
                  contact@ytder.com
                  <ExternalLink size={18} className="opacity-50" />
                </a>
              </div>

              <div className="grid sm:grid-cols-2 gap-8">
                {/* GitHub Support Card */}
                <div className="p-8 rounded-[2.5rem] bg-white border border-slate-200 hover:border-blue-200 transition-colors flex flex-col items-center text-center group">
                  <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Github size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">GitHub Repository</h3>
                  <p className="text-slate-500 text-sm mb-6 px-4">Report bugs directly or browse the source code.</p>
                  <a
                    href="https://github.com/shibaFoss/AIO-Video-Downloader"
                    target="_blank" rel="noopener noreferrer"
                    className="font-black text-blue-600 text-sm hover:underline flex items-center gap-2"
                  >
                    View Repository <ExternalLink size={14} />
                  </a>
                </div>

                {/* FAQ Card Placeholder */}
                <div className="p-8 rounded-[2.5rem] bg-white border border-slate-200 hover:border-emerald-200 transition-colors flex flex-col items-center text-center group">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <MessageSquare size={32} className="text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Chat with Us</h3>
                  <p className="text-slate-500 text-sm mb-6 px-4">For immediate help, join our developer community.</p>
                  <button className="font-black text-emerald-600 text-sm hover:underline flex items-center gap-2">
                    Coming Soon <ExternalLink size={14} className="opacity-50" />
                  </button>
                </div>
              </div>

              <div className="p-8 rounded-[2.5rem] bg-orange-50/50 border border-orange-100 text-center">
                <p className="text-slate-500 text-sm font-medium">Please include your <b>Device Model</b> and <b>Android Version</b> when reporting a bug for faster resolution.</p>
                <button
                  onClick={() => { setShowContact(false); window.scrollTo(0, 0); }}
                  className="mt-8 px-12 py-4 bg-slate-900 text-white rounded-full font-black hover:bg-orange-600 transition-all active:scale-95"
                >
                  Close Support
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* --- TERMS & CONDITIONS VIEW --- */}
      {showTerms && (
        <div className="fixed inset-0 z-[120] bg-white overflow-y-auto animate-in slider-in-bottom duration-500">
          <div className="max-w-4xl mx-auto px-6 py-20 relative">
            <button
              onClick={() => { setShowTerms(false); window.scrollTo(0, 0); }}
              className="fixed top-8 left-8 p-3 rounded-full bg-slate-100 hover:bg-orange-100 hover:text-orange-600 transition-all z-50 flex items-center gap-2 group shadow-sm"
            >
              <Rocket className="rotate-[270deg] group-hover:scale-110 transition-transform" size={20} />
              <span className="font-bold text-sm pr-2">Back to Home</span>
            </button>

            <div className="text-center mb-16">
              <div className="inline-block px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold mb-4 uppercase tracking-widest">Legal Framework</div>
              <h1 className="text-4xl sm:text-6xl font-black text-slate-900 mb-6 tracking-tight">Terms & <span className="text-orange-600">Conditions</span></h1>
              <p className="text-slate-500 font-medium">Effective Date: March 29, 2026</p>
            </div>

            <div className="space-y-8">
              <div className="p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 shadow-sm">
                <h2 className="text-2xl font-black text-slate-900 mb-4 italic">1. Acceptance of Terms</h2>
                <p className="text-slate-600 leading-relaxed font-medium">
                  By downloading, installing, or using AIO-YTDER, you acknowledge that you have read, understood, and agreed to be bound by these Terms and Conditions. If you do not agree to these terms, you must not use or install the software.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="p-8 rounded-[2.5rem] bg-white border border-slate-200">
                  <h3 className="text-xl font-black text-slate-900 mb-4">2. Use License</h3>
                  <p className="text-slate-600 text-sm leading-relaxed font-medium">
                    AIO-YTDER provides a personal, non-exclusive, non-transferable license to use the application for strictly personal and non-commercial purposes only. Any unauthorized exploitation of the services is strictly prohibited.
                  </p>
                </div>
                <div className="p-8 rounded-[2.5rem] bg-orange-50/50 border border-orange-100">
                  <h3 className="text-xl font-black text-slate-900 mb-4">3. Fair Use & Responsibility</h3>
                  <p className="text-slate-600 text-sm leading-relaxed font-medium">
                    Users of AIO-YTDER are solely responsible for the content they download. You agree to respect the intellectual property rights of owners and to use the service in compliance with local and international laws.
                  </p>
                </div>
              </div>

              <div className="p-8 rounded-[2.5rem] bg-white border border-slate-200">
                <h2 className="text-2xl font-black text-slate-900 mb-4 italic">4. Prohibited Conduct</h2>
                <ul className="grid sm:grid-cols-2 gap-y-4 text-slate-600 font-medium text-sm">
                  <li className="flex gap-3"><span className="text-orange-500 font-bold">•</span> Commercial redistribution of software.</li>
                  <li className="flex gap-3"><span className="text-orange-500 font-bold">•</span> Reverse engineering or decompiling.</li>
                  <li className="flex gap-3"><span className="text-orange-500 font-bold">•</span> Using the app for copyrighted content.</li>
                  <li className="flex gap-3"><span className="text-orange-500 font-bold">•</span> Attempting to disrupt our backend API.</li>
                </ul>
              </div>

              <div className="p-8 rounded-[2.5rem] bg-rose-50/30 border border-rose-100">
                <h2 className="text-2xl font-black text-rose-900 mb-4 italic">5. Disclaimer of Liability</h2>
                <p className="text-slate-600 leading-relaxed font-medium">
                  AIO-YTDER IS PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND. The developers are NOT responsible for any misuse, legal consequences, or data loss resulting from the use of this application. We do not host or store any media content on our servers.
                </p>
              </div>

              <div className="text-center pt-12 pb-20">
                <p className="text-slate-400 text-sm font-medium mb-8">We reserve the right to update these terms at any time without prior notice.</p>
                <button
                  onClick={() => { setShowTerms(false); window.scrollTo(0, 0); }}
                  className="px-10 py-5 bg-slate-900 text-white rounded-full font-black hover:bg-orange-600 transition-all active:scale-95 shadow-xl"
                >
                  Close & Accept Terms
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
