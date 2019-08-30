import * as React from "react";
import { observer } from "mobx-react";
import getStore from "./store/store";
import ResultList from "./ResultList";
import LoadingResults from "./LoadingResults";
import AddressMap from "./AddressMap";
import "./resultStyles.css";

@observer
class ResultsContainer extends React.Component<{}> {
  render() {
    if (getStore().submitted) {
      return (
        <div className="resultBox">
          <LoadingResults />
        </div>
      );
    } else if (getStore().startedSession) {
      return (
        <div className="resultBox">
          <ResultList />
          <AddressMap />
        </div>
      );
    } else {
      return null;
    }
  }
}

export default ResultsContainer;
