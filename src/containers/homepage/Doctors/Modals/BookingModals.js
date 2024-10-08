import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal } from "reactstrap";
import "./BookingModals.scss";
import { FormattedMessage } from "react-intl";
class BookingModals extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}
  toggle = () => {
    this.props.toggleUserModal();
  };
  async componentDidUpdate(prevProps, prevState) {
    if (this.props.language !== prevProps.language) {
    }
  }
  render() {
    let { closeBookingModal, isOpenModal, dataTime } = this.props;
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
            <span className="left">Thông tin đặt lịch khám bệnh</span>
            <span className="right" onClick={() => closeBookingModal()}>
              <i className="fas fa-times"></i>
            </span>
          </div>
          <div className="booking-modals-body container">
            {/* {JSON.stringify(dataTime.timeTypeData)} */}
            <div className="doctor-infor"></div>
            <div className="price">Giá khám 500.000VNĐ</div>
            <div className="row">
              <div className="col-6 form-group">
                <label>Họ tên</label>
                <input className="form-control" />
              </div>
              <div className="col-6 form-group">
                <label>Số điện thoại</label>
                <input className="form-control" />
              </div>
              <div className="col-6 form-group">
                <label>Địa chỉ email</label>
                <input className="form-control" />
              </div>
              <div className="col-6 form-group">
                <label>Địa chỉ liên hệ</label>
                <input className="form-control" />
              </div>
              <div className="col-6 form-group">
                <label>Đặt cho ai</label>
                <input className="form-control" />
              </div>
              <div className="col-6 form-group">
                <label>Giới tính</label>
                <input className="form-control" />
              </div>
              <div className="col-12 form-group">
                <label>Mục đích khám bệnh</label>
                <input className="form-control" />
              </div>
            </div>
          </div>
          <div className="booking-modals-footer">
            <button className="btn-booking-confirm">Accept</button>
            <button className="btn-booking-cancel">Cancel</button>
          </div>
        </div>
      </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(BookingModals);
