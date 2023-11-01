import {Modal} from "../Modal";
import {useWeb3React} from "@web3-react/core";
import {CopyToClipboard} from 'react-copy-to-clipboard'
import {
  NETWORK_SUPPORTED,
} from "../../utils/constant";
import "./style.scss"
import useAuth from "../../hooks/useAuth";

export const WalletModal = ({
                              setVisible,
                              visible
                            }: {
                              setVisible: any,
                              visible: boolean
                            }
) => {
  const { account, chainId } = useWeb3React()
  const {logout} = useAuth()

  return <Modal title="Wallet" visible={visible} setVisible={setVisible}>
    <div className='wallet-modal'>
      <p className="mb-1 wallet-modal-text">Your address</p>
      <CopyToClipboard text={account || ''}>
        <div className='address-box'>
          <div className='address'>
            {account}
          </div>
          <img src='/icons/copy_icon.svg' alt='' />
        </div>
      </CopyToClipboard>
      <div className='view-on-explorer-box text-right mt-2'>
        {!chainId || !account ? '' :
          // @ts-ignore
          <a href={`${NETWORK_SUPPORTED[chainId]?.explorer}/address/${account}`} target='_blank' className="view-on-explorer-link" rel="noreferrer">
            <span className='mr-1'>View on Explorer</span>
            <img src='/icons/link_icon.svg' alt='' />
          </a>
        }
      </div>
      <div className='text-center mt-2'>
        <div className='disconnect-btn' onClick={() => {
          logout()
          setVisible(false)
        }}>
          Disconnect Wallet
        </div>
      </div>
    </div>
  </Modal>
}
