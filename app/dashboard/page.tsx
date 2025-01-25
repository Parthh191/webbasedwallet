'use client';
import { useWallet } from '@/contexts/WalletContext';
import { WalletCard } from '@/components/WalletCard';

export default function Dashboard() {
  const { wallets } = useWallet();

  const totalBalance = wallets.reduce((sum, wallet) => 
    sum + parseFloat(wallet.balance), 0
  );

  return (
    <div className="ml-64 p-8">
      <h1 className="text-2xl font-bold mb-8">Dashboard</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <WalletCard balance={totalBalance.toString()} />
        {/* Other dashboard content */}
      </div>
    </div>
  );
}
