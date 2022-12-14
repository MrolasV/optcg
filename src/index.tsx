import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import App from 'home/main';
import { store } from 'store';
import '@cloudscape-design/global-styles/index.css';

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <App/>
    </HashRouter>
  </Provider>,
  document.getElementById('root')
);