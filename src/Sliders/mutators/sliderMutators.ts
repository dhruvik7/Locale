import { mutator } from "satcheljs";
import { maintainSlider } from "../actions/sliderActions";
import getStore from "../store/store";

mutator(maintainSlider, actionMessage => {
  getStore().sliderNums[actionMessage.slider] = actionMessage.value;
});
