import {useState} from "react";
import './style.scss'

export const TermOfUsePopup = () => {
  const [agree, setAgree] = useState<boolean>(false)
  const [acceptTerms, setAcceptTerms] = useState<boolean>(!!localStorage.getItem('accepted-tou'))

  if (acceptTerms) {
    return null
  }

  return <div className='tou-modal'>
    <div className="overlay" />
    <div className="modal">
      <div className="head">
        <h1 className='text-center'>BETA DISCLAIMER</h1>
      </div>
      <div className="content">
        <p>You are using the Beta version of Derivable Protocol.</p>
        <p>Before interacting with the current version, please be aware that the product is still in Beta and sometimes may not function properly. Some features may not be fully available on this version. The Beta product may also be prone to bugs, hacks, and exploits.</p>
        <p>Since the Beta version only uses WETH-reserved pools, users do not need to approve any of their token to our contracts, so rest assured that there is no risk exposed to users' fund when interacting with our product.</p>
        <p>Thank you for using Derivable Protocol in our earliest days. We would love to hear about your experience with our product. If you enjoy Derivable or encounter any bug along the way, please notify our team <a href="https://discord.gg/r7V97tSK" target='_blank'>here</a>. The Derivable team greatly values your attention and experience!
        </p>
      </div>
      <div className="action">
        <div className='text-center accept-tou-wrap mb-2'>
          <input
            type="checkbox"
            className='mr-05'
            id='accept-tou'
            checked={agree}
            onChange={(e) => {
              setAgree(e.target.checked)
            }}
          />
          <label htmlFor="accept-tou" className='accept-tou-label'><span>Accept the Risk</span></label>
        </div>
        <div className='text-center'>
          <button
            disabled={!agree}
            className='continue-btn'
            onClick={() => {
              setAcceptTerms(true)
              localStorage.setItem('accepted-tou', '1')
            }}
          >Continue
          </button>
        </div>
      </div>
    </div>
  </div>
}
