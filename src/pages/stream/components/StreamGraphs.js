/* encoding: utf-8 */

import React, { Component } from "react";
import { Doughnut, Line } from "react-chartjs-2"
import { Grid, Segment } from "semantic-ui-react"


export default class StreamGraphs extends Component {


    constructor(props) {
        super(props);
        this.sourceLabels = ['Android', 'iPhone', 'Web', 'Other'];
        this.sentimentLabels = ['Positive', 'Negative', 'Neutral'];
    }


    updateSourceCounters(streamData) {
        let newCounters = [];

        this.sourceLabels.forEach((source) => {
            let counter = 0;
            streamData.forEach((tweet) => {
                if (tweet.source.toLowerCase() === source.toLowerCase()) {
                    counter++;
                }
            });
            newCounters.push(counter);
        });
        return newCounters;
    }


    updateSentimentCounters(streamData) {
        let newCounters = [];

        this.sentimentLabels.forEach((source) => {
            let counter = 0;
            streamData.forEach((tweet) => {
                if (tweet.label.toLowerCase() === source.toLowerCase()) {
                    counter++;
                }
            });
            newCounters.push(counter);
        });

        return newCounters;
    }


    render() {
        const { streamData } = this.props;

        return (
            <Segment padded>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={8}>
                            <Doughnut
                                width={400}
                                height={250}
                                data={{
                                    datasets: [{
                                        data: this.updateSourceCounters(streamData),
                                        backgroundColor: [
                                            'rgb(000, 150, 000)',
                                            'rgb(200, 200, 200)',
                                            'rgb(000, 150, 200)',
                                            'rgb(100, 100, 100)',
                                        ]
                                    }],
                                    labels: this.sourceLabels,
                                }}
                            />
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <Line
                                width={400}
                                height={250}
                                data={{
                                    datasets: [{
                                        label: 'Sentiment',
                                        data: this.updateSentimentCounters(streamData),
                                        backgroundColor: [
                                            'rgb(000, 150, 000)',
                                            'rgb(150, 000, 000)',
                                            'rgb(100, 100, 100)',
                                        ],
                                    }],
                                    labels: this.sentimentLabels,
                                }}
                            />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
        );
    }
}
