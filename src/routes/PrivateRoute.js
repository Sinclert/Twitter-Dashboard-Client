/* encoding: utf-8 */

import React from "react";
import { Redirect, Route } from "react-router-dom";
import { withCookies } from "react-cookie";


const PrivateRoute = ({ component: Component, ...props }) => {

    const { cookies } = props;
    const account = cookies.get('twitter_account');
    const token = cookies.get('twitter_token');

    const isLoggedIn = (account !== undefined && token !== undefined);

    return (
        <Route
            {...props}
            render={props =>
                isLoggedIn ? (<Component {...props}/>) : (<Redirect to="/login"/>)
            }
        />
    )
};


export default withCookies(PrivateRoute);
