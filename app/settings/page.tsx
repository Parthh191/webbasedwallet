'use client';
import { useState, useEffect } from 'react';
import { useWallet } from '@/contexts/WalletContext';
import '@/styles/themes.css';

export default function Settings() {
  const { settings, updateSettings, secretPhrase, lock } = useWallet();
  const [currency, setCurrency] = useState(settings.currency);
  const [theme, setTheme] = useState(settings.theme);
  const [autoLock, setAutoLock] = useState(settings.autoLock);

  // Apply theme when it changes
  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
    document.body.className = `theme-${theme}`;
  }, [theme]);

  // Auto-lock timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    const resetTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        lock();
      }, parseInt(autoLock) * 60 * 1000);
    };

    const events = ['mousedown', 'keydown', 'mousemove', 'touchstart'];
    events.forEach(event => document.addEventListener(event, resetTimer));
    resetTimer();

    return () => {
      clearTimeout(timer);
      events.forEach(event => document.removeEventListener(event, resetTimer));
    };
  }, [autoLock, lock]);

  const handleSaveSettings = () => {
    updateSettings({ currency, theme, autoLock });
    alert('Settings saved successfully!');
  };

  return (
    <div className="ml-64 p-8">
      <h1 className="text-2xl font-bold mb-8">Settings</h1>

      <div className="max-w-2xl space-y-6">
        <div className="bg-card p-6 rounded-xl border border-solid border-[var(--border-color)]">
          <h2 className="text-xl font-semibold mb-4">General Settings</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Display Currency</label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="bg-[#1a1a1a] border border-gray-800 rounded w-full p-2"
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Theme</label>
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="bg-[#1a1a1a] border border-gray-800 rounded w-full p-2"
              >
                <option value="dark">Dark</option>
                <option value="light">Light</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Auto-lock Timer (minutes)</label>
              <select
                value={autoLock}
                onChange={(e) => setAutoLock(e.target.value)}
                className="bg-[#1a1a1a] border border-gray-800 rounded w-full p-2"
              >
                <option value="1">1 minute</option>
                <option value="5">5 minutes</option>
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-card p-6 rounded-xl border border-solid border-[var(--border-color)]">
          <h2 className="text-xl font-semibold mb-4">Security</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Secret Recovery Phrase</label>
              <div className="bg-[#1a1a1a] p-4 rounded border border-gray-800">
                <p className="font-mono text-sm break-all">{secretPhrase || 'Not set'}</p>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={handleSaveSettings}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
}
