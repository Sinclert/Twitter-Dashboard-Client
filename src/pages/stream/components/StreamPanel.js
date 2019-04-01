/* encoding: utf-8 */

import StreamDetails from "./StreamDetails";
import StreamGraphs from "./StreamGraphs";
import StreamMap from "./StreamMap";
import StreamSidebar from "./StreamSidebar";
import React, { Component } from "react";
import { Grid } from "semantic-ui-react";


export default class StreamPanel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            chosenTab: "map",
            stream: {
                filter: "",
                location: "",
                numResults: "",
            }
        };

        // Necessary binding in order to allow children actions
        this.setGraphsTab = this.setGraphsTab.bind(this);
        this.setMapTab = this.setMapTab.bind(this);
    }

    setMapTab() {
        this.setState({chosenTab: "map"});
    }

    setGraphsTab() {
        this.setState({chosenTab: "graphs"});
    }


    renderTab() {
        switch (this.state.chosenTab) {
            case "graphs":
                return <StreamGraphs/>;
            case "map":
                return <StreamMap/>;
            default:
                return <StreamMap/>;
        }
    }


    render() {
        return (
            <Grid className="panel-layout">
                <Grid.Row stretched className="panel-header">
                    <Grid.Column width={16}>
                        <StreamDetails/>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row stretched className="panel-body">
                    <Grid.Column width={1} className="panel-body-sidebar">
                        <StreamSidebar
                            setMapTab={this.setMapTab}
                            setGraphsTab={this.setGraphsTab}
                        />
                    </Grid.Column>
                    <Grid.Column width={15} className="panel-body-main">
                        { this.renderTab() }
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}
