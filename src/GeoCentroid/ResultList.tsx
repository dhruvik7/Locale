import * as React from "react";
import { observer } from "mobx-react";
import getStore from "./store/store";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import MapIcon from "@material-ui/icons/Map";
import { setCentroid } from "./actions/locationEntryActions";
import "./mutators/locationEntryMutators";

import "./resultStyles.css";

@observer
class ResultList extends React.Component<{}> {
  render() {
    const content = getStore().results.map((res, i) => (
      <ListItem alignItems="center">
        <ListItemText primary={res.rank.toString().concat(": ", res.zip)} />
        <ListItemSecondaryAction>
          <IconButton
            edge="end"
            aria-label="navigate in map"
            onClick={() =>
              setCentroid({
                latitude: getStore().resultCoordinates[i].lat,
                longitude: getStore().resultCoordinates[i].lng
              })
            }
          >
            <MapIcon />
          </IconButton>
        </ListItemSecondaryAction>
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
