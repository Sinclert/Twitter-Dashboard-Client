/* encoding: utf-8 */

import React, { Component } from "react";
import { Grid, Segment } from "semantic-ui-react"
import { Line } from "react-chartjs-2"


export default class LineChart extends Component {


    constructor(props) {
        super(props);
        this.sentimentLabels = ['Positive', 'Negative', 'Neutral', 'Unknown'];
    }


    updateCounters(data) {
        let newCounters = [];

        this.sentimentLabels.forEach((sentiment) => {
            let counter = 0;
            data.forEach((tweet) => {
                let label = tweet.label.toLowerCase();
                let sent  = sentiment.toLowerCase();
                if (label === sent) {
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
                        <Grid.Column width={10}>
                            <Line
                                width={400}
                                height={250}
                                data={{
                                    datasets: [{
                                        label: 'Sentiment',
                                        data: this.updateCounters(streamData),
                                        backgroundColor: [
                                            'rgb(000, 150, 000)',
                                            'rgb(150, 000, 000)',
                                            'rgb(100, 100, 100)',
                                            'rgb(200, 200, 200)',
                                        ],
                                    }],
                                    labels: this.sentimentLabels,
                                }}
                            />
                        </Grid.Column>
                        <Grid.Column width={6}>
                            Example text
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
        );
    }
}
