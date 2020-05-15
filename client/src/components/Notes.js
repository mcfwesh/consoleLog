import React, { Component } from "react";
import { render } from "react-dom";
import MonacoEditor from "react-monaco-editor";
// import * as monaco from "monaco-editor";

// monaco.editor.create(document.getElementById("container"), {
//   value: 'console.log("Hello, world")',
//   language: "javascript",
// });

class Notes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: "// type your code...",
    };
  }
  editorDidMount(editor, monaco) {
    console.log("editorDidMount", editor);
    editor.focus();
  }
  onChange(newValue, e) {
    console.log("onChange", newValue, e);
  }
  render() {
    const code = this.state.code;
    const options = {
      selectOnLineNumbers: true,
    };
    return (
      <div>
        <br></br>
        <MonacoEditor
          class="margin-auto"
          width="80%"
          height="800"
          language="javascript"
          theme="vs-dark"
          value={code}
          options={options}
          onChange={this.onChange}
          editorDidMount={this.editorDidMount}
        />
      </div>
    );
  }
}

export default Notes;
