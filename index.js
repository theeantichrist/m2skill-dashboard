function setFeedback(el, message, type = "ok") {
  if (!el) return;
  el.textContent = message;
  el.classList.remove("ok", "error");
  el.classList.add(type);
}

document.addEventListener("DOMContentLoaded", () => {
  
  const naamForm = document.querySelector("#naamForm");
  const naamInput = document.querySelector("#naam");
  const naamFeedback = document.querySelector("#naamFeedback");

  if (naamForm && naamInput) {
    naamForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const naam = naamInput.value.trim();
      if (naam.length < 2) {
        setFeedback(naamFeedback, "Vul een geldige naam in (minimaal 2 tekens).", "error");
        return;
      }

      localStorage.setItem("naam", naam);
      setFeedback(naamFeedback, `Thanks ${naam}! Opgeslagen.`, "ok");
      naamForm.reset();
    });
  }

  
  const chillForm = document.querySelector("#chillForm");
  const chillFeedback = document.querySelector("#chillFeedback");

  if (chillForm) {
    chillForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const gekozen = chillForm.querySelector('input[name="chill"]:checked');
      if (!gekozen) {
        setFeedback(chillFeedback, "Kies een optie.", "error");
        return;
      }

      setFeedback(chillFeedback, `Gekozen: ${gekozen.value}`, "ok");
    });

    chillForm.addEventListener("change", (e) => {
      if (e.target && e.target.name === "chill") {
        setFeedback(chillFeedback, `Aangeklikt: ${e.target.value}`, "ok");
      }
    });
  }

  
  
  
  const emailForm = document.querySelector("#emailForm");
  const emailInput = document.querySelector("#email");
  const emailFeedback = document.querySelector("#emailFeedback");

  if (emailForm && emailInput) {
    emailForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const email = emailInput.value.trim();
      if (!email.includes("@") || !email.includes(".")) {
        setFeedback(emailFeedback, "Vul een geldig emailadres in.", "error");
        return;
      }

      localStorage.setItem("email", email);
      setFeedback(emailFeedback, `Email opgeslagen: ${email}`, "ok");
      emailForm.reset();
    });
  }

  const button = document.getElementById("load-pokemon");
  const list = document.getElementById("pokemon-list");

  if (button && list) {
    button.addEventListener("click", () => {
      fetch("https://pokeapi.co/api/v2/pokemon?limit=10")
        .then((response) => response.json())
        .then((data) => {
          list.innerHTML = "";
          data.results.forEach((pokemon) => {
            const li = document.createElement("li");
            li.textContent = pokemon.name;
            list.appendChild(li);
          });
        })
        .catch((error) => {
          console.error("Fout bij laden Pokémon:", error);
        });
    });
  }
});
