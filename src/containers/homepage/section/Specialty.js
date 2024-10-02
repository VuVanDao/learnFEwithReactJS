import React, { Component } from "react";
import "./Specialty.scss";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class Specialty extends Component {
  render() {
    return (
      <div className="section-share section-specialty">
        <div className="section-header">
          <h1>Các chuyên khoa</h1>
          <div>
            <button className="button">Xem thêm</button>
          </div>
        </div>
        <div className="section-container">
          <Slider {...this.props.settings}>
            <div className="img-customize">
              <img src="https://i.pinimg.com/564x/3d/0e/d3/3d0ed37c45061192214c2e8291e06384.jpg" />
              <h3>hehe</h3>
            </div>
            <div className="img-customize">
              <img src="https://i.pinimg.com/736x/eb/da/91/ebda91c355b3a2650ad6bebbb7a63c2d.jpg" />
              <h3>hehe</h3>
            </div>
            <div className="img-customize">
              <img src="https://i.pinimg.com/736x/73/0a/56/730a56f21c3d3738cb1bc139eafc2ade.jpg" />
              <h3>hehe</h3>
            </div>
            <div className="img-customize">
              <img src="https://i.pinimg.com/736x/44/ad/bb/44adbbf3235f206959fbb21027f21d7b.jpg" />
              <h3>hehe</h3>
            </div>
            <div className="img-customize">
              <img src="https://i.pinimg.com/736x/91/af/7f/91af7fa80545e860e28e91d7c4c087b4.jpg" />
              <h3>hehe</h3>
            </div>
            <div className="img-customize">
              <img src="https://i.pinimg.com/564x/94/75/ff/9475ff433600722e04688a0892b7f740.jpg" />
              <h3>hehe</h3>
            </div>
            <div className="img-customize">
              <img src="https://i.pinimg.com/564x/18/ae/c6/18aec645086c852529ce43ea15c4a6ef.jpg" />
              <h3>hehe</h3>
            </div>
            <div className="img-customize">
              <img src="https://i.pinimg.com/564x/21/a8/72/21a872b561426fcd1ecc2e1dd6b9774a.jpg" />
              <h3>hehe</h3>
            </div>
            <div className="img-customize">
              <img src="https://i.pinimg.com/564x/49/2e/67/492e67b16659a45e3e2eec5efa36be9b.jpg" />
              <h3>hehe</h3>
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

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
