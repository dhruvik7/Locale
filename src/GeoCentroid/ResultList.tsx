import * as React from "react";
import { observer } from "mobx-react";
import getStore from "./store/store";
import { geocode } from "./actions/locationEntryActions";
import "./orchestrators/locationOrchestrators";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import "./preferenceStyles.css";

@observer
class ResultList extends React.Component<{}> {
  async componentDidMount() {
    await geocode();
  }

  render() {
    const content = getStore().results.map(res => (
      <ListItem alignItems="center">
        <ListItemText primary={res.rank.toString().concat(": ", res.zip)} />
      </ListItem>
    ));
    return (
      <div className="list">
        <List>{content}</List>
      </div>
    );
  }
}

export default ResultList;
