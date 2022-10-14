import { InjectedConnector } from '@web3-react/injected-connector'
import { NetworkConnector } from '@web3-react/network-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { WalletLinkConnector } from '@web3-react/walletlink-connector'
import { MagicConnector } from '@web3-react/magic-connector';
import { PortisConnector } from '@web3-react/portis-connector';
import { FrameConnector } from '@web3-react/frame-connector';

const RPC_URLS: { [chainId: number]: string } = {
    56: 'https://bsc-dataseed.binance.org/' as string,
    42161: 'https://arb1.arbitrum.io/rpc' as string
}

const injected = {
    connector: new InjectedConnector({
        supportedChainIds: [42161, 56]
    }),
    image: '/images/metamask.svg',
    title: 'Metamask',
    desc: 'Connect to your Metamask Wallet'
}

const network = {
    connector: new NetworkConnector({
        urls: { 42161: RPC_URLS[42161], 56:  RPC_URLS[56]},
        defaultChainId: 56
    }),
    image: '/images/walletconnect.svg',
    title: 'WalletConnect',
    desc: 'Scan with WalletConnect to connect'
}

const walletconnect = {
    connector: new WalletConnectConnector({
        rpc: {
          56: RPC_URLS[56],
          42161: RPC_URLS[42161]
        },
        qrcode: true,
    }),
    image: '/images/walletconnect.svg',
    title: 'WalletConnect',
    desc: 'Scan with WalletConnect to connect'
}

const walletlink = {
    connector: new WalletLinkConnector({
        url: RPC_URLS[42161],
        appName: 'web3-react example',
        supportedChainIds: [42161, 56]
    }),
    image: '/images/coinbase.svg',
    title: 'Coinbase',
    desc: 'Connect to your Coinbase Wallet'
}


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
  network,
  walletlink,
  walletconnect,
  magic,
  portis,
  frame,
};
