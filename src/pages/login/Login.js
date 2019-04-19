/* encoding: utf-8 */

import React, { Component } from "react";
import { Button, Grid, Header, Icon } from "semantic-ui-react";
import { withCookies } from "react-cookie";
import { parse as argsParse } from "query-string";
import "./Login.css";


class LoginPage extends Component {


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


    checkLoggedOut() {
        const { cookies, history } = this.props;
        const account = cookies.get('twitter_account');
        const token = cookies.get('twitter_token');

        if (account !== undefined && token !== undefined) {
            history.replace("/stream")
        }
    }


    fetchTwitterURL() {
        fetch(LoginPage.authLoginURL, LoginPage.RequestProps)
            .then(res => res.json())
            .then(res => window.location.replace(res['auth_url']))
            .catch(err => console.log(err));
    }


    fetchTwitterToken(oauth_token, oauth_verifier) {
        let newProps = {
            body: JSON.stringify({
                oauth_token: oauth_token,
                oauth_verifier: oauth_verifier
            })
        };

        fetch(LoginPage.authTokenURL, LoginPage.addRequestProps(newProps))
            .then(res => res.json())
            .then(res => this.saveTwitterInfo(res))
            .then(this.props.history.push("/stream"))
            .catch(err => console.log(err));
    }


    saveTwitterInfo(response) {
        const { cookies } = this.props;
        const account = response['twitter_account'];
        const token = response['twitter_token'];

        cookies.set('twitter_account', account, { path: '/' });
        cookies.set('twitter_token', token, { path: '/' });
        this.setState({
            twitterAccount: account,
            twitterToken: token
        })
    }


    componentDidMount() {
        this.checkLoggedOut();

        // TODO: There is a bug here
        // Once the user is redirected from Twitter login
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


export default withCookies(LoginPage);
