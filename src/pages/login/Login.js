/* encoding: utf-8 */

import React, { Component } from "react";
import { withCookies } from "react-cookie";
import { Grid } from "semantic-ui-react";
import LoginForm from "./components/LoginForm";
import "./Login.css";


class LoginPage extends Component {


    checkLoggedOut() {
        const { cookies, history } = this.props;
        const account = cookies.get('twitter_account');
        const token = cookies.get('twitter_token');

        if (account !== undefined && token !== undefined) {
            history.replace("/stream")
        }
    }


    componentDidMount() {
        this.checkLoggedOut();
    }


    render() {
        return (
            <Grid className="login-layout" textAlign="center" verticalAlign="middle">
                <Grid.Column style={{ maxWidth: 450 }}>
                    <LoginForm/>
                </Grid.Column>
            </Grid>
        );
    }
}


export default withCookies(LoginPage);
