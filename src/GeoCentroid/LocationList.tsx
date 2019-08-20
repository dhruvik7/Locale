import React from "react";
import { observer } from "mobx-react";
import getStore from "./store/store";
import { removeAddress } from "./actions/locationEntryActions";
import "./mutators/locationEntryMutators";
import "./preferenceStyles.css";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

@observer
class LocationList extends React.Component<{}> {
  render() {
    const addresses = getStore().text;
    const addressList = addresses.map(address => (
      <ListItem className="listItem">
        <ListItemText primary={address} />
        <ListItemSecondaryAction>
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={() => removeAddress(address)}
          >
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    ));
    return addresses.length > 0 ? (
      <div className="list">
        <List>{addressList}</List>
      </div>
    ) : null;
  }
}

export default LocationList;
