import Link from 'next/link';
import { Home, Wallet, Settings, History } from 'lucide-react';

export default function Sidebar() {
  return (
    <div className="w-64 sidebar h-screen fixed left-0 top-0 p-6">
      <div className="flex flex-col h-full">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Web3 Wallet</h1>
        </div>
        
        <nav className="flex-1">
          <ul className="space-y-4">
            <li>
              <Link href="/" className="nav-link flex items-center space-x-3 p-2 rounded-lg">
                <Home size={20} />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link href="/wallets" className="nav-link flex items-center space-x-3 p-2 rounded-lg">
                <Wallet size={20} />
                <span>Wallets</span>
              </Link>
            </li>
            <li>
              <Link href="/history" className="nav-link flex items-center space-x-3 p-2 rounded-lg">
                <History size={20} />
                <span>History</span>
              </Link>
            </li>
            <li>
              <Link href="/settings" className="nav-link flex items-center space-x-3 p-2 rounded-lg">
                <Settings size={20} />
                <span>Settings</span>
              </Link>
            </li>
          </ul>
        </nav>

        <div className="border-t border-[var(--border-color)] pt-4">
          <div className="text-[var(--text-secondary)]">
            <p>Connected Address:</p>
            <p className="font-mono text-xs truncate">Not Connected</p>
          </div>
        </div>
      </div>
    </div>
  );
}
