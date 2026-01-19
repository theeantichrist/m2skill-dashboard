fetch("index.html")
  .then((response) => {
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
    return response.text();
  })
  .then((html) => {
    const container = document.getElementById("formulier-container");
    if (container) container.innerHTML = html;
  })
  .catch((error) => {
    console.error("Fout bij laden formulier:", error);
  });
