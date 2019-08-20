import { createStore } from "satcheljs";

interface SliderStore {
  sliderNums: number[];
}

const getStore = createStore<SliderStore>("SliderStore", {
  sliderNums: [50, 50]
});

export default getStore;
