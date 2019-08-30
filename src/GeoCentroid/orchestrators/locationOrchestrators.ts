import { orchestrator } from "satcheljs";
import getStore from "../store/store";
import axios, { AxiosResponse } from "axios";
import {
  submitAddresses,
  geocode,
  setCentroid,
  setZipCode,
  addData,
  formRankedMatrix,
  computeRanking,
  createRankingArray,
  removeFirst,
  setLoaded,
  addFinalCoordinate
} from "../actions/locationEntryActions";
import "../mutators/locationEntryMutators";
import { getCenter } from "geolib";
import db from "../../firebase";
import { API_KEY, ZIPCODE_KEY } from "../../api";

async function driver() {
  await geocodeHelper();
  if (getStore().coordinates.length > 0) {
    centroidHelper();
    await closestZipCode();
    await zipCodeList();
    // await testZip();
    removeFirst();
    console.log("scoring");
    await addZipCodeData();
    console.log("added");
    if (getStore().datum.length > 0) {
      formRankedMatrix();
      computeRanking();
      createRankingArray();
      await getResultCoordinates();
    } else {
      alert(
        "It appears that your selected locations are not in the same region, please try again."
      );
    }
    setLoaded();
  }
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
      return;
    }
  }
}

async function zipCodeList() {
  const centerZip = getStore().zipCodes[0];
  var radius = 15;
  let response: AxiosResponse;
  do {
    response = await axios.get(
      "https://api.zip-codes.com/ZipCodesAPI.svc/1.0/FindZipCodesInRadius?zipcode=".concat(
        centerZip,
        "&maximumradius=",
        radius.toString(),
        "&minimumradius=0&key=",
        ZIPCODE_KEY
      )
    );
    radius--;
  } while (response.data.DataList.length > 600);
  for (var index = 0; index < response.data.DataList.length; index++) {
    setZipCode(response.data.DataList[index].Code);
  }
}

function URLify(str: string) {
  return str.trim().replace(/\s/g, "%20");
}

async function addZipCodeData() {
  if (getStore().zipCodes.length > 100) {
    await db
      .collection("zipcode_data")
      .get()
      .then(snapshot => {
        if (snapshot) {
          snapshot.forEach(doc => {
            if (getStore().zipCodes.includes(doc.id)) {
              addData(doc);
            }
          });
        }
      });
  } else {
    for (var i = 0, len = getStore().zipCodes.length; i < len; i++) {
      await db
        .collection("zipcode_data")
        .doc(getStore().zipCodes[i])
        .get()
        .then(doc => {
          if (doc.data()) {
            addData(doc);
          }
        });
    }
  }
}

async function getResultCoordinates() {
  for (var i = 0, len = getStore().valid_zipcodes.length; i < len; i++) {
    const response = await axios.get(
      "https://maps.googleapis.com/maps/api/geocode/json?address=".concat(
        getStore().results[i].zip,
        API_KEY
      )
    );
    if (response.data.results.length > 0) {
      addFinalCoordinate(
        response.data.results[0].geometry.location.lat,
        response.data.results[0].geometry.location.lng
      );
    }
  }
}
