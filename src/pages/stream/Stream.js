/* encoding: utf-8 */

import React, { Component } from "react";
import { withCookies } from "react-cookie";
import { Grid } from "semantic-ui-react";
import Header from "./components/Header";
import StreamPanel from "./components/StreamPanel";
import "./Stream.css";


class StreamPage extends Component {


    checkLoggedIn() {
        const { cookies, history } = this.props;
        const account = cookies.get('twitter_account');
        const token = cookies.get('twitter_token');

        if (account === undefined || token === undefined) {
            history.replace("/login")
        }
    }


    componentDidMount() {
        this.checkLoggedIn();
    }


    render() {
        return (
            <Grid className="stream-layout">
                <Grid.Row stretched className="stream-header">
                    <Grid.Column width={16}>
                        <Header/>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row stretched className="stream-body">
                    <Grid.Column width={16}>
                        <StreamPanel/>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}


export default withCookies(StreamPage);
