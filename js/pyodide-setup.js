function addPyodide(editorId, buttonId) {
  let pyodide = null;
  const outputArea = document.getElementById("output-area");
  const resultHeader = document.getElementById("result-header");
  const runButton = document.getElementById(buttonId);
  const editor = window[editorId];
  const startMsg = "";

  async function loadPyodideInstance() {
    pyodide = await loadPyodide();
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

    outputArea.textContent =
      "Python ready! Your code output will appear here\n--------\n";
  }

  async function runPythonWithUICallbacks() {
    if (!pyodide) {
      outputArea.textContent = "Python is still loading, please wait...";
      return;
    }

    const code = editor.getValue();

    try {
      await pyodide.runPythonAsync(code);

      // Get problem name from URL parameter (e.g., ?problem=abc)
      const urlParams = new URLSearchParams(window.location.search);
      const problemName = urlParams.get("problem");

      if (!problemName) {
        throw new Error(
          "No problem specified. Please add '?problem=<problem_name>' to the URL.",
        );
      }

      const testFilePath = `../alpy/${problemName}_test.py`;

      const allCode = await downloadFileAsString(testFilePath);
      const testCode = allCode.split("TEST_BEGIN")[1];

      // For some reason making python object a bool does not work.
      await pyodide.runPythonAsync(testCode + "\npy_result = [_check()]\n");
      py_result = pyodide.globals.get("py_result").toJs();
      const result = py_result[0];

      if (result === true) {
        resultHeader.className = "result-header success";
        resultHeader.textContent = "Result: Success";
        // Mark problem as solved in localStorage
        localStorage.setItem(`${problemName}_solved`, "true");
      } else {
        resultHeader.className = "result-header error";
        resultHeader.textContent = "Result: Failed";
        localStorage.setItem(`${problemName}_solved`, "false");
      }
    } catch (err) {
      outputArea.textContent = err.message;
      resultHeader.className = "result-header error";
      resultHeader.textContent = "Result: Error";
      localStorage.setItem(`${problemName}_solved`, "false");
    }
  }

  runButton.addEventListener("click", runPythonWithUICallbacks);
  loadPyodideInstance();
}
