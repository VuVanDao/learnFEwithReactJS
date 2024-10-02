import React, { Component } from "react";

import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";

class HandBook extends Component {
  render() {
    return (
      <div className="section-share section-HandBook">
        <div className="section-header">
          <h1>Cẩm nang</h1>
          <div>
            <button className="button">Xem thêm</button>
          </div>
        </div>
        <div className="section-container">
          <Slider {...this.props.settings}>
            <div className="img-customize">
              <img src="https://i.pinimg.com/originals/a4/81/c5/a481c55a27c4968831ff572ef7a504ea.gif" />
              <h4>Giáo sư 1</h4>
              <h4>Bác sĩ 1</h4>
            </div>
            <div className="img-customize">
              <img src="https://i.pinimg.com/originals/5f/14/95/5f1495f1ad8c2e3ea9cccf195133ad5c.gif" />
              <h4>Giáo sư 2</h4>
              <h4>Bác sĩ 2</h4>
            </div>
            <div className="img-customize">
              <img src="https://i.pinimg.com/originals/5c/b4/76/5cb4761543156278ea1ba1b726cd3fb6.gif" />
              <h4>Giáo sư 3</h4>
              <h4>Bác sĩ 3</h4>
            </div>
            <div className="img-customize">
              <img src="https://i.pinimg.com/originals/78/c3/b0/78c3b0b9f4d5f9f257baa39d1e572586.gif" />
              <h4>Giáo sư 4</h4>
              <h4>Bác sĩ 4</h4>
            </div>
            <div className="img-customize">
              <img src="https://i.pinimg.com/originals/bd/7b/41/bd7b4138bf25e5a2ef0d9f16dd7fc355.gif" />
              <h4>Giáo sư 5</h4>
              <h4>Bác sĩ 5</h4>
            </div>
            <div className="img-customize">
              <img src="https://i.pinimg.com/originals/a4/81/c5/a481c55a27c4968831ff572ef7a504ea.gif" />
              <h4>Giáo sư 6</h4>
              <h4>Bác sĩ 6</h4>
            </div>
            <div className="img-customize">
              <img src="https://i.pinimg.com/originals/a4/81/c5/a481c55a27c4968831ff572ef7a504ea.gif" />
              <h4>Giáo sư 7</h4>
              <h4>Bác sĩ 7</h4>
            </div>
            <div className="img-customize">
              <img src="https://i.pinimg.com/originals/a4/81/c5/a481c55a27c4968831ff572ef7a504ea.gif" />
              <h4>Giáo sư 8</h4>
              <h4>Bác sĩ 8</h4>
            </div>
            <div className="img-customize">
              <img src="https://i.pinimg.com/originals/a4/81/c5/a481c55a27c4968831ff572ef7a504ea.gif" />
              <h4>Giáo sư 9</h4>
              <h4>Bác sĩ 9</h4>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
