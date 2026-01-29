
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
        setFeedback(naamFeedback, "Vul een geldige naam in (min. 2 tekens).", "error");
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

  const pokeBtn = document.getElementById("load-pokemon");
  const pokeList = document.getElementById("pokemon-list");

  if (pokeBtn && pokeList) {
    pokeBtn.addEventListener("click", () => {
      fetch("https://pokeapi.co/api/v2/pokemon?limit=10")
        .then((res) => res.json())
        .then((data) => {
          pokeList.innerHTML = "";
          data.results.forEach((p) => {
            const li = document.createElement("li");
            li.textContent = p.name.charAt(0).toUpperCase() + p.name.slice(1);
            pokeList.appendChild(li);
          });
        })
        .catch(() => console.error("Pokémon laden mislukt."));
    });
  }

  // --- E. STOPWATCH LOGICA ---
  let seconds = 0;
  let minutes = 0;
  let hours = 0;
  let timer = null;

  const swDisplay = document.getElementById("swTime");
  const swStart = document.getElementById("swStart");
  const swStop = document.getElementById("swStop");
  const swReset = document.getElementById("swReset");

  function updateStopwatch() {
    seconds++;
    if (seconds === 60) { seconds = 0; minutes++; }
    if (minutes === 60) { minutes = 0; hours++; }

    swDisplay.textContent = 
      `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }

  if (swStart && swDisplay) {
    swStart.addEventListener("click", () => {
      if (timer === null) timer = setInterval(updateStopwatch, 1000);
    });

    swStop.addEventListener("click", () => {
      clearInterval(timer);
      timer = null;
    });

    swReset.addEventListener("click", () => {
      clearInterval(timer);
      timer = null;
      seconds = 0; minutes = 0; hours = 0;
      swDisplay.textContent = "00:00:00";
    });
  }
});