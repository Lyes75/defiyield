import React from 'react';
import { WalletBalance } from '../../types';
import { ProfitCard } from './ProfitCard';
import { ChainBalances } from './ChainBalances';

interface Props {
  balances: WalletBalance[];
  totalProfit: number;
  weeklyProfit: number;
}

export function Dashboard({ balances, totalProfit, weeklyProfit }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <ProfitCard
        title="Total Profit"
        amount={totalProfit}
        subtitle="Lifetime earnings"
        iconColor="green-500"
      />
      <ProfitCard
        title="Weekly Profit"
        amount={weeklyProfit}
        subtitle="Last 7 days"
        iconColor="blue-500"
      />
      <ChainBalances balances={balances} />
    </div>
  );
}