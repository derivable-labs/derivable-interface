import React, {useState} from 'react'
import './style.scss'
import {useWindowSize} from "../../../hooks/useWindowSize";
import {WALLET_CONNECTOR} from "../../../utils/constant";
import connectors from "../../../utils/connectors";
import {useWeb3React} from "@web3-react/core";
import {Web3ReactModal} from 'web3-react-modal';
import 'web3-react-modal/dist/index.css'

const menus = [
  {
    name: 'Home',
    href: '/'
  },
  {
    name: 'Swap',
    href: '/'
  },
  {
    name: 'Earn',
    href: '/'
  },
  {
    name: 'Create',
    href: '/'
  },
  {
    name: 'Docs',
    href: '/'
  },
]

const Header = ({
                  visibleWalletModal,
                  setVisibleWalletModal
                }: any) => {
  const { activate } = useWeb3React();
  const { width } = useWindowSize()
  const isPhone = width && width < 768

  return (<header className='header'>
      <div className='logo-box'>
        {
          width &&
          <img src={isPhone ? '/logo-white.png' : '/logo.png'} alt="" />
        }
      </div>
      {
        isPhone ?
          <div className="navigation">
            <input type="checkbox" className="navigation__checkbox" id="navi-toggle" />

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
                      <a href={menu.href} className="navigation__link">
                        {menu.name}
                      </a>
                    </li>
                  })
                }
              </ul>
            </nav>
          </div>
          :
          <div className='menu'>
            {
              menus.map((menu) => {
                return <a href={menu.href} className='menu--item'>{menu.name}</a>
              })
            }
          </div>
      }
      <div className='header__right'>
        <div className="header__right--select-network">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_453_7001)">
              <path
                d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16Z"
                fill="#627EEA" />
              <path d="M8 2V6.435L11.7485 8.11L8 2Z" fill="white" fill-opacity="0.602" />
              <path d="M8.249 2L4.5 8.11L8.249 6.435V2Z" fill="white" />
              <path d="M8 11.176V14.1895L11.751 9L8 11.176Z" fill="white" fill-opacity="0.602" />
              <path d="M8.249 14.1895V11.1755L4.5 9L8.249 14.1895Z" fill="white" />
              <path d="M8 10.3505L11.7485 8.174L8 6.5V10.3505Z" fill="white" fill-opacity="0.2" />
              <path d="M4.5 8.174L8.249 10.3505V6.5L4.5 8.174Z" fill="white" fill-opacity="0.602" />
            </g>
            <defs>
              <clipPath id="clip0_453_7001">
                <rect width="16" height="16" fill="white" />
              </clipPath>
            </defs>
          </svg>
          <span>Etherium</span>
        </div>
        <div
          className="header__right--connect-wallet"
          onClick={() => setVisibleWalletModal(true)}
        >Connect Wallet
        </div>
        <div className="header__right--bnt-setting">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_496_468)">
              <path
                d="M5 10C3.9 10 3 10.9 3 12C3 13.1 3.9 14 5 14C6.1 14 7 13.1 7 12C7 10.9 6.1 10 5 10ZM19 10C17.9 10 17 10.9 17 12C17 13.1 17.9 14 19 14C20.1 14 21 13.1 21 12C21 10.9 20.1 10 19 10ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z"
                fill="white" />
            </g>
            <defs>
              <clipPath id="clip0_496_468">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>
      <Web3ReactModal
        visible={visibleWalletModal}
        setVisible={setVisibleWalletModal}
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
    </header>
  )
}

export default Header
