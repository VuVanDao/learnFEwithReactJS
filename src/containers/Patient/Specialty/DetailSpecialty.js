import React, { Component } from "react";
import { connect } from "react-redux";
import "./DetailSpecialty.scss";
import { LANGUAGES } from "../../../utils/";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import HomeHeader from "../../homepage/HomeHeader";
import DoctorExtraInfor from "../Doctor/DoctorExtraInfor";
import { FormattedMessage } from "react-intl";
import ProfileDoctor from "../Doctor/ProfileDoctor";
class DetailSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctorId: [55, 56],
    };
  }

  async componentDidUpdate(prevProps, prevState) {
    if (this.props.language !== prevProps.language) {
    }
  }
  render() {
    let { arrDoctorId } = this.state;
    return (
      <div className="detail-specialty-container">
        <HomeHeader />
        <div className="detail-specialty-body">
          <div className="description-specialty"></div>

          {arrDoctorId &&
            arrDoctorId.length > 0 &&
            arrDoctorId.map((item, index) => {
              return (
                <div className="each-doctor" key={index}>
                  <div className="dt-content-left">
                    <div className="profile-doctor"></div>
                    <ProfileDoctor
                      doctorId={item}
                      isShowDescriptionDoctor={true}
                    />
                  </div>
                  <div className="dt-content-right">
                    <div className="doctor-schedule">
                      <DoctorSchedule doctorIdFromParent={item} />
                    </div>
                    <div className="doctor-extra-info">
                      <DoctorExtraInfor doctorIdFromParent={item} />
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    );
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
