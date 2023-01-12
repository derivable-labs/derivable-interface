import React from 'react'
import './style.scss'
import {useWindowSize} from "../../hooks/useWindowSize";
import {BlurBackground} from "../../components/BlurBackground";
import {Link} from "react-router-dom";


const features = [
  {
    image: 'decentralized.png',
    title: 'Pure Decentralization',
    des: 'Non-custodial smart-contracts with no permissioned role. No backend service.'
  },
  {
    image: 'optimized.png',
    title: 'Cost-Effective',
    des: 'Changing exposure (or position) only costs as much as an AMM swap.'
  },
  {
    image: 'decentralized.png',
    title: 'User Friendly',
    des: 'Long-short tokens can be traded professionally or HODL\'ed for long-term exposure with NO risk of liquidation.'
  },
  {
    image: 'automated.png',
    title: 'Open & Inclusive',
    des: 'Any token can be listed. Anyone can take sides, either as liquidity providers or long-short traders.'
  },
  {
    image: 'over-collateralized.png',
    title: 'Self-Sustaining',
    des: 'Under-collateralization is expected and naturally processed by pure mathematical methods.'
  },
  {
    image: 'capital-efficient.png',
    title: 'Capital-Effective',
    des: 'Lock less to gain more. Keep holding yield-bearing or liquidity tokens to acquire more market exposure.'
  },
]

const menus = [
  {
    name: 'Home',
    href: '/'
  },
  {
    name: 'Trade',
    href: '/trade'
  },
  {
    name: 'Pools',
    href: '/pools'
  },
  {
    name: 'Docs',
    href: 'https://docs.derivable.io',
    target: '_black'
  },
]

const Dashboard = () => {
  return <div>
    <Header />
    <div className='landing-page'>
      <div className='head'>
        <div className='head__content'>
          <img className='head__typo' src="/images/dashboard/head-typo.png" alt="" />
          <h1 className='head__title'>Trade, Earn, and Create your own Derivative Market.</h1>
        </div>
        <div className="overlay" />
      </div>
      <BlurBackground pointNumber={20}>
        <div className='content'>
          <div className='protocol'>
            <div className='protocol__top'>
              <div className='section-header'>
                <p className='section-header-item'>Decentralized </p>
                <p className='section-header-item'>Derivatives</p>
                <p className='section-header-item'>Liquidity</p>
              </div>
            </div>
            <div className='protocol__des'>
              The world&rsquo;s first derivatives protocol designed for the cost and scarceness of Layer-1 blockchain
              resources.
            </div>

            <div className='diagram-1'>
              <img src="/images/dashboard/diagram-4.png" alt="" className='protocol__diagram--img' />
            </div>
          </div>

          <div className='tdm'>
            <div className='section-header'>
              <p className='section-header-item'>Traditional </p>
              <p className='section-header-item'>Derivatives</p>
              <p className='section-header-item'>Market</p>
            </div>

            <div className='tdm__diagram'>
              <img src="/images/dashboard/diagram.svg" alt="" className='tdm-diagram--img' />
            </div>
          </div>


          <div className='description'>
            <div className='description-1'>
              <h2 className='title'>NO POSITION. NO ORDER BOOK.</h2>
              <p className='des'>Just token and liquidity.</p>
              <div className='diagram'>
                <button type='button'>Collateral Liquidity Pool</button>
                <span className='swap-icon' />
                <button type='button'>Fungible Derivatives Token</button>
              </div>
              <img src="/images/dashboard/diagram-1.png" alt="" className='diagram-1' />
            </div>
            <div className='description-2'>
              <h2 className='title'>ANY DERIVABLE VALUE</h2>
              <p className='des'>Derivatives formula is limited only by your imagination.</p>
              <img src="/images/dashboard/diagram-2.png" alt="" className='diagram-2' />
            </div>
            <div className='description-3'>
              <h2 className='title'>ANY COLLATERAL ASSET</h2>
              <p className='des mb-0'>Collateralized by any redeemable on-chain asset: from the platform native currency
                to any
                DeFi yield-bearing token.</p>
              <img src="/images/dashboard/diagram-3.png" alt="" className='diagram-3' />
            </div>
          </div>
          <div className="features">
            <div className="features__title">FEATURES</div>
            <div className='features__items'>
              {
                features.map((feature) => {
                  return <div className='features__item'>
                    <div className='features__item--head'>
                      <img src={`/images/dashboard/${feature.image}`} alt="" className='features__item--logo' />
                      <span className='features__item--title'>{feature.title}</span>
                    </div>
                    <div className='features__item--des'>
                      {feature.des}
                    </div>
                  </div>
                })
              }
            </div>
          </div>
        </div>
      </BlurBackground>
    </div>
    <Footer />
  </div>
}

const Header = (props: any) => {
  const { width } = useWindowSize()

  const isPhone = width && width < 768

  return (<header className='dashboard-header'>
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
                      {
                        menu.target ?
                          <a href={menu.href} className="navigation__link" target={menu.target}>
                            {menu.name}
                          </a>
                          :
                          <Link to={menu.href} className="navigation__link">
                            {menu.name}
                          </Link>
                      }
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
                if(menu.target) {
                  return <a href={menu.href} className="menu--item" target={menu.target}>
                    {menu.name}
                  </a>
                }
                return <Link to={menu.href} className='menu--item'>{menu.name}</Link>
              })
            }
          </div>
      }

    </header>
  )
}

const Footer = (props: any) => {
  return (<footer className='footer-box'>
      <div className='footer'>
        <div className='footer__left'>
          <div className='footer__left--top'>
            <img src="/logo.png" alt="" />
            <div className="footer__left--description">Open derivatives market for everyone.</div>
          </div>
          <div className='footer__left--socials'>
          </div>
        </div>
        <div className='footer__right'>
          <div className='footer__right--col'>
            <div className="title">ORGANIZATION</div>
            <div className='links'>
              <a href="https://t.me/derivablecs" target="_blank" rel="noreferrer">About</a>
              <a href="https://t.me/derivablecs" target="_blank" rel="noreferrer">Features</a>
              <a href="https://t.me/derivablecs" target="_blank" rel="noreferrer">Works</a>
              <a href="https://t.me/derivablecs" target="_blank" rel="noreferrer">Career</a>
            </div>
          </div>
          <div className='footer__right--col'>
            <div className="title">HELP</div>
            <div className='links'>
              <a href="https://t.me/derivablecs" target="_blank" rel="noreferrer">Customer Support</a>
              <a href="https://t.me/derivablecs" target="_blank" rel="noreferrer">Terms</a>
              <a href="https://t.me/derivablecs" target="_blank" rel="noreferrer">Conditions</a>
              <a href="https://t.me/derivablecs" target="_blank" rel="noreferrer">Privacy Policy</a>
            </div>
          </div>
          <div className='footer__right--col'>
            <div className="title">SUBSCRIBE TO NEW FEATURES</div>
            <div className="subscribe-box">
              <input type="text" className='name-input' placeholder='Enter your email' />
              <button type='button' className='btn-subscribe'>Subscribe</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}


export default Dashboard
