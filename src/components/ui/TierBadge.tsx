import React from 'react';

interface TierBadgeProps {
  tier: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const TierBadge: React.FC<TierBadgeProps> = ({ tier, size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  const getTierConfig = (tier: string) => {
    switch (tier.toUpperCase()) {
      case 'SILVER':
        return {
          color:
            'bg-gradient-to-r from-gray-100 to-gray-200 border border-gray-300 text-gray-700 shadow-sm',
          icon: '/silver-medal.png',
          label: 'SILVER',
          useImage: true,
        };
      case 'GOLD':
        return {
          color:
            'bg-gradient-to-r from-yellow-300 to-yellow-400 border border-yellow-500 text-yellow-900 shadow-md',
          icon: '/gold-medal.png',
          label: 'GOLD',
          useImage: true,
        };
      case 'DIAMOND':
        return {
          color:
            'bg-gradient-to-r from-blue-200 to-blue-300 border border-blue-300 text-white shadow-lg',
          icon: '/diamond-medal.png',
          label: 'DIAMOND',
          useImage: true,
        };
      default:
        return {
          color:
            'bg-gradient-to-r from-amber-100 to-amber-200 border border-amber-300 text-amber-800 shadow-sm',
          icon: '/bronze-medal.png',
          label: 'BRONZE',
          useImage: true,
        };
    }
  };

  const config = getTierConfig(tier);

  return (
    <div
      className={`inline-flex items-center gap-1.5 rounded-full font-bold ${config.color} ${sizeClasses[size]} ${className} transition-all duration-200 hover:scale-105`}
    >
      {config.useImage ? (
        <img
          src={config.icon}
          alt={config.label}
          className="w-5 h-5 object-contain drop-shadow-sm"
        />
      ) : (
        <span className="text-sm drop-shadow-sm">{config.icon}</span>
      )}
      <span className="drop-shadow-sm">{config.label}</span>
    </div>
  );
};

export default TierBadge;
