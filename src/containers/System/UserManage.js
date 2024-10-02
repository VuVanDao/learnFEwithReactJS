import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserManage.scss";
import {
  getAllUser,
  createNewUserService,
  deleteUserService,
  editUserService,
} from "../../services/userService.js";
import ModalUser from "./ModalUser.js";
import ModalEditUser from "./ModalEditUser.js";
import { emitter } from "../../utils/emitter.js";
class UserManage extends Component {
  state = {};
  constructor(props) {
    super(props);
    this.state = {
      arrUsers: [],
      isOpenModal: false,
      isOpenModalEditUser: false,
      userEdit: {},
    };
  }
  handleAddNewUser = () => {
    this.setState({
      isOpenModal: true,
    });
  };
  toggleUserModal = () => {
    this.setState({
      isOpenModal: !this.state.isOpenModal,
    });
  };
  async componentDidMount() {
    await this.getAllUserFromReact();
  }
  getAllUserFromReact = async () => {
    let response = await getAllUser("ALL");
    if (response && response.errCode === 0) {
      this.setState({
        arrUsers: response.users,
      });
    }
  };
  createNewUser = async (data) => {
    try {
      let response = await createNewUserService(data);
      if (response && response.errorCode !== 0) {
        alert(response.message);
      } else {
        await this.getAllUserFromReact();
        this.setState({
          isOpenModal: false,
        });
        emitter.emit("EVENT_CLEAR_MODAL_DATA");
      }
    } catch (error) {
      console.log(error);
    }
    console.log(data);
  };
  handleDeleteUser = async (user) => {
    try {
      let res = await deleteUserService(user.id);
      if (res && res.errorCode === 0) {
        await this.getAllUserFromReact();
      } else {
        alert(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  handleEditUser = async (user) => {
    console.log("edittttttt", user);
    this.setState({
      isOpenModalEditUser: true,
      userEdit: user,
    });
  };
  doEditUser = async (user) => {
    try {
      let response = await editUserService(user);
      if (response && response.errorCode !== 0) {
        alert(response.message);
      } else {
        await this.getAllUserFromReact();
        this.setState({
          isOpenModalEditUser: false,
        });
        // emitter.emit("EVENT_CLEAR_MODAL_DATA");
      }
    } catch (error) {
      console.log(error);
    }
    console.log(user);
  };
  toggleUserEditModal = () => {
    this.setState({
      isOpenModalEditUser: !this.state.isOpenModalEditUser,
    });
  };

  render() {
    //ca 2 cai nhu nhau
    let { arrUsers } = this.state;
    let arrUser = this.state.arrUsers;
    return (
      <div className="user-container">
        <ModalUser
          isOpenModal={this.state.isOpenModal}
          toggleUserModal={this.toggleUserModal}
          createNewUser={this.createNewUser}
        />
        {this.state.isOpenModalEditUser && (
          <ModalEditUser
            isOpenModalEditUser={this.state.isOpenModalEditUser}
            toggleUserEditModal={this.toggleUserEditModal}
            currentUser={this.state.userEdit}
            editUser={this.doEditUser}
          />
        )}
        <div className="title text-center">manage user with eric</div>
        <div className="mx-5">
          <button
            style={{ background: "#0071ba" }}
            onClick={() => this.handleAddNewUser()}
            className="btn btn-primary px-3"
          >
            Add new user <i className="fas fa-plus mx-1"></i>
          </button>
        </div>
        <div className="users-table mx-5 mt-5">
          <table id="customers">
            <tbody>
              <tr>
                <th style={{ textAlign: "center" }}>Email</th>
                <th style={{ textAlign: "center" }}>First name</th>
                <th style={{ textAlign: "center" }}>Last name</th>
                <th style={{ textAlign: "center" }}>Address</th>
                <th style={{ textAlign: "center" }}>Action</th>
              </tr>
              {arrUsers &&
                arrUsers.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.email}</td>
                      <td>{item.firstName}</td>
                      <td>{item.lastName}</td>
                      <td>{item.address}</td>
                      <td className="hehe">
                        <a
                          className="btn-link"
                          onClick={() => this.handleEditUser(item)}

                          // href="/dit-crud?id=<%= data.id %>e"
                        >
                          <i
                            style={{ color: "orange" }}
                            className="fas fa-user-edit"
                          ></i>
                        </a>
                        <a
                          className="btn-link"
                          // href="/delete-crud?id=<%= data.id %>"
                          onClick={() => this.handleDeleteUser(item)}
                        >
                          <i
                            style={{ color: "red" }}
                            className="fas fa-user-slash"
                          ></i>
                        </a>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
