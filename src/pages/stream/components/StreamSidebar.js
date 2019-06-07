/* encoding: utf-8 */

import React, { Component } from "react";
import { Icon, Menu } from "semantic-ui-react";


export default class StreamSidebar extends Component {


    render() {

        // Change-state functions passed by the parent
        const { chosenTab, setMapTab, setLineTab, setPieTab } = this.props;

        return (
            <Menu compact icon vertical>
                <Menu.Item
                    name="map"
                    active={chosenTab === "map"}
                    onClick={setMapTab}>
                    <Icon circular inverted color="blue" name="map"/>
                </Menu.Item>

                <Menu.Item
                    name="Lines chart"
                    active={chosenTab === "line"}
                    onClick={setLineTab}>
                    <Icon circular inverted color="blue" name="chart line"/>
                </Menu.Item>

                <Menu.Item
                    name="Pie chart"
                    active={chosenTab === "graphs"}
                    onClick={setPieTab}>
                    <Icon circular inverted color="blue" name="pie graph"/>
                </Menu.Item>
            </Menu>
        );
    }
}
