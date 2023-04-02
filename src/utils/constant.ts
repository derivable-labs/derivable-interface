export const WALLET_CONNECTOR = 'web3connector';
export const LS_THEME = 'theme';
export const DEFAULT_APP_PATH = '/';
export const THEME_SUPPORTED = ['light', 'dark']
export const SELECTED_NETWORK_LOCAL_STORAGE_KEY = 'selected_network'

export const ARBITRUM_NETWORK = 42161
export const LOCAL_NETWORK = 31337
export const BSC_NETWORK = 56
export const BSC_TESTNET_NETWORK = 97

export const DEFAULT_CHAIN = ARBITRUM_NETWORK
export const CHAIN_IDS = [ARBITRUM_NETWORK, BSC_NETWORK, BSC_TESTNET_NETWORK, LOCAL_NETWORK]

export const CHAINS = {
  [ARBITRUM_NETWORK]: 'Arbitrum',
  [BSC_NETWORK]: 'BSC',
  [BSC_TESTNET_NETWORK]: 'BSC test',
  [LOCAL_NETWORK]: 'Local network'
}

export const NETWORK_METADATA = {
  [LOCAL_NETWORK]: {
    chainId: "0x" + LOCAL_NETWORK.toString(16),
    chainName: "Local Chain",
    nativeCurrency: {
      name: "ETH",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: 'http://localhost:8545/',
    blockExplorerUrls: ["https://snowtrace.io/"],
  },
  [BSC_NETWORK]: {
    chainId: "0x" + BSC_NETWORK.toString(16),
    chainName: "BNB Chain",
    nativeCurrency: {
      name: "BNB",
      symbol: "BNB",
      decimals: 18,
    },
    rpcUrls: 'https://bsc-dataseed.binance.org/',
    blockExplorerUrls: ["https://snowtrace.io/"],
  },
  [ARBITRUM_NETWORK]: {
    chainId: "0x" + ARBITRUM_NETWORK.toString(16),
    chainName: "Arbitrum",
    nativeCurrency: {
      name: "ETH",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: 'https://arb1.arbitrum.io/rpc',
    blockExplorerUrls: ["https://testnet.bscscan.com"],
  },
  [BSC_TESTNET_NETWORK]: {
    chainId: "0x" + BSC_TESTNET_NETWORK.toString(16),
    chainName: "BNB Testnet",
    nativeCurrency: {
      name: "BNBt",
      symbol: "BNBt",
      decimals: 18,
    },
    rpcUrls: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
    blockExplorerUrls: ["https://testnet.bscscan.com"],
  },
};


export const NETWORK_SUPPORTED = {
  [ARBITRUM_NETWORK]: {
    chainId: ARBITRUM_NETWORK,
    name: 'Arbitrum',
    fullname: 'Arbitrum',
    key: 'arbitrum',
    logo: '42161.svg',
    explorer: "https://arbiscan.io/",
    nativeTokenSymbol: 'ETH'
  },
  [BSC_NETWORK]: {
    chainId: BSC_NETWORK,
    name: 'BNB Chain',
    fullname: 'BNB Chain',
    key: 'bsc',
    logo: '56.svg',
    explorer: "https://bscscan.com/",
    nativeTokenSymbol: 'BNB'
  },
  [BSC_TESTNET_NETWORK]: {
    chainId: BSC_TESTNET_NETWORK,
    name: 'BNB Testnet',
    fullname: 'BNB Testnet',
    key: 'bsc-test',
    logo: '56.svg',
    explorer: "https://testnet.bscscan.com",
    nativeTokenSymbol: 'BNBt'
  },
  [LOCAL_NETWORK]: {
    chainId: LOCAL_NETWORK,
    name: 'Local Chain',
    fullname: 'Local Chain',
    key: 'local',
    logo: '31337.svg',
    explorer: "https://bscscan.com/",
    nativeTokenSymbol: 'ETH'
  },
}
