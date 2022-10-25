import React, { useEffect } from 'react'
import './style.scss'

export interface modalInterface {
  setVisible: any
  visible: any
  children: any
  width?: any
  minWidth?: any
  title?: any
}

export const Modal = ({
  width,
  minWidth,
  setVisible,
  visible,
  children,
  title
}: modalInterface) => {
  useEffect(() => {
    window.addEventListener('keyup', (e: any) => {
      if (e.which === 27) {
        setVisible(false)
      }
    })
  }, [])

  return (
    <div className={`derivable-modal  ${visible ? 'show' : ''}`}>
      <div className='overlay' onClick={() => setVisible(false)} />
      <div
        className='modal'
        style={{ width: width || '40rem', minWidth: minWidth || '40rem' }}
      >
        <div className='btn-close-wrap'>
          <span className='title'>{title || ''}</span>
          <span className='btn-close' onClick={() => setVisible(false)}>
            {/* <ExitIcon /> */}X
          </span>
        </div>
        {visible && <div className='modal-content'>{children}</div>}
      </div>
    </div>
  )
}
