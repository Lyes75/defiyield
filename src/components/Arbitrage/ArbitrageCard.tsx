import React, { useState } from 'react';
import { ArbitrageOpportunity } from '../../types';
import { ArrowRight, ChevronDown, ChevronUp, Loader2, Wallet } from 'lucide-react';
import { Card } from '../UI/Card';
import { Button } from '../UI/Button';
import { Warning } from '../UI/Warning';
import { ProfitSimulator } from './ProfitSimulator';
import { formatCurrency, formatPercentage } from '../../utils/formatting';
import { isHighSlippage, isLowLiquidity } from '../../utils/validation';

interface Props {
  opportunity: ArbitrageOpportunity;
  onExecute: (opportunity: ArbitrageOpportunity) => void;
  isExecuting: boolean;
}

export function ArbitrageCard({ opportunity, onExecute, isExecuting }: Props) {
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
          <p className="text-sm text-gray-400">
            {opportunity.sourceChain.name} → {opportunity.targetChain.name}
          </p>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-2xl font-bold gradient-text">
            {formatCurrency(opportunity.netProfit)}
          </span>
          <span className="text-sm text-gray-400">Est. Profit</span>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <MetricRow 
          label="Price Difference" 
          value={formatPercentage(opportunity.priceDifference)} 
        />
        <MetricRow 
          label="Gas Estimate" 
          value={formatCurrency(opportunity.gasEstimate)} 
        />
        <MetricRow 
          label="Bridge Fee" 
          value={formatCurrency(opportunity.bridgeFee)} 
        />
      </div>

      <Button
        onClick={() => setShowSimulator(!showSimulator)}
        variant="secondary"
        className="w-full mb-4"
        rightIcon={showSimulator ? ChevronUp : ChevronDown}
      >
        {showSimulator ? 'Hide Profit Simulator' : 'Show Profit Simulator'}
      </Button>

      {showSimulator && (
        <ProfitSimulator
          baseProfit={opportunity.estimatedProfit}
          gasEstimate={opportunity.gasEstimate}
          bridgeFee={opportunity.bridgeFee}
        />
      )}

      <Warning messages={warnings} />

      <Button
        onClick={() => onExecute(opportunity)}
        leftIcon={isExecuting ? Loader2 : Wallet}
        rightIcon={ArrowRight}
        className="w-full mt-4"
        disabled={isExecuting}
      >
        {isExecuting ? 'Executing Trade...' : 'Execute Trade'}
      </Button>
    </Card>
  );
}

interface MetricRowProps {
  label: string;
  value: string;
}

function MetricRow({ label, value }: MetricRowProps) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-gray-400">{label}</span>
      <span className="font-medium text-gray-200">{value}</span>
    </div>
  );
}