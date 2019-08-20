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
  tempLat: number;
  tempLon: number;
  centroid: { latitude: number; longitude: number };
  zipCodes: string[];
}

const getStore = createStore<LocationEntryStore>("LocationEntryStore", {
  entries: 0,
  currentEntry: "",
  text: [],
  sliderNum: 50,
  coordinates: [],
  submitted: false,
  tempLat: 0,
  tempLon: 0,
  centroid: { latitude: 0, longitude: 0 },
  zipCodes: []
});

export default getStore;
