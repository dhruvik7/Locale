import { orchestrator } from "satcheljs";
import getStore from "../store/store";
import axios from "axios";
import {
  submitAddresses,
  geocode,
  setCentroid,
  setZipCode
} from "../actions/locationEntryActions";
import "../mutators/locationEntryMutators";
import { getCenter } from "geolib";

const API_KEY = "abc";
const ZIPCODE_KEY = "abc";

async function driver() {
  await geocodeHelper();
  centroidHelper();
  await closestZipCode();
  await zipCodeList();
}

orchestrator(geocode, actionMessage => {
  driver();
});

async function geocodeHelper() {
  for (const index in getStore().text) {
    const address = getStore().text[index];
    const urlified = URLify(address);
    const response = await axios.get(
      "https://maps.googleapis.com/maps/api/geocode/json?address=".concat(
        urlified,
        API_KEY
      )
    );
    if (response.data.results.length > 0) {
      const longitude = response.data.results[0].geometry.location.lng;
      const latitude = response.data.results[0].geometry.location.lat;
      submitAddresses(latitude, longitude);
    }
  }
}

function centroidHelper() {
  let coords = getStore().coordinates.map(coord => ({
    latitude: coord.lat,
    longitude: coord.lng
  }));
  setCentroid(getCenter(coords));
  console.log(getStore().centroid);
}

async function closestZipCode() {
  const latlng = getStore()
    .centroid.latitude.toString()
    .concat(", ", getStore().centroid.longitude.toString());
  const response = await axios.get(
    "https://maps.googleapis.com/maps/api/geocode/json?latlng=".concat(
      latlng,
      API_KEY
    )
  );
  const components = response.data.results[0].address_components;
  for (var i in components) {
    if (components[i].types[0] === "postal_code") {
      setZipCode(components[i].short_name);
      console.log(getStore().zipCodes);
      return;
    }
  }
}

async function zipCodeList() {
  const centerZip = getStore().zipCodes[0];
  const response = await axios.get(
    "http://api.zip-codes.com/ZipCodesAPI.svc/1.0/FindZipCodesInRadius?zipcode=".concat(
      centerZip,
      "&maximumradius=15&minimumradius=0&key=",
      ZIPCODE_KEY
    )
  );
  for (var index = 0; index < response.data.DataList.length; index++) {
    setZipCode(response.data.DataList[index].Code);
  }
  console.log(getStore().zipCodes);
}

function URLify(str: string) {
  return str.trim().replace(/\s/g, "%20");
}
