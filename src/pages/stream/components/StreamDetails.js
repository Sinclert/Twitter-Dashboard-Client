/* encoding: utf-8 */

import React, { Component } from "react";
import { Button, Dropdown, Icon, Image, Input, Menu, Segment } from "semantic-ui-react";


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

        // Necessary binding in order to allow father actions
        this.setStream = this.setStream.bind(this)
    }


    setStream() {
        this.props.setStream(
            this.state.unsavedStreamFilterWord,
            this.state.unsavedStreamLocation,
            this.state.unsavedStreamMaxResults
        );
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


    updateUnsavedMaxResults(change) {
        this.setState({
            unsavedStreamMaxResults: change.value
        });
    }


    render() {
        return (
            <Segment className="details-container">
                <Menu secondary>
                    <Menu.Item className="details-menu-item">
                        <Image avatar>
                            <Icon circular inverted color="blue" name="map marker"/>
                        </Image>
                        <b className="details-menu-text">
                            Location:
                        </b>
                        <Input
                            fluid
                            placeholder="San Francisco..."
                            size="small"
                            onChange={event => this.updateUnsavedFilter(event)}
                        />
                    </Menu.Item>

                    <Menu.Item className="details-menu-item">
                        <Image avatar>
                            <Icon circular inverted color="blue" name="filter"/>
                        </Image>
                        <b className="details-menu-text">
                            Filter term:
                        </b>
                        <Input
                            fluid
                            placeholder="Golden Gate..."
                            size="small"
                            onChange={event => this.updateUnsavedLocation(event)}
                        />
                    </Menu.Item>

                    <Menu.Item className="details-menu-item">
                        <Image avatar>
                            <Icon circular inverted color="blue" name="options"/>
                        </Image>
                        <b className="details-menu-text">
                            Results:
                        </b>
                        <Dropdown
                            fluid
                            selection
                            options={options}
                            size="small"
                            className="dropdown"
                            onChange={(event, change) => this.updateUnsavedMaxResults(change)}
                        />
                    </Menu.Item>

                    <Menu.Menu position="right">
                        <Menu.Item className="details-start-container">
                            <Button
                                primary
                                onClick={this.setStream}>
                                Start
                            </Button>
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>
            </Segment>
        );
    }
}
