/* encoding: utf-8 */

import React, { Component } from "react";
import { Icon, Menu } from "semantic-ui-react";


export default class StreamSidebar extends Component {

    render() {

        // Change-state functions passed by the parent
        const { chosenTab, setGraphsTab, setMapTab } = this.props;

        return (
            <Menu compact icon vertical>
                <Menu.Item
                    name="map"
                    active={chosenTab === "map"}
                    onClick={setMapTab}>
                    <Icon circular inverted color="blue" name="map"/>
                </Menu.Item>

                <Menu.Item
                    name="graphs"
                    active={chosenTab === "graphs"}
                    onClick={setGraphsTab}>
                    <Icon circular inverted color="blue" name="pie graph"/>
                </Menu.Item>
            </Menu>
        );
    }
}
