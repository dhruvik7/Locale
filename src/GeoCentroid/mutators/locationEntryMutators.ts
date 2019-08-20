import { mutator } from "satcheljs";
import {
  addNewAddress,
  maintainInput,
  removeAddress,
  submit,
  submitAddresses,
  setCentroid,
  setZipCode
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
