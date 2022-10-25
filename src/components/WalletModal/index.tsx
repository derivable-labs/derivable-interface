import {Modal} from "../Modal";
import {useWeb3React} from "@web3-react/core";
import {CopyToClipboard} from 'react-copy-to-clipboard'
import "./style.scss"

export const WalletModal = ({
                              setVisible,
                              visible
                            }: {
                              setVisible: any,
                              visible: boolean
                            }
) => {
  const { account, deactivate } = useWeb3React()

  return <Modal title="Wallet" visible={visible} setVisible={setVisible}>
    <div className='wallet-modal'>
      <p className="mb-1">Your address</p>
      <CopyToClipboard text={account || ''}>
        <div className='address-box'>
          <div className='address'>
            {account}
          </div>
          <img src='/icons/copy_icon.svg' alt='' />
        </div>
      </CopyToClipboard>
      <div className='view-on-bsc-box text-right mt-2'>
        <a href="https://bscscan.com/" target='_blank' className="view-on-bsc-link">
          <span className='mr-1'>View on BscScan</span>
          <img src='/icons/link_icon.svg' alt='' />
        </a>
      </div>
      <div className='text-center mt-2'>
        <div className='disconnect-btn' onClick={() => {
          deactivate()
          setVisible(false)
        }}>
          Disconnect Wallet
        </div>
      </div>
    </div>
  </Modal>
}
