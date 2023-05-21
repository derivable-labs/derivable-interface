import React, {useMemo, useState, useEffect, Fragment} from 'react'
import './style.scss'
import {useWindowSize} from "../../../hooks/useWindowSize";
import {
  CHAIN_IDS,
  CHAINS, DEFAULT_CHAIN,
  NETWORK_METADATA, NETWORK_SUPPORTED,
  SELECTED_NETWORK_LOCAL_STORAGE_KEY,
  WALLET_CONNECTOR
} from "../../../utils/constant";
import connectors from "../../../utils/connectors";
import {useWeb3React} from "@web3-react/core";
import {Web3ReactModal} from 'web3-react-modal';
import {Link, matchPath, useHistory, useLocation} from "react-router-dom"
import 'web3-react-modal/dist/index.css'
import {DappType} from "../../../utils/types";
import {shortenAddressString} from "../../../utils/helpers";
import {WalletModal} from "../../WalletModal";
import {toast} from "react-toastify";
import {Menu} from "@headlessui/react";

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
  const { account, active, chainId } = useWeb3React()
  const location = useLocation()
  const history = useHistory()
  const { activate } = useWeb3React();
  const { width } = useWindowSize()
  const [visibleWalletModal, setVisibleWalletModal] = useState<boolean>(false)
  const [visibleNav, setVisibleNav] = useState<boolean>(false)
  const isPhone = width && width < 768

  useEffect(() => {
    const initConnector = localStorage.getItem(WALLET_CONNECTOR)
    if (initConnector) {
      const connector = Object.values(connectors)
        .map(({ connector }) => connector)
        .find(connector => connector?.constructor?.name === initConnector)
      if (connector) {
        activate(connector)
      }
    }
  }, [activate])

  useEffect(() => {
    const searchString = window.location.hash.split('?').length === 2 ? window.location.hash.split('?')[1] : ''
    const chainInUrl = new URLSearchParams('?' + searchString).get('chain') || ''
    const chainIdToSwitch = Object.values(NETWORK_SUPPORTED).find((net: any) => {
      return net.chainId === chainInUrl || net.key?.toLowerCase() === chainInUrl?.toLowerCase()
    })?.chainId || null

    if(chainId && chainIdToSwitch && chainId !== Number(chainIdToSwitch)) {
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
    if (!active) {
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
        params: [{ chainId: chainIdHex }]
      })
      //@ts-ignore
      toast.success('Connected to ' + CHAINS[chainId])

      if(chainId) {
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
        return await addNetwork(NETWORK_METADATA[chainId])
      }

      console.error('error', ex)
    }
  }

  const addNetwork = async (metadata: any) => {
    //@ts-ignore
    await window.ethereum.request({ method: 'wallet_addEthereumChain', params: [metadata] }).catch()
  }

  // @ts-ignore
  return (<Fragment>
      <header className='header'>
        <Link to="/" className='logo-box'>
          {
            width &&
            <img src={isPhone ? '/logo-white.png' : '/logo.png'} alt="" />
          }
        </Link>

        {
          !isPhone ?
            <div className='menu'>
              {
                menus.map((menu, key) => {
                  console.log('menu', menu)
                  return <Link
                    to={menu.menuLink || menu.path}
                    className={`menu--item ${(
                      matchPath(location.pathname, { path: menu.path, exact: true, strict: false }) ||
                      (key === 0 && ['/', '/trade', '/exposure', '/swap'].includes(location.pathname))) && 'active'}`}
                  >{menu.name}</Link>
                })
              }
            </div>
            : ''
        }

        <div className='header__right'>
          <div className="hidden-on-phone network-select ">
            <Menu>
              <Menu.Button as="div" className="dropdown-arrow center-both">
                <div className='network-button'>
                  {/*@ts-ignore*/}
                  <img src={`/icons/${NETWORK_SUPPORTED[chainId || chainIdDisplay]?.logo}`} alt="" />
                  {/*@ts-ignore*/}
                  <span>{NETWORK_SUPPORTED[chainId || chainIdDisplay]?.name}</span>
                </div>
              </Menu.Button>
              <Menu.Items as="div" className="network-items">
                {CHAIN_IDS.map((chainId) => {
                  // @ts-ignore
                  const net = NETWORK_SUPPORTED[chainId]
                  return <Menu.Item key={net.chainId}>
                    <div
                      className="network-item"
                      onClick={() => {
                        if(active) {
                          switchNetwork(net.chainId)
                        } else {
                          // @ts-ignore
                          setChainIdDisplay(net.chainId)
                        }
                      }}
                    >
                      <img src={`/icons/${net.logo}`} width={24} height={24} alt="" />
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

          <div className="dapp-menu-select ">
            <Menu>
              <Menu.Button as="div" className="dropdown-arrow center-both">
                <div className='dapp-menu-button'>
                  <img src={`/icons/option.png`} alt="" width={24} height={24} />
                </div>
              </Menu.Button>
              <Menu.Items as="div" className="dapp-menu-items">
                <Menu.Item key={1}>
                  <Link to='/' className="dapp-menu-item">
                    Landing Page
                  </Link>
                </Menu.Item>
                <Menu.Item key={1}>
                  <a href='https://docs.derivable.finance' className="dapp-menu-item">
                    Docs
                  </a>
                </Menu.Item>
              </Menu.Items>
            </Menu>
          </div>

          {
            isPhone ?
              <div className="navigation">
                <input type="checkbox" checked={visibleNav} onChange={(e) => {
                  setVisibleNav(e.target.checked)
                }} className="navigation__checkbox" id="navi-toggle" />

                { /* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label htmlFor="navi-toggle" className="navigation__button">
                  <span className="navigation__icon">&nbsp;</span>
                </label>

                <div className="navigation__background">&nbsp;</div>

                <nav className="navigation__nav">
                  <ul className="navigation__list">
                    {
                      menus.map((menu) => {
                        return <li className="navigation__item">
                      <span onClick={() => {
                        history.push(menu.path)
                        setVisibleNav(false)
                      }} className="navigation__link">
                        {menu.name}
                      </span>
                        </li>
                      })
                    }
                  </ul>
                </nav>
              </div>
              : ''
          }
        </div>
      </header>
      <WalletModal
        visible={visibleWalletModal}
        setVisible={setVisibleWalletModal}
      />
      <Web3ReactModal
        visible={visibleConnectModal}
        setVisible={setVisibleConnectModal}
        providerOptions={connectors}
        onConnect={(connector: any, _: any, email: string) => {
          const name = connector?.constructor?.name;
          if (email && name === 'MagicConnector') {
            connector.email = email
          }
          activate(connector, (err) => {
            alert(err.toString())
          });
          if (name) {
            localStorage.setItem(WALLET_CONNECTOR, name);
          }
        }}
      />
    </Fragment>
  )
}

export default Header
