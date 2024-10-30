import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal } from "reactstrap";
import "./BookingModals.scss";
import { FormattedMessage } from "react-intl";
import ProfileDoctor from "../ProfileDoctor";
import { LANGUAGES } from "../../../../utils";
import NumberFormat from "react-number-format";
import _ from "lodash";
import DatePicker from "../../../../components/Input/DatePicker";
import * as actions from "../../../../store/actions";
import Select from "react-select";
import { postPatientBooking } from "../../../../services/userService";
import { toast } from "react-toastify";
import moment from "moment";

class BookingModals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: "",
      phoneNumber: "",
      email: "",
      address: "",
      reason: "",
      birthDay: "",
      genders: "",
      doctorId: "",
      timeType: "",

      selectedGender: "",
    };
  }
  componentDidMount() {
    this.props.getGenders();
  }

  async componentDidUpdate(prevProps, prevState) {
    if (this.props.language !== prevProps.language) {
      let gender = this.props.gender;
      if (gender.length > 0 && gender) {
        this.setState({
          genders: this.buildDataGender(gender),
        });
      }
    }
    if (this.props.gender !== prevProps.gender) {
      let gender = this.props.gender;
      if (gender.length > 0 && gender) {
        this.setState({
          genders: this.buildDataGender(gender),
        });
      }
    }
    if (this.props.dataTime !== prevProps.dataTime) {
      if (this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
        this.state.doctorId = this.props.dataTime.doctorId;
        this.state.timeType = this.props.dataTime.timeType;
      }
    }
  }
  buildDataGender = (data) => {
    let result = [];
    let language = this.props.language;
    if (data && data.length > 0) {
      data.map((item) => {
        let object = {};
        object.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
        object.value = item.keyMap;
        result.push(object);
      });
    }
    return result;
  };
  handleOnChangeInput = (event, id) => {
    let valueInput = event.target.value;
    let stateCopy = { ...this.state };
    stateCopy[id] = valueInput;
    this.setState({
      ...stateCopy,
    });
  };
  buildTimeBooking = (dataTime, language) => {
    if (dataTime && !_.isEmpty(dataTime)) {
      let time =
        language === LANGUAGES.VI
          ? dataTime.timeTypeData.valueVi
          : dataTime.timeTypeData.valueEn;
      let date =
        language === LANGUAGES.VI
          ? moment.unix(+dataTime.date / 1000).format("dddd - DD/MM/YYYY")
          : moment
              .unix(+dataTime.date / 1000)
              .locale("en")
              .format("ddd - MM/DD/YYYY");
      return `${time}-${date}`;
    } else {
      return "";
    }
  };
  handleSubmitInfo = async () => {
    let date = new Date(this.state.birthDay).getTime();
    let doctorName = this.buildDoctorName(this.props.dataTime);
    let timeString = this.buildTimeBooking(this.props.dataTime);
    let res = await postPatientBooking({
      fullName: this.state.fullName,
      phoneNumber: this.state.phoneNumber,
      email: this.state.email,
      address: this.state.address,
      reason: this.state.reason,
      date: this.props.dataTime.date,
      birthDay: date,
      selectedGender: this.state.selectedGender.value,
      doctorId: this.state.doctorId,
      timeType: this.state.timeType,
      language: this.props.language,
      timeString: timeString,
      doctorName: doctorName,
    });
    if (res && res.errCode === 0) {
      toast.success("Booking complete");
      this.props.closeBookingModal();
      this.setState({
        fullName: "",
        phoneNumber: "",
        email: "",
        address: "",
        reason: "",
        birthDay: "",
        selectedGender: "",
      });
    } else {
      toast.error("Booking not complete");
    }
  };

  buildDoctorName = (dataTime) => {
    let language = this.props;
    if (dataTime && !_.isEmpty(dataTime)) {
      let name =
        language === LANGUAGES.VI
          ? `${dataTime.doctorData.lastName}  ${dataTime.doctorData.firstName}`
          : `${dataTime.doctorData.firstName} ${dataTime.doctorData.lastName} `;
      return name;
    }
    return "";
  };

  HandleOnChangeDatePicker = (date) => {
    this.setState({
      birthDay: date[0],
    });
  };
  handleChangeSelect = (selectedOption) => {
    this.setState({ selectedGender: selectedOption });
  };
  render() {
    let { closeBookingModal, isOpenModal, dataTime } = this.props; //doctorSchedule
    let doctorId = "";
    if (dataTime && !_.isEmpty(dataTime)) {
      doctorId = dataTime.doctorId;
    }
    let { language } = this.props;
    return (
      <Modal
        centered
        size="lg"
        isOpen={isOpenModal}
        toggle={() => closeBookingModal()}
        className="booking-modals-container"
      >
        <div className="booking-modals-content">
          <div className="booking-modals-header">
            <span className="left">
              <FormattedMessage id="patient.booking-modal.title"></FormattedMessage>
            </span>
            <span className="right" onClick={() => closeBookingModal()}>
              <i className="fas fa-times"></i>
            </span>
          </div>
          <div className="booking-modals-body container">
            <div className="doctor-infor">
              <ProfileDoctor
                doctorId={doctorId}
                isShowDescriptionDoctor={false}
                dataTime={dataTime}
                isShowLinkDetail={false}
                isShowPrice={true}
              />
            </div>

            <div className="row">
              <div className="col-6 form-group">
                <label>
                  <FormattedMessage id="patient.booking-modal.fullName"></FormattedMessage>
                </label>
                <input
                  className="form-control"
                  onChange={(event) =>
                    this.handleOnChangeInput(event, "fullName")
                  }
                  value={this.state.fullName}
                />
              </div>
              <div className="col-6 form-group">
                <label>
                  <FormattedMessage id="patient.booking-modal.phoneNumber"></FormattedMessage>
                </label>
                <input
                  className="form-control"
                  value={this.state.phoneNumber}
                  onChange={(event) =>
                    this.handleOnChangeInput(event, "phoneNumber")
                  }
                />
              </div>
              <div className="col-6 form-group">
                <label>
                  <FormattedMessage id="patient.booking-modal.email"></FormattedMessage>
                </label>
                <input
                  className="form-control"
                  value={this.state.email}
                  onChange={(event) => this.handleOnChangeInput(event, "email")}
                />
              </div>
              <div className="col-6 form-group">
                <label>
                  <FormattedMessage id="patient.booking-modal.ContactAddress"></FormattedMessage>
                </label>
                <input
                  className="form-control"
                  value={this.state.address}
                  onChange={(event) =>
                    this.handleOnChangeInput(event, "address")
                  }
                />
              </div>
              <div className="col-6 form-group">
                <label>
                  <FormattedMessage id="patient.booking-modal.birthDay"></FormattedMessage>
                </label>
                <DatePicker
                  onChange={this.HandleOnChangeDatePicker}
                  className="form-control"
                  selected={this.state.birthDay}
                />
              </div>
              <div className="col-6 form-group">
                <label>
                  <FormattedMessage id="patient.booking-modal.gender"></FormattedMessage>
                </label>
                <Select
                  value={this.state.selectedGender}
                  options={this.state.genders}
                  onChange={this.handleChangeSelect}
                />
              </div>
              <div className="col-12 form-group">
                <label>
                  <FormattedMessage id="patient.booking-modal.reason"></FormattedMessage>
                </label>
                <input
                  className="form-control"
                  value={this.state.reason}
                  onChange={(event) =>
                    this.handleOnChangeInput(event, "reason")
                  }
                />
              </div>
            </div>
          </div>
          <div className="booking-modals-footer">
            <button
              className="btn-booking-confirm"
              onClick={() => this.handleSubmitInfo()}
            >
              Accept
            </button>
            <button
              className="btn-booking-cancel"
              onClick={() => closeBookingModal()}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    gender: state.admin.genders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenders: () => dispatch(actions.fetchGenderStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModals);
