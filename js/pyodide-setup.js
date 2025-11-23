const PythonStatus = {
  OK: "OK",
  PENDING: "PENDING",
  ERROR: "ERROR",
  FAILED: "FAILED",
};
const startMsg = "Python ready! Your code output will appear here:\n";

function getUrlProblem() {
  // Get problem name from URL parameter (e.g., ?problem=abc)
  const urlParams = new URLSearchParams(window.location.search);
  const problemName = urlParams.get("problem");
  return problemName;
}

function setResultStatus(resultHeader, status) {
  switch (status) {
    case PythonStatus.OK:
      resultHeader.className = "result-header success";
      resultHeader.textContent = "Status: OK";
      break;
    case PythonStatus.PENDING:
      resultHeader.className = "result-header pending";
      resultHeader.textContent = "Status: Pending";
      break;
    case PythonStatus.ERROR:
      resultHeader.className = "result-header error";
      resultHeader.textContent = "Status: Error";
      break;
    case PythonStatus.FAILED:
      resultHeader.className = "result-header error";
      resultHeader.textContent = "Status: Failed";
      break;
  }
}

function showRunButton() {
  const runButton = document.getElementById("run-button");
  runButton.style.display = "inline-block";
}

function showTestButton() {
  const testButton = document.getElementById("test-button");
  testButton.style.display = "inline-block";
}

function clearOutputAreaIfStale() {
  const outputArea = document.getElementById("output-area");
  const runButton = document.getElementById("run-button");

  if (outputArea.counter < runButton.counter) {
    outputArea.textContent = "";
    outputArea.counter += 1;
  }
}

async function getPythonVariable(pyodide, code, varname) {
  // Hack because pyodide cannot get single variables out.
  await pyodide.runPythonAsync(code + `\n__result__ = [${varname}]\n`);
  return pyodide.globals.get("__result__").toJs()[0];
}

async function loadProblemInstructions(pyodide) {
  const problemName = getUrlProblem();
  if (!problemName) {
    document.getElementById("instruction-area").textContent =
      "No problem specified. Please add '?problem=<problem_name>' to the URL.";
    return;
  }

  try {
    const code = await downloadFileAsString(`../alpy/${problemName}.py`);
    const docString = await getPythonVariable(pyodide, code, "__doc__");
    renderMarkdown("instruction-area", docString);
    showRunButton();

    if (code.includes("TEST_BEGIN")) {
      showTestButton();
    }
  } catch (err) {
    document.getElementById("instruction-area").textContent =
      `Error loading problem instructions for "${problemName}": ${err.message}`;
  }
}

function connectPyodideToOutput(pyodide) {
  const outputArea = document.getElementById("output-area");
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
}

async function runPython(pyodide) {
  const outputArea = document.getElementById("output-area");
  const resultHeader = document.getElementById("result-header");
  const runButton = document.getElementById("run-button");
  const editor = window.editor;
  if (!pyodide) {
    outputArea.textContent = "Python is still loading, please wait...";
    return;
  }

  const code = editor.getValue();
  runButton.counter += 1;

  try {
    await pyodide.runPythonAsync(code);
    setResultStatus(resultHeader, PythonStatus.PENDING);
  } catch (err) {
    clearOutputAreaIfStale();
    outputArea.textContent += err.message;
    setResultStatus(resultHeader, PythonStatus.ERROR);
  }
}

function addPyodide() {
  let pyodide = null;
  const outputArea = document.getElementById("output-area");
  const resultHeader = document.getElementById("result-header");
  const runButton = document.getElementById("run-button");
  const testButton = document.getElementById("test-button");
  const editor = window.editor;
  outputArea.counter = 0;
  runButton.counter = 0;

  async function loadPyodideInstance() {
    const outputArea = document.getElementById("output-area");
    pyodide = await loadPyodide();
    connectPyodideToOutput(pyodide);

    outputArea.textContent = startMsg;
    loadProblemInstructions(pyodide);
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
        pyodide,
        testCode + "\npy_result = _test()\n",
        "py_result",
      );

      if (result === true) {
        setResultStatus(resultHeader, PythonStatus.OK);
        // Mark problem as solved in localStorage
        localStorage.setItem(`${problemName}_solved`, "true");
      } else {
        setResultStatus(resultHeader, PythonStatus.FAILED);
        localStorage.setItem(`${problemName}_solved`, "false");
      }
    } catch (err) {
      clearOutputAreaIfStale();
      outputArea.textContent += err.message;
      setResultStatus(resultHeader, PythonStatus.ERROR);
      localStorage.setItem(`${problemName}_solved`, "false");
    }
  }

  runButton.addEventListener("click", () => runPython(pyodide));
  testButton.addEventListener("click", testPython);

  loadPyodideInstance();
}
