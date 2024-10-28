import React, { Component } from "react";
import "./MedicalSystem.scss";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getAllClinic } from "../../../services/userService";
import { withRouter } from "react-router";

class MedicalSystem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataClinics: [],
    };
  }
  async componentDidMount() {
    let res = await getAllClinic();
    if (res && res.errCode === 0) {
      this.setState({
        dataClinics: res.data ? res.data : "",
      });
    }
  }
  handleViewDetailClinic = (clinic) => {
    if (this.props.history) {
      this.props.history.push(`/detail-clinic/${clinic.id}`);
    }
  };
  render() {
    let { dataClinics } = this.state;
    console.log("<<<<>>>>", this.state);
    return (
      <div className="section-share section-medicalsystem">
        <div className="section-header">
          <h1>Cơ sở y tế nổi bật</h1>
          <div>
            <button className="button">Xem thêm</button>
          </div>
        </div>
        <div className="section-container">
          <Slider {...this.props.settings}>
            {dataClinics &&
              dataClinics.length > 0 &&
              dataClinics.map((item, index) => {
                return (
                  <div
                    className="img-customize"
                    key={index}
                    onClick={() => this.handleViewDetailClinic(item)}
                  >
                    <img src={item.image} />
                    <h3>{item.name}</h3>
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
  connect(mapStateToProps, mapDispatchToProps)(MedicalSystem)
);
