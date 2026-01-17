const button = document.getElementById("load-pokemon");
const list = document.getElementById("pokemon-list");

button.addEventListener("click", () => {
  fetch("https://pokeapi.co/api/v2/pokemon?limit=10")
    .then(response => response.json())
    .then(data => {
      list.innerHTML = "";

      data.results.forEach(pokemon => {
        const li = document.createElement("li");
        li.textContent = pokemon.name;
        list.appendChild(li);
      });
    })
    .catch(error => {
      console.error("Fout bij laden Pokémon:", error);
    });
});
