import * as React from "react";
import SliderEntry from "./SliderEntry";
import getStore from "./store/store";
import { observer } from "mobx-react";

@observer
class HousingSlider extends React.Component {
  render() {
    return (
      <SliderEntry
        lowEnd="own"
        highEnd="rent"
        title="real estate"
        desc="are you looking to rent or own? (slider indicates strength of preference)"
        value={getStore().sliderNums[10]}
        index={10}
      />
    );
  }
}

export default HousingSlider;
