import React, { Component } from "react";
import { connect } from "react-redux";
import "./ProfileDoctor.scss";
import { LANGUAGES } from "../../../utils/";
import { getProfileDoctorById } from "../../../services/userService.js";
import { FormattedMessage } from "react-intl";
import NumberFormat from "react-number-format";
import _ from "lodash";
import moment from "moment";

class DefaultClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataProfile: {},
    };
  }
  async componentDidMount() {
    let data = await this.getInfoDoctor(this.props.doctorId);
    this.setState({
      dataProfile: data,
    });
  }
  getInfoDoctor = async (id) => {
    let result = {};
    if (id) {
      let res = await getProfileDoctorById(id);
      if (res && res.errCode == 0) {
        result = res.data;
      }
    }
    return result;
  };
  async componentDidUpdate(prevProps, prevState) {
    if (this.props.language !== prevProps.language) {
    }
    if (this.props.doctorId !== prevProps.doctorId) {
      this.getInfoDoctor(this.props.doctorId);
    }
  }
  renderTimeBooking = (dataTime, language) => {
    if (dataTime && !_.isEmpty(dataTime)) {
      let date =
        language === LANGUAGES.VI
          ? moment.unix(+dataTime.date / 1000).format("dddd - DD/MM/YYYY")
          : moment
              .unix(+dataTime.date / 1000)
              .locale("en")
              .format("ddd - MM/DD/YYYY");
      return (
        <>
          <div>
            {language === LANGUAGES.VI
              ? dataTime.timeTypeData.valueVi
              : dataTime.timeTypeData.valueEn}
          </div>
          <div>{date}</div>
          <div>Miễn phí đặt lịch</div>
        </>
      );
    } else {
      return <></>;
    }
  };
  render() {
    console.log("", this.state);
    let { isShowDescriptionDoctor, dataTime } = this.props;
    console.log("check dataTIme", dataTime);

    let { dataProfile } = this.state;
    let { language } = this.props;
    let nameEn = "",
      nameVi = "";
    if (dataProfile && dataProfile.positionData) {
      nameEn = `${dataProfile.positionData.valueEn} ${dataProfile.firstName} ${dataProfile.lastName}`;
      nameVi = `${dataProfile.positionData.valueVi} ${dataProfile.firstName} ${dataProfile.lastName}`;
    }
    return (
      <div className="profile-doctor-container">
        <div className="intro-doctor">
          <div
            className="content-left"
            style={{
              backgroundImage: `url(${
                dataProfile && dataProfile.image ? dataProfile.image : ""
              })`,
            }}
          ></div>
          <div className="content-right">
            <div className="up">
              {language === LANGUAGES.VI ? nameVi : nameEn}
            </div>
            <div className="down">
              {isShowDescriptionDoctor === true ? (
                <>
                  {dataProfile && dataProfile.Doctor_infor && (
                    <>
                      <span>{dataProfile.Doctor_infor.addressClinic}</span>
                      <br />
                      <span>{dataProfile.Doctor_infor.nameClinic}</span>
                    </>
                  )}
                </>
              ) : (
                <>{this.renderTimeBooking(dataTime, language)}</>
              )}
            </div>
          </div>
        </div>
        <div className="price">
          Giá khám:
          {dataProfile &&
          dataProfile.Doctor_infor &&
          language === LANGUAGES.VI ? (
            <NumberFormat
              className="currency mx-3"
              value={dataProfile.Doctor_infor.priceTypeData.valueVi}
              displayType={"text"}
              thousandSeparator={true}
              suffix={"vnd"}
            />
          ) : (
            ""
          )}
          {dataProfile &&
          dataProfile.Doctor_infor &&
          language === LANGUAGES.EN ? (
            <NumberFormat
              className="currency mx-3"
              value={dataProfile.Doctor_infor.priceTypeData.valueEn}
              displayType={"text"}
              thousandSeparator={true}
              suffix={"$"}
            />
          ) : (
            ""
          )}
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

export default connect(mapStateToProps, mapDispatchToProps)(DefaultClass);
