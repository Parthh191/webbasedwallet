'use client';
import { useState, useEffect } from 'react';
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { useWallet } from '@/contexts/WalletContext';

export default function Home() {
  const router = useRouter();
  const { wallets } = useWallet(); // Add this line to get wallets from context
  const [secretPhrase, setSecretPhrase] = useState('');
  const [hasExistingPhrase, setHasExistingPhrase] = useState(false);
  const [userInputPhrase, setUserInputPhrase] = useState('');
  const [showPhraseInput, setShowPhraseInput] = useState(false);

  // Calculate total balance
  const totalBalance = wallets.reduce((sum, wallet) => {
    return sum + parseFloat(wallet.balance || '0');
  }, 0);

  // Count unique networks
  const uniqueNetworks = new Set(wallets.map(wallet => wallet.type)).size;

  useEffect(() => {
    const existingPhrase = localStorage.getItem('secretPhrase');
    if (existingPhrase) {
      setHasExistingPhrase(true);
      setSecretPhrase(existingPhrase);
    }
  }, []);

  const handleSetSecretPhrase = () => {
    if (userInputPhrase.trim().length > 0) {
      setSecretPhrase(userInputPhrase);
      localStorage.setItem('secretPhrase', userInputPhrase);
      setHasExistingPhrase(true);
      setShowPhraseInput(false);
    }
  };

  const generateSecretPhrase = () => {
    const words = [
      "abandon", "ability", "able", "about", "above", "absent",
      "absorb", "abstract", "absurd", "abuse", "access", "accident"
    ];
    const phrase = Array(12).fill(0).map(() => 
      words[Math.floor(Math.random() * words.length)]
    ).join(' ');
    setSecretPhrase(phrase);
    localStorage.setItem('secretPhrase', phrase);
    setHasExistingPhrase(true);
  };

  return (
    <div className="ml-64"> {/* Offset for sidebar */}
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome to Web3 Wallet</h1>
          <p className="text-gray-400">Manage your crypto assets securely</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-[var(--card-background)] p-6 rounded-xl border border-[var(--border-color)]">
            <h3 className="text-lg font-semibold mb-2">Total Balance</h3>
            <p className="text-2xl font-bold">${totalBalance.toFixed(2)}</p>
          </div>
          <div className="bg-[var(--card-background)] p-6 rounded-xl border border-[var(--border-color)]">
            <h3 className="text-lg font-semibold mb-2">Active Wallets</h3>
            <p className="text-2xl font-bold">{wallets.length}</p>
          </div>
          <div className="bg-[var(--card-background)] p-6 rounded-xl border border-[var(--border-color)]">
            <h3 className="text-lg font-semibold mb-2">Networks</h3>
            <p className="text-2xl font-bold">{uniqueNetworks}</p>
          </div>
        </div>

        <div className="bg-[var(--card-background)] rounded-xl p-6 border border-[var(--border-color)]">
          <h2 className="text-xl font-bold mb-4">Create New Wallet</h2>
          
          {!hasExistingPhrase ? (
            <div className="mb-4">
              {showPhraseInput ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={userInputPhrase}
                    onChange={(e) => setUserInputPhrase(e.target.value)}
                    placeholder="Enter your secret phrase"
                    className="w-full p-2 rounded bg-[var(--input-background)] border border-[var(--border-color)]"
                  />
                  <button 
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={handleSetSecretPhrase}
                  >
                    Set Secret Phrase
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <button 
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={generateSecretPhrase}
                  >
                    Generate Secret Phrase
                  </button>
                  <button 
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-2"
                    onClick={() => setShowPhraseInput(true)}
                  >
                    Use My Own Phrase
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="mb-4 p-4 bg-[var(--card-background)] rounded border border-[var(--border-color)]">
              <p className="text-emerald-500 font-semibold flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 116 0z" clipRule="evenodd" />
                </svg>
                Secret phrase is set and locked
              </p>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">Your phrase: {secretPhrase}</p>
            </div>
          )}

          {hasExistingPhrase && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button 
                className="flex items-center justify-center space-x-2 bg-[var(--input-background)] hover:bg-[var(--hover-background)] p-4 rounded-lg border border-[var(--border-color)]"
                onClick={() => router.push('/create-wallet')}
              >
                <Image src="/images/solana-logo.svg" alt="Solana" width={24} height={24} />
                <span>Create Solana Wallet</span>
              </button>
              <button 
                className="flex items-center justify-center space-x-2 bg-[var(--input-background)] hover:bg-[var(--hover-background)] p-4 rounded-lg border border-[var(--border-color)]"
                onClick={() => router.push('/create-wallet')}
              >
                <Image src="/images/ethereum-logo.svg" alt="Ethereum" width={24} height={24} />
                <span>Create Ethereum Wallet</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
