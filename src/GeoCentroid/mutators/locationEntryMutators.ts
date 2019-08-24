import { mutator } from "satcheljs";
import {
  addNewAddress,
  maintainInput,
  removeAddress,
  submit,
  submitAddresses,
  setCentroid,
  setZipCode,
  removeInvalidZipCode,
  addData
} from "../actions/locationEntryActions";
import getStore from "../store/store";
// import { geocode } from "../services/geocoding";

mutator(addNewAddress, () => {
  if (
    getStore().currentEntry !== "" &&
    getStore().text.indexOf(getStore().currentEntry) === -1
  ) {
    getStore().text[getStore().entries] = getStore().currentEntry;
    getStore().entries++;
    getStore().currentEntry = "";
  }
  getStore().submitted = false;
});

mutator(maintainInput, actionMessage => {
  getStore().currentEntry = actionMessage.event.target.value;
});

mutator(removeAddress, actionMessage => {
  getStore().text.splice(getStore().text.indexOf(actionMessage.address), 1);
  getStore().entries--;
  getStore().submitted = false;
});

mutator(submitAddresses, actionMessage => {
  getStore().coordinates.push({
    lat: actionMessage.latitude,
    lng: actionMessage.longitude
  });
});

mutator(submit, actionMessage => {
  if (getStore().text.length > 0) {
    getStore().submitted = true;
    getStore().coordinates = [];
    getStore().zipCodes = [];
  } else {
    alert("You must add at least one location to proceed with your search");
  }
});

mutator(setCentroid, actionMessage => {
  getStore().centroid = actionMessage.center;
});

mutator(setZipCode, actionMessage => {
  getStore().zipCodes.push(actionMessage.zipcode);
});

mutator(removeInvalidZipCode, actionMessage => {
  getStore().zipCodes.splice(actionMessage.index, 1);
});

mutator(addData, actionMessage => {
  getStore().datum.push(actionMessage.data);
  console.log(Object.keys(actionMessage.data));
  console.log(getRanking([12, 1.3, 4, 37, 98, 123.4]));
});

function getRanking(vals: number[]): number[] {
  const sorted = vals.slice().sort(function(a, b) {
    return a - b;
  });
  return vals.map(function(val) {
    return sorted.indexOf(val) + 1;
  });
}
