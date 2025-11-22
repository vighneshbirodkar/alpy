function renderMarkdown(elementId, markdownText) {
  const element = document.getElementById(elementId);
  if (element) {
    element.innerHTML = marked.parse(markdownText);
  }
}

// Load instructions when the page loads
