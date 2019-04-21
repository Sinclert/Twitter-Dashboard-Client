/* encoding: utf-8 */

import React from "react";
import { Redirect, Route } from "react-router-dom";
import { withCookies } from "react-cookie";


const PublicRoute = ({ component: Component, ...props }) => {

    const { cookies } = props;
    const account = cookies.get('twitter_account');
    const token = cookies.get('twitter_token');

    const isLoggedOut = (account === undefined || token === undefined);

    return (
        <Route
            {...props}
            render={props =>
                isLoggedOut ? (<Component {...props}/>) : (<Redirect to="/stream"/>)
            }
        />
    )
};


export default withCookies(PublicRoute);
