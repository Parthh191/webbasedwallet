'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { formatCurrency } from '@/utils/currency';

interface Wallet {
  id: string;
  type: 'solana' | 'ethereum';
  publicKey: string;
  privateKey: string;
  balance: string;
  createdAt: string;
}

interface WalletContextType {
  wallets: Wallet[];
  addWallet: (wallet: Wallet) => void;
  selectedWallet: Wallet | null;
  setSelectedWallet: (wallet: Wallet | null) => void;
  secretPhrase: string;
  settings: {
    currency: string;
    theme: string;
    autoLock: string;
  };
  updateSettings: (settings: { currency: string; theme: string; autoLock: string }) => void;
  lock: () => void;
  unlock: (phrase: string) => void;
  isLocked: boolean;
  formatWalletBalance: (balance: string) => string;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider = ({ children }: { children: React.ReactNode }) => {
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [selectedWallet, setSelectedWallet] = useState<Wallet | null>(null);
  const [secretPhrase, setSecretPhrase] = useState<string>('');
  const [isLocked, setIsLocked] = useState(true);
  const [settings, setSettings] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedSettings = localStorage.getItem('settings');
      return savedSettings ? JSON.parse(savedSettings) : {
        currency: 'USD',
        theme: 'dark',
        autoLock: '5'
      };
    }
    return {
      currency: 'USD',
      theme: 'dark',
      autoLock: '5'
    };
  });

  // Load wallets from localStorage on initial render
  useEffect(() => {
    try {
      const savedWallets = localStorage.getItem('wallets');
      if (savedWallets) {
        setWallets(JSON.parse(savedWallets));
      }
    } catch (error) {
      console.error('Error loading wallets:', error);
    }
  }, []);

  // Load initial settings
  useEffect(() => {
    if (settings.theme) {
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(settings.theme);
    }
  }, []);

  const addWallet = (wallet: Wallet) => {
    try {
      setWallets(prev => {
        const updated = [...prev, wallet];
        localStorage.setItem('wallets', JSON.stringify(updated));
        return updated;
      });
    } catch (error) {
      console.error('Error adding wallet:', error);
      throw new Error('Failed to add wallet');
    }
  };

  const updateSettings = (newSettings: { currency: string; theme: string; autoLock: string }) => {
    setSettings(newSettings);
    localStorage.setItem('settings', JSON.stringify(newSettings));
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(newSettings.theme);
  };

  const lock = () => {
    setIsLocked(true);
    setSecretPhrase('');
    setSelectedWallet(null);
  };

  const unlock = (phrase: string) => {
    setIsLocked(false);
    setSecretPhrase(phrase);
  };

  const formatWalletBalance = (balance: string) => {
    return formatCurrency(parseFloat(balance), settings.currency);
  };

  return (
    <WalletContext.Provider value={{
      wallets,
      addWallet,
      selectedWallet,
      setSelectedWallet,
      secretPhrase,
      settings,
      updateSettings,
      lock,
      unlock,
      isLocked,
      formatWalletBalance
    }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) throw new Error('useWallet must be used within WalletProvider');
  return context;
};

