export interface ArbitrageOpportunity {
  id: string;
  sourceChain: Chain;
  targetChain: Chain;
  token: Token;
  priceDifference: number;
  estimatedProfit: number;
  gasEstimate: number;
  bridgeFee: number;
  netProfit: number;
  liquidity: {
    source: number;
    target: number;
  };
  timestamp: number;
  buyPlatform: string;
  sellPlatform: string;
}

export interface Chain {
  id: number;
  name: string;
  icon: string;
}

export interface Token {
  symbol: string;
  name: string;
  decimals: number;
  address: {
    [chainId: number]: string;
  };
}

export interface WalletBalance {
  chain: Chain;
  balances: {
    token: Token;
    amount: string;
  }[];
}