/* encoding: utf-8 */

import React, { Component } from "react";
import { Map, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'


export default class StreamMap extends Component {

    render() {
        return (
            <Map center={[51.505, -0.09]} zoom={13}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="<a href=http://osm.org/copyright>OpenStreetMap</a>"
                />
            </Map>
        );
    }
}
