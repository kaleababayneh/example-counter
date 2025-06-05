export interface AppConfig {
  nodeUrl: string;
  indexerUrl: string;
  proofServerUrl: string;
  networkId: string;
}

export const getConfig = (): AppConfig => {
  return {
    nodeUrl: import.meta.env.VITE_NODE_URL || 'http://localhost:8080',
    indexerUrl: import.meta.env.VITE_INDEXER_URL || 'http://localhost:8081',
    proofServerUrl: import.meta.env.VITE_PROOF_SERVER_URL || 'http://localhost:6300',
    networkId: import.meta.env.VITE_NETWORK_ID || 'testnet',
  };
};
