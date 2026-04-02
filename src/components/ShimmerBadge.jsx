import React from 'react';

export const ShimmerBadge = ({ icon: Icon, text, type = 'gold' }) => {
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
