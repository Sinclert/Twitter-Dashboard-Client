/* encoding: utf-8 */

import React, { Component } from "react";
import { CircleMarker, FeatureGroup, LayersControl, Map, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";


export default class StreamMap extends Component {

    constructor(props) {
        super(props);
        this.state = {
            center: [37.765248, -122.402676],
            zoom: 10,
            tweets: {
                android: {
                    color: "green",
                    data: [{x_coords: 37.802416, y_coords: -122.399547, text: "Example"}],
                },
                iphone: {
                    color: "blue",
                    data: [],
                },
                laptop: {
                    color: "red",
                    data: [],
                },
                other: {
                    color: "grey",
                    data: [],
                },
            },
        };
    }

    componentDidMount () {
        const map = this.refs.map.leafletElement;
        setTimeout(() => map.invalidateSize(), 0);
    }

    render() {
        const layers = Object.keys(this.state.tweets);

        return (
            // The "ref" prop is necessary to obtain the created instance
            <Map center={this.state.center} zoom={this.state.zoom} ref="map">

                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="<a href=http://osm.org/copyright>OpenStreetMap</a>"
                />

                <LayersControl>
                    {layers.map((layerName, index) =>
                        <LayersControl.Overlay
                            key={index}
                            name={layerName}>
                            <FeatureGroup color="purple">
                                {this.state.tweets[layerName].data.map((tweet, index) =>
                                    <CircleMarker
                                        key={index}
                                        center={[tweet.x_coords, tweet.y_coords]}
                                        radius={2}>
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
