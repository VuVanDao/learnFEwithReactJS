import React, { Component } from "react";

import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";

class About extends Component {
  render() {
    return (
      <div className="section-share section-About">
        <div className="section-header">
          <h4>Truyền thông nói gì về VanDaohehe (tin siuu chuẩn)</h4>
        </div>
        <div className="section-About-content">
          <div className="section-About-content__left">
            <iframe
              src="https://www.youtube.com/embed/DGr7n6y0SJs?list=RDDGr7n6y0SJs"
              title="yugioh opening 2 SHUFFLE"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
          <div className="section-About-content__right">
            <img src="https://i.pinimg.com/564x/93/1a/47/931a47962ab1871466c47c04648b3511.jpg" />
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
