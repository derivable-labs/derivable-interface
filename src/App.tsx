import React, {useState} from 'react';
import {useLocation, useHistory} from 'react-router-dom';
import Layout from "./components/Layout";
import './style/main.scss'
import Exposure from 'derivable-exposure/dist/component'
import 'derivable-exposure/dist/component.css'
import { useWeb3React } from '@web3-react/core';
import Header from "./components/Layout/Header";

function App() {
  const location = useLocation()
  const [visibleWalletModal, setVisibleWalletModal] = useState<any>();

  return (
      <Layout>
        <Header
          visibleWalletModal={visibleWalletModal}
          setVisibleWalletModal={setVisibleWalletModal}
        />
        <Exposure
          chainId={56}
          // @ts-ignore
          env={process.env.REACT_APP_NODE_ENV || 'production'}
          useLocation={useLocation}
          useWeb3React={useWeb3React}
          useSubPage={() => location.pathname}
          useHistory={useHistory}
          language={'en'}
          //@ts-ignore
          showConnectWalletModal={() => {
            setVisibleWalletModal(true)
          }}
        />
      </Layout>
  );
}

export default App;
