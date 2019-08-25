import * as React from "react";
import SliderEntry from "./SliderEntry";
import getStore from "./store/store";
import { observer } from "mobx-react";

@observer
class FamilySlider extends React.Component {
  render() {
    return (
      <SliderEntry
        lowEnd="not at all"
        highEnd="a lot"
        title="family"
        desc="how much would you like to live in a family-oriented neighorhood?"
        value={getStore().sliderNums[9]}
        index={9}
      />
    );
  }
}

export default FamilySlider;
