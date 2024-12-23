import { useState, useCallback } from 'react';
import { BrowserProvider, JsonRpcSigner } from 'ethers';
import toast from 'react-hot-toast';
import { ArbitrageOpportunity } from '../types';
import { executeTrade } from '../services/trading';

export function useWallet() {
  const [address, setAddress] = useState<string | null>(null);
  const [signer, setSigner] = useState<JsonRpcSigner | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);

  const connectWallet = useCallback(async () => {
    if (!window.ethereum) {
      toast.error('Please install MetaMask to connect your wallet');
      return;
    }

    try {
      const provider = new BrowserProvider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
      const newSigner = await provider.getSigner();
      const newAddress = await newSigner.getAddress();
      
      setSigner(newSigner);
      setAddress(newAddress);
      toast.success('Wallet connected successfully!');
    } catch (error) {
      console.error('Error connecting wallet:', error);
      toast.error('Failed to connect wallet');
    }
  }, []);

  const executeTradeSafely = async (opportunity: ArbitrageOpportunity) => {
    if (!signer) {
      toast.error('Please connect your wallet first');
      return;
    }

    if (isExecuting) {
      toast.error('A trade is already in progress');
      return;
    }

    setIsExecuting(true);
    toast.loading('Executing trade...', { id: 'trade' });

    try {
      const result = await executeTrade(opportunity, signer);
      toast.success('Trade executed successfully!', { id: 'trade' });
      return result;
    } catch (error: any) {
      toast.error(error.message || 'Failed to execute trade', { id: 'trade' });
      throw error;
    } finally {
      setIsExecuting(false);
    }
  };

  return {
    address,
    signer,
    connectWallet,
    executeTrade: executeTradeSafely,
    isConnected: !!address,
    isExecuting
  };
}