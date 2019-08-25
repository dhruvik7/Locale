import * as React from "react";
import SliderEntry from "./SliderEntry";
import getStore from "./store/store";
import { observer } from "mobx-react";

@observer
class TransitSlider extends React.Component {
  render() {
    return (
      <SliderEntry
        lowEnd="not important"
        highEnd="very important"
        title="transportation"
        desc="how important is it for you to have access to a good public transportation system?"
        value={getStore().sliderNums[11]}
        index={11}
      />
    );
  }
}

export default TransitSlider;
