import React from 'react';
import { Building2 } from 'lucide-react';

interface Props {
  buyPlatform: string;
  sellPlatform: string;
  className?: string;
}

export function TradingPlatforms({ buyPlatform, sellPlatform, className = '' }: Props) {
  return (
    <div className={`flex items-center justify-between ${className}`}>
      <div className="flex items-center space-x-2">
        <Building2 className="w-4 h-4 text-green-400" />
        <div>
          <span className="text-sm text-gray-400">Buy on</span>
          <p className="text-gray-200 font-medium">{buyPlatform}</p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Building2 className="w-4 h-4 text-red-400" />
        <div>
          <span className="text-sm text-gray-400">Sell on</span>
          <p className="text-gray-200 font-medium">{sellPlatform}</p>
        </div>
      </div>
    </div>
  );
}