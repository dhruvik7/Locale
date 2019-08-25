import * as React from "react";
import SliderEntry from "./SliderEntry";
import getStore from "./store/store";
import { observer } from "mobx-react";

@observer
class WalkingSlider extends React.Component {
  render() {
    return (
      <SliderEntry
        lowEnd="not important"
        highEnd="very important"
        title="walkability"
        desc="how important is it for you to live in a walkable neighborhood?"
        value={getStore().sliderNums[14]}
        index={14}
      />
    );
  }
}

export default WalkingSlider;
