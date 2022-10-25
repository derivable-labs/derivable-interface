import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {ethers} from 'ethers';
import {Web3ReactProvider} from '@web3-react/core';
import {BrowserRouter as Router} from 'react-router-dom';


function getLibrary(provider: any) {
  const library = new ethers.providers.Web3Provider(provider);
  return library;
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Web3ReactProvider getLibrary={getLibrary}>
      <Router>
        <App dapps={[
          {
            configs: require('derivable-exposure/dist/configs'),
            Component: React.lazy(() => {
              // @ts-ignore
              import('derivable-exposure/dist/component.css');
              return import('derivable-exposure/dist/component');
            })
          },
        ]}
        />
      </Router>
    </Web3ReactProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
