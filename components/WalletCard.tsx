'use client';
import { useWallet } from '@/contexts/WalletContext';
import { formatCurrency } from '@/utils/currency';

export function WalletCard({ balance }: { balance: string }) {
  const { settings } = useWallet();

  return (
    <div className="bg-card p-6 rounded-xl border border-[var(--border-color)]">
      <h3 className="text-lg font-semibold mb-2">Balance</h3>
      <p className="text-2xl font-bold">
        {formatCurrency(parseFloat(balance), settings.currency)}
      </p>
    </div>
  );
}
