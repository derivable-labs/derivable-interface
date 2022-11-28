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
        <h1>Welcome</h1>
      </div>
      <div className="content">
        <p>You are using the Beta/Demo/MVP version of Derivable Protocol.</p>
        <p>The Beta product might not function as intended, and some features are not available at the moment. Your fund
          might be lost due to bugs, hacks, and exploits.</p>
        <p>We would love to hear your experience with our product. Please report any bugs that you encountered to
          https://t.me/derivablecs.</p>
        <p>Our team greatly values your attention and experience.</p>
      </div>
      <div className="action">
        <div className='text-center accept-tou-wrap mb-2'>
          {/*  <input*/}
          {/*    type="checkbox"*/}
          {/*    id='accept-tou'*/}
          {/*    onChange={(e) => {*/}
          {/*      setAgree(e.target.checked)*/}
          {/*    }}*/}
          {/*  />*/}
          {/*  <label htmlFor="accept-tou" className='checkbox'>*/}
          {/*    {agree ?*/}
          {/*      <CheckedIcon />*/}
          {/*      : <svg width="16" height="16" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">*/}
          {/*        <rect width="11.7391" height="12" rx="2" fill="rgba(128, 128, 128, 0.4)"/>*/}
          {/*      </svg>*/}
          {/*    }*/}
          {/*  </label>*/}
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
