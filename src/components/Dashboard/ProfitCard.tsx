import React from 'react';
import { Wallet } from 'lucide-react';

interface Props {
  title: string;
  amount: number;
  subtitle: string;
  iconColor: string;
}

export function ProfitCard({ title, amount, subtitle, iconColor }: Props) {
  return (
    <div className="glass-card p-6 hover:bg-white/10 transition-colors">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-200">{title}</h3>
        <span className={`text-${iconColor}`}>
          <Wallet className="w-5 h-5" />
        </span>
      </div>
      <p className="text-3xl font-bold gradient-text">${amount.toFixed(2)}</p>
      <p className="text-sm text-gray-400">{subtitle}</p>
    </div>
  );
}