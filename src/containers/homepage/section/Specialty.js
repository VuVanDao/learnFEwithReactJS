import React, { Component } from "react";
import "./Specialty.scss";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getAllSpecialty } from "../../../services/userService";
import { withRouter } from "react-router";

class Specialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSpecialty: [],
    };
  }
  async componentDidMount() {
    let res = await getAllSpecialty();
    if (res && res.errCode == 0) {
      this.setState({
        dataSpecialty: res.data ? res.data : [],
      });
    }
  }
  handleViewDetailSpecialty = (specialties) => {
    this.props.history.push(`/detail-specialty/${specialties.id}`);
  };
  render() {
    let { dataSpecialty } = this.state;

    return (
      <div className="section-share section-specialty">
        <div className="section-header">
          <h1>
            <FormattedMessage id="homepage.specialties" />
          </h1>
          <div>
            <button className="button">
              <FormattedMessage id="homepage.see-more" />
            </button>
          </div>
        </div>
        <div className="section-container">
          <Slider {...this.props.settings}>
            {dataSpecialty &&
              dataSpecialty.length > 0 &&
              dataSpecialty.map((item, index) => {
                return (
                  <div
                    className="img-customize specialty-child"
                    key={index}
                    onClick={() => this.handleViewDetailSpecialty(item)}
                  >
                    <img src={item.image} />
                    <h3 className="specialty-name">{item.name}</h3>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Specialty)
);
