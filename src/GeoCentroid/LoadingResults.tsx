import * as React from "react";
import { observer } from "mobx-react";
import { geocode } from "./actions/locationEntryActions";
import "./orchestrators/locationOrchestrators";

@observer
class LoadingResults extends React.Component<{}> {
  async componentDidMount() {
    await geocode();
  }

  render() {
    return <p>Loading</p>;
  }
}

export default LoadingResults;
