import React from 'react';

export const GlobalStyles = () => {
  return (
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
      @keyframes pulse-soft {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.8; transform: scale(0.98); }
      }
      .animate-pulse-soft { animation: pulse-soft 3s ease-in-out infinite; }
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
  );
};
