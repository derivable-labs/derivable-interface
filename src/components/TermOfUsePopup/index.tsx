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
        <p>You are using the Beta/Demo/MVP version of Derivable Protocol.</p>
        <p>The Beta product might not function as intended, and some features are not available at the moment. Your fund
          might be lost due to bugs, hacks, and exploits.</p>
        <p>We would love to hear your experience with our product. Please report any bugs that you encountered to
          <a href="https://t.me/derivablecs" target='_blank'> https://t.me/derivablecs.</a></p>
        <p>Our team greatly values your attention and experience.</p>
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
