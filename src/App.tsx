import React from "react";
import "./App.css";
import LocationEntry from "./GeoCentroid/LocationEntry";
import { observer } from "mobx-react";
import Fab from "@material-ui/core/Fab";
import Container from "react-bootstrap/Container";
import SchoolSlider from "./Sliders/SchoolSlider";
import { scroller } from "react-scroll";
import { submit } from "./GeoCentroid/actions/locationEntryActions";
import HousingSlider from "./Sliders/HousingSlider";
import EducationSlider from "./Sliders/EducationSlider";
import WalkingSlider from "./Sliders/WalkingSlider";
import UrbanSlider from "./Sliders/UrbanSlider";
import TransitSlider from "./Sliders/TransitSlider";
import FamilySlider from "./Sliders/FamilySlider";
import ResultsContainer from "./GeoCentroid/ResultContainer";

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        Welcome to Locale
        <div className="Sub-header">find your perfect neighborhood</div>
        <Fab
          variant="extended"
          // style={{ color: "#aaaaaa" }}
          color="secondary"
          size="large"
          onClick={() => scrollTo("content")}
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
          <Fab
            type="submit"
            onClick={() => {
              submit();
              scrollTo("resultBox");
            }}
            color="secondary"
          >
            Submit
          </Fab>
        </Container>
        <ResultsContainer />
      </div>
    </div>
  );
};

function scrollTo(loc: string): void {
  setTimeout(() => {
    scroller.scrollTo(loc, {
      smooth: true,
      duration: 800
    });
  }, 1);
}

export default observer(App);
