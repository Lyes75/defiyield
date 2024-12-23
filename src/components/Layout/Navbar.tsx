import React from 'react';
import { Activity, RefreshCw } from 'lucide-react';
import { ConnectButton } from '../Wallet/ConnectButton';

interface Props {
  isLoading: boolean;
  lastUpdate: Date;
}

export function Navbar({ isLoading, lastUpdate }: Props) {
  return (
    <nav className="glass-card border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-3">
            <Activity className="w-8 h-8 text-blue-400" />
            <span className="text-xl font-semibold gradient-text">
              DeFiYield.io
            </span>
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              <span>Updated {lastUpdate.toLocaleTimeString()}</span>
            </div>
            <ConnectButton />
          </div>
        </div>
      </div>
    </nav>
  );
}