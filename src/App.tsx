import React, {Suspense, useMemo, useState} from 'react';
import {useLocation, useHistory, matchPath} from 'react-router-dom';
import Layout from "./components/Layout";
import './style/main.scss'
import 'trade-comp/dist/component.css'
import {useWeb3React} from '@web3-react/core';
import Header from "./components/Layout/Header";
import {DappType} from "./utils/types";
import {TermOfUsePopup} from "./components/TermOfUsePopup";
import {ToastContainer} from "react-toastify";
import {ErrorBoundary} from "./components/ErrorBoundary";

function App({dapps}: {
  dapps: DappType[]
}) {
  const location = useLocation()
  const [chainIdDisplay, setChainIdDisplay] = useState<any>(42161)
  const [visibleConnectModal, setVisibleConnectModal] = useState<any>();

  const Component = useMemo(() => {
    for (let i in dapps) {
      const children = dapps[i].configs.children;
      if (children) {
        for (let j in children) {
          if (matchPath(location.pathname, {path: children[j].path, exact: children[j].path === '/'})) {
            return dapps[i].Component
          }
        }
      } else if (matchPath(location.pathname, {path: dapps[i].configs.path, exact: dapps[i].configs.path === '/'})) {
        return dapps[i].Component;
      }
    }

    return dapps[0].Component
  }, [location.pathname])

  return (
    <Layout>
      <Header
        dapps={dapps}
        visibleConnectModal={visibleConnectModal}
        setVisibleConnectModal={setVisibleConnectModal}
        setChainIdDisplay={setChainIdDisplay}
        chainIdDisplay={chainIdDisplay}
      />
      <ErrorBoundary>
        <Suspense>
          <Component
            chainId={chainIdDisplay}
            // @ts-ignore
            env={process.env.REACT_APP_NODE_ENV || 'production'}
            useLocation={useLocation}
            useWeb3React={useWeb3React}
            useSubPage={() => location.pathname}
            useHistory={useHistory}
            language={'en'}
            //@ts-ignore
            showConnectWalletModal={() => {
              setVisibleConnectModal(true)
            }}
          />
        </Suspense>
      </ErrorBoundary>
      <TermOfUsePopup/>
      <ToastContainer
        position='top-right'
        autoClose={5000}
        rtl={false}
        closeOnClick={false}
        draggable
        theme='dark'
      />
    </Layout>
  );
}

export default App;
