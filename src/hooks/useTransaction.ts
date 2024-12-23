import { useState } from 'react';
import { useTransactionStatus } from './useTransactionStatus';
import { useWalletConnection } from './useWalletConnection';
import toast from 'react-hot-toast';
import { switchNetwork } from '../utils/ethereum';

interface TransactionSteps {
  approval: boolean;
  transaction: boolean;
  confirmation: boolean;
}

export function useTransaction() {
  const { addTransaction } = useTransactionStatus();
  const { signer } = useWalletConnection();
  const [steps, setSteps] = useState<TransactionSteps>({
    approval: false,
    transaction: false,
    confirmation: false,
  });
  const [isPending, setIsPending] = useState(false);

  const executeTransaction = async (
    description: string,
    transactionFn: () => Promise<{ hash: string }>,
    chainId?: number,
    requiresApproval = true
  ) => {
    if (!signer) {
      throw new Error('No wallet connected');
    }

    setIsPending(true);
    setSteps({ approval: false, transaction: false, confirmation: false });

    try {
      // Switch network if needed
      if (chainId) {
        await switchNetwork(chainId);
      }

      if (requiresApproval) {
        toast.loading('Waiting for approval...', { id: 'approval' });
        setSteps(prev => ({ ...prev, approval: true }));
        
        // Simulate token approval
        const approvalTx = await signer.sendTransaction({
          to: '0x0000000000000000000000000000000000000000',
          value: 0,
          data: '0x',
        });
        await approvalTx.wait();
        
        toast.success('Approved!', { id: 'approval' });
      }

      toast.loading('Confirm transaction in wallet...', { id: 'transaction' });
      setSteps(prev => ({ ...prev, transaction: true }));
      
      const { hash } = await transactionFn();
      
      toast.loading('Transaction submitted...', { id: 'transaction' });
      setSteps(prev => ({ ...prev, confirmation: true }));

      addTransaction({
        hash,
        description,
        status: 'pending'
      });

      // Wait for transaction confirmation
      const provider = signer.provider;
      await provider.waitForTransaction(hash);
      
      addTransaction({
        hash,
        description,
        status: 'confirmed'
      });
      
      toast.success('Transaction confirmed!', { id: 'transaction' });
      return hash;
    } catch (error: any) {
      console.error('Transaction failed:', error);
      toast.error(error.message || 'Transaction failed', { id: 'transaction' });
      
      if (error.code === 4001) {
        toast.error('Transaction rejected by user');
      } else if (error.code === -32603) {
        toast.error('Internal error. Please try again.');
      }
      
      throw error;
    } finally {
      setIsPending(false);
      setSteps({ approval: false, transaction: false, confirmation: false });
    }
  };

  return {
    executeTransaction,
    transactionSteps: steps,
    isPending
  };
}