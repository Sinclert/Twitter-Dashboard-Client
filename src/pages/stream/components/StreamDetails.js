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
            unsavedStreamMaxResults: 20,
        };

        // Necessary binding in order to allow father actions
        this.startStream = this.startStream.bind(this);
        this.stopStream = this.stopStream.bind(this);
    }


    startStream() {
        this.props.startStream(
            this.state.unsavedStreamFilterWord,
            this.state.unsavedStreamLocation,
            this.state.unsavedStreamMaxResults
        );
    }


    stopStream() {
        this.props.stopStream();
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
        const { streamStarted } = this.props;

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
                            className="dropdown"
                            defaultValue={20}
                            options={options}
                            size="small"
                            onChange={(event, change) => this.updateUnsavedMaxResults(change)}
                        />
                    </Menu.Item>

                    <Menu.Menu position="right">
                        <Menu.Item className="details-start-container">
                            <Button
                                color={streamStarted ? 'red' : 'blue'}
                                onClick={streamStarted ? this.stopStream : this.startStream}>
                                {streamStarted ? 'Stop' : 'Start'}
                            </Button>
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>
            </Segment>
        );
    }
}
