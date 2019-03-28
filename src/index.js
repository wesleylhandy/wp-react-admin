import "./vendors";
import "./require-babel-polyfill"
import Promise from 'promise-polyfill';
import 'raf/polyfill';
import 'whatwg-fetch';

import React from 'react';
import * as ReactDOM from 'react-dom';

import App from './Components/App'

if (!window.Promise) {
    window.Promise = Promise;
}

const rootEntry = document.getElementById('admin-root')
const wpnonce = rootEntry.dataset.nonce;
const base = rootEntry.dataset.rest

ReactDOM.render( <App wpnonce={wpnonce} base={base}/>, rootEntry);