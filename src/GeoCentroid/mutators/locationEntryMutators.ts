import { mutator } from "satcheljs";
import {
  addNewAddress,
  maintainInput,
  removeAddress,
  submit,
  submitAddresses,
  setCentroid,
  setZipCode,
  addData,
  formRankedMatrix,
  computeRanking
} from "../actions/locationEntryActions";
import getStore from "../store/store";
import { getSliderState } from "../../Sliders/selectors/sliderSelectors";

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

mutator(addData, actionMessage => {
  getStore().datum.push(Object.values(actionMessage.data.data()));
  getStore().valid_zipcodes.push(actionMessage.data.id);
});

mutator(formRankedMatrix, actionMessage => {
  //setting the rows of rankedData to each category's rankings
  const temp: number[][] = [];
  for (var i = 0; i < getStore().datum[0].length; i++) {
    //each "category" column
    var raw_data = getStore().datum.map(function(value, index) {
      return value[i];
    });
    temp.push(getRanking(raw_data));
  }
  //making the rows into zipcodes again via transpose
  getStore().rankedData = temp[0].map((col, i) => temp.map(row => row[i]));
  console.log("done");
  console.log(getStore().rankedData);
});

function getRanking(vals: number[]): number[] {
  const sorted = vals.slice().sort(function(a, b) {
    return a - b;
  });
  return vals.map(function(val) {
    return sorted.indexOf(val) + 1;
  });
}

function normalize(vals: number[]): number[] {
  var min = vals[0];
  var max = vals[0];
  for (var i = 0, len = vals.length; i < len; i++) {
    if (vals[i] > max) {
      max = vals[i];
    }
    if (vals[i] < min) {
      min = vals[i];
    }
  }
  const res: number[] = [];
  for (var j = 0; j < len; j++) {
    res.push((vals[j] - min) / (max - min));
  }
  return res;
}

mutator(computeRanking, actionMessage => {
  getStore().finalScores = getStore().rankedData.map(zip =>
    dotProduct(getSliderState(), zip)
  );
  console.log(getStore().finalScores);
});

function dotProduct(arr1: number[], arr2: number[]) {
  var sum = 0;
  console.log(arr2.length);
  if (arr1.length === arr2.length) {
    for (var i = 0, len = arr1.length; i < len; i++) {
      sum += arr1[i] * arr2[i];
    }
  }
  return sum;
}
