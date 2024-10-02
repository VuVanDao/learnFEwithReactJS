import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../utils/";
import * as actions from "../../../store/actions";
import "./UserRedux.scss";
import { selectFilter } from "react-bootstrap-table2-filter";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import TableManageUser from "./TableManageUser.js";
import { toast } from "react-toastify";

class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderArr: [],
      positionArr: [],
      roleArr: [],
      previewImgURL: "",
      isOpen: false,

      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
      phoneNumber: "",
      gender: "",
      position: "",
      roleId: "",
      avatar: "",

      action: "",
    };
  }

  async componentDidMount() {
    this.props.getGenderStart();
    this.props.getPositionStart();
    this.props.getRoleStart();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.genderRedux !== this.props.genderRedux) {
      let arrGenders = this.props.genderRedux;
      this.setState({
        genderArr: arrGenders,
        gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : "",
      });
    }
    if (prevProps.PositionRedux !== this.props.PositionRedux) {
      let arrPositions = this.props.PositionRedux;
      this.setState({
        positionArr: arrPositions,
        position:
          arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : "",
      });
    }
    if (prevProps.RoleRedux !== this.props.RoleRedux) {
      let arrRole = this.props.RoleRedux;
      this.setState({
        roleArr: arrRole,
        roleId: arrRole && arrRole.length > 0 ? arrRole[0].keyMap : "",
      });
    }
    if (prevProps.listUsers !== this.props.listUsers) {
      let arrGenders = this.props.genderRedux;
      let arrPositions = this.props.PositionRedux;
      let arrRole = this.props.RoleRedux;
      this.setState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        address: "",
        phoneNumber: "",
        gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : "",
        position:
          arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : "",
        roleId: arrRole && arrRole.length > 0 ? arrRole[0].keyMap : "",
        avatar: "",
        userEditId: "",
        action: CRUD_ACTIONS.CREATE,
        previewImgURL: "",
      });
    }
  }
  handleOnChangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      let objectUrl = URL.createObjectURL(file);
      this.setState({
        previewImgURL: objectUrl,
        avatar: base64,
      });
    }
  };
  openPreviewImage = () => {
    if (this.state.previewImgURL === "") return;
    this.setState({
      isOpen: true,
    });
  };
  handleSaveUser = () => {
    let isValid = this.CheckValidateInput();
    let { action } = this.state;
    if (!isValid) return;
    else {
      if (action === CRUD_ACTIONS.CREATE) {
        this.props.createNewUser({
          email: this.state.email,
          password: this.state.password,
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          address: this.state.address,
          phonenumber: this.state.phoneNumber,
          gender: this.state.gender,
          roleId: this.state.roleId,
          position: this.state.position,
          avatar: this.state.previewImgURL,
        });
      }
      if (action === CRUD_ACTIONS.EDIT) {
        this.props.editUserRedux({
          email: this.state.email,
          password: this.state.password,
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          address: this.state.address,
          phonenumber: this.state.phoneNumber,
          gender: this.state.gender,
          roleId: this.state.roleId,
          position: this.state.position,
          avatar: this.state.avatar,
          id: this.state.userEditId,
        });
      }
    }
  };
  CheckValidateInput = () => {
    let check = [
      "email",
      "password",
      "firstName",
      "lastName",
      "phoneNumber",
      "address",
    ];
    let isValid = true;
    for (var i = 0; i < check.length; i++) {
      if (!this.state[check[i]]) {
        isValid = false;
        alert("Missing " + check[i]);
        break;
      }
    }
    return isValid;
  };
  onChangeInput = (event, id) => {
    let copystate = { ...this.state };
    copystate[id] = event.target.value;
    this.setState({
      ...copystate,
    });
  };
  handleEditUserFromParent = (user) => {
    let imageBase64 = "";
    if (user.image) {
      imageBase64 = new Buffer(user.image, "base64").toString("binary");
    }
    this.setState({
      email: user.email,
      password: " user.password",
      firstName: user.firstName,
      lastName: user.lastName,
      address: user.address,
      phoneNumber: user.phonenumber,
      gender: user.gender,
      position: user.positionId,
      roleId: user.roleId,
      avatar: "",
      previewImgURL: imageBase64,
      action: CRUD_ACTIONS.EDIT,
      userEditId: user.id,
    });
  };
  render() {
    let genders = this.state.genderArr;
    let positions = this.state.positionArr;
    let role = this.state.roleArr;
    let language = this.props.language;
    let isGetGenders = this.props.isLoadingGender;
    let {
      email,
      password,
      firstName,
      lastName,
      address,
      phoneNumber,
      gender,
      position,
      roleId,
      avatar,
    } = this.state;
    return (
      <div className="user-redux-container">
        <div className="title">User Redux hehehe</div>
        <div className="user-redux-body">
          <div className="container">
            <div className="row">
              <div className="col-12">
                {isGetGenders === true ? "Loading genders" : ""}
              </div>
              <div className="col-12 my-3">
                <FormattedMessage id="manage-user.add" />
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.email" />
                </label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(event) => this.onChangeInput(event, "email")}
                  disabled={this.state.action === CRUD_ACTIONS.EDIT}
                />
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.password" />
                </label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(event) => this.onChangeInput(event, "password")}
                  disabled={this.state.action === CRUD_ACTIONS.EDIT}
                />
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.firstName" />
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={firstName}
                  onChange={(event) => this.onChangeInput(event, "firstName")}
                />
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.lastName" />
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={lastName}
                  onChange={(event) => this.onChangeInput(event, "lastName")}
                />
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.phoneNumber" />
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={phoneNumber}
                  onChange={(event) => this.onChangeInput(event, "phoneNumber")}
                />
              </div>
              <div className="col-9">
                <label>
                  <FormattedMessage id="manage-user.address" />
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={address}
                  onChange={(event) => this.onChangeInput(event, "address")}
                />
              </div>
              <div className="col-3">
                <label for="inputState">
                  <FormattedMessage id="manage-user.gender" />
                </label>
                <select
                  id="inputState"
                  className="form-control"
                  onChange={(event) => this.onChangeInput(event, "gender")}
                  value={gender}
                >
                  {genders &&
                    genders.length > 0 &&
                    genders.map((item, index) => {
                      return (
                        <option key={index} value={item.keyMap}>
                          {language === LANGUAGES.VI
                            ? item.valueVi
                            : item.valueEn}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-3">
                <label for="inputState">
                  <FormattedMessage id="manage-user.position" />
                </label>
                <select
                  id="inputState"
                  className="form-control"
                  onChange={(event) => this.onChangeInput(event, "position")}
                  value={position}
                >
                  {positions &&
                    positions.length > 0 &&
                    positions.map((item, index) => {
                      return (
                        <option key={index} value={item.keyMap}>
                          {language === LANGUAGES.VI
                            ? item.valueVi
                            : item.valueEn}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-3">
                <label for="inputState">
                  <FormattedMessage id="manage-user.roleId" />
                </label>
                <select
                  id="inputState"
                  className="form-control"
                  onChange={(event) => this.onChangeInput(event, "roleId")}
                  value={roleId}
                >
                  {role &&
                    role.length > 0 &&
                    role.map((item, index) => {
                      return (
                        <option key={index} value={item.keyMap}>
                          {language === LANGUAGES.VI
                            ? item.valueVi
                            : item.valueEn}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-3 ">
                <label for="image">
                  <FormattedMessage id="manage-user.image" />
                </label>
                <div className="preview-img-container">
                  <label htmlFor="preview-img" className="label-upload">
                    Upload
                    <i className="fas fa-upload"></i>
                  </label>
                  <input
                    id="preview-img"
                    type="file"
                    hidden
                    onChange={(event) => this.handleOnChangeImage(event)}
                  />
                  <div
                    className="preview-image"
                    style={{
                      backgroundImage: `url(${this.state.previewImgURL})`,
                    }}
                    onClick={() => this.openPreviewImage()}
                  ></div>
                </div>
              </div>
              <div className="col-12 mt-3">
                <button
                  className={
                    this.state.action === CRUD_ACTIONS.EDIT
                      ? "btn btn-warning"
                      : "btn btn-primary"
                  }
                  onClick={() => this.handleSaveUser()}
                >
                  {this.state.action === CRUD_ACTIONS.EDIT ? (
                    <FormattedMessage id="manage-user.edit" />
                  ) : (
                    <FormattedMessage id="manage-user.save" />
                  )}
                </button>
              </div>
              <div className="col-12 mb-5">
                <TableManageUser
                  handleEditUserFromParent={this.handleEditUserFromParent}
                  action={this.state.action}
                />
              </div>
            </div>
          </div>
        </div>
        {this.state.isOpen === true && (
          <Lightbox
            mainSrc={this.state.previewImgURL}
            onCloseRequest={() => this.setState({ isOpen: false })}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genderRedux: state.admin.genders,
    PositionRedux: state.admin.positions,
    RoleRedux: state.admin.roles,
    isLoadingGender: state.admin.isLoadingGender,
    listUsers: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    getPositionStart: () => dispatch(actions.fetchPositionStart()),
    getRoleStart: () => dispatch(actions.fetchRoleStart()),
    createNewUser: (data) => dispatch(actions.createNewUser(data)),
    fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
    editUserRedux: (data) => dispatch(actions.EditUser(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
