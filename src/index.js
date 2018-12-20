import './vendors'

import "babel-polyfill";
import Promise from 'promise-polyfill';
import 'raf/polyfill';
import 'whatwg-fetch';

import React from 'react';
import * as ReactDOM from 'react-dom';

import App from './Components/App'

if (!window.Promise) {
    window.Promise = Promise;
}

let mode;
if (process) {
    mode = 'local';
}

const rootEntry = document.getElementById('admin-root')
const wpnonce = rootEntry.dataset.nonce;

ReactDOM.render( <App wpnonce={wpnonce} mode={mode}/>, rootEntry);