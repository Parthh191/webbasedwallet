'use client';
import { useState } from 'react';
import { useWallet } from '@/contexts/WalletContext';
import { ArrowUpRight, ArrowDownLeft } from 'lucide-react';

export default function History() {
  const { wallets } = useWallet();
  const [selectedWallet, setSelectedWallet] = useState('all');

  // Mockup transactions - replace with real data later
  const transactions = [
    {
      id: '1',
      type: 'send',
      amount: '0.1',
      currency: 'SOL',
      address: '8xzt3...7xyz',
      timestamp: new Date().toISOString(),
      status: 'completed',
      walletId: 'sol_123'
    },
    // Add more mock transactions as needed
  ];

  return (
    <div className="ml-64 p-8">
      <h1 className="text-2xl font-bold mb-8 text-[var(--text-primary)]">Transaction History</h1>

      <div className="mb-6">
        <select
          value={selectedWallet}
          onChange={(e) => setSelectedWallet(e.target.value)}
          className="bg-[var(--input-background)] border border-[var(--border-color)] rounded-lg px-4 py-2 text-[var(--text-primary)] w-64"
        >
          <option value="all">All Wallets</option>
          {wallets.map(wallet => (
            <option key={wallet.id} value={wallet.id}>
              {wallet.type} - {wallet.publicKey.slice(0, 6)}...
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-4">
        {transactions
          .filter(tx => selectedWallet === 'all' || tx.walletId === selectedWallet)
          .map(tx => (
            <div key={tx.id} 
              className="card rounded-xl p-4 flex items-center justify-between hover:border-blue-400/30 transition-all duration-200"
            >
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-full ${
                  tx.type === 'send' 
                    ? 'bg-red-500/10 text-red-500' 
                    : 'bg-green-500/10 text-green-500'
                }`}>
                  {tx.type === 'send' ? 
                    <ArrowUpRight className="w-5 h-5" /> : 
                    <ArrowDownLeft className="w-5 h-5" />
                  }
                </div>
                <div>
                  <p className="font-medium capitalize text-[var(--text-primary)]">
                    {tx.type}
                  </p>
                  <p className="text-sm text-[var(--text-secondary)] font-mono">
                    {tx.address}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-medium ${
                  tx.type === 'send' ? 'text-red-500' : 'text-green-500'
                }`}>
                  {tx.type === 'send' ? '-' : '+'}{tx.amount} {tx.currency}
                </p>
                <p className="text-sm text-[var(--text-secondary)]">
                  {new Date(tx.timestamp).toLocaleString()}
                </p>
              </div>
            </div>
          ))}

        {transactions.length === 0 && (
          <div className="text-center py-16 card rounded-xl">
            <p className="text-[var(--text-secondary)] text-lg">
              No transactions found
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
