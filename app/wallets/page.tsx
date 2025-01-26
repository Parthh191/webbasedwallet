'use client';
import { useWallet } from '@/contexts/WalletContext';
import Image from 'next/image';
import { useState } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

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
      <h1 className="text-2xl font-bold mb-8 text-[var(--text-primary)]">My Wallets</h1>
      
      <div className="grid grid-cols-1 gap-6">
        {wallets.map(wallet => (
          <div key={wallet.id} className="card rounded-xl p-6 hover:border-blue-400/30 transition-all duration-200">
            <div className="flex items-center gap-3 mb-6">
              <Image 
                src={`/images/${wallet.type}-logo.svg`}
                alt={wallet.type}
                width={28}
                height={28}
                className="rounded-full bg-[var(--background-secondary)] p-1"
              />
              <h2 className="text-xl font-bold capitalize text-[var(--text-primary)]">
                {wallet.type} Wallet
              </h2>
            </div>

            <div className="space-y-5">
              {/* Wallet ID */}
              <div>
                <label className="text-[var(--text-secondary)] text-sm font-medium mb-1 block">
                  Wallet ID
                </label>
                <p className="font-mono bg-[var(--input-background)] p-3 rounded-lg border border-[var(--border-color)]">
                  {wallet.id}
                </p>
              </div>

              {/* Public Key */}
              <div>
                <label className="text-[var(--text-secondary)] text-sm font-medium mb-1 block">
                  Public Key
                </label>
                <p className="font-mono bg-[var(--input-background)] p-3 rounded-lg border border-[var(--border-color)] break-all">
                  {wallet.publicKey}
                </p>
              </div>

              {/* Private Key */}
              <div>
                <label className="text-[var(--text-secondary)] text-sm font-medium mb-1 block">
                  Private Key
                </label>
                <div className="relative">
                  <p className="font-mono bg-[var(--input-background)] p-3 rounded-lg border border-[var(--border-color)] break-all">
                    {showPrivateKey[wallet.id] ? wallet.privateKey : '••••••••••••••••'}
                  </p>
                  <button
                    onClick={() => togglePrivateKey(wallet.id)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                    aria-label={showPrivateKey[wallet.id] ? 'Hide private key' : 'Show private key'}
                  >
                    {showPrivateKey[wallet.id] ? (
                      <EyeSlashIcon className="w-5 h-5" />
                    ) : (
                      <EyeIcon className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Balance */}
              <div>
                <label className="text-[var(--text-secondary)] text-sm font-medium mb-1 block">
                  Balance
                </label>
                <p className="font-mono bg-[var(--input-background)] p-3 rounded-lg border border-[var(--border-color)]">
                  {wallet.balance} {wallet.type === 'solana' ? 'SOL' : 'ETH'}
                </p>
              </div>

              {/* Created Date */}
              <div>
                <label className="text-[var(--text-secondary)] text-sm font-medium mb-1 block">
                  Created
                </label>
                <p className="font-mono bg-[var(--input-background)] p-3 rounded-lg border border-[var(--border-color)]">
                  {new Date(wallet.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        ))}

        {wallets.length === 0 && (
          <div className="text-center py-16 card rounded-xl">
            <p className="text-[var(--text-secondary)] text-lg">No wallets created yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
