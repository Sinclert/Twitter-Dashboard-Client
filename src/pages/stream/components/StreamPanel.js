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
            chosenTab: null,
            streamProps: {
                filter: "Everything",
                location: "San Francisco",
                numResults: "50",
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
    }


    componentDidMount () {
        // Adding a sample point to the data
        this.addCategoryTweet({x_coords: 37.802416, y_coords: -122.399547, text: "Example"}, "android")
    }


    setMapTab() {
        this.setState({chosenTab: "map"});
    }


    setGraphsTab() {
        this.setState({chosenTab: "graphs"});
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


    render() {
        return (
            <Grid className="panel-layout">

                <Grid.Row stretched className="panel-header">
                    <Grid.Column width={16}>
                        <StreamDetails streamProps={this.state.streamProps}/>
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
