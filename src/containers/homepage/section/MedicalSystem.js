import React, { Component } from "react";
import "./MedicalSystem.scss";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class MedicalSystem extends Component {
  render() {
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
            <div className="img-customize">
              <img src="https://i.pinimg.com/564x/1f/f6/af/1ff6afdc1797b8c9feda7fe319213e37.jpg" />
              <h3>Hệ thống 1</h3>
            </div>
            <div className="img-customize">
              <img src="https://i.pinimg.com/736x/81/63/78/81637861f1566bb718979b454ce94eed.jpg" />
              <h3>Hệ thống 2</h3>
            </div>
            <div className="img-customize">
              <img src="https://i.pinimg.com/736x/bf/c7/2f/bfc72f7aac6c0290de0ddb30363de0f3.jpg" />
              <h3>Hệ thống 3</h3>
            </div>
            <div className="img-customize">
              <img src="https://i.pinimg.com/564x/9e/99/44/9e9944b9aebfe26d05356d14c4b88194.jpg" />
              <h3>Hệ thống 4</h3>
            </div>
            <div className="img-customize">
              <img src="https://i.pinimg.com/564x/30/ab/3b/30ab3b55e6129699c56d52caaae60376.jpg" />
              <h3>Hệ thống 5</h3>
            </div>
            <div className="img-customize">
              <img src="https://i.pinimg.com/736x/82/63/de/8263de5a074409318176c1a340e6b79f.jpg" />
              <h3>Hệ thống 6</h3>
            </div>
            <div className="img-customize">
              <img src="https://i.pinimg.com/564x/78/2a/9b/782a9ba357d834585425bedc618445ce.jpg" />
              <h3>Hệ thống 7</h3>
            </div>
            <div className="img-customize">
              <img src="https://i.pinimg.com/736x/98/20/a7/9820a75266235ce5c8c55824ac2b8eab.jpg" />
              <h3>Hệ thống 8</h3>
            </div>
            <div className="img-customize">
              <img src="https://i.pinimg.com/564x/92/17/f1/9217f1f19cd3988f7942d135f17f8fb7.jpg" />
              <h3>Hệ thống 9</h3>
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

export default connect(mapStateToProps, mapDispatchToProps)(MedicalSystem);
