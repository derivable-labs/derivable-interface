import React, {useEffect, useState} from 'react'
import './style.scss'
import {useWindowSize} from "../../hooks/useWindowSize";

const Transfer = () => {
  const { width } = useWindowSize()
  const isPhone = width && width < 768

  return <div>
  </div>
}

export default Transfer
