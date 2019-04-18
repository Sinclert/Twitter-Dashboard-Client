/* encoding: utf-8 */

import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import LoginForm from "./components/LoginForm";
import "./Login.css";


export default class LoginPage extends Component {


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
