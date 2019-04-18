/* encoding: utf-8 */

import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route } from 'react-router-dom';
import "semantic-ui-css/semantic.min.css";
import './index.css';
import LoginPage from './pages/login/Login';
import StreamPage from './pages/stream/Stream';


ReactDOM.render(
    <BrowserRouter>
        <Route exact path="/" component={LoginPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/stream" component={StreamPage} />
    </BrowserRouter>,
    document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
