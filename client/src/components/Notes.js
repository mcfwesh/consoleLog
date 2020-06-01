import React, { Component } from "react";
import { render } from "react-dom";
import MonacoEditor from "react-monaco-editor";
import axios from "axios";

class Notes extends React.Component {
  state = {
    code: " ",
  };

  editorDidMount(editor, monaco) {
    editor.focus();
  }

  getData = () => {
    axios
      .get("/api/notes")
      .then((response) => {
        this.setState({
          code: response.data[0].notes,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleSubmit = (event, newValue) => {
    event.preventDefault();
    const { code } = this.state;

    axios
      .post("/api/notes", {
        notes: code,
      })
      .then(() => {
        this.getData();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  componentDidMount = () => {
    this.getData();
  };

  onChange = (newValue, e) => {
    this.setState({
      code: newValue,
    });
  };
  render() {
    const code = this.state.code;
    const options = {
      selectOnLineNumbers: true,
    };

    return (
      <div>
        <form class="notes" onSubmit={this.handleSubmit}>
          <div class="notes-div-top">
            <h1>
              <span class="blue-color">E</span>xtra{" "}
              <span class="blue-color">R</span>esources
            </h1>
            {this.props.user?._id && (
              <button class="btn-notes" type="submit">
                Save
              </button>
            )}
          </div>
          <br></br>
          <MonacoEditor
            height="800"
            language="javascript"
            theme="vs-dark"
            value={code}
            options={options}
            onChange={this.onChange}
            editorDidMount={this.editorDidMount}
          />
        </form>
      </div>
    );
  }
}

export default Notes;
