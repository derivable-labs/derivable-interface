import React, {useEffect, useState} from 'react'
import './style.scss'
import {useWindowSize} from "../../hooks/useWindowSize";
const { AssistedJsonRpcProvider } = require('assisted-json-rpc-provider')

const Transfer = ({
  chainId,
  theme,
  useWeb3React,
  useSubPage,
  xStorageClient,
  language,
  useLocation,
  useHistory,
  showConnectWalletModal,
  env
}: {
  chainId: number
  theme: string
  useWeb3React: any
  language?: any
  xStorageClient: any
  useSubPage: any
  useLocation: any
  showConnectWalletModal: () => {}
  env?: 'production' | 'development'
  useHistory?: any
}) => {
  const { width } = useWindowSize()
  const isPhone = width && width < 768
  const { provider } = useWeb3React()

  const load = async() => {
    console.log(process.env)
    const branch = env == 'production' ? 'main' : 'dev'
    const url = `https://raw.githubusercontent.com/derivable-labs/configs/${branch}/${chainId}/network.json`
    const configs = await fetch(url).then(data => data.json())
    const scanConfig = {
      url: configs.scanApi,
      maxResults: 1000,
      rangeThreshold: 0,
      rateLimitCount: 1,
      rateLimitDuration: 5000,
      apiKeys: process.env[`REACT_APP_SCAN_API_KEY_`+chainId]?.split(','),
    }
    console.log(scanConfig)
    const aProvider = new AssistedJsonRpcProvider(provider, scanConfig)
  }

  useEffect(() => {
    if (provider) {
      load()
    }
  }, [provider])

  return <div>
  </div>
}

export default Transfer
