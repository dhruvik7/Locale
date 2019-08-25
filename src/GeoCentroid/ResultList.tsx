import * as React from "react";
import { observer } from "mobx-react";
import getStore from "./store/store";
import { geocode } from "./actions/locationEntryActions";
import "./orchestrators/locationOrchestrators";

interface Coordinate {
  lat: number;
  lng: number;
}

@observer
class ResultList extends React.Component<{}> {
  async componentDidMount() {
    await geocode();
  }

  render() {
    return (
      <div>
        <ul>
          {getStore().valid_zipcodes.map(zip => (
            <li>
              {zip},{" "}
              {getStore().finalScores[getStore().valid_zipcodes.indexOf(zip)]}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default ResultList;
