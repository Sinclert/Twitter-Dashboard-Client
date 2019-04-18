/* encoding: utf-8 */

import React, { Component } from "react";
import { Button, Grid, Header, Icon } from "semantic-ui-react";
import { parse as argsParse } from "query-string";
import "./Login.css";


export default class LoginPage extends Component {


    static authLoginURL = 'http://127.0.0.1:5000/login';
    static authTokenURL = 'http://127.0.0.1:5000/token';
    static RequestProps = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };


    static addRequestProps(newProps) {
        let customProps = LoginPage.RequestProps;
        for (const [key, value] of Object.entries(newProps)) {
            customProps[key] = value;
        }
        return customProps;
    }


    constructor(props) {
        super(props);
        this.state = {
            twitterAccount: null,
            twitterToken: null
        };
    }


    fetchTwitterURL() {
        fetch(LoginPage.authLoginURL, LoginPage.RequestProps)
            .then(res => res.json())
            .then(res => window.location.replace(res['auth_url']))
            .catch(err => console.log(err));
    }


    fetchTwitterToken(oauth_token, oauth_verifier) {
        let newProps = {
            body: {
                oauth_token: oauth_token,
                oauth_verifier: oauth_verifier
            }
        };

        fetch(LoginPage.authTokenURL, LoginPage.addRequestProps(newProps))
            .then(res => res.json())
            .then(res => this.setState({
                twitterAccount: res['twitter_account'],
                twitterToken: res['twitter_token']
            }))
            .catch(err => console.log(err));
    }


    componentDidMount() {
        const requestArgs = argsParse(this.props.location.search);
        const oauthToken = requestArgs['oauth_token'];
        const oauthVerifier = requestArgs['oauth_verifier'];
        if (oauthToken !== undefined && oauthVerifier !== undefined) {
            this.fetchTwitterToken(oauthToken, oauthVerifier)
        }
    }


    render() {

        return (
            <Grid className="login-layout" textAlign="center" verticalAlign="middle">
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as="h2" color="blue" textAlign="center">
                        <Icon color="blue" name="chart bar outline"/>
                        Twitter Dashboards
                    </Header>
                    <Button
                        color="blue"
                        fluid size="large"
                        onClick={this.fetchTwitterURL}>
                        Login
                    </Button>
                </Grid.Column>
            </Grid>
        );
    }
}
