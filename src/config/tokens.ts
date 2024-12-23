import { Token } from '../types';

export const SUPPORTED_TOKENS: Token[] = [
  {
    symbol: 'USDC',
    name: 'USD Coin',
    decimals: 6,
    address: {
      1: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      42161: '0xff970a61a04b1ca14834a43f5de4533ebddb5cc8',
      56: '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d',
    },
  },
  {
    symbol: 'USDT',
    name: 'Tether USD',
    decimals: 6,
    address: {
      1: '0xdac17f958d2ee523a2206206994597c13d831ec7',
      42161: '0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9',
      56: '0x55d398326f99059ff775485246999027b3197955',
    },
  },
  {
    symbol: 'WETH',
    name: 'Wrapped Ether',
    decimals: 18,
    address: {
      1: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      42161: '0x82af49447d8a07e3bd95bd0d56f35241523fbab1',
      56: '0x2170ed0880ac9a755fd29b2688956bd959f933f8',
    },
  },
];