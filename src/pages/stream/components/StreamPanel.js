/* encoding: utf-8 */

import React, { Component } from "react";
import { withCookies } from "react-cookie";
import { Grid } from "semantic-ui-react";
import io from "socket.io-client";
import { socketURL, startURL, stopURL, requestConfig } from "../../../config";
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
                location: "",
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
        this.startStream = this.startStream.bind(this);
        this.stopStream = this.stopStream.bind(this);

        // Socket listeners
        this.state.streamSocket.on('tweet', tweet => this.handleTweet(tweet));
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


    handleTweet(tweet) {
        tweet = JSON.parse(tweet);
        const category = tweet.source;
        this.updateCategoryTweets(tweet, category);
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
        this.setStreamProps("", "", 50);

        fetch(stopURL, this.buildRequest())
            .then(() => this.setState({ streamStarted: false }))
            .catch(err => console.log(err));
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
