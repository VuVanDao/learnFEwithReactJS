import React, { Component } from "react";
import { connect } from "react-redux";
import { LANGUAGES } from "../../../utils/";
import { FormattedDate, FormattedMessage } from "react-intl";
import "./ManagePatient.scss";
import DatePicker from "../../../components/Input/DatePicker";
import {
  getAllPatientForDoctor,
  postSendRemedy,
} from "../../../services/userService";
import moment from "moment";
import RemedyModal from "./RemedyModal";
import _ from "lodash";
import { toast } from "react-toastify";
import LoadingOverlay from "react-loading-overlay";
class ManagePatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: moment(new Date()).startOf("day").valueOf(),
      dataPatient: [],
      isOpenRemedyModals: false,
      dataModal: {},
      isShowLoading: false,
    };
  }
  async componentDidMount() {
    this.getDataPatient();
  }

  getDataPatient = async () => {
    let { user } = this.props;
    let { currentDate } = this.state;
    let formatedDate = new Date(currentDate).getTime();
    let res = await getAllPatientForDoctor({
      doctorId: user.id,
      date: formatedDate,
    });
    if (res && res.errCode === 0) {
      this.setState({
        dataPatient: res.data,
      });
    }
  };

  async componentDidUpdate(prevProps, prevState) {
    if (this.props.language !== prevProps.language) {
    }
  }
  HandleOnChangeDatePicker = (date) => {
    this.setState(
      {
        currentDate: date[0],
      },
      async () => {
        await this.getDataPatient();
      }
    );
  };
  handleBtnConfirm = (item) => {
    let data = {
      doctorId: item.doctorId,
      patientId: item.patientId,
      email: item.patientData.email,
      timeType: item.timeType,
      patientName: item.patientData.firstName,
    };
    this.setState({
      isOpenRemedyModals: true,
      dataModal: data,
    });
  };
  closeRemedyModal = () => {
    this.setState({
      isOpenRemedyModals: false,
      dataModal: {},
    });
  };
  sendRemedy = async (dataChild) => {
    let { dataModal } = this.state;
    this.setState({
      isShowLoading: true,
      isOpenRemedyModals: false,
    });
    let res = await postSendRemedy({
      email: dataChild.email,
      imgBase64: dataChild.imgBase64,
      doctorId: dataModal.doctorId,
      patientId: dataModal.patientId,
      timeType: dataModal.timeType,
      language: this.props.language,
      patientName: dataModal.patientName,
    });
    this.setState({
      isShowLoading: false,
    });
    if (res && res.errCode === 0) {
      toast.success("Send remedy success");
      this.getDataPatient();
      this.closeRemedyModal();
    } else {
      toast.error("Send remedy error");
    }
  };
  render() {
    let { language } = this.props;
    let { dataPatient, isOpenRemedyModals, dataModal } = this.state;
    return (
      <>
        <LoadingOverlay
          active={this.state.isShowLoading}
          spinner
          text="loading...."
        >
          <div className="manage-patient-container">
            <div className="m-p-title">Quản lí bệnh nhân khám bệnh</div>
            <div className="manage-patient-body row">
              <div className="col-4 form-group">
                <label>Chọn ngày khám</label>
                <DatePicker
                  onChange={this.HandleOnChangeDatePicker}
                  className="form-control"
                  value={this.state.currentDate}
                />
              </div>
              <div className="col-12  table-manage-patient">
                <table style={{ width: "100%" }} className="">
                  <tbody>
                    <tr>
                      <th>STT</th>
                      <th>Time</th>
                      <th>Name</th>
                      <th>Address</th>
                      <th>Gender</th>
                      <th>Action</th>
                    </tr>
                    {dataPatient && dataPatient.length > 0 ? (
                      dataPatient.map((item, index) => {
                        let time =
                          language === LANGUAGES.VI
                            ? item.timeTypeDataPatient.valueVi
                            : item.timeTypeDataPatient.valueEn;
                        let gender =
                          language === LANGUAGES.VI
                            ? item.patientData.genderData.valueVi
                            : item.patientData.genderData.valueEn;
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{time}</td>
                            {/* <td>{item.timeTypeDataPatient.valueVi}</td> */}
                            <td>{item.patientData.firstName}</td>
                            <td>{item.patientData.address}</td>
                            <td>{gender}</td>
                            <td>
                              <button
                                className="btn btn-success"
                                onClick={() => this.handleBtnConfirm(item)}
                              >
                                Confirm
                              </button>
                              <button
                                className="btn btn-primary mx-3"
                                onClick={() => this.handleBtnRemedy()}
                              >
                                Send bill
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={"6"} style={{ textAlign: "center" }}>
                          Not found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <RemedyModal
            isOpenModal={isOpenRemedyModals}
            dataModal={dataModal}
            closeRemedyModal={this.closeRemedyModal}
            sendRemedy={this.sendRemedy}
          />
        </LoadingOverlay>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    user: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
