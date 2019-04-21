/* encoding: utf-8 */

import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import RedirectController from './controllers/Redirect';
import LoginPage from './pages/login/Login';
import StreamPage from './pages/stream/Stream';
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';
import "semantic-ui-css/semantic.min.css";
import './index.css';


ReactDOM.render(
    <CookiesProvider>
        <BrowserRouter>
            <PublicRoute exact path="/"         component={LoginPage} />
            <PublicRoute exact path="/redirect" component={RedirectController} />
            <PublicRoute exact path="/login"    component={LoginPage} />
            <PrivateRoute exact path="/stream"  component={StreamPage} />
        </BrowserRouter>
    </CookiesProvider>,
    document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
