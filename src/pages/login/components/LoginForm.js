/* encoding: utf-8 */

import React, { Component } from "react";
import ReactDOM from "react-dom";
import {Button, Header, Icon, Segment} from "semantic-ui-react";
import Stream from "../../stream/Stream"


export default class LoginForm extends Component {


    static launchStream() {
        ReactDOM.render(
            <Stream/>,
            document.getElementById("root")
        );
    }


    render() {
        return (
            <Segment basic>
                <Header as="h2" color="blue" textAlign="center">
                    <Icon color="blue" name="chart bar outline"/>
                    Twitter Dashboards
                </Header>
                <Button
                    color="blue"
                    fluid size="large"
                    onClick={LoginForm.launchStream}>
                    Login
                </Button>
            </Segment>
        );
    }
}
