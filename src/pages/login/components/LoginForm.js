/* encoding: utf-8 */

import React, { Component } from "react";
import { Header, Icon, Segment } from "semantic-ui-react";
import LoginButton from "./LoginButton"


export default class LoginForm extends Component {

    render() {
        return (
            <Segment basic>
                <Header as="h2" color="blue" textAlign="center">
                    <Icon color="blue" name="chart bar outline"/>
                    Twitter Dashboards
                </Header>
                <LoginButton/>
            </Segment>
        );
    }
}
