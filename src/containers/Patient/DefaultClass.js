import React, { Component } from "react";
import { connect } from "react-redux";

import { LANGUAGES } from "../../../utils/";

import { FormattedMessage } from "react-intl";
class DefaultClass extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidUpdate(prevProps, prevState) {
    if (this.props.language !== prevProps.language) {
    }
  }
  render() {
    return <div>hehehehe</div>;
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

export default connect(mapStateToProps, mapDispatchToProps)(DefaultClass);
