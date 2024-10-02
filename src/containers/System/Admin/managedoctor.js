import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./managedoctor.scss";
import * as actions from "../../../store/actions";
import { CRUD_ACTIONS, LANGUAGES } from "../../../utils/";

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import Select from "react-select";
import { getDetailInforDoctor } from "../../../services/userService";
const mdParser = new MarkdownIt(/* Markdown-it options */);

class TableManageUser extends Component {
  state = {};
  constructor(props) {
    super(props);
    this.state = {
      contentMarkdown: "",
      contentHTML: "",
      selectedOption: "",
      description: "",
      listDoctors: [],
      hasOldData: false,
    };
  }
  componentDidMount() {
    this.props.fetchAllDoctorRedux();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.allDoctors !== this.props.allDoctors) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
      this.setState({
        listDoctors: dataSelect,
      });
    }
    if (prevProps.language !== this.props.language) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
      this.setState({
        listDoctors: dataSelect,
      });
    }
  }
  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentMarkdown: text,
      contentHTML: html,
    });
  };
  handleSaveContentMarkdown = () => {
    let { hasOldData } = this.state;
    this.props.SaveDetailDoctorRedux({
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      description: this.state.description,
      doctorId: this.state.selectedOption.value,
      action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,
    });
    console.log("Van dao check markdown:", this.state.action);
  };
  handleChange = async (selectedOption) => {
    this.setState({ selectedOption });
    let res = await getDetailInforDoctor(selectedOption.value);
    if (res && res.errCode === 0 && res.data.Markdown) {
      let markdown = res.data.Markdown;
      this.setState({
        contentHTML: markdown.contentHTML,
        contentMarkdown: markdown.contentMarkdown,
        description: markdown.description,
        hasOldData: true,
      });
    } else {
      this.setState({
        contentHTML: "",
        contentMarkdown: "",
        description: "",
        hasOldData: false,
      });
    }
    console.log(`res selected:`, res);
  };
  handleOnChangeDescription = (event) => {
    this.setState({
      description: event.target.value,
    });
  };
  buildDataInputSelect = (inputData) => {
    let result = [];
    let { language } = this.props;
    if (inputData && inputData.length) {
      inputData.map((item, index) => {
        let object = {};
        let labelEn = `${item.lastName} ${item.firstName}`;
        let labelVi = `${item.firstName} ${item.lastName}`;
        object.label = language === LANGUAGES.VI ? labelVi : labelEn;
        object.value = item.id;
        result.push(object);
      });
      return result;
    }
  };
  render() {
    let { hasOldData } = this.state;
    console.log("Check all doctor form table manage:", this.state);
    return (
      <div className="manage-doctor-container">
        <div className="manage-doctor-title">Chỉnh sửa thông tin Bác Sĩ</div>
        <div className="more-infor my-3">
          <div className="content-left form-group">
            <label>Chọn bác sĩ</label>
            <Select
              value={this.state.selectedOption}
              onChange={this.handleChange}
              options={this.state.listDoctors}
            />
          </div>
          <div className="content-right">
            <label>Thông tin giới thiệu</label>
            <textarea
              className="form-control"
              rows="4"
              onChange={(event) => this.handleOnChangeDescription(event)}
              value={this.state.description}
            ></textarea>
          </div>
        </div>
        <div className="manage-doctor-editor">
          <MdEditor
            style={{ height: "500px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChange}
            value={this.state.contentMarkdown}
          />
        </div>
        <button
          className={
            hasOldData === true
              ? "save-content-doctor btn btn-primary my-5"
              : "create-content-doctor btn btn-primary my-5"
          }
          onClick={() => this.handleSaveContentMarkdown()}
        >
          {hasOldData === true ? (
            <span>Lưu thông tin</span>
          ) : (
            <span>Tạo thông tin</span>
          )}
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    allDoctors: state.admin.allDoctors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctorRedux: () => dispatch(actions.fetchAllDoctor()),
    SaveDetailDoctorRedux: (data) => dispatch(actions.SaveDetailDoctorA(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
