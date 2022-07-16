import React, { Component } from "react";
import * as d3 from "d3";
import GoogleMapReact from "google-map-react";

import Marker from "./Marker";

class Map extends Component {
    static defaultProps = {
        center: {
            lat: 37.7694208,
            lng: -122.4262138,
        },
        zoom: 11,
    };

    state = {
        colorScale30: d3
            .scaleOrdinal()
            .domain(d3.range(15))
            .range(d3.range(15).map((d, idx) => d3.interpolateSinebow(idx / 15))),
    };

    getMarkerData = (data, constraints) => {
        const { colorScale30 } = this.state;
        const { xAxisName, fineSelectValue } = constraints;

        var markerData = [];
        if (fineSelectValue.length !== 0) {
            markerData = data
                .filter((ele) => fineSelectValue.includes(ele[xAxisName]))
                .map((ele) => ({
                    target: ele[xAxisName],
                    address: ele.Locations,
                    latitude: ele.Latitude,
                    longitude: ele.Longitude,
                }));

            const uniqueTarget = [...new Set(markerData.map((ele) => ele.target))];

            markerData = markerData.map((ele) => ({
                ...ele,
                color: colorScale30(uniqueTarget.indexOf(ele.target)),
            }));
        }

        return markerData;
    };

    render() {
        const { data, constraints, center, zoom } = this.props;
        const markerData = this.getMarkerData(data, constraints);

        return (
            <React.Fragment>
                <div>Map</div>
                <div style={{ height: "100%", width: "100%" }}>
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: "AIzaSyALnnQIgYfZ4UyhBXfRUtTwmbnfoqBcTxA" }}
                        defaultCenter={center}
                        defaultZoom={zoom}
                        yesIWantToUseGoogleMapApiInternals
                    >
                        {markerData.map((ele, idx) => (
                            <Marker
                                key={idx}
                                text={ele.address}
                                lat={ele.latitude}
                                lng={ele.longitude}
                                color={ele.color}
                            />
                        ))}
                    </GoogleMapReact>
                </div>
            </React.Fragment>
        );
    }
}
export default Map;
