function renderMarkdown(elementId, markdownText) {
  const element = document.getElementById(elementId);
  if (element) {
    element.innerHTML = marked.parse(markdownText);
  }
}

async function loadProblemInstructions() {
  // Get problem name from URL parameter (e.g., ?problem=abc)
  const urlParams = new URLSearchParams(window.location.search);
  const problemName = urlParams.get("problem");

  if (!problemName) {
    document.getElementById("instruction-area").textContent =
      "No problem specified. Please add '?problem=<problem_name>' to the URL.";
    return;
  }

  try {
    const markdownFilePath = `../alpy/${problemName}.md`;
    const markdownText = await downloadFileAsString(markdownFilePath);
    renderMarkdown("instruction-area", markdownText);
  } catch (err) {
    document.getElementById("instruction-area").textContent =
      `Error loading problem instructions for "${problemName}": ${err.message}`;
  }
}

// Load instructions when the page loads
