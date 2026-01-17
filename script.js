fetch("formulier.html")
  .then((response) => response.text())
  .then((html) => {
    document.getElementById("formulier-container").innerHTML = html;
  })
  .catch((error) => {
    console.error("Fout bij laden formulier:", error);
  });
