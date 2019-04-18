/* encoding: utf-8 */

import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Button } from "semantic-ui-react";


const LinkButton = withRouter(({ history }) => (
    <Button
        color="blue"
        fluid size="large"
        onClick={() => { history.push('/stream') }}>
        Login
    </Button>
));


export default class LoginButton extends Component {

    render() {
        return (
            <LinkButton/>
        );
    }
}
