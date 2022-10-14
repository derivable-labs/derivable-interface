import React from 'react'
import Header from './Header'
import './style.scss'
import {BlurBackground} from "../BlurBackground";

const Layout = (props: any) => {
  const { children } = props

  return (
    <BlurBackground pointNumber={10}>
      <div className='layout'>
        <Header />
        <main className='main'>
          {children}
        </main>
      </div>
    </BlurBackground>
  )
}

export default Layout
