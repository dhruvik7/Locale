import { action } from "satcheljs";

export let addNewAddress = action("addNewAddress");
export let maintainInput = action("maintainInput", event => ({ event }));
export let removeAddress = action("removeAddress", (address: string) => ({
  address
}));
export let submitAddresses = action(
  "submitAddresses",
  (latitude: number, longitude: number) => ({ latitude, longitude })
);
export let submit = action("submit");
export let geocode = action("geocode");
export let formRankedMatrix = action("formRankedMatrix");
export let setCentroid = action("setCentroid", center => ({ center }));
export let setZipCode = action("setZipCode", zipcode => ({ zipcode }));
export let addData = action("addData", data => ({ data }));
export let computeRanking = action("computeRanking");
