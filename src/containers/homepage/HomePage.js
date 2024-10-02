import React, { Component } from "react";
import HomeHeader from "./HomeHeader";
import { connect } from "react-redux";
import Specialty from "./section/Specialty.js";
import MedicalSystem from "./section/MedicalSystem.js";
import OutstandingDoctor from "./section/OutstandingDoctor.js";
import HandBook from "./section/HandBook.js";
import About from "./section/About.js";
import HomeFooter from "./HomeFooter.js";
import "./HomePage.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { after } from "lodash";
class Home extends Component {
  render() {
    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
    };
    return (
      <div>
        <HomeHeader isShowBanner={true}></HomeHeader>
        <Specialty settings={settings}></Specialty>
        <MedicalSystem settings={settings}></MedicalSystem>
        <OutstandingDoctor settings={settings}></OutstandingDoctor>
        <HandBook settings={settings}></HandBook>
        <About></About>
        <HomeFooter></HomeFooter>
        {/* <div style={{ height: "300px" }}></div> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
