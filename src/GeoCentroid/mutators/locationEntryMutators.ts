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
  computeRanking,
  createRankingArray,
  removeFirst,
  setLoaded,
  addFinalCoordinate,
  setInvalidResponse
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
});

mutator(maintainInput, actionMessage => {
  getStore().currentEntry = actionMessage.event.target.value;
});

mutator(removeAddress, actionMessage => {
  getStore().text.splice(getStore().text.indexOf(actionMessage.address), 1);
  getStore().entries--;
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
    getStore().valid_zipcodes = [];
    getStore().datum = [];
    getStore().rankedData = [];
    getStore().finalScores = [];
    getStore().results = [];
    getStore().resultCoordinates = [];
    getStore().startedSession = true;
    getStore().invalidResponse = false;
  } else {
    alert("You must add at least one location to proceed with your search");
  }
});

mutator(setLoaded, actionMessage => {
  getStore().submitted = false;
});

mutator(setCentroid, actionMessage => {
  getStore().centroid = actionMessage.center;
});

mutator(setZipCode, actionMessage => {
  getStore().zipCodes.push(actionMessage.zipcode);
});

mutator(removeFirst, actionMessage => {
  getStore().zipCodes.shift();
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

mutator(createRankingArray, actionMessage => {
  const len = getStore().finalScores.length;
  const placements = getRanking(getStore().finalScores).map(function(x) {
    return len - x + 1;
  });
  for (var i = 0; i < len; i++) {
    getStore().results.push({
      zip: getStore().valid_zipcodes[i],
      score: getStore().finalScores[i],
      rank: placements[i]
    });
  }
  getStore().results = getStore().results.sort(function(a, b) {
    return a.rank - b.rank;
  });
});

mutator(addFinalCoordinate, actionMessage => {
  getStore().resultCoordinates.push({
    lat: actionMessage.lat,
    lng: actionMessage.lng
  });
});

mutator(setInvalidResponse, actionMessage => {
  getStore().invalidResponse = true;
  getStore().submitted = false;
  getStore().startedSession = false;
});
