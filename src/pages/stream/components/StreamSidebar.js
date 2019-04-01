/* encoding: utf-8 */

import React, { Component } from "react";
import { Icon, Image, List, Segment } from "semantic-ui-react";


export default class StreamSidebar extends Component {

    render() {

        // Change-state functions passed by the parent
        const { setGraphsTab, setMapTab } = this.props;

        return (
            <Segment textAlign="center">
                <List relaxed="very">
                    <List.Item className="panel-body-sidebar-tab" onClick={setMapTab}>
                        <Image avatar size="big">
                            <Icon circular inverted color="blue" name="map"/>
                        </Image>
                    </List.Item>
                    <List.Item className="panel-body-sidebar-tab" onClick={setGraphsTab}>
                        <Image avatar size="big">
                            <Icon circular inverted color="blue" name="pie graph"/>
                        </Image>
                    </List.Item>
                </List>
            </Segment>
        );
    }
}
