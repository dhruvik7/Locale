import getStore from "../store/store";

export function getSliderState(): number[] {
  return getStore().sliderNums;
}
