function addPyodide(editorId, buttonId) {
  let pyodide = null;
  const outputArea = document.getElementById("output-area");
  const runButton = document.getElementById(buttonId);
  const editor = window[editorId];

  async function loadPyodideInstance() {
    outputArea.textContent = "Loading Python...";
    pyodide = await loadPyodide();
    outputArea.textContent = "Python ready! Your code output will appear here.";
  }

  async function runPython() {
    if (!pyodide) {
      outputArea.textContent = "Python is still loading, please wait...";
      return;
    }

    const code = editor.getValue();
    outputArea.textContent = "";

    try {
      pyodide.setStdout({
        batched: (msg) => {
          outputArea.textContent += msg + "\n";
        },
      });
      pyodide.setStderr({
        batched: (msg) => {
          outputArea.textContent += msg + "\n";
        },
      });

      await pyodide.runPythonAsync(code);
    } catch (err) {
      outputArea.textContent += "Error: " + err.message;
    }
  }

  runButton.addEventListener("click", runPython);
  loadPyodideInstance();
}
