import React from 'react';

export const PhoneMockup = ({ children, className = "" }) => (
  <div className={`relative mx-auto w-[280px] h-[580px] bg-gray-900 rounded-[3rem] border-[10px] border-gray-800 shadow-2xl overflow-hidden shadow-cyan-500/20 ${className}`}>
    {/* Notch */}
    <div className="absolute top-0 inset-x-0 h-6 bg-gray-800 rounded-b-3xl w-1/2 mx-auto z-20" />
    <div className="relative h-full w-full bg-slate-950 overflow-hidden text-white">
      {children}
    </div>
  </div>
);
