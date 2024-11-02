import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import "./RemedyModal.scss";
import { LANGUAGES, CommonUtils } from "../../../utils";
import { FormattedMessage } from "react-intl";
import _ from "lodash";
import * as actions from "../../../store/actions";
import { toast } from "react-toastify";
import moment from "moment";

class RemedyModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      imgBase64: "",
    };
  }
  componentDidMount() {
    if (this.props.dataModal) {
      this.setState({
        email: this.props.dataModal.email,
      });
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.dataModal !== this.props.dataModal) {
      this.setState({
        email: this.props.dataModal.email,
      });
    }
  }
  handleOnChangeEmail = (event) => {
    this.setState({
      email: event.target.value,
    });
  };
  handleOnChangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);

      this.setState({
        imgBase64: base64,
      });
    }
  };
  handleSendRemedy = () => {
    this.props.sendRemedy(this.state);
  };
  render() {
    let { closeRemedyModal, isOpenModal, dataTime, dataModal, sendRemedy } =
      this.props; //doctorSchedule

    let { language } = this.props;
    return (
      <Modal
        centered
        size="lg"
        isOpen={isOpenModal}
        toggle={() => closeRemedyModal()}
        className="booking-modals-container"
      >
        <ModalHeader toggle={() => closeRemedyModal()}>
          Gui hoa don kham benh
        </ModalHeader>

        <ModalBody>
          <div className="row">
            <div className="col-6 form-group">
              <label>Email benh nhan:</label>
              <input
                type="email"
                value={this.state.email}
                className="form-control"
                onChange={(event) => {
                  this.handleOnChangeEmail(event);
                }}
              />
            </div>
            <div className="col-6 form-group">
              <label>Chon file don thuoc</label>
              <input
                type="file"
                className="form-control-file"
                onChange={(event) => this.handleOnChangeImage(event)}
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => this.handleSendRemedy()}>
            Send
          </Button>
          <Button color="secondary" onClick={() => closeRemedyModal()}>
            Cancel
          </Button>
        </ModalFooter>
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

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
