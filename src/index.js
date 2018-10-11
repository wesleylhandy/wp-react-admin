import "babel-polyfill";
import Promise from 'promise-polyfill';
import 'raf/polyfill';

import React from 'react';
import * as ReactDOM from 'react-dom';

import App from './Components/App'

if (!window.Promise) {
    window.Promise = Promise;
}

const rootEntry = document.getElementById('admin-root')

ReactDOM.render( <App/>, rootEntry);