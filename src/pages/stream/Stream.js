/* encoding: utf-8 */

import Header from "./components/Header";
import StreamPanel from "./components/StreamPanel";
import StreamSidebar from "./components/StreamSidebar";
import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import './Stream.css';


export default class Stream extends Component {

    render() {
        return (
            <Grid className="stream-layout">
                <Grid.Row stretched className="stream-header">
                    <Grid.Column width={16}>
                        <Header/>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row stretched className="stream-body">
                    <Grid.Column width={3}>
                        <StreamSidebar/>
                    </Grid.Column>
                    <Grid.Column width={13}>
                        <StreamPanel/>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}
