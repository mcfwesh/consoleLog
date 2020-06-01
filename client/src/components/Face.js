import React, { useRef, useState } from "react";
import ReactDOM from "react-dom";
import MonacoEditor from "react-monaco-editor";
import { Link, withRouter } from "react-router-dom";

function Face() {
  const [isEditorReady, setIsEditorReady] = useState(false);
  const valueGetter = useRef();

  function handleEditorDidMount(_valueGetter) {
    setIsEditorReady(true);
    valueGetter.current = _valueGetter;
  }

  function handleShowValue() {
    alert(valueGetter.current());
  }

  return (
    <>
      <button onClick={handleShowValue} disabled={!isEditorReady}>
        Show value
      </button>

      <MonacoEditor
        height="90vh"
        language="javascript"
        value={"// write your code here"}
        theme="vs-light"
        editorDidMount={handleEditorDidMount}
      />
    </>
  );
}

export default Face;
