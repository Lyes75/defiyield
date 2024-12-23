import React from 'react';
import { Wallet } from 'lucide-react';
import { Button } from '../UI/Button';
import { truncateAddress } from '../../utils/formatting';
import { useWalletConnection } from '../../hooks/useWalletConnection';

export function ConnectButton() {
  const { address, connectWallet, isConnecting } = useWalletConnection();

  return (
    <Button
      onClick={connectWallet}
      leftIcon={Wallet}
      variant="primary"
      disabled={isConnecting}
    >
      {isConnecting ? 'Connecting...' : 
       address ? truncateAddress(address) : 
       'Connect Wallet'}
    </Button>
  );
}