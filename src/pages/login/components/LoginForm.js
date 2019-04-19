/* encoding: utf-8 */

import React, { Component } from "react";
import { Button, Header, Icon } from "semantic-ui-react";
import { authConfig, requestConfig } from "../../../config";


export default class LoginForm extends Component {


    constructor(props) {
        super(props);
        this.goToTwitter = this.goToTwitter.bind(this);
    }


    fetchTwitterURL() {
        fetch(authConfig.loginURL, requestConfig)
            .then(res => { return res.json() })
            .catch(err => console.log(err));
    }


    // TODO: There is a bug here
    goToTwitter() {
        this.fetchTwitterURL()
            .then(res => window.location.replace(res['auth_url']))
    }


    render() {
        return (
            <div>
                <Header as="h2" color="blue" textAlign="center">
                    <Icon color="blue" name="chart bar outline"/>
                    Twitter Dashboards
                </Header>
                <Button
                    color="blue"
                    fluid size="large"
                    onClick={this.goToTwitter}>
                    Login
                </Button>
            </div>
        );
    }
}
