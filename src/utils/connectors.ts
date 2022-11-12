import { InjectedConnector } from '@web3-react/injected-connector'
import { NetworkConnector } from '@web3-react/network-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { WalletLinkConnector } from '@web3-react/walletlink-connector'

const RPC_URLS: { [chainId: number]: string } = {
    56: 'https://bsc-dataseed.binance.org/' as string,
    42161: 'https://arb1.arbitrum.io/rpc' as string,
    31337: 'http://localhost:8545/' as string
}

const injected = {
    connector: new InjectedConnector({
        supportedChainIds: [42161, 56, 31337, 1337]
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
          42161: RPC_URLS[42161],
          31337: RPC_URLS[31337]
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

export default {
  injected,
  network,
  walletlink,
  walletconnect,
};
