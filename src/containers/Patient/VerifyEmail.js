import React, { Component } from "react";
import { connect } from "react-redux";
import { LANGUAGES } from "../../utils";
import { FormattedMessage } from "react-intl";
import { postVerifyBooking } from "../../services/userService";
import HomeHeader from "../homepage/HomeHeader";
class VerifyEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusVerify: false,
    };
  }
  async componentDidMount() {
    if (this.props.location && this.props.location.search) {
      let urlParams = new URLSearchParams(this.props.location.search);
      let token = urlParams.get("token");
      let doctorId = urlParams.get("doctorId");

      let res = await postVerifyBooking({
        token: token,
        doctorId: doctorId,
      });
      if (res && res.errCode == 0) {
        this.setState({
          statusVerify: true,
        });
      }
    }
  }
  async componentDidUpdate(prevProps, prevState) {
    if (this.props.language !== prevProps.language) {
    }
  }
  render() {
    let { statusVerify } = this.state;
    return (
      <>
        <HomeHeader />
        <div>
          {statusVerify == true ? (
            <div>Đã đặt lịch thành công</div>
          ) : (
            <div>Thất bại vcl</div>
          )}
        </div>
      </>
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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
