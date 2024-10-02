import React, { Component, isValidElement } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { emitter } from "../../utils/emitter.js";

class ModalUser extends Component {
  state = {};
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phonenumber: "",
      address: "",
      gender: "",
      roleId: "",
    };
    this.ListenToEmitter();
  }
  ListenToEmitter = () => {
    emitter.on("EVENT_CLEAR_MODAL_DATA", () => {
      //resert state
      this.setState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        phonenumber: "",
        address: "",
        gender: "",
        roleId: "",
      });
    });
  };
  handleOnChangeInput = (event, id) => {
    let copystate = { ...this.state };
    copystate[id] = event.target.value;
    this.setState({
      ...copystate,
    });
  };
  checkValidateInput = () => {
    let isValid = true;
    let arrInput = [
      "email",
      "password",
      "firstName",
      "lastName",
      "address",
      "phonenumber",
      "gender",
      "roleId",
    ];
    for (var i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert("Missing parameter:" + arrInput[i]);
        break;
      }
    }
    return isValid;
  };
  handleAddNewUser = () => {
    let isValid = this.checkValidateInput();
    if (isValid) {
      this.props.createNewUser(this.state);
    }
  };

  componentDidMount() {}
  toggle = () => {
    this.props.toggleUserModal();
  };
  render() {
    return (
      <Modal
        // centered
        size="lg"
        isOpen={this.props.isOpenModal}
        toggle={() => this.toggle()}
        className="abcClassName"
      >
        <ModalHeader toggle={() => this.toggle()}>Create new user</ModalHeader>
        <ModalBody>
          <div className="container">
            <div className="row">
              <div className="col-12 mt-3">
                <form action="/api/create-new-user" method="get">
                  <div className="form-row">
                    <div className="form-group col-md-5">
                      <label htmlFor="Email">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        id="Email"
                        placeholder="Email"
                        name="email"
                        onChange={(event) =>
                          this.handleOnChangeInput(event, "email")
                        }
                        value={this.state.email}
                      />
                      <label htmlFor="Password" className="mt-3">
                        Password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="Password"
                        placeholder="Password"
                        name="password"
                        onChange={(event) =>
                          this.handleOnChangeInput(event, "password")
                        }
                        value={this.state.password}
                      />
                    </div>

                    <div className="form-group col-md-5 ">
                      <label htmlFor="FirstName">FirstName</label>
                      <input
                        type="text"
                        className="form-control"
                        id="FirstName"
                        placeholder="FirstName"
                        name="firstName"
                        onChange={(event) =>
                          this.handleOnChangeInput(event, "firstName")
                        }
                        value={this.state.firstName}
                      />
                      <label htmlFor="LastName" className="mt-3">
                        LastName
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="LastName"
                        placeholder="LastName"
                        name="lastName"
                        onChange={(event) =>
                          this.handleOnChangeInput(event, "lastName")
                        }
                        value={this.state.lastName}
                      />
                    </div>
                  </div>

                  <div className="form-row mt-3">
                    <div className="form-group col-md-11 ">
                      <label htmlFor="inputAddress">Address</label>
                      <input
                        type="text"
                        className="form-control"
                        id="inputAddress"
                        placeholder="1234 Main St"
                        name="address"
                        onChange={(event) =>
                          this.handleOnChangeInput(event, "address")
                        }
                        value={this.state.address}
                      />
                    </div>
                  </div>
                  <div className="form-row mt-3">
                    <div className="form-group col-md-3">
                      <label htmlFor="inputCity">PhoneNumber</label>
                      <input
                        type="tel"
                        className="form-control"
                        id="inputCity"
                        name="phonenumber"
                        onChange={(event) =>
                          this.handleOnChangeInput(event, "phonenumber")
                        }
                        value={this.state.phonenumber}
                      />
                    </div>
                    <div className="form-group col-md-3">
                      <label htmlFor="inputState">Gender</label>
                      <select
                        name="gender"
                        id="inputState"
                        className="form-control"
                        onChange={(event) =>
                          this.handleOnChangeInput(event, "gender")
                        }
                      >
                        <option value="-1">select</option>
                        <option value="1">Male</option>
                        <option value="0">Female</option>
                      </select>
                    </div>
                    <div className="form-group col-md-3">
                      <label htmlFor="inputState">Role</label>
                      <select
                        name="roleId"
                        id="inputState"
                        className="form-control"
                        onChange={(event) =>
                          this.handleOnChangeInput(event, "roleId")
                        }
                      >
                        <option value="-1">select</option>
                        <option value="1">Admin</option>
                        <option value="2">doctor</option>
                        <option value="3">patient</option>
                      </select>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            style={{ background: "#0071ba" }}
            color="primary"
            onClick={() => this.handleAddNewUser()}
            className="px-3"
          >
            Add new
          </Button>
          <Button
            color="secondary"
            onClick={() => this.toggle()}
            className="px-3"
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
