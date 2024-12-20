import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../homepage/HomeHeader";
import "./DetailDoctor.scss";
import { getDetailInforDoctor } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import DoctorSchedule from "./DoctorSchedule";
import DoctorExtraInfor from "./DoctorExtraInfor";
import LikeAndShare from "../SocialPlugin/LikeandShare";
import Comment from "../SocialPlugin/Comment";
class DetailDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailDoctor: {},
      currentDoctorId: -1,
    };
  }
  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      this.setState({
        currentDoctorId: id,
      });
      let res = await getDetailInforDoctor(id);
      if (res && res.errCode == 0) {
        this.setState({
          detailDoctor: res.data,
        });
      }
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.listUsers !== this.props.listUsers) {
      this.setState({
        UserRedux: this.props.listUsers,
      });
    }
  }
  render() {
    console.log(this.state);
    let { detailDoctor } = this.state;
    let { language } = this.props;
    let nameEn = "",
      nameVi = "";
    if (detailDoctor && detailDoctor.positionData) {
      nameEn = `${detailDoctor.positionData.valueEn} ${detailDoctor.firstName} ${detailDoctor.lastName}`;
      nameVi = `${detailDoctor.positionData.valueVi} ${detailDoctor.firstName} ${detailDoctor.lastName}`;
    }
    let currentURL =
      process.env.REACT_APP_IS_LOCALHOST === 1
        ? "https://chatbotagain.onrender.com/"
        : window.location.href;
    return (
      <>
        <HomeHeader iisShowBanner={false} />
        <div className="doctor-detail-container">
          <div className="intro-doctor">
            <div
              className="content-left"
              style={{
                backgroundImage: `url(${
                  detailDoctor.image ? detailDoctor.image : ""
                })`,
              }}
            ></div>
            <div className="content-right">
              <div className="up">
                {language === LANGUAGES.VI ? nameVi : nameEn}
              </div>
              <div className="down">
                {detailDoctor.Markdown && detailDoctor.Markdown.description && (
                  <span>{detailDoctor.Markdown.description}</span>
                )}
                <br />
                <LikeAndShare
                  className="like-share-plugin"
                  dataHref={currentURL}
                />
              </div>
            </div>
          </div>
          <div className="schedule-doctor">
            <div className="content-left">
              <DoctorSchedule doctorIdFromParent={this.state.currentDoctorId} />
            </div>
            <div className="content-right">
              <DoctorExtraInfor
                doctorIdFromParent={this.state.currentDoctorId}
              />
            </div>
          </div>
          <div className="detail-infor-doctor">
            {detailDoctor &&
              detailDoctor.Markdown &&
              detailDoctor.Markdown.contentHTML && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: detailDoctor.Markdown.contentHTML,
                  }}
                ></div>
              )}
          </div>
          <div className="comment-doctor">
            <Comment dataHref={currentURL} width={"100%"} />
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
