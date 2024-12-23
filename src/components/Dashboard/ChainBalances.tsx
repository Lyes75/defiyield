import React from 'react';
import { WalletBalance } from '../../types';

interface Props {
  balances: WalletBalance[];
}

export function ChainBalances({ balances }: Props) {
  return (
    <div className="glass-card p-6 hover:bg-white/10 transition-colors">
      <h3 className="text-lg font-semibold text-gray-200 mb-4">Chain Balances</h3>
      <div className="space-y-4">
        {balances.map((balance) => (
          <div key={balance.chain.id} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">{balance.chain.name}</span>
            </div>
            {balance.balances.map((tokenBalance) => (
              <div key={tokenBalance.token.symbol} className="flex justify-between text-sm">
                <span className="text-gray-400">{tokenBalance.token.symbol}</span>
                <span className="font-medium text-gray-200">{tokenBalance.amount}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}