function getUrlProblem() {
  // Get problem name from URL parameter (e.g., ?problem=abc)
  const urlParams = new URLSearchParams(window.location.search);
  const problemName = urlParams.get("problem");
  return problemName;
}

function addPyodide() {
  let pyodide = null;
  const outputArea = document.getElementById("output-area");
  const resultHeader = document.getElementById("result-header");
  const runButton = document.getElementById("run-button");
  const testButton = document.getElementById("test-button");
  const editor = window.editor;
  const startMsg = "Python ready! Your code output will appear here:\n";
  outputArea.counter = 0;
  runButton.counter = 0;

  function clearOutputAreaIfStale() {
    if (outputArea.counter < runButton.counter) {
      outputArea.textContent = "";
      outputArea.counter += 1;
    }
  }

  async function getPythonVariable(code, varname) {
    // Hack because pyodide cannot get single variables out.
    await pyodide.runPythonAsync(code + `\n__result__ = [${varname}]\n`);
    return pyodide.globals.get("__result__").toJs()[0];
  }
  async function clearOutput() {
    if (!pyodide) {
      return;
    }
    outputArea.textContent = startMsg;
  }

  async function loadProblemInstructions() {
    const problemName = getUrlProblem();
    if (!problemName) {
      document.getElementById("instruction-area").textContent =
        "No problem specified. Please add '?problem=<problem_name>' to the URL.";
      return;
    }

    try {
      const code = await downloadFileAsString(`../alpy/${problemName}.py`);
      const docString = await getPythonVariable(code, "__doc__");
      renderMarkdown("instruction-area", docString);
    } catch (err) {
      document.getElementById("instruction-area").textContent =
        `Error loading problem instructions for "${problemName}": ${err.message}`;
    }
  }

  async function loadPyodideInstance() {
    pyodide = await loadPyodide();
    pyodide.setStdout({
      batched: (msg) => {
        clearOutputAreaIfStale();
        outputArea.textContent += msg + "\n";
      },
    });
    pyodide.setStderr({
      batched: (msg) => {
        clearOutputAreaIfStale();
        outputArea.textContent += msg + "\n";
      },
    });

    outputArea.textContent = startMsg;
    loadProblemInstructions();
  }

  async function runPython() {
    if (!pyodide) {
      outputArea.textContent = "Python is still loading, please wait...";
      return;
    }

    const code = editor.getValue();
    runButton.counter += 1;

    try {
      await pyodide.runPythonAsync(code);
      resultHeader.className = "result-header pending";
      resultHeader.textContent = "Result: Pending";
    } catch (err) {
      clearOutputAreaIfStale();
      outputArea.textContent += err.message;
      resultHeader.className = "result-header error";
      resultHeader.textContent = "Result: Error";
    }
  }

  async function testPython() {
    if (!pyodide) {
      outputArea.textContent = "Python is still loading, please wait...";
      return;
    }

    const code = editor.getValue();
    runButton.counter += 1;

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

      const filePath = `../alpy/${problemName}.py`;

      const allCode = await downloadFileAsString(filePath);
      const testCode = allCode.split("TEST_BEGIN")[1];

      const result = await getPythonVariable(
        testCode + "\npy_result = _test()\n",
        "py_result",
      );

      if (result === true) {
        resultHeader.className = "result-header success";
        resultHeader.textContent = "Status: OK";
        // Mark problem as solved in localStorage
        localStorage.setItem(`${problemName}_solved`, "true");
      } else {
        resultHeader.className = "result-header error";
        resultHeader.textContent = "Status: Failed";
        localStorage.setItem(`${problemName}_solved`, "false");
      }
    } catch (err) {
      clearOutputAreaIfStale();
      outputArea.textContent += err.message;
      resultHeader.className = "result-header error";
      resultHeader.textContent = "Status: Error";
      localStorage.setItem(`${problemName}_solved`, "false");
    }
  }

  runButton.addEventListener("click", runPython);
  testButton.addEventListener("click", testPython);

  loadPyodideInstance();
}
