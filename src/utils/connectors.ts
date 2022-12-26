import { InjectedConnector } from '@web3-react/injected-connector'
import { NetworkConnector } from '@web3-react/network-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { WalletLinkConnector } from '@web3-react/walletlink-connector'
import { FrameConnector } from '@web3-react/frame-connector';
import { AuthereumConnector } from '@web3-react/authereum-connector'
import { TorusConnector } from '@web3-react/torus-connector'
import { FortmaticConnector } from '@web3-react/fortmatic-connector';
import { MagicConnector } from '@web3-react/magic-connector';
import { PortisConnector } from '@web3-react/portis-connector';
import { LedgerConnector } from '@web3-react/ledger-connector';
import {ARBITRUM_NETWORK, BSC_NETWORK, BSC_TESTNET_NETWORK, CHAINS, DEFAULT_CHAIN, LOCAL_NETWORK} from "./constant";

const LEDGE_POLLING_INTERVAL = 12000;

const RPC_URLS: { [chainId: number]: string } = {
  [BSC_NETWORK]: 'https://bsc-dataseed.binance.org/' as string,
  [ARBITRUM_NETWORK]: 'https://arb1.arbitrum.io/rpc' as string,
  [LOCAL_NETWORK]: 'http://localhost:8545/' as string,
  [BSC_TESTNET_NETWORK]: 'https://data-seed-prebsc-1-s1.binance.org:8545/' as string
}

const injected = {
    connector: new InjectedConnector({
        supportedChainIds: Object.keys(CHAINS).map(e => Number(e))
    }),
    image: '/images/metamask.svg',
    title: 'Metamask',
    desc: 'Connect to your Metamask Wallet'
}

const network = {
    connector: new NetworkConnector({
        urls: RPC_URLS,
        defaultChainId: DEFAULT_CHAIN
    }),
    image: '/images/walletconnect.svg',
    title: 'WalletConnect',
    desc: 'Scan with WalletConnect to connect'
}

const walletconnect = {
    connector: new WalletConnectConnector({
        rpc: RPC_URLS,
        qrcode: true,
    }),
    image: '/images/walletconnect.svg',
    title: 'WalletConnect',
    desc: 'Scan with WalletConnect to connect'
}

const walletlink = {
    connector: new WalletLinkConnector({
        url: RPC_URLS[DEFAULT_CHAIN],
        appName: 'web3-react example',
        supportedChainIds: Object.keys(CHAINS).map(e => Number(e))
    }),
    image: '/images/coinbase.svg',
    title: 'Coinbase',
    desc: 'Connect to your Coinbase Wallet'
}


const authereum = {
  connector: new AuthereumConnector({ chainId: DEFAULT_CHAIN }),
  image: '/images/authereum.svg',
  title: 'Authereum',
  desc: 'Connect with your Authereum account'
}

const torus = {
  connector: new TorusConnector({ chainId: DEFAULT_CHAIN }),
  image: '/images/torus.svg',
  title: 'Torus',
  desc: 'Connect with your Torus account'
}
const fortmatic = {
  connector: new FortmaticConnector({
    chainId: 4,
    apiKey: process.env.REACT_APP_FORTMATIC_API_KEY as string,
  }),
  image: '/images/fortmatic.svg',
  title: 'Fortmatic',
  desc: 'Connect to your Fortmatic Wallet',
};

const magic = {
  connector: new MagicConnector({
    chainId: 4,
    apiKey: process.env.REACT_APP_MAGIC_API_KEY as string,
    email: 'hello@example.com',
  }),
  image: '/images/magic.svg',
  title: 'Magic',
  desc: 'Connect to your Magic Wallet',
};
const portis = {
  connector: new PortisConnector({
    dAppId: process.env.REACT_APP_PORTIS_DAPP_ID as string,
    networks: [1, 100],
  }),
  image: '/images/portis.svg',
  title: 'Portis',
  desc: 'Connect to your Portis Wallet',
};

const ledger = {
  connector: new LedgerConnector({
    chainId: DEFAULT_CHAIN,
    url: RPC_URLS[DEFAULT_CHAIN],
    pollingInterval: LEDGE_POLLING_INTERVAL,
  }),
  image: '/images/ledger.svg',
  title: 'Ledger',
  desc: 'Connect to your Ledger Wallet',
};


const frame = {
  connector: new FrameConnector({
    supportedChainIds: [1],
  }),
  image: '/images/image.svg',
  title: 'Frame',
  desc: 'Connect to your Frame Wallet',
};

export default {
  injected,
  walletconnect,
  ledger,
  network,
  walletlink,
  frame,
  fortmatic,
  magic,
  portis,
  authereum,
  torus,
};
