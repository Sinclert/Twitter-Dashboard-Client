/* encoding: utf-8 */

import React, { Component } from "react";
import { Grid, Segment } from "semantic-ui-react"
import { Doughnut } from "react-chartjs-2"


export default class PieChart extends Component {


    constructor(props) {
        super(props);
        this.sourceLabels = ['Android', 'iPhone', 'Web', 'Other'];
    }


    updateCounters(data) {
        let newCounters = [];

        this.sourceLabels.forEach((source) => {
            let counter = 0;
            data.forEach((tweet) => {
                if (tweet.source.toLowerCase() === source.toLowerCase()) {
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
                            <Doughnut
                                width={400}
                                height={250}
                                data={{
                                    datasets: [{
                                        data: this.updateCounters(streamData),
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
                            Example text
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
        );
    }
}
