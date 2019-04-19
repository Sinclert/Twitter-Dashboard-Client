/* encoding: utf-8 */

import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import StreamDetails from "./StreamDetails";
import StreamGraphs from "./StreamGraphs";
import StreamMap from "./StreamMap";
import StreamSidebar from "./StreamSidebar";


export default class StreamPanel extends Component {


    constructor(props) {
        super(props);
        this.state = {
            chosenTab: "map",
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
                laptop: {
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
        this.setStreamFilterWord = this.setStreamFilterWord.bind(this);
        this.setStreamLocation = this.setStreamLocation.bind(this);
        this.setStreamMaxResults = this.setStreamMaxResults.bind(this);
    }


    // Testing adding and removing data points
    componentDidMount () {
        this.updateCategoryTweets({x_coords: 37.802416, y_coords: -122.399547, text: "Example"}, "android");
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
                            streamProps={this.state.streamProps}
                            setStreamFilterWord={this.setStreamFilterWord}
                            setStreamLocation={this.setStreamLocation}
                            setStreamMaxResults={this.setStreamMaxResults}/>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row stretched className="panel-body">
                    <Grid.Column width={1} className="panel-body-sidebar">
                        <StreamSidebar
                            chosenTab={this.state.chosenTab}
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
