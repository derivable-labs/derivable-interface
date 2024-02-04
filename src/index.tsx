import React from 'react';
import ReactDOM from 'react-dom/client';
import { Buffer } from 'buffer';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {ethers} from 'ethers';
import {Web3ReactProvider} from '@web3-react/core';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import {connectors} from "./utils/connectors";
import Transfer from './pages/Transfer';

window.Buffer = window.Buffer || Buffer;

function getLibrary(provider: any) {
  const library = new ethers.providers.Web3Provider(provider);
  return library;
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Web3ReactProvider connectors={connectors}>
      <Router>
        <Switch>
          {/*<Route path='/' exact>*/}
          {/*  <Dashboard/>*/}
          {/*</Route>*/}
          <Route>
            <App dapps={[
              {
                configs: {
                  // Any component should be ok as long as it's props respect className which is resizable by CSS
                  icon: (props: any) => (<React.Fragment></React.Fragment>),
                  name: 'Transfer Positions',
                  path: '/transfer'
                },
                Component: Transfer
              }
            ]}
            />
          </Route>
        </Switch>
      </Router>
    </Web3ReactProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
