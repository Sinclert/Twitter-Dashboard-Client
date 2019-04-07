/* encoding: utf-8 */

import React, { Component } from "react";
import { CircleMarker, FeatureGroup, LayersControl, Map, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";


export default class StreamMap extends Component {


    constructor(props) {
        super(props);
        this.state = {
            mapCenter: [37.765248, -122.402676],
            mapZoom: 10,
            markersRadius: 2,
        };
    }


    componentDidMount () {
        const map = this.refs.map.leafletElement;
        setTimeout(() => map.invalidateSize(), 0);
    }


    render() {
        const { streamData } = this.props;
        const layers = Object.keys(streamData);
        const { mapCenter, mapZoom, markersRadius } = this.state;

        return (
            // The "ref" prop is necessary to obtain the created instance
            <Map center={mapCenter} zoom={mapZoom} ref="map">

                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="<a href=http://osm.org/copyright>OpenStreetMap</a>"
                />

                <LayersControl>
                    {layers.map((layerName, index) =>
                        <LayersControl.Overlay
                            key={index}
                            name={layerName}>
                            <FeatureGroup color={streamData[layerName].color}>
                                {streamData[layerName].tweets.map((tweet, index) =>
                                    <CircleMarker
                                        key={index}
                                        center={[tweet.x_coords, tweet.y_coords]}
                                        radius={markersRadius}>
                                        <Popup>
                                            <span>{tweet.text}</span>
                                        </Popup>
                                    </CircleMarker>
                                )}
                            </FeatureGroup>
                        </LayersControl.Overlay>
                    )}
                </LayersControl>
            </Map>
        );
    }
}
