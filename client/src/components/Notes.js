import React, { Component } from "react";
import { render } from "react-dom";
import MonacoEditor from "react-monaco-editor";
import axios from "axios";
// import * as monaco from "monaco-editor";

// monaco.editor.create(document.getElementById("container"), {
//   value: 'console.log("Hello, world")',
//   language: "javascript",
// });

class Notes extends React.Component {
  state = {
    code: " ",
  };

  editorDidMount(editor, monaco) {
    console.log("editorDidMount", editor);
    editor.focus();
  }

  getData = () => {
    console.log("nate is the master of the universe");
    axios
      .get("/api/notes")
      .then((response) => {
        console.log(response);
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
    console.log(code);
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
    console.log(newValue);
    this.setState({
      code: newValue,
    });
  };
  render() {
    console.log("this are the this.props", this.props);

    const code = this.state.code;
    const options = {
      selectOnLineNumbers: true,
    };
    console.log(code[0].notes);
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <MonacoEditor
            class="margin-auto"
            width="80%"
            height="600"
            language="javascript"
            theme="vs-dark"
            value={code}
            options={options}
            onChange={this.onChange}
            editorDidMount={this.editorDidMount}
          />
          {this.props.user?._id && <button type="submit">Save</button>}
        </form>
      </div>
    );
  }
}

export default Notes;
