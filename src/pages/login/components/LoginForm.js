/* encoding: utf-8 */

import React, { Component } from "react";
import { Button, Header, Icon } from "semantic-ui-react";
import { loginURL, requestConfig } from "../../../config";


export default class LoginForm extends Component {


    constructor(props) {
        super(props);
        this.goToTwitter = this.goToTwitter.bind(this);
    }


    fetchTwitterURL() {
        return fetch(loginURL, requestConfig)
            .then(res => res.json())
            .catch(err => console.log(err));
    }


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
