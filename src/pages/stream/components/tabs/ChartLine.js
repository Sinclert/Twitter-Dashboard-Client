/* encoding: utf-8 */

import React, { Component } from "react";
import { Container, Grid, Header, Segment } from "semantic-ui-react"
import { Line } from "react-chartjs-2"


export default class LineChart extends Component {


    constructor(props) {
        super(props);
        this.sentimentLabels = ['Positive', 'Negative', 'Neutral', 'Unknown'];
    }


    render() {
        const { streamAggSentimentData } = this.props;

        return (
            <Segment padded>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={10}>
                            <Line
                                width={400}
                                height={250}
                                data={{
                                    datasets: [
                                        {
                                            label: 'Positive',
                                            data: streamAggSentimentData['positive'],
                                            borderColor: 'rgb(000, 150, 000)',
                                            backgroundColor: 'rgb(000, 150, 000)',
                                            fill: false,
                                        },
                                        {
                                            label: 'Negative',
                                            data: streamAggSentimentData['negative'],
                                            borderColor: 'rgb(150, 000, 000)',
                                            backgroundColor: 'rgb(150, 000, 000)',
                                            fill: false,
                                        },
                                        {
                                            label: 'Neutral',
                                            data: streamAggSentimentData['neutral'],
                                            borderColor: 'rgb(100, 100, 100)',
                                            backgroundColor: 'rgb(100, 100, 100)',
                                            fill: false,
                                        },
                                        {
                                            label: 'Unknown',
                                            data: streamAggSentimentData['unknown'],
                                            borderColor: 'rgb(200, 200, 200)',
                                            backgroundColor: 'rgb(200, 200, 200)',
                                            fill: false,
                                        },
                                    ],
                                    labels: ['T-08', 'T-07', 'T-06', 'T-05', 'T-04', 'T-03','T-02', 'T-01', 'Now']
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
                                </p>
                                <ul>
                                    <li>Positive (green).</li>
                                    <li>Negative (red).</li>
                                    <li>Neutral (gray).</li>
                                    <li>Unknown (white).</li>
                                </ul>
                            </Container>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
        );
    }
}
