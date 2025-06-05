import * as React from 'react';
import  { createContext, useContext, useState, useCallback } from 'react';
import type { Logger } from 'pino';

// Mock wallet types for now - these would normally come from the Midnight SDK
interface MockWallet {
  address?: string;
  isConnected: boolean;
}

interface WalletContextType {
  wallet: MockWallet;
  isConnecting: boolean;
  error?: string;
  connect: () => Promise<void>;
  disconnect: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

interface WalletProviderProps {
  children: React.ReactNode;
  logger: Logger;
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children, logger }) => {
  const [wallet, setWallet] = useState<MockWallet>({ isConnected: false });
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string>();

  const connect = useCallback(async () => {
    setIsConnecting(true);
    setError(undefined);
    
    try {
      // Mock connection - in real implementation this would use Midnight wallet APIs
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setWallet({
        isConnected: true,
        address: '0x1234...abcd' // Mock address
      });
      
      logger.info('Wallet connected successfully');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to connect wallet';
      setError(errorMessage);
      logger.error(err, 'Failed to connect wallet');
    } finally {
      setIsConnecting(false);
    }
  }, [logger]);

  const disconnect = useCallback(() => {
    setWallet({ isConnected: false });
    setError(undefined);
    logger.info('Wallet disconnected');
  }, [logger]);

  return (
    <WalletContext.Provider
      value={{
        wallet,
        isConnecting,
        error,
        connect,
        disconnect,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = (): WalletContextType => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};
