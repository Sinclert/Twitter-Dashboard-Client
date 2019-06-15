/* encoding: utf-8 */

import React, { Component } from "react";
import { Container, Grid, Header, Segment } from "semantic-ui-react"
import { Doughnut } from "react-chartjs-2"


export default class PieChart extends Component {


    constructor(props) {
        super(props);
        this.sourceLabels = ['Android', 'iPhone', 'Web', 'Other'];
    }


    render() {
        const { streamAggSourceData } = this.props;

        return (
            <Segment padded>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={10}>
                            <Doughnut
                                width={400}
                                height={250}
                                data={{
                                    datasets: [{
                                        data: streamAggSourceData,
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
                        <Grid.Column width={6}>
                            <Container >
                                <Header as="h2">Source device proportion</Header>
                                <p className="chart-description-p">
                                    This graph considers the aggregated number of tweets
                                    per each of the possible sources they can be created,
                                    representing it in a proportional manner.
                                </p>
                                <p className="chart-description-p">
                                    There are three possible source devices.
                                    Three of them are valid options obtained
                                    natively from the streaming API tweets,
                                    while one of the is the default value when
                                    the source do not fall among the majority options.
                                </p>
                                <p className="chart-description-p">
                                    The source devices are:
                                </p>
                                <ul>
                                    <li>Android (green).</li>
                                    <li>iPhone (white).</li>
                                    <li>Web browser (blue).</li>
                                    <li>Other (gray).</li>
                                </ul>
                            </Container>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
        );
    }
}
