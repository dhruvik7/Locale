import { createStore } from "satcheljs";

interface Coordinate {
  lat: number;
  lng: number;
}
interface LocationEntryStore {
  entries: number;
  currentEntry: string;
  text: string[];
  sliderNum: number;
  coordinates: Coordinate[];
  submitted: boolean;
  centroid: { latitude: number; longitude: number };
  zipCodes: string[];
  datum: number[][];
  rankedData: number[][];
}

const getStore = createStore<LocationEntryStore>("LocationEntryStore", {
  entries: 0,
  currentEntry: "",
  text: [],
  sliderNum: 50,
  coordinates: [],
  submitted: false,
  centroid: { latitude: 0, longitude: 0 },
  zipCodes: [],
  datum: [],
  rankedData: []
});

export default getStore;
