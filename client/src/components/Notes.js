import React, { Component } from "react";
import { render } from "react-dom";
import MonacoEditor from "react-monaco-editor";
//const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");
// export default class Notes extends Component {
//   render() {
//     return (
//       <div>
//         <h2>Extra notes From Ironhack</h2>
//         <textarea style={{ width: "1000px", height: "2000px" }}></textarea>
//       </div>
//     );
//   }
// }
// module.exports = {
//   entry: "./index.js",
//   output: {
//     path: path.resolve(__dirname, "dist"),
//     filename: "app.js",
//   },
//   module: {
//     rules: [
//       {
//         test: /\.css$/,
//         use: ["style-loader", "css-loader"],
//       },
//       {
//         test: /\.ttf$/,
//         use: ["file-loader"],
//       },
//     ],
//   },
//   plugins: [new MonacoWebpackPlugin()],
// };

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
      <MonacoEditor
        width="80%"
        height="1000"
        language="javascript"
        theme="vs-dark"
        value={code}
        options={options}
        onChange={this.onChange}
        editorDidMount={this.editorDidMount}
      />
    );
  }
}

export default Notes;
