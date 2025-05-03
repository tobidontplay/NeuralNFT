import React, { createContext, useState, useContext, ReactNode } from 'react';
import { WalletState } from '../types/types';

interface WalletContextType {
  wallet: WalletState;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  isConnecting: boolean;
}

const defaultWalletState: WalletState = {
  connected: false,
  address: null,
  balance: 0,
};

const WalletContext = createContext<WalletContextType>({
  wallet: defaultWalletState,
  connectWallet: async () => {},
  disconnectWallet: () => {},
  isConnecting: false,
});

export const useWallet = () => useContext(WalletContext);

interface WalletProviderProps {
  children: ReactNode;
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const [wallet, setWallet] = useState<WalletState>(defaultWalletState);
  const [isConnecting, setIsConnecting] = useState(false);

  const connectWallet = async () => {
    setIsConnecting(true);
    
    // Simulate wallet connection delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Generate random wallet address and balance
    const mockAddress = '0x' + Math.random().toString(16).substring(2, 42);
    const mockBalance = parseFloat((Math.random() * 5 + 1).toFixed(4));
    
    setWallet({
      connected: true,
      address: mockAddress,
      balance: mockBalance,
    });
    
    setIsConnecting(false);
  };

  const disconnectWallet = () => {
    setWallet(defaultWalletState);
  };

  return (
    <WalletContext.Provider value={{ wallet, connectWallet, disconnectWallet, isConnecting }}>
      {children}
    </WalletContext.Provider>
  );
};