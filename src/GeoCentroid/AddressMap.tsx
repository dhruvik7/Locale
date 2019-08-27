import React from "react";
import { observer } from "mobx-react";
import getStore from "./store/store";
import { GoogleMapProvider, Marker, MapBox } from "@googlemap-react/core";
import { API_KEY } from "../api";

@observer
class AddressMap extends React.Component {
  render() {
    const markers = getStore().coordinates.map((coord, index) => (
      <Marker
        id={getStore().text[index]}
        opts={{
          draggable: false,
          title: getStore().text[index],
          position: coord
        }}
      />
    ));

    const zips = getStore().resultCoordinates.map((coord, i) => (
      <Marker
        id={getStore().results[i].zip}
        opts={{
          draggable: false,
          title: getStore().results[i].zip,
          icon: {
            url: "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|".concat(
              getColor(i)
            )
          },
          position: coord
        }}
      />
    ));
    return (
      <GoogleMapProvider>
        <MapBox
          apiKey={API_KEY}
          opts={{
            center: {
              lat: getStore().centroid.latitude,
              lng: getStore().centroid.longitude
            },
            zoom: 10
          }}
          style={{ height: "100vh", width: "100%" }}
          useVisualization
        />
        {markers}
        {zips}
      </GoogleMapProvider>
    );
  }
}

var convert = require("color-convert");

function getColor(index: number): string {
  const value =
    (getStore().results.length - getStore().results[index].rank) /
    getStore().results.length;
  //value from 0 to 1
  var hue = (value * 120).toString(10);
  return convert.hsl.hex(hue, 100, 50);
}

export default AddressMap;
