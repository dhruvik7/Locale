import * as React from "react";
import { observer } from "mobx-react";
import { geocode } from "./actions/locationEntryActions";
import "./orchestrators/locationOrchestrators";
import LinearProgress from "@material-ui/core/LinearProgress";
import "./resultStyles.css";

@observer
class LoadingResults extends React.Component<{}> {
  async componentDidMount() {
    await geocode();
  }

  render() {
    return (
      <div className="loadingbar">
        <LinearProgress variant="query" />
        <br />
        <LinearProgress color="secondary" variant="query" />
      </div>
    );
  }
}

export default LoadingResults;
