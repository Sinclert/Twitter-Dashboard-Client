/* encoding: utf-8 */

import React, { Component } from "react";
import { Container, Grid, Header, Segment } from "semantic-ui-react"
import { Line } from "react-chartjs-2"


export default class LineChart extends Component {


    constructor(props) {
        super(props);
        this.sentimentLabels = ['positive', 'negative', 'neutral', 'unknown'];
        this.sentimentColors = {
            positive: 'rgb(000, 150, 000)',
            negative: 'rgb(150, 000, 000)',
            neutral:  'rgb(100, 100, 100)',
            unknown:  'rgb(200, 200, 200)',
        }
    }


    static capitalizeString(string) {
        return string[0].toUpperCase() + string.slice(1);
    }


    buildDatasetsList(aggregatedData) {
        let datasets = [];

        this.sentimentLabels.forEach((label) => {
            let labelSet = {
                label: LineChart.capitalizeString(label),
                data: aggregatedData[label],
                borderColor: this.sentimentColors[label],
                backgroundColor: this.sentimentColors[label],
                fill: false,
            };
            datasets.push(labelSet);
        });

        return datasets;
    }


    buildLabelsList(bufferSize) {
        let labels = [];

        for (let i = bufferSize-1; i > 0; i--) {
            const labelText = "T-" + i.toString();
            labels.push(labelText);
        }

        labels.push('Now');
        return labels;
    }


    render() {
        const {streamAggSentimentData, streamAggBufferSize } = this.props;

        return (
            <Segment padded>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={10}>
                            <Line
                                width={400}
                                height={250}
                                data={{
                                    datasets: this.buildDatasetsList(streamAggSentimentData),
                                    labels: this.buildLabelsList(streamAggBufferSize),
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
