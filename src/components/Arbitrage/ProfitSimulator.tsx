import React, { useState } from 'react';
import { formatCurrency, formatPercentage } from '../../utils/formatting';

interface Props {
  baseProfit: number;
  gasEstimate: number;
  bridgeFee: number;
}

export function ProfitSimulator({ baseProfit, gasEstimate, bridgeFee }: Props) {
  const [amount, setAmount] = useState(1000);
  
  const calculateMetrics = () => {
    const profitRatio = baseProfit / 1000;
    const simulatedBaseProfit = amount * profitRatio;
    
    // Calculate scaled fees
    const scaledGasFee = gasEstimate * (amount / 1000);
    const scaledBridgeFee = bridgeFee * (amount / 1000);
    
    // Calculate slippage (increases with larger amounts)
    const slippagePercentage = Math.min(0.5 + (amount / 10000) * 0.1, 2.5);
    const slippageCost = (simulatedBaseProfit * slippagePercentage) / 100;
    
    // Calculate final profit
    const totalFees = scaledGasFee + scaledBridgeFee + slippageCost;
    const netProfit = Math.max(simulatedBaseProfit - totalFees, 0);
    
    return {
      baseProfit: simulatedBaseProfit,
      gasFee: scaledGasFee,
      bridgeFee: scaledBridgeFee,
      slippage: slippagePercentage,
      slippageCost,
      netProfit,
      roi: (netProfit / amount) * 100
    };
  };

  const metrics = calculateMetrics();

  return (
    <div className="mt-4 p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
      <h4 className="text-sm font-medium text-blue-400 mb-3">Profit Simulator</h4>
      <div className="space-y-3">
        <div>
          <label className="block text-sm text-gray-400 mb-1">
            Investment Amount ($)
          </label>
          <input
            type="number"
            min="100"
            max="100000"
            value={amount}
            onChange={(e) => setAmount(Math.max(100, Number(e.target.value)))}
            className="w-full bg-blue-500/5 border border-blue-500/20 rounded-lg px-3 py-2 text-gray-200 
                     focus:outline-none focus:border-blue-500/40"
          />
        </div>

        {/* Base Profit */}
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Base Profit</span>
          <span className="font-medium text-gray-200">
            {formatCurrency(metrics.baseProfit)}
          </span>
        </div>

        {/* Fees Breakdown */}
        <div className="space-y-1.5 border-t border-blue-500/20 pt-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Gas Fee</span>
            <span className="font-medium text-red-400">
              -{formatCurrency(metrics.gasFee)}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Bridge Fee</span>
            <span className="font-medium text-red-400">
              -{formatCurrency(metrics.bridgeFee)}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">
              Slippage ({formatPercentage(metrics.slippage)})
            </span>
            <span className="font-medium text-red-400">
              -{formatCurrency(metrics.slippageCost)}
            </span>
          </div>
        </div>

        {/* Net Profit */}
        <div className="border-t border-blue-500/20 pt-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Net Profit</span>
            <span className="font-medium text-green-400">
              {formatCurrency(metrics.netProfit)}
            </span>
          </div>
          <div className="flex justify-between text-sm mt-1">
            <span className="text-gray-400">Expected ROI</span>
            <span className="font-medium text-blue-400">
              {metrics.roi.toFixed(2)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}