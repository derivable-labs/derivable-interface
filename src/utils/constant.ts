export const WALLET_CONNECTOR = 'web3connector';
export const LS_THEME = 'theme';
export const DEFAULT_APP_PATH = '/';
export const THEME_SUPPORTED = ['light', 'dark']
export const SELECTED_NETWORK_LOCAL_STORAGE_KEY = 'selected_network'

export const LOCAL_NETWORK = 31337
export const BSC_NETWORK = 56

export const CHAINS = {
  [LOCAL_NETWORK]: 'Local network',
  [BSC_NETWORK]: 'BSC'
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
    chainId: "0x" + LOCAL_NETWORK.toString(16),
    chainName: "BNB Chain",
    nativeCurrency: {
      name: "ETH",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: 'https://bsc-dataseed.binance.org/',
    blockExplorerUrls: ["https://snowtrace.io/"],
  },
};


export const NETWORK_SUPPORTED = {
  [BSC_NETWORK]: {
    chainId: BSC_NETWORK,
    name: 'BNB Chain',
    fullname: 'BNB Chain',
    logo: '56.svg',
    explorer: "https://bscscan.com/",
    nativeTokenSymbol: 'BNB'
  },
  [LOCAL_NETWORK]: {
    chainId: LOCAL_NETWORK,
    name: 'Local Chain',
    fullname: 'Local Chain',
    logo: '31337.svg',
    explorer: "https://bscscan.com/",
    nativeTokenSymbol: 'ETH'
  },
}
