import * as React from "react";
import SliderEntry from "./SliderEntry";
import getStore from "./store/store";
import { observer } from "mobx-react";

@observer
class SchoolSlider extends React.Component {
  render() {
    return (
      <>
        <SliderEntry
          lowEnd="not important"
          highEnd="very important"
          title="schools"
          desc="how important is it for you to live near a top public school district?"
          value={getStore().sliderNums[0]}
          index={0}
        />
      </>
    );
  }
}

export default SchoolSlider;
