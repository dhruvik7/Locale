import React from "react";
import "./App.css";
import LocationEntry from "./GeoCentroid/LocationEntry";
import { observer } from "mobx-react";
import Fab from "@material-ui/core/Fab";
import Container from "react-bootstrap/Container";
import SchoolSlider from "./Sliders/SchoolSlider";
import { scroller } from "react-scroll";
import { submit } from "./GeoCentroid/actions/locationEntryActions";
import ResultList from "./GeoCentroid/ResultList";
import getStore from "./GeoCentroid/store/store";
import HousingSlider from "./Sliders/HousingSlider";
import EducationSlider from "./Sliders/EducationSlider";
import WalkingSlider from "./Sliders/WalkingSlider";
import UrbanSlider from "./Sliders/UrbanSlider";
import TransitSlider from "./Sliders/TransitSlider";
import FamilySlider from "./Sliders/FamilySlider";

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        Welcome to Locale
        <div className="Sub-header">find your perfect neighborhood</div>
        <Fab
          variant="extended"
          style={{ color: "#aaaaaa" }}
          size="large"
          onClick={() => scrollTo()}
        >
          get started
        </Fab>
      </header>
      <div className="content">
        <div className="intro">
          <p>
            personalize the information below to discover the perfect
            neighborhood for you
          </p>
        </div>
        <Container className="locationContainer">
          <LocationEntry />
        </Container>
        <Container className="sliderContainer">
          <SchoolSlider />
          <HousingSlider />
          <EducationSlider />
          <WalkingSlider />
          <UrbanSlider />
          <TransitSlider />
          <FamilySlider />
        </Container>
        <Fab type="submit" onClick={submit}>
          Submit
        </Fab>
        {getStore().submitted ? <ResultList /> : null}
      </div>
    </div>
  );
};

function scrollTo(): void {
  setTimeout(() => {
    scroller.scrollTo("content", {
      smooth: true,
      duration: 800
    });
  }, 1);
}

export default observer(App);
