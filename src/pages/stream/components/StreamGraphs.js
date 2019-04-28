/* encoding: utf-8 */

import React, { Component } from "react";
import { Bar, Line } from "react-chartjs-2"
import { Grid, Segment } from "semantic-ui-react"


// Example
const data = {
     labels: ["January", "February", "March", "April", "May", "June", "July"],
     datasets: [{
         label: "My First dataset",
         backgroundColor: 'rgb(0, 120, 200)',
         borderColor: 'rgb(0, 120, 200)',
         data: [0, 10, 5, 2, 20, 30, 45],
     }]
};


export default class StreamGraphs extends Component {

    render() {
        return (
            <Segment>
                <Grid>
                    <Grid.Row stretched>
                        <Grid.Column width={8}>
                            <Line data={data} width={600} height={250}/>
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <Bar data={data} width={600} height={250}/>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row stretched>
                        <Grid.Column width={8}>
                            <Line data={data} width={600} height={250}/>
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <Bar data={data} width={600} height={250}/>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
        );
    }
}
