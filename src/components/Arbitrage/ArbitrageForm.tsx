import React, { useState } from 'react';
import { Card } from '../UI/Card';
import { Button } from '../UI/Button';
import { ArrowRight, AlertTriangle } from 'lucide-react';
import { formatCurrency, formatPercentage } from '../../utils/formatting';
import { ArbitrageOpportunity } from '../../types';

interface Props {
  opportunity: ArbitrageOpportunity;
  onExecute: (amount: number) => void;
  isExecuting: boolean;
}

export function ArbitrageForm({ opportunity, onExecute, isExecuting }: Props) {
  const [amount, setAmount] = useState<string>('');
  const [slippage, setSlippage] = useState<number>(0.5);

  const parsedAmount = parseFloat(amount) || 0;
  const estimatedProfit = (parsedAmount / 1000) * opportunity.netProfit;
  const totalFees = (parsedAmount / 1000) * (opportunity.gasEstimate + opportunity.bridgeFee);
  const expectedReturn = estimatedProfit - totalFees;
  const roi = (expectedReturn / parsedAmount) * 100;

  const isValidAmount = parsedAmount >= 100 && parsedAmount <= 100000;
  const hasHighSlippage = slippage > 1;

  return (
    <Card>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">
            Investment Amount (USD)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="100"
            max="100000"
            step="100"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-gray-200 
                     focus:outline-none focus:border-blue-500/40"
            placeholder="Enter amount (min: $100)"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">
            Slippage Tolerance: {slippage}%
          </label>
          <input
            type="range"
            min="0.1"
            max="2"
            step="0.1"
            value={slippage}
            onChange={(e) => setSlippage(parseFloat(e.target.value))}
            className="w-full"
          />
        </div>

        {hasHighSlippage && (
          <div className="flex items-center space-x-2 text-yellow-400">
            <AlertTriangle className="w-4 h-4" />
            <span className="text-sm">High slippage may result in lower returns</span>
          </div>
        )}

        <div className="space-y-3 border-t border-white/10 pt-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Estimated Profit</span>
            <span className="text-gray-200">{formatCurrency(estimatedProfit)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Total Fees</span>
            <span className="text-red-400">-{formatCurrency(totalFees)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Expected Return</span>
            <span className="text-green-400">{formatCurrency(expectedReturn)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Expected ROI</span>
            <span className="text-blue-400">{formatPercentage(roi)}</span>
          </div>
        </div>

        <Button
          onClick={() => onExecute(parsedAmount)}
          disabled={!isValidAmount || isExecuting}
          rightIcon={ArrowRight}
          className="w-full"
        >
          {isExecuting ? 'Executing Trade...' : 'Execute Trade'}
        </Button>
      </div>
    </Card>
  );
}