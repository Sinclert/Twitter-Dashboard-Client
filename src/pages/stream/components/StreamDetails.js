/* encoding: utf-8 */

import React, { Component } from "react";
import { Icon, Image, List, Segment } from "semantic-ui-react";


export default class StreamDetails extends Component {

    render() {
        return (
            <Segment>
                <List horizontal className="details-list">
                    <List.Item className="details-item">
                        <Image avatar>
                            <Icon circular inverted color="blue" name="map marker"/>
                        </Image>
                        <List.Content>
                            <List.Header>Location:</List.Header>
                        </List.Content>
                    </List.Item>
                    <List.Item className="details-item">
                        <Image avatar>
                            <Icon circular inverted color="blue" name="filter"/>
                        </Image>
                        <List.Content>
                            <List.Header>Filter term:</List.Header>
                        </List.Content>
                    </List.Item>
                    <List.Item className="details-item">
                        <Image avatar>
                            <Icon circular inverted color="blue" name="options"/>
                        </Image>
                        <List.Content>
                            <List.Header>Simultaneous results:</List.Header>
                        </List.Content>
                    </List.Item>
                </List>
            </Segment>
        );
    }
}
