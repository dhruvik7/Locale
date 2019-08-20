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
    geocode();
  }

  render() {
    const formattedCoords = getStore().coordinates.map(coordinate => (
      <li>
        {coordinate.lat},{coordinate.lng}
      </li>
    ));
    return (
      <div>
        {" "}
        <ul>{formattedCoords}</ul>
        {getStore().zipCodes.length > 0 ? getStore().zipCodes[0] : null}
      </div>
    );
  }
}

export default ResultList;
