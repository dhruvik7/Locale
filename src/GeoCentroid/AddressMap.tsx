import React from "react";
import { observer } from "mobx-react";
import getStore from "./store/store";
import { GoogleMapProvider, Marker, MapBox } from "@googlemap-react/core";
import { API_KEY } from "../api";

var convert = require("color-convert");

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
            url: "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|".concat(
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
        <Marker
          id="center"
          opts={{
            draggable: false,
            title: "center",
            position: {
              lat: getStore().centroid.latitude,
              lng: getStore().centroid.longitude
            },
            icon: "+"
          }}
        />
        {markers}
        {zips}
      </GoogleMapProvider>
    );
  }
}

function getColor(index: number): string {
  const hue =
    ((getStore().results.length - getStore().results[index].rank) /
      getStore().results.length) *
    120;
  //value from 0 to 1
  return convert.hsl.hex(hue, 100, 50);
}

export default AddressMap;
