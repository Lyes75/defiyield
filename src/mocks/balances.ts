import { WalletBalance } from '../types';
import { SUPPORTED_CHAINS } from '../config/chains';
import { SUPPORTED_TOKENS } from '../config/tokens';

export const mockBalances: WalletBalance[] = [
  {
    chain: SUPPORTED_CHAINS[0],
    balances: [
      { token: SUPPORTED_TOKENS[0], amount: '1,000.00' },
      { token: SUPPORTED_TOKENS[2], amount: '2.5' },
    ],
  },
  // Add more mock balances here
];