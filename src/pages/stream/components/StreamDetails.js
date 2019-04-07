/* encoding: utf-8 */

import React, { Component } from "react";
import { Button, Dropdown, Grid, Icon, Image, Input, List, Segment } from "semantic-ui-react";


const options = [
    {text: '20', value: 20},
    {text: '50', value: 50},
    {text: '100', value: 100},
    {text: '200', value: 200},
];


export default class StreamDetails extends Component {


    constructor(props) {
        super(props);
        this.state = {
            unsavedStreamFilterWord: "",
            unsavedStreamLocation: "",
            unsavedStreamMaxResults: "",
        };
    }

    // TODO: There is a bug here
    saveStreamProps() {
        this.props.setStreamFilterWord(this.state.unsavedStreamFilterWord);
        this.props.setStreamLocation(this.state.unsavedStreamLocation);
        this.props.setStreamMaxResults(this.state.unsavedStreamMaxResults);
    }


    updateUnsavedFilter(event) {
        this.setState({
            unsavedStreamFilterWord: event.target.value
        });
    }


    updateUnsavedLocation(event) {
        this.setState({
            unsavedStreamLocation: event.target.value
        });
    }


    updateUnsavedMaxResults(event) {
        // TODO: There is a bug here
        this.setState({
            unsavedStreamMaxResults: event.target.value
        });
    }


    render() {
        return (
            <Segment>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={5}>
                            <List horizontal className="details-list">
                                <List.Item>
                                    <Image avatar>
                                        <Icon circular inverted color="blue" name="map marker"/>
                                    </Image>
                                </List.Item>
                                <List.Item>
                                    <b>Location:</b>
                                </List.Item>
                                <List.Item className="details-list-input">
                                    <Input
                                        fluid
                                        placeholder="San Francisco..."
                                        size="small"
                                        onChange={event => this.updateUnsavedFilter(event)}
                                    />
                                </List.Item>
                            </List>
                        </Grid.Column>

                        <Grid.Column width={5}>
                            <List horizontal className="details-list">
                                <List.Item>
                                    <Image avatar>
                                        <Icon circular inverted color="blue" name="filter"/>
                                    </Image>
                                </List.Item>
                                <List.Item>
                                    <b>Filter term:</b>
                                </List.Item>
                                <List.Item className="details-list-input">
                                    <Input
                                        fluid
                                        placeholder="Golden Gate..."
                                        size="small"
                                        onChange={event => this.updateUnsavedLocation(event)}
                                    />
                                </List.Item>
                            </List>
                        </Grid.Column>

                        <Grid.Column width={5}>
                            <List horizontal className="details-list">
                                <List.Item>
                                    <Image avatar>
                                        <Icon circular inverted color="blue" name="options"/>
                                    </Image>
                                </List.Item>
                                <List.Item>
                                    <b>Results per category:</b>
                                </List.Item>
                                <List.Item className="details-list-dropdown">
                                    <Dropdown
                                        fluid
                                        selection
                                        options={options}
                                        size="small"
                                        onChange={event => this.updateUnsavedMaxResults(event)}
                                    />
                                </List.Item>
                            </List>
                        </Grid.Column>

                        <Grid.Column width={1} verticalAlign="middle">
                            <Button
                                primary
                                onClick={this.saveStreamProps}>
                                Start
                            </Button>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
        );
    }
}
