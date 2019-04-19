/* encoding: utf-8 */

import { Component } from "react";
import { withCookies } from "react-cookie";
import { parse as argsParse } from "query-string/index";
import { authConfig, requestConfig } from "../config";


class RedirectController extends Component {


    componentDidMount() {
        const { search } = this.props.location;
        const request = argsParse(search);
        this.fetchTwitterToken(request['oauth_token'], request['oauth_verifier'])
            .then(res => this.login(res))
    }


    fetchTwitterToken(token, verifier) {
        let customConfig = requestConfig;
        customConfig.body = JSON.stringify({
            oauth_token: token,
            oauth_verifier: verifier
        });

        return fetch(authConfig.tokenURL, customConfig)
            .then(res => res.json())
            .catch(err => console.log(err));
    }


    login(response) {
        const { cookies, history } = this.props;
        const account = response['twitter_account'];
        const token = response['twitter_token'];

        cookies.set('twitter_account', account, { path: '/' });
        cookies.set('twitter_token', token, { path: '/' });
        history.push("/stream");
    }


    render() {
        return null;
    }
}


export default withCookies(RedirectController);
