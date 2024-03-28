import {useMemo, useState, useEffect, Fragment} from 'react'
import './style.scss'
import {useWindowSize} from "../../../hooks/useWindowSize";
import {
  CHAIN_IDS,
  CHAINS, DEFAULT_CHAIN,
  NETWORK_SUPPORTED,
  SELECTED_NETWORK_LOCAL_STORAGE_KEY,
  WALLET_CONNECTOR
} from "../../../utils/constant";
import {useWeb3React} from "@web3-react/core";
import {Web3ReactModal} from 'web3-react-modal';
import {Link, matchPath, useHistory, useLocation} from "react-router-dom"
import 'web3-react-modal/dist/index.css'
import {DappType} from "../../../utils/types";
import {shortenAddressString} from "../../../utils/helpers";
import {WalletModal} from "../../WalletModal";
import {toast} from "react-toastify";
import {Menu} from "@headlessui/react";
import useAuth from "../../../hooks/useAuth";
import {ConnectionType} from "../../../utils/web3React";

const SIMULATE_URL = 'https://1.com'

const Header = ({
                  dapps,
                  visibleConnectModal,
                  setVisibleConnectModal,
                  setChainIdDisplay,
                  chainIdDisplay
                }: {
  visibleConnectModal: boolean,
  setVisibleConnectModal: any,
  dapps: DappType[],
  setChainIdDisplay: any,
  chainIdDisplay: number
}) => {
  const {account, isActive, chainId} = useWeb3React()
  const location = useLocation()
  const history = useHistory()
  // const { activate } = useWeb3React();
  const {width} = useWindowSize()
  const [visibleWalletModal, setVisibleWalletModal] = useState<boolean>(false)
  const [visibleNav, setVisibleNav] = useState<boolean>(false)
  const {login} = useAuth()

  const [playMode, setPlayMode] = useState<boolean>(false)
  const isPhone = width && width < 768
  const isSmallPhone = isPhone && width < 400 && width > 300

  useEffect(() => {
    const initConnector = localStorage.getItem(WALLET_CONNECTOR)
    if (initConnector  && !isActive) {
      // @ts-ignore
      login(initConnector)
    }
  }, [isActive])

  // useEffect(() => {
  //   const initConnector = localStorage.getItem(WALLET_CONNECTOR)
  //   if (initConnector) {
  //     const connector: any = Object.values(connectors)
  //       .map(({ connector }) => connector)
  //       .find(connector => connector?.constructor?.name === initConnector)
  //     const handleAccountsChanged = (accounts: any) => {
  //       if (accounts.length > 0) {
  //         activate(connector)
  //       }
  //     }
  //     //@ts-ignore
  //     const { ethereum } = window
  //     if(ethereum && ethereum.on && connector && !active && !error) {
  //       ethereum.on("accountsChanged", handleAccountsChanged)
  //       return () => {
  //         if (ethereum.removeListener) {
  //           ethereum.removeListener("accountsChanged", handleAccountsChanged);
  //         }
  //       }
  //     }
  //   }
  //   return
  // }, [activate, active, error])

  useEffect(() => {
    const searchString = window.location.hash.split('?').length === 2 ? window.location.hash.split('?')[1] : ''
    const chainInUrl = new URLSearchParams('?' + searchString).get('chain') || ''
    const chainIdToSwitch = Object.values(NETWORK_SUPPORTED).find((net: any) => {
      return net.chainId === chainInUrl || net.key?.toLowerCase() === chainInUrl?.toLowerCase()
    })?.chainId || null

    if (chainId && chainIdToSwitch && chainId !== Number(chainIdToSwitch)) {
      toast.info(<div>
        <div>Wrong network</div>
        <a
          className='link-connect-to-network'
          //@ts-ignore
          onClick={() => switchNetwork(chainIdToSwitch)}
        >
          {/*@ts-ignore*/}
          Click to connect {NETWORK_SUPPORTED[chainIdToSwitch].name}
        </a>
      </div>, {
        position: "bottom-right",
      })
    } else {
      setChainIdDisplay(chainIdToSwitch || DEFAULT_CHAIN)
    }
  }, [chainId])

  const menus = useMemo(() => {
    const result: { name: string, path: string, menuLink?: string }[] = []
    for (let i = 0; i < dapps.length; i++) {
      const children = dapps[i].configs.children;
      if (children) {
        for (let j in children) {
          result.push({
            name: children[j].name,
            path: children[j].path,
            menuLink: children[j].menuLink,
          })
        }
      } else {
        result.push({
          name: dapps[i].configs.name,
          path: dapps[i].configs.path,
          menuLink: dapps[i].configs.menuLink,
        })
      }
    }
    return result
  }, [dapps])


  const switchNetwork = async (chainId: number) => {
    if (!isActive) {
      // chainId in localStorage allows to switch network even if wallet is not connected
      // or there is no wallet at all
      localStorage.setItem(SELECTED_NETWORK_LOCAL_STORAGE_KEY, chainId.toString())
      document.location.reload()
      return
    }

    try {
      const chainIdHex = '0x' + chainId.toString(16)
      //@ts-ignore
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{chainId: chainIdHex}]
      })
      //@ts-ignore
      toast.success('Connected to ' + CHAINS[chainId])

      if (chainId) {
        let searchParams = new URLSearchParams(location.search);
        //@ts-ignore
        searchParams.set('chain', NETWORK_SUPPORTED[chainId.toString() || ''].key);
        history.push({
          pathname: location.pathname,
          search: searchParams.toString()
        })
      }

      //@ts-ignore
      return CHAINS[chainId]
    } catch (ex) {
      //@ts-ignore
      if (ex.code !== 4001) {
        //@ts-ignore
        return await addNetwork(NETWORK_SUPPORTED[chainId]?.metadata)
      }

      console.error('error', ex)
    }
  }
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    setPlayMode(searchParams.has('play'))
  },[location.search])

  const addNetwork = async (metadata: any) => {
    //@ts-ignore
    await window.ethereum.request({method: 'wallet_addEthereumChain', params: [metadata]}).catch()
  }

  // @ts-ignore
  return (<Fragment>
      <header className='header'>
        <div
          className={`logo-box tooltip ${playMode && 'play'}`} 
          // onClick={() => {
          //  let searchParams = new URLSearchParams(location.search)
          //  if (searchParams.has('play')) {
          //   searchParams.delete('play')
          //  } else {
          //   searchParams.set('play', '1')
          //  }
          //  history.push({ search: searchParams.toString() })
          //  document.location.reload()
          // }}
        >
          {
            width &&
            <img width={100} src={isSmallPhone ? '/icons/logo.svg' : 'icons/small-logo.svg'} alt=""
                 className={isPhone ? (isSmallPhone ? 'logo-hero-image' : 'logo-image') : ''}/>
          }
          {/* <span className="tooltiptext">TOGGLE PLAY MODE</span> */}
        </div>

        {
          !isPhone ?
            <div className='menu'>
              {
                menus.map((menu, key) => {
                  return <Link
                    to={menu.menuLink || menu.path}
                    className={`menu--item ${(
                      matchPath(location.pathname, {path: menu.path, exact: true, strict: false}) ||
                      (key === 0 && ['/', '/trade', '/exposure', '/swap'].includes(location.pathname))) && 'active'}`}
                  >{menu.name}</Link>
                })
              }
            </div>
            : ''
        }

        <div className='header__right'>
          <div className="network-select">
            <Menu>
              <Menu.Button as="div" className="dropdown-arrow center-both">
                <div className='network-button'>
                  {/*@ts-ignore*/}
                  <img width={24} height={24} src={`/icons/${NETWORK_SUPPORTED[chainId || chainIdDisplay]?.logo || "unsupported.png"}`}
                       alt=""/>
                  {/*@ts-ignore*/}
                  {isPhone ? <span>▾</span> : <span>{NETWORK_SUPPORTED[chainId || chainIdDisplay]?.name}</span>}

                </div>
              </Menu.Button>
              <Menu.Items as="div" className="network-items">
                {CHAIN_IDS.map((_chainId) => {
                  // @ts-ignore
                  const net = NETWORK_SUPPORTED[_chainId]
                  if (_chainId === chainId) return '';
                  return <Menu.Item key={net.chainId}>
                    <div
                      className="network-item"
                      onClick={() => {
                        if (isActive) {
                          switchNetwork(net.chainId)
                        } else {
                          let searchParams = new URLSearchParams(location.search);
                          //@ts-ignore
                          searchParams.set('chain', NETWORK_SUPPORTED[net.chainId]?.key ?? net.chainId);
                          history.push({
                            pathname: location.pathname,
                            search: searchParams.toString()
                          })

                          // @ts-ignore
                          setChainIdDisplay(net.chainId)
                        }
                      }}
                    >
                      <img src={`/icons/${net.logo || 'unsupported.png'}`} width={24} height={24} alt=""/>
                      <span>{net.name}</span>
                    </div>
                  </Menu.Item>
                })}
              </Menu.Items>
            </Menu>
          </div>

          {account ?
            <div
              className='header__right--account-btn'
              onClick={() => setVisibleWalletModal(true)}
            >
              {shortenAddressString(account)}
            </div>
            :
            <div
              className="header__right--connect-wallet"
              onClick={() => setVisibleConnectModal(true)}
            >Connect Wallet
            </div>
          }
          {/*<div className="header__right--bnt-setting">*/}
          {/*  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">*/}
          {/*    <g clip-path="url(#clip0_496_468)">*/}
          {/*      <path*/}
          {/*        d="M5 10C3.9 10 3 10.9 3 12C3 13.1 3.9 14 5 14C6.1 14 7 13.1 7 12C7 10.9 6.1 10 5 10ZM19 10C17.9 10 17 10.9 17 12C17 13.1 17.9 14 19 14C20.1 14 21 13.1 21 12C21 10.9 20.1 10 19 10ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z"*/}
          {/*        fill="white" />*/}
          {/*    </g>*/}
          {/*    <defs>*/}
          {/*      <clipPath id="clip0_496_468">*/}
          {/*        <rect width="24" height="24" fill="white" />*/}
          {/*      </clipPath>*/}
          {/*    </defs>*/}
          {/*  </svg>*/}
          {/*</div>*/}

          <div className="dapp-menu-select">
            <Menu>
              <Menu.Button as="div" className="dropdown-arrow center-both">
                <div className='dapp-menu-button'>
                  <img src={`/icons/option.png`} alt="" width={24} height={24}/>
                </div>
              </Menu.Button>
              <Menu.Items as="div" className="dapp-menu-items">
                <Menu.Item key={0}>
                  <a href='https://derion.io' target='_blank' className="dapp-menu-item" rel="noreferrer">
                    Landing Page
                  </a>
                </Menu.Item>
                <Menu.Item key={5}>
                  <a href='https://docs.derion.io' target='_blank' className="dapp-menu-item" rel="noreferrer">
                    Docs
                  </a>
                </Menu.Item>
                {
                  isPhone ? (
                    <>
                      <Menu.Item key={1}>
                        <span className="dapp-menu-item">
                          Dapp
                        </span>
                      </Menu.Item>
                      <div style={{paddingLeft: '1rem'}}>
                        {
                          menus.map((menu, key) => {
                            // if (menu.name !== "Create") {
                            //   return (<Menu.Item key={key + 2}>
                            //     <span className='dapp-menu-item'>
                            //       {menu.name} (coming soon)
                            //     </span>
                            //   </Menu.Item>)
                            // }
                            return (<Menu.Item key={key + 2}>
                              <Link
                                to={menu.menuLink || menu.path}
                                className={`dapp-menu-item ${(
                                  matchPath(location.pathname, {path: menu.path, exact: true, strict: false}) ||
                                  (key === 0 && ['/', '/trade', '/exposure', '/swap'].includes(location.pathname))) && 'active'}`}
                              >{menu.name}</Link>
                            </Menu.Item>)
                          })
                        }
                      </div>
                    </>
                  ) : ''
                }
              </Menu.Items>
            </Menu>
          </div>
        </div>
      </header>
      <WalletModal
        visible={visibleWalletModal}
        setVisible={setVisibleWalletModal}
      />
      <Web3ReactModal
        visible={visibleConnectModal}
        setVisible={setVisibleConnectModal}
        providerOptions={Object.values(ConnectionType)}
        onConnect={(connector: any) => {
          login(connector)
        }}
      />
    </Fragment>
  )
}

export default Header
