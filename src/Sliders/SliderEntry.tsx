import * as React from "react";
import { observer } from "mobx-react";
import Slider from "@material-ui/core/Slider";
import { maintainSlider } from "./actions/sliderActions";
import "./mutators/sliderMutators";

export interface SliderEntryProps {
  lowEnd: string;
  highEnd: string;
  title: string;
  desc: string;
  value: number;
  index: number;
}

@observer
class SliderEntry extends React.Component<SliderEntryProps> {
  render() {
    const marks = [
      {
        value: 0,
        label: this.props.lowEnd
      },
      {
        value: 100,
        label: this.props.highEnd
      }
    ];
    return (
      <div>
        <h1>{this.props.title}</h1>
        <h3>{this.props.desc}</h3>
        <Slider
          value={this.props.value}
          onChange={(event: React.ChangeEvent<{}>, value: number | number[]) =>
            typeof value === "number"
              ? maintainSlider(value, this.props.index)
              : {}
          }
          marks={marks}
        />
      </div>
    );
  }
}

export default SliderEntry;
