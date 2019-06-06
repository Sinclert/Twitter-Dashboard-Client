/* encoding: utf-8 */

import React, { Component } from "react";
import { colorTilesHost, colorTilesAttr, greyTilesHost, greyTilesAttr } from "../../../config";
import { CircleMarker, FeatureGroup, LayersControl, Map, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";


const labelColors = {
    'positive': 'green',
    'negative': 'red',
    'neutral': 'gray'
};


export default class StreamMap extends Component {


    constructor(props) {
        super(props);
        this.state = {
            mapCenter: [37.765248, -122.402676],
            mapZoom: 10,
            markersRadius: 4,
        };
    }


    componentDidMount () {
        const map = this.map.leafletElement;
        setTimeout(() => map.invalidateSize(), 0);
    }


    render() {
        const { streamData, streamSources } = this.props;
        const { mapCenter, mapZoom, markersRadius } = this.state;

        return (
            // The "ref" prop is necessary to obtain the created instance
            <Map center={mapCenter} zoom={mapZoom} ref={(ref) => this.map = ref}>
                <LayersControl>
                    <LayersControl.BaseLayer
                        checked={false}
                        name="Color">
                        <TileLayer
                            url={colorTilesHost}
                            attribution={colorTilesAttr}
                        />
                    </LayersControl.BaseLayer>
                    <LayersControl.BaseLayer
                        checked={true}
                        name="Greyscale">
                        <TileLayer
                            url={greyTilesHost}
                            attribution={greyTilesAttr}
                        />
                    </LayersControl.BaseLayer>

                    {streamSources.map((source, index) =>
                        <LayersControl.Overlay
                            checked={true}
                            key={index}
                            name={source}>
                            <FeatureGroup>
                                {streamData
                                    .filter((tweet) => tweet.source === source)
                                    .map((tweet, index) =>
                                        <CircleMarker
                                            key={index}
                                            center={[tweet.coords.lat, tweet.coords.lon]}
                                            color={labelColors[tweet.label]}
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
