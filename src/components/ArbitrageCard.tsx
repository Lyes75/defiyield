import React from 'react';
import { ArbitrageOpportunity } from '../types';
import { ArrowRight, AlertTriangle, Wallet } from 'lucide-react';

interface Props {
  opportunity: ArbitrageOpportunity;
  onExecute: (opportunity: ArbitrageOpportunity) => void;
}

export function ArbitrageCard({ opportunity, onExecute }: Props) {
  const isHighSlippage = opportunity.priceDifference > 2;
  const isLowLiquidity = 
    opportunity.liquidity.source < 10000 || 
    opportunity.liquidity.target < 10000;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {opportunity.token.symbol}
          </h3>
          <p className="text-sm text-gray-600">
            {opportunity.sourceChain.name} → {opportunity.targetChain.name}
          </p>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-2xl font-bold text-green-600">
            ${opportunity.netProfit.toFixed(2)}
          </span>
          <span className="text-sm text-gray-500">
            Est. Profit
          </span>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Price Difference</span>
          <span className="font-medium text-gray-900">
            {opportunity.priceDifference.toFixed(2)}%
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Gas Estimate</span>
          <span className="font-medium text-gray-900">
            ${opportunity.gasEstimate.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Bridge Fee</span>
          <span className="font-medium text-gray-900">
            ${opportunity.bridgeFee.toFixed(2)}
          </span>
        </div>
      </div>

      {(isHighSlippage || isLowLiquidity) && (
        <div className="mb-4 p-3 bg-yellow-50 rounded-md flex items-start space-x-2">
          <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0" />
          <div className="text-sm text-yellow-700">
            {isHighSlippage && <p>High slippage warning</p>}
            {isLowLiquidity && <p>Low liquidity warning</p>}
          </div>
        </div>
      )}

      <button
        onClick={() => onExecute(opportunity)}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 
                 transition-colors flex items-center justify-center space-x-2"
      >
        <Wallet className="w-4 h-4" />
        <span>Execute Trade</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}