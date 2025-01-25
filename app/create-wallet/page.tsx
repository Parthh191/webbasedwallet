'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useWallet } from '@/contexts/WalletContext';
import * as web3 from '@solana/web3.js';
import { ethers } from 'ethers';
import Image from 'next/image';

export default function CreateWallet() {
  const router = useRouter();
  const { addWallet } = useWallet();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const createSolanaWallet = async () => {
    setIsLoading(true);
    setError('');
    try {
      if (!window.crypto) {
        throw new Error('Crypto API not available');
      }
      
      const keypair = web3.Keypair.generate();
      const wallet = {
        id: `sol_${Date.now()}`,
        type: 'solana' as const,
        publicKey: keypair.publicKey.toString(),
        privateKey: Buffer.from(keypair.secretKey).toString('hex'),
        balance: '0',
        createdAt: new Date().toISOString()
      };
      
      // Add wallet to context
      addWallet(wallet);
      router.push('/wallets');
    } catch (error) {
      console.error('Error creating Solana wallet:', error);
      setError('Failed to create Solana wallet');
    } finally {
      setIsLoading(false);
    }
  };

  const createEthereumWallet = async () => {
    setIsLoading(true);
    setError('');
    try {
      if (!window.crypto) {
        throw new Error('Crypto API not available');
      }
      
      const wallet = ethers.Wallet.createRandom();
      const newWallet = {
        id: `eth_${Date.now()}`,
        type: 'ethereum' as const,
        publicKey: wallet.address,
        privateKey: wallet.privateKey,
        balance: '0',
        createdAt: new Date().toISOString()
      };
      
      // Add wallet to context
      addWallet(newWallet);
      router.push('/wallets');
    } catch (error) {
      console.error('Error creating Ethereum wallet:', error);
      setError('Failed to create Ethereum wallet');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="ml-64 p-8">
      <h1 className="text-2xl font-bold mb-8">Create New Wallet</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <button
          onClick={createSolanaWallet}
          disabled={isLoading}
          className="bg-[#111111] rounded-xl p-6 hover:bg-[#191919] transition-colors text-left"
        >
          <div className="flex items-center gap-3 mb-4">
            <Image src="/images/solana-logo.svg" alt="Solana" width={24} height={24} />
            <h2 className="text-xl font-bold">Solana Wallet</h2>
          </div>
          <p className="text-gray-400 mb-4">Create a new Solana blockchain wallet</p>
          <span className="inline-block bg-purple-600 text-white px-6 py-2 rounded-lg">
            {isLoading ? 'Creating...' : 'Create Wallet'}
          </span>
        </button>

        <button
          onClick={createEthereumWallet}
          disabled={isLoading}
          className="bg-[#111111] rounded-xl p-6 hover:bg-[#191919] transition-colors text-left"
        >
          <div className="flex items-center gap-3 mb-4">
            <Image src="/images/ethereum-logo.svg" alt="Ethereum" width={24} height={24} />
            <h2 className="text-xl font-bold">Ethereum Wallet</h2>
          </div>
          <p className="text-gray-400 mb-4">Create a new Ethereum blockchain wallet</p>
          <span className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg">
            {isLoading ? 'Creating...' : 'Create Wallet'}
          </span>
        </button>
      </div>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}
