export function getEthereum() {
  if (typeof window !== 'undefined' && window.ethereum) {
    return window.ethereum;
  }
  return null;
}

export function isMetaMaskInstalled() {
  const ethereum = getEthereum();
  return ethereum?.isMetaMask || false;
}

export async function switchNetwork(chainId: number): Promise<void> {
  const ethereum = getEthereum();
  if (!ethereum) throw new Error('No ethereum provider found');

  try {
    await ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: `0x${chainId.toString(16)}` }],
    });
  } catch (error: any) {
    if (error.code === 4902) {
      throw new Error('This network needs to be added to your wallet first');
    }
    throw new Error(`Failed to switch network: ${error.message}`);
  }
}