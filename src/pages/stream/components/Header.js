/* encoding: utf-8 */

import React, { Component } from "react";
import { withCookies } from "react-cookie";
import { withRouter } from "react-router-dom";
import { Menu, Segment } from "semantic-ui-react";


class Header extends Component {


    constructor(props) {
        super(props);

        // Necessary binding in order access class props
        this.logout = this.logout.bind(this);
    }


    logout() {
        const { cookies, history } = this.props;
        cookies.remove("twitter_account");
        cookies.remove("twitter_token");
        history.replace("/");
    }


    render() {
        return (
            <Segment>
                <Menu secondary>
                    <Menu.Item name="Twitter Dashboards"/>
                    <Menu.Menu position="right">
                        <Menu.Item
                            name="Logout"
                            onClick={this.logout}
                        />
                    </Menu.Menu>
                </Menu>
            </Segment>
        );
    }
}


export default withCookies(withRouter(Header));
