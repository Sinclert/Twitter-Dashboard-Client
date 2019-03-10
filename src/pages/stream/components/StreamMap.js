/* encoding: utf-8 */

import React, { Component } from "react";
import { Map, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";


export default class StreamMap extends Component {

    componentDidMount () {
        const map = this.refs.map.leafletElement;
        setTimeout(() => map.invalidateSize(), 0);
    }

    render() {
        return (
            // The "ref" prop is necessary to obtain the created instance
            <Map center={[51.505, -0.09]} zoom={10} ref="map">
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="<a href=http://osm.org/copyright>OpenStreetMap</a>"
                />
            </Map>
        );
    }
}
