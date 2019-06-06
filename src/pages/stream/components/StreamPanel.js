/* encoding: utf-8 */

import React, { Component } from "react";
import { withCookies } from "react-cookie";
import { Grid } from "semantic-ui-react";
import io from "socket.io-client";
import { requestConfig, socketURL, startURL, stopURL } from "../../../config";
import StreamDetails from "./StreamDetails";
import StreamGraphs from "./StreamGraphs";
import StreamMap from "./StreamMap";
import StreamSidebar from "./StreamSidebar";


class StreamPanel extends Component {


    constructor(props) {
        super(props);
        this.state = {
            chosenTab: "map",
            streamSocket: io(socketURL),
            streamStarted: false,
            streamProps: {
                filterWord: "",
                location:   "",
                numResults: 20,
            },
            streamData: [],
        };

        // Stream source filters
        this.streamSources = ["android", "iphone", "web", "other"];

        // Necessary binding in order to allow children actions
        this.setGraphsTab  = this.setGraphsTab.bind(this);
        this.setMapTab     = this.setMapTab.bind(this);
        this.startStream   = this.startStream.bind(this);
        this.stopStream    = this.stopStream.bind(this);

        // Socket listeners
        this.state.streamSocket.on('json', tweet => this.updateData(tweet));
    }


    renderTab() {
        switch (this.state.chosenTab) {
            case "graphs":
                return <StreamGraphs
                    streamData={this.state.streamData}
                    streamSources={this.streamSources}
                />;
            case "map":
                return <StreamMap
                    streamData={this.state.streamData}
                    streamSources={this.streamSources}
                />;
            default:
                return <StreamMap
                    streamData={this.state.streamData}
                    streamSources={this.streamSources}
                />;
        }
    }


    setMapTab() {
        this.setState({chosenTab: "map"});
    }


    setGraphsTab() {
        this.setState({chosenTab: "graphs"});
    }


    buildRequest() {
        const { cookies } = this.props;
        const account = cookies.get("twitter_account");
        const token = cookies.get("twitter_token");

        let customConfig = requestConfig;
        customConfig.body = JSON.stringify({
            twitter_account: account,
            twitter_token: token
        });
        return customConfig;
    }


    setStreamProps(word, location, results) {
        this.setState({
            streamProps: {
                filterWord: word,
                location: location,
                numResults: results
            }
        });
    }


    startStream(filterWord, location, maxResults) {
        this.setStreamProps(filterWord, location, maxResults);

        fetch(startURL, this.buildRequest())
            .then(() => this.setState({ streamStarted: true }))
            .catch(err => console.log(err))
    }


    stopStream() {
        this.setStreamProps("", "", 20);

        fetch(stopURL, this.buildRequest())
            .then(() => this.setState({
                streamStarted: false,
                streamData: []
            }))
            .catch(err => console.log(err));
    }


    updateData(tweet) {
        let maxResults = this.state.streamProps.numResults;
        let streamData = this.state.streamData;

        if (streamData.length === maxResults) {
            streamData.shift();
        }

        streamData = [...streamData, JSON.parse(tweet)];
        this.setState({
            streamData: streamData
        })
    }


    render() {
        return (
            <Grid className="panel-layout">

                <Grid.Row stretched className="panel-header">
                    <Grid.Column width={16}>
                        <StreamDetails
                            startStream={this.startStream}
                            stopStream={this.stopStream}
                            streamStarted={this.state.streamStarted}
                        />
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row stretched className="panel-body">
                    <Grid.Column width={1} className="panel-body-sidebar">
                        <StreamSidebar
                            chosenTab={this.state.chosenTab}
                            setGraphsTab={this.setGraphsTab}
                            setMapTab={this.setMapTab}
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


export default withCookies(StreamPanel);
