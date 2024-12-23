import React from 'react';
import { Card } from '../UI/Card';
import { ArrowRight } from 'lucide-react';
import { ArbitrageOpportunity } from '../../types';
import { formatCurrency } from '../../utils/formatting';

interface Props {
  opportunity: ArbitrageOpportunity;
  amount?: number;
}

export function ArbitrageSteps({ opportunity, amount = 1000 }: Props) {
  const scaledGasFee = (amount / 1000) * opportunity.gasEstimate;
  const scaledBridgeFee = (amount / 1000) * opportunity.bridgeFee;

  return (
    <Card>
      <h3 className="text-lg font-medium text-gray-200 mb-4">Transaction Steps</h3>
      
      <div className="space-y-6">
        <Step
          number={1}
          title="Source Chain Swap"
          chain={opportunity.sourceChain.name}
          details={[
            `Buy ${opportunity.token.symbol} from liquidity pool`,
            `Estimated Gas Fee: ${formatCurrency(scaledGasFee)}`,
          ]}
        />

        <Step
          number={2}
          title="Bridge Assets"
          chain={`${opportunity.sourceChain.name} → ${opportunity.targetChain.name}`}
          details={[
            `Bridge ${opportunity.token.symbol} to target chain`,
            `Bridge Fee: ${formatCurrency(scaledBridgeFee)}`,
            'Estimated Time: 10-15 minutes',
          ]}
        />

        <Step
          number={3}
          title="Target Chain Swap"
          chain={opportunity.targetChain.name}
          details={[
            `Sell ${opportunity.token.symbol} to liquidity pool`,
            `Estimated Gas Fee: ${formatCurrency(scaledGasFee)}`,
          ]}
        />
      </div>
    </Card>
  );
}

interface StepProps {
  number: number;
  title: string;
  chain: string;
  details: string[];
}

function Step({ number, title, chain, details }: StepProps) {
  return (
    <div className="flex items-start space-x-4">
      <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-medium">
        {number}
      </div>
      <div className="flex-1">
        <div className="flex items-center space-x-2">
          <h4 className="text-gray-200 font-medium">{title}</h4>
          <ArrowRight className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-400">{chain}</span>
        </div>
        <ul className="mt-2 space-y-1">
          {details.map((detail, index) => (
            <li key={index} className="text-sm text-gray-400">
              {detail}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}