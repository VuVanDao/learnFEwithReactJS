import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";

import * as actions from "../../store/actions";

import "./Login.scss";
import { FormattedMessage } from "react-intl";
import { every } from "lodash";
import { handleLogin } from "../../services/userService.js";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      showPassword: false,
      errMessage: "",
    };
  }
  handleOnChangeInput = (event) => {
    this.setState({
      username: event.target.value,
    });
  };
  handleOnChangePassword = (event) => {
    this.setState({
      password: event.target.value,
    });
  };
  handleShowHidePass = () => {
    this.setState({
      showPassword: !this.state.showPassword,
    });
  };
  handleLogin = async () => {
    this.setState({
      errMessage: "",
    });
    try {
      let data = await handleLogin(this.state.username, this.state.password);
      if (data && data.errCode !== 0) {
        this.setState({
          errMessage: data.message,
        });
      }
      if (data && data.errCode === 0) {
        this.props.userLoginSuccess(data.user);
      }
    } catch (error) {
      console.log(error.response);
      if (error.response) {
        if (error.response.data) {
          this.setState({
            errMessage: error.response.data.errmassage,
          });
        }
      }
    }
  };
  handleKeyDown = (event) => {
    if (event.key === "Enter" || event.keyCode === 13) {
      this.handleLogin();
    }
  };
  render() {
    return (
      <div className="login-background">
        <div className="login-container row">
          <div className=" col-12  login-content">LOGIN</div>
          <div className="col-12 form-group login-input">
            <label>User's name:</label>

            <input
              type="text"
              className="form-control"
              placeholder="Enter your name"
              onChange={(event) => {
                this.handleOnChangeInput(event);
              }}
            />
          </div>
          <div className="col-12 form-group  login-input">
            <label>password:</label>
            <input
              type={this.state.showPassword ? "text" : "password"}
              className="form-control"
              placeholder="Enter your password"
              onChange={(event) => {
                this.handleOnChangePassword(event);
              }}
              onKeyDown={(event) => this.handleKeyDown(event)}
            />
            {this.state.showPassword ? (
              <div className="custom-eye">
                <i
                  onClick={() => {
                    this.handleShowHidePass();
                  }}
                  className="fas fa-eye-slash"
                ></i>
              </div>
            ) : (
              <div className="custom-eye">
                <i
                  onClick={() => {
                    this.handleShowHidePass();
                  }}
                  className="fas fa-eye"
                ></i>
              </div>
            )}
          </div>
          <div className="col-12" style={{ color: "red" }}>
            {this.state.errMessage}
          </div>
          <div className="col-12">
            <button
              className="btn-login"
              onClick={() => {
                this.handleLogin();
              }}
            >
              login
            </button>
          </div>
          <div className="col-12 forgot-login">
            <a href="#!">forgot your password ?</a>
          </div>
          <div className="col-12 text-center">Or login with:</div>
          <div className="col-12 social-login">
            <a>
              <i className="fab fa-facebook"></i>
            </a>
            <a>
              <i className="fab fa-google"></i>
            </a>
            <a>
              <i className="fab fa-instagram"></i>
            </a>
          </div>
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
  return {
    navigate: (path) => dispatch(push(path)),

    userLoginSuccess: (userInfo) =>
      dispatch(actions.userLoginSuccess(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
