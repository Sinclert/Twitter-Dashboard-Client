/* encoding: utf-8 */

import React, { Component } from "react";
import { Grid, Segment } from "semantic-ui-react";
import './Stream.css';


export default class Stream extends Component {

    render() {
        return (
            <Grid className="stream-layout">
                <Grid.Row stretched className="stream-header">
                    <Grid.Column width={16}>
                        <Segment>Header</Segment>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row stretched className="stream-panel">
                    <Grid.Column width={3}>
                        <Segment>Details</Segment>
                    </Grid.Column>
                    <Grid.Column width={13}>
                        <Segment>Panel</Segment>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}
