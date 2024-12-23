import { ArbitrageOpportunity } from '../types';
import { SUPPORTED_CHAINS } from '../config/chains';
import { SUPPORTED_TOKENS } from '../config/tokens';

export const mockOpportunities: ArbitrageOpportunity[] = [
  {
    id: '1',
    sourceChain: SUPPORTED_CHAINS[0], // Ethereum
    targetChain: SUPPORTED_CHAINS[1], // Arbitrum
    token: SUPPORTED_TOKENS[0], // USDC
    priceDifference: 0.8,
    estimatedProfit: 150,
    gasEstimate: 25,
    bridgeFee: 15,
    netProfit: 110,
    liquidity: { source: 50000, target: 40000 },
    timestamp: Date.now(),
    buyPlatform: 'Uniswap V3',
    sellPlatform: 'SushiSwap'
  },
  {
    id: '2',
    sourceChain: SUPPORTED_CHAINS[1], // Arbitrum
    targetChain: SUPPORTED_CHAINS[2], // BSC
    token: SUPPORTED_TOKENS[1], // USDT
    priceDifference: 1.2,
    estimatedProfit: 280,
    gasEstimate: 12,
    bridgeFee: 18,
    netProfit: 250,
    liquidity: { source: 75000, target: 65000 },
    timestamp: Date.now(),
    buyPlatform: 'Curve',
    sellPlatform: 'PancakeSwap'
  },
  {
    id: '3',
    sourceChain: SUPPORTED_CHAINS[2], // BSC
    targetChain: SUPPORTED_CHAINS[0], // Ethereum
    token: SUPPORTED_TOKENS[2], // WETH
    priceDifference: 0.65,
    estimatedProfit: 180,
    gasEstimate: 45,
    bridgeFee: 25,
    netProfit: 110,
    liquidity: { source: 8000, target: 12000 },
    timestamp: Date.now(),
    buyPlatform: 'PancakeSwap',
    sellPlatform: 'Uniswap V3'
  },
  {
    id: '4',
    sourceChain: SUPPORTED_CHAINS[0], // Ethereum
    targetChain: SUPPORTED_CHAINS[2], // BSC
    token: SUPPORTED_TOKENS[1], // USDT
    priceDifference: 1.5,
    estimatedProfit: 320,
    gasEstimate: 35,
    bridgeFee: 20,
    netProfit: 265,
    liquidity: { source: 95000, target: 85000 },
    timestamp: Date.now(),
    buyPlatform: 'Balancer',
    sellPlatform: 'PancakeSwap'
  },
  {
    id: '5',
    sourceChain: SUPPORTED_CHAINS[1], // Arbitrum
    targetChain: SUPPORTED_CHAINS[0], // Ethereum
    token: SUPPORTED_TOKENS[2], // WETH
    priceDifference: 0.95,
    estimatedProfit: 190,
    gasEstimate: 18,
    bridgeFee: 22,
    netProfit: 150,
    liquidity: { source: 45000, target: 55000 },
    timestamp: Date.now(),
    buyPlatform: 'Camelot',
    sellPlatform: 'Curve'
  },
  {
    id: '6',
    sourceChain: SUPPORTED_CHAINS[2], // BSC
    targetChain: SUPPORTED_CHAINS[1], // Arbitrum
    token: SUPPORTED_TOKENS[0], // USDC
    priceDifference: 1.8,
    estimatedProfit: 320,
    gasEstimate: 15,
    bridgeFee: 25,
    netProfit: 280,
    liquidity: { source: 35000, target: 28000 },
    timestamp: Date.now(),
    buyPlatform: 'Trader Joe',
    sellPlatform: 'Uniswap V3'
  },
  {
    id: '7',
    sourceChain: SUPPORTED_CHAINS[0], // Ethereum
    targetChain: SUPPORTED_CHAINS[1], // Arbitrum
    token: SUPPORTED_TOKENS[2], // WETH
    priceDifference: 1.5,
    estimatedProfit: 450,
    gasEstimate: 40,
    bridgeFee: 30,
    netProfit: 380,
    liquidity: { source: 95000, target: 85000 },
    timestamp: Date.now(),
    buyPlatform: 'Curve',
    sellPlatform: 'GMX'
  },
  {
    id: '8',
    sourceChain: SUPPORTED_CHAINS[1], // Arbitrum
    targetChain: SUPPORTED_CHAINS[2], // BSC
    token: SUPPORTED_TOKENS[0], // USDC
    priceDifference: 0.75,
    estimatedProfit: 220,
    gasEstimate: 10,
    bridgeFee: 15,
    netProfit: 195,
    liquidity: { source: 60000, target: 55000 },
    timestamp: Date.now(),
    buyPlatform: 'SushiSwap',
    sellPlatform: 'Biswap'
  },
  {
    id: '9',
    sourceChain: SUPPORTED_CHAINS[2], // BSC
    targetChain: SUPPORTED_CHAINS[0], // Ethereum
    token: SUPPORTED_TOKENS[1], // USDT
    priceDifference: 2.3,
    estimatedProfit: 520,
    gasEstimate: 45,
    bridgeFee: 35,
    netProfit: 440,
    liquidity: { source: 15000, target: 18000 },
    timestamp: Date.now(),
    buyPlatform: 'ApeSwap',
    sellPlatform: 'Balancer'
  },
  {
    id: '10',
    sourceChain: SUPPORTED_CHAINS[0], // Ethereum
    targetChain: SUPPORTED_CHAINS[2], // BSC
    token: SUPPORTED_TOKENS[2], // WETH
    priceDifference: 1.7,
    estimatedProfit: 380,
    gasEstimate: 30,
    bridgeFee: 25,
    netProfit: 325,
    liquidity: { source: 70000, target: 65000 },
    timestamp: Date.now(),
    buyPlatform: 'dYdX',
    sellPlatform: 'PancakeSwap'
  }
];