import { createStore } from "satcheljs";

interface Coordinate {
  lat: number;
  lng: number;
}

interface Result {
  zip: string;
  score: number;
  rank: number;
}

interface LocationEntryStore {
  startedSession: boolean;
  entries: number;
  currentEntry: string;
  text: string[];
  sliderNum: number;
  coordinates: Coordinate[];
  submitted: boolean;
  centroid: { latitude: number; longitude: number };
  zipCodes: string[];
  valid_zipcodes: string[];
  datum: number[][];
  rankedData: number[][];
  finalScores: number[];
  results: Result[];
  resultCoordinates: Coordinate[];
}

const getStore = createStore<LocationEntryStore>("LocationEntryStore", {
  startedSession: false,
  entries: 0,
  currentEntry: "",
  text: [],
  sliderNum: 50,
  coordinates: [],
  submitted: false,
  centroid: { latitude: 0, longitude: 0 },
  zipCodes: [],
  valid_zipcodes: [],
  datum: [],
  rankedData: [],
  finalScores: [],
  results: [],
  resultCoordinates: []
});

export default getStore;
