import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, compose } from 'redux';

import reducers from './reducers';
import App from './components/app';

import './style.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

// boilerplate to create store with reducers and initialize devtools
const store = createStore(reducers, {}, compose(
  window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f,
));

ReactDOM.render((
  <Provider store={store}>
    <App />
  </Provider>
), document.getElementById('main'));
