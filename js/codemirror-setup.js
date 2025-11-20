function addCodeMirror(elementId) {
  const editor = CodeMirror.fromTextArea(document.getElementById(elementId), {
    mode: "python",
    theme: "material-darker",
    lineNumbers: true,
    indentUnit: 4,
    tabSize: 4,
    indentWithTabs: false,
  });

  // Get problem name from URL parameter
  const urlParams = new URLSearchParams(window.location.search);
  const problemName = urlParams.get("problem");

  if (problemName) {
    const storageKey = `code_${problemName}`;

    // Load saved code from localStorage
    const savedCode = localStorage.getItem(storageKey);
    if (savedCode) {
      editor.setValue(savedCode);
    }

    // Save code to localStorage on change
    editor.on("change", () => {
      localStorage.setItem(storageKey, editor.getValue());
    });
  }

  window.editor = editor;
  return "editor";
}
