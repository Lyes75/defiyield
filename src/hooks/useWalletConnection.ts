import { useState, useCallback, useEffect } from 'react';
import { BrowserProvider, JsonRpcSigner } from 'ethers';
import toast from 'react-hot-toast';
import { getEthereum } from '../utils/ethereum';

export function useWalletConnection() {
  const [address, setAddress] = useState<string | null>(null);
  const [signer, setSigner] = useState<JsonRpcSigner | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check if wallet is already connected on mount
  useEffect(() => {
    const checkConnection = async () => {
      const ethereum = getEthereum();
      if (!ethereum) return;

      try {
        const provider = new BrowserProvider(ethereum);
        const accounts = await provider.listAccounts();
        
        if (accounts.length > 0) {
          const newSigner = await provider.getSigner();
          const newAddress = await newSigner.getAddress();
          
          setSigner(newSigner);
          setAddress(newAddress);
        }
      } catch (err) {
        console.error('Error checking wallet connection:', err);
      }
    };

    checkConnection();
  }, []);

  // Handle account changes
  useEffect(() => {
    const ethereum = getEthereum();
    if (!ethereum) return;

    const handleAccountsChanged = async (accounts: string[]) => {
      if (accounts.length === 0) {
        setAddress(null);
        setSigner(null);
        toast.error('Wallet disconnected');
      } else {
        const provider = new BrowserProvider(ethereum);
        const newSigner = await provider.getSigner();
        const newAddress = await newSigner.getAddress();
        
        setSigner(newSigner);
        setAddress(newAddress);
        toast.success('Wallet connected successfully!');
      }
    };

    ethereum.on('accountsChanged', handleAccountsChanged);
    return () => {
      ethereum.removeListener('accountsChanged', handleAccountsChanged);
    };
  }, []);

  const connectWallet = useCallback(async () => {
    const ethereum = getEthereum();
    
    if (!ethereum) {
      toast.error('Please install MetaMask to connect your wallet');
      return;
    }

    setIsConnecting(true);
    setError(null);

    try {
      const provider = new BrowserProvider(ethereum);
      await provider.send('eth_requestAccounts', []);
      const newSigner = await provider.getSigner();
      const newAddress = await newSigner.getAddress();
      
      setSigner(newSigner);
      setAddress(newAddress);
      toast.success('Wallet connected successfully!');
    } catch (err: any) {
      console.error('Error connecting wallet:', err);
      setError(err.message || 'Failed to connect wallet');
      toast.error(err.message || 'Failed to connect wallet');
    } finally {
      setIsConnecting(false);
    }
  }, []);

  return {
    address,
    signer,
    connectWallet,
    isConnecting,
    error,
    isConnected: !!address
  };
}