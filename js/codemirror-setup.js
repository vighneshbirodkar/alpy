function addCodeMirror(elementId) {
  const editor = CodeMirror.fromTextArea(document.getElementById(elementId), {
    mode: "python",
    theme: "material-darker",
    lineNumbers: true,
    indentUnit: 4,
    tabSize: 4,
    indentWithTabs: false,
  });
  window.editor = editor;
}
