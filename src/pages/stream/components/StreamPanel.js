/* encoding: utf-8 */

import StreamDetails from "./StreamDetails";
import StreamMap from "./StreamMap";
import React, { Component } from "react";
import { Grid } from "semantic-ui-react";


export default class StreamPanel extends Component {

    render() {
        return (
            <Grid className="panel-layout">
                <Grid.Row stretched className="panel-header">
                    <Grid.Column width={16}>
                        <StreamDetails/>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row stretched className="panel-body">
                    <Grid.Column width={16}>
                        <StreamMap/>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}
