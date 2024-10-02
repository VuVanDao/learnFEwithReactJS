import React, { Component } from "react";
import "./HomeHeader.scss";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../utils/constant.js";
import { changeLanguageApp } from "../../store/actions/appActions.js";
import { withRouter } from "react-router";

class HomeHeader extends Component {
  changeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };
  returnToHome = () => {
    if (this.props.history) {
      this.props.history.push(`/home`);
    }
  };
  render() {
    let language = this.props.language;
    console.log(this.props.userInfo);
    return (
      <React.Fragment>
        <div className="home-header-container">
          <div className="home-header-content">
            <div className="left-content">
              <a className="header-logo-link">
                <i className="fas fa-list"></i>
              </a>
              <div className="header-logo">
                <img
                  src="https://bookingcare.vn/assets/anh/bookingcare-logo-v3.png"
                  onClick={() => this.returnToHome()}
                />
              </div>
            </div>
            <div className="center-content">
              <div className="child-content">
                <div className="child-title">
                  <FormattedMessage id="homeheader.medicalspecialty" />
                </div>
                <div>
                  <a>
                    <FormattedMessage id="homeheader.search-doctor-by-speciality" />
                  </a>
                </div>
              </div>
              <div className="child-content">
                <div className="child-title">
                  <FormattedMessage id="homeheader.healthfacilities" />
                </div>
                <div>
                  <a>
                    <FormattedMessage id="homeheader.Chooseahospitalorexaminationroom" />
                  </a>
                </div>
              </div>
              <div className="child-content">
                <div className="child-title">
                  <FormattedMessage id="homeheader.doctor" />
                </div>
                <div>
                  <a>
                    <FormattedMessage id="homeheader.choosethebestdoctor" />
                  </a>
                </div>
              </div>
              <div className="child-content">
                <div className="child-title">
                  <FormattedMessage id="homeheader.package" />
                </div>
                <div>
                  <a>
                    <FormattedMessage id="homeheader.healthcheckup" />
                  </a>
                </div>
              </div>
            </div>
            <div className="right-content">
              <div className="flag">
                <div
                  className={
                    language === LANGUAGES.VI
                      ? "language active language-vn "
                      : "language language-vn "
                  }
                >
                  <span
                    onClick={() => {
                      this.changeLanguage(LANGUAGES.VI);
                    }}
                  >
                    VN
                  </span>
                </div>
                <div
                  className={
                    language === LANGUAGES.EN
                      ? "language active language-en "
                      : "language language-en "
                  }
                >
                  <span
                    onClick={() => {
                      this.changeLanguage(LANGUAGES.EN);
                    }}
                  >
                    EN
                  </span>
                </div>
              </div>
              <div className="support-content">
                <i className="fas fa-question-circle"></i>
                <div>
                  <a>
                    <FormattedMessage id="homeheader.support" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        {this.props.isShowBanner === true && (
          <div className="home-header-banner">
            <div className="content-up">
              <div className="title1">
                <FormattedMessage id="banner.title1" />
              </div>
              <div className="title2">
                <FormattedMessage id="banner.title2" />
              </div>
              <div className="search">
                <i className="fas fa-search"></i>
                <input type="text" placeholder="search" />
              </div>
            </div>
            <div className="content-down">
              <div className="options">
                <div className="options-child">
                  <div className="icon-child">
                    <a>
                      <i className="fas fa-hospital"></i>
                    </a>
                  </div>
                  <div className="title-child">
                    <a>
                      <FormattedMessage id="banner.titlechild1" />
                    </a>
                  </div>
                </div>
                <div className="options-child">
                  <div className="icon-child">
                    <a>
                      <i className="fas fa-mobile-alt"></i>
                    </a>
                  </div>
                  <div className="title-child">
                    <a>
                      <FormattedMessage id="banner.titlechild2" />
                    </a>
                  </div>
                </div>
                <div className="options-child">
                  <div className="icon-child">
                    <a>
                      <i className="fas fa-file-medical"></i>
                    </a>
                  </div>
                  <div className="title-child">
                    <a>
                      <FormattedMessage id="banner.titlechild3" />
                    </a>
                  </div>
                </div>
                <div className="options-child">
                  <div className="icon-child">
                    <a>
                      <i className="fas fa-stethoscope"></i>
                    </a>
                  </div>
                  <div className="title-child">
                    <a>
                      <FormattedMessage id="banner.titlechild4" />
                    </a>
                  </div>
                </div>
                <div className="options-child">
                  <div className="icon-child">
                    <a>
                      <i className="fas fa-user-md"></i>
                    </a>
                  </div>
                  <div className="title-child">
                    <a>
                      <FormattedMessage id="banner.titlechild5" />
                    </a>
                  </div>
                </div>
                <div className="options-child">
                  <div className="icon-child">
                    <a>
                      <i className="fas fa-notes-medical"></i>
                    </a>
                  </div>
                  <div className="title-child">
                    <a>
                      <FormattedMessage id="banner.titlechild6" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    userInfo: state.user.userInfo,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HomeHeader)
);
