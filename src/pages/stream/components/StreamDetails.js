/* encoding: utf-8 */

import React, { Component } from "react";
import { Icon, Image, List, Segment } from "semantic-ui-react";


export default class StreamDetails extends Component {

    render() {
        const { filter, location, numResults } = this.props.streamProps;

        return (
            <Segment>
                <List horizontal className="details-list">

                    <List.Item className="details-item">
                        <Image avatar>
                            <Icon circular inverted color="blue" name="map marker"/>
                        </Image>
                        <List.Content className="details-item-content">
                            <b>Location:</b> {location}
                        </List.Content>
                    </List.Item>

                    <List.Item className="details-item">
                        <Image avatar>
                            <Icon circular inverted color="blue" name="filter"/>
                        </Image>
                        <List.Content className="details-item-content">
                            <b>Filter term:</b> {filter}
                        </List.Content>
                    </List.Item>

                    <List.Item className="details-item">
                        <Image avatar>
                            <Icon circular inverted color="blue" name="options"/>
                        </Image>
                        <List.Content className="details-item-content">
                            <b>Simultaneous results:</b> {numResults}
                        </List.Content>
                    </List.Item>

                </List>
            </Segment>
        );
    }
}
