/* encoding: utf-8 */

import React, { Component } from "react";
import { withCookies } from "react-cookie";
import { Grid } from "semantic-ui-react";
import { streamConfig, requestConfig } from "../../../config";
import StreamDetails from "./StreamDetails";
import StreamGraphs from "./StreamGraphs";
import StreamMap from "./StreamMap";
import StreamSidebar from "./StreamSidebar";



class StreamPanel extends Component {


    constructor(props) {
        super(props);
        this.state = {
            chosenTab: "map",
            streamStarted: false,
            streamProps: {
                filterWord: "Everything",
                location: "San Francisco",
                numResults: 50,
            },
            streamData: {
                android: {
                    color: "green",
                    tweets: [],
                },
                iphone: {
                    color: "blue",
                    tweets: [],
                },
                web: {
                    color: "red",
                    tweets: [],
                },
                other: {
                    color: "grey",
                    tweets: [],
                },
            },
        };

        // Necessary binding in order to allow children actions
        this.setGraphsTab = this.setGraphsTab.bind(this);
        this.setMapTab = this.setMapTab.bind(this);
        this.setStream = this.setStream.bind(this);
    }


    // Testing adding and removing data points
    componentDidMount () {
        this.updateCategoryTweets({coords: {lon: 37.802416, lat: -122.399547}, text: "Example"}, "android");
    }


    setMapTab() {
        this.setState({chosenTab: "map"});
    }


    setGraphsTab() {
        this.setState({chosenTab: "graphs"});
    }


    setStreamFilterWord(filterWord) {
        const oldStreamProps = this.state.streamProps;
        this.setState({
            ...oldStreamProps,
            filterWord: filterWord
        });
    }


    setStreamLocation(location) {
        const oldStreamProps = this.state.streamProps;
        this.setState({
            ...oldStreamProps,
            location: location
        });
    }


    setStreamMaxResults(maxResults) {
        const oldStreamProps = this.state.streamProps;
        this.setState({
            ...oldStreamProps,
            numResults: maxResults
        });
    }


    setStream(filterWord, location, maxResults) {
        this.setStreamFilterWord(filterWord);
        this.setStreamLocation(location);
        this.setStreamMaxResults(maxResults);
        this.startStream();
    }


    startStream() {
        const { cookies } = this.props;
        const account = cookies.get("twitter_account");
        const token = cookies.get("twitter_token");

        let customConfig = requestConfig;
        customConfig.body = JSON.stringify({
            twitter_account: account,
            twitter_token: token
        });

        fetch(streamConfig.startURL, customConfig)
            .then(() => this.setState({ streamStarted: true }))
            .catch(err => console.log(err))
    }


    renderTab() {
        switch (this.state.chosenTab) {
            case "graphs":
                return <StreamGraphs streamData={this.state.streamData}/>;
            case "map":
                return <StreamMap streamData={this.state.streamData}/>;
            default:
                return <StreamMap streamData={this.state.streamData}/>;
        }
    }


    addCategoryTweet(tweet, category) {
        const oldStreamData = this.state.streamData;
        const oldCategoryProps = oldStreamData[category];
        const oldCategoryTweets = oldCategoryProps.tweets;

        const newCategory = {
            ...oldCategoryProps,
            tweets: [
                ...oldCategoryTweets,
                tweet
            ],
        };

        const newStreamData = oldStreamData;
        newStreamData[category] = newCategory;
        this.setState({
            streamData: newStreamData
        })
    }


    removeCategoryTweet(category) {
        const oldStreamData = this.state.streamData;
        const oldCategoryProps = oldStreamData[category];
        const oldCategoryTweets = oldCategoryProps.tweets;
        oldCategoryTweets.shift();

        const newCategory = {
            ...oldCategoryProps,
            tweets: oldCategoryTweets
        };

        const newStreamData = oldStreamData;
        newStreamData[category] = newCategory;
        this.setState({
            streamData: newStreamData
        })
    }


    updateCategoryTweets(tweet, category) {
        let tweetsList = this.state.streamData[category].tweets;
        let maxResults = this.state.streamProps.numResults;

        if (tweetsList.length === maxResults) {
            this.removeCategoryTweet(category);
        }
        this.addCategoryTweet(tweet, category);
    }


    render() {
        return (
            <Grid className="panel-layout">

                <Grid.Row stretched className="panel-header">
                    <Grid.Column width={16}>
                        <StreamDetails
                            setStream={this.setStream}
                            streamProps={this.state.streamProps}
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
