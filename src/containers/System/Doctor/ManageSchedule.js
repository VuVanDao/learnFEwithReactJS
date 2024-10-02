import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import Select from "react-select";
import * as actions from "../../../store/actions";
import { LANGUAGES, dateFormat } from "../../../utils/";
import { saveBulkScheduleDoctor } from "../../../services/userService";
import DatePicker from "../../../components/Input/DatePicker";
import moment from "moment";
import { toast } from "react-toastify";
import _ from "lodash";
import "./ManageSchedule.scss";
class Doctor extends Component {
  state = {};
  constructor(props) {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    super(props);
    this.state = {
      listDoctors: [],
      selectedDoctor: {},
      currentDate: "",
      rangeTime: [],
    };
  }
  componentDidMount() {
    this.props.fetchAllDoctorRedux();
    this.props.fetchAllScheduleRedux();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.allDoctors !== this.props.allDoctors) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
      this.setState({
        listDoctors: dataSelect,
      });
    }
    if (prevProps.language !== this.props.language) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
      this.setState({
        listDoctors: dataSelect,
      });
    }
    if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
      let data = this.props.allScheduleTime;
      if (data && data.length > 0) {
        data = data.map((item) => ({
          ...item,
          isSelected: false,
        }));
      }
      this.setState({
        rangeTime: data,
      });
    }
  }
  buildDataInputSelect = (inputData) => {
    let result = [];
    let { language } = this.props;
    if (inputData && inputData.length) {
      inputData.map((item, index) => {
        let object = {};
        let labelEn = `${item.lastName} ${item.firstName}`;
        let labelVi = `${item.firstName} ${item.lastName}`;
        object.label = language === LANGUAGES.VI ? labelVi : labelEn;
        object.value = item.id;
        result.push(object);
      });
      return result;
    }
  };
  handleChange = async (selectedOption) => {
    this.setState({ selectedDoctor: selectedOption });
  };
  HandleOnChangeDatePicker = (date) => {
    this.setState({
      currentDate: date[0],
    });
    console.log(date);
  };
  handleClickBtnTime = (time) => {
    let { rangeTime } = this.state;
    if (rangeTime && rangeTime.length > 0) {
      rangeTime = rangeTime.map((item) => {
        if (item.id === time.id) item.isSelected = !item.isSelected;
        return item;
      });
      this.setState({
        rangeTime: rangeTime,
      });
    }
  };
  handleSaveSchedule = async () => {
    let { rangeTime, selectedDoctor, currentDate } = this.state;
    let result = [];
    if (!currentDate) {
      toast.error("chua chon ngay kia dcmm");
      return;
    }
    if (!selectedDoctor || _.isEmpty(selectedDoctor)) {
      toast.error("chua chon bac si kia dcmm");
      return;
    }
    // let formatDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER);
    // let formatDate = moment(currentDate).unix();
    let formatDate = new Date(currentDate).getTime();
    if (rangeTime && rangeTime.length > 0) {
      let selectedTime = rangeTime.filter((item) => item.isSelected === true);
      if (selectedTime && selectedTime.length > 0) {
        selectedTime.map((time) => {
          let object = {};
          object.doctorId = selectedDoctor.value;
          object.date = formatDate;
          object.timeType = time.keyMap;
          result.push(object);
        });
      } else {
        toast.error("thieu thong tin kia cai dcmmmmm");
        return;
      }
    }
    let res = await saveBulkScheduleDoctor({
      arrSchedule: result,
      doctorId: selectedDoctor.value,
      formatDate: formatDate,
    });
    console.log(result);
    console.log(res);
  };
  render() {
    let { rangeTime } = this.state;
    let { language } = this.props;
    return (
      <div className="manage-schedule-container">
        <div className="m-s-schedule">
          <FormattedMessage id="manage-schedule.title" />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-6 form-group">
              <label>
                <FormattedMessage id="manage-schedule.Choose-doctor" />
              </label>
              <Select
                value={this.state.selectedDoctor}
                onChange={this.handleChange}
                options={this.state.listDoctors}
              />
            </div>
            <div className="col-6">
              <label>
                <FormattedMessage id="manage-schedule.Choose-date" />
              </label>
              <DatePicker
                onChange={this.HandleOnChangeDatePicker}
                className="form-control"
                selected={this.state.currentDate}
                minDate={new Date()}
              />
            </div>
            <div className="col-12 pick-hour-container">
              {rangeTime &&
                rangeTime.length > 0 &&
                rangeTime.map((item, index) => {
                  return (
                    <button
                      key={index}
                      className={
                        item.isSelected === true
                          ? "btn btn-schedule active"
                          : "btn btn-schedule"
                      }
                      onClick={() => this.handleClickBtnTime(item)}
                    >
                      {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                    </button>
                  );
                })}
            </div>
            <div className="col-12">
              <button
                className="btn btn-primary mt-3"
                onClick={() => this.handleSaveSchedule()}
              >
                <FormattedMessage id="manage-schedule.save" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    systemMenuPath: state.app.systemMenuPath,
    isLoggedIn: state.user.isLoggedIn,
    allDoctors: state.admin.allDoctors,
    language: state.app.language,
    allScheduleTime: state.admin.allScheduleTime,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctorRedux: () => dispatch(actions.fetchAllDoctor()),
    fetchAllScheduleRedux: () => dispatch(actions.fetchAllScheduleTime()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);
