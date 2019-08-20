import { action } from "satcheljs";
export let maintainSlider = action(
  "maintainSlider",
  (value: number, slider: number) => ({
    value,
    slider
  })
);
