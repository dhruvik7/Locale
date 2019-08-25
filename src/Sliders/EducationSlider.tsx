import * as React from "react";
import SliderEntry from "./SliderEntry";
import getStore from "./store/store";
import { observer } from "mobx-react";

@observer
class EducationSlider extends React.Component {
  render() {
    return (
      <SliderEntry
        lowEnd="not important"
        highEnd="very important"
        title="education"
        desc="how important is it for you to live in a well-educated neighborhood?"
        value={getStore().sliderNums[8]}
        index={8}
      />
    );
  }
}

export default EducationSlider;
