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
      <h1 className="text-2xl font-bold mb-8">Transaction History</h1>

      <div className="mb-6">
        <select
          value={selectedWallet}
          onChange={(e) => setSelectedWallet(e.target.value)}
          className="bg-[#111111] border border-gray-800 rounded-lg px-4 py-2"
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
            <div key={tx.id} className="bg-[#111111] p-4 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-full ${tx.type === 'send' ? 'bg-red-500/20' : 'bg-green-500/20'}`}>
                  {tx.type === 'send' ? 
                    <ArrowUpRight className="text-red-500" /> : 
                    <ArrowDownLeft className="text-green-500" />
                  }
                </div>
                <div>
                  <p className="font-medium capitalize">{tx.type}</p>
                  <p className="text-sm text-gray-400">{tx.address}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">
                  {tx.type === 'send' ? '-' : '+'}{tx.amount} {tx.currency}
                </p>
                <p className="text-sm text-gray-400">
                  {new Date(tx.timestamp).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
