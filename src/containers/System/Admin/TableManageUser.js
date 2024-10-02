import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./TableManageUser.scss";
import * as actions from "../../../store/actions";

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";

const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
  console.log("handleEditorChange", html, text);
}

class managerdoctor extends Component {
  state = {};
  constructor(props) {
    super(props);
    this.state = {
      UserRedux: [],
    };
  }
  componentDidMount() {
    this.props.fetchUserRedux();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.listUsers !== this.props.listUsers) {
      this.setState({
        UserRedux: this.props.listUsers,
      });
    }
  }
  handleDeleteUser = (user) => {
    this.props.deleteUserRedux(user.id);
  };
  handleEditUser = (user) => {
    console.log("hehehehe", user);

    this.props.handleEditUserFromParent(user);
  };
  render() {
    let arrUsers = this.state.UserRedux;
    return (
      <>
        <table id="TableManageUser">
          <tbody>
            <tr>
              <th style={{ textAlign: "center" }}>Email</th>
              <th style={{ textAlign: "center" }}>First name</th>
              <th style={{ textAlign: "center" }}>Last name</th>
              <th style={{ textAlign: "center" }}>Address</th>
              <th style={{ textAlign: "center" }}>Action</th>
            </tr>
            {arrUsers &&
              arrUsers.length > 0 &&
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
                      >
                        <i
                          style={{ color: "orange" }}
                          className="fas fa-user-edit"
                        ></i>
                      </a>
                      <a
                        className="btn-link"
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
        <MdEditor
          style={{ height: "500px" }}
          renderHTML={(text) => mdParser.render(text)}
          onChange={handleEditorChange}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listUsers: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
    deleteUserRedux: (id) => dispatch(actions.DeleteUser(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(managerdoctor);
