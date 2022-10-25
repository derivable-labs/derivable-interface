import React, {useMemo, useState} from 'react';
import {useLocation, useHistory, matchPath} from 'react-router-dom';
import Layout from "./components/Layout";
import './style/main.scss'
import 'derivable-exposure/dist/component.css'
import {useWeb3React} from '@web3-react/core';
import Header from "./components/Layout/Header";
import {DappType} from "./utils/types";

function App({ dapps }: {
  dapps: DappType[]
}) {
  const location = useLocation()
  const [visibleConnectModal, setVisibleConnectModal] = useState<any>();

  const Component = useMemo(() => {
    for (let i in dapps) {
      const children = dapps[i].configs.children;
      if (children) {
        for (let j in children) {
          if (matchPath(location.pathname, { path: children[j].path, exact: children[j].path === '/' })) {
            return dapps[i].Component
          }
        }
      } else if (matchPath(location.pathname, { path: dapps[i].configs.path, exact: dapps[i].configs.path === '/' })) {
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
      />
      <Component
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
          setVisibleConnectModal(true)
        }}
      />
    </Layout>
  );
}

export default App;
