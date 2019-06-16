/* encoding: utf-8 */

import React, { Component } from "react";
import { withCookies } from "react-cookie";
import { Grid } from "semantic-ui-react";
import io from "socket.io-client";
import { requestConfig, socketURL, startURL, stopURL } from "../../../config";
import StreamDetails from "./StreamDetails";
import StreamSidebar from "./StreamSidebar";
import MapCanvas from "./tabs/Map";
import LineChart from "./tabs/ChartLine";
import PieChart from "./tabs/ChartPie";


const defaultStreamProps = {
    filterWord: "",
    location:   "",
    maxResults: 20,
};

const defaultStreamData = [];
const defaultStreamSourceData = [0, 0, 0, 0];
const defaultStreamSentimentData = {
    positive: [0],
    negative: [0],
    neutral:  [0],
    unknown:  [0],
};


class StreamPanel extends Component {


    constructor(props) {
        super(props);
        this.state = {
            chosenTab: "map",
            streamSocket: io(socketURL),
            streamStarted: false,
            streamProps: defaultStreamProps,
            streamData: defaultStreamData,
            streamAggBufferSize: 10,
            streamAggSourceData: defaultStreamSourceData,
            streamAggSentimentData: defaultStreamSentimentData,
        };

        // Stream source filters
        this.streamSources = ["android", "iphone", "web", "other"];

        // Necessary binding in order to allow children actions
        this.setMapTab     = this.setMapTab.bind(this);
        this.setLineTab    = this.setLineTab.bind(this);
        this.setPieTab     = this.setPieTab.bind(this);
        this.startStream   = this.startStream.bind(this);
        this.stopStream    = this.stopStream.bind(this);

        // Socket listeners
        this.state.streamSocket.on('json', tweet => this.updateData(tweet));
    }


    renderTab() {
        switch (this.state.chosenTab) {
            case "map":
                return <MapCanvas
                    streamData={this.state.streamData}
                    streamSources={this.streamSources}
                />;
            case "line":
                return <LineChart
                    streamAggSentimentData={this.state.streamAggSentimentData}
                    streamAggBufferSize={this.state.streamAggBufferSize}
                />;
            case "pie":
                return <PieChart
                    streamAggSourceData={this.state.streamAggSourceData}
                />;
            default:
                return <MapCanvas
                    streamData={this.state.streamData}
                    streamSources={this.streamSources}
                />;
        }
    }


    setMapTab() {
        this.setState({chosenTab: "map"});
    }


    setLineTab() {
        this.setState({chosenTab: "line"});
    }


    setPieTab() {
        this.setState({chosenTab: "pie"});
    }


    buildRequest(additionalData = {}) {
        const { cookies } = this.props;
        const account = cookies.get("twitter_account");
        const token = cookies.get("twitter_token");

        let customConfig = requestConfig;
        customConfig.body = JSON.stringify({
            twitter_account: account,
            twitter_token: token,
            ...additionalData,
        });
        return customConfig;
    }


    resetStreamState() {
        this.setState({
            streamStarted: false,
            streamProps: defaultStreamProps,
            streamData: defaultStreamData,
            streamAggSourceData: defaultStreamSourceData,
            streamAggSentimentData: defaultStreamSentimentData,
        });
    }


    setStreamState(newStreamProps) {
        this.setState({
            streamStarted: true,
            streamProps: newStreamProps,
        });
    }


    startStream(streamProps) {
        fetch(startURL, this.buildRequest(streamProps))
            .then(() => this.setStreamState(streamProps))
            .catch(err => console.log(err))
    }


    stopStream() {
        fetch(stopURL, this.buildRequest())
            .then(() => this.resetStreamState())
            .catch(err => console.log(err));
    }


    updateStreamData(tweet) {
        let maxResults = this.state.streamProps.maxResults;
        let streamData = this.state.streamData;

        if (streamData.length === maxResults) {
            streamData.shift();
        }

        let parsedTweet = JSON.parse(tweet);
        streamData.push(parsedTweet);

        return streamData;
    }


    countBySource(data, source) {
        let occurrences = 0;

        data.forEach((tweet) => {
            let label = tweet.source.toLowerCase();
            let src   = source.toLowerCase();
            if (label === src) {
                occurrences++;
            }
        });

        return occurrences;
    }


    computeSourceCounter(data) {
        let newCounter = [];

        this.streamSources.forEach((source) => {
            let occurrences = this.countBySource(data, source);
            newCounter.push(occurrences);
        });

        return newCounter;
    }


    countBySentiment(data, sentiment) {
        let occurrences = 0;

        data.forEach((tweet) => {
            let label = tweet.label.toLowerCase();
            let sent  = sentiment.toLowerCase();
            if (label === sent) {
                occurrences++;
            }
        });

        return occurrences;
    }


    computeSentimentCounter(data) {
        let allCounters = {};

        Object.keys(this.state.streamAggSentimentData).forEach((sentiment) => {
            const prevCounters = this.state.streamAggSentimentData[sentiment];
            const newCounter = this.countBySentiment(data, sentiment);

            if (prevCounters.length === this.state.streamAggBufferSize) {
                prevCounters.shift();
            }
            allCounters[sentiment] = [...prevCounters, newCounter];
        });

        return allCounters
    }


    updateData(tweet) {
        const newData = this.updateStreamData(tweet);
        const newAggSourceData = this.computeSourceCounter(newData);
        const newAggSentimentData = this.computeSentimentCounter(newData);

        this.setState({
            streamData: newData,
            streamAggSourceData: newAggSourceData,
            streamAggSentimentData: newAggSentimentData,
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
                            setMapTab={this.setMapTab}
                            setLineTab={this.setLineTab}
                            setPieTab={this.setPieTab}
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
