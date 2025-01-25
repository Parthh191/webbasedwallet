import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { WalletProvider } from '@/contexts/WalletContext';
import ClientLayout from './ClientLayout';
import "./globals.css";
import '@/styles/themes.css';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Web3 Wallet Dashboard",
  description: "Manage your Solana and Ethereum wallets",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <WalletProvider>
          <ClientLayout>{children}</ClientLayout>
        </WalletProvider>
      </body>
    </html>
  );
}
