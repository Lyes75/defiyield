import { useState, useEffect } from 'react';
import { useWalletConnection } from './useWalletConnection';

interface Transaction {
  hash: string;
  description: string;
  status: 'pending' | 'confirmed' | 'failed';
  timestamp: number;
}

export function useTransactionStatus() {
  const { address } = useWalletConnection();
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    if (!address) {
      setTransactions([]);
      return;
    }

    // Mock data - in a real implementation, you would fetch from local storage
    // and update based on blockchain events
    const mockTransactions: Transaction[] = [
      {
        hash: '0x1234...5678',
        description: 'Add Liquidity ETH/USDC',
        status: 'confirmed',
        timestamp: Date.now() - 300000,
      },
      {
        hash: '0x5678...9012',
        description: 'Remove Liquidity WBTC/ETH',
        status: 'pending',
        timestamp: Date.now() - 60000,
      },
    ];

    setTransactions(mockTransactions);
  }, [address]);

  const addTransaction = (tx: Omit<Transaction, 'timestamp'>) => {
    setTransactions((prev) => [
      { ...tx, timestamp: Date.now() },
      ...prev,
    ]);
  };

  return { transactions, addTransaction };
}