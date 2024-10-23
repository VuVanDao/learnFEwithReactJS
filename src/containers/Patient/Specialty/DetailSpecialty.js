import React, { Component } from "react";
import { connect } from "react-redux";
import "./DetailSpecialty.scss";
import { LANGUAGES } from "../../../utils/";

import HomeHeader from "../../homepage/HomeHeader";
import { FormattedMessage } from "react-intl";
class DetailSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidUpdate(prevProps, prevState) {
    if (this.props.language !== prevProps.language) {
    }
  }
  render() {
    return (
      <>
        <HomeHeader />
        <div>form specialty siuuu</div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
