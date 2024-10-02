import React, { Component } from "react";

import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";

class HomeFooter extends Component {
  render() {
    return (
      <div className="home-footer">
        <h4>
          &copy;2024 VuVanDao hehe. More info about me
          <a
            href="https://www.facebook.com/profile.php?id=100029186119101"
            target="_blank"
            style={{ marginRight: "10px", marginLeft: "10px" }}
          >
            <i className="fab fa-facebook"></i>
          </a>
          <a href="https://www.youtube.com/@cauepbiai362" target="_blank">
            <i
              className="fab fa-youtube"
              style={{ color: "red", marginRight: "10px" }}
            ></i>
          </a>
          <a
            href="https://www.linkedin.com/in/%C4%91%E1%BA%A1o-v%C5%A9-v%C4%83n-617a782a7/"
            target="_blank"
            style={{ marginRight: "10px" }}
          >
            <i className="fab fa-linkedin"></i>
          </a>
          <a
            href="https://github.com/VuVanDao"
            target="_blank"
            style={{ color: "black" }}
          >
            <i className="fab fa-github"></i>
          </a>
        </h4>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
