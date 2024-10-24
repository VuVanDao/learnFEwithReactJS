import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorExtraInfor.scss";
import moment from "moment";
import { Label } from "reactstrap";
import NumberFormat from "react-number-format";
import { LANGUAGES } from "../../../utils/";
import {
  getScheduleDoctorByDate,
  getExtraInfoDoctorById,
} from "../../../services/userService";
import { FormattedMessage } from "react-intl";
class DoctorExtraInfor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowDetailInfo: false,
      extraInfor: {},
    };
  }
  showHideDetailInfo = (status) => {
    this.setState({
      isShowDetailInfo: !this.state.isShowDetailInfo,
    });
  };
  async componentDidMount() {
    if (this.props.doctorIdFromParent) {
      let res = await getExtraInfoDoctorById(this.props.doctorIdFromParent);
      if (res && res.errCode === 0) {
        this.setState({
          extraInfor: res.data,
        });
      }
    }
  }
  async componentDidUpdate(prevProps, prevState) {
    if (this.props.language !== prevProps.language) {
    }
    if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
      let res = await getExtraInfoDoctorById(this.props.doctorIdFromParent);
      if (res && res.errCode === 0) {
        this.setState({
          extraInfor: res.data,
        });
      }
    }
  }
  render() {
    let { isShowDetailInfo, extraInfor } = this.state;
    let { language } = this.props;
    return (
      <div className="doctor-extra-info-container">
        <div className="content-up">
          <div className="text-address">
            <FormattedMessage id="patient.extraInfo-info.text-address" />
          </div>
          <div className="name-clinic">
            {extraInfor && extraInfor.nameClinic ? extraInfor.nameClinic : ""}
          </div>
          <div className="detail-address">
            {extraInfor && extraInfor.addressClinic
              ? extraInfor.addressClinic
              : ""}
          </div>
        </div>
        <div className="content-down">
          {isShowDetailInfo === false ? (
            <div>
              <FormattedMessage id="patient.extraInfo-info.price" />
              <span>
                {extraInfor &&
                  extraInfor.priceTypeData &&
                  language === LANGUAGES.VI && (
                    <NumberFormat
                      className="currency mx-3"
                      value={extraInfor.priceTypeData.valueVi}
                      displayType={"text"}
                      thousandSeparator={true}
                      suffix={"vnd"}
                    />
                  )}
                {extraInfor &&
                  extraInfor.priceTypeData &&
                  language === LANGUAGES.EN && (
                    <NumberFormat
                      className="currency mx-3"
                      value={extraInfor.priceTypeData.valueEn}
                      displayType={"text"}
                      thousandSeparator={true}
                      suffix={"$"}
                    />
                  )}
              </span>
              <span onClick={this.showHideDetailInfo} className="see-detail">
                <FormattedMessage id="patient.extraInfo-info.detail" />
              </span>
            </div>
          ) : (
            <div>
              <div className="title-price">
                <FormattedMessage id="patient.extraInfo-info.price" />
              </div>
              <div className="detail-info">
                <div className="price">
                  <span className="left">
                    <FormattedMessage id="patient.extraInfo-info.price" />
                  </span>
                  <span className="right">
                    {extraInfor &&
                      extraInfor.priceTypeData &&
                      language === LANGUAGES.VI && (
                        <NumberFormat
                          className="currency mx-3"
                          value={extraInfor.priceTypeData.valueVi}
                          displayType={"text"}
                          thousandSeparator={true}
                          suffix={"vnd"}
                        />
                      )}
                    {extraInfor &&
                      extraInfor.priceTypeData &&
                      language === LANGUAGES.EN && (
                        <NumberFormat
                          className="currency mx-3"
                          value={extraInfor.priceTypeData.valueEn}
                          displayType={"text"}
                          thousandSeparator={true}
                          suffix={"$"}
                        />
                      )}
                  </span>
                </div>
                <div className="note">
                  {extraInfor && extraInfor.note ? extraInfor.note : ""}
                </div>
              </div>
              <div className="payment">
                <FormattedMessage id="patient.extraInfo-info.payment" />

                {extraInfor &&
                extraInfor.priceTypeData &&
                language === LANGUAGES.VI
                  ? extraInfor.paymentTypeData.valueVi
                  : extraInfor.paymentTypeData.valueEn}
              </div>
              <div onClick={this.showHideDetailInfo} className="hide-price">
                <FormattedMessage id="patient.extraInfo-info.hide-price" />
              </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);
