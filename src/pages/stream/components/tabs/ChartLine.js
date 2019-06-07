/* encoding: utf-8 */

import React, { Component } from "react";
import { Container, Grid, Header, Segment } from "semantic-ui-react"
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
                            <Container >
                                <Header as="h2">Sentiment evolution over time</Header>
                                <p className="chart-description-p">
                                    This graph considers the aggregated number of tweets
                                    per each of the sentiment alternatives,
                                    and represents its evolution over time.
                                </p>
                                <p className="chart-description-p">
                                    There are four possible sentiment labels.
                                    Three of them are valid options obtained
                                    from a trained machine learning classifier,
                                    and one of them is the default value
                                    when the classifier does not have enough confidence.
                                </p>
                                <p className="chart-description-p">
                                    The sentiment labels are:
                                    <ul>
                                        <li>Positive (green).</li>
                                        <li>Negative (red).</li>
                                        <li>Neutral (gray).</li>
                                        <li>Unknown (white).</li>
                                    </ul>
                                </p>
                            </Container>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
        );
    }
}
