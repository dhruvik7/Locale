import * as React from "react";
import SliderEntry from "./SliderEntry";
import getStore from "./store/store";
import { observer } from "mobx-react";

@observer
class UrbanSlider extends React.Component {
  render() {
    return (
      <SliderEntry
        lowEnd="rural"
        highEnd="urban"
        title="density"
        desc="would you like to live in a city or small town?"
        value={getStore().sliderNums[13]}
        index={13}
      />
    );
  }
}

export default UrbanSlider;
