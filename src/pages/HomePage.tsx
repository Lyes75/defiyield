import React, { useState } from 'react';
import { PageTitle } from '../components/Layout/PageTitle';
import { OpportunityList } from '../components/Arbitrage/OpportunityList';
import { TransactionModal } from '../components/Wallet/TransactionModal';
import { useArbitrageData } from '../hooks/useArbitrageData';
import { useWalletConnection } from '../hooks/useWalletConnection';
import { useTransaction } from '../hooks/useTransaction';
import { ArbitrageOpportunity } from '../types';
import toast from 'react-hot-toast';

export function HomePage() {
  const { opportunities } = useArbitrageData();
  const { isConnected, signer } = useWalletConnection();
  const { executeTransaction, transactionSteps, isPending } = useTransaction();
  const [showTransactionModal, setShowTransactionModal] = useState(false);

  const handleExecuteTrade = async (opportunity: ArbitrageOpportunity) => {
    if (!isConnected || !signer) {
      toast.error('Please connect your wallet first');
      return;
    }

    setShowTransactionModal(true);
    try {
      await executeTransaction(
        `${opportunity.token.symbol} arbitrage: ${opportunity.sourceChain.name} → ${opportunity.targetChain.name}`,
        async () => {
          const tx = await signer.sendTransaction({
            to: opportunity.token.address[opportunity.sourceChain.id],
            value: 0,
            data: '0x',
          });
          return tx;
        },
        opportunity.sourceChain.id,
        true
      );
      
      toast.success('Trade executed successfully!');
    } catch (error: any) {
      console.error('Trade execution failed:', error);
      if (error.code !== 4001) {
        toast.error('Failed to execute trade');
      }
    } finally {
      setShowTransactionModal(false);
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <PageTitle
        title="Inter-Chain Arbitrage Optimizer"
        subtitle="Discover and execute profitable arbitrage opportunities across multiple chains with real-time price monitoring and automated execution."
      />

      <OpportunityList
        opportunities={opportunities}
        onExecute={handleExecuteTrade}
        isExecuting={isPending}
      />

      <TransactionModal
        isOpen={showTransactionModal}
        steps={transactionSteps}
        onClose={() => setShowTransactionModal(false)}
      />
    </main>
  );
}