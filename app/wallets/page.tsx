'use client';
import { useWallet } from '@/contexts/WalletContext';
import Image from 'next/image';
import { useState } from 'react';

export default function Wallets() {
  const { wallets } = useWallet();
  const [showPrivateKey, setShowPrivateKey] = useState<Record<string, boolean>>({});

  const togglePrivateKey = (walletId: string) => {
    setShowPrivateKey(prev => ({
      ...prev,
      [walletId]: !prev[walletId]
    }));
  };

  return (
    <div className="ml-64 p-8">
      <h1 className="text-2xl font-bold mb-8">My Wallets</h1>
      
      <div className="grid grid-cols-1 gap-6">
        {wallets.map(wallet => (
          <div key={wallet.id} className="bg-[#111111] rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Image 
                src={`/images/${wallet.type}-logo.svg`}
                alt={wallet.type}
                width={24}
                height={24}
              />
              <h2 className="text-xl font-bold capitalize">{wallet.type} Wallet</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-gray-400 text-sm">Wallet ID:</label>
                <p className="font-mono bg-[#1a1a1a] p-2 rounded mt-1">{wallet.id}</p>
              </div>

              <div>
                <label className="text-gray-400 text-sm">Public Key:</label>
                <p className="font-mono bg-[#1a1a1a] p-2 rounded mt-1 break-all">
                  {wallet.publicKey}
                </p>
              </div>

              <div>
                <label className="text-gray-400 text-sm">Private Key:</label>
                <div className="relative">
                  <p className="font-mono bg-[#1a1a1a] p-2 rounded mt-1 break-all">
                    {showPrivateKey[wallet.id] ? wallet.privateKey : '••••••••••••••••'}
                  </p>
                  <button
                    onClick={() => togglePrivateKey(wallet.id)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-blue-400 hover:text-blue-300"
                  >
                    {showPrivateKey[wallet.id] ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>

              <div>
                <label className="text-gray-400 text-sm">Balance:</label>
                <p className="font-mono bg-[#1a1a1a] p-2 rounded mt-1">
                  {wallet.balance} {wallet.type === 'solana' ? 'SOL' : 'ETH'}
                </p>
              </div>

              <div>
                <label className="text-gray-400 text-sm">Created:</label>
                <p className="font-mono bg-[#1a1a1a] p-2 rounded mt-1">
                  {new Date(wallet.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        ))}

        {wallets.length === 0 && (
          <div className="text-center py-12 bg-[#111111] rounded-xl">
            <p className="text-gray-400">No wallets created yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
