import React from "react";
import { observer } from "mobx-react";
import getStore from "./store/store";
import { addNewAddress, maintainInput } from "./actions/locationEntryActions";
import "./mutators/locationEntryMutators";
import "./preferenceStyles.css";
import FormControl from "@material-ui/core/FormControl";
import Fab from "@material-ui/core/Fab";
import InputLabel from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import LocationList from "./LocationList";

@observer
class LocationEntry extends React.Component<{}> {
  render() {
    const store = getStore();
    return (
      <div className="entryContainer">
        <h1>locations</h1>
        <h3>
          List any addresses or places of significance to you (work,
          friends/family, etc.)
        </h3>
        <FormControl>
          <TextField
            name="address"
            placeholder="address"
            value={store.currentEntry}
            onChange={maintainInput}
            id="location-input"
            aria-describedby="location-helper"
            fullWidth
          />

          <div className="add">
            <Fab color="primary" onClick={addNewAddress}>
              Add
            </Fab>
          </div>
        </FormControl>
        <LocationList />
      </div>
    );
  }
}

export default LocationEntry;
