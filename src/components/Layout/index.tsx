import React from 'react'
import './style.scss'
import {BlurBackground} from "../BlurBackground";

const Layout = (props: any) => {
  const { children } = props

  return (
    <BlurBackground pointNumber={10}>
      <div className='layout'>
        <main className='main'>
          {children}
        </main>
      </div>
    </BlurBackground>
  )
}

export default Layout
