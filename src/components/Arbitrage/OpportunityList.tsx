import React, { useState } from 'react';
import { OpportunityCard } from './OpportunityCard';
import { ArbitrageOpportunity } from '../../types';
import { Button } from '../UI/Button';
import { SlidersHorizontal } from 'lucide-react';

interface Props {
  opportunities: ArbitrageOpportunity[];
  onExecute: (opportunity: ArbitrageOpportunity, amount: number) => void;
  isExecuting: boolean;
}

export function OpportunityList({ opportunities, onExecute, isExecuting }: Props) {
  const [sortBy, setSortBy] = useState<'profit' | 'fees' | 'time'>('profit');
  const [minProfit, setMinProfit] = useState<number>(0);

  const sortedOpportunities = [...opportunities].sort((a, b) => {
    switch (sortBy) {
      case 'profit':
        return b.netProfit - a.netProfit;
      case 'fees':
        return (a.gasEstimate + a.bridgeFee) - (b.gasEstimate + b.bridgeFee);
      case 'time':
        return a.timestamp - b.timestamp;
      default:
        return 0;
    }
  }).filter(opp => opp.netProfit >= minProfit);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-200">
          Top Arbitrage Opportunities
        </h2>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <SlidersHorizontal className="w-4 h-4 text-gray-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'profit' | 'fees' | 'time')}
              className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-gray-200"
            >
              <option value="profit">Sort by Profit</option>
              <option value="fees">Sort by Fees</option>
              <option value="time">Sort by Time</option>
            </select>
          </div>
          <input
            type="number"
            value={minProfit}
            onChange={(e) => setMinProfit(Number(e.target.value))}
            placeholder="Min Profit ($)"
            className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-gray-200 w-32"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedOpportunities.map((opportunity) => (
          <OpportunityCard
            key={opportunity.id}
            opportunity={opportunity}
            onExecute={onExecute}
            isExecuting={isExecuting}
          />
        ))}
      </div>
    </div>
  );
}