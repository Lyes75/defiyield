import React, { useState } from 'react';
import { Card } from '../UI/Card';
import { ArbitrageOpportunity } from '../../types';
import { ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '../UI/Button';
import { Warning } from '../UI/Warning';
import { TransactionSimulator } from './TransactionSimulator';
import { formatCurrency, formatPercentage } from '../../utils/formatting';
import { isHighSlippage, isLowLiquidity } from '../../utils/validation';
import { TradingPlatforms } from './TradingPlatforms';

interface Props {
  opportunity: ArbitrageOpportunity;
  onExecute: (opportunity: ArbitrageOpportunity) => void;
  isExecuting: boolean;
}

export function OpportunityCard({ opportunity, onExecute, isExecuting }: Props) {
  const [showSimulator, setShowSimulator] = useState(false);

  const warnings = [
    isHighSlippage(opportunity) && 'High slippage warning',
    isLowLiquidity(opportunity) && 'Low liquidity warning',
  ].filter(Boolean) as string[];

  return (
    <Card>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-200">
            {opportunity.token.symbol}
          </h3>
          <div className="flex items-center space-x-2 text-gray-400">
            <span>{opportunity.sourceChain.name}</span>
            <ArrowRight className="w-4 h-4" />
            <span>{opportunity.targetChain.name}</span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold gradient-text">
            {formatCurrency(opportunity.netProfit)}
          </p>
          <p className="text-sm text-gray-400">Est. Profit per $1,000</p>
        </div>
      </div>

      <TradingPlatforms
        buyPlatform={opportunity.buyPlatform}
        sellPlatform={opportunity.sellPlatform}
        className="mb-4"
      />

      <div className="grid grid-cols-2 gap-4 text-sm mb-4">
        <div>
          <span className="text-gray-400">Price Difference</span>
          <p className="text-gray-200 font-medium">
            {formatPercentage(opportunity.priceDifference)}
          </p>
        </div>
        <div>
          <span className="text-gray-400">Total Fees</span>
          <p className="text-gray-200 font-medium">
            {formatCurrency(opportunity.gasEstimate + opportunity.bridgeFee)}
          </p>
        </div>
      </div>

      <Warning messages={warnings} />

      <Button
        onClick={() => setShowSimulator(!showSimulator)}
        variant="secondary"
        className="w-full mb-4"
        rightIcon={showSimulator ? ChevronUp : ChevronDown}
      >
        {showSimulator ? 'Hide Simulator' : 'Show Simulator'}
      </Button>

      {showSimulator && (
        <TransactionSimulator
          baseProfit={opportunity.netProfit}
          gasEstimate={opportunity.gasEstimate}
          bridgeFee={opportunity.bridgeFee}
          priceDifference={opportunity.priceDifference}
        />
      )}

      <Button
        onClick={() => onExecute(opportunity)}
        variant="primary"
        className="w-full"
        rightIcon={ArrowRight}
        disabled={isExecuting}
      >
        {isExecuting ? 'Executing Trade...' : 'Execute Trade'}
      </Button>
    </Card>
  );
}