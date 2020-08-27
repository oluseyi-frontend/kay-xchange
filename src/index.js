import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app-component/App';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import CryptoExchangeContext from './components/context-component/Context';
ReactDOM.render(
  <React.StrictMode>
    <CryptoExchangeContext>
      <App />
    </CryptoExchangeContext>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

