import React from 'react';
import { WalletBalance } from '../types';
import { Wallet } from 'lucide-react';

interface Props {
  balances: WalletBalance[];
  totalProfit: number;
  weeklyProfit: number;
}

export function Dashboard({ balances, totalProfit, weeklyProfit }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Total Profit</h3>
          <span className="text-green-500">
            <Wallet className="w-5 h-5" />
          </span>
        </div>
        <p className="text-3xl font-bold text-gray-900">${totalProfit.toFixed(2)}</p>
        <p className="text-sm text-gray-500">Lifetime earnings</p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Weekly Profit</h3>
          <span className="text-blue-500">
            <Wallet className="w-5 h-5" />
          </span>
        </div>
        <p className="text-3xl font-bold text-gray-900">${weeklyProfit.toFixed(2)}</p>
        <p className="text-sm text-gray-500">Last 7 days</p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Chain Balances</h3>
        <div className="space-y-4">
          {balances.map((balance) => (
            <div key={balance.chain.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">{balance.chain.name}</span>
              </div>
              {balance.balances.map((tokenBalance) => (
                <div key={tokenBalance.token.symbol} className="flex justify-between text-sm">
                  <span className="text-gray-500">{tokenBalance.token.symbol}</span>
                  <span className="font-medium">{tokenBalance.amount}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}