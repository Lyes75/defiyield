import { ArbitrageOpportunity } from '../types';

export const isHighSlippage = (opportunity: ArbitrageOpportunity): boolean => {
  return opportunity.priceDifference > 2;
};

export const isLowLiquidity = (opportunity: ArbitrageOpportunity): boolean => {
  return (
    opportunity.liquidity.source < 10000 || 
    opportunity.liquidity.target < 10000
  );
};

export const calculateNetProfit = (
  estimatedProfit: number,
  gasEstimate: number,
  bridgeFee: number
): number => {
  return estimatedProfit - gasEstimate - bridgeFee;
};