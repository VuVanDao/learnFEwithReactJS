import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils/";

import { withRouter } from "react-router";
class OutstandingDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctors: [],
    };
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
      this.setState({
        arrDoctors: this.props.topDoctorsRedux,
      });
    }
  }
  componentDidMount() {
    this.props.loadTopDoctor();
  }
  handleViewDetailDoctor = (doctor) => {
    console.log("VANDAO CHECK detaiDOctor:", doctor);
    this.props.history.push(`/detail-doctor/${doctor.id}`);
  };
  render() {
    let allDoctors = this.state.arrDoctors;
    let { language } = this.props;
    // allDoctors = allDoctors.concat(allDoctors);
    return (
      <div className="section-share section-outstandingdoctor">
        <div className="section-header">
          <h1>
            <FormattedMessage id="homepage.out-standing-doctor" />
          </h1>
          <div>
            <button className="button">
              <FormattedMessage id="homepage.see-more" />
            </button>
          </div>
        </div>
        <div className="section-container">
          <Slider {...this.props.settings}>
            {allDoctors &&
              allDoctors.length > 0 &&
              allDoctors.map((item, index) => {
                let imageBase64 = "";
                if (item.image) {
                  imageBase64 = new Buffer(item.image, "base64").toString(
                    "binary"
                  );
                }

                let nameEn = `${item.positionData.valueEn} ${item.firstName} ${item.lastName}`;
                let nameVi = `${item.positionData.valueVi} ${item.firstName} ${item.lastName}`;
                return (
                  <div
                    className="img-customize"
                    key={item.id}
                    onClick={() => this.handleViewDetailDoctor(item)}
                  >
                    <div
                      style={{
                        backgroundImage: `url(${imageBase64})`,
                      }}
                    ></div>
                    <h4>{language === LANGUAGES.VI ? nameVi : nameEn}</h4>
                    <h4>Giáo sư {index + 1}</h4>
                  </div>
                );
              })}
          </Slider>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    isLoggedIn: state.user.isLoggedIn,
    topDoctorsRedux: state.admin.topDoctors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadTopDoctor: () => dispatch(actions.fetchTopDoctor()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OutstandingDoctor)
);
